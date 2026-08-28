


from fastapi import FastAPI, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.core.database import get_db
import app.models  # registra tots els models SQLAlchemy (evita NoReferencedTableError)
from app.routers import user, product, concern, schedule, routine_step_def, step_log, catalog, wishlist, product_review, day_exception
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SkinCareApp API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",                     # Angular en local
        "https://skincareapp-frontend.onrender.com",  # quan despleguis el front (canvia-ho pel real)
        "https://skincareapp-5h8e.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(product.router)
app.include_router(concern.router)
app.include_router(schedule.router)
app.include_router(routine_step_def.router)
app.include_router(step_log.router)
app.include_router(catalog.router)
app.include_router(wishlist.router)
app.include_router(product_review.router)
app.include_router(day_exception.router)



@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    tables = db.execute(text("SHOW TABLES")).scalars().all()
    return {"connected": True, "count": len(tables), "tables": tables}