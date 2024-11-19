import { test, expect } from '@playwright/test';

test.describe('Test for responsive layout', () => {
  const url = 'http://localhost:5173'; // Replace with your React app's URL
  const breakpoints = [
    { width: 320, height: 568 }, // Mobile (e.g., iPhone SE)
    { width: 768, height: 1024 }, // Tablet (e.g., iPad)
    { width: 1024, height: 768 }, // Small Desktop
    { width: 1920, height: 1080 }, // Large Desktop
  ];

  breakpoints.forEach(({ width, height }) => {
    test(`Should render correctly at ${width}x${height}`, async ({ page }) => {
      // Set viewport size
      await page.setViewportSize({ width, height });
      
      await page.goto(url);

      const FormGenerator = page.locator('#form-container');
      const JsonEditor = page.locator('#jsoneditor-container');

      await expect(FormGenerator).toBeVisible();
      await expect(JsonEditor).toBeVisible();
    });
  });
});
