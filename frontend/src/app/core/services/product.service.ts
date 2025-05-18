/* import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product, ProductFilter } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Mock product data
  private products: Product[] = [];

  constructor() {}

  public createProduct(producto: Product): void {
    const payload = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      usuario: 1,  // Forzamos el id_usuario a 1 para probar
      foto: producto.foto
    };

    console.log('Payload enviado al servidor:', payload);

    return this.http.post(this.apiUrl, payload).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        console.log('Error completo:', error);
        console.log('Cuerpo del error:', error.error);
        throw error;
      })
    );
  }

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

}
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product } from '../models/product.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://44.214.111.49/api/productos'; // URL de tu API
  /* private apiUrl = 'http://127.0.0.1:8000/api/productos'; */
  public categories: Category[] = [];

  constructor(private http: HttpClient) { }

  public createProduct(product: Product):  Observable<Product> {
    const payload = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      frontImage: product.frontImage,
      aditionalPhotos: product.images,
      creationDate: product.createdAt
    };

    console.log('Payload enviado al servidor:', payload);

    return this.http.post<Product>(this.apiUrl, payload).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        console.log('Error completo:', error);
        console.log('Cuerpo del error:', error.error);
        throw error;
      })
    );
  }

  getProductos(): Observable<Product> {
    return this.http.get<Product>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }

  putProduct(id: number | undefined, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  patchProduct(id: number | undefined, product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }

  public getCategories(): void {
    this.categories = [];
    this.http.get<Category[]>(`${this.apiUrl}/categories`).subscribe({
      next: (response: Category[]) => {
        this.categories = response;
      }
    });
  }
}
