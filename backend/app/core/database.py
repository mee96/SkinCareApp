import tempfile

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

DATABASE_URL = (
    f"mysql+pymysql://{settings.DB_USER}:{settings.DB_PASSWORD}"
    f"@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
)


def _resolve_ssl_ca() -> str:
    # A Render passem el certificat per variable d'entorn: l'escrivim a un
    # fitxer temporal i en retornem la ruta. En local fem servir el ca.pem.
    if settings.DB_SSL_CA_CONTENT:
        tmp = tempfile.NamedTemporaryFile(
            mode="w", suffix=".pem", delete=False
        )
        tmp.write(settings.DB_SSL_CA_CONTENT)
        tmp.close()
        return tmp.name
    return settings.DB_SSL_CA


engine = create_engine(
    DATABASE_URL,
    connect_args={"ssl": {"ca": _resolve_ssl_ca()}},  # Aiven exigeix SSL
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()