import { test, expect } from '../fixtures';

// https://the-internet.herokuapp.com/javascript_alerts
test.describe('JavaScript alerts', () => {
  test.beforeEach(async ({ jsAlertsPage }) => {
    await jsAlertsPage.goto();
  });

  test('accepting a JS Alert', async ({ jsAlertsPage }) => {
    await jsAlertsPage.triggerAlertAndAccept();

    await expect(jsAlertsPage.result).toHaveText('You successfully clicked an alert');
  });

  test('accepting a JS Confirm', async ({ jsAlertsPage }) => {
    await jsAlertsPage.triggerConfirmAndAccept();

    await expect(jsAlertsPage.result).toHaveText('You clicked: Ok');
  });

  test('dismissing a JS Confirm', async ({ jsAlertsPage }) => {
    await jsAlertsPage.triggerConfirmAndDismiss();

    await expect(jsAlertsPage.result).toHaveText('You clicked: Cancel');
  });

  test('entering text into a JS Prompt', async ({ jsAlertsPage }) => {
    await jsAlertsPage.triggerPromptAndAcceptWithText('Playwright');

    await expect(jsAlertsPage.result).toHaveText('You entered: Playwright');
  });
});
