import { describe, it, expect } from "vitest";
import { Item } from "../../../src/features/items/Item.ts";
import { createTestDb } from "../../../src/db.ts";
import {
  getAllItems,
  createItem,
  findItemById,
  deleteItem,
  updateItem,
} from "../../../src/features/items/ItemRepository.ts";

describe("Item domain entity", () => {
  it("creates an item with valid title", () => {
    const item = Item.create("Test item");
    expect(item.title).toBe("Test item");
    expect(item.isComplete).toBe(false);
    expect(item.id).toBe(0);
    expect(item.createdAt).toBeInstanceOf(Date);
  });

  it("rejects empty title", () => {
    expect(() => Item.create("")).toThrow("Title cannot be empty");
    expect(() => Item.create("   ")).toThrow("Title cannot be empty");
  });

  it("toggles completion status", () => {
    const item = Item.create("Toggle me");
    expect(item.isComplete).toBe(false);
    item.toggle();
    expect(item.isComplete).toBe(true);
    item.toggle();
    expect(item.isComplete).toBe(false);
  });

  it("renames with valid title", () => {
    const item = Item.create("Old name");
    item.rename("New name");
    expect(item.title).toBe("New name");
  });

  it("rejects rename with empty title", () => {
    const item = Item.create("Name");
    expect(() => item.rename("")).toThrow("Title cannot be empty");
  });
});

describe("ItemRepository", () => {
  it("creates and retrieves an item", async () => {
    const db = createTestDb();
    const item = await createItem(db, "Test item");
    expect(item.id).toBeGreaterThan(0);

    const saved = await findItemById(db, item.id);
    expect(saved).not.toBeNull();
    expect(saved!.title).toBe("Test item");
  });

  it("gets all items in creation order", async () => {
    const db = createTestDb();
    await createItem(db, "A");
    await createItem(db, "B");

    const items = await getAllItems(db);
    expect(items).toHaveLength(2);
    expect(items[0]!.title).toBe("A");
    expect(items[1]!.title).toBe("B");
  });

  it("deletes an item", async () => {
    const db = createTestDb();
    const item = await createItem(db, "Delete me");

    await deleteItem(db, item.id);

    expect(await findItemById(db, item.id)).toBeNull();
    expect(await getAllItems(db)).toHaveLength(0);
  });

  it("updates an item and persists changes", async () => {
    const db = createTestDb();
    const item = await createItem(db, "Toggle me");

    item.toggle();
    await updateItem(db, item);

    const reloaded = await findItemById(db, item.id);
    expect(reloaded!.isComplete).toBe(true);
  });
});
