import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on dynamic loading example {int}', async ({ dynamicLoadingPage }, example: number) => {
  await dynamicLoadingPage.goto(example as 1 | 2);
});

When('I click start', async ({ dynamicLoadingPage }) => {
  await dynamicLoadingPage.start();
});

Then('the loading indicator should be visible', async ({ dynamicLoadingPage }) => {
  await expect(dynamicLoadingPage.loading).toBeVisible();
});

Then('the finish element should be hidden', async ({ dynamicLoadingPage }) => {
  await expect(dynamicLoadingPage.finish).toBeHidden();
});

Then(
  'the finish text should eventually read {string}',
  async ({ dynamicLoadingPage }, text: string) => {
    await expect(dynamicLoadingPage.finish).toBeVisible({ timeout: 10_000 });
    await expect(dynamicLoadingPage.finish).toHaveText(text);
  },
);
