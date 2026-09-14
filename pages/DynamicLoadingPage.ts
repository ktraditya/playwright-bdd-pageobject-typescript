import type { Locator, Page } from '@playwright/test';

export class DynamicLoadingPage {
  readonly page: Page;
  readonly startButton: Locator;
  readonly loading: Locator;
  readonly finish: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.loading = page.locator('#loading');
    this.finish = page.locator('#finish');
  }

  async goto(example: 1 | 2) {
    await this.page.goto(`/dynamic_loading/${example}`);
  }

  async start() {
    await this.startButton.click();
  }
}
