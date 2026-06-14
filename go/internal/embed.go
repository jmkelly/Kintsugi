package resources

import "embed"

//go:embed views/layouts/*.html features/*/*.html public/css/* public/js/*
var FS embed.FS
