from collections.abc import AsyncGenerator
from pathlib import Path

import aiosqlite
import pytest
from httpx import ASGITransport, AsyncClient

from src.db import DB_PATH


@pytest.fixture(autouse=True)
async def fresh_db():
    if Path(DB_PATH).exists():
        Path(DB_PATH).unlink()
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE pieces (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            )
        """)
        await db.commit()
    yield
    if Path(DB_PATH).exists():
        Path(DB_PATH).unlink()


@pytest.fixture
async def client() -> AsyncGenerator[AsyncClient, None]:
    from src.main import app

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
