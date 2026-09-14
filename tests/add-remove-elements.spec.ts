import { test, expect } from '@playwright/test';

// https://the-internet.herokuapp.com/add_remove_elements/
test.describe('Add/Remove Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/add_remove_elements/');
  });

  test('adds a delete button for each click', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add Element' });
    const deleteButtons = page.getByRole('button', { name: 'Delete' });

    await addButton.click();
    await addButton.click();
    await addButton.click();

    await expect(deleteButtons).toHaveCount(3);
  });

  test('removes a delete button when clicked', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add Element' });
    const deleteButtons = page.getByRole('button', { name: 'Delete' });

    await addButton.click();
    await expect(deleteButtons).toHaveCount(1);

    await deleteButtons.first().click();
    await expect(deleteButtons).toHaveCount(0);
  });
});
