import { Router } from "express";
import { getDb } from "../../db.ts";
import {
  getAllItems,
  findItemById,
  createItem,
  updateItem,
  deleteItem,
} from "./ItemRepository.ts";

const router = Router();

router.get("/", async (_req, res) => {
  const db = getDb();
  const items = await getAllItems(db);
  res.render("features/items/list", { items });
});

router.post("/create", async (req, res) => {
  const title = req.body.title as string | undefined;
  if (!title) {
    res.status(400).send("Title is required");
    return;
  }

  const db = getDb();
  await createItem(db, title);
  const items = await getAllItems(db);
  res.render("features/items/_itemList", { items, layout: false });
});

router.post("/toggle", async (req, res) => {
  const id = Number(req.body.id);
  if (Number.isNaN(id)) {
    res.status(400).send("Invalid id");
    return;
  }

  const db = getDb();
  const item = await findItemById(db, id);
  if (item) {
    item.toggle();
    await updateItem(db, item);
  }

  const items = await getAllItems(db);
  res.render("features/items/_itemList", { items, layout: false });
});

router.post("/delete", async (req, res) => {
  const id = Number(req.body.id);
  if (Number.isNaN(id)) {
    res.status(400).send("Invalid id");
    return;
  }

  const db = getDb();
  await deleteItem(db, id);
  const items = await getAllItems(db);
  res.render("features/items/_itemList", { items, layout: false });
});

export default router;
