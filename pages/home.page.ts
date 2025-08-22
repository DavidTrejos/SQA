import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  constructor(readonly page: Page) {}
  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Floristería|Mundo Flor/i);
  }
  async irACategoria(nombre: string) {
    await this.page.getByRole('link', { name: new RegExp(`^${nombre}$`, 'i') }).first().click();
    await expect(this.page.getByRole('heading', { name: new RegExp(nombre, 'i') })).toBeVisible();
  }
}
