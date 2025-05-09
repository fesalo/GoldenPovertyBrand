export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  image: string;
  sizes?: string[];
  colors?: string[];
  stock?: number;
  isNew?: boolean;
  isPopular?: boolean;
  createdAt?: Date;
  rating: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price' | 'createdAt' | 'popularity';
  sortDirection?: 'asc' | 'desc';
}
