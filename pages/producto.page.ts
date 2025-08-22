import { Page, Locator, expect } from '@playwright/test';
import { priceToNumber } from '../fixtures/test-data.js';

export class ProductoPage {
  readonly titulo: Locator;
  readonly precio: Locator;
  readonly btnAgregar: Locator;

  constructor(readonly page: Page) {
    this.titulo = page.locator('h1.product_title, .product_title, h1').first();
    this.precio = page.locator('.summary .price .amount, .price .amount, .price').first();
    this.btnAgregar = page.locator('button[name="add-to-cart"], .single_add_to_cart_button').first();
  }

  async nombre(): Promise<string> {
    return (await this.titulo.textContent() || '').trim();
  }
  async precioNumber(): Promise<number> {
    return priceToNumber(await this.precio.innerText());
  }
  async agregar() {
    await this.btnAgregar.scrollIntoViewIfNeeded();
    await expect(this.btnAgregar).toBeVisible();
    await this.btnAgregar.click();
    await this.page.getByText(/añadido al carrito|se ha añadido|ver carrito/i).first()
      .waitFor({ timeout: 4000 }).catch(() => {});
  }
}
