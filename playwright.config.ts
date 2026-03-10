import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

/* BDD feature file and steps mapping */
const testDir = defineBddConfig({
  features: 'tests/features/*.feature',
  steps: 'tests/steps/*.steps.ts',
});

export default defineConfig({
  testDir,
  reporter: 'html', 
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://www.service.nsw.gov.au/transaction/check-motor-vehicle-stamp-duty',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Run tests silently without opening browser */
    headless: true,
    screenshot: 'on',
  },

  /* Configure projects for major browsers - Chromium */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
  ]
});
