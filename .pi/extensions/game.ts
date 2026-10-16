import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { setTimeout } from "node:timers/promises";
import { Type } from "@earendil-works/pi-ai";
import { defineTool, type ExtensionAPI } from "@earendil-works/pi-coding-agent";

// Pi's compiled Bun runtime needs the native binding's explicit filename.
const target = `${process.platform}-${process.arch}`;
const { Window } = createRequire(import.meta.url)(
  `node-screenshots-${target}/node-screenshots.${target}.node`,
) as typeof import("node-screenshots");
const WINE = "/Applications/CrossOver.app/Contents/SharedSupport/CrossOver/bin/wine";

export default function (pi: ExtensionAPI) {
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
        const autoHotkey = join(ctx.cwd, ".tools/AutoHotkey64.exe");
        if (!existsSync(autoHotkey)) {
          throw new Error(`Missing .tools/AutoHotkey64.exe. Install portable AutoHotkey into the ignored .tools directory:

mkdir -p .tools
gh release download v2.0.30 --repo AutoHotkey/AutoHotkey --pattern AutoHotkey_2.0.30.zip --dir .tools
unzip -jo .tools/AutoHotkey_2.0.30.zip AutoHotkey64.exe -d .tools
rm .tools/AutoHotkey_2.0.30.zip`);
        }

        const result = await pi.exec(WINE, [
          "--bottle=Steam",
          "--no-update",
          autoHotkey,
          "/ErrorStdOut",
          join(ctx.cwd, "wine-input.ahk"),
          input,
        ], { cwd: ctx.cwd, signal, timeout: 20_000 });

        if (result.code !== 0) {
          return {
            content: [{ type: "text", text: result.stdout + result.stderr }],
            details: undefined,
            isError: true,
          };
        }
        await setTimeout(500, undefined, { signal });
      }

      signal?.throwIfAborted();
      const windows = Window.all().filter(window =>
        window.title() === "Order of the Sinking Star" &&
        window.appName() === "sinking_star.exe"
      );
      if (windows.length !== 1) {
        throw new Error(`Expected one game window, found ${windows.length}. Check that the game is running and Screen Recording permission is enabled.`);
      }

      const screenshot = await (await windows[0].captureImage()).toPng();
      await writeFile(join(ctx.cwd, "board.png"), screenshot);
      return {
        content: [
          { type: "text", text: "" },
          {
            type: "image",
            data: screenshot.toString("base64"),
            mimeType: "image/png",
          },
        ],
        details: undefined,
      };
    },
  }));
}
