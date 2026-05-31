import Database from "better-sqlite3";

let _db: Database.Database | null = null;

export function getDb(dbPath = "kintsugi.db"): Database.Database {
  if (_db) return _db;

  _db = new Database(dbPath);
  _db.pragma("journal_mode = WAL");
  _db.exec(
    `CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      is_complete INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )`,
  );

  return _db;
}

export function createTestDb(): Database.Database {
  const db = new Database(":memory:");
  db.exec(
    `CREATE TABLE items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      is_complete INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )`,
  );
  return db;
}
