import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page.js';
import { CategoriaPage } from '../../pages/categoria.page.js';
import { ProductoPage } from '../../pages/producto.page.js';
import { CarritoPage } from '../../pages/carrito.page.js';

test('Cumpleaños: agregar uno (detalle) y eliminarlo', async ({ page }, testInfo) => {
  const home = new HomePage(page);
  const categoria = new CategoriaPage(page);
  const producto = new ProductoPage(page);
  const carrito = new CarritoPage(page);

  await home.goto();
  await home.irACategoria('Cumpleaños');

  await categoria.abrirDetallePorIndex(0);
  await producto.agregar();

  await carrito.abrirDesdeMiniCart();
  const before = await page.screenshot();
  await testInfo.attach('carrito-antes.png', { body: before, contentType: 'image/png' });

  await carrito.eliminarPrimero();
  await carrito.esperarVacio();

  const after = await page.screenshot();
  await testInfo.attach('carrito-despues.png', { body: after, contentType: 'image/png' });
});
