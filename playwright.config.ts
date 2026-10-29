import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'
import path from 'node:path';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

dotenv.config({path:process.env.ENV_FILE_PATH? `./env-files/.env.${process.env.ENV_FILE_PATH}`:'./env-files/.env.demo'})

const specFile = process.argv.find((arg) => /\.(spec|test)\.ts$/i.test(arg));
const specName = specFile
  ? path.basename(specFile).replace(/\.(spec|test)\.ts$/i, '')
  : 'all-tests';
const timestamp = new Date()
  .toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' })
  .replace(/[: ]/g, '-');
const reportFolder = path.join('playwright-report', `${specName}-${timestamp}-${process.pid}`);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: reportFolder, open: 'always' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000'
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  timeout: 90 * 1000,
  expect: {
    timeout: 30 * 1000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'authentication-chromium',
      testDir: './utils',
      testMatch: 'global.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'authentication-firefox',
      testDir: './utils',
      testMatch: 'global.setup.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'authentication-webkit',
      testDir: './utils',
      testMatch: 'global.setup.ts',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'chromium',
      dependencies: ['authentication-chromium'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth-chromium.json',
      },
    },

    {
      name: 'firefox',
      dependencies: ['authentication-firefox'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'auth-firefox.json',
      },
    },

    {
      name: 'webkit',
      dependencies: ['authentication-webkit'],
      use: {
        ...devices['Desktop Safari'],
        storageState: 'auth-webkit.json',
      },
    },
    {
      name: 'apitest',
      testDir:'./tests/api-tests',
      use:{
        ...devices['Desktop Chrome'],
        baseURL: process.env.API_Base_URL,
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type':'application/json',
        },
      }
    }
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
