# Game facts

- Pressing 1 activates Red, 2 - Green, 3 - Blue.
- Red is the default sokoban pusher. He can push multiple objects, including other characters.
- Blue swaps with the first object or character along a clear row or column, even several tiles away. Walls and active force fields block this ability. Account for distant targets before moving.
- Blue's swaps can preserve pressure-button occupancy and reposition characters without needing a walking route.
- Blue can swap through metal bars, unlike solid walls. A crystal can replace him in a barred enclosure to let all characters escape.
- Use another character as an intermediate swap target when a distant crystal would otherwise prevent Blue from stepping onto an empty tile.
- Green automatically pulls an adjacent object behind her when moving away, including rocks. She cannot walk into an occupied tile.
- Unselected characters look gray; color alone does not identify which characters are present.
- The flower-shaped tiles were pressure buttons; the circular tiles were exits.
- Crystals can hold buttons down.
- Reactivating a force field destroys crystals on its tile. Move characters clear first, destroy blocking crystals, then deactivate the field again to reopen the passage.
- Hedge walls block Blue's swaps, unlike metal bars.
- A force field reactivating on a character disables that character. Undo restores the situation.
