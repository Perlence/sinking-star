#!/usr/bin/env -S uv run
"""Focus the game, send keys, then capture the board."""

import argparse
import json
import subprocess
import time
from pathlib import Path

from PIL import Image

HS = "/Applications/Hammerspoon.app/Contents/Frameworks/hs/hs"
RAW = Path("/tmp/sinking-star-window.png")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("keys", nargs="?", default="", help="Sequence: wasd, c, z, r, 1–9")
    parser.add_argument("--output", default="sinking-star-board.png")
    args = parser.parse_args()
    if any(key not in "wasdczr123456789" for key in args.keys):
        parser.error("Unsupported key")
    RAW.unlink(missing_ok=True)
    lua = """
        local app = hs.application.get('sinking_star.exe')
        assert(app, 'Game is not running')
        app:activate()
        local keys = KEYS
        gameTimers = {}
        local function later(delay, callback)
            table.insert(gameTimers, hs.timer.doAfter(delay, callback))
        end
        for i = 1, #keys do
            local key = keys:sub(i, i)
            later((i - 1) * 0.4, function()
                hs.eventtap.event.newKeyEvent({}, key, true):post(app)
                later(0.1, function()
                    hs.eventtap.event.newKeyEvent({}, key, false):post(app)
                end)
            end)
        end
        later(#keys * 0.4 + 0.5, function()
            for _, window in ipairs(app:allWindows()) do
                if window:title():find('Order of') then
                    window:snapshot():saveToFile(RAW)
                    break
                end
            end
        end)
    """.replace("KEYS", json.dumps(args.keys)).replace("RAW", json.dumps(str(RAW)))
    subprocess.run([HS, "-c", lua], check=True)
    deadline = time.monotonic() + len(args.keys) * 0.4 + 10
    while not RAW.exists():
        if time.monotonic() > deadline:
            raise TimeoutError("Game screenshot was not captured")
        time.sleep(0.1)
    with Image.open(RAW) as image:
        w, h = image.size
        board = image.crop((0, int(h * 0.241), w, int(h * 0.789)))
        board.resize((1400, 890)).save(args.output)
    print(args.output)


if __name__ == "__main__":
    main()
