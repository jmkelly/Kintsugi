package db

import (
	"database/sql"
	"os"

	_ "modernc.org/sqlite"
)

type Options struct {
	Path          string
	EnsureSchema  bool
}

func Open(opts Options) (*sql.DB, error) {
	path := opts.Path
	if path == "" {
		path = os.Getenv("DB_PATH")
	}
	if path == "" {
		path = "kintsugi.db"
	}

	conn, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, err
	}

	if _, err := conn.Exec("PRAGMA journal_mode=WAL"); err != nil {
		return nil, err
	}

	if opts.EnsureSchema {
		if err := ensureSchema(conn); err != nil {
			return nil, err
		}
	}

	return conn, nil
}

func OpenTest() (*sql.DB, error) {
	conn, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		return nil, err
	}
	if err := ensureSchema(conn); err != nil {
		return nil, err
	}
	return conn, nil
}

func ensureSchema(conn *sql.DB) error {
	_, err := conn.Exec(`
		CREATE TABLE IF NOT EXISTS pieces (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			restored INTEGER NOT NULL DEFAULT 0,
			created_at TEXT NOT NULL
		)
	`)
	return err
}
