from fastapi import FastAPI, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.core.database import get_db

app = FastAPI(title="SkinCareApp API")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    tables = db.execute(text("SHOW TABLES")).scalars().all()
    return {"connected": True, "count": len(tables), "tables": tables}