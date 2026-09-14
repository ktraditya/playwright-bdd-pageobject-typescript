import type { Locator, Page } from '@playwright/test';

export class AddRemoveElementsPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Add Element' });
    this.deleteButtons = page.getByRole('button', { name: 'Delete' });
  }

  async goto() {
    await this.page.goto('/add_remove_elements/');
  }

  async addElement(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.addButton.click();
    }
  }
}
