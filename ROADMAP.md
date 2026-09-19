# Family Task Card — Roadmap

Vision, MVP und geplante Ausbaustufen. Grundlage sind die bisherigen
Design-Entscheidungen und ein interaktives Konzept-Mockup (Erwachsenen-Board,
Kinder-Modus, Handy-Konfig, Kontext-Aufgaben, Belohnungs-Shop, Kiosk-Moment,
Einkaufen mit Bring!).

## Leitidee

> Mach aus jeder To-do (Apple Erinnerungen, Todoist, Google Tasks, HA, Bring!)
> eine **smarte, gamifizierte** Familien-Aufgabe, die auf die echte Welt
> reagiert.

Der unfaire Vorteil gegenüber Standalone-Apps: **Kontext aus Home Assistant**
(Kalender, Wetter, Anwesenheit, Sensoren) plus die Aufgaben an einem Ort – und
das im Look der Family Board Card.

## Architektur-Prinzipien

- **Provider-agnostisch über `todo.*`-Entities.** Apple Erinnerungen (CalDAV/
  iCloud), Todoist, Google Tasks, Bring! und lokale To-do-Listen erscheinen in
  HA als `todo`-Entities. Die Karte liest/schreibt diese → **bidirektional**,
  ohne pro Anbieter eigenen Code.
- **Theme-aware.** Durchgehend HA-CSS-Variablen (`--card-background-color`,
  `--primary-text-color`, `--divider-color`, Akzent = `--primary-color`),
  gleiche Personen-Palette wie die Family Board Card.
