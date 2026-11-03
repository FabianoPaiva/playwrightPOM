// pages/LoginPage.ts
import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly statusMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.errorMessage = page.locator('#errorMessage');
    this.statusMessage = page.locator('#statusMessage');
  }

  async goto() {
    await this.page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    
    // Regra de segurança: só clica se o botão estiver habilitado (evita timeout se campos estiverem vazios)
    if (await this.loginButton.isEnabled()) {
      await this.loginButton.click();
    }
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }
}
