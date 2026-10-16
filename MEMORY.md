# Game facts

## Controls and interface

- Pressing 1 activates Warrior, 2 - Thief, 3 - Wizard, 4 - Priestess, 5 - Bard, 6 - Druid
- Restarting with R can be undone with Z.
- Unselected characters look grayish; color alone does not identify which characters are present.
- The flower-shaped tiles were pressure buttons; the circular tiles were exits.

## Characters

### Warrior (red)

- Warrior bulky guy is the default sokoban pusher. He can push multiple objects, including other characters.
- Warrior can push dragons from the side without changing their facing direction.

### Thief (green)

- Thief automatically pulls an adjacent object behind her when moving away, including rocks and other characters. She cannot walk into an occupied tile.
- Thief can pull dragons without changing the direction they face. Approach from outside their fire lane.

### Wizard (blue)

- Wizard wizard swaps with the first object or character along a clear row or column, even several tiles away. Walls and closed gates block this ability. Account for distant targets before moving.
- Wizard can swap with goblins. Swapping one next to another makes them kill each other; Priestess can protect Wizard while he sets up a swap from a threatened tile.
- Wizard can swap through metal bars, unlike solid walls. A crystal can replace him in a barred enclosure to let all characters escape.
- Hedge walls block Wizard's swaps, unlike metal bars.
- Wizard cannot teleport plants.

### Priestess (yellow)

- Priestess priestess can survive adjacent goblin attacks and walk through dragon fire, but cannot push crystals. She also protects orthogonally adjacent allies from goblins and dragon fire; diagonal adjacency does not protect them. Moving her away can immediately expose an ally to a fatal attack.

### Bard (pink)

- Bard makes characters, monsters, and crystals within two tiles in both axes mirror her successful moves. Plants stay rooted. Her influence passes through walls, but affected objects still collide with walls. A blocked Bard move does not move them.
- A rooted plant can block a controlled object while Bard moves out of its range. Druid can crystallize the plant for transport by Bard, then restore it as a stationary obstacle.
- Druid does not transmute a plant when a mirrored move under Bard's influence sends him into it.
- All living objects and crystals under Bard's influence can move together, each entering a tile another vacates. Bard can also enter those vacated tiles on the same move.
- Warrior can push Bard without triggering her mirroring ability. Push her out of range to leave controlled objects in place.
- Goblins newly entering the Bard's aura start copying on her next move. The aura does not prevent them from killing her.
- Dragons under Bard's influence face her movement direction, even when a wall blocks their own movement. Account for the redirected fire.

### Druid (gray)

- Druid transforms an adjacent living organism (characters, monsters, plants) into a crystal by walking into it, and transforms a crystal back into an organism. The transformation leaves him on his original tile.

## Board mechanics

- Tall foreground walls can hide walkable tiles and exits. Test uncertain tiles rather than treating the rendered wall top as the grid boundary.
- Crystals can hold buttons down.
- Goblins can hold pressure buttons down. Keep one alive when its button is needed to open an exit route.
- Buttons and gates are color-coded: buttons control gates of the matching color. Distinguish close shades rather than treating similar-looking colors as one group.
- Some gates require multiple buttons to be pressed simultaneously.
- Gates close in different directions. The square frame remaining on an open gate marks its starting face; it closes perpendicular to that face, into the tile.
- Horizontally closing gates push crystals, characters, and monsters in their closing direction. They can push chains, including a crystal into a character or goblin.
- Top-to-bottom gates destroy crystals and goblins on their tile and disable characters when closed. Undo restores the situation. Move characters clear before using these gates to remove blocking objects.
- Do not assume purple gates require clearing all monsters. They can be open with a living goblin elsewhere on the board.
- Exits do not require clearing every crystal; leave irrelevant crystals in place.
- Crystallized monsters retain their identity: Warrior can transport a crystallized dragon, and Druid can restore it with its original fire direction.
- An organism created on a pressure button keeps the button activated.
- Align with a mirror's row or column to reveal a ghost marking the teleport destination. Press X to teleport across water to that tile; facing the mirror is not required.
- Angled mirrors redirect teleportation by 90 degrees while preserving tile distance from the mirror. Moving farther from a mirror before teleporting can reach a more distant island.

## Monsters and combat

- Goblins kill a character on an orthogonally adjacent tile. Diagonally adjacent tiles are safe, so route around their occupied tiles and four neighboring tiles.
- Goblins also kill each other when orthogonally adjacent. Push them with a crystal between the pusher and goblin to stay outside their attack range; pushing them against a wall does not crush them.
- Goblin combat can eliminate three at once: push one into a tile orthogonally adjacent to two others. Avoid eliminating a pair prematurely and leaving a lone survivor.
- Dragons attack along the row or column they face. Crystals block their fire and can shield a character pushing from the opposite side.
- A goblin killed by dragon fire blocks that fire for the rest of the turn.
- A goblin immediately in front of a dragon can kill it while simultaneously dying to its fire. Push the dragon sideways into this alignment to eliminate both.
- Opposing dragons can kill each other simultaneously. Keep a crystal between them while arranging them, then pull it out of their shared fire lane.

## Reusable tactics

- Thief thief can pull Priestess behind her to maintain protection while crossing tiles next to goblins or along dragon fire lanes.
- Wizard's swaps can preserve pressure-button occupancy and reposition characters without needing a walking route.
- Use another character as an intermediate swap target when a distant crystal would otherwise prevent Wizard from stepping onto an empty tile.
- Swapping Thief with Wizard does not trigger her pull. This can relocate her without disturbing a crystal behind her on a button.
- Use a wall to hold a goblin in place while Bard leaves aura range, then reenter from another side to change their relative positions.
- Push a chain of two crystals when a single-crystal push would leave Warrior adjacent to a goblin. The extra crystal keeps Warrior one tile farther away.
- A crystal at the intersection of two dragon fire lanes can block both, allowing safe passage beyond it.
- Directional gates supply pushes that characters cannot perform themselves. Alternate switches to move objects along a series of gates, or use a gate to push a crystal onto a boundary-row button.
