# Family Task Card – notes for Claude

Home Assistant Lovelace card (HACS): gamified family chores from `todo.*`
lists – points, levels, rewards, kid and kiosk mode. Maintainer: renespeaker.
Sister project: Family Board Card (`renespeaker/ha-family-board-card`).

## Working with the maintainer
- Talk to the maintainer in **German**. Commit messages may be German.
- Show drafts of anything posted on GitHub (issue replies, comments) **before**
  posting. Open PRs, merge and release only when asked.
- The maintainer publishes releases. Claude prepares notes and verifies the
  result afterwards; see the `release` skill.
- The maintainer also develops here in other sessions – pull `main` first.
- If you suggest an idea, check the code and `ROADMAP.md` first.

## Rules for anything public (README, ROADMAP, PRs, release notes, issue replies)
- English first: `README.md` / `ROADMAP.md` are English, the `.de.md` files
  German – keep them in sync.
- Neutral and feature-focused. Never say a feature was taken from another project.
- No version indicator inside the card UI.
- No marketing posts (forums, Reddit) unless asked.
- No model names in commits, PRs or release notes.

## Task Card and Board are independent
Users may run only the task card, only the board, or both. Neither may depend
on the other at runtime – only on HA entities (`person.*`, `todo.*`,
`input_number.*` …). Separate versions and releases; the other card may only be
mentioned as a hint. `src/shared/person-palette.ts` is mirrored in both repos;
`npm run check:shared` warns (never fails) if they drift.

## Code map
- `src/ha-family-task-card.ts` – the card.
- `src/editor.ts` – visual editor. `src/localize.ts` – strings EN/DE; language
  falls back hass → browser → English.
- `family-task-card.js` (repo root) – committed bundle that HACS serves;
  rebuild with `rm -f family-task-card.js && npm run build`.
- `docs/microsoft-todo*.md` – illustrated Microsoft To Do setup guide.

## Checks
- `npm run lint`, `npm run format:check`, `npm test` (Vitest), `npm run build`.
- New features get tests; verify a test bites by briefly breaking the code.
- New options are opt-in so existing cards don't change.
