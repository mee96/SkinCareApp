<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=f4b8d4&height=180&section=header&text=✦%20SKINCARE%20APP%20✦&fontColor=2d1b6e&fontSize=34&desc=la%20teva%20rutina%20personal%20de%20K-beauty&descSize=16&descColor=2d1b6e&descAlignY=65&fontAlignY=42" width="100%" alt="SkinCareApp" />

<br/>

<div align="center">
<a href="https://github.com/mee96/SkinCareApp/blob/main/README.md"><img src="https://img.shields.io/badge/English-1b2e4b?style=flat-square" alt="English"></a>
<a href="https://github.com/mee96/SkinCareApp/blob/main/README.es.md"><img src="https://img.shields.io/badge/Espa%C3%B1ol-a8c4f0?style=flat-square&logoColor=1b2e4b" alt="Español"></a>
<a href="https://github.com/mee96/SkinCareApp/blob/main/README.ca.md"><img src="https://img.shields.io/badge/Català-f4b8d4?style=flat-square&logoColor=2d1b6e" alt="Català"></a>
</div>

<br/>

![Python](https://img.shields.io/badge/Python-FastAPI-c5b9f0?style=for-the-badge&logo=python&logoColor=2d1b6e)
![Angular](https://img.shields.io/badge/Angular-21-a8c4f0?style=for-the-badge&logo=angular&logoColor=2d1b6e)
![MySQL](https://img.shields.io/badge/MySQL-Aiven-b8e8d4?style=for-the-badge&logo=mysql&logoColor=2d1b6e)
![Firebase](https://img.shields.io/badge/Firebase-Auth-f0e4a0?style=for-the-badge&logo=firebase&logoColor=2d1b6e)
![Groq](https://img.shields.io/badge/Groq-AI-c5b9f0?style=for-the-badge&logo=lightning&logoColor=2d1b6e)

<br/>

[![Demo](https://img.shields.io/badge/🌐_Demo_en_viu-f4b8d4?style=flat-square&logoColor=2d1b6e)](https://skincareapp-5h8e.onrender.com)
&nbsp;
[![API Docs](https://img.shields.io/badge/📖_API_Docs-b8e8d4?style=flat-square&logoColor=2d1b6e)](https://skincareapp-api.onrender.com/docs)
&nbsp;
[![Issues](https://img.shields.io/badge/🐛_Issues-a8c4f0?style=flat-square&logoColor=2d1b6e)](https://github.com/mee96/SkinCareApp/issues)
[![Keep Alive Active](https://img.shields.io/badge/Keep--Alive-Active-b8e8d4?style=flat-square&logo=githubactions&logoColor=2d1b6e)](https://github.com/mee96/keep-alive)

</div>

<br/>

---

## <img src="https://api.iconify.design/ph/question-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;Què és això?

**SkinCareApp** és un projecte full-stack per organitzar i seguir una rutina personal de **skincare K-beauty**: què aplicar cada dia, quins productes tens en stock, què t'agradaria comprar i com t'ha anat cada producte.

Construït com a **monorepo** que combina un frontend en **Angular** (components standalone, signals, `OnPush`) amb un backend en **FastAPI**, una base de dades **MySQL** a Aiven Cloud, autenticació amb **Firebase** i IA de **Groq** per al reconeixement de productes i l'assistència a la rutina.

<br/>

---

## <img src="https://api.iconify.design/ph/stack-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Stack Tecnològic

| Capa | Tecnologia |
| :--- | :--- |
| <img src="https://api.iconify.design/ph/desktop-tower-fill.svg?color=%23FF6FA8&height=18" height="16"> **Frontend** | Angular 21 · components standalone · signals · `OnPush` · icones Lucide |
| <img src="https://api.iconify.design/ph/cpu-fill.svg?color=%23B372CF&height=18" height="16"> **Backend** | FastAPI · Python · SQLAlchemy |
| <img src="https://api.iconify.design/ph/database-fill.svg?color=%235B9BD5&height=18" height="16"> **Base de dades** | MySQL · Aiven Cloud |
| <img src="https://api.iconify.design/ph/key-fill.svg?color=%232FB5AE&height=18" height="16"> **Autenticació** | Firebase Authentication (Email + Google) |
| <img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%23E0A63B&height=18" height="16"> **IA** | Groq (escaneig de productes, classificació, anàlisi d'ingredients) |
| <img src="https://api.iconify.design/ph/translate-fill.svg?color=%23FF6FA8&height=18" height="16"> **i18n** | ngx-translate · CA / ES / EN / 한국어 |
| <img src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%23E0A63B&height=18" height="16"> **Deploy** | Render (Frontend + Backend) · Keep-Alive contra cold starts |

<br/>

---

## <img src="https://api.iconify.design/ph/code-bold.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Endpoints principals

### <img src="https://api.iconify.design/ph/package-fill.svg?color=%23E0A63B&height=20" height="18"> Productes i Stock
<pre><code>GET    /products/                → Llista de productes (per usuari)
POST   /products/                → Afegir producte
PATCH  /products/{id}            → Actualitzar producte
DELETE /products/{id}            → Esborrar producte
POST   /products/scan-image      → IA: reconèixer producte per foto
POST   /products/classify        → IA: classificar producte en un slot de la rutina
POST   /products/check-ingredients → IA: comprovar idoneïtat per al perfil de pell</code></pre>

### <img src="https://api.iconify.design/ph/calendar-fill.svg?color=%23FF6FA8&height=20" height="18"> Calendari i Rutina
<pre><code>GET    /schedule/         → Tipus de rutina per rang de dates
POST   /schedule/         → Assignar tipus de rutina a un dia (upsert)
DELETE /schedule/{id}     → Esborrar un dia programat
GET    /exceptions/       → Excepcions/notes del dia per rang de dates
POST   /exceptions/       → Afegir/editar nota d'un dia (upsert)
DELETE /exceptions/{id}   → Esborrar nota d'un dia</code></pre>

### <img src="https://api.iconify.design/ph/heart-fill.svg?color=%23B372CF&height=20" height="18"> Wishlist i Reviews
<pre><code>GET    /wishlist/          → Items de la wishlist per usuari
POST   /wishlist/          → Afegir producte a la wishlist
DELETE /wishlist/{id}      → Esborrar producte de la wishlist
POST   /reviews/           → Desar review d'un producte (upsert)
GET    /reviews/{id}       → Obtenir review d'un producte</code></pre>

### <img src="https://api.iconify.design/ph/user-fill.svg?color=%232FB5AE&height=20" height="18"> Usuaris i Catàleg
<pre><code>POST   /users/             → Registre (onboarding)
GET    /users/{uid}        → Perfil per UID de Firebase
PATCH  /users/{uid}        → Actualitzar perfil
GET    /catalog/slots      → Slots de la rutina
GET    /catalog/types      → Tipus de rutina (R/C/H/P)
GET    /catalog/ingredients → Informació d'ingredients</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/folder-fill.svg?color=%232FB5AE&height=24" height="22"> &nbsp;Estructura del projecte

<pre><code>SkinCareApp/
├── 🐍 backend/
│   └── app/
│       ├── main.py
│       ├── models/
│       ├── schemas/
│       ├── routers/
│       │   ├── product.py       → CRUD + escaneig/classificació/anàlisi IA
│       │   ├── schedule.py      → Tipus de rutina per dia
│       │   ├── day_exception.py → Notes/excepcions del dia
│       │   ├── wishlist.py
│       │   ├── product_review.py
│       │   ├── user.py
│       │   └── catalog.py
│       ├── services/
│       │   └── groq_service.py  → Integració amb IA
│       └── core/
│
└── 🅰️ frontend/
    └── src/app/
        ├── features/
        │   ├── auth/       → Login + Registre + onboarding
        │   ├── today/      → Rutina d'avui + tracker de passos
        │   ├── stock/      → Productes + wishlist + reviews
        │   ├── calendar/   → Vista mensual + excepcions del dia
        │   ├── learn/      → Articles educatius
        │   └── profile/    → Tipus de pell + preocupacions
        ├── core/
        │   ├── services/
        │   ├── stores/     → AuthStore (signals)
        │   └── guards/
        └── shared/</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/play-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Com arrencar en local

### Backend
<pre><code>cd backend
pip install -r requirements.txt
cp .env.example .env    # Omple les credencials
uvicorn app.main:app --reload</code></pre>
> ⚡ **Disponibilitat:** El backend es manté actiu sense *cold starts* gràcies a un ping automàtic de [Keep-Alive](https://github.com/mee96/keep-alive).
>
### Frontend
<pre><code>cd frontend
npm install
ng serve</code></pre>

> Accedeix a `http://localhost:4200` ✨

<br/>

---

## <img src="https://api.iconify.design/ph/sliders-horizontal-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;Variables d'entorn

Crea un fitxer `.env` al directori `backend/`:

<pre><code>DB_HOST=...
DB_PORT=...
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
GROQ_API_KEY=...</code></pre>

*Per a **Firebase Auth** al frontend, afegeix la configuració del teu projecte de Firebase als fitxers d'entorn.*

<br/>

---

## <img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Característiques principals

* <img src="https://api.iconify.design/ph/sign-in-fill.svg?color=%23FF6FA8&height=18" height="16"> **Login / Registre amb onboarding:** Firebase Auth (email + Google), configuració del tipus de pell i preocupacions.
* <img src="https://api.iconify.design/ph/sun-fill.svg?color=%23E0A63B&height=18" height="16"> **Avui:** Rutina del dia amb checklist de passos.
* <img src="https://api.iconify.design/ph/package-fill.svg?color=%23B372CF&height=18" height="16"> **Stock:** Afegeix productes manualment o amb foto + IA, wishlist i reviews amb estrelles.
* <img src="https://api.iconify.design/ph/calendar-fill.svg?color=%232FB5AE&height=18" height="16"> **Calendari:** Tipus de rutina per dia, excepcions amb notes, dia actual destacat.
* <img src="https://api.iconify.design/ph/book-open-fill.svg?color=%235B9BD5&height=18" height="16"> **Aprendre:** 4 articles educatius, disponibles en 4 idiomes.
* <img src="https://api.iconify.design/ph/user-circle-fill.svg?color=%23FF6FA8&height=18" height="16"> **Perfil:** Tipus de pell, preocupacions, logout.
* <img src="https://api.iconify.design/ph/translate-fill.svg?color=%23E0A63B&height=18" height="16"> **i18n complet:** Català, castellà, anglès i 한국어.
* <img src="https://api.iconify.design/ph/lightning-fill.svg?color=%23B372CF&height=18" height="16"> **Keep-Alive:** Sistema de ping automàtic per evitar cold starts a Render.

<br/>

---

<div align="center">

<b>fet amb 🌸 per amor als 🌸</b>

<br/><br/>

Desenvolupat per **Carme Medina Canalda**<br/>
*Full Stack Developer · Barcelona*

*"Si l'arquitectura és correcta, tot encaixarà"*

<br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-a8c4f0?style=flat-square&logo=linkedin&logoColor=2d1b6e)](https://www.linkedin.com/in/carme-medina-canalda-250457132/)
[![GitHub](https://img.shields.io/badge/GitHub-c5b9f0?style=flat-square&logo=github&logoColor=2d1b6e)](https://github.com/mee96)

</div>
