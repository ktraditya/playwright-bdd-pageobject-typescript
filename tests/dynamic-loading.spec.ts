import { test, expect } from '../fixtures';

// https://the-internet.herokuapp.com/dynamic_loading
test.describe('Dynamic loading', () => {
  test('example 1: element is hidden then rendered visible after loading', async ({
    dynamicLoadingPage,
  }) => {
    await dynamicLoadingPage.goto(1);

    await dynamicLoadingPage.start();
    await expect(dynamicLoadingPage.loading).toBeVisible();

    await expect(dynamicLoadingPage.finish).toBeVisible({ timeout: 10_000 });
    await expect(dynamicLoadingPage.finish).toHaveText('Hello World!');
  });

  test('example 2: element is added to the DOM after loading', async ({ dynamicLoadingPage }) => {
    await dynamicLoadingPage.goto(2);

    await expect(dynamicLoadingPage.finish).toBeHidden();

    await dynamicLoadingPage.start();
    await expect(dynamicLoadingPage.loading).toBeVisible();

    await expect(dynamicLoadingPage.finish).toBeVisible({ timeout: 10_000 });
    await expect(dynamicLoadingPage.finish).toHaveText('Hello World!');
  });
});
