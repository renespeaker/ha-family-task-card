# 🧹 Family Task Card

> **Status: frühes MVP.** Die Karte zeigt ein funktionierendes Personen-Board:
> sie liest `todo.*`-Listen live, zeigt Aufgaben pro Person mit Punkten &
> Familienziel, und Abhaken schreibt in die Quell-Liste zurück. Gamification-
> Ausbau (Kinder-Modus, Belohnungen, Kontext-Aufgaben, Bring!-Deep-Links,
> Konfig-UI) folgt – siehe [ROADMAP.md](ROADMAP.md).

Eine **gamifizierte Familien-Aufgaben-/Ämtli-Karte** für
[Home Assistant](https://www.home-assistant.io/) – für Erwachsene und Kinder
spielerisch bedienbar, im Look der
[Family Board Card](https://github.com/renespeaker/ha-family-board-card) und
**theme-aware** (nutzt durchgehend HA-CSS-Variablen, passt sich also dem
Dashboard-Theme an).

## Idee

Aufgaben pro Person – mit Avataren aus den `person.*`-Entitäten, Farbe je
Familienmitglied, Punkten und Belohnungen. **Provider-übergreifend**, weil die
Karte auf Home Assistants `todo.*`-Entities aufsetzt: Apple Erinnerungen,
Todoist, Google Tasks, Bring! und lokale To-do-Listen liefern alle solche
Entities – Abhaken in der Karte hakt die Aufgabe **bidirektional** auch in der
Quell-App ab. Kein separater Cloud-Account für Kinder nötig, alles läuft in HA.

## Geplante Funktionen

- **Aufgaben pro Person** – Spalten mit Avatar, Farbe, Punkten; Kacheln mit
  Emoji und `border-left`-Akzent wie die Termin-Chips der Family Board Card.
- **Kinder-Modus** – große, bunte Kacheln, Antippen = erledigt, Sterne &
  Belohnungsziel; auch für Kinder, die noch nicht lesen.
- **Belohnungs-Shop mit Eltern-Freigabe** – Punkte → Taschengeld / Bildschirm­zeit /
  Wunsch; Kind löst ein, Eltern bestätigen (optional mit Foto-Beweis).
- **Kontext-Aufgaben (HA-Superkraft)** – reagieren auf Kalender, Wetter &
  Anwesenheit (z. B. „Müll" am Abfuhr-Vorabend, „Gießen" bei Regen überspringen,
  Eskalations-Push wenn nicht rechtzeitig erledigt).
- **Kiosk-Modus** – fürs Wandtablet; Erfolg wird über HA fühlbar (Licht wird
  grün, Sound, TTS-Ansage, Eltern-Push).
- **Einkaufen mit Bring!** – der ganze Einkauf als eine zugewiesene Aufgabe mit
  Punkten; Push öffnet die Bring!-App, Artikel-Abhaken synchron.
- **Am Handy einrichten** – Aufgaben, Zuständige, Punkte & Wiederholung per UI.

Details, Reihenfolge und Roadmap-Themen (Auto-Rotation „reihum", Einzel-Item-
Zuweisung, Geofence, Level/Avatare …) in [ROADMAP.md](ROADMAP.md).

## Synergie mit der Family Board Card

Gleiche Design-Sprache und dieselben `person.*`-Entities: die Aufgaben können
neben – oder perspektivisch in – der Family Board Card erscheinen. Ein Look,
eine Bedienung.

## Installation (HACS)

1. HACS → ⋮ → **Custom repositories** → `https://github.com/renespeaker/ha-family-task-card`,
   Typ **Integration**.
2. „Family Task Card" installieren und **Home Assistant neu starten**.
3. Einstellungen → **Geräte & Dienste → Integration hinzufügen → „Family Task Card"**.
4. Dashboard → Karte hinzufügen → **„Family Task Card"**.

## Konfiguration

Die Karte wird pro Person mit einer oder mehreren `todo.*`-Listen konfiguriert –
im selben Stil wie die Family Board Card mit `persons`. Am einfachsten geht das
über den **visuellen Editor** (Karte im Dashboard bearbeiten): Personen
hinzufügen/sortieren, `person.*` & `todo.*`-Listen per Auswahlfeld zuordnen,
Farbe wählen, Punkte & Ziel setzen – funktioniert auch am Handy. Ein Klick auf
**„Personen erkennen"** übernimmt vorhandene `person.*`-Entitäten. Wer lieber
YAML schreibt:

```yaml
type: custom:family-task-card
title: Familien-Aufgaben
points_per_task: 10   # Punkte pro erledigter Aufgabe (Standard 10)
goal: 200             # optionales Familienziel -> Fortschrittsbalken
show_completed: false # erledigte Aufgaben (ausgegraut) mitanzeigen
persons:
  - name: Mama
    person: person.mama          # optional -> Avatar + Anzeigename
    lists: todo.mama_aufgaben     # eine Liste ...
  - name: Papa
    person: person.papa
    lists:
      - todo.papa_aufgaben        # ... oder mehrere
      - todo.einkauf_bring
  - name: Lina
    color: "#FB7185"              # optionaler Farb-Override
    lists: todo.lina_aemtli
```

| Option            | Typ                | Beschreibung                                             |
|-------------------|--------------------|---------------------------------------------------------|
| `persons`         | Liste (Pflicht)    | Familienmitglieder; je Person `name`/`person`/`lists`.  |
| `persons[].lists` | Entität(en)        | `todo.*`-Entität(en), die zu dieser Person gehören.     |
| `persons[].person`| `person.*`         | optional – liefert Avatar & Anzeigename.                |
| `persons[].color` | Farbe              | optional – überschreibt die Palette.                    |
| `title`           | Text               | Kartentitel.                                             |
| `points_per_task` | Zahl               | Punkte je erledigter Aufgabe (Standard 10).             |
| `goal`            | Zahl               | Familien-Punkteziel → Fortschrittsbalken.               |
| `show_completed`  | Bool               | erledigte Aufgaben ausgegraut mitanzeigen.              |
| `kid_mode`        | Bool               | großes, tippbares Kinder-Layout (Avatar-Umschalter).    |
| `shopping_lists`  | Entität(en)        | `todo.*`-Listen (z. B. Bring!) als eine „Einkauf"-Kachel. |
| `shopping_points` | Zahl               | Punkte für einen erledigten Einkauf (Std. = pro Aufgabe). |
| `bring_deeplink`  | Text               | Ziel des „In Bring! öffnen"-Buttons (Std. web.getbring.com). |

### Kinder-Modus

Mit `kid_mode: true` zeigt die Karte ein **großes, tippbares Einzel-Kind-Layout**
fürs Wandtablet: oben ein Avatar-Umschalter (wer ist dran?), darunter XL-Kacheln
mit Emoji, ein Punkte-/Ziel-Balken und ein kurzes Konfetti-Feedback beim Abhaken.
Ideal als eigene Karte auf einem Kinder-Dashboard, während das volle Board für
die Eltern bleibt.

### Einkaufen mit Bring!

Listen unter `shopping_lists` (z. B. eine Bring!-Liste aus der HA-Bring-
Integration) werden **als eine „Einkauf"-Kachel** dargestellt: 🛒 + Anzahl der
Artikel + ein **„In Bring! öffnen"**-Button. Antippen der Kachel erledigt den
ganzen Einkauf – jeder offene Artikel wird abgehakt und **synchron zurück in die
Quell-Liste** geschrieben. Für einen erledigten Einkauf gibt es `shopping_points`.

```yaml
type: custom:family-task-card
shopping_lists: todo.einkauf_bring
shopping_points: 20
# bring_deeplink: "https://web.getbring.com"   # optional
persons:
  - name: Papa
    person: person.papa
    lists:
      - todo.papa_aufgaben
      - todo.einkauf_bring    # dieselbe Liste der Person zuweisen -> zählt für sie
```

Den **Push aufs Handy**, der Bring! direkt öffnet, übernimmt eine Home-
Assistant-Automation (nicht die Karte) – eine fertige Vorlage liegt unter
[`examples/bring-push-automation.yaml`](examples/bring-push-automation.yaml).

> Hinweis: Einen offiziellen Deep-Link auf eine *bestimmte* Bring!-Liste gibt es
> öffentlich nicht; der Button öffnet Bring! allgemein. Die Punkte für Einkäufe
> werden aktuell live aus dem Listenzustand geschätzt – eine echte Punkte-
> Historie zieht laut Roadmap in die Integration.

Ein vollständiges Beispiel liegt unter
[`examples/dashboard-card.yaml`](examples/dashboard-card.yaml).

## Aufbau des Repos

```
src/
├── ha-family-task-card.ts  Quelle der Lovelace-Karte (Lit + TypeScript)
└── editor.ts               Visueller Karten-Editor (Personen, Listen, Punkte)
custom_components/family_task_card/
├── __init__.py             Setup + serviert & registriert die Karte automatisch
├── config_flow.py          UI-Einrichtung (Single-Instance-Gerüst)
├── coordinator.py          Aufgaben-Coordinator (Gerüst: künftig todo-Entities)
├── sensor.py               Sensor-Platform (Gerüst)
├── const.py, manifest.json, strings.json, translations/
└── family-task-card.js     Gebaute Karte (Rollup-Output, wird eingecheckt)
ROADMAP.md                  Vision, MVP & Roadmap
examples/dashboard-card.yaml
```

## Entwicklung

Die Karte wird mit TypeScript + [Lit](https://lit.dev/) geschrieben und mit
Rollup zu einem einzelnen Bundle gebaut – **direkt** nach
`custom_components/family_task_card/family-task-card.js`, das die Integration
ausliefert. Diese Datei wird eingecheckt (die CI prüft, dass sie zum Stand von
`src/` passt).

```bash
npm install        # Abhängigkeiten
npm run build      # src/ → gebaute Karte
npm run watch      # Neu bauen bei Änderungen
npm run lint       # Typecheck (tsc --noEmit)
npm run format     # Prettier
```

Die GitHub-Actions bauen bei jedem Push (`CI`) und prüfen die HACS-Struktur
(`Validate`).

## Mitwirken

Frühe Phase – Ideen und Feedback willkommen über die
[Issues](https://github.com/renespeaker/ha-family-task-card/issues).

## Lizenz

Siehe [LICENSE](LICENSE).
