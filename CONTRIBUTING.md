# Contributing to Segfault City

Thanks for wanting to join in! This is a hobby project, so the process is light: friendly, small, and fun.

## Ways to help

- Play it and report bugs or confusing puzzles (open an Issue).
- Fix a typo or improve a hint.
- Add a new mini-game to an existing district.
- Improve accessibility (keyboard play, screen readers, colour contrast).
- Add pixel art, sound effects or animations (original or properly licensed only).
- Improve mobile layout.

## Ground rules

1. **Original content only.** Write your own puzzles. Do not copy CS50 problem set specifications, starter code or solutions. CS50 has an academic honesty policy, and this game should teach concepts, not leak answers.
2. **No official branding.** Do not add Harvard or CS50 logos or imply endorsement.
3. **No third-party game assets** (for example from Minecraft). Draw with CSS or use assets you have the right to share, and say where they come from in your pull request.
4. **Non-commercial.** Contributions are licensed under CC BY-NC-SA 4.0, like the rest of the project (see LICENSE).
5. **Keep it dependency-free.** The game is plain HTML, CSS and JavaScript with no build step. Libraries loaded from a CDN need a strong reason.
6. **Be kind.** Help newcomers, and assume good intent.

## Run it locally

```
python -m http.server 8000
```

On Windows you may need `py -m http.server 8000`. Then open http://localhost:8000 and hard-refresh (Ctrl+Shift+R) after changes.

## How the game is organised

- `data/districts.json` is the city map: one entry per week with `week`, `name`, `topic`, `theme` (pixel or noir), `status` (ready or todo) and `file`.
- `data/districts/weekN.json` holds one district: lecture link, dialogue, the order of scenes, and the list of mini-games with their settings.
- `js/minigames/*.js` holds one module per mini-game type.
- `js/main.js` registers mini-games in the `GAMES` object and runs the scenes.
- `css/` holds the themes. `pixel.css` is the blocky look, `noir.css` is Week 7.

## Add a mini-game

1. Create `js/minigames/yourGame.js` exporting:

```js
export function mount(el, cfg, onDone) {
  // draw into el using settings from cfg
  // when the player finishes, call onDone(stars) once, with stars from 1 to 3
}
```

2. Import it in `js/main.js` and add it to `GAMES`.
3. Add an entry to a district file under `games`, with `type` set to your module name plus its settings, and reference it in `sequence` by index.
4. Use `textContent` (not `innerHTML`) for anything that is not trusted markup.

Existing modules like `quiz.js` and `orderCards.js` are small and good templates, and `quiz.js` is reused by several districts.

## Add or improve a district

A district file has this shape:

```json
{
  "lecture": { "label": "CS50x Week N: Topic", "url": "https://cs50.harvard.edu/x/weeks/N/" },
  "sequence": [ { "type": "dialogue", "id": "intro" }, { "type": "game", "id": 0 } ],
  "dialogue": { "intro": [ { "who": "Duck", "text": "Quack." } ] },
  "games": [ { "type": "quiz", "title": "...", "instructions": "...", "rounds": [] } ]
}
```

Keep each mini-game to roughly two to five minutes, teach one idea through play, and make wrong answers explain why.

## Before you open a pull request

- Play your change from start to finish in a browser and check the console (F12) for errors.
- Check that you can win the level and that wrong answers show helpful feedback.
- Check it on a narrow (phone-sized) window.
- Keep pull requests small and describe what you changed and why.

## Good first ideas

- Keyboard controls for the click-based mini-games.
- Sound effects with a mute button.
- Pixel sprites for the Duck and the characters.
- Progress reset and export buttons.
- Translations of the dialogue.
- A second mini-game for districts that currently have one weak spot.

Thank you for helping!
