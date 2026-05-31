import type Database from "better-sqlite3";
import { Item, type ItemRow } from "./Item.ts";

function toItem(row: ItemRow): Item {
  return new Item(row.id, row.title, row.is_complete === 1, new Date(row.created_at));
}

export type Db = Database.Database;

export async function getAllItems(db: Db): Promise<Item[]> {
  const rows = db
    .prepare("SELECT id, title, is_complete, created_at FROM items ORDER BY created_at ASC")
    .all() as ItemRow[];
  return rows.map(toItem);
}

export async function findItemById(db: Db, id: number): Promise<Item | null> {
  const row = db
    .prepare("SELECT id, title, is_complete, created_at FROM items WHERE id = ?")
    .get(id) as ItemRow | undefined;
  return row ? toItem(row) : null;
}

export async function createItem(db: Db, title: string): Promise<Item> {
  const item = Item.create(title);
  const info = db
    .prepare(
      "INSERT INTO items (title, is_complete, created_at) VALUES (?, ?, ?)",
    )
    .run(item.title, item.isComplete ? 1 : 0, item.createdAt.toISOString());
  return new Item(
    Number(info.lastInsertRowid),
    item.title,
    item.isComplete,
    item.createdAt,
  );
}

export async function updateItem(db: Db, item: Item): Promise<void> {
  db.prepare("UPDATE items SET title = ?, is_complete = ? WHERE id = ?").run(
    item.title,
    item.isComplete ? 1 : 0,
    item.id,
  );
}

export async function deleteItem(db: Db, id: number): Promise<void> {
  db.prepare("DELETE FROM items WHERE id = ?").run(id);
}
