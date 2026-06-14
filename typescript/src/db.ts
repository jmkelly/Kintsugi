import Database from "better-sqlite3";

let _db: Database.Database | null = null;

export function getDb(dbPath?: string): Database.Database {
  if (_db) return _db;

  const path = dbPath ?? process.env.DB_PATH ?? "kintsugi.db";
  _db = new Database(path);
  _db.pragma("journal_mode = WAL");
  _db.exec(
    `CREATE TABLE IF NOT EXISTS pieces (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      restored INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )`,
  );

  return _db;
}

export function createTestDb(): Database.Database {
  const db = new Database(":memory:");
  db.exec(
    `CREATE TABLE pieces (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      restored INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )`,
  );
  return db;
}
