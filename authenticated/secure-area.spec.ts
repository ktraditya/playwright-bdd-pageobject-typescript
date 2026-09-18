import { test, expect } from '../fixtures';

// This project runs with `storageState: 'playwright/.auth/user.json'` (see
// playwright.config.ts), produced by the "setup" project (tests/auth.setup.ts).
// These specs start already logged in and never touch the login form.
test.describe('Secure area (pre-authenticated via storage state)', () => {
  test('going straight to /secure shows the secure area without logging in', async ({
    page,
    loginPage,
  }) => {
    await page.goto('/secure');

    await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
    await expect(loginPage.logoutLink).toBeVisible();
  });
});
