import type { Dialog, Locator, Page } from '@playwright/test';

export class JsAlertsPage {
  readonly page: Page;
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
    this.confirmButton = page.getByRole('button', { name: 'Click for JS Confirm' });
    this.promptButton = page.getByRole('button', { name: 'Click for JS Prompt' });
    this.result = page.locator('#result');
  }

  async goto() {
    await this.page.goto('/javascript_alerts');
  }

  /** Registers a one-time dialog handler, then triggers the button that opens it. */
  private async triggerDialog(button: Locator, handle: (dialog: Dialog) => Promise<void> | void) {
    this.page.once('dialog', (dialog) => handle(dialog));
    await button.click();
  }

  async triggerAlertAndAccept() {
    await this.triggerDialog(this.alertButton, (dialog) => dialog.accept());
  }

  async triggerConfirmAndAccept() {
    await this.triggerDialog(this.confirmButton, (dialog) => dialog.accept());
  }

  async triggerConfirmAndDismiss() {
    await this.triggerDialog(this.confirmButton, (dialog) => dialog.dismiss());
  }

  async triggerPromptAndAcceptWithText(text: string) {
    await this.triggerDialog(this.promptButton, (dialog) => dialog.accept(text));
  }
}
