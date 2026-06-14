import type Database from "better-sqlite3";
import { Piece, type PieceRow } from "./Piece.js";

function toPiece(row: PieceRow): Piece {
  return new Piece(row.id, row.title, row.restored === 1, new Date(row.created_at));
}

export type Db = Database.Database;

export async function getAllPieces(db: Db): Promise<Piece[]> {
  const rows = db
    .prepare("SELECT id, title, restored, created_at FROM pieces ORDER BY created_at ASC")
    .all() as PieceRow[];
  return rows.map(toPiece);
}

export async function findPieceById(db: Db, id: number): Promise<Piece | null> {
  const row = db
    .prepare("SELECT id, title, restored, created_at FROM pieces WHERE id = ?")
    .get(id) as PieceRow | undefined;
  return row ? toPiece(row) : null;
}

export async function registerPiece(db: Db, title: string): Promise<Piece> {
  const piece = Piece.describe(title);
  const info = db
    .prepare(
      "INSERT INTO pieces (title, restored, created_at) VALUES (?, ?, ?)",
    )
    .run(piece.title, piece.restored ? 1 : 0, piece.createdAt.toISOString());
  return new Piece(
    Number(info.lastInsertRowid),
    piece.title,
    piece.restored,
    piece.createdAt,
  );
}

export async function savePiece(db: Db, piece: Piece): Promise<void> {
  db.prepare("UPDATE pieces SET title = ?, restored = ? WHERE id = ?").run(
    piece.title,
    piece.restored ? 1 : 0,
    piece.id,
  );
}

export async function removePiece(db: Db, id: number): Promise<void> {
  db.prepare("DELETE FROM pieces WHERE id = ?").run(id);
}
