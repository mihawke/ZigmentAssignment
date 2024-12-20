import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:5173',
  },
  testDir: 'e2e',
  testMatch: [
    '**/*.spec.ts',
    '**/*.spec.tsx', // Customize to include .spec.ts and .spec.tsx
  ],
  webServer: {
    command: 'npm run dev', // Start your app's dev server
    port: 5173, // Match this with your dev server's port
    reuseExistingServer: !process.env.CI,
  },
});
