# Louder or Quieter (LOQ)

## Description
LOQ is a lightweight browser game where players guess whether one sound source is louder or quieter than another. It runs offline by simply opening `index.html` and stores scores locally.

Note: This project was built as a freelance engagement for a sound engineering company to use at tech events/tradeshows.

## Why?
- Provide a fun, quick, and visual way to engage audiences at events
- Educate participants on relative sound levels (decibels) through play
- Operate offline with zero setup, suitable for kiosks and demos

## Quick Start
- Double‑click `index.html` to play (no installation required).
- Windows alternative: double‑click `start_game.bat` to start a tiny local server and open your browser automatically.
- Optional (development):
  ```bash
  npm start
  # opens http://localhost:8080
  ```

## Usage
1. Open `index.html`.
2. Fill the start form (nickname, email, consent) and click Start.
3. Decide if the right item is “Louder” or “Quieter” than the left and click the corresponding button.
4. Each correct answer increases your streak. A wrong answer ends the run and shows your result and rank.
5. High streaks are saved locally using `localStorage` and displayed on the start screen.

Notes
- Works fully offline. No data is transmitted; all data is stored in the browser only.
- The UI includes animations and smooth transitions for a polished event experience.

## Changing/Adding Questions
Images in `assets/images/` define the available items. Filenames must follow:
- `ItemName_dB.png`
  - Example: `Lion_(Roaring)_114.png` → item “Lion (Roaring)” at 114 dB

Then regenerate `js/utils/questions.js`:
- Option A (Node script):
  ```bash
  npm run generate-questions
  ```
  This runs `node generateQuestions.js` and writes `js/utils/questions.js`.

- Option B (Windows helper):
  - Double‑click `update_questions_and_start.vbs` to rebuild and launch the game.

Details
- Items are sorted by dB descending during generation.
- The browser build expects `questions` to be available as a global constant when running from `file://`.

## Contributing
Contributions and improvements are welcome.
- Fork the repo and create a feature branch.
- Keep code clear and modular. The game is organized into `js/StorageManager.js`, `js/Player.js`, `js/Game.js`, `js/StartScreen.js` (exposed via globals for offline use).
- Test by opening `index.html` directly and via `npm start`.
- Submit a pull request with a concise description of changes and screenshots/GIFs for UI updates.


