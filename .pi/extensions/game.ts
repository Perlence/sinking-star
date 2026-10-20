import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { homedir } from "node:os";
import { join } from "node:path";
import { setTimeout } from "node:timers/promises";
import { Type } from "@earendil-works/pi-ai";
import { defineTool, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import puppeteer, { type Browser } from "puppeteer-core";

// Pi's compiled Bun runtime needs the native binding's explicit filename.
const require = createRequire(import.meta.url);
const target = `${process.platform}-${process.arch}`;
const { Transformer, ResizeFilterType, ResizeFit } = require(
  `@napi-rs/image-${target}/image.${target}.node`,
) as typeof import("@napi-rs/image");

const MAX_DIMENSION = 2000;
const WEBP_QUALITY = 90;

export default function (pi: ExtensionAPI) {
  let browser: Browser | undefined;
  let running: Promise<unknown> | undefined;
  const shutdown = new AbortController();

  const disconnect = async () => {
    const connection = browser;
    browser = undefined;
    await connection?.disconnect(); // Never close Edge or its tabs.
  };

  pi.on("session_shutdown", async () => {
    shutdown.abort();
    await running?.catch(() => {}); // Allow the current key-up to finish.
    await disconnect();
  });

  pi.registerTool(defineTool({
    name: "game",
    label: "Game",
    executionMode: "sequential",
    description: "Send optional game keys and return a screenshot; whitespace is ignored. Omit input for a screenshot only.",
    parameters: Type.Object({ input: Type.Optional(Type.String()) }),

    async execute(_id, { input = "" }, signal, _onUpdate, ctx) {
      input = input.replace(/\s/g, "");
      if (/[^wasdczrxvf123456789]/.test(input)) {
        throw new Error("Unsupported key. Use only wasdczrxvf123456789.");
      }

      signal = signal ? AbortSignal.any([signal, shutdown.signal]) : shutdown.signal;
      signal.throwIfAborted();

      const operation = async () => {
        browser ??= await connectBrowser();
        signal.throwIfAborted();

        const pages = (await browser.pages()).filter(page => isGameUrl(page.url()));
        if (pages.length !== 1) {
          throw new Error(`Expected one Sinking Star tab on GeForce NOW, found ${pages.length}.`);
        }

        const page = pages[0];
        if (!(await page.title()).includes("Order of the Sinking Star")) {
          throw new Error("The GeForce NOW tab is not running Order of the Sinking Star.");
        }

        for (const key of input) {
          signal.throwIfAborted();
          if (!isGameUrl(page.url())) throw new Error("The game tab navigated away.");

          // Do not cancel an in-flight press: its finally block must release it.
          try {
            await page.keyboard.down(key);
            await setTimeout(50);
          } finally {
            await page.keyboard.up(key);
          }

          await setTimeout(100, undefined, { signal });
        }

        if (input) await setTimeout(500, undefined, { signal });
        signal.throwIfAborted();

        if (!isGameUrl(page.url())) throw new Error("The game tab navigated away.");

        const frame = await page.$eval("video", video => {
          if (!video.videoWidth || !video.videoHeight || video.readyState < 2) {
            throw new Error("The GeForce NOW video stream is not ready.");
          }
          // Read the stream directly without triggering Chromium's page capture
          // path. A detached canvas excludes CSS letterboxing and page
          // overlays.
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext("2d");
          if (!context) throw new Error("Could not create a video capture canvas.");
          context.drawImage(video, 0, 0);
          return canvas.toDataURL("image/png").split(",")[1];
        });

        const image = new Transformer(Buffer.from(frame, "base64"));
        signal.throwIfAborted();

        const { width, height } = await image.metadata();
        const limits = ctx.model?.inputLimits?.images?.resize;
        const screenshot = await image.resize(
          Math.min(width, limits?.maxWidth ?? MAX_DIMENSION),
          Math.min(height, limits?.maxHeight ?? MAX_DIMENSION),
          ResizeFilterType.Lanczos3, ResizeFit.Inside,
        ).webp(WEBP_QUALITY);
        signal.throwIfAborted();

        return {
          content: [{ type: "image" as const, data: screenshot.toString("base64"), mimeType: "image/webp" }],
          details: undefined,
        };
      };

      const pending = operation();
      running = pending;
      try {
        return await pending;
      } catch (error) {
        await disconnect();
        throw error;
      } finally {
        running = undefined;
      }
    },
  }));
}

async function connectBrowser(): Promise<Browser> {
  // A normal debugging-port launch supports HTTP discovery. Edge's explicit
  // opt-in can instead require the WebSocket path in DevToolsActivePort.
  const endpoint = process.env.GAME_BROWSER_URL;
  let browserWSEndpoint: string | undefined;
  if (!endpoint) {
    try {
      const file = join(homedir(), "Library/Application Support/Microsoft Edge/DevToolsActivePort");
      const [port, path] = (await readFile(file, "utf8")).trim().split(/\r?\n/);
      if (!/^\d+$/.test(port) || !path?.startsWith("/devtools/browser/")) {
        throw new Error("Invalid Edge DevToolsActivePort file.");
      }
      browserWSEndpoint = `ws://127.0.0.1:${port}${path}`;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  return puppeteer.connect({
    ...(browserWSEndpoint || endpoint?.startsWith("ws")
      ? { browserWSEndpoint: browserWSEndpoint ?? endpoint }
      : { browserURL: endpoint ?? "http://127.0.0.1:9222" }),
    defaultViewport: null,
    protocolTimeout: 20_000,
  });
}

function isGameUrl(value: string): boolean {
  const url = new URL(value);
  return url.hostname === "play.geforcenow.com" && url.pathname === "/games" &&
    url.searchParams.get("game-id") === "9ae698e4-030d-4a38-a656-064c6b101024";
}
