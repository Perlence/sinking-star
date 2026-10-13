# Order of the Sinking Star bot

Order of the Sinking Star is a Sokoban-like puzzle video game. See the accumulated game knowledge in `MEMORY.md`.

## Memory

- Keep `MEMORY.md` notes general and reusable. Record game mechanics and broadly applicable insights, not puzzle-specific solutions or move sequences.
- If you've solved a puzzle and didn't learn any new facts, don't update `MEMORY.md`.

## Automation

- Use `game.py` for key sequences and screenshots. Chain execution and image reading in one `codemode` call to reduce overhead. Example:
  ```js
  const r = await tools.bash({command: "uv run game.py wasd", timeout: 20});
  if (r.exit_code !== 0) throw new Error(r.output);
  image(await tools.read({path: "board.png"}));
  ```
- Run `uv run game.py` without keys for a screenshot only.
- Check screenshots after meaningful batches. A successful script exit does not prove every intended move succeeded.

## Controls

- Up: W
- Down: S
- Left: A
- Right: D
- Run: Shift
- Speed up time: Alt
- Run and slow time: Control
- Restart: R
- Undo: Z
- Primary action: X
- Switch characters: C, 1-9
- Secondary action: V
- Niche action: F
- Overhead view: Tab (in Overworld)
- Local area view Q (in Overworld)
- Level preview: Space (in Overworld)
