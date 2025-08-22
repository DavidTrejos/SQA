import { Page, expect } from '@playwright/test';
import { priceToNumber } from '../fixtures/test-data.js';

export class CarritoPage {
  constructor(readonly page: Page) {}

  async abrir() {
  const verCarrito = this.page.getByRole('link', { name: /ver carrito/i }).first();
  if (await verCarrito.isVisible().catch(() => false)) {
    await verCarrito.click();
  } else {
    const headerCart = this.page.locator('a.cart-contents').first();
    if (await headerCart.isVisible().catch(() => false)) {
      await headerCart.click();
    } else {
      await this.page.goto('/cart');
    }
  }
  await expect(this.page.locator('.shop_table, table.cart')).toBeVisible();
}

async abrirDesdeMiniCart() {

  const toggle = this.page.locator('#cart a.dropdown-toggle.mini-cart, #cart .mini-cart').first();
  await toggle.click({ force: true });

  const viewCart = this.page.locator('#cart .dropdown-menu a.button.wc-forward.view-cart').first();
  await viewCart.waitFor({ state: 'visible', timeout: 7000 }).catch(async () => {
    await toggle.click({ force: true });
    await viewCart.waitFor({ state: 'visible', timeout: 5000 });
  });

  await Promise.all([
    this.page.waitForURL(/\/carrito\/?$/i, { timeout: 15000 }),
    viewCart.click()
  ]);


  const cartForm = this.page.locator('form.woocommerce-cart-form').first();
  await expect(cartForm).toBeVisible({ timeout: 15000 });
}
 

  private filas() { return this.page.locator('tr.cart_item'); }

  async contarItems() { return await this.filas().count(); }

  async nombreYPrecioPorIndex(i: number) {
    const fila = this.filas().nth(i);
    const nombre = (await fila.getByRole('link').first().innerText()).trim();
    const precioTxt = await fila.locator('.product-price .amount, .product-subtotal .amount').first().innerText();
    return { nombre, precio: priceToNumber(precioTxt) };
  }

  async subtotal() {
    const txt = await this.page.locator('.cart-subtotal .amount, .order-total .amount').first().innerText();
    return priceToNumber(txt);
  }

  async eliminarPrimero() {
  const remove = this.page.locator('table.shop_table a.remove, .woocommerce-cart-form a.remove').first();
  await expect(remove).toBeVisible({ timeout: 15000 });
  await Promise.all([
    this.page.waitForLoadState('networkidle'),
    remove.click(),
  ]);
}

  async esperarVacio() {
  await expect(this.filas()).toHaveCount(0, { timeout: 15000 });
  await this.page
    .getByText(/carrito vac[ií]o|no hay productos/i)
    .first()
    .waitFor({ timeout: 3000 })
    .catch(() => {}); 
 }
}
