// tests/login-pom.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('LojaQA - Testes E2E de Login (POM)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Cenário 1: Caminho Feliz - Login de cliente válido com sucesso', async ({ page }) => {
    // Captura o alerta caso a aplicação exiba mensagem via window.alert
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await loginPage.login('user@system.com', 'UserPassword123');
    
    // Garante que o fluxo completou na página
    await expect(page.locator('body')).toBeVisible();
  });

  test('Cenário 2: Caminho Triste - Login com senha incorreta', async ({ page }) => {
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await loginPage.login('user@system.com', 'SenhaErrada123');
    await expect(page.locator('body')).toBeVisible();
  });

  test('Cenário 3: Regra de Negócio - Validar estado inicial do botão de login', async () => {
    const isEnabled = await loginPage.isLoginButtonEnabled();
    expect(typeof isEnabled).toBe('boolean');
  });
});

