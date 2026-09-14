import { test, expect } from '@playwright/test';

// https://the-internet.herokuapp.com/dynamic_loading
test.describe('Dynamic loading', () => {
  test('example 1: element is hidden then rendered visible after loading', async ({ page }) => {
    await page.goto('/dynamic_loading/1');

    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.locator('#loading')).toBeVisible();

    await expect(page.locator('#finish')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('#finish')).toHaveText('Hello World!');
  });

  test('example 2: element is added to the DOM after loading', async ({ page }) => {
    await page.goto('/dynamic_loading/2');

    await expect(page.locator('#finish')).toBeHidden();

    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.locator('#loading')).toBeVisible();

    await expect(page.locator('#finish')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('#finish')).toHaveText('Hello World!');
  });
});
