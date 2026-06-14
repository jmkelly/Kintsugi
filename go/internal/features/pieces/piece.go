package pieces

import (
	"fmt"
	"time"
)

type Piece struct {
	ID        int64
	Title     string
	Restored  bool
	CreatedAt string
}

func NewPiece(title string) (Piece, error) {
	if title == "" {
		return Piece{}, fmt.Errorf("title is required")
	}
	return Piece{
		Title:     title,
		Restored:  false,
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
	}, nil
}

func (p *Piece) Toggle() {
	p.Restored = !p.Restored
}

func (p *Piece) Rename(title string) error {
	if title == "" {
		return fmt.Errorf("title is required")
	}
	p.Title = title
	return nil
}
