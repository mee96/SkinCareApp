<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=f4b8d4&height=140&section=header&text=✦%20SkinCareApp%20✦&fontColor=2d1b6e&fontSize=30&desc=frontend%20%E2%80%94%20Angular&descSize=15&descColor=2d1b6e&descAlignY=62&fontAlignY=38" width="100%" alt="SkinCareApp frontend" />

<br/>

![Angular](https://img.shields.io/badge/Angular-21-a8c4f0?style=for-the-badge&logo=angular&logoColor=2d1b6e)
![TypeScript](https://img.shields.io/badge/TypeScript-c5b9f0?style=for-the-badge&logo=typescript&logoColor=2d1b6e)
![i18n](https://img.shields.io/badge/i18n-CA%2FES%2FEN%2F%ED%95%9C%EA%B5%AD%EC%96%B4-b8e8d4?style=for-the-badge&logoColor=2d1b6e)

</div>

<br/>

---

## <img src="https://api.iconify.design/ph/question-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;What is this?

This is the **frontend** of [SkinCareApp](../README.md) — an Angular application (standalone components, signals, `OnPush`) that consumes the FastAPI backend to manage the skincare routine, product stock, calendar, and educational articles.

For the full project overview (complete stack, features, live demo) see the [repository root README](../README.md).

<br/>

---

## <img src="https://api.iconify.design/ph/stack-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Stack

| | |
| :--- | :--- |
| <img src="https://api.iconify.design/ph/desktop-tower-fill.svg?color=%23FF6FA8&height=18" height="16"> **Framework** | Angular 21 · standalone components · signals · `OnPush` |
| <img src="https://api.iconify.design/ph/key-fill.svg?color=%232FB5AE&height=18" height="16"> **Auth** | Firebase Authentication (Email + Google) |
| <img src="https://api.iconify.design/ph/translate-fill.svg?color=%23E0A63B&height=18" height="16"> **i18n** | ngx-translate · CA / ES / EN / 한국어 |
| <img src="https://api.iconify.design/ph/shapes-fill.svg?color=%23B372CF&height=18" height="16"> **Icons** | Lucide |
| <img src="https://api.iconify.design/ph/device-mobile-fill.svg?color=%232FB5AE&height=18" height="16"> **PWA** | Installable via Angular Service Worker (`@angular/pwa`), offline-ready |
| <img src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%23E0A63B&height=18" height="16"> **Deploy** | Render (Static Site) |

<br/>

---

## <img src="https://api.iconify.design/ph/folder-fill.svg?color=%232FB5AE&height=24" height="22"> &nbsp;Structure

<pre><code>frontend/
├── public/
│   └── i18n/            → ca.json, es.json, en.json, ko.json
└── src/app/
    ├── features/
    │   ├── auth/         → Login + Register + onboarding
    │   ├── today/        → Today's routine + step tracker
    │   ├── stock/        → Products + wishlist + reviews
    │   ├── calendar/     → Monthly view + day exceptions
    │   ├── learn/        → Educational articles
    │   └── profile/      → Skin type + concerns
    ├── core/
    │   ├── services/     → HTTP clients to the backend
    │   ├── stores/       → AuthStore (signals)
    │   ├── models/
    │   └── guards/
    └── shared/
        ├── shell/        → App shell (top bar, tab bar)
        └── ui/            → Shared UI, incl. skincare-chat (AI advisor widget)</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/play-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Run locally

<pre><code>npm install
ng serve</code></pre>

> Open `http://localhost:4200` ✨

<br/>

---

## <img src="https://api.iconify.design/ph/hammer-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Build & tests

<pre><code>ng build          # builds to dist/skincareapp/ (index.html at the root, no browser/ subfolder)
ng test           # unit tests with Vitest</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/sliders-horizontal-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;Configuration

`apiUrl` and the Firebase config are defined in `src/environments/environment.ts` (production) and `environment.development.ts` (local `ng serve`).

<br/>

---

## <img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Notable frontend features

* <img src="https://api.iconify.design/ph/chat-circle-dots-fill.svg?color=%23FF6FA8&height=18" height="16"> **AI skincare chat:** a floating widget (`shared/ui/skincare-chat`), available app-wide from the shell, talks to the Groq-powered `/chat/skincare` endpoint.
* <img src="https://api.iconify.design/ph/device-mobile-fill.svg?color=%232FB5AE&height=18" height="16"> **PWA:** installable and offline-ready via `@angular/pwa` — manifest at `public/manifest.webmanifest`, service worker config at `ngsw-config.json`.

<br/>

---

<div align="center">

Part of <a href="../README.md">SkinCareApp</a> — by Carme Medina Canalda

</div>
