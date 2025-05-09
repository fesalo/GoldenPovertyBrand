import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product, ProductFilter } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Mock product data
  private products: Product[] = [
    {
      id: '1',
      name: 'Urban Street Hoodie',
      description: 'Premium cotton blend hoodie with embroidered logo. Perfect for everyday streetwear.',
      price: 89.99,
      category: 'hoodies',
      imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Gray', 'White'],
      stock: 25,
      isNew: true,
      isPopular: true,
      createdAt: new Date('2024-04-01')
    },
    {
      id: '2',
      name: 'Graphic Print T-Shirt',
      description: 'Limited edition graphic tee with artistic urban print. 100% organic cotton.',
      price: 45.99,
      category: 't-shirts',
      imageUrl: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Red'],
      stock: 50,
      isNew: true,
      isPopular: true,
      createdAt: new Date('2024-03-20')
    },
    {
      id: '3',
      name: 'Cargo Pants',
      description: 'Streetwear-inspired cargo pants with multiple pockets and adjustable waist.',
      price: 75.99,
      category: 'pants',
      imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Black', 'Olive', 'Beige'],
      stock: 30,
      isNew: false,
      isPopular: true,
      createdAt: new Date('2024-02-15')
    },
    {
      id: '4',
      name: 'Urban Sneakers',
      description: 'Comfortable and stylish sneakers perfect for urban environments.',
      price: 120.99,
      category: 'footwear',
      imageUrl: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Black', 'White', 'Gray'],
      stock: 15,
      isNew: false,
      isPopular: false,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '5',
      name: 'Streetwear Cap',
      description: 'Embroidered streetwear cap with adjustable strap and curved brim.',
      price: 35.99,
      category: 'accessories',
      imageUrl: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      sizes: ['One Size'],
      colors: ['Black', 'Navy', 'Red'],
      stock: 40,
      isNew: false,
      isPopular: true,
      createdAt: new Date('2024-03-05')
    }
  ];

  constructor() {}

  getProducts(filter?: ProductFilter): Observable<Product[]> {
    let filteredProducts = [...this.products];
    
    // Apply filters
    if (filter) {
      if (filter.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filter.category);
      }
      
      if (filter.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filter.minPrice!);
      }
      
      if (filter.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filter.maxPrice!);
      }
      
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchLower) || 
          p.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply sorting
      if (filter.sortBy) {
        filteredProducts.sort((a, b) => {
          let comparison = 0;
          
          switch (filter.sortBy) {
            case 'price':
              comparison = a.price - b.price;
              break;
            case 'createdAt':
              comparison = a.createdAt.getTime() - b.createdAt.getTime();
              break;
            case 'popularity':
              comparison = (a.isPopular === b.isPopular) ? 0 : (a.isPopular ? -1 : 1);
              break;
          }
          
          return filter.sortDirection === 'desc' ? -comparison : comparison;
        });
      }
    }
    
    return of(filteredProducts).pipe(delay(500)); // Simulate network delay
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product).pipe(delay(300)); // Simulate network delay
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    this.products.push(newProduct);
    return of(newProduct).pipe(delay(500)); // Simulate network delay
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    const updatedProduct = {
      ...this.products[index],
      ...product
    };
    
    this.products[index] = updatedProduct;
    return of(updatedProduct).pipe(delay(500)); // Simulate network delay
  }

  deleteProduct(id: string): Observable<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    
    return of(this.products.length !== initialLength).pipe(delay(500)); // Simulate network delay
  }
}