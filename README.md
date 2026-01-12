<h1 style="display: flex; justify-content: center; align-items: center">
<img width="4023" height="768" alt="LogoWithTextWhite" src="https://github.com/user-attachments/assets/ced5bc42-d61f-4c2a-8a33-366362a679ab" />
</h1>

![image](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white) 
![image](https://img.shields.io/badge/sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white) 
![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) 
![image](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)


Willkommen im Repository der offiziellen Website des **Tan Gun Do SV e.V.**, dem Taekwondo- und Selbstverteidigungsverein aus Essen-Schonnebeck.

Diese Website dient als digitale Anlaufstelle für Mitglieder und Interessierte, um Informationen über Trainingszeiten, aktuelle Neuigkeiten, Termine und den Verein selbst zu erhalten.

🔗 **Live-Demo:** [https://tan-gun-do-sv-ev.vercel.app/](https://tan-gun-do-sv-ev.vercel.app/)

## 🛠 Tech Stack

Das Projekt wurde mit modernen Web-Technologien entwickelt, um Performance, SEO und einfache Verwaltbarkeit zu gewährleisten.

* **Frontend & Framework:** [SvelteKit](https://kit.svelte.dev/) (SSR & SSG)
* **Content Management System (CMS):** [Sanity.io](https://www.sanity.io/)
* **Styling:** [TailwindCSS](https://tailwindcss.com/)
* **Deployment:** [Vercel](https://vercel.com/)

## ✨ Features

* **Aktuelles & News:** Dynamischer News-Feed, verwaltet über Sanity CMS.
* **Termine:** Übersicht über anstehende Events und Prüfungen.
* **Trainingszeiten:** Klare Darstellung der Trainingspläne für verschiedene Altersgruppen.
* **Responsives Design:** Optimiert für Smartphones, Tablets und Desktops (mobile-first design).
* **Kontaktformular:** Einfache Möglichkeit für Interessierte, Kontakt aufzunehmen.
* **Fast vollständige CMS Kompatibilität:** Nahezu alle Inhalte können über Sanity angepasst werden.

## 🚀 Installation & Setup

Folge diesen Schritten, um das Projekt lokal aufzusetzen:

### 1. Repository klonen

```bash
git clone https://github.com/noah-swf/tan-gun-do-sv-ev.git
cd tan-gun-do-sv-ev
```

### 2. Abhängigkeiten installieren

Dieses Projekt nutzt [npm](https://www.npmjs.com/) als Paketmanager. Installiere die Abhängigkeiten im Root-Verzeichnis:

```bash
npm install
```

### 3. Umgebungsvariablen konfigurieren

Erstelle `.env` Dateien basierend auf den Beispielen:

**Für das Studio (`/studio`):**
Kopiere `studio/.env.example` nach `studio/.env`:
```bash
cp studio/.env.example studio/.env
```
Fülle die Variablen `SANITY_STUDIO_PROJECT_ID` und `SANITY_STUDIO_DATASET` aus.

**Für die SvelteKit App (`/sveltekit-app`):**
Kopiere `sveltekit-app/.env.example` nach `sveltekit-app/.env`:
```bash
cp sveltekit-app/.env.example sveltekit-app/.env
```
Fülle die erforderlichen Sanity-Variablen aus.

### 4. Lokal starten

Starte beide Workspaces (Studio & App) gleichzeitig mit einem Befehl im Root-Verzeichnis:

```bash
npm run dev
```

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Sanity Studio:** [http://localhost:3333](http://localhost:3333)

## 📂 Projektstruktur

```
.
├── studio/           # Sanity CMS Konfiguration & Schemas
├── sveltekit-app/    # SvelteKit Frontend Anwendung
└── package.json      # Dependencies
```
## ⚖️ License & Usage

**© 2026 Tan Gun Do SV e.V. - All Rights Reserved.**

This repository is published for **portfolio and demonstration purposes only**.

*   You **MAY** view the code to evaluate the project's architecture and quality.
*   You **MAY NOT** use, copy, modify, or distribute the code, design, or assets for your own projects, whether commercial or personal.
*   The design and specific implementation details remain the intellectual property of the creators.

## 👥 Developer

Entwickelt mit ❤️ von:

* **Jakob** - [GitHub Profil](https://github.com/Jakob9505)
* **Noah** - [GitHub Profil](https://github.com/noah-swf)

---

© 2026 Tan Gun Do SV e.V.
