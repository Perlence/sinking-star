# Game facts

## Controls and interface

- Pressing 1 activates Warrior, 2 - Thief, 3 - Wizard, 4 - Priestess, 5 - Bard, 6 - Druid, 9 - Merchant
- Restarting with R can be undone with Z.
- Unselected characters look grayish; color alone does not identify which characters are present.
- The flower-shaped tiles were pressure buttons; the circular tiles were exits.
- Verify completion from a clear success indication or progression to the next stage. A character disappearing or the board changing appearance is not enough.

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
- Priestess can cross water while in a dragon's fire lane, orthogonally adjacent to a goblin, or protecting an adjacent ally from attack. Without an attack sustaining her protection, she drowns. Chain goblin attack zones across gaps, and use land or goblin adjacency to turn between separate fire lanes.
- An ally taking dragon fire can cross water alongside Priestess, even while blocking the fire from reaching her. An unattacked ally does not stay afloat merely by being adjacent to her. Keep the ally between the dragon and Priestess: Warrior can push her away from the dragon, and Thief can pull her toward it. Reach land before separating.

### Bard (pink)

- Bard makes characters, monsters, and crystals within two tiles in both axes mirror her successful moves. Plants stay rooted. Her influence passes through walls, but affected objects still collide with walls. A blocked Bard move does not move them.
- Bard can move submerged stepping-stones between water tiles, but not back onto land. She cannot ride one across open water. Block its mirrored move against the shore before stepping onto it, then reposition it from land to reuse it for another crossing.
- A rooted plant can block a controlled object while Bard moves out of its range. Druid can crystallize the plant for transport by Bard, then restore it as a stationary obstacle.
- Druid does not transmute a plant when a mirrored move under Bard's influence sends him into it.
- All living objects and crystals under Bard's influence can move together, each entering a tile another vacates. Bard can also enter those vacated tiles on the same move.
- Warrior can push Bard without triggering her mirroring ability. Push her out of range to leave controlled objects in place.
- Goblins newly entering the Bard's aura start copying on her next move. The aura does not prevent them from killing her.
- Dragons under Bard's influence face her movement direction, even when a wall blocks their own movement. Account for the redirected fire.

### Druid (gray)

- Druid transforms an adjacent living organism (characters, monsters, plants) into a crystal by walking into it, and transforms a crystal back into an organism. The transformation leaves him on his original tile.

### Merchant (orange)

- A basic Sokoban pusher. Cannot push more than 1 object.

## Board mechanics

- Tall foreground walls can hide walkable tiles and exits. Test uncertain tiles rather than treating the rendered wall top as the grid boundary.
- Crystals can hold buttons down.
- Buttons can be hidden beneath creatures or objects; move the occupant to reveal them.
- Goblins can hold pressure buttons down. Keep one alive when its button is needed to open an exit route.
- Buttons and gates are color-coded: buttons control gates of the matching color. Distinguish close shades rather than treating similar-looking colors as one group.
- Some gates require multiple buttons to be pressed simultaneously.
- Some gates close rather than open when their buttons are pressed. The same buttons can close a land gate and activate a water bridge, so check the departure and landing tiles separately.
- Gates close in different directions. The square frame remaining on an open gate marks its starting face; it closes perpendicular to that face, into the tile.
- Horizontally closing gates push crystals, characters, and monsters in their closing direction. They can push chains, including a crystal into a character or goblin.
- Top-to-bottom gates destroy crystals and goblins on their tile and disable characters when closed. Undo restores the situation. Move characters clear before using these gates to remove blocking objects.
- Do not assume purple gates require clearing all monsters. They can be open with a living goblin elsewhere on the board.
- Exits do not require clearing every crystal; leave irrelevant crystals in place.
- Crystallized monsters retain their identity: Warrior can transport a crystallized dragon, and Druid can restore it with its original fire direction.
- An organism created on a pressure button keeps the button activated.
- Align with a mirror's row or column to reveal a ghost marking the teleport destination. Press X to teleport across water to that tile; facing the mirror is not required.
- Angled mirrors redirect teleportation by 90 degrees while preserving tile distance from the mirror. Moving farther from a mirror before teleporting can reach a more distant island.
- Mirrors reflect only from their facing sides. A red projection marks a blocked destination. A non-red projection can still be over water; teleporting there drowns the character.
- A mirror's nonreflective side blocks the line of sight to mirrors beyond it.
- Plain mirrors do not initiate teleportation themselves, but their reflective sides can redirect a rainbow mirror's projected path. The total path length after the rainbow mirror equals the character's distance from it; count every segment through subsequent mirrors.
- Solid walls block the reflected path from a mirror to its destination. Increasing the teleport distance does not let a character jump past them.
- With multiple valid mirror images, X replaces a character or crystal with a real copy at each reflected destination. Existing copies can split again, so two mirrors can create more than two copies over successive uses.
- Two crystals reflected onto the same empty tile merge into one when X is pressed. This can remove excess crystallized plants and clear mirror sightlines.
- Mirror-created copies share movement inputs, but a blocked copy stays still while others move. Use island edges or walls to adjust their relative positions and fill separate exits.
- Copies of the same character merge when multiple mirrors teleport them onto the same empty tile. Walking one copy into another does not merge them.
- X activates mirrors globally, including reflections of unselected characters and crystals. Keep characters out of mirror alignment when they must stay in place.
- Mirror teleports resolve simultaneously; evaluate hazards and protection at the destinations.
- A mirror teleport can safely land on an inactive bridge if another object teleports onto its required button during the same X action. This also lets a character leave a gate tile on the turn the gate closes.
- A blocked reflection can prevent other mirrors from activating. Interrupt the offending sightline with a character or crystal whose reflected destination is clear.
- X can teleport an adjacent crystal or monster, or retrieve a distant crystal through its adjacent mirror image. It also teleports the character if they have a valid projection; a crystal blocking their sightline can keep them in place.
- Mirrors can be pushed or pulled without changing their orientation, including across stepping-stones, to reposition teleport routes. Leave room to stand behind a mirror when it must be pushed back later.
- Boulders and crystals pushed into water become walkable stepping-stones. A crystal teleported into water does too, creating a landing tile for a later character teleport. Other objects, including mirrors, can be pushed across them.
- Colored bridges over water are walkable when glowing, not when retracted. One button can control bridges with opposite activation states. Retracting a bridge beneath a crystal removes it as a fire shield.

