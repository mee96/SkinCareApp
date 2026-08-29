<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=f4b8d4&height=180&section=header&text=✦%20SkinCareApp%20✦&fontColor=2d1b6e&fontSize=34&desc=tu%20tracker%20personal%20de%20rutina%20de%20skincare&descSize=16&descColor=2d1b6e&descAlignY=65&fontAlignY=42" width="100%" alt="SkinCareApp" />

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

[![Demo](https://img.shields.io/badge/🌐_Demo_en_vivo-f4b8d4?style=flat-square&logoColor=2d1b6e)](https://skincareapp-5h8e.onrender.com)
&nbsp;
[![API Docs](https://img.shields.io/badge/📖_API_Docs-b8e8d4?style=flat-square&logoColor=2d1b6e)](https://skincareapp-api.onrender.com/docs)
&nbsp;
[![Issues](https://img.shields.io/badge/🐛_Issues-a8c4f0?style=flat-square&logoColor=2d1b6e)](https://github.com/mee96/SkinCareApp/issues)
[![Keep Alive Active](https://img.shields.io/badge/Keep--Alive-Active-b8e8d4?style=flat-square&logo=githubactions&logoColor=2d1b6e)](https://github.com/mee96/keep-alive)

</div>

<br/>

---

## <img src="https://api.iconify.design/ph/question-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;¿Qué es esto?

**SkinCareApp** es un proyecto full-stack para organizar y seguir una rutina personal de **skincare K-beauty**: qué aplicar cada día, qué productos tienes en stock, qué te gustaría comprar y qué tal te ha ido cada producto.

Construido como un **monorepo** que combina un frontend en **Angular** (componentes standalone, signals, `OnPush`) con un backend en **FastAPI**, una base de datos **MySQL** en Aiven Cloud, autenticación con **Firebase** e IA de **Groq** para el reconocimiento de productos y la asistencia en la rutina.

<br/>

---

## <img src="https://api.iconify.design/ph/stack-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| <img src="https://api.iconify.design/ph/desktop-tower-fill.svg?color=%23FF6FA8&height=18" height="16"> **Frontend** | Angular 21 · componentes standalone · signals · `OnPush` · iconos Lucide |
| <img src="https://api.iconify.design/ph/cpu-fill.svg?color=%23B372CF&height=18" height="16"> **Backend** | FastAPI · Python · SQLAlchemy |
| <img src="https://api.iconify.design/ph/database-fill.svg?color=%235B9BD5&height=18" height="16"> **Base de datos** | MySQL · Aiven Cloud |
| <img src="https://api.iconify.design/ph/key-fill.svg?color=%232FB5AE&height=18" height="16"> **Autenticación** | Firebase Authentication (Email + Google) |
| <img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%23E0A63B&height=18" height="16"> **IA** | Groq (escaneo de productos, clasificación, análisis de ingredientes) |
| <img src="https://api.iconify.design/ph/translate-fill.svg?color=%23FF6FA8&height=18" height="16"> **i18n** | ngx-translate · CA / ES / EN / 한국어 |
| <img src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%23E0A63B&height=18" height="16"> **Deploy** | Render (Frontend + Backend) · Keep-Alive contra cold starts |

<br/>

---

## <img src="https://api.iconify.design/ph/code-bold.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Endpoints principales

### <img src="https://api.iconify.design/ph/package-fill.svg?color=%23E0A63B&height=20" height="18"> Productos y Stock
<pre><code>GET    /products/                → Lista de productos (por usuario)
POST   /products/                → Añadir producto
PATCH  /products/{id}            → Actualizar producto
DELETE /products/{id}            → Eliminar producto
POST   /products/scan-image      → IA: reconocer producto por foto
POST   /products/classify        → IA: clasificar producto en un slot de la rutina
POST   /products/check-ingredients → IA: comprobar idoneidad para el perfil de piel</code></pre>

### <img src="https://api.iconify.design/ph/calendar-fill.svg?color=%23FF6FA8&height=20" height="18"> Calendario y Rutina
<pre><code>GET    /schedule/         → Tipo de rutina por rango de fechas
POST   /schedule/         → Asignar tipo de rutina a un día (upsert)
DELETE /schedule/{id}     → Eliminar un día programado
GET    /exceptions/       → Excepciones/notas del día por rango de fechas
POST   /exceptions/       → Añadir/editar nota de un día (upsert)
DELETE /exceptions/{id}   → Eliminar nota de un día</code></pre>

### <img src="https://api.iconify.design/ph/heart-fill.svg?color=%23B372CF&height=20" height="18"> Wishlist y Reviews
<pre><code>GET    /wishlist/          → Items de la wishlist por usuario
POST   /wishlist/          → Añadir producto a la wishlist
DELETE /wishlist/{id}      → Eliminar producto de la wishlist
POST   /reviews/           → Guardar review de un producto (upsert)
GET    /reviews/{id}       → Obtener review de un producto</code></pre>

### <img src="https://api.iconify.design/ph/user-fill.svg?color=%232FB5AE&height=20" height="18"> Usuarios y Catálogo
<pre><code>POST   /users/             → Registro (onboarding)
GET    /users/{uid}        → Perfil por UID de Firebase
PATCH  /users/{uid}        → Actualizar perfil
GET    /catalog/slots      → Slots de la rutina
GET    /catalog/types      → Tipos de rutina (R/C/H/P)
GET    /catalog/ingredients → Información de ingredientes</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/folder-fill.svg?color=%232FB5AE&height=24" height="22"> &nbsp;Estructura del proyecto

<pre><code>SkinCareApp/
├── 🐍 backend/
│   └── app/
│       ├── main.py
│       ├── models/
│       ├── schemas/
│       ├── routers/
│       │   ├── product.py       → CRUD + escaneo/clasificación/análisis IA
│       │   ├── schedule.py      → Tipo de rutina por día
│       │   ├── day_exception.py → Notas/excepciones del día
│       │   ├── wishlist.py
│       │   ├── product_review.py
│       │   ├── user.py
│       │   └── catalog.py
│       ├── services/
│       │   └── groq_service.py  → Integración con IA
│       └── core/
│
└── 🅰️ frontend/
    └── src/app/
        ├── features/
        │   ├── auth/       → Login + Registro + onboarding
        │   ├── today/      → Rutina de hoy + tracker de pasos
        │   ├── stock/      → Productos + wishlist + reviews
        │   ├── calendar/   → Vista mensual + excepciones del día
        │   ├── learn/      → Artículos educativos
        │   └── profile/    → Tipo de piel + preocupaciones
        ├── core/
        │   ├── services/
        │   ├── stores/     → AuthStore (signals)
        │   └── guards/
        └── shared/</code></pre>

<br/>

---

## <img src="https://api.iconify.design/ph/play-fill.svg?color=%23B372CF&height=24" height="22"> &nbsp;Cómo ejecutar en local

### Backend
<pre><code>cd backend
pip install -r requirements.txt
cp .env.example .env    # Completa las credenciales
uvicorn app.main:app --reload</code></pre>
> ⚡ **Disponibilidad:** El backend se mantiene activo sin *cold starts* gracias a un ping automático de [Keep-Alive](https://github.com/mee96/keep-alive).
>
### Frontend
<pre><code>cd frontend
npm install
ng serve</code></pre>

> Accede a `http://localhost:4200` ✨

<br/>

---

## <img src="https://api.iconify.design/ph/sliders-horizontal-fill.svg?color=%23FF6FA8&height=24" height="22"> &nbsp;Variables de entorno

Crea un archivo `.env` en el directorio `backend/`:

<pre><code>DB_HOST=...
DB_PORT=...
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
GROQ_API_KEY=...</code></pre>

*Para **Firebase Auth** en el frontend, añade la configuración de tu proyecto de Firebase a los ficheros de entorno.*

<br/>

---

## <img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%235B9BD5&height=24" height="22"> &nbsp;Características principales

* <img src="https://api.iconify.design/ph/sign-in-fill.svg?color=%23FF6FA8&height=18" height="16"> **Login / Registro con onboarding:** Firebase Auth (email + Google), configuración del tipo de piel y preocupaciones.
* <img src="https://api.iconify.design/ph/sun-fill.svg?color=%23E0A63B&height=18" height="16"> **Hoy:** Rutina del día con checklist de pasos.
* <img src="https://api.iconify.design/ph/package-fill.svg?color=%23B372CF&height=18" height="16"> **Stock:** Añade productos manualmente o con foto + IA, wishlist y reviews con estrellas.
* <img src="https://api.iconify.design/ph/calendar-fill.svg?color=%232FB5AE&height=18" height="16"> **Calendario:** Tipo de rutina por día, excepciones con notas, día actual destacado.
* <img src="https://api.iconify.design/ph/book-open-fill.svg?color=%235B9BD5&height=18" height="16"> **Aprender:** 4 artículos educativos, disponibles en 4 idiomas.
* <img src="https://api.iconify.design/ph/user-circle-fill.svg?color=%23FF6FA8&height=18" height="16"> **Perfil:** Tipo de piel, preocupaciones, logout.
* <img src="https://api.iconify.design/ph/translate-fill.svg?color=%23E0A63B&height=18" height="16"> **i18n completo:** Catalán, castellano, inglés y 한국어.
* <img src="https://api.iconify.design/ph/lightning-fill.svg?color=%23B372CF&height=18" height="16"> **Keep-Alive:** Sistema de ping automático para evitar cold starts en Render.

<br/>

---

<div align="center">

Hecha porque no recordaba qué productos tenía, compraba duplicados y no sabía en qué orden aplicarlos. Si tú también eres un desastre con el skincare — esta app es para ti. 🌸

<br/><br/>

Desarrollado por **Carme Medina Canalda**<br/>
*Full Stack Developer · Barcelona*

<br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-a8c4f0?style=flat-square&logo=linkedin&logoColor=2d1b6e)](https://www.linkedin.com/in/carme-medina-canalda-250457132/)
[![GitHub](https://img.shields.io/badge/GitHub-c5b9f0?style=flat-square&logo=github&logoColor=2d1b6e)](https://github.com/mee96)

</div>
