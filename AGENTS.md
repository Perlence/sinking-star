# Order of the Sinking Star bot

Order of the Sinking Star is a Sokoban-like puzzle video game. See the accumulated game knowledge in `MEMORY.md`.

## General rules

- Do not google the solution, you lazy ass.
- Do not read the game files.

## Memory

- Keep `MEMORY.md` notes general and reusable. Record game mechanics and broadly applicable insights, not puzzle-specific solutions or move sequences.
- If you've solved a puzzle and didn't learn any new facts, don't update `MEMORY.md`.

## Automation

- Install dependencies with `npm ci`. The project extension provides the `game` tool.
- Call `game({ input: "wasd" })` directly for keys and a screenshot, or `game({})` for a screenshot only.
- Check screenshots after meaningful batches. A successful tool call does not prove every intended move succeeded.

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
