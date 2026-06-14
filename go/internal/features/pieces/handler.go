package pieces

import (
	"database/sql"
	"html/template"
	"log"
	"net/http"
	"strconv"
)

type PageData struct {
	Pieces []Piece
}

type Handler struct {
	templates *template.Template
	db        *sql.DB
}

func NewHandler(templates *template.Template, db *sql.DB) *Handler {
	return &Handler{templates: templates, db: db}
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		h.list(w, r)
	case "POST":
		h.handlePost(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *Handler) list(w http.ResponseWriter, r *http.Request) {
	pieces, err := All(h.db)
	if err != nil {
		log.Printf("list pieces: %v", err)
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}

	if pieces == nil {
		pieces = []Piece{}
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if err := h.templates.ExecuteTemplate(w, "features/pieces/index.html", PageData{Pieces: pieces}); err != nil {
		log.Printf("render list: %v", err)
	}
}

func (h *Handler) handlePost(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	switch r.URL.Path {
	case "/pieces/register":
		h.register(w, r)
	case "/pieces/restore":
		h.restore(w, r)
	case "/pieces/remove":
		h.remove(w, r)
	default:
		http.Error(w, "Not found", http.StatusNotFound)
	}
}

func (h *Handler) register(w http.ResponseWriter, r *http.Request) {
	title := r.FormValue("title")
	piece, err := NewPiece(title)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if _, err := Insert(h.db, piece); err != nil {
		log.Printf("insert piece: %v", err)
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}

	h.renderList(w)
}

func (h *Handler) restore(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.FormValue("id"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid id", http.StatusBadRequest)
		return
	}

	piece, err := ByID(h.db, id)
	if err != nil || piece == nil {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}

	piece.Toggle()
	if err := Update(h.db, *piece); err != nil {
		log.Printf("update piece: %v", err)
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}

	h.renderList(w)
}

func (h *Handler) remove(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.FormValue("id"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid id", http.StatusBadRequest)
		return
	}

	if err := Delete(h.db, id); err != nil {
		log.Printf("delete piece: %v", err)
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}

	h.renderList(w)
}

func (h *Handler) renderList(w http.ResponseWriter) {
	pieces, err := All(h.db)
	if err != nil {
		log.Printf("list pieces: %v", err)
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}

	if pieces == nil {
		pieces = []Piece{}
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if err := h.templates.ExecuteTemplate(w, "features/pieces/_list.html", PageData{Pieces: pieces}); err != nil {
		log.Printf("render partial: %v", err)
	}
}
