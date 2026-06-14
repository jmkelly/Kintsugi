from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from src.db import init_db
from src.features.error.router import router as error_router
from src.features.home.router import router as home_router
from src.features.pieces.router import router as pieces_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="Kintsugi", lifespan=lifespan)

app.mount("/static", StaticFiles(directory=Path(__file__).parent / "public"), name="static")

app.include_router(home_router)
app.include_router(pieces_router, prefix="/pieces")
app.include_router(error_router)
