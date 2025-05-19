import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private selectedProduct: Product = {
    id: 1,
    name: 'Classic T-Shirt',
    price: 29.99,
    description: 'Comfortable cotton t-shirt for everyday wear',
    category: 1,
    frontImage: '',
    stock: 2,
  };

  setProduct(product: Product): void {
    this.selectedProduct = product;
  }

  getProduct(): Product {
    return this.selectedProduct;
  }

  clearProduct(): void {
    this.selectedProduct = {
      id: 1,
      name: 'Classic T-Shirt',
      price: 29.99,
      description: 'Comfortable cotton t-shirt for everyday wear',
      category: 1,
      frontImage: '',
      stock: 2,
    };
  }
}

