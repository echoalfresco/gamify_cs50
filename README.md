# Segfault City

A retro-pixel narrative game that turns the lectures of CS50x into a city you can explore. There are eleven districts, one per lecture week, each with short mini-games and a rubber duck who gives hints without giving the answer.

<img width="1147" height="701" alt="image" src="https://github.com/user-attachments/assets/3b9ac59b-719e-4990-b71c-56494384b245" />


**Play it:** https://gamifycs50.vercel.app/

> Unofficial fan project. Not affiliated with or endorsed by Harvard University or CS50.

## What is it?

You are a new engineer in Segfault City, where the systems keep failing. Each district maps to a week of the course. Clear its puzzles to restore it, and earn up to three stars per district. Progress is saved in your browser.

Weeks 0 to 10 use a blocky pixel look. Week 7, the Detective Bureau, switches to a clean noir style, and you solve its case by writing real SQL.

## Districts

| Week | District | Topic | Mini-games |
|---|---|---|---|
| 0 | Toy Workshop | Scratch | Program a robot with loops, light binary lamps |
| 1 | Foundry | C | Order the compile pipeline, spot the buggy line |
| 2 | Cipher Quarter | Arrays | Crack Caesar ciphers, index into a string |
| 3 | Sorting Yards | Algorithms | Sort crates by swaps, find a crate with binary search |
| 4 | Warehouse Row | Memory | malloc and free shelves, follow pointers by address |
| 5 | Transit Hub | Data structures | Re-link a linked list, fill a hash table |
| 6 | Library | Python | Write real Python in the browser, C vs Python quiz |
| 7 | Detective Bureau | SQL | Solve The Crimson Star with SQL queries (noir theme) |
| 8 | Billboard Boulevard | HTML, CSS, JS | Edit a live page, click-handler quiz |
| 9 | Control Tower | Flask | Follow a web request, route and security quiz |
| 10 | The Oracle | AI | Catch hallucinations, prompt and safety quiz |

## Run it locally

There is no build step. You only need a static file server, because the game loads its data with `fetch()`.

```
git clone https://github.com/echoalfresco/gamify_cs50.git
cd gamify_cs50
python -m http.server 8000
```

On Windows you may need `py -m http.server 8000`. Then open http://localhost:8000.

Week 6 loads Pyodide and Week 7 loads sql.js from the jsDelivr CDN, so those two levels need an internet connection.

## How it is built

- Plain HTML, CSS and JavaScript (ES modules). No framework, no bundler.
- Data driven: each district is a JSON file with its dialogue, scene order and mini-game settings.
- One small module per mini-game type, all with the same interface.
- Pixel art is drawn with CSS, so there are no image assets.

```
index.html
css/            themes (pixel, noir) and mini-game styles
data/
  districts.json     the city map
  districts/         one JSON file per week
js/
  main.js            boot, map, scene runner, game registry
  engine/            dialogue player and save system
  minigames/         one module per mini-game type
```

By default every ready district is unlocked. To require clearing districts in order, set `DEV_UNLOCK_ALL` to `false` in `js/main.js`.

## Contributing

New puzzles, bug fixes, art and accessibility improvements are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add a mini-game or a district, and for the content rules (original puzzles only, no copied problem sets).

## License and attribution

This project is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). It is based on the lectures of [CS50x](https://cs50.harvard.edu/x/), which use the same license, so you may share and adapt it with credit, for non-commercial use, under the same terms. See [LICENSE](LICENSE) for details.

CS50 and Harvard names and logos belong to their owners and are not used here.
