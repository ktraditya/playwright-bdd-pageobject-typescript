import { test, expect } from '../fixtures';

// https://the-internet.herokuapp.com/dropdown
test.describe('Dropdown', () => {
  test.beforeEach(async ({ dropdownPage }) => {
    await dropdownPage.goto();
  });

  test('defaults to the placeholder option', async ({ dropdownPage }) => {
    await expect(dropdownPage.dropdown).toHaveValue('');
  });

  test('can select Option 1 and Option 2', async ({ dropdownPage }) => {
    await dropdownPage.selectOption('Option 1');
    await expect(dropdownPage.dropdown).toHaveValue('1');

    await dropdownPage.selectOption('Option 2');
    await expect(dropdownPage.dropdown).toHaveValue('2');
  });
});
