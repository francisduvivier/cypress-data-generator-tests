import dotenv from 'dotenv';
import { defineConfig } from 'cypress';

dotenv.config({ path: '.env.local' });
dotenv.config();

module.exports = defineConfig({
  projectId: 'm5orww',
  retries: {
    runMode: 2,
  },
  env: {
    apiUrl: 'http://ny652h2ixk.execute-api.eu-west-1.amazonaws.com',
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
