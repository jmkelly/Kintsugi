import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { engine } from "express-handlebars";
import { getDb } from "./db.js";
import piecesRouter from "./features/pieces/index.js";
import homeRouter from "./features/home/index.js";
import errorRouter, { errorHandler } from "./features/error/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT ?? 3000;
const cssVersion = Date.now();
const isDev = process.env.NODE_ENV !== "production";

function log(level: string, msg: string, ...args: unknown[]) {
  const ts = new Date().toISOString();
  const line = [`[${ts}] [${level}]`, msg, ...args.map(a => typeof a === "object" ? JSON.stringify(a) : a)].join(" ");
  if (level === "ERROR") console.error(line);
  else console.log(line);
}

app.engine("hbs", engine({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: [
    path.join(__dirname, "views"),
    __dirname,
  ],
  defaultLayout: "layout",
  helpers: {
    cssVersion: () => cssVersion,
    hxVals: (id: number) => JSON.stringify({ id }),
  },
}));
app.set("view engine", "hbs");
app.set("views", __dirname);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, _res, next) => {
  log("INFO", `${req.method} ${req.url}`);
  next();
});

app.use("/", homeRouter);
app.use("/pieces", piecesRouter);
app.use("/error", errorRouter);

app.use(errorHandler);

getDb();
log("INFO", `cssVersion = ${cssVersion}`);

app.listen(PORT, () => {
  log("INFO", `Kintsugi running at http://localhost:${PORT} (${isDev ? "development" : "production"})`);
});
