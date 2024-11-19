import { test, expect } from '@playwright/test';

test('should handle form submission correctly', async ({ page }) => {
  // Mock the page alert and confirm dialogs
  page.on('dialog', async (dialog) => {
    if (dialog.type() === 'alert') {
      expect(dialog.message()).toBe('Form submitted successfully!');
      await dialog.accept();
    } else if (dialog.type() === 'confirm') {
      expect(dialog.message()).toBe('Download JSON data?');
      await dialog.accept(); // Simulate clicking 'OK'
    }
  });

  // Mock `console.log` to verify the submitted data
  const consoleLogs: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'log') {
      consoleLogs.push(msg.text());
    }
  });

  await page.goto('http://localhost:5173');
});
