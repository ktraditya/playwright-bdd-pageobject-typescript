import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the JS alerts page', async ({ jsAlertsPage }) => {
  await jsAlertsPage.goto();
});

When('I trigger the alert and accept it', async ({ jsAlertsPage }) => {
  await jsAlertsPage.triggerAlertAndAccept();
});

When('I trigger the confirm and accept it', async ({ jsAlertsPage }) => {
  await jsAlertsPage.triggerConfirmAndAccept();
});

When('I trigger the confirm and dismiss it', async ({ jsAlertsPage }) => {
  await jsAlertsPage.triggerConfirmAndDismiss();
});

When('I trigger the prompt and enter {string}', async ({ jsAlertsPage }, text: string) => {
  await jsAlertsPage.triggerPromptAndAcceptWithText(text);
});

Then('the result should read {string}', async ({ jsAlertsPage }, text: string) => {
  await expect(jsAlertsPage.result).toHaveText(text);
});
