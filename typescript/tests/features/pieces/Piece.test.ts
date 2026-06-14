import { describe, it, expect } from "vitest";
import { Piece } from "../../../src/features/pieces/Piece.js";
import { createTestDb } from "../../../src/db.js";
import {
  getAllPieces,
  registerPiece,
  findPieceById,
  removePiece,
  savePiece,
} from "../../../src/features/pieces/PieceRepository.js";

describe("Piece domain entity", () => {
  it("creates a piece with a valid title", () => {
    const piece = Piece.describe("Cracked tea bowl");
    expect(piece.title).toBe("Cracked tea bowl");
    expect(piece.restored).toBe(false);
    expect(piece.id).toBe(0);
    expect(piece.createdAt).toBeInstanceOf(Date);
  });

  it("rejects empty title", () => {
    expect(() => Piece.describe("")).toThrow("A piece must have a name");
    expect(() => Piece.describe("   ")).toThrow("A piece must have a name");
  });

  it("toggles restoration status", () => {
    const piece = Piece.describe("Chipped vase");
    expect(piece.restored).toBe(false);
    piece.toggle();
    expect(piece.restored).toBe(true);
    piece.toggle();
    expect(piece.restored).toBe(false);
  });

  it("renames with valid title", () => {
    const piece = Piece.describe("Old name");
    piece.rename("New name");
    expect(piece.title).toBe("New name");
  });

  it("rejects rename with empty title", () => {
    const piece = Piece.describe("Name");
    expect(() => piece.rename("")).toThrow("A piece must have a name");
  });
});

describe("PieceRepository", () => {
  it("registers and retrieves a piece", async () => {
    const db = createTestDb();
    const piece = await registerPiece(db, "Cracked bowl");
    expect(piece.id).toBeGreaterThan(0);

    const saved = await findPieceById(db, piece.id);
    expect(saved).not.toBeNull();
    expect(saved!.title).toBe("Cracked bowl");
  });

  it("gets all pieces in creation order", async () => {
    const db = createTestDb();
    await registerPiece(db, "Tea cup");
    await registerPiece(db, "Sake flask");

    const pieces = await getAllPieces(db);
    expect(pieces).toHaveLength(2);
    expect(pieces[0]!.title).toBe("Tea cup");
    expect(pieces[1]!.title).toBe("Sake flask");
  });

  it("removes a piece", async () => {
    const db = createTestDb();
    const piece = await registerPiece(db, "Broken plate");

    await removePiece(db, piece.id);

    expect(await findPieceById(db, piece.id)).toBeNull();
    expect(await getAllPieces(db)).toHaveLength(0);
  });

  it("saves a piece and persists changes", async () => {
    const db = createTestDb();
    const piece = await registerPiece(db, "Cracked vase");

    piece.toggle();
    await savePiece(db, piece);

    const reloaded = await findPieceById(db, piece.id);
    expect(reloaded!.restored).toBe(true);
  });
});
