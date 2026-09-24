# 🧹 Family Task Card

> 🌐 **Deutsch** (diese Seite) · [English](README.md)

![Family Task Card – Personen-Board mit Aufgaben, Punkten, Bring!-Einkauf und Kontext-Markierung](assets/preview.svg)

> **Status: nutzbar (v0.12.0).** Personen-Board, visueller Editor, Kinder-Modus,
> Wandtablet-Kiosk, Bring!-Einkauf, **Microsoft To Do**, Kontext-Aufgaben, Belohnungs-Shop,
> Feier-Aktionen und Level/Abzeichen + Rangliste sind da – responsiv,
> **zweisprachig (DE/EN)**, **theme-aware inkl. Dark-Mode-Schalter**, mit
> **Darstellungs-Reglern (Größe/Schrift/Bilder)**, **Aufgabe-hinzufügen** und
> Sortier-/Ausblend-Optionen. Die Karte liest `todo.*`-Listen live, schreibt beim
> Abhaken zurück und passt sich jeder Integration an – siehe [ROADMAP.de.md](ROADMAP.de.md).

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
Zuweisung, Geofence, Level/Avatare …) in [ROADMAP.de.md](ROADMAP.de.md).

## Zusammenspiel mit der Family Board Card

Gleiche Design-Sprache, dieselben `person.*`-Entitäten und **dieselbe
Personen-Palette** – die liegt als gespiegelte Datei in beiden Projekten, damit
dieselbe Person auf beiden Karten dieselbe Farbe hat.

