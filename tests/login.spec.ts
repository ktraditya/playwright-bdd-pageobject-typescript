import { test, expect } from '@playwright/test';

// https://the-internet.herokuapp.com/login
test.describe('Login form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('shows success message with valid credentials', async ({ page }) => {
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    await expect(page).toHaveURL(/secure/);
  });

  test('shows error with invalid username', async ({ page }) => {
    await page.locator('#username').fill('invalidUser');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('shows error with invalid password', async ({ page }) => {
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('wrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('can log out of the secure area', async ({ page }) => {
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
    await expect(page).toHaveURL(/login/);
  });
});
