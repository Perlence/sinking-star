# Game facts

## Controls and interface

- Pressing 1 activates Red, 2 - Green, 3 - Blue, 4 - Yellow, 5 - Pink, 6 - Gray
- Restarting with R can be undone with Z.
- Unselected characters look grayish; color alone does not identify which characters are present.
- The flower-shaped tiles were pressure buttons; the circular tiles were exits.

## Characters

### Red

- Red bulky guy is the default sokoban pusher. He can push multiple objects, including other characters.
- Red can push dragons from the side without changing their facing direction.

### Green

- Green automatically pulls an adjacent object behind her when moving away, including rocks and other characters. She cannot walk into an occupied tile.
- Green can pull dragons without changing the direction they face. Approach from outside their fire lane.

### Blue

- Blue wizard swaps with the first object or character along a clear row or column, even several tiles away. Walls and active force fields block this ability. Account for distant targets before moving.
- Blue can swap with goblins. Swapping one next to another makes them kill each other; Yellow can protect Blue while he sets up a swap from a threatened tile.
- Blue can swap through metal bars, unlike solid walls. A crystal can replace him in a barred enclosure to let all characters escape.
- Hedge walls block Blue's swaps, unlike metal bars.
- Blue cannot teleport plants.

### Yellow

- Yellow priestess can survive adjacent goblin attacks and walk through dragon fire, but cannot push crystals. She also protects orthogonally adjacent allies from goblins and dragon fire; diagonal adjacency does not protect them. Moving her away can immediately expose an ally to a fatal attack.

### Pink

- Pink bard makes characters, monsters, and crystals within two tiles in both axes mirror her successful moves. Plants stay rooted. Her influence passes through walls, but affected objects still collide with walls. A blocked Pink move does not move them.
- A rooted plant can block a controlled object while Pink moves out of its range. Gray can crystallize the plant for transport by Pink, then restore it as a stationary obstacle.
- Gray does not transmute a plant when a mirrored move under Pink's influence sends him into it.
- All living objects and crystals under Pink's influence can move together, each entering a tile another vacates. Pink can also enter those vacated tiles on the same move.
- Red can push Pink without triggering her mirroring ability. Push her out of range to leave controlled objects in place.
- Goblins newly entering the Pink's aura start copying on her next move. The aura does not prevent them from killing her.
- Dragons under Pink's influence face her movement direction, even when a wall blocks their own movement. Account for the redirected fire.

### Gray

- Gray transforms an adjacent living organism (characters, monsters, plants) into a crystal by walking into it, and transforms a crystal back into an organism. The transformation leaves him on his original tile.

## Board mechanics

- Tall foreground walls can hide walkable tiles and exits. Test uncertain tiles rather than treating the rendered wall top as the grid boundary.
- Crystals can hold buttons down.
- Goblins can hold pressure buttons down. Keep one alive when its button is needed to open an exit route.
- Some force fields require multiple buttons to be pressed simultaneously.
- Reactivating a force field destroys crystals on its tile. Move characters clear first, destroy blocking crystals, then deactivate the field again to reopen the passage.
- A force field reactivating on a character disables that character. Undo restores the situation.
- Reactivating a force field on a goblin removes the goblin.
- Do not assume purple gates require clearing all monsters. They can be open with a living goblin elsewhere on the board.
- Exits do not require clearing every crystal; leave irrelevant crystals in place.
- Crystallized monsters retain their identity: Red can transport a crystallized dragon, and Gray can restore it with its original fire direction.
- An organism created on a pressure button keeps the button activated.

## Monsters and combat

- Goblins kill a character on an orthogonally adjacent tile. Diagonally adjacent tiles are safe, so route around their occupied tiles and four neighboring tiles.
- Goblins also kill each other when orthogonally adjacent. Push them with a crystal between the pusher and goblin to stay outside their attack range; pushing them against a wall does not crush them.
- Goblin combat can eliminate three at once: push one into a tile orthogonally adjacent to two others. Avoid eliminating a pair prematurely and leaving a lone survivor.
- Dragons attack along the row or column they face. Crystals block their fire and can shield a character pushing from the opposite side.
- A goblin killed by dragon fire blocks that fire for the rest of the turn.
- A goblin immediately in front of a dragon can kill it while simultaneously dying to its fire. Push the dragon sideways into this alignment to eliminate both.
- Opposing dragons can kill each other simultaneously. Keep a crystal between them while arranging them, then pull it out of their shared fire lane.

## Reusable tactics

- Green thief can pull Yellow behind her to maintain protection while crossing tiles next to goblins or along dragon fire lanes.
- Blue's swaps can preserve pressure-button occupancy and reposition characters without needing a walking route.
- Use another character as an intermediate swap target when a distant crystal would otherwise prevent Blue from stepping onto an empty tile.
- Swapping Green with Blue does not trigger her pull. This can relocate her without disturbing a crystal behind her on a button.
- Use a wall to hold a goblin in place while Pink leaves aura range, then reenter from another side to change their relative positions.
- Push a chain of two crystals when a single-crystal push would leave Red adjacent to a goblin. The extra crystal keeps Red one tile farther away.
- A crystal at the intersection of two dragon fire lanes can block both, allowing safe passage beyond it.
