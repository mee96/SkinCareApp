<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=f4b8d4&height=180&section=header&text=✦%20SKINCARE%20APP%20✦&fontColor=2d1b6e&fontSize=34&desc=your%20personal%20K-beauty%20routine%20tracker&descSize=16&descColor=2d1b6e&descAlignY=65&fontAlignY=42" width="100%" alt="SkinCareApp" />

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

[![Demo](https://img.shields.io/badge/🌐_Live_Demo-f4b8d4?style=flat-square&logoColor=2d1b6e)](https://skincareapp-5h8e.onrender.com)
&nbsp;
[![API Docs](https://img.shields.io/badge/📖_API_Docs-b8e8d4?style=flat-square&logoColor=2d1b6e)](https://skincareapp-api.onrender.com/docs)
&nbsp;
[![Issues](https://img.shields.io/badge/🐛_Issues-a8c4f0?style=flat-square&logoColor=2d1b6e)](https://github.com/mee96/SkinCareApp/issues)
[![Keep Alive Active](https://img.shields.io/badge/Keep--Alive-Active-b8e8d4?style=flat-square&logo=githubactions&logoColor=2d1b6e)](https://github.com/mee96/keep-alive)

</div>

<br/>

---

## <img src="https://api.iconify.design/ph/question-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;What is this?

**SkinCareApp** is a full-stack project to organize and follow a personal **K-beauty skincare routine**: what to apply each day, which products you have in stock, what you'd like to buy next, and how each product worked out for you.

Built as a **monorepo** combining an **Angular** frontend (standalone components, signals, `OnPush`) with a **FastAPI** backend, a **MySQL** database on Aiven Cloud, **Firebase** authentication, and **Groq AI** for product recognition and routine assistance.

<br/>

---

## <img src="https://api.iconify.design/ph/stack-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Technology Stack

| Layer | Technology |
| :--- | :--- |
| <img src="https://api.iconify.design/ph/desktop-tower-fill.svg?color=%23FF6FA8&height=18" height="16"> **Frontend** | Angular 21 · standalone components · signals · `OnPush` · Lucide icons |
| <img src="https://api.iconify.design/ph/cpu-fill.svg?color=%23B372CF&height=18" height="16"> **Backend** | FastAPI · Python · SQLAlchemy |
| <img src="https://api.iconify.design/ph/database-fill.svg?color=%235B9BD5&height=18" height="16"> **Database** | MySQL · Aiven Cloud |
| <img src="https://api.iconify.design/ph/key-fill.svg?color=%232FB5AE&height=18" height="16"> **Auth** | Firebase Authentication (Email + Google) |
| <img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%23E0A63B&height=18" height="16"> **AI** | Groq (product scan, classification, ingredient check) |
| <img src="https://api.iconify.design/ph/translate-fill.svg?color=%23FF6FA8&height=18" height="16"> **i18n** | ngx-translate · CA / ES / EN / 한국어 |
| <img src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%23E0A63B&height=18" height="16"> **Deploy** | Render (Frontend + Backend) · Keep-Alive against cold starts |

<br/>

---

## <img src="https://api.iconify.design/ph/code-bold.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Main Endpoints

### <img src="https://api.iconify.design/ph/package-fill.svg?color=%23E0A63B&height=20" height="18"> Products & Stock
<pre><code>GET    /products/                → List products (by user)
POST   /products/                → Add product
PATCH  /products/{id}            → Update product
DELETE /products/{id}            → Delete product
POST   /products/scan-image      → AI: recognize product from photo
POST   /products/classify        → AI: classify product into a routine slot
POST   /products/check-ingredients → AI: check suitability for skin profile</code></pre>

### <img src="https://api.iconify.design/ph/calendar-fill.svg?color=%23FF6FA8&height=20" height="18"> Schedule & Calendar
<pre><code>GET    /schedule/         → Routine type by date range
POST   /schedule/         → Assign routine type to a day (upsert)
DELETE /schedule/{id}     → Remove a scheduled day
GET    /exceptions/       → Day exceptions (notes) by date range
POST   /exceptions/       → Add/edit a day note (upsert)
DELETE /exceptions/{id}   → Remove a day note</code></pre>

### <img src="https://api.iconify.design/ph/heart-fill.svg?color=%23B372CF&height=20" height="18"> Wishlist & Reviews
<pre><code>GET    /wishlist/          → Wishlist items by user
POST   /wishlist/          → Add item to wishlist
DELETE /wishlist/{id}      → Remove item from wishlist
POST   /reviews/           → Save a product review (upsert)
GET    /reviews/{id}       → Get review for a product</code></pre>

### <img src="https://api.iconify.design/ph/user-fill.svg?color=%232FB5AE&height=20" height="18"> Users & Catalog
<pre><code>POST   /users/             → Register (onboarding)
GET    /users/{uid}        → Profile by Firebase UID
PATCH  /users/{uid}        → Update profile
GET    /catalog/slots      → Routine slots
GET    /catalog/types      → Routine types (R/C/H/P)
GET    /catalog/ingredients → Ingredient info</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/folder-fill.svg?color=%232FB5AE&height=24" height="22"> &nbsp;Project Structure

<pre><code>SkinCareApp/
├── 🐍 backend/
│   └── app/
│       ├── main.py
│       ├── models/
│       ├── schemas/
│       ├── routers/
│       │   ├── product.py       → CRUD + AI scan/classify/check
│       │   ├── schedule.py      → Routine type per day
│       │   ├── day_exception.py → Day notes/exceptions
│       │   ├── wishlist.py
│       │   ├── product_review.py
│       │   ├── user.py
│       │   └── catalog.py
│       ├── services/
│       │   └── groq_service.py  → AI integration
│       └── core/
│
└── 🅰️ frontend/
    └── src/app/
        ├── features/
        │   ├── auth/       → Login + Register + onboarding
        │   ├── today/      → Today's routine + step tracker
        │   ├── stock/      → Products + wishlist + reviews
        │   ├── calendar/   → Monthly view + day exceptions
        │   ├── learn/      → Educational articles
        │   └── profile/    → Skin type + concerns
        ├── core/
        │   ├── services/
        │   ├── stores/     → AuthStore (signals)
        │   └── guards/
        └── shared/</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/play-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Run Locally

### Backend
<pre><code>cd backend
pip install -r requirements.txt
cp .env.example .env    # Fill in the credentials
uvicorn app.main:app --reload</code></pre>
> ⚡ **Availability:** The backend stays active without *cold starts* thanks to an automatic ping from [Keep-Alive](https://github.com/mee96/keep-alive).
>
### Frontend
<pre><code>cd frontend
npm install
ng serve</code></pre>

> Open `http://localhost:4200` ✨

<br/>

---

## <img src="https://api.iconify.design/ph/sliders-horizontal-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;Environment Variables

Create a `.env` file in the `backend/` directory:

<pre><code>DB_HOST=...
DB_PORT=...
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
GROQ_API_KEY=...</code></pre>

*For **Firebase Auth** on the frontend, add your Firebase project config to the environment files.*

<br/>

---

## <img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Key Features

* <img src="https://api.iconify.design/ph/sign-in-fill.svg?color=%23FF6FA8&height=18" height="16"> **Login / Register with onboarding:** Firebase Auth (email + Google), skin type and concerns setup.
* <img src="https://api.iconify.design/ph/sun-fill.svg?color=%23E0A63B&height=18" height="16"> **Today:** Today's routine with a step-by-step checklist toggle.
* <img src="https://api.iconify.design/ph/package-fill.svg?color=%23B372CF&height=18" height="16"> **Stock:** Add products manually or by photo + AI, wishlist, and star reviews.
* <img src="https://api.iconify.design/ph/calendar-fill.svg?color=%232FB5AE&height=18" height="16"> **Calendar:** Routine type per day, day exceptions with notes, current day highlighted.
* <img src="https://api.iconify.design/ph/book-open-fill.svg?color=%235B9BD5&height=18" height="16"> **Learn:** 4 educational articles, available in 4 languages.
* <img src="https://api.iconify.design/ph/user-circle-fill.svg?color=%23FF6FA8&height=18" height="16"> **Profile:** Skin type, concerns, logout.
* <img src="https://api.iconify.design/ph/translate-fill.svg?color=%23E0A63B&height=18" height="16"> **Full i18n:** Catalan, Spanish, English, and 한국어.
* <img src="https://api.iconify.design/ph/lightning-fill.svg?color=%23B372CF&height=18" height="16"> **Keep-Alive:** Automatic ping system to avoid Render cold starts.

<br/>

---

<div align="center">

<b>made with 🌸 for the love of 🌸</b>

<br/><br/>

Developed by **Carme Medina Canalda**<br/>
*Full Stack Developer · Barcelona*

*"If the architecture is right, everything will fit"*

<br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-a8c4f0?style=flat-square&logo=linkedin&logoColor=2d1b6e)](https://www.linkedin.com/in/carme-medina-canalda-250457132/)
[![GitHub](https://img.shields.io/badge/GitHub-c5b9f0?style=flat-square&logo=github&logoColor=2d1b6e)](https://github.com/mee96)

</div>
