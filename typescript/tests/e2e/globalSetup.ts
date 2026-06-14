import fs from "node:fs";

export default function () {
  const dbPath = process.env.DB_PATH ?? "/tmp/kintsugi-test.db";
  try {
    fs.unlinkSync(dbPath);
  } catch {
    // file doesn't exist, that's fine
  }
}
