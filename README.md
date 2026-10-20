# Order of the Sinking Star automaton

Watch the video:

[![Watch the video](https://img.youtube.com/vi/k_VeVyNUAro/maxresdefault.jpg)](https://www.youtube.com/watch?v=k_VeVyNUAro)

## Prerequisites

- [Order of the Sinking Star](https://store.steampowered.com/app/499170/Order_of_the_Sinking_Star/)
- [GeForce NOW](https://play.geforcenow.com/)
- A Chromium-based browser
- Node.js and npm
- [Pi](https://pi.dev/)

## Quick start

1. Run `npm ci` in the repo folder.
2. Enable remote debugging at chrome://inspect/#remote-debugging.
3. Launch the game at [GeForce NOW](https://play.geforcenow.com/) in the browser and start a puzzle.
4. Launch Pi in the repo folder and tell it, "Please solve this one."
5. Approve the debugging connection in the browser if prompted.

## Recommended models

In my experience, `gpt-6-astra` has consistently been the best both in terms of time and cost. I've also tried `claude-fable-5-1`, `claude-opus-5-5`, `gpt-6.1-sol`, and `glm-5.3-flash`, but they are substantially worse.
