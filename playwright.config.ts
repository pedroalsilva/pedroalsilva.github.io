import { defineConfig, devices } from '@playwright/test';

const executablePath = process.env.CHROME_PATH || (
  process.platform === 'darwin' && !process.env.CI
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : undefined
);

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.TEST_ORIGIN || 'http://127.0.0.1:3100',
    trace: 'retain-on-failure',
    launchOptions: executablePath ? { executablePath } : {},
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
