import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.floristeriamundoflor.com',
    browserName: 'chromium',
    headless: true,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: { width: 1366, height: 768 }
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  retries: 0
});
