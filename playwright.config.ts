import { defineConfig, devices } from "@playwright/test";

const isCi = !!process.env["CI"];
// CI points the tests at the production image; locally Playwright starts `ng serve`.
const externalBaseUrl = process.env["E2E_BASE_URL"];
const baseURL = externalBaseUrl ?? "http://localhost:4200";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.e2e.ts",
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 2 : 0,
  reporter: isCi ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: externalBaseUrl
    ? undefined
    : {
        command: "npm run start -- --port 4200",
        url: baseURL,
        reuseExistingServer: !isCi,
        timeout: 120_000,
      },
});
