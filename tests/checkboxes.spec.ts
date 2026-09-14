import { test, expect } from '@playwright/test';

// https://the-internet.herokuapp.com/checkboxes
test.describe('Checkboxes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkboxes');
  });

  test('has correct default checked state', async ({ page }) => {
    const checkboxes = page.locator('#checkboxes input[type="checkbox"]');

    await expect(checkboxes.nth(0)).not.toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();
  });

  test('can toggle each checkbox', async ({ page }) => {
    const checkboxes = page.locator('#checkboxes input[type="checkbox"]');

    await checkboxes.nth(0).check();
    await expect(checkboxes.nth(0)).toBeChecked();

    await checkboxes.nth(1).uncheck();
    await expect(checkboxes.nth(1)).not.toBeChecked();
  });
});
