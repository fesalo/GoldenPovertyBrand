export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: number;
  frontImage:string;
  stock: number;
  creationDate?: string;
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
  sortBy?: 'price' | 'creationDate' | 'popularity';
  sortDirection?: 'asc' | 'desc';
}
