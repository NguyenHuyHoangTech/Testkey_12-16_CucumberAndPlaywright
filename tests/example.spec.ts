import { test, expect } from '@playwright/test';

test.describe('Automation Exercise - Smoke Tests', () => {
  test('has title and verifies homepage is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator('#slider-carousel')).toBeVisible();
  });
});
