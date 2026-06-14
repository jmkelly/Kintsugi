from dataclasses import dataclass


@dataclass
class Piece:
    id: int | None
    title: str
    completed: bool
    created_at: str | None = None

    @staticmethod
    def describe(title: str) -> "Piece":
        if not title or not title.strip():
            raise ValueError("Title must not be empty")
        return Piece(id=None, title=title.strip(), completed=False)

    def toggle(self) -> None:
        self.completed = not self.completed

    def rename(self, title: str) -> None:
        if not title or not title.strip():
            raise ValueError("Title must not be empty")
        self.title = title.strip()
