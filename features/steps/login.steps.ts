import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.goto();
});

Given(
  'I have logged in with username {string} and password {string}',
  async ({ loginPage }, username: string, password: string) => {
    await loginPage.goto();
    await loginPage.login(username, password);
  },
);

When(
  'I log in with username {string} and password {string}',
  async ({ loginPage }, username: string, password: string) => {
    await loginPage.login(username, password);
  },
);

When('I log out', async ({ loginPage }) => {
  await loginPage.logout();
});

Then('I should see the flash message {string}', async ({ loginPage }, message: string) => {
  await expect(loginPage.flashMessage).toContainText(message);
});

Then('I should be on the secure page', async ({ page }) => {
  await expect(page).toHaveURL(/secure/);
});

Then('I should be on the login page', async ({ page }) => {
  await expect(page).toHaveURL(/login/);
});
