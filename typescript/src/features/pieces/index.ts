import { Router } from "express";
import { getDb } from "../../db.js";
import {
  getAllPieces,
  findPieceById,
  registerPiece,
  savePiece,
  removePiece,
} from "./PieceRepository.js";

const router = Router();
const log = (msg: string, ...args: unknown[]) => {
  const ts = new Date().toISOString();
  const line = [`[${ts}] [PIECES]`, msg, ...args.map(a => typeof a === "object" ? JSON.stringify(a) : a)].join(" ");
  console.log(line);
};

router.get("/", async (_req, res, next) => {
  log("GET /pieces");
  try {
    const db = getDb();
    log("db acquired");
    const pieces = await getAllPieces(db);
    log(`fetched ${pieces.length} pieces`);
    res.render("features/pieces/list", { pieces });
    log("render complete");
  } catch (err) {
    log("ERROR rendering /pieces", String(err));
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const title = req.body.title as string | undefined;
    if (!title) {
      res.status(400).send("A name is required");
      return;
    }

    const db = getDb();
    await registerPiece(db, title);
    const pieces = await getAllPieces(db);
    res.render("features/pieces/_pieceList", { pieces, layout: false });
  } catch (err) {
    next(err);
  }
});

router.post("/toggle", async (req, res, next) => {
  try {
    const id = Number(req.body.id);
    if (Number.isNaN(id)) {
      res.status(400).send("Invalid piece");
      return;
    }

    const db = getDb();
    const piece = await findPieceById(db, id);
    if (piece) {
      piece.toggle();
      await savePiece(db, piece);
    }

    const pieces = await getAllPieces(db);
    res.render("features/pieces/_pieceList", { pieces, layout: false });
  } catch (err) {
    next(err);
  }
});

router.post("/remove", async (req, res, next) => {
  try {
    const id = Number(req.body.id);
    if (Number.isNaN(id)) {
      res.status(400).send("Invalid piece");
      return;
    }

    const db = getDb();
    await removePiece(db, id);
    const pieces = await getAllPieces(db);
    res.render("features/pieces/_pieceList", { pieces, layout: false });
  } catch (err) {
    next(err);
  }
});

export default router;
