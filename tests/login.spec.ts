import { test, expect } from '../fixtures';

// https://the-internet.herokuapp.com/login
test.describe('Login form', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('shows success message with valid credentials', async ({ page, loginPage }) => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
    await expect(page).toHaveURL(/secure/);
  });

  test('shows error with invalid username', async ({ loginPage }) => {
    await loginPage.login('invalidUser', 'SuperSecretPassword!');

    await expect(loginPage.flashMessage).toContainText('Your username is invalid!');
  });

  test('shows error with invalid password', async ({ loginPage }) => {
    await loginPage.login('tomsmith', 'wrongPassword');

    await expect(loginPage.flashMessage).toContainText('Your password is invalid!');
  });

  test('can log out of the secure area', async ({ page, loginPage }) => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.logout();

    await expect(loginPage.flashMessage).toContainText('You logged out of the secure area!');
    await expect(page).toHaveURL(/login/);
  });
});
