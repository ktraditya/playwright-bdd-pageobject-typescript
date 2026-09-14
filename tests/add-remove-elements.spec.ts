import { test, expect } from '../fixtures';

// https://the-internet.herokuapp.com/add_remove_elements/
test.describe('Add/Remove Elements', () => {
  test.beforeEach(async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.goto();
  });

  test('adds a delete button for each click', async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.addElement(3);

    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(3);
  });

  test('removes a delete button when clicked', async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.addElement(1);
    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(1);

    await addRemoveElementsPage.deleteButtons.first().click();
    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(0);
  });
});
