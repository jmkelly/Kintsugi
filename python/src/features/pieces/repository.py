
import aiosqlite

from src.features.pieces.piece import Piece


async def get_all_pieces(db: aiosqlite.Connection) -> list[Piece]:
    cursor = await db.execute("SELECT * FROM pieces ORDER BY created_at DESC")
    rows = await cursor.fetchall()
    return [_row_to_piece(r) for r in rows]


async def find_piece_by_id(db: aiosqlite.Connection, piece_id: int) -> Piece | None:
    cursor = await db.execute("SELECT * FROM pieces WHERE id = ?", (piece_id,))
    row = await cursor.fetchone()
    if row is None:
        return None
    return _row_to_piece(row)


async def register_piece(db: aiosqlite.Connection, piece: Piece) -> int:
    cursor = await db.execute("INSERT INTO pieces (title) VALUES (?)", (piece.title,))
    await db.commit()
    return cursor.lastrowid


async def save_piece(db: aiosqlite.Connection, piece: Piece) -> None:
    await db.execute(
        "UPDATE pieces SET title = ?, completed = ? WHERE id = ?",
        (piece.title, int(piece.completed), piece.id),
    )
    await db.commit()


async def remove_piece(db: aiosqlite.Connection, piece_id: int) -> None:
    await db.execute("DELETE FROM pieces WHERE id = ?", (piece_id,))
    await db.commit()


def _row_to_piece(row: aiosqlite.Row) -> Piece:
    return Piece(
        id=row["id"],
        title=row["title"],
        completed=bool(row["completed"]),
        created_at=row["created_at"],
    )
