import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { Type } from "@earendil-works/pi-ai";
import { defineTool, type ExtensionAPI } from "@earendil-works/pi-coding-agent";

// Pi's compiled Bun runtime needs the native binding's explicit filename.
const require = createRequire(import.meta.url);
const target = `${process.platform}-${process.arch}`;
const { Window } = require(
  `node-screenshots-${target}/node-screenshots.${target}.node`,
) as typeof import("node-screenshots");
const { Transformer, ResizeFilterType, ResizeFit } = require(
  `@napi-rs/image-${target}/image.${target}.node`,
) as typeof import("@napi-rs/image");

const WINE = "/Applications/CrossOver.app/Contents/SharedSupport/CrossOver/bin/wine";
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_DIMENSION = 2000;
const WEBP_QUALITY = 90;

export default function (pi: ExtensionAPI) {
  const inputHelper = new GameInput();
  pi.on("session_shutdown", () => inputHelper.stop());

  pi.registerTool(defineTool({
    name: "game",
    label: "Game",
    description: "Send optional game keys and return a screenshot; whitespace is ignored. Omit input for a screenshot only.",
    parameters: Type.Object({
      input: Type.Optional(Type.String()),
    }),

    async execute(_id, { input = "" }, signal, _onUpdate, ctx) {
      input = input.replace(/\s/g, "");
      if (/[^wasdczrxvf123456789]/.test(input)) {
        throw new Error("Unsupported key. Use only wasdczrxvf123456789.");
      }

      if (input) {
        await inputHelper.send(ctx.cwd, input, signal);
        await sleep(500, undefined, { signal });
      }

      signal?.throwIfAborted();
      const windows = Window.all().filter(window =>
        window.title() === "Order of the Sinking Star" &&
        window.appName() === "sinking_star.exe"
      );
      if (windows.length !== 1) {
        throw new Error(`Expected one game window, found ${windows.length}. Check that the game is running and Screen Recording permission is enabled.`);
      }

      const image = await windows[0].captureImage();
      const limits = ctx.model?.inputLimits?.images?.resize;
      const width = Math.min(image.width, limits?.maxWidth ?? MAX_DIMENSION);
      const height = Math.min(image.height, limits?.maxHeight ?? MAX_DIMENSION);
      const screenshot = await Transformer.fromRgbaPixels(
        await image.toRaw(), image.width, image.height,
      )
        .resize(width, height, ResizeFilterType.Lanczos3, ResizeFit.Inside)
        .webp(WEBP_QUALITY);
      return {
        content: [
          { type: "text", text: "" },
          {
            type: "image",
            data: screenshot.toString("base64"),
            mimeType: "image/webp",
          },
        ],
        details: undefined,
      };
    },
  }));
}

// Never replay a failed request: some keys may already have reached the game.
class GameInput {
  private helper?: ChildProcessWithoutNullStreams;
  private pending?: (error?: Error) => void;

  async send(cwd: string, keys: string, signal?: AbortSignal) {
    signal?.throwIfAborted();
    if (this.pending) throw new Error("Another game input request is still running.");
    if (!this.helper) this.start(cwd);
    await new Promise<void>((resolve, reject) => {
      this.pending = (error?: Error) => {
        clearTimeout(timeout);
        signal?.removeEventListener("abort", abort);
        this.pending = undefined;
        if (error) reject(error);
        else resolve();
      };
      const abort = () => {
        this.stop(new Error("Game input canceled; some keys may already have been sent."));
      };
      const timeout = setTimeout(() => {
        this.stop(new Error("Game input timed out; some keys may already have been sent."));
      }, REQUEST_TIMEOUT_MS);
      signal?.addEventListener("abort", abort, { once: true });
      if (signal?.aborted) abort();
      else this.helper!.stdin.write(`${keys}\n`);
    });
  }

  stop(error = new Error("Game input helper stopped.")) {
    const helper = this.helper;
    this.helper = undefined;
    if (!helper) return;
    if (this.pending) {
      // EOF would let AHK finish the entire batch before exiting.
      helper.kill("SIGKILL");
      this.pending(error);
    }
    helper.stdin.end();
    // EOF normally exits an idle helper; bound shutdown if it hangs.
    const timer = setTimeout(() => helper.kill("SIGKILL"), 2_000);
    timer.unref();
    helper.once("exit", () => clearTimeout(timer));
  }

  private start(cwd: string) {
    const autoHotkey = join(cwd, ".tools/AutoHotkey64.exe");
    if (!existsSync(autoHotkey)) {
      throw new Error("Missing .tools/AutoHotkey64.exe. Install portable AutoHotkey in .tools.");
    }
    const helper = spawn(WINE, [
      "--bottle=Steam", "--no-update", autoHotkey, "/ErrorStdOut",
      fileURLToPath(new URL("./wine-input.ahk", import.meta.url)),
    ], { cwd, stdio: "pipe" });
    this.helper = helper;
    let stderr = "";
    const lines = createInterface({ input: helper.stdout });
    const fail = (error: Error) => {
      if (this.helper === helper) this.stop(error);
    };
    lines.on("line", line => {
      if (this.helper !== helper) return;
      if (!this.pending || (line !== "ok" && !line.startsWith("error "))) {
        fail(new Error(`Unexpected game input reply: ${line}`));
      } else {
        this.pending(line === "ok" ? undefined : new Error(line.slice(6)));
      }
    });
    helper.stderr.on("data", data => {
      stderr = (stderr + data.toString()).slice(-4_000);
    });
    helper.on("error", fail);
    helper.stdin.on("error", fail);
    helper.on("exit", (code, signal) => {
      lines.close();
      fail(new Error(`Game input helper exited (${signal ?? code}). ${stderr}`));
    });
  }
}
