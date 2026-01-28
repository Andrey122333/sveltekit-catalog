import { filterProducts, getFilterOptions } from '$lib/products';
import type { PageServerLoad } from './$types';
import type { FilterState } from '$lib/types';

export const load: PageServerLoad = async ({ url }) => {
  const categories = url.searchParams.getAll('category');
  const brands = url.searchParams.getAll('brand');
  const priceMin = url.searchParams.get('price_min');
  const priceMax = url.searchParams.get('price_max');
  const availability = url.searchParams.get('availability');
  const sort = url.searchParams.get('sort');
  const search = url.searchParams.get('search') || '';

  const filters: Partial<FilterState> = {
    categories,
    brands,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : undefined,
    availability: (availability as FilterState['availability']) || 'all',
    sort: (sort as FilterState['sort']) || 'default',
    search,
  };

  const filtered = filterProducts(filters);
  const filterOptions = getFilterOptions();

  return {
    products: filtered,
    total: filtered.length,
    filterOptions,
  };
};
