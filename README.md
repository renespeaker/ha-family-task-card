# 🧹 Family Task Card

> **Status: nutzbar (v0.2.0).** Personen-Board, visueller Editor, Kinder-Modus,
> Bring!-Einkauf und Kontext-Aufgaben sind da. Die Karte liest `todo.*`-Listen
> live und schreibt beim Abhaken zurück. Weiteres (Belohnungs-Shop, Kiosk) siehe
> [ROADMAP.md](ROADMAP.md).

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

## Installation

Die Family Task Card ist eine **Lovelace-Karte** (Frontend) – genau wie die
Family Board Card. Es gibt **keine Integration** zum Hinzufügen und **kein
Neustart** nötig.

### Über HACS (empfohlen)

1. HACS → ⋮ → **Custom repositories** → `https://github.com/renespeaker/ha-family-task-card`,
   Typ **Dashboard** (Lovelace).
2. **„Family Task Card"** installieren. HACS legt die Ressource automatisch an.
3. Browser einmal **hart neu laden** (Strg+Shift+R), damit die Karte geladen wird.
4. Dashboard → Karte hinzufügen → nach **„Family Task Card"** suchen.

### Manuell (ohne HACS)

1. `family-task-card.js` aus diesem Repo nach `config/www/` kopieren.
2. Einstellungen → **Dashboards → ⋮ → Ressourcen → Ressource hinzufügen**:
   URL `/local/family-task-card.js`, Typ **JavaScript-Modul**.
3. Browser hart neu laden, dann Karte hinzufügen.

> **Von einer früheren Version als Integration installiert?** Entferne die alte
> „Family Task Card"-Integration unter *Geräte & Dienste* und deinstalliere sie
> in HACS, dann füge das Repo wie oben als **Dashboard** neu hinzu.

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
| `highlight_overdue` | Bool             | überfällige Aufgaben als dringend markieren (Std. an).  |
| `context_rules`   | Liste              | Regeln, die auf HA-Zustände reagieren (siehe unten).    |

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
> Historie kommt laut Roadmap mit einem optionalen Backend.

### Kontext-Aufgaben

Die HA-Superkraft: Aufgaben **reagieren auf den Zustand deines Zuhauses**
(Wetter, Anwesenheit, Kalender, Sensoren). Zwei Ebenen:

**1. Überfällig automatisch** – Aufgaben mit überschrittenem Fälligkeitsdatum
(`due`) werden ohne Konfiguration als **dringend** markiert (⚠️, roter Akzent,
Chip „Überfällig"). Abschaltbar mit `highlight_overdue: false`.

**2. `context_rules`** – eigene Regeln. Trifft die Bedingung auf `entity` zu,
bekommen passende Aufgaben den `effect`:

- `hide` – ausblenden (z. B. Gießen überspringen, wenn es regnet)
- `highlight` – hervorheben (farbiger Rahmen)
- `urgent` – als dringend markieren (⚠️, z. B. Müll am Abfuhr-Vorabend)

```yaml
type: custom:family-task-card
persons:
  - name: Papa
    lists: todo.haushalt
context_rules:
  # Gießen ausblenden, wenn das Wetter auf Regen steht
  - match: "gieß|blumen|pflanze"
    entity: weather.home
    state: rainy
    effect: hide
  # Müll dringend machen, wenn der Abfuhr-Sensor morgen meldet
  - match: "müll|tonne"
    entity: binary_sensor.muellabfuhr_morgen
    state: "on"
    effect: urgent
    label: "Morgen Abfuhr!"
  # Einkauf hervorheben, wenn jemand unterwegs ist (Anwesenheit)
  - match: "einkauf"
    entity: person.papa
    state: not_home
    effect: highlight
    label: "Du bist unterwegs"
```

Bedingungen je Regel: `state` (ein Wert oder Liste), `above`/`below` (numerisch),
oder ganz ohne → „Zustand ist an/aktiv". `invert: true` dreht die Bedingung um.
Ohne `match`/`lists` gilt die Regel für alle Aufgaben; `lists` schränkt auf
bestimmte `todo.*`-Listen ein.

> Die **Eskalations-Push** („nicht rechtzeitig erledigt") ist – wie bei Bring! –
> eine HA-Automation, nicht Kartencode. Die Karte macht die **sichtbare**
> Eskalation (Dringend-Markierung); den Push kannst du an denselben Sensoren
> aufhängen.

Ein vollständiges Beispiel liegt unter
[`examples/dashboard-card.yaml`](examples/dashboard-card.yaml).

## Aufbau des Repos

```
src/
├── ha-family-task-card.ts  Quelle der Lovelace-Karte (Lit + TypeScript)
└── editor.ts               Visueller Karten-Editor (Personen, Listen, Punkte)
family-task-card.js         Gebaute Karte (Rollup-Output, wird eingecheckt)
hacs.json                   HACS-Metadaten (Lovelace/Dashboard-Karte)
ROADMAP.md                  Vision, MVP & Roadmap
examples/                   Beispiel-Dashboards & Bring!-Push-Automation
```

## Entwicklung

Die Karte wird mit TypeScript + [Lit](https://lit.dev/) geschrieben und mit
Rollup zu einem einzelnen Bundle gebaut – nach `family-task-card.js` im
Repo-Root, das HACS als Dashboard-Ressource ausliefert. Diese Datei wird
eingecheckt (die CI prüft, dass sie zum Stand von `src/` passt).

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
