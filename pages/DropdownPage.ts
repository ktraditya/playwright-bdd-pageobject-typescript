import type { Locator, Page } from '@playwright/test';

export class DropdownPage {
  readonly page: Page;
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator('#dropdown');
  }

  async goto() {
    await this.page.goto('/dropdown');
  }

  async selectOption(label: 'Option 1' | 'Option 2') {
    await this.dropdown.selectOption({ label });
  }
}