## Monsters and combat

- Goblins kill a character on an orthogonally adjacent tile. Diagonally adjacent tiles are safe, so route around their occupied tiles and four neighboring tiles.
- Goblins also kill each other when orthogonally adjacent. Push them with a crystal between the pusher and goblin to stay outside their attack range; pushing them against a wall does not crush them.
- Goblin combat can eliminate three at once: push one into a tile orthogonally adjacent to two others. Avoid eliminating a pair prematurely and leaving a lone survivor.
- Dragons attack along the row or column they face. Crystals block their fire and can shield a character pushing from the opposite side.
- Dragon fire crosses water and retracted bridges. It can kill another dragon holding a distant pressure button, releasing the button.
- A goblin killed by dragon fire blocks that fire for the rest of the turn.
- A goblin immediately in front of a dragon can kill it while simultaneously dying to its fire. Push the dragon sideways into this alignment to eliminate both.
- Opposing dragons can kill each other simultaneously. Keep a crystal between them while arranging them, then pull it out of their shared fire lane.

## Reusable tactics

- Two mirrors can supply unlimited crystals: split a crystal into two safe destinations, move one copy out of mirror alignment, then retrieve the other through its adjacent image and split it again. Sink the spare copies to build a bridge.
- A sunk crystal need not connect to shore. Teleport onto it as an isolated staging point, then have another character reposition the mirror to enable a longer second teleport. Plan the landing and departure mirror positions separately.
- Replace a character blocking an invalid mirror reflection with a crystal so the character can leave. The crystal can keep the mirror usable while shuttling between two safe reflected positions.
- Stand between a crystal and one of its mirrors to suppress that reflection while another mirror transports the crystal. The character can teleport simultaneously along the intercepted branch. Druid can restore transported crystals to plants to keep them out of later global mirror activations.
- Temporarily split a character to block multiple mirror sightlines at once, keeping button crystals stationary during another character's teleport. Reunite the copies through mirrors afterward.
- Thief can pull Priestess behind her to maintain protection while crossing tiles next to goblins or along dragon fire lanes.
- Wizard's swaps can preserve pressure-button occupancy and reposition characters without needing a walking route.
- Use another character as an intermediate swap target when a distant crystal would otherwise prevent Wizard from stepping onto an empty tile.
- Swapping Thief with Wizard does not trigger her pull. This can relocate her without disturbing a crystal behind her on a button.
- Use a wall to hold a goblin in place while Bard leaves aura range, then reenter from another side to change their relative positions.
- Push a chain of two crystals when a single-crystal push would leave Warrior adjacent to a goblin. The extra crystal keeps Warrior one tile farther away.
- A crystal at the intersection of two dragon fire lanes can block both, allowing safe passage beyond it.
- Directional gates supply pushes that characters cannot perform themselves. Alternate switches to move objects along a series of gates, or use a gate to push a crystal onto a boundary-row button.
- Shield a creature on a pressure button with a crystal on a retractable bridge. After the characters leave the area, retract the bridge remotely to remove the shield and let a dragon kill the button's occupant.
- Warrior can push Priestess and a dragon as a chain, keeping her between him and its fire while moving the dragon against its facing direction.
- Priestess can stand between opposing dragons to delay their mutual destruction. If one holds a bridge-retracting button, stepping out of their fire lane can kill both and restore the bridge beneath her destination on that same move.
- Relay Priestess between separate goblin attack zones using two threatened allies. Warrior can push her out over water, then Thief can enter an attacked water tile on her opposite side. With both allies adjacent to Priestess, Warrior can retreat to land while Thief sustains her protection, then pulls her onto the far shore.
