import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import expressLayouts from "express-ejs-layouts";
import { getDb } from "./db.ts";
import itemsRouter from "./features/items/index.ts";
import homeRouter from "./features/home/index.ts";
import errorRouter, { errorHandler } from "./features/error/index.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT ?? 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "views"));

app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "src", "public")));

app.use("/", homeRouter);
app.use("/items", itemsRouter);
app.use("/error", errorRouter);

app.use(errorHandler);

getDb();

app.listen(PORT, () => {
  console.log(`Kintsugi running at http://localhost:${PORT}`);
});
