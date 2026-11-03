// fixtures/auth.fixture.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

// Definindo os tipos das Fixtures customizadas
type MyFixtures = {
  loginPage: LoginPage;
  authenticatedUser: LoginPage;
};

export const test = base.extend<MyFixtures>({
  // Fixture fornecendo a página de login instanciada
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Fixture avançada: já entrega o usuário logado no sistema
  authenticatedUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin@system.com', 'AdminPassword123');
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';