# 🧹 Family Task Card

> **Status: frühe Entwicklung (Skeleton).** Diese Karte lädt und registriert
> sich bereits in Home Assistant, zeigt aber noch einen Platzhalter. Die
> Aufgaben-Funktionen sind in Arbeit – siehe [ROADMAP.md](ROADMAP.md).

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

> Aktuell zeigt die Karte einen Platzhalter – die Aufgaben-Funktionen folgen
> gemäß Roadmap.

## Aufbau des Repos

```
custom_components/family_task_card/
├── __init__.py            Setup + serviert & registriert die Karte automatisch
├── config_flow.py         UI-Einrichtung (Single-Instance-Gerüst)
├── coordinator.py         Aufgaben-Coordinator (Gerüst: künftig todo-Entities)
├── sensor.py              Sensor-Platform (Gerüst)
├── const.py, manifest.json, strings.json, translations/
└── family-task-card.js    Lovelace-Karte (theme-aware Platzhalter)
ROADMAP.md                 Vision, MVP & Roadmap
examples/dashboard-card.yaml
```

## Mitwirken

Frühe Phase – Ideen und Feedback willkommen über die
[Issues](https://github.com/renespeaker/ha-family-task-card/issues).

## Lizenz

Siehe [LICENSE](LICENSE).
