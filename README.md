# Segfault City

A browser-based narrative game with short mini-games, based on the lectures of CS50x (Harvard).
Hobby project. Not affiliated with or endorsed by Harvard or CS50.

## Run
No build step. Serve the folder (fetch() needs http):

    python -m http.server 8000
    # open http://localhost:8000

## Structure
- `index.html` entry point
- `css/base.css` layout; `css/pixel.css` blocky pixel theme (all weeks except 7); `css/noir.css` week 7 theme
- `js/main.js` boot, district loader, save/progress
- `js/engine/story.js` tiny dialogue player
- `js/engine/save.js` localStorage progress
- `js/minigames/` one module per mini-game (`mount(el, config, onDone)`)
- `data/districts.json` the world map (all weeks, status "todo" until built)
- `data/districts/week3.json` Sorting Yards: dialogue + mini-game configs

## Add a district
1. Add `data/districts/weekN.json` (dialogue + `games` list).
2. Create a mini-game module in `js/minigames/` and register it in `js/main.js` (`GAMES`).
3. Set `status` to `ready` in `data/districts.json`.

## License
Content derived from CS50x, which is CC BY-NC-SA 4.0. This project is therefore released under
CC BY-NC-SA 4.0 too: attribute CS50 / David J. Malan and Harvard, link the license
(https://creativecommons.org/licenses/by-nc-sa/4.0/), note changes, non-commercial only.
All art is drawn in code/CSS; no Minecraft or CS50 assets are used.
