import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page.js';
import { CategoriaPage } from '../../pages/categoria.page.js';
import { ProductoPage } from '../../pages/producto.page.js';
import { CarritoPage } from '../../pages/carrito.page.js';

test('Amor: agregar dos productos (detalle) y validar carrito', async ({ page }) => {
  const home = new HomePage(page);
  const categoria = new CategoriaPage(page);
  const producto = new ProductoPage(page);
  const carrito = new CarritoPage(page);

  await home.goto();
  await home.irACategoria('Amor');


  await categoria.abrirDetallePorIndex(0);
  const n1 = await producto.nombre();
  const p1 = await producto.precioNumber();
  await producto.agregar();
  

  await home.irACategoria('Amor');
  await categoria.abrirDetallePorIndex(1);
  const n2 = await producto.nombre();
  const p2 = await producto.precioNumber();
  await producto.agregar();

 await page.waitForTimeout(300);             
 await page.goto('/carrito/');              
 await expect(page).toHaveURL(/\/carrito\/?/i);

  
const qtyInput = page.locator('table.shop_table input.qty, .cart_item input.qty').first();
await expect(qtyInput).toBeVisible({ timeout: 15000 });
await expect(qtyInput).toHaveValue('2');

await page.waitForLoadState('networkidle');

const subtotal = await carrito.subtotal();
expect(subtotal).toBe(p1 + p2);

await home.irACategoria('Amor');
  await categoria.abrirDetallePorIndex(1);
  const n3 = await producto.nombre();
  const p3 = await producto.precioNumber();
  await producto.agregarYEsperar200();
  
});
