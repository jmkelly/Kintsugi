package tests

import (
	"testing"

	"github.com/anomalyco/kintsugi/internal/db"
	"github.com/anomalyco/kintsugi/internal/features/pieces"
)

func TestNewPiece_requires_title(t *testing.T) {
	_, err := pieces.NewPiece("")
	if err == nil {
		t.Fatal("expected error for empty title")
	}
}

func TestNewPiece_creates_piece(t *testing.T) {
	p, err := pieces.NewPiece("Gold repair")
	if err != nil {
		t.Fatal(err)
	}
	if p.Title != "Gold repair" {
		t.Errorf("expected title 'Gold repair', got %q", p.Title)
	}
	if p.Restored {
		t.Error("expected new piece to not be restored")
	}
	if p.CreatedAt == "" {
		t.Error("expected created_at to be set")
	}
}

func TestToggle_changes_restored(t *testing.T) {
	p, err := pieces.NewPiece("Test")
	if err != nil {
		t.Fatal(err)
	}

	p.Toggle()
	if !p.Restored {
		t.Error("expected restored after toggle")
	}

	p.Toggle()
	if p.Restored {
		t.Error("expected not restored after second toggle")
	}
}

func TestRename_updates_title(t *testing.T) {
	p, err := pieces.NewPiece("Old name")
	if err != nil {
		t.Fatal(err)
	}

	if err := p.Rename("New name"); err != nil {
		t.Fatal(err)
	}
	if p.Title != "New name" {
		t.Errorf("expected 'New name', got %q", p.Title)
	}
}

func TestRename_rejects_empty(t *testing.T) {
	p, err := pieces.NewPiece("Name")
	if err != nil {
		t.Fatal(err)
	}

	if err := p.Rename(""); err == nil {
		t.Fatal("expected error for empty title")
	}
}

func TestInsert_and_query(t *testing.T) {
	conn, err := db.OpenTest()
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()

	p, _ := pieces.NewPiece("Test piece")
	id, err := pieces.Insert(conn, p)
	if err != nil {
		t.Fatal(err)
	}
	if id == 0 {
		t.Fatal("expected non-zero id")
	}

	saved, err := pieces.ByID(conn, id)
	if err != nil {
		t.Fatal(err)
	}
	if saved == nil {
		t.Fatal("expected piece to exist")
	}
	if saved.Title != "Test piece" {
		t.Errorf("expected 'Test piece', got %q", saved.Title)
	}
}

func TestAll_returns_in_order(t *testing.T) {
	conn, err := db.OpenTest()
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()

	p1, _ := pieces.NewPiece("A")
	p2, _ := pieces.NewPiece("B")
	pieces.Insert(conn, p1)
	pieces.Insert(conn, p2)

	all, err := pieces.All(conn)
	if err != nil {
		t.Fatal(err)
	}
	if len(all) != 2 {
		t.Fatalf("expected 2 pieces, got %d", len(all))
	}
	if all[0].Title != "A" {
		t.Errorf("expected first piece 'A', got %q", all[0].Title)
	}
}

func TestDelete_removes_piece(t *testing.T) {
	conn, err := db.OpenTest()
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()

	p, _ := pieces.NewPiece("Delete me")
	id, _ := pieces.Insert(conn, p)

	if err := pieces.Delete(conn, id); err != nil {
		t.Fatal(err)
	}

	saved, _ := pieces.ByID(conn, id)
	if saved != nil {
		t.Error("expected piece to be nil after delete")
	}

	all, _ := pieces.All(conn)
	if len(all) != 0 {
		t.Errorf("expected 0 pieces, got %d", len(all))
	}
}