- **Gamification als eigene Ebene.** Zuständigkeit, Punkte, Belohnungen und
  Freigaben verwaltet die Family Task Card obendrauf (Bring!/todo-Listen kennen
  keine „Zuständigkeit").
- **Lokal & privat.** Kein separater Cloud-Account für Kinder.
- **Reine Lovelace-Karte.** Auslieferung als HACS-Dashboard-Karte (wie die
  Family Board Card) – keine Integration, kein Neustart. Ein optionales Backend
  (für persistente Punkte-Historie & Freigaben) kann später dazukommen.

## MVP (v0.x)

Ziel: eine benutzbare, abgestimmte Karte mit dem Kern-Loop.

- [x] Karte (Erwachsenen-Board) im Family-Board-Look: Spalten pro Person,
      Avatar, Kacheln mit Emoji + `border-left`-Akzent, Abhaken schreibt ins
      `todo`-Entity zurück (liest live via `todo/item/list`).
- [x] Punkte & Familienziel-Fortschritt (Punkte je erledigter Aufgabe,
      Familienziel als Fortschrittsbalken).
- [x] Zuordnung Familienmitglieder (`person.*`) ↔ `todo.*`-Listen –
      **über die Karten-Konfiguration** (`persons`), wie bei der Family Board
      Card. Ein visueller Editor (Handy-Konfig) folgt weiter unten.
- [x] **Visueller Karten-Editor** (`LovelaceCardEditor`) – Personen (hinzufügen/
      sortieren/entfernen), `person.*` & `todo.*`-Listen per Auswahlfeld, Farbe,
      Punkte & Ziel per UI statt YAML; „Personen erkennen" übernimmt `person.*`.
      Funktioniert auch am Handy.
- [x] **Kinder-Modus** (`kid_mode`) – großes, tippbares Einzel-Kind-Layout fürs
      Wandtablet: Avatar-Umschalter oben, XL-Aufgabenkacheln mit Emoji, Punkte-
      Ziel-Balken und Konfetti-Feedback beim Abhaken.
- [x] **Einkaufen mit Bring!** (Karten-Teil) – `shopping_lists` zeigt eine
      Bring!-Liste als eine „Einkauf"-Kachel mit 🛒, Artikel-Anzahl, Punkten
      (`shopping_points`) und „In Bring! öffnen"-Button; Abhaken erledigt den
      ganzen Einkauf synchron. Push-Zustellung als HA-Automation-Vorlage
      (`examples/bring-push-automation.yaml`), nicht als Kartencode.

> **Architektur-Entscheidung.** Die Karte liest/schreibt `todo`-Entities direkt
> im Frontend (`hass.callWS` / `todo.update_item`) und wird per Karten-
> Konfiguration eingerichtet – genau wie die Family Board Card. Ausgeliefert als
> reine **HACS-Lovelace-Karte** (kein Integration/Neustart). Persistente
> Gamification (Punkte-Historie, Belohnungs-Freigaben, Zuweisungen) kann später
> ein **optionales Backend** übernehmen, sobald Zustand über die Laufzeit hinaus
> gespeichert werden muss.

## Killer-Features (nach MVP)

- [x] **Kontext-Aufgaben** – überfällige Aufgaben werden automatisch als dringend
      markiert; `context_rules` reagieren auf beliebige HA-Entities (Wetter,
      Anwesenheit, Kalender, Sensoren) und blenden Aufgaben aus, heben sie hervor
      oder markieren sie als dringend. Eskalations-Push bleibt HA-Automation.
- [x] **Belohnungs-Shop mit Eltern-Freigabe** – `rewards` in der Config, Guthaben
      = verdient − eingelöst (eingelöst in einem `input_number` je Person),
      Einlösen mit **Eltern-PIN** direkt in der Karte (Board & Kinder-Modus).
      Offen (Backend): asynchrone Freigabe per Push, Foto-Beweis, Taschengeld-
      Automatik.
- [x] **Feier-Aktionen** – Erfolg über HA fühlbar machen: `celebrate.actions`
      ruft beliebige HA-Services (Licht/Sound/TTS/Push) bei `all_done` / `task` /
      `reward`, mit `{name}`/`{task}`-Platzhaltern.
- [ ] **Kiosk-Moment (Rest)** – dediziertes Kiosk-Layout fürs Wandtablet
      (auto-Rückkehr) und Personenwechsel per NFC/Anwesenheit (`active_person`-
      Entität).

## Später / Roadmap

- [ ] Einzel-Item einer Person zuweisen (statt „ganzer Einkauf").
- [ ] Standort-Erinnerung (Geofence) & Auto-Zuweisung „wer unterwegs ist".
- [ ] Faire Auto-Rotation wiederkehrender Ämtli („reihum").
- [x] Level & Abzeichen (aus verdienten Punkten) + Familien-Rangliste
      (`level_size`, `level_emojis`, `show_leaderboard`). Offen: Avatare-Fortschritt,
      Statistik/Verlauf.
- [ ] Vorlese-/Symbolmodus für Nicht-Leser; Ämtli-Pakete nach Alter.
- [ ] Rendering direkt in / neben der Family Board Card.
- [x] **Fähigkeits-Erkennung** – Karte liest `supported_features` der `todo`-
      Entity; nicht abhakbare Listen werden schreibgeschützt (🔒) statt Leertipp.
- [ ] **Microsoft To Do** – keine native HA-`todo`-Integration; Optionen:
      Community-Custom-Component (Microsoft Graph) empfehlen, Bridge in eine
      lokale HA-Liste, oder eigene Graph-Integration (Backend-Projekt).

## Provider-Matrix

Die Karte funktioniert mit **jeder** HA-`todo`-Integration und passt sich deren
Fähigkeiten an. Beliebte Anbieter:

| Provider              | Lesen | Abhaken | Anmerkung                          |
|-----------------------|:-----:|:-------:|------------------------------------|
| Lokale To-do-Liste    |  ✅   |   ✅    | HA-nativ                           |
| Apple Erinnerungen    |  ✅   |   ✅    | via CalDAV/iCloud-`todo`           |
| Todoist               |  ✅   |   ✅    | offizielle Integration             |
| Google Tasks          |  ✅   |   ✅    | offizielle Integration             |
| Bring!                |  ✅   |   ✅    | geteilte Liste; Zuweisung in Karte |
| Microsoft To Do       |  ⚠️   |   ⚠️    | keine native HA-Integration; Custom/Bridge |
| Google Keep           |  ⚠️   |   ⚠️    | keine offizielle Integration       |

Legende: ✅ über die jeweilige HA-`todo`-Integration; ⚠️ nur über Community-
Lösungen/Bridge.
