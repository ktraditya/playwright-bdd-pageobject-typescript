import type { Locator, Page } from '@playwright/test';

export class CheckboxesPage {
  readonly page: Page;
  readonly checkboxes: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkboxes = page.locator('#checkboxes input[type="checkbox"]');
  }

  async goto() {
    await this.page.goto('/checkboxes');
  }

  checkbox(index: number): Locator {
    return this.checkboxes.nth(index);
  }
}
