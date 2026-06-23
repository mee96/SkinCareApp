from fastapi import FastAPI, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.routers import user, product, concern

app = FastAPI(title="SkinCareApp API")

app.include_router(user.router)
app.include_router(product.router)
app.include_router(concern.router)

@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    tables = db.execute(text("SHOW TABLES")).scalars().all()
    return {"connected": True, "count": len(tables), "tables": tables}