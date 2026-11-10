const { defineConfig, devices } = require('@playwright/test');

const port = 4179;
const mount = process.env.TAHARAH_TEST_BASE_PATH || '';
const origin = 'http://127.0.0.1:' + port;
const baseURL = origin + mount + '/';

module.exports = defineConfig({
  testDir: './tests',
  use: { baseURL },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-webkit', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'python3 -m http.server ' + port + ' --bind 127.0.0.1 --directory ' + (mount ? '.preview' : 'dist'),
    url: baseURL,
  },
});
