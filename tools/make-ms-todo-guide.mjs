/* ------------------------------------------------------------------ */
/*  Draws the schematic screens for the Microsoft To Do guide          */
/*  (docs/microsoft-todo*.md) in German and English.                   */
/*                                                                     */
/*    node tools/make-ms-todo-guide.mjs                                */
/*                                                                     */
/*  Output: docs/img/ms-todo/{de,en}/NN-*.svg. They are schematic on   */
/*  purpose - no real screenshots, no logos - so the steps stay         */
/*  readable when Microsoft reshuffles its portal. Labels follow the   */
/*  portal wording; update the texts below when it changes.            */
/* ------------------------------------------------------------------ */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "docs", "img", "ms-todo");

const C = {
  page: "#eef1f5",
  win: "#ffffff",
  chrome: "#f3f4f6",
  band: "#f8fafc",
  side: "#fafbfc",
  border: "#d0d7de",
  line: "#e5e7eb",
  text: "#1f2933",
  muted: "#6b7280",
  faint: "#9aa4b2",
  blue: "#0f6cbd",
  sel: "#e8f1fb",
  mark: "#ea580c",
  markSoft: "#fff1e6",
  ok: "#15803d",
  bad: "#dc2626",
  ha: "#03a9f4",
  haBg: "#f5f7fa",
};
const FONT = "'Segoe UI', system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, 'Cascadia Mono', Menlo, Consolas, monospace";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---------- drawing primitives ---------- */

