import type { Product, FilterState, FilterOptions, CategoryInfo, BrandInfo } from './types';
import productsData from '../data/products.json';

const products = productsData as unknown as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function filterProducts(filters: Partial<FilterState>): Product[] {
  let filtered = [...products];

  // Фильтр по категориям
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(p => filters.categories!.includes(p.category));
  }

  // Фильтр по брендам
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter(p => {
      const brandId = p.brand.toLowerCase().replace(/\s+/g, '-');
      return filters.brands!.includes(brandId);
    });
  }

  // Фильтр по цене
  if (filters.priceMin !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.priceMax!);
  }

  // Фильтр по наличию
  if (filters.availability && filters.availability !== 'all') {
    if (filters.availability === 'in_stock') {
      filtered = filtered.filter(p => p.inStock && p.stockQuantity > 0);
    } else if (filters.availability === 'out_of_stock') {
      filtered = filtered.filter(p => !p.inStock || p.stockQuantity === 0);
    }
  }

  // Поиск
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Сортировка
  if (filters.sort) {
    switch (filters.sort) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name, 'ru'));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  return filtered;
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')}₽`;
}

export function getSimilarProducts(productId: number, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

export function getFilterOptions(): FilterOptions {
  // Категории с подсчетом товаров
  const categoryMap = new Map<string, CategoryInfo>();
  products.forEach(p => {
    const existing = categoryMap.get(p.category);
    if (existing) {
      existing.count++;
    } else {
      categoryMap.set(p.category, {
        id: p.category,
        name: p.categoryName,
        count: 1,
      });
    }
  });

  // Бренды с подсчетом товаров
  const brandMap = new Map<string, BrandInfo>();
  products.forEach(p => {
    const existing = brandMap.get(p.brand);
    if (existing) {
      existing.count++;
    } else {
      brandMap.set(p.brand, {
        id: p.brand.toLowerCase().replace(/\s+/g, '-'),
        name: p.brand,
        count: 1,
      });
    }
  });

  // Диапазон цен
  const prices = products.map(p => p.price);
  const priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };

  return {
    categories: Array.from(categoryMap.values()),
    brands: Array.from(brandMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'ru')),
    priceRange,
  };
}
