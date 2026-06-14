package pieces

import "database/sql"

func All(db *sql.DB) ([]Piece, error) {
	rows, err := db.Query("SELECT id, title, restored, created_at FROM pieces ORDER BY created_at")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []Piece
	for rows.Next() {
		var p Piece
		if err := rows.Scan(&p.ID, &p.Title, &p.Restored, &p.CreatedAt); err != nil {
			return nil, err
		}
		result = append(result, p)
	}
	return result, rows.Err()
}

func ByID(db *sql.DB, id int64) (*Piece, error) {
	row := db.QueryRow("SELECT id, title, restored, created_at FROM pieces WHERE id = ?", id)
	var p Piece
	if err := row.Scan(&p.ID, &p.Title, &p.Restored, &p.CreatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &p, nil
}

func Insert(db *sql.DB, p Piece) (int64, error) {
	res, err := db.Exec("INSERT INTO pieces (title, restored, created_at) VALUES (?, ?, ?)",
		p.Title, boolToInt(p.Restored), p.CreatedAt)
	if err != nil {
		return 0, err
	}
	return res.LastInsertId()
}

func Delete(db *sql.DB, id int64) error {
	_, err := db.Exec("DELETE FROM pieces WHERE id = ?", id)
	return err
}

func Update(db *sql.DB, p Piece) error {
	_, err := db.Exec("UPDATE pieces SET title = ?, restored = ? WHERE id = ?",
		p.Title, boolToInt(p.Restored), p.ID)
	return err
}

func boolToInt(b bool) int {
	if b {
		return 1
	}
	return 0
}
