.PHONY: dev build test clean

dev:
	go run ./cmd/kintsugi

build:
	go build -o kintsugi ./cmd/kintsugi

test:
	go test ./...

clean:
	rm -f kintsugi kintsugi.db kintsugi.db-shm kintsugi.db-wal
