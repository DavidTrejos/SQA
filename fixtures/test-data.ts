export const categorias = {
  amor: 'Amor',
  cumple: 'Cumpleaños',
};

export type ProductoResumen = { nombre: string; precio: number; href?: string; };

export function priceToNumber(texto: string): number {
  
  return Number(texto.replace(/[^\d]/g, ''));
}