package errorpage

import (
	"html/template"
	"log"
	"net/http"
)

type Handler struct {
	templates *template.Template
}

func NewHandler(templates *template.Template) *Handler {
	return &Handler{templates: templates}
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusInternalServerError)
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if err := h.templates.ExecuteTemplate(w, "features/error/index.html", nil); err != nil {
		log.Printf("render error: %v", err)
	}
}