function t(x, y, s, o = {}) {
  const { size = 13, weight = 400, fill = C.text, anchor = "start", family = FONT, deco = "" } = o;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${deco ? ` text-decoration="${deco}"` : ""}>${esc(s)}</text>`;
}
/** Several lines, `lh` apart. */
function lines(x, y, arr, o = {}) {
  const lh = o.lh ?? 17;
  return arr.map((s, i) => t(x, y + i * lh, s, o)).join("");
}
function r(x, y, w, h, o = {}) {
  const { fill = "none", stroke = "none", rx = 0, sw = 1, dash = "" } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
}
const line = (x1, y1, x2, y2, stroke = C.line, sw = 1) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"/>`;

/** Numbered step marker. */
function badge(n, x, y) {
  return (
    `<circle cx="${x}" cy="${y}" r="11" fill="${C.mark}"/>` +
    t(x, y + 4.5, n, { size: 12, weight: 700, fill: "#fff", anchor: "middle" })
  );
}
/** Orange frame around the thing to click / copy. */
const ring = (x, y, w, h) => r(x, y, w, h, { stroke: C.mark, rx: 6, sw: 2 });
/** Explanation box next to the screen. */
function note(x, y, w, n, arr) {
  const h = 16 + arr.length * 17;
  return (
    r(x, y, w, h, { fill: "#fff7ed", stroke: "#fdba74", rx: 8 }) +
    (n ? badge(n, x + 16, y + 17) : "") +
    lines(x + (n ? 34 : 12), y + 22, arr, { size: 12.5 })
  );
}
function arrow(d) {
  return `<path d="${d}" fill="none" stroke="${C.mark}" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#ah)"/>`;
}
const cross = (x, y) => t(x, y, "✗", { size: 15, weight: 700, fill: C.bad });
const check = (x, y) => t(x, y, "✓", { size: 15, weight: 700, fill: C.ok });

/** Browser window: frame, title bar, address pill. Content starts at y + 36. */
function win(x, y, w, h, url) {
  return (
    r(x, y, w, h, { fill: C.win, stroke: C.border, rx: 10 }) +
    `<path d="M${x} ${y + 36} V${y + 10} a10 10 0 0 1 10 -10 H${x + w - 10} a10 10 0 0 1 10 10 V${y + 36} Z" fill="${C.chrome}"/>` +
    line(x, y + 36, x + w, y + 36, C.border) +
    [0, 1, 2]
      .map((i) => `<circle cx="${x + 18 + i * 14}" cy="${y + 18}" r="4.5" fill="#cbd2d9"/>`)
      .join("") +
    r(x + 70, y + 8, w - 90, 20, { fill: "#fff", stroke: C.line, rx: 10 }) +
    t(x + 82, y + 22, url, { size: 11.5, fill: C.muted, family: MONO })
  );
}
/** Portal header band under the address bar. */
const band = (x, y, w, label) =>
  r(x + 1, y + 37, w - 2, 34, { fill: C.band }) +
  line(x, y + 71, x + w, y + 71, C.line) +
  t(x + 18, y + 59, label, { size: 13.5, weight: 600, fill: C.muted });

function input(x, y, w, value, o = {}) {
  return (
    r(x, y, w, 32, { fill: "#fff", stroke: C.border, rx: 4 }) +
    t(x + 10, y + 21, value, {
      size: o.size ?? 13,
      family: o.mono ? MONO : FONT,
      fill: o.fill ?? C.text,
    })
  );
}
function button(x, y, w, label, primary = true) {
  return (
    r(x, y, w, 32, {
      fill: primary ? C.blue : "#fff",
      stroke: primary ? C.blue : C.border,
      rx: 4,
    }) +
    t(x + w / 2, y + 21, label, {
      size: 13,
      weight: 600,
      fill: primary ? "#fff" : C.text,
      anchor: "middle",
    })
  );
}
function radio(x, y, on) {
  return (
    `<circle cx="${x}" cy="${y}" r="7" fill="#fff" stroke="${on ? C.blue : C.faint}" stroke-width="1.5"/>` +
    (on ? `<circle cx="${x}" cy="${y}" r="3.8" fill="${C.blue}"/>` : "")
  );
}
function checkbox(x, y, on, color = C.ha) {
  return (
    r(x, y, 18, 18, { fill: on ? color : "#fff", stroke: on ? color : C.faint, rx: 3, sw: 1.5 }) +
    (on
      ? `<path d="M${x + 4} ${y + 9.5} l3.5 3.5 l6.5 -7" fill="none" stroke="#fff" stroke-width="2.2"/>`
      : "")
  );
}
/** App-registration side menu with one entry selected. */
function sideMenu(x, y, h, items, selIdx, title) {
  let s = r(x + 1, y, 229, h, { fill: C.side }) + line(x + 230, y, x + 230, y + h, C.line);
  if (title) s += t(x + 18, y + 28, title, { size: 13, weight: 700 });
  items.forEach((it, i) => {
    const iy = y + (title ? 50 : 22) + i * 30;
    const indent = it.startsWith("  ") ? 16 : 0;
    const head = it.startsWith("!");
    if (i === selIdx) s += r(x + 8, iy - 17, 214, 26, { fill: C.sel, rx: 4 });
    s += t(x + 20 + indent, iy, it.trim().replace(/^!/, ""), {
      size: 12.5,
      weight: i === selIdx ? 600 : head ? 700 : 400,
      fill: i === selIdx ? C.blue : C.text,
    });
  });
  return s;
}
/** Y of side-menu entry `i` (for rings). */
const sideY = (y, i, title) => y + (title ? 50 : 22) + i * 30;

function svg(w, h, body, caption) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.mark}"/></marker><marker id="ahg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${C.muted}"/></marker></defs>
${r(0, 0, w, h, { fill: C.page, rx: 14 })}
${body}
${t(w - 16, h - 12, caption, { size: 11, fill: C.faint, anchor: "end" })}
</svg>
`;
}

/* ---------- texts ---------- */

const L = {
  de: {
    caption: "Schematische Darstellung – die echte Oberfläche kann leicht abweichen.",
    portal: "Microsoft Entra Admin Center",
    // 0 overview
    flow: [
      ["📱 Microsoft To Do", "App & Handy"],
      ["☁️ Microsoft Graph", "Microsoft-Cloud"],
      ["🏠 MS365 To Do", "HA-Integration (HACS)"],
      ["☑️ todo.*", "Listen in HA"],
      ["🧹 Family Task Card", "deine Karte"],
    ],
    flowSteps: ["Schritt 1–5: Entra-App anlegen", "Schritt 6–7: in HA verbinden", "Schritt 8"],
    flowKey: "Client-ID + Geheimnis",
    // 1 nav
    nav: [
      "Startseite",
      "!Entra ID ▾",
      "  Übersicht",
      "  Benutzer",
      "  Gruppen",
      "  App-Registrierungen",
    ],
    appRegs: "App-Registrierungen",
    newReg: "+ Neue Registrierung",
    toolbar: ["Endpunkte", "Problembehandlung"],
    tabs: ["Alle Anwendungen", "Eigene Anwendungen"],
    cols1: ["Anzeigename", "Anwendungs-ID (Client)", "Erstellt am"],
    empty: "Noch keine Anwendungen",
    n1a: ["Links: Entra ID → App-Registrierungen"],
    n1b: ["Oben: „Neue Registrierung“"],
    // 2 register
    regTitle: "Anwendung registrieren",
    name: "Name *",
    appName: "Home Assistant To Do",
    accTypes: "Unterstützte Kontotypen",
    accQ: "Wer kann diese Anwendung verwenden?",
    acc: [
      ["Nur Konten in diesem Organisationsverzeichnis (Einzelner Mandant)"],
      ["Konten in einem beliebigen Organisationsverzeichnis (Mehrere Mandanten)"],
      [
        "Konten in einem beliebigen Organisationsverzeichnis (Mehrere Mandanten)",
        "und persönliche Microsoft-Konten (z. B. Skype, Xbox)",
      ],
      ["Nur persönliche Microsoft-Konten"],
    ],
    dont: "nicht wählen",
    redirect: "Umleitungs-URI (optional)",
    web: "Web",
    register: "Registrieren",
    n2: [
      [1, ["Name frei wählbar,", "z. B. „Home Assistant", "To Do“"]],
      [
        2,
        [
          "Genau diese Option:",
          "klappt mit privaten Konten",
          "(outlook.com, hotmail.de)",
          "und mit Firmenkonten",
        ],
      ],
      [3, ["Plattform „Web“ und", "exakt diese Adresse"]],
      [4, ["„Registrieren“"]],
    ],
    // 3 overview
    appMenu: [
      "Übersicht",
      "Schnellstart",
      "Branding & Eigenschaften",
      "Authentifizierung",
      "Zertifikate & Geheimnisse",
      "API-Berechtigungen",
    ],
    essentials: "Zusammenfassung",
    kv: [
      ["Anzeigename", "Home Assistant To Do"],
      ["Anwendungs-ID (Client)", "1a2b3c4d-5e6f-4a1b-9c8d-0123456789ab"],
      ["Objekt-ID", "9f8e7d6c-…"],
      ["Verzeichnis-ID (Mandant)", "7c6b5a49-…"],
      ["Unterstützte Kontotypen", "Alle Benutzer mit Microsoft-Konto"],
    ],
    n3: [
      "Das ist die Client-ID. Kopieren und notieren –",
      "sie kommt in Schritt 6 in Home Assistant.",
    ],
    n3b: ["Die Mandanten-ID wird", "nicht gebraucht."],
    // 4 secrets
    secTitle: "Zertifikate & Geheimnisse",
    secTabs: ["Zertifikate (0)", "Geheime Clientschlüssel (1)", "Verbundanmeldeinfo. (0)"],
    newSecret: "+ Neuer geheimer Clientschlüssel",
    secCols: ["Beschreibung", "Ablaufdatum", "Wert", "Geheime ID"],
    secRow: ["Home Assistant", "24.09.2028", "Xy7Q~a1B2c3D4e5F6g7H8", "8c1d2e3f-…"],
    notThis: "nicht diese!",
    n4a: [
      "Neuer Schlüssel: Beschreibung",
      "eingeben, Ablauf wählen",
      "(max. 24 Monate), „Hinzufügen“",
    ],
    n4b: ["Den WERT sofort kopieren –", "er wird nur jetzt angezeigt,", "danach nur noch ••••"],
    n4c: [
      "Ablaufdatum im Kalender notieren:",
      "danach neuen Schlüssel anlegen und",
      "in HA „Neu konfigurieren“.",
    ],
    // 5 permissions
    permTitle: "API-Berechtigungen",
    addPerm: "+ Berechtigung hinzufügen",
    consent: "✓ Administratorzustimmung erteilen",
    permCols: ["API / Name der Berechtigung", "Typ", "Beschreibung"],
    graph: "▾ Microsoft Graph (3)",
    delegated: "Delegiert",
    perms: [
      ["offline_access", "Zugriff auf Daten beibehalten, …"],
      ["Tasks.ReadWrite", "Aufgaben des Benutzers erstellen, lesen, …"],
      ["User.Read", "Anmelden und Benutzerprofil lesen"],
    ],
    n5a: ["„Berechtigung hinzufügen“ → Microsoft Graph → Delegierte Berechtigungen"],
    n5b: [
      "Tasks.ReadWrite und offline_access suchen und anhaken (User.Read ist schon da).",
      "Zustimmen musst du hier nicht – das passiert beim Anmelden aus Home Assistant.",
    ],
    // 6 HA dialog
    haPath: "Einstellungen → Geräte & Dienste → Integration hinzufügen",
    fields: ["Account name", "Client ID", "Client secret"],
    values: ["familie", "1a2b3c4d-5e6f-4a1b-9c8d-0123456789ab", "••••••••••••••••••"],
    enableUpdate: "Enable update",
    altAuth: "Use alternate authentication",
    submit: "Absenden",
    n6: [
      [1, ["Frei wählbar,", "z. B. „familie“"]],
      [2, ["Client-ID", "aus Schritt 3"]],
      [3, ["Der Wert", "aus Schritt 4"]],
      [
        4,
        [
          "UNBEDINGT anhaken!",
          "Sonst sind die Listen in",
          "der Karte nur lesbar (🔒):",
          "kein Abhaken, kein",
          "„+ Aufgabe“.",
        ],
      ],
    ],
    // 7 auth
    link: "Link MS365 account",
    loginHint: [
      "Microsoft-Anmeldung öffnet sich:",
      "mit dem Konto anmelden, dessen",
      "Listen erscheinen sollen →",
      "„Akzeptieren“",
    ],
    returned: "Returned URL",
    blank: "(leere Seite – das ist richtig)",
    copyPaste: "Adresse kopieren & einfügen",
    n7: ["Nicht Safari auf dem Mac nutzen –", "dort fehlt die Adresse."],
  },
  en: {
    caption: "Schematic — the real screen may differ slightly.",
    portal: "Microsoft Entra admin center",
    flow: [
      ["📱 Microsoft To Do", "app & phone"],
      ["☁️ Microsoft Graph", "Microsoft cloud"],
      ["🏠 MS365 To Do", "HA integration (HACS)"],
      ["☑️ todo.*", "lists in HA"],
      ["🧹 Family Task Card", "your card"],
    ],
    flowSteps: ["Steps 1–5: create the Entra app", "Steps 6–7: connect in HA", "Step 8"],
    flowKey: "client ID + secret",
    nav: ["Home", "!Entra ID ▾", "  Overview", "  Users", "  Groups", "  App registrations"],
    appRegs: "App registrations",
    newReg: "+ New registration",
    toolbar: ["Endpoints", "Troubleshooting"],
    tabs: ["All applications", "Owned applications"],
    cols1: ["Display name", "Application (client) ID", "Created on"],
    empty: "No applications yet",
    n1a: ["Left: Entra ID → App registrations"],
    n1b: ["Top: “New registration”"],
    regTitle: "Register an application",
    name: "Name *",
    appName: "Home Assistant To Do",
    accTypes: "Supported account types",
    accQ: "Who can use this application or access this API?",
    acc: [
      ["Accounts in this organizational directory only (Single tenant)"],
      ["Accounts in any organizational directory (Multitenant)"],
      [
        "Accounts in any organizational directory (Multitenant)",
        "and personal Microsoft accounts (e.g. Skype, Xbox)",
      ],
      ["Personal Microsoft accounts only"],
    ],
    dont: "don't pick",
    redirect: "Redirect URI (optional)",
    web: "Web",
    register: "Register",
    n2: [
      [1, ["Any name, e.g.", "“Home Assistant", "To Do”"]],
      [
        2,
        [
          "Exactly this option:",
          "works with personal",
          "accounts (outlook.com,",
          "hotmail) and work ones",
        ],
      ],
      [3, ["Platform “Web” and", "exactly this address"]],
      [4, ["“Register”"]],
    ],
    appMenu: [
      "Overview",
      "Quickstart",
      "Branding & properties",
      "Authentication",
      "Certificates & secrets",
      "API permissions",
    ],
    essentials: "Essentials",
    kv: [
      ["Display name", "Home Assistant To Do"],
      ["Application (client) ID", "1a2b3c4d-5e6f-4a1b-9c8d-0123456789ab"],
      ["Object ID", "9f8e7d6c-…"],
      ["Directory (tenant) ID", "7c6b5a49-…"],
      ["Supported account types", "All Microsoft account users"],
    ],
    n3: ["This is the client ID. Copy and keep it –", "it goes into Home Assistant in step 6."],
    n3b: ["The tenant ID is not", "needed."],
    secTitle: "Certificates & secrets",
    secTabs: ["Certificates (0)", "Client secrets (1)", "Federated credentials (0)"],
    newSecret: "+ New client secret",
    secCols: ["Description", "Expires", "Value", "Secret ID"],
    secRow: ["Home Assistant", "9/24/2028", "Xy7Q~a1B2c3D4e5F6g7H8", "8c1d2e3f-…"],
    notThis: "not this one!",
    n4a: ["New secret: enter a description,", "pick an expiry (max. 24", "months), “Add”"],
    n4b: ["Copy the VALUE right away –", "it's shown only now, later", "just ••••"],
    n4c: [
      "Put the expiry date in your calendar:",
      "then create a new secret and use",
      "“Reconfigure” in HA.",
    ],
    permTitle: "API permissions",
    addPerm: "+ Add a permission",
    consent: "✓ Grant admin consent",
    permCols: ["API / Permissions name", "Type", "Description"],
    graph: "▾ Microsoft Graph (3)",
    delegated: "Delegated",
    perms: [
      ["offline_access", "Maintain access to data you have …"],
      ["Tasks.ReadWrite", "Create, read, update, and delete user's …"],
      ["User.Read", "Sign in and read user profile"],
    ],
    n5a: ["“Add a permission” → Microsoft Graph → Delegated permissions"],
    n5b: [
      "Search and tick Tasks.ReadWrite and offline_access (User.Read is already there).",
      "No need to consent here – that happens when you sign in from Home Assistant.",
    ],
    haPath: "Settings → Devices & services → Add integration",
    fields: ["Account name", "Client ID", "Client secret"],
    values: ["family", "1a2b3c4d-5e6f-4a1b-9c8d-0123456789ab", "••••••••••••••••••"],
    enableUpdate: "Enable update",
    altAuth: "Use alternate authentication",
    submit: "Submit",
    n6: [
      [1, ["Any name,", "e.g. “family”"]],
      [2, ["Client ID", "from step 3"]],
      [3, ["The value", "from step 4"]],
      [
        4,
        [
          "MUST be ticked!",
          "Otherwise the lists are",
          "read-only in the card (🔒):",
          "no checking off, no",
          "“+ task”.",
        ],
      ],
    ],
    link: "Link MS365 account",
    loginHint: [
      "The Microsoft sign-in opens:",
      "sign in with the account whose",
      "lists should appear →",
      "“Accept”",
    ],
    returned: "Returned URL",
    blank: "(blank page – that's expected)",
    copyPaste: "copy & paste the address",
    n7: ["Don't use Safari on a Mac –", "it doesn't show the address."],
  },
};

/* ---------- screens ---------- */

const REDIRECT = "https://login.microsoftonline.com/common/oauth2/nativeclient";

const screens = {
  "00-ueberblick": (T) => {
    const W = 900;
    let b = "";
    const bw = 150;
    const gap = (W - 40 - bw * 5) / 4;
    const xs = [0, 1, 2, 3, 4].map((i) => 20 + i * (bw + gap));
    T.flow.forEach(([a, sub], i) => {
      const hl = i === 2;
      b += r(xs[i], 40, bw, 70, {
        fill: "#fff",
        stroke: hl ? C.mark : C.border,
        rx: 10,
        sw: hl ? 2 : 1,
      });
      b += t(xs[i] + bw / 2, 70, a, { size: 13.5, weight: 700, anchor: "middle" });
      b += t(xs[i] + bw / 2, 92, sub, { size: 12, fill: C.muted, anchor: "middle" });
      if (i < 4)
        b += `<path d="M${xs[i] + bw + 4} 75 H${xs[i + 1] - 6}" stroke="${C.muted}" stroke-width="2" marker-end="url(#ahg)"/>`;
    });
    // the key the guide produces sits on the Graph <-> integration link
    const kx = (xs[1] + bw + xs[2]) / 2;
    b += t(kx, 32, "🔑 " + T.flowKey, { size: 11.5, weight: 600, fill: C.mark, anchor: "middle" });
    // step brackets
    const br = (x1, x2, label) =>
      `<path d="M${x1} 128 v8 H${x2} v-8" fill="none" stroke="${C.mark}" stroke-width="1.5"/>` +
      t((x1 + x2) / 2, 156, label, { size: 12.5, weight: 600, fill: C.mark, anchor: "middle" });
    b += br(xs[1] + 10, xs[2] + bw / 2 - 6, T.flowSteps[0]);
    b += br(xs[2] + bw / 2 + 6, xs[3] + bw - 10, T.flowSteps[1]);
    b += br(xs[4] + 10, xs[4] + bw - 10, T.flowSteps[2]);
    return svg(W, 200, b, T.caption);
  },

  "01-app-registrieren": (T) => {
    const W = 900;
    const H = 420;
    let b = win(10, 10, 880, 380, "entra.microsoft.com") + band(10, 10, 880, T.portal);
    const sy = 82;
    b += sideMenu(10, sy, 308, T.nav, 5);
    const ry = sideY(sy, 5);
    b += ring(16, ry - 19, 212, 30) + badge(1, 226, ry - 19);
    b += t(256, 122, T.appRegs, { size: 20, weight: 700 });
    b += ring(250, 138, 190, 30) + t(262, 158, T.newReg, { size: 13.5, weight: 600, fill: C.blue });
    b += badge(2, 440, 138);
    b += t(466, 158, T.toolbar[0], { size: 13, fill: C.muted });
    b += t(560, 158, T.toolbar[1], { size: 13, fill: C.muted });
    b += t(256, 202, T.tabs[0], { size: 13, weight: 600, fill: C.blue });
    b += line(256, 210, 256 + T.tabs[0].length * 7.3, 210, C.blue, 2);
    b += t(420, 202, T.tabs[1], { size: 13, fill: C.muted });
    b += line(250, 211, 876, 211);
    b += t(256, 236, T.cols1[0], { size: 12, weight: 600, fill: C.muted });
    b += t(460, 236, T.cols1[1], { size: 12, weight: 600, fill: C.muted });
    b += t(700, 236, T.cols1[2], { size: 12, weight: 600, fill: C.muted });
    b += line(250, 246, 876, 246);
    b += t(563, 292, T.empty, { size: 13, fill: C.faint, anchor: "middle" });
    b += note(256, 318, 300, 1, T.n1a);
    b += note(570, 318, 300, 2, T.n1b);
    return svg(W, H + 10, b, T.caption);
  },

  "02-registrieren": (T) => {
    const W = 900;
    const H = 640;
    let b = win(10, 10, 880, 590, "entra.microsoft.com") + band(10, 10, 880, T.portal);
    const x = 40;
    b += t(x, 118, T.regTitle, { size: 20, weight: 700 });
    b += t(x, 156, T.name, { size: 13, weight: 600 });
    b += ring(x - 5, 163, 360, 42) + input(x, 168, 350, T.appName);
    b += badge(1, x + 355, 163);
    b += t(x, 236, T.accTypes, { size: 14, weight: 700 });
    b += t(x, 256, T.accQ, { size: 12.5, fill: C.muted });
    let y = 284;
    T.acc.forEach((opt, i) => {
      const on = i === 2;
      if (on) b += ring(x - 6, y - 16, 590, 20 + opt.length * 17) + badge(2, x + 584, y - 16);
      b += radio(x + 8, y - 4, on);
      b += lines(x + 24, y, opt, { size: 12.5, weight: on ? 600 : 400 });
      if (i === 3)
        b += cross(x + 270, y + 1) + t(x + 288, y, T.dont, { size: 12, fill: C.bad, weight: 600 });
      y += 16 + opt.length * 17 + (on ? 6 : 0);
    });
    y += 18;
    b += t(x, y, T.redirect, { size: 14, weight: 700 });
    y += 16;
    b += ring(x - 6, y - 5, 590, 42);
    b +=
      r(x, y, 120, 32, { fill: "#fff", stroke: C.border, rx: 4 }) +
      t(x + 10, y + 21, T.web + "  ▾", { size: 13 });
    b += input(x + 130, y, 450, REDIRECT, { mono: true, size: 11.5 });
    b += badge(3, x + 584, y - 5);
    y += 66;
    b += ring(x - 5, y - 5, 130, 42) + button(x, y, 120, T.register) + badge(4, x + 125, y - 5);
    // explanations on the right
    const nx = 672;
    const ny = [150, 262, y - 104, y];
    T.n2.forEach(([n, arr], i) => (b += note(nx, ny[i], 206, n, arr)));
    return svg(W, H, b, T.caption);
  },

  "03-client-id": (T) => {
    const W = 900;
    const H = 450;
    let b = win(10, 10, 880, 410, "entra.microsoft.com") + band(10, 10, 880, T.portal);
    b += sideMenu(10, 82, 338, T.appMenu, 0, "Home Assistant To Do");
    b += t(256, 118, "Home Assistant To Do", { size: 20, weight: 700 });
    b += t(256, 156, "▾ " + T.essentials, { size: 14, weight: 700 });
    let y = 190;
    T.kv.forEach(([k, v], i) => {
      const key = i === 1;
      const dim = i === 2 || i === 3;
      if (key) b += ring(250, y - 19, 490, 30) + badge(1, 738, y - 19);
      b += t(258, y, k, { size: 12.5, fill: C.muted });
      b += t(440, y, v, {
        size: key ? 12 : 12.5,
        family: key ? MONO : FONT,
        weight: key ? 600 : 400,
        fill: dim ? C.faint : C.blue,
      });
      if (key) b += t(728, y, "⧉", { size: 14, fill: C.blue, anchor: "end" });
      y += 32;
    });
    b += note(256, 340, 380, 1, T.n3);
    b += note(650, 340, 228, 0, T.n3b);
    return svg(W, H, b, T.caption);
  },

  "04-geheimnis": (T) => {
    const W = 900;
    const H = 510;
    let b = win(10, 10, 880, 470, "entra.microsoft.com") + band(10, 10, 880, T.portal);
    b += sideMenu(10, 82, 398, T.appMenu, 4, "Home Assistant To Do");
    const ry = sideY(82, 4, true);
    b += ring(16, ry - 19, 212, 30) + badge(1, 226, ry - 19);
    b += t(256, 118, T.secTitle, { size: 20, weight: 700 });
    const tabX = [256, 380, 604];
    T.secTabs.forEach(
      (s, i) =>
        (b += t(tabX[i], 156, s, {
          size: 12.5,
          weight: i === 1 ? 600 : 400,
          fill: i === 1 ? C.blue : C.muted,
        })),
    );
    b +=
      line(250, 166, 876, 166) + line(380, 165, 380 + T.secTabs[1].length * 6.9, 165, C.blue, 2.5);
    const sw = T.newSecret.length * 8.2 + 20;
    b += ring(250, 180, sw, 30);
    b += t(262, 200, T.newSecret, { size: 13.5, weight: 600, fill: C.blue });
    b += badge(2, 250 + sw, 180);
    const cx = [258, 396, 504, 744];
    T.secCols.forEach((s, i) => (b += t(cx[i], 240, s, { size: 12, weight: 600, fill: C.muted })));
    b += line(250, 250, 876, 250);
    b += t(cx[0], 280, T.secRow[0], { size: 12.5 });
    b += t(cx[1], 280, T.secRow[1], { size: 12.5 });
    b += ring(cx[2] - 8, 260, 228, 30) + badge(3, cx[2] + 220, 260);
    b += t(cx[2], 280, T.secRow[2], { size: 12, family: MONO, weight: 600 });
    b += t(cx[2] + 204, 280, "⧉", { size: 14, fill: C.blue, anchor: "end" });
    b += t(cx[3], 280, T.secRow[3], {
      size: 12,
      family: MONO,
      fill: C.faint,
      deco: "line-through",
    });
    b += cross(cx[3], 304) + t(cx[3] + 16, 303, T.notThis, { size: 12, weight: 600, fill: C.bad });
    b += line(250, 292, 876, 292);
    b += note(256, 330, 290, 2, T.n4a);
    b += note(560, 330, 318, 3, T.n4b);
    b += note(256, 412, 400, 0, T.n4c);
    return svg(W, H, b, T.caption);
  },

  "05-berechtigungen": (T) => {
    const W = 900;
    const H = 500;
    let b = win(10, 10, 880, 460, "entra.microsoft.com") + band(10, 10, 880, T.portal);
    b += sideMenu(10, 82, 388, T.appMenu, 5, "Home Assistant To Do");
    b += t(256, 118, T.permTitle, { size: 20, weight: 700 });
    const aw = T.addPerm.length * 8.2 + 20;
    b += ring(250, 138, aw, 30) + t(262, 158, T.addPerm, { size: 13.5, weight: 600, fill: C.blue });
    b += badge(1, 250 + aw, 138);
    b += t(290 + aw, 158, T.consent, { size: 13, fill: C.faint });
    b += t(258, 204, T.permCols[0], { size: 12, weight: 600, fill: C.muted });
    b += t(478, 204, T.permCols[1], { size: 12, weight: 600, fill: C.muted });
    b += t(574, 204, T.permCols[2], { size: 12, weight: 600, fill: C.muted });
    b += line(250, 214, 876, 214);
    b += t(258, 240, T.graph, { size: 12.5, weight: 700, fill: C.blue });
    let y = 270;
    T.perms.forEach(([p, d], i) => {
      if (i === 1) b += ring(250, y - 19, 626, 30) + badge(2, 874, y - 19);
      b += t(276, y, p, { size: 12.5, family: MONO, weight: i === 1 ? 700 : 400 });
      b += t(478, y, T.delegated, { size: 12.5 });
      b += t(574, y, d, { size: 12.5, fill: C.muted });
      y += 32;
    });
    b += note(256, 362, 622, 1, T.n5a);
    b += note(256, 404, 622, 2, T.n5b);
    return svg(W, H, b, T.caption);
  },

  "06-ha-einrichten": (T) => {
    const W = 900;
    const H = 540;
    let b = win(10, 10, 880, 500, "homeassistant.local:8123/config/integrations");
    b += r(11, 47, 878, 462, { fill: C.haBg });
    b += t(30, 76, T.haPath, { size: 12.5, fill: C.muted });
    // dialog
    const dx = 220;
    const dw = 440;
    b += r(dx, 92, dw, 400, { fill: "#fff", stroke: C.line, rx: 16 });
    b += t(dx + 24, 130, "Microsoft 365 To Do", { size: 19, weight: 600 });
    let y = 156;
    T.fields.forEach((f, i) => {
      b += ring(dx + 18, y - 4, dw - 36, 56);
      b += r(dx + 24, y + 4, dw - 48, 42, { fill: "#fff", stroke: "#9aa4b2", rx: 4 });
      b += r(dx + 34, y - 2, f.length * 6.6 + 10, 12, { fill: "#fff" });
      b += t(dx + 38, y + 8, f, { size: 11, fill: C.muted });
      b += t(dx + 38, y + 31, T.values[i], {
        size: i === 1 ? 12 : 13.5,
        family: i === 1 ? MONO : FONT,
      });
      b += badge(i + 1, dx + dw - 18, y - 4);
      y += 66;
    });
    b += ring(dx + 18, y - 4, dw - 36, 34) + checkbox(dx + 28, y + 3, true);
    b += t(dx + 58, y + 17, T.enableUpdate, { size: 14, weight: 700 });
    b += badge(4, dx + dw - 18, y - 4);
    y += 44;
    b +=
      checkbox(dx + 28, y + 3, false) +
      t(dx + 58, y + 17, T.altAuth, { size: 13.5, fill: C.muted });
    b += t(dx + dw - 28, 470, T.submit, { size: 14, weight: 700, fill: C.ha, anchor: "end" });
    // explanations
    const left = T.n6.slice(0, 3);
    left.forEach(([n, arr], i) => (b += note(24, 150 + i * 66, 182, n, arr)));
    b += note(676, 330, 204, T.n6[3][0], T.n6[3][1]);
    return svg(W, H, b, T.caption);
  },

  "07-ha-anmelden": (T) => {
    const W = 900;
    const H = 470;
    let b = win(10, 10, 430, 430, "homeassistant.local:8123");
    b += r(11, 47, 428, 392, { fill: C.haBg });
    b += r(30, 66, 390, 356, { fill: "#fff", stroke: C.line, rx: 14 });
    b += t(50, 100, "Microsoft 365 To Do", { size: 17, weight: 600 });
    b +=
      ring(44, 114, 186, 30) +
      t(54, 134, T.link, { size: 13.5, weight: 600, fill: C.ha, deco: "underline" });
    b += badge(1, 230, 114);
    b += lines(54, 170, T.loginHint, { size: 12, fill: C.muted, lh: 16 });
    b += ring(44, 238, 362, 60);
    b += r(50, 248, 350, 42, { fill: "#fff", stroke: "#9aa4b2", rx: 4 });
    b += r(60, 242, T.returned.length * 6.6 + 10, 12, { fill: "#fff" });
    b += t(64, 252, T.returned, { size: 11, fill: C.muted });
    b += t(64, 275, "…/oauth2/nativeclient?code=0.AXkA…", { size: 11.5, family: MONO });
    b += badge(3, 404, 238);
    b +=
      ring(304, 372, 100, 34) +
      t(394, 394, T.submit, { size: 14, weight: 700, fill: C.ha, anchor: "end" });
    b += badge(4, 404, 372);
    // browser after the Microsoft sign-in
    b += win(460, 10, 430, 300, "…/oauth2/nativeclient?code=0.AXkA…");
    b += ring(526, 14, 348, 28) + badge(2, 874, 14);
    b += t(700, 130, T.blank, { size: 13, fill: C.faint, anchor: "middle" });
    b += arrow("M560 46 C 560 150, 470 220, 412 266");
    b += t(640, 252, T.copyPaste, { size: 12.5, weight: 700, fill: C.mark, anchor: "middle" });
    b += note(470, 336, 300, 0, T.n7);
    return svg(W, H, b, T.caption);
  },
};

let n = 0;
for (const lang of Object.keys(L)) {
  const dir = join(OUT, lang);
  mkdirSync(dir, { recursive: true });
  for (const [name, draw] of Object.entries(screens)) {
    writeFileSync(join(dir, `${name}.svg`), draw(L[lang]));
    n++;
  }
}
console.log(`wrote ${n} SVGs to ${OUT}`);
