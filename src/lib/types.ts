export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  price: number;
  category: string;
  categoryName: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  badge: string | null;
  images: string[];
  specs: Record<string, string>;
  reviews: Review[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maxQuantity: number;
}

export interface FilterState {
  categories: string[];
  priceMin?: number;
  priceMax?: number;
  brands: string[];
  availability: 'all' | 'in_stock' | 'out_of_stock';
  sort: 'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating';
  search: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  count: number;
}

export interface BrandInfo {
  id: string;
  name: string;
  count: number;
}

export interface FilterOptions {
  categories: CategoryInfo[];
  brands: BrandInfo[];
  priceRange: {
    min: number;
    max: number;
  };
}
