import { defineConfig, devices } from "@playwright/test";

/**
 * Lightweight Playwright config. Boots `npm run build && npm start`
 * once and reuses it across all tests in the `e2e/` folder.
 *
 * Local: `npm run test:e2e`
 * First run only: `npx playwright install chromium` (downloads ~150 MB
 * browser binary into ~/.cache/ms-playwright).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3737",
    trace: "on-first-retry",
    actionTimeout: 8000,
    navigationTimeout: 15000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 14"] },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npm run build && npm run start -- -p 3737",
        url: "http://localhost:3737",
        timeout: 180_000,
        reuseExistingServer: true,
      },
});
