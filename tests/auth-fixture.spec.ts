import { test, expect } from '../fixtures/auth.fixture.js';

test('Deve acessar a aplicação utilizando a Fixture customizada de login', async ({ authenticatedUser, page }) => {
  // O teste já começa autenticado ou na sessão configurada pela fixture
  await expect(page.locator('body')).toBeVisible();
});