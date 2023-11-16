// eslint-disable-next-line import/no-import-module-exports
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-import-module-exports
import { defineConfig } from 'cypress';

dotenv.config({ path: '.env.local' });
dotenv.config();

module.exports = defineConfig({
  projectId: 'm5orww',
  retries: {
    runMode: 2,
  },
  env: {
    apiUrl: 'http://127.0.0.1:3001',
    coverage: false,
  },
  e2e: {
    baseUrl: 'https://d2r3v7evrrggno.cloudfront.net',
    specPattern: 'cypress/*tests/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportHeight: 1000,
    viewportWidth: 1280,
    experimentalRunAllSpecs: true,
  },
});
