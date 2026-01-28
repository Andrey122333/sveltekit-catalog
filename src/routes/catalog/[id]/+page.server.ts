import { getProductById, getSimilarProducts } from '$lib/products';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const product = getProductById(Number(params.id));

  if (!product) {
    error(404, 'Товар не найден');
  }

  const similar = getSimilarProducts(product.id, 4);

  return {
    product,
    similar
  };
};
