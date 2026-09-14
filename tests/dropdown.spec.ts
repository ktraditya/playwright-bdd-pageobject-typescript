import { test, expect } from '@playwright/test';

// https://the-internet.herokuapp.com/dropdown
test.describe('Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dropdown');
  });

  test('defaults to the placeholder option', async ({ page }) => {
    await expect(page.locator('#dropdown')).toHaveValue('');
  });

  test('can select Option 1 and Option 2', async ({ page }) => {
    const dropdown = page.locator('#dropdown');

    await dropdown.selectOption({ label: 'Option 1' });
    await expect(dropdown).toHaveValue('1');

    await dropdown.selectOption({ label: 'Option 2' });
    await expect(dropdown).toHaveValue('2');
  });
});
