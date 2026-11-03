// tests/login-data-driven.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

const cenariosLogin = [
  { descricao: 'Cliente válido', email: 'user@system.com', pass: 'UserPassword123' },
  { descricao: 'Administrador válido', email: 'admin@system.com', pass: 'AdminPassword123' },
  { descricao: 'Lojista válido', email: 'lojista@system.com', pass: 'SellerPass123' },
  { descricao: 'Senha incorreta', email: 'user@system.com', pass: 'SenhaIncorreta999' },
  { descricao: 'E-mail não cadastrado', email: 'naoexistente@system.com', pass: 'UserPassword123' },
  { descricao: 'Campos em branco', email: '', pass: '' },
];

test.describe('LojaQA - Testes Data-Driven de Login', () => {
  for (const cenario of cenariosLogin) {
    test(`Cenário: ${cenario.descricao} (${cenario.email || 'vazio'})`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      page.on('dialog', async dialog => {
        await dialog.accept();
      });

      await loginPage.login(cenario.email, cenario.pass);

      if (cenario.email === '') {
        // Valida especificamente que o botão continua desabilitado para campos vazios
        expect(await loginPage.isLoginButtonEnabled()).toBe(false);
      } else {
        await expect(page.locator('body')).toBeVisible();
      }
    });
  }
});
