import { Page, Locator, expect } from '@playwright/test';

export class CategoriaPage {
  constructor(readonly page: Page) {}

  private grid() {
    return this.page.locator('.products, .product-grid, ul.products, .tbay-filter.products');
  }

  async abrirDetallePorIndex(i: number) {
    await this.page.waitForLoadState('domcontentloaded');

    await expect(this.grid()).toBeVisible({ timeout: 15000 });

    const items = this.grid().locator('.product-block.grid, li.product, .product');

    await expect(items.nth(i)).toBeVisible({ timeout: 15000 });
    const item = items.nth(i);
    await item.scrollIntoViewIfNeeded();

    const permalink = item.locator(
      'a.woocommerce-LoopProduct-link, a.woocommerce-loop-product__link, .product-title a, a[href*="/product/"], a[href*="/producto/"]'
    ).first();

    await permalink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(
      this.page.locator('button[name="add-to-cart"], .single_add_to_cart_button, a.single_add_to_cart_button')
    ).toBeVisible({ timeout: 15000 });
  }
}