Seit Board v0.27 kann die [Family Board Card](https://github.com/renespeaker/ha-family-board-card)
zusätzlich fällige Aufgaben aus denselben `todo.*`-Listen als Chips anzeigen.

**Beide Karten sind trotzdem vollständig eigenständig.** Keine setzt die andere
voraus, sie sprechen nicht miteinander, sondern jede für sich mit Home
Assistant. Wer nur eine von beiden installiert, merkt von der anderen nichts.

## Plattformen & Provider (iOS / Android)

Die Karte läuft überall, wo Home Assistant läuft – im Browser und **in der HA-
Companion-App auf iPhone/iPad und Android**. Das Layout ist **responsiv**: auf
dem Handy stapeln sich die Personen-Spalten, Bedien­elemente sind touch-groß, der
Kinder-Modus ist fürs Wandtablet gemacht.

Weil die Karte auf `todo.*`-Entities aufsetzt, ist sie **provider- und plattform-
übergreifend** – die jeweilige HA-Integration liefert die Liste, die Karte nutzt
sie **ohne anbieterspezifischen Code**. Und: die Karte erkennt die **Fähigkeiten**
jeder Liste (`supported_features`) – kann eine Liste nicht abgehakt werden, zeigt
sie die Aufgaben schreibgeschützt (🔒) statt ins Leere zu tippen.

| Provider | HA-Integration | Konto | Lesen · Abhaken |
|---|---|---|:---:|
| 🍎 **Apple Erinnerungen** | [CalDAV](https://www.home-assistant.io/integrations/caldav/) (iCloud) | Apple-ID | ✅ · ✅ |
| 🟦 **Google Tasks** | [Google Tasks](https://www.home-assistant.io/integrations/google_tasks/) | Google | ✅ · ✅ |
| 🔴 **Todoist** | [Todoist](https://www.home-assistant.io/integrations/todoist/) | Todoist | ✅ · ✅ |
| 🛒 **Bring!** | [Bring!](https://www.home-assistant.io/integrations/bring/) | Bring! | ✅ · ✅ |
| 📝 **Lokale To-do-Liste** | HA-nativ | – | ✅ · ✅ |
| 🟦 **Microsoft To Do** | [MS365 To Do](https://github.com/RogerSelwyn/MS365-ToDo) (HACS, Community) | Microsoft | ✅ · ✅ ([Anleitung](docs/microsoft-todo.de.md)) |
| 🟡 **Google Keep** | keine offizielle | Google | ⚠️ inoffiziell |

> „Android" ist keine App – Android-Nutzer nehmen meist **Google Tasks,
> Microsoft To Do oder Todoist**. Alle drei sind abgedeckt. **Microsoft To Do**
> hat (noch) keine offizielle HA-Integration, läuft aber zuverlässig über die
> Community-Integration *MS365 To Do* – mit
> [**bebilderter Schritt-für-Schritt-Anleitung**](docs/microsoft-todo.de.md).

### Provider einrichten (Kurzanleitungen)

Alle Wege enden gleich: Die Liste erscheint als `todo.*`-Entity, die du hier im
**Editor pro Person** auswählst. Abhaken in der Karte synchronisiert zurück.

- **🍎 Apple Erinnerungen** — HA-Integration *CalDAV* hinzufügen, iCloud-CalDAV-URL
  + Apple-ID + **app-spezifisches Passwort**
  ([appleid.apple.com](https://appleid.apple.com) → Anmeldung & Sicherheit).
- **🟦 Google Tasks** — HA-Integration *Google Tasks*, per Google-Login verbinden;
  jede Tasks-Liste wird ein `todo.*`.
- **🔴 Todoist** — HA-Integration *Todoist* mit deinem API-Token.
- **🟦 Microsoft To Do** — Community-Integration *MS365 To Do* (HACS) plus eine
  Entra-App bei Microsoft. Das ist der aufwendigste Weg (~15 Min.), deshalb gibt
  es dafür eine [**bebilderte Anleitung**](docs/microsoft-todo.de.md). Wichtig:
  beim Einrichten **„Enable update“** anhaken, sonst sind die Listen nur lesbar.
- **🛒 Bring!** — HA-Integration *Bring!* mit Bring!-Account (siehe unten).
- **📝 Lokal** — Einstellungen → Geräte & Dienste → Helfer → *To-do-Liste*.

**Push/Deep-Links:** Benachrichtigungen (z. B. „Einkauf steht an", „X ist
fertig") verschickst du über `notify.mobile_app_*`; zum Öffnen einer App/URL
nutzt iOS `url`, Android `clickAction` (Beispiel: `examples/bring-push-automation.yaml`).

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
| `persons[].points_entity` | `input_number` | Guthaben-Helfer (eingelöste Punkte) für den Shop.  |
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
| `rewards`         | Liste              | Belohnungen für den Shop (`name`, `cost`, `emoji`).     |
| `parent_pin`      | Text/Zahl          | PIN für die Eltern-Freigabe beim Einlösen.              |
| `celebrate`       | Objekt             | HA-Services bei Erfolg (Licht/Sound/TTS/Push, siehe unten). |
| `level_size`      | Zahl               | Punkte pro Level (Std. 100, 0 = aus).                   |
| `level_emojis`    | Liste              | Abzeichen je Level-Stufe (optional).                    |
| `show_leaderboard`| Bool               | Rangliste der Personen nach Punkten unter dem Board.    |
| `theme`           | Text               | Farbschema: `auto` (HA-Theme, Std.) / `dark` / `light`. |
| `active_person_entity` | Entität       | Karte folgt der aktiven Person (NFC/Anwesenheit); leer = manuell. |
| `kiosk`           | Bool               | Wandtablet-Modus: „Wer ist dran?"-Ruhebildschirm + Auto-Rückkehr. |
| `auto_return`     | Zahl               | Sek. Inaktivität bis zurück zum Auswahl-Bildschirm (Std. 30, 0 = nie). |
| `allow_add`       | Bool               | „Aufgabe hinzufügen"-Feld je Person (Std. an).          |
| `sort`            | Text               | Sortierung offener Aufgaben: `manual` / `due` / `alpha`. |
| `hide_empty`      | Bool               | Personen ohne offene Aufgaben ausblenden.               |
| `due_soon`        | Zahl               | Aufgaben in den nächsten X Tagen als „Bald fällig" markieren. |
| `scale`           | Zahl (%)           | Gesamte Kartengröße (Zoom über alles). Std. 100.        |
| `font_scale`      | Zahl (%)           | Nur Schriftgröße. Std. 100.                             |
| `avatar_scale`    | Zahl (%)           | Nur Avatare/Bilder und Karten-Icon. Std. 100.           |

### Darstellung anpassen (Größe, Schrift, Bilder)

Im **visuellen Editor** (Karte → Bearbeiten) gibt es drei Schieberegler, mit denen
du das Aussehen ohne YAML anpasst — praktisch, weil z. B. der Kinder-Modus bewusst
größer ist:

- **Kartengröße (`scale`)** — zoomt die **ganze** Karte (Layout, Schrift und Bilder
  zusammen). Ideal, um eine Kinder-Card insgesamt kleiner oder größer zu machen.
- **Schriftgröße (`font_scale`)** — passt **nur den Text** an (zusätzlich zur
  Kartengröße), z. B. gut lesbar aus der Entfernung am Wandtablet.
- **Avatar-/Bildgröße (`avatar_scale`)** — passt **nur Avatare/Bilder** und das
  Karten-Icon an.

Alle drei sind in Prozent; **100 % = Standard** (nichts ändert sich). Sie wirken
in Board-, Kinder- und Kiosk-Modus.

```yaml
type: custom:family-task-card
scale: 90 # ganze Karte auf 90 %
font_scale: 120 # Text aber 120 % (gut lesbar)
avatar_scale: 140 # große Avatare
persons:
  - { name: Lina, person: person.lina, lists: todo.lina_aemtli }
```

### Kinder-Modus

Mit `kid_mode: true` zeigt die Karte ein **großes, tippbares Einzel-Kind-Layout**
fürs Wandtablet: oben ein Avatar-Umschalter (wer ist dran?), darunter XL-Kacheln
mit Emoji, ein Punkte-/Ziel-Balken und ein kurzes Konfetti-Feedback beim Abhaken.
Ideal als eigene Karte auf einem Kinder-Dashboard, während das volle Board für
die Eltern bleibt.

### Einkaufen mit Bring!

> **Voraussetzung:** Für die Bring!-Nutzung brauchst du die
> [**Bring!-Integration**](https://www.home-assistant.io/integrations/bring/) in
> Home Assistant und einen **Bring!-Account** beim Anbieter (die kostenlose
> Bring!-App). Die Integration stellt deine Bring!-Liste als `todo.*`-Entity
> bereit – die diese Karte dann verwendet. Ohne Bring! funktioniert die Karte
> normal mit allen anderen `todo.*`-Listen.

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

### Belohnungs-Shop

Punkte lassen sich gegen **Belohnungen** einlösen – mit **Eltern-Freigabe per
PIN**. Belohnungen definierst du in `rewards`; die PIN in `parent_pin`.

Damit ausgegebene Punkte **dauerhaft** gespeichert werden (auch nach Neuladen/
Neustart), bekommt jede Person einen HA-Helfer **`input_number`**, der die
**bereits eingelösten** Punkte hält. **Guthaben = verdient − eingelöst.**

```yaml
type: custom:family-task-card
parent_pin: "1234"
rewards:
  - { name: "30 Min Tablet", cost: 50, emoji: "📱" }
  - { name: "Eis", cost: 30, emoji: "🍦" }
  - { name: "Kino", cost: 200, emoji: "🎬" }
persons:
  - name: Lina
    lists: todo.lina_aemtli
    points_entity: input_number.lina_eingeloest   # input_number-Helfer anlegen
```

Bedienung: 🎁-Button in der Personen-Spalte (bzw. im Kinder-Modus) öffnet den
Shop. „Einlösen" ist nur aktiv, wenn das Guthaben reicht; danach fragt die Karte
die **Eltern-PIN** ab und bucht bei Erfolg vom `input_number` ab.

> Ohne `points_entity` zeigt der Shop die Belohnungen nur an (Einlösen
> deaktiviert). Der **asynchrone Freigabe-Ablauf** („Kind stellt Antrag, Eltern
> bestätigen später per Push, evtl. mit Foto") kommt laut Roadmap mit einem
> optionalen Backend. Die verdienten Punkte werden live aus dem Listenzustand
> berechnet – siehe Hinweis beim Einkauf.

### Feier-Aktionen (Erfolg fühlbar machen)

Die Karte kann bei Erfolg **beliebige Home-Assistant-Services** aufrufen – so
wird aus einem Häkchen ein kleiner Moment: Licht kurz grün, ein Jingle, eine
TTS-Ansage oder ein Push an die Eltern. Ideal fürs Wandtablet.

```yaml
type: custom:family-task-card
celebrate:
  on: all_done            # all_done | task | reward  (oder eine Liste)
  actions:
    - service: light.turn_on
      data: { entity_id: light.kinderzimmer, rgb_color: [0, 255, 0], brightness_pct: 100 }
    - service: tts.google_translate_say
      data: { entity_id: media_player.kueche, message: "{name} hat alles geschafft!" }
    - service: notify.mobile_app_papa
      data: { message: "{name} ist fertig 🎉" }
persons:
  - name: Lina
    lists: todo.lina_aemtli
```

- **`on`** wählt den Moment: `all_done` (Person hat nichts Offenes mehr –
  Standard), `task` (jede erledigte Aufgabe) oder `reward` (Belohnung eingelöst).
  Mehrere gleichzeitig als Liste möglich.
- **`actions`** ist eine Liste von Service-Aufrufen (`service` + `data`/`target`),
  genau wie in HA-Automationen.
- Platzhalter: **`{name}`** (Person) und **`{task}`** (Aufgaben-/Belohnungsname)
  werden in allen Text-Werten ersetzt.

> Die Konfetti-Animation auf dem Bildschirm läuft ohnehin. Fürs Wandtablet siehe
> **Kiosk-Modus** und **Personenwechsel per NFC / Anwesenheit** weiter unten.

### Level, Abzeichen & Rangliste

Jede Person sammelt mit erledigten Aufgaben **Level** – rein aus den verdienten
Punkten berechnet, ohne zusätzliche Einrichtung. Neben dem Namen erscheint ein
**Abzeichen-Chip** (z. B. „🏅 L3"). Mit `show_leaderboard: true` gibt es zusätzlich
eine **Rangliste** unter dem Board (🥇🥈🥉).

```yaml
type: custom:family-task-card
level_size: 100                       # Punkte pro Level (Standard 100, 0 = aus)
level_emojis: ["🌱", "⭐", "🔥", "🏅", "🏆", "👑"]   # optional, je Stufe
show_leaderboard: true
persons:
  - { name: Lina, lists: todo.lina_aemtli }
  - { name: Ben, lists: todo.ben_aemtli }
```

> Level & Rangliste nutzen die **verdienten** Punkte (nicht das Shop-Guthaben) –
> beides ist stateless aus den `todo`-Listen abgeleitet.

### Dark Mode / Farbschema

Die Karte ist **theme-aware**: Mit einem dunklen Home-Assistant-Theme wird sie
automatisch dunkel – ganz ohne Konfiguration. Wenn du das Farbschema **fest**
setzen willst (z. B. Wandtablet immer dunkel, egal welches Dashboard-Theme),
nutze `theme`:

```yaml
type: custom:family-task-card
theme: dark        # auto (Standard, folgt HA) | dark | light
persons:
  - { name: Lina, lists: todo.lina_aemtli }
```

Der Schalter überschreibt die Farbvariablen **nur innerhalb dieser Karte** –
Akzentfarbe (Personen-Palette, `--primary-color`) bleibt erhalten.

### Kiosk-Modus (Wandtablet)

Für ein fest an der Wand hängendes Tablet/Display: `kiosk: true` macht daraus eine
**geteilte Familien-Station**.

- **Ruhebildschirm „Wer ist dran?"** — große Avatare aller Personen. Antippen des
  eigenen Gesichts → die eigenen Aufgaben erscheinen (großes Kinder-Layout).
- **Auto-Rückkehr** — nach `auto_return` Sekunden ohne Bedienung (Standard 30)
  geht es automatisch zurück zum Auswahl-Bildschirm. `0` = nie.
- **Freihändig** — kombiniert mit `active_person_entity` weckt ein **NFC-Tag** oder
  **Anwesenheit** direkt die richtige Person (ohne Tippen), und nach Inaktivität
  wird wieder aufgeräumt.

```yaml
type: custom:family-task-card
kiosk: true
auto_return: 30                                   # Sekunden (0 = nie)
active_person_entity: input_select.aktives_kind   # optional: NFC/Anwesenheit
persons:
  - { name: Lina, person: person.lina, lists: todo.lina_aemtli }
  - { name: Ben,  person: person.ben,  lists: todo.ben_aemtli }
```

So wird das Wandtablet zur „Antippen → meine Ämtli → fertig"-Station, die sich
von selbst wieder in den neutralen Zustand zurücksetzt.

### Personenwechsel per NFC / Anwesenheit

Setzt du `active_person_entity`, **folgt die Karte automatisch der aktiven
Person**: Der Zustand dieser Entität (ein `input_select`, `sensor` oder
`person.*`) nennt, wer gerade dran ist – im Kinder-Modus wird diese Person
fokussiert, im Board hervorgehoben. Freihändig, ohne Antippen.

```yaml
type: custom:family-task-card
kid_mode: true
active_person_entity: input_select.aktives_kind   # Wert = Name / person.* / Anzeigename
persons:
  - { name: Lina, person: person.lina, lists: todo.lina_aemtli }
  - { name: Ben,  person: person.ben,  lists: todo.ben_aemtli }
```

Die **Erkennung** macht Home Assistant und setzt die Entität – z. B.:

- **NFC-Tag am Tablet:** Die HA-Companion-App scannt den Tag → eine Automation
  setzt `input_select.aktives_kind` auf das Kind. (Perfekt für Nicht-Leser:
  Chip dran → seine Aufgaben erscheinen.)
- **Anwesenheit/Raum:** Präsenzmelder + `person.*`/BLE setzen die Entität auf die
  Person, die den Raum betritt.
- **Button/Sprache:** Ein Dashboard-Button oder Sprachbefehl setzt sie.

Matching: der Wert der Entität wird mit `name`, der `person.*`-Entität und dem
Anzeigenamen jeder Person verglichen (Groß-/Kleinschreibung egal). Leeres Feld =
klassisches manuelles Umschalten.

### Aufgaben hinzufügen, Sortierung & Sprache

- **➕ Aufgabe hinzufügen** — unter jeder Person erscheint ein Eingabefeld; Enter
  legt die Aufgabe via `todo.add_item` an – aber nur, wo die Liste das
  unterstützt (die Karte prüft die Fähigkeiten). Abschaltbar mit `allow_add: false`.
- **🔽 Sortierung** — `sort: due` (nach Fälligkeit) oder `sort: alpha`
  (alphabetisch); Standard `manual` (Reihenfolge der Liste). Dringende/
  hervorgehobene Aufgaben stehen immer oben.
- **🙈 Leere ausblenden** — `hide_empty: true` versteckt Personen ohne offene
  Aufgaben.
- **⏰ Bald fällig** — `due_soon: 2` hebt Aufgaben hervor, die in den nächsten 2
  Tagen fällig sind (überfällige bleiben „dringend").
- **🌐 Sprache** — die Karte ist **zweisprachig (Deutsch/Englisch)** und richtet
  sich automatisch nach der HA-Oberflächensprache.

Ein vollständiges Beispiel liegt unter
[`examples/dashboard-card.yaml`](examples/dashboard-card.yaml).

## Aufbau des Repos

```
src/
├── ha-family-task-card.ts  Quelle der Lovelace-Karte (Lit + TypeScript)
├── editor.ts               Visueller Karten-Editor (Personen, Listen, Punkte)
├── card.test.ts            Komponententests gegen ein nachgebautes Home Assistant
└── shared/                 mit der Family Board Card gespiegelt (Personen-Palette)
family-task-card.js         Gebaute Karte (Rollup-Output, wird eingecheckt)
hacs.json                   HACS-Metadaten (Lovelace/Dashboard-Karte)
ROADMAP.md / ROADMAP.de.md  Vision, MVP & Roadmap (englisch / deutsch)
examples/                   Beispiel-Dashboards & Bring!-Push-Automation
docs/                       Anleitungen (z. B. Microsoft To Do, bebildert; englisch / deutsch)
tools/                      Hilfsskripte (Palette-Abgleich, Anleitungs-Bilder)
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
npm test           # Vitest (Karte gegen ein nachgebautes Home Assistant)
npm run format     # Prettier
```

Getestet wird die Karte als Komponente: [`src/card.test.ts`](src/card.test.ts)
rendert sie mit happy-dom gegen ein nachgebautes Home Assistant und prüft, was
am Ende wirklich dasteht – Spalten und offene Aufgaben je Person, Punkte,
Abhaken (schreibt es wirklich `todo.update_item`?), schreibgeschützte Listen,
Einkaufs-Kachel, Fälligkeiten, Kindermodus und die Zweisprachigkeit. Ein
Browser wird dafür nicht gebraucht.

Die GitHub-Actions bauen und testen bei jedem Push (`CI`), prüfen die
HACS-Struktur (`Validate`) und hängen bei einem Release die gebaute Karte als
Asset an (`Release`).

## Mitwirken

Frühe Phase – Ideen und Feedback willkommen über die
[Issues](https://github.com/renespeaker/ha-family-task-card/issues).

## Lizenz

Siehe [LICENSE](LICENSE).
