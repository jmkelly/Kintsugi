import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30000,
  globalSetup: "tests/e2e/globalSetup.ts",
  use: {
    baseURL: "http://localhost:3001",
    headless: true,
  },
  webServer: {
    command: "DB_PATH=/tmp/kintsugi-test.db PORT=3001 NODE_ENV=test tsx src/index.ts",
    port: 3001,
    reuseExistingServer: false,
  },
});
