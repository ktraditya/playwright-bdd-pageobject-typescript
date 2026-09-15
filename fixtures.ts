import { test as base } from 'playwright-bdd';
import { LoginPage } from './pages/LoginPage';
import { CheckboxesPage } from './pages/CheckboxesPage';
import { DropdownPage } from './pages/DropdownPage';
import { DynamicLoadingPage } from './pages/DynamicLoadingPage';
import { JsAlertsPage } from './pages/JsAlertsPage';
import { AddRemoveElementsPage } from './pages/AddRemoveElementsPage';

type Pages = {
  loginPage: LoginPage;
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  dynamicLoadingPage: DynamicLoadingPage;
  jsAlertsPage: JsAlertsPage;
  addRemoveElementsPage: AddRemoveElementsPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  checkboxesPage: async ({ page }, use) => use(new CheckboxesPage(page)),
  dropdownPage: async ({ page }, use) => use(new DropdownPage(page)),
  dynamicLoadingPage: async ({ page }, use) => use(new DynamicLoadingPage(page)),
  jsAlertsPage: async ({ page }, use) => use(new JsAlertsPage(page)),
  addRemoveElementsPage: async ({ page }, use) => use(new AddRemoveElementsPage(page)),
});

export { expect } from '@playwright/test';
