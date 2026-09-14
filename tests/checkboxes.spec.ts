import { test, expect } from '../fixtures';

// https://the-internet.herokuapp.com/checkboxes
test.describe('Checkboxes', () => {
  test.beforeEach(async ({ checkboxesPage }) => {
    await checkboxesPage.goto();
  });

  test('has correct default checked state', async ({ checkboxesPage }) => {
    await expect(checkboxesPage.checkbox(0)).not.toBeChecked();
    await expect(checkboxesPage.checkbox(1)).toBeChecked();
  });

  test('can toggle each checkbox', async ({ checkboxesPage }) => {
    await checkboxesPage.checkbox(0).check();
    await expect(checkboxesPage.checkbox(0)).toBeChecked();

    await checkboxesPage.checkbox(1).uncheck();
    await expect(checkboxesPage.checkbox(1)).not.toBeChecked();
  });
});
