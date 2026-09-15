import { test as setup } from '../fixtures';

const authFile = 'playwright/.auth/user.json';

setup('authenticate as tomsmith', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await page.waitForURL(/secure/);

  await page.context().storageState({ path: authFile });
});
