import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the checkboxes page', async ({ checkboxesPage }) => {
  await checkboxesPage.goto();
});

When('I check checkbox {int}', async ({ checkboxesPage }, oneBasedIndex: number) => {
  await checkboxesPage.checkbox(oneBasedIndex - 1).check();
});

When('I uncheck checkbox {int}', async ({ checkboxesPage }, oneBasedIndex: number) => {
  await checkboxesPage.checkbox(oneBasedIndex - 1).uncheck();
});

Then('checkbox {int} should be checked', async ({ checkboxesPage }, oneBasedIndex: number) => {
  await expect(checkboxesPage.checkbox(oneBasedIndex - 1)).toBeChecked();
});

Then('checkbox {int} should be unchecked', async ({ checkboxesPage }, oneBasedIndex: number) => {
  await expect(checkboxesPage.checkbox(oneBasedIndex - 1)).not.toBeChecked();
});
