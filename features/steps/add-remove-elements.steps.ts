import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the add and remove elements page', async ({ addRemoveElementsPage }) => {
  await addRemoveElementsPage.goto();
});

When('I add {int} element(s)', async ({ addRemoveElementsPage }, count: number) => {
  await addRemoveElementsPage.addElement(count);
});

When('I delete the first element', async ({ addRemoveElementsPage }) => {
  await addRemoveElementsPage.deleteButtons.first().click();
});

Then('there should be {int} delete button(s)', async ({ addRemoveElementsPage }, count: number) => {
  await expect(addRemoveElementsPage.deleteButtons).toHaveCount(count);
});
