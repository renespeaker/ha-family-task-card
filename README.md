# 🧹 Family Task Card

> 🌐 **English** (this page) · [Deutsch](README.de.md)

![Family Task Card – per-person board with tasks, points, Bring! shopping and context flags](assets/preview.svg)

> **Status: usable (v0.12.0).** Per-person board, visual editor, kid mode, Bring!
> shopping, **Microsoft To Do**, context tasks, reward shop, celebrate actions, levels/badges +
> leaderboard and a **wall-tablet kiosk mode** are in — responsive, **bilingual
> (DE/EN)**, **theme-aware incl. a dark-mode switch**, with **appearance sliders
> (size/text/pictures)**, **add-task** and sort/hide options. The card reads
> `todo.*` lists live, writes back on check-off and adapts to every integration —
> see [ROADMAP.md](ROADMAP.md).

A **gamified family task / chore card** for
[Home Assistant](https://www.home-assistant.io/) — playful for grown-ups **and**
kids, in the look of the
[Family Board Card](https://github.com/renespeaker/ha-family-board-card) and
**theme-aware** (uses HA CSS variables throughout, so it follows your dashboard
theme).

## Idea

Tasks per person — with avatars from your `person.*` entities, a color per family
member, points and rewards. **Provider-agnostic**, because the card builds on
Home Assistant's `todo.*` entities: Apple Reminders, Todoist, Google Tasks,
Bring! and local to-do lists all expose such entities — checking a task in the
card checks it off **bidirectionally** in the source app too. No separate cloud
account for kids, everything stays in HA.

## Planned features

- **Tasks per person** – columns with avatar, colour and points; tiles with an
  emoji and a `border-left` accent, like the event chips of the Family Board Card.
- **Kid mode** – big, colourful tiles, tap to complete, stars and a reward goal;
  works for children who cannot read yet.
- **Reward shop with parental approval** – points → pocket money / screen time /
  a wish; the child redeems, the parents confirm (optionally with photo proof).
- **Context tasks (the Home Assistant superpower)** – react to calendar, weather
  and presence (bin day the evening before, skip watering when it rains,
  escalate with a push when something is not done in time).
- **Kiosk mode** – for the wall tablet; success becomes tangible through Home
  Assistant (a light turns green, a sound, a TTS announcement, a push to parents).
- **Shopping with Bring!** – the whole shopping trip as one assigned task with
  points; a push opens the Bring! app, checked-off items stay in sync.
- **Set up from a phone** – tasks, owners, points and repetition through the UI.

Details, ordering and roadmap topics (round-robin rotation, per-item assignment,
geofencing, levels/avatars …) live in [ROADMAP.md](ROADMAP.md).

## How it works with the Family Board Card

The same design language, the same `person.*` entities and **the same person
palette** – kept as a mirrored file in both projects, so the same person has the
same colour on both cards.

Since board v0.27 the [Family Board Card](https://github.com/renespeaker/ha-family-board-card)
can additionally show due tasks from the same `todo.*` lists as chips.

**Both cards still stand entirely on their own.** Neither requires the other,
they never talk to each other — each talks to Home Assistant. Install just one
and you will never notice the other exists.

## Platforms & providers (iOS / Android)

The card runs everywhere Home Assistant runs — in the browser and **in the HA
Companion app on iPhone/iPad and Android**. The layout is **responsive**: on a
phone the person columns stack, controls are touch-sized, and kid mode is built
for a wall tablet.

Because the card builds on `todo.*` entities, it is **provider- and
platform-agnostic** — the respective HA integration supplies the list and the
card uses it **without provider-specific code**. It also detects each list's
**capabilities** (`supported_features`): a list that can't be checked off is
shown read-only (🔒) instead of a dead tap.

| Provider | HA integration | Account | Read · Check off |
|---|---|---|:---:|
| 🍎 **Apple Reminders** | [CalDAV](https://www.home-assistant.io/integrations/caldav/) (iCloud) | Apple ID | ✅ · ✅ |
| 🟦 **Google Tasks** | [Google Tasks](https://www.home-assistant.io/integrations/google_tasks/) | Google | ✅ · ✅ |
| 🔴 **Todoist** | [Todoist](https://www.home-assistant.io/integrations/todoist/) | Todoist | ✅ · ✅ |
| 🛒 **Bring!** | [Bring!](https://www.home-assistant.io/integrations/bring/) | Bring! | ✅ · ✅ |
| 📝 **Local to-do list** | HA-native | – | ✅ · ✅ |
| 🟦 **Microsoft To Do** | [MS365 To Do](https://github.com/RogerSelwyn/MS365-ToDo) (HACS, community) | Microsoft | ✅ · ✅ ([guide](docs/microsoft-todo.md)) |
| 🟡 **Google Keep** | none official | Google | ⚠️ unofficial |

> "Android" is not an app — Android users mostly use **Google Tasks, Microsoft
> To Do or Todoist**. All three are covered. **Microsoft To Do** has no official
> HA integration (yet), but works reliably through the community integration
> *MS365 To Do* — with an
> [**illustrated step-by-step guide**](docs/microsoft-todo.md).

### Setting up a provider (quick guides)

All paths end the same way: the list shows up as a `todo.*` entity that you pick
**per person in the editor**. Checking off in the card syncs back.

- **🍎 Apple Reminders** — add the *CalDAV* HA integration with the iCloud CalDAV
  URL + Apple ID + an **app-specific password**
  ([appleid.apple.com](https://appleid.apple.com) → Sign-In & Security).
- **🟦 Google Tasks** — add the *Google Tasks* HA integration and sign in with
  Google; each Tasks list becomes a `todo.*`.
- **🔴 Todoist** — add the *Todoist* HA integration with your API token.
- **🟦 Microsoft To Do** — community integration *MS365 To Do* (HACS) plus an
  Entra app at Microsoft. It's the most involved path (~15 min), so there's an
  [**illustrated guide**](docs/microsoft-todo.md). Important: tick
  **"Enable update"** during setup, otherwise the lists are read-only.
- **🛒 Bring!** — add the *Bring!* HA integration with a Bring! account (see below).
- **📝 Local** — Settings → Devices & Services → Helpers → *To-do list*.

**Push / deep links:** notifications (e.g. "Shopping is due", "X is done") go
through `notify.mobile_app_*`; to open an app/URL use `url` on iOS and
`clickAction` on Android (example: `examples/bring-push-automation.yaml`).

## Installation

The Family Task Card is a **Lovelace card** (frontend) — just like the Family
Board Card. There is **no integration** to add and **no restart** required.

### Via HACS (recommended)

1. HACS → ⋮ → **Custom repositories** → `https://github.com/renespeaker/ha-family-task-card`,
   type **Dashboard** (Lovelace).
2. Install **"Family Task Card"**. HACS registers the resource automatically.
3. **Hard-refresh** the browser once (Ctrl+Shift+R) so the card loads.
4. Dashboard → Add card → search for **"Family Task Card"**.

### Manual (without HACS)

1. Copy `family-task-card.js` from this repo to `config/www/`.
2. Settings → **Dashboards → ⋮ → Resources → Add resource**: URL
   `/local/family-task-card.js`, type **JavaScript module**.
3. Hard-refresh the browser, then add the card.

## Configuration

The card is configured per person with one or more `todo.*` lists — the same way
the Family Board Card uses `persons`. Easiest via the **visual editor** (edit the
card on the dashboard): add/sort persons, assign `person.*` & `todo.*` lists from
pickers, choose a color, set points & a goal — works on the phone too. **"Detect
persons"** imports existing `person.*` entities. If you prefer YAML:

```yaml
type: custom:family-task-card
title: Family tasks
points_per_task: 10   # points per completed task (default 10)
goal: 200             # optional family goal -> progress bar
show_completed: false # also show completed tasks (dimmed)
persons:
  - name: Mom
    person: person.mom          # optional -> avatar + display name
    lists: todo.mom_tasks       # one list ...
  - name: Dad
    person: person.dad
    lists:
      - todo.dad_tasks          # ... or several
      - todo.shopping_bring
  - name: Lina
    color: "#FB7185"            # optional color override
    lists: todo.lina_chores
```

| Option | Type | Description |
|---|---|---|
| `persons` | list (required) | Family members; each with `name`/`person`/`lists`. |
| `persons[].lists` | entity/entities | `todo.*` entity/entities belonging to this person. |
| `persons[].person` | `person.*` | optional — provides avatar & display name. |
| `persons[].color` | color | optional — overrides the palette. |
| `persons[].points_entity` | `input_number` | balance helper (redeemed points) for the shop. |
| `title` | text | card title. |
| `points_per_task` | number | points per completed task (default 10). |
| `goal` | number | family points goal → progress bar. |
| `show_completed` | bool | also show completed tasks (dimmed). |
| `kid_mode` | bool | big, tappable kid layout (avatar switcher). |
| `shopping_lists` | entity/entities | `todo.*` lists (e.g. Bring!) shown as one "shopping" tile. |
| `shopping_points` | number | points for a finished shopping trip (default = per task). |
| `bring_deeplink` | text | target of the "Open in Bring!" button (default web.getbring.com). |
| `highlight_overdue` | bool | mark overdue tasks as urgent (default on). |
| `context_rules` | list | rules that react to HA state (see below). |
| `rewards` | list | rewards for the shop (`name`, `cost`, `emoji`). |
| `parent_pin` | text/number | PIN for the parent approval on redeeming. |
| `celebrate` | object | HA services on success (light/sound/TTS/push, see below). |
| `level_size` | number | points per level (default 100, 0 = off). |
| `level_emojis` | list | badge per level tier (optional). |
| `show_leaderboard` | bool | ranking of persons by points under the board. |
| `theme` | text | color scheme: `auto` (HA theme, default) / `dark` / `light`. |
| `active_person_entity` | entity | card follows the active person (NFC/presence); empty = manual. |
| `kiosk` | bool | wall-tablet mode: idle "Who's there?" picker + auto-return. |
| `auto_return` | number | seconds of inactivity before returning to the picker (default 30, 0 = never). |
| `allow_add` | bool | "add task" field per person (default on). |
| `sort` | text | order of open tasks: `manual` / `due` / `alpha`. |
| `hide_empty` | bool | hide persons with no open tasks. |
| `due_soon` | number | mark tasks due within X days as "due soon". |
| `scale` | number (%) | overall card size (zoom over everything). default 100. |
| `font_scale` | number (%) | text size only. default 100. |
| `avatar_scale` | number (%) | avatars/pictures and the card icon only. default 100. |

### Kid mode

With `kid_mode: true` the card shows a **big, tappable single-child layout** for
the wall tablet: an avatar switcher on top (whose turn is it?), XL tiles with
emoji below, a points/goal bar and a short confetti feedback on check-off. Great
as its own card on a kids' dashboard while the full board stays for the parents.

### Appearance (size, text, pictures)

The **visual editor** (card → Edit) has three sliders to adjust the look without
YAML — handy because kid mode, for example, is intentionally larger:

- **Card size (`scale`)** — zooms the **whole** card (layout, text and pictures
  together). Ideal to make a kids' card overall smaller or larger.
- **Font size (`font_scale`)** — adjusts **text only** (on top of the card size),
  e.g. for good legibility from across the room on a wall tablet.
- **Avatar / picture size (`avatar_scale`)** — adjusts **avatars/pictures** and
  the card icon only.

All three are in percent; **100 % = default** (nothing changes). They apply in
board, kid and kiosk mode.

```yaml
type: custom:family-task-card
scale: 90 # whole card at 90 %
font_scale: 120 # but text at 120 % (easy to read)
avatar_scale: 140 # big avatars
persons:
  - { name: Lina, person: person.lina, lists: todo.lina_chores }
```

### Shopping with Bring!

> **Prerequisite:** Bring! needs the
> [**Bring! integration**](https://www.home-assistant.io/integrations/bring/) in
> Home Assistant and a **Bring! account** (the free Bring! app). The integration
> exposes your Bring! list as a `todo.*` entity, which this card then uses.
> Without Bring! the card works normally with any other `todo.*` lists.

Lists under `shopping_lists` (e.g. a Bring! list from the HA Bring integration)
are shown **as one "shopping" tile**: 🛒 + item count + an **"Open in Bring!"**
button. Tapping the tile completes the whole trip — every open item is checked
off and written **back to the source list**. A finished trip is worth
`shopping_points`.

```yaml
type: custom:family-task-card
shopping_lists: todo.shopping_bring
shopping_points: 20
# bring_deeplink: "https://web.getbring.com"   # optional
persons:
  - name: Dad
    person: person.dad
    lists:
      - todo.dad_tasks
      - todo.shopping_bring    # assign the same list to the person -> counts for them
```

The **push to the phone** that opens Bring! is a Home Assistant automation (not
the card) — a ready template is in
[`examples/bring-push-automation.yaml`](examples/bring-push-automation.yaml).

> Note: there is no public deep link to a *specific* Bring! list; the button
> opens Bring! in general. Shopping points are currently estimated live from the
> list state — a real points history is on the roadmap with an optional backend.

### Context tasks

The HA superpower: tasks **react to the state of your home** (weather, presence,
calendar, sensors). Two layers:

**1. Overdue automatically** — tasks past their due date (`due`) are marked
**urgent** with no configuration (⚠️, red accent, "Overdue" chip). Turn off with
`highlight_overdue: false`.

**2. `context_rules`** — your own rules. When the condition on `entity` is met,
matching tasks get the `effect`:

- `hide` — hide (e.g. skip watering when it rains)
- `highlight` — emphasize (colored border)
- `urgent` — mark as urgent (⚠️, e.g. bins the evening before pickup)

```yaml
type: custom:family-task-card
persons:
  - name: Dad
    lists: todo.household
context_rules:
  # hide watering when the weather is rainy
  - match: "water|plant|flower"
    entity: weather.home
    state: rainy
    effect: hide
  # bins urgent when the pickup sensor reports tomorrow
  - match: "bin|trash|garbage"
    entity: binary_sensor.bin_pickup_tomorrow
    state: "on"
    effect: urgent
    label: "Pickup tomorrow!"
  # highlight shopping when someone is away (presence)
  - match: "shopping|groceries"
    entity: person.dad
    state: not_home
    effect: highlight
    label: "You're out"
```

Conditions per rule: `state` (a value or list), `above`/`below` (numeric), or
none → "state is on/active". `invert: true` flips the condition. Without
`match`/`lists` the rule applies to all tasks; `lists` restricts it to specific
`todo.*` lists.

> The **escalation push** ("not done in time") is — like Bring! — an HA
> automation, not card code. The card does the **visible** escalation (urgent
> marking); hook the push onto the same sensors.

### Reward shop

Points can be redeemed for **rewards** — with **parent approval via PIN**. Define
rewards in `rewards`; the PIN in `parent_pin`.

So spent points persist (across reloads/restarts), each person gets an HA helper
**`input_number`** that holds the **already-redeemed** points. **Balance = earned
− redeemed.**

```yaml
type: custom:family-task-card
parent_pin: "1234"
rewards:
  - { name: "30 min tablet", cost: 50, emoji: "📱" }
  - { name: "Ice cream", cost: 30, emoji: "🍦" }
  - { name: "Cinema", cost: 200, emoji: "🎬" }
persons:
  - name: Lina
    lists: todo.lina_chores
    points_entity: input_number.lina_redeemed   # create an input_number helper
```

Usage: the 🎁 button in the person column (or in kid mode) opens the shop.
"Redeem" is only active when the balance is enough; then the card asks for the
**parent PIN** and, on success, raises the `input_number`.

> Without `points_entity` the shop only displays the rewards (redeeming
> disabled). The **asynchronous approval flow** ("kid requests, parents confirm
> later via push, optionally with a photo") is on the roadmap with an optional
> backend. Earned points are computed live from the list state — see the shopping
> note.

### Celebrate actions (make success tangible)

On success the card can call **any Home Assistant services** — turning a checkmark
into a moment: light briefly green, a jingle, a TTS announcement or a push to the
parents. Great for the wall tablet.

```yaml
type: custom:family-task-card
celebrate:
  on: all_done            # all_done | task | reward  (or a list)
  actions:
    - service: light.turn_on
      data: { entity_id: light.kids_room, rgb_color: [0, 255, 0], brightness_pct: 100 }
    - service: tts.google_translate_say
      data: { entity_id: media_player.kitchen, message: "{name} finished everything!" }
    - service: notify.mobile_app_dad
      data: { message: "{name} is done 🎉" }
persons:
  - name: Lina
    lists: todo.lina_chores
```

- **`on`** picks the moment: `all_done` (person has nothing open — default),
  `task` (each completed task) or `reward` (reward redeemed). Several at once as
  a list.
- **`actions`** is a list of service calls (`service` + `data`/`target`), exactly
  like in HA automations.
- Placeholders: **`{name}`** (person) and **`{task}`** (task/reward name) are
  substituted in all text values.

> The on-screen confetti animation runs anyway. See **Kiosk mode** and **Person
> switch via NFC / presence** below for the wall-tablet setup.

### Levels, badges & leaderboard

Each person earns **levels** from completed tasks — computed purely from earned
points, with no extra setup. A **badge chip** appears next to the name (e.g.
"🏅 L3"). With `show_leaderboard: true` you also get a **ranking** under the board
(🥇🥈🥉).

```yaml
type: custom:family-task-card
level_size: 100                       # points per level (default 100, 0 = off)
level_emojis: ["🌱", "⭐", "🔥", "🏅", "🏆", "👑"]   # optional, per tier
show_leaderboard: true
persons:
  - { name: Lina, lists: todo.lina_chores }
  - { name: Ben, lists: todo.ben_chores }
```

> Levels & leaderboard use the **earned** points (not the shop balance) — both
> are derived statelessly from the `todo` lists.

### Dark mode / color scheme

The card is **theme-aware**: with a dark Home Assistant theme it turns dark
automatically — no configuration. To **force** the color scheme (e.g. a wall
tablet always dark, regardless of the dashboard theme), use `theme`:

```yaml
type: custom:family-task-card
theme: dark        # auto (default, follows HA) | dark | light
persons:
  - { name: Lina, lists: todo.lina_chores }
```

The switch overrides the color variables **only inside this card** — the accent
(person palette, `--primary-color`) is kept.

### Person switch via NFC / presence

Set `active_person_entity` and the card **follows the active person
automatically**: the state of that entity (an `input_select`, `sensor` or
`person.*`) names whose turn it is — kid mode focuses that person, the board
highlights them. Hands-free, no tapping.

```yaml
type: custom:family-task-card
kid_mode: true
active_person_entity: input_select.active_kid   # value = name / person.* / display name
persons:
  - { name: Lina, person: person.lina, lists: todo.lina_chores }
  - { name: Ben,  person: person.ben,  lists: todo.ben_chores }
```

Home Assistant does the **detection** and sets the entity — e.g.:

- **NFC tag on the tablet:** the HA Companion app scans the tag → an automation
  sets `input_select.active_kid` to the child. (Great for non-readers: tap the
  chip → their tasks appear.)
- **Presence/room:** a presence sensor + `person.*`/BLE set the entity to the
  person entering the room.
- **Button/voice:** a dashboard button or voice command sets it.

Matching: the entity value is compared to each person's `name`, their `person.*`
entity and their display name (case-insensitive). Empty field = classic manual
switching.

### Kiosk mode (wall tablet)

For a tablet/display mounted on the wall: `kiosk: true` turns it into a **shared
family station**.

- **Idle "Who's there?" screen** — big avatars of everyone. Tap your own face →
  your tasks appear (the big kid layout).
- **Auto-return** — after `auto_return` seconds without input (default 30) it
  goes back to the picker on its own. `0` = never.
- **Hands-free** — combined with `active_person_entity`, an **NFC tag** or
  **presence** wakes the right person directly (no tapping), and after inactivity
  it tidies itself back up.

```yaml
type: custom:family-task-card
kiosk: true
auto_return: 30                                 # seconds (0 = never)
active_person_entity: input_select.active_kid   # optional: NFC/presence
persons:
  - { name: Lina, person: person.lina, lists: todo.lina_chores }
  - { name: Ben,  person: person.ben,  lists: todo.ben_chores }
```

That makes the wall tablet a "tap → my chores → done" station that resets itself
back to the neutral state.

### Add tasks, sorting & language

- **➕ Add task** — an input field appears under each person; Enter creates the
  task via `todo.add_item` — but only where the list supports it (the card checks
  capabilities). Turn off with `allow_add: false`.
- **🔽 Sorting** — `sort: due` (by due date) or `sort: alpha` (alphabetical);
  default `manual` (list order). Urgent/highlighted tasks always stay on top.
- **🙈 Hide empty** — `hide_empty: true` hides persons with no open tasks.
- **⏰ Due soon** — `due_soon: 2` highlights tasks due within the next 2 days
  (overdue ones stay "urgent").
- **🌐 Language** — the card is **bilingual (German/English)** and follows the HA
  UI language automatically.

A full example is in
[`examples/dashboard-card.yaml`](examples/dashboard-card.yaml).

## Repository layout

```
src/
├── ha-family-task-card.ts  source of the Lovelace card (Lit + TypeScript)
├── editor.ts               visual card editor (people, lists, points)
├── card.test.ts            component tests against a mocked Home Assistant
└── shared/                 mirrored with the Family Board Card (person palette)
family-task-card.js         built card (Rollup output, committed)
hacs.json                   HACS metadata (Lovelace/dashboard card)
ROADMAP.md / ROADMAP.de.md  vision, MVP & roadmap (English / German)
examples/                   example dashboards & the Bring! push automation
docs/                       guides (e.g. Microsoft To Do, illustrated; English / German)
tools/                      helper scripts (palette check, guide pictures)
```

## Development

The card is written in TypeScript + [Lit](https://lit.dev/) and bundled with
Rollup into a single file — `family-task-card.js` at the repo root, which HACS
serves as a dashboard resource. That file is committed (CI checks it matches the
`src/` state).

```bash
npm install        # dependencies
npm run build      # src/ → built card
npm run watch      # rebuild on change
npm run lint       # typecheck (tsc --noEmit)
npm test           # Vitest (card against a mocked Home Assistant)
npm run format     # Prettier
```

The GitHub Actions build & test on every push (`CI`), validate the HACS structure
(`Validate`) and attach the built card as a release asset (`Release`).

## Contributing

Early phase — ideas and feedback welcome via the
[Issues](https://github.com/renespeaker/ha-family-task-card/issues).

## License

See [LICENSE](LICENSE).
