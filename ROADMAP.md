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
- [ ] **Einkaufen mit Bring!** – ganze Bring!-Liste = eine zugewiesene Aufgabe
      mit Punkten; „In Bring! öffnen" (Deep-Link) + Push; Abhaken synchron.

> **Architektur-Entscheidung (MVP).** Die Karte liest/schreibt `todo`-Entities
> direkt im Frontend (`hass.callWS` / `todo.update_item`) und wird per
> Karten-Konfiguration eingerichtet – genau wie die Family Board Card. Der
> Config-Flow/Coordinator der Integration bleibt vorerst schlank (serviert die
> Karte). Persistente Gamification (Punkte-Historie, Belohnungs-Freigaben,
> Zuweisungen) wandert in die Integration, sobald sie über die Laufzeit hinaus
> gespeichert werden muss.

## Killer-Features (nach MVP)

- [ ] **Kontext-Aufgaben** – Regeln auf Basis von Kalender, Wetter, Anwesenheit
      (einblenden/überspringen/eskalieren).
- [ ] **Belohnungs-Shop mit Eltern-Freigabe** – Einlösen → Freigabe-Push an
      Eltern (optional Foto-Beweis); Punkte→Taschengeld-Automatik.
- [ ] **Kiosk-Moment** – Erfolg über HA fühlbar machen (Licht/Sound/TTS/Push),
      Kiosk-Layout fürs Wandtablet, Personenwechsel per NFC/Anwesenheit.

## Später / Roadmap

- [ ] Einzel-Item einer Person zuweisen (statt „ganzer Einkauf").
- [ ] Standort-Erinnerung (Geofence) & Auto-Zuweisung „wer unterwegs ist".
- [ ] Faire Auto-Rotation wiederkehrender Ämtli („reihum").
- [ ] Level, Avatare, Abzeichen; Familien-Leaderboard & Statistik.
- [ ] Vorlese-/Symbolmodus für Nicht-Leser; Ämtli-Pakete nach Alter.
- [ ] Rendering direkt in / neben der Family Board Card.

## Provider-Matrix (Ziel)

| Provider              | Lesen | Abhaken | Hinzufügen | Anmerkung                          |
|-----------------------|:-----:|:-------:|:----------:|------------------------------------|
| Lokale To-do-Liste    |  ✅   |   ✅    |    ✅      | HA-nativ                           |
| Apple Erinnerungen    |  ✅   |   ✅    |    ✅      | via CalDAV/iCloud-`todo`           |
| Todoist               |  ✅   |   ✅    |    ✅      | offizielle Integration             |
| Google Tasks          |  ✅   |   ✅    |    ✅      | über `todo`-Entity                 |
| Bring!                |  ✅   |   ✅    |    ✅      | geteilte Liste; Zuweisung in Karte |

Legende: geplant über die jeweilige HA-`todo`-Integration.
