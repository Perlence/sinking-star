#!/usr/bin/env -S uv run
"""Send background game keys and save board.png; omit keys for a screenshot."""

import argparse
import subprocess
from inspect import cleandoc
from pathlib import Path
from tempfile import TemporaryDirectory

import Quartz
from PIL import Image

ROOT = Path(__file__).resolve().parent
SCREENCAPTURE = "/usr/sbin/screencapture"
WINE = "/Applications/CrossOver.app/Contents/SharedSupport/CrossOver/bin/wine"
AUTOHOTKEY = ROOT / ".tools/AutoHotkey64.exe"
OUTPUT = Path("board.png")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("keys", nargs="?", default="", help="Sequence: wasd, c, z, r, 1–9")
    args = parser.parse_args()
    if any(key not in "wasdczr123456789" for key in args.keys):
        parser.error("Unsupported key")
    if args.keys:
        if not AUTOHOTKEY.is_file():
            parser.error(
                cleandoc(
                    """
                    Missing .tools/AutoHotkey64.exe. Install portable AutoHotkey into the ignored `.tools` directory:

                    ```sh
                    mkdir -p .tools
                    gh release download v2.0.30 --repo AutoHotkey/AutoHotkey --pattern AutoHotkey_2.0.30.zip --dir .tools
                    unzip -jo .tools/AutoHotkey_2.0.30.zip AutoHotkey64.exe -d .tools
                    rm .tools/AutoHotkey_2.0.30.zip
                    ```
                    """
                )
            )
        subprocess.run(
            [WINE, "--bottle=Steam", "--no-update", str(AUTOHOTKEY),
             "/ErrorStdOut", str(ROOT / "wine-input.ahk"), args.keys],
            check=True,
        )
    capture_board()
    print(OUTPUT)


def capture_board():
    windows = Quartz.CGWindowListCopyWindowInfo(
        Quartz.kCGWindowListOptionAll, Quartz.kCGNullWindowID
    )
    matches = [
        window
        for window in (windows or [])
        if window.get(Quartz.kCGWindowName) == "Order of the Sinking Star"
        and window.get(Quartz.kCGWindowOwnerName) == "sinking_star.exe"
        and window.get(Quartz.kCGWindowLayer) == 0
    ]
    if len(matches) != 1:
        raise RuntimeError(
            f"Expected one game window, found {len(matches)}. "
            "Check that the game is running and your terminal has macOS Screen Recording permission."
        )
    window_id = matches[0][Quartz.kCGWindowNumber]
    with TemporaryDirectory(prefix="sinking-star-") as directory:
        raw = Path(directory) / "window.png"
        subprocess.run(
            [SCREENCAPTURE, "-x", "-o", "-l", str(window_id), str(raw)],
            check=True,
        )
        with Image.open(raw) as image:
            w, h = image.size
            board = image.crop((0, int(h * 0.241), w, int(h * 0.789)))
            board.resize((1400, 890)).save(OUTPUT)


if __name__ == "__main__":
    main()
