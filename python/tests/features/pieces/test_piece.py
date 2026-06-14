import pytest

from src.features.pieces.piece import Piece


class TestPiece:
    def test_describe_creates_piece(self):
        piece = Piece.describe("Teacup")
        assert piece.title == "Teacup"
        assert piece.completed is False
        assert piece.id is None

    def test_describe_strips_whitespace(self):
        piece = Piece.describe("  Bowl  ")
        assert piece.title == "Bowl"

    def test_describe_raises_on_empty_title(self):
        with pytest.raises(ValueError, match="Title must not be empty"):
            Piece.describe("")

    def test_describe_raises_on_whitespace_only(self):
        with pytest.raises(ValueError, match="Title must not be empty"):
            Piece.describe("   ")

    def test_toggle_flips_completed(self):
        piece = Piece.describe("Vase")
        assert piece.completed is False
        piece.toggle()
        assert piece.completed is True
        piece.toggle()
        assert piece.completed is False

    def test_rename_updates_title(self):
        piece = Piece.describe("Old name")
        piece.rename("New name")
        assert piece.title == "New name"

    def test_rename_strips_whitespace(self):
        piece = Piece.describe("Name")
        piece.rename("  Trimmed  ")
        assert piece.title == "Trimmed"

    def test_rename_raises_on_empty_title(self):
        piece = Piece.describe("Valid")
        with pytest.raises(ValueError, match="Title must not be empty"):
            piece.rename("")
