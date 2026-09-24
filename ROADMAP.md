# Family Task Card — Roadmap

> 🌐 **English** (this page) · [Deutsch](ROADMAP.de.md)

Vision, MVP and planned stages. It builds on the design decisions so far and on
an interactive concept mock-up (grown-up board, kid mode, phone configuration,
context tasks, reward shop, the kiosk moment, shopping with Bring!).

## Guiding idea

> Turn every to-do (Apple Reminders, Todoist, Google Tasks, HA, Bring!) into a
> **smart, gamified** family task that reacts to the real world.

The unfair advantage over standalone apps: **context from Home Assistant**
(calendar, weather, presence, sensors) plus the tasks in one place — in the look
of the Family Board Card.

## Architecture principles

- **Provider-agnostic through `todo.*` entities.** Apple Reminders (CalDAV/
  iCloud), Todoist, Google Tasks, Bring! and local to-do lists all appear in HA
  as `todo` entities. The card reads and writes those → **bidirectional**,
  without a line of per-provider code.
- **Theme-aware.** HA CSS variables throughout (`--card-background-color`,
  `--primary-text-color`, `--divider-color`, accent = `--primary-color`), and the
  same person palette as the Family Board Card.
- **Gamification as its own layer.** Ownership, points, rewards and approvals are
  managed by the Family Task Card on top (Bring! and todo lists have no notion of
  "who is responsible").
- **Local & private.** No separate cloud account for children.
- **A plain Lovelace card.** Shipped as a HACS dashboard card (like the Family
  Board Card) — no integration, no restart. An optional backend (for a persistent
  points history and approvals) can follow later.

## MVP (v0.x)

The goal: a usable, coherent card with the core loop.

- [x] The card (grown-up board) in the Family Board look: a column per person,
      avatar, tiles with an emoji and a `border-left` accent, checking off writes
      back to the `todo` entity (read live via `todo/item/list`).
- [x] Points and family-goal progress (points per completed task, the family goal
      as a progress bar).
- [x] Mapping family members (`person.*`) ↔ `todo.*` lists — **through the card
      configuration** (`persons`), as in the Family Board Card. A visual editor
      (phone configuration) follows below.
- [x] **Visual card editor** (`LovelaceCardEditor`) — people (add/reorder/remove),
      `person.*` and `todo.*` lists through pickers, colour, points and goal
      through the UI instead of YAML; "detect people" picks up `person.*`. Works
      on a phone too.
- [x] **Kid mode** (`kid_mode`) — a big, tappable single-child layout for the wall
      tablet: avatar switcher at the top, XL task tiles with emoji, a points/goal
      bar and confetti feedback on check-off.
- [x] **Shopping with Bring!** (the card's part) — `shopping_lists` shows a Bring!
      list as a single "shopping" tile with 🛒, an item count, points
      (`shopping_points`) and an "open in Bring!" button; checking it off completes
      the whole trip in sync. Push delivery ships as an HA automation template
      (`examples/bring-push-automation.yaml`), not as card code.

> **Architecture decision.** The card reads and writes `todo` entities directly
> from the frontend (`hass.callWS` / `todo.update_item`) and is set up through the
> card configuration — exactly like the Family Board Card. Shipped as a plain
> **HACS Lovelace card** (no integration, no restart). Persistent gamification
> (points history, reward approvals, assignments) can move to an **optional
> backend** once state has to outlive the runtime.

## Killer features (after the MVP)

- [x] **Context tasks** — overdue tasks are marked urgent automatically;
      `context_rules` react to any HA entity (weather, presence, calendar,
      sensors) and hide tasks, highlight them or flag them as urgent. The
      escalation push stays an HA automation.
- [x] **Reward shop with parental approval** — `rewards` in the config, balance =
      earned − redeemed (redeemed held in an `input_number` per person), redeeming
      behind a **parent PIN** right in the card (board and kid mode). Open
      (backend): asynchronous approval by push, photo proof, automatic pocket money.
- [x] **Celebrate actions** — make success tangible through HA:
      `celebrate.actions` calls any HA service (light/sound/TTS/push) on
      `all_done` / `task` / `reward`, with `{name}`/`{task}` placeholders.
- [x] **Person switch by NFC/presence** — `active_person_entity`: the card follows
      the active person (kid mode focuses, the board highlights); HA sets the
      entity from an NFC tag, presence or a button.
- [x] **Kiosk layout** — a dedicated wall-tablet layout (`kiosk`): a "whose turn
      is it?" idle screen with large avatars, tapping focuses that person, and
      `auto_return` goes back to the selection after a while.
- [x] **Appearance sliders** — in the visual editor: `scale` (the whole card),
      `font_scale` (text only) and `avatar_scale` (avatars/pictures only), each in %.

## Later / roadmap

- [ ] Assign a single item to a person (instead of "the whole shopping trip").
- [ ] Location reminders (geofence) and auto-assignment to "whoever is out".
- [ ] Fair auto-rotation of recurring chores ("taking turns").
- [x] Levels and badges (from earned points) plus a family leaderboard
      (`level_size`, `level_emojis`, `show_leaderboard`). Open: avatar progress,
      statistics/history.
- [x] **Add a task** right in the card (`todo.add_item`, wherever the list
      supports CREATE; `allow_add`).
- [x] **Sorting and filtering** of open tasks (`sort`, `hide_empty`, `due_soon`).
- [x] **Bilingual (EN/DE)** — the language follows the HA interface (`localize.ts`).
- [x] **Theme-aware plus a dark-mode switch** — follows the HA theme; `theme:
      auto|dark|light` forces a colour scheme inside the card (for a wall tablet, say).
- [ ] A read-aloud / symbol mode for children who cannot read yet; chore packs by age.
- [x] **Due tasks in the Family Board Card** — since board v0.27 that card can show
      due tasks from the same `todo.*` lists as chips. Both cards stay independent:
      neither requires the other. Open: nothing planned — a deeper coupling would
      break single-card installs.
- [ ] More languages (currently EN/DE).
- [x] **English documentation** — README and roadmap are English first, with the
      German versions alongside as `README.de.md` / `ROADMAP.de.md`.
- [x] **Capability detection** — the card reads `supported_features` of the `todo`
      entity; lists that cannot be checked off are shown read-only (🔒) instead of
      swallowing taps.
- [x] **Microsoft To Do** — via the community integration *MS365 To Do* (HACS,
      Microsoft Graph), with an illustrated guide incl. the Entra app
      ([docs/microsoft-todo.md](docs/microsoft-todo.md)). The card reads midnight
      timestamps as all-day due dates (otherwise "due today" would turn "overdue"
      at 00:00). Building our own Graph integration was deliberately dropped.

## Provider matrix

The card works with **any** HA `todo` integration and adapts to what it can do.
The popular ones:

| Provider           | Read | Check off | Note                                  |
|--------------------|:----:|:---------:|---------------------------------------|
| Local to-do list   |  ✅  |    ✅     | native to HA                          |
| Apple Reminders    |  ✅  |    ✅     | via the CalDAV/iCloud `todo` entity   |
| Todoist            |  ✅  |    ✅     | official integration                  |
| Google Tasks       |  ✅  |    ✅     | official integration                  |
| Bring!             |  ✅  |    ✅     | shared list; assignment lives in the card |
| Microsoft To Do    |  ✅  |    ✅     | via *MS365 To Do* (HACS); [guide](docs/microsoft-todo.md) |
| Google Keep        |  ⚠️  |    ⚠️     | no official integration               |

Legend: ✅ through that provider's HA `todo` integration; ⚠️ only through
community solutions or a bridge.
