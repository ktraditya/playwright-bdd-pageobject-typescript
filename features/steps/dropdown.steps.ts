import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the dropdown page', async ({ dropdownPage }) => {
  await dropdownPage.goto();
});

When('I select the option {string}', async ({ dropdownPage }, option: string) => {
  await dropdownPage.selectOption(option as 'Option 1' | 'Option 2');
});

Then('the dropdown value should be {string}', async ({ dropdownPage }, value: string) => {
  await expect(dropdownPage.dropdown).toHaveValue(value);
});
