import { Component, OnInit } from '@angular/core';
import { Product, Category } from '../../core/models/product.model';
import { CardComponent, FilterComponent } from './components';
import { ProductStateService } from '../../core/services/product-state.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

interface SortOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, FilterComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public isAdmin$!: Observable<boolean>;

  constructor(private router: Router, public service: ProductService, public authService: AuthService) { }

   ngOnInit(): void {
      this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe(isAdmin => {
      console.log('Estado de admin:', isAdmin);
    });
  }

  products: Product[] = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 29.99,
      description: 'Comfortable cotton t-shirt for everyday wear',
      category: 1,
      images: [''],
      frontImage: '',
      stock: 2,
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 49.99,
      description: 'Stylish slim fit jeans with stretchable fabric',
      category: 2,
      images: [''],
      frontImage: '',
      stock: 5,
    },
    {
      id: 3,
      name: 'Hooded Sweatshirt',
      price: 39.99,
      description: 'Warm and cozy hoodie for cool weather',
      category: 1,
      images: [''],
      frontImage: '',
      stock: 3,
    },
    {
      id: 4,
      name: 'Summer Dress',
      price: 34.99,
      description: 'Lightweight dress perfect for summer days',
      category: 3,
      images: [''],
      frontImage: '',
      stock: 4,
    },
    {
      id: 5,
      name: 'Running Shoes',
      price: 59.99,
      description: 'Comfortable and durable shoes for running',
      category: 4,
      images: [''],
      frontImage: '',
      stock: 6,
    }
  ];

  categories: Category[] = [
    { id: 0, name: 'Todos' },
    { id: 1, name: 'Camisetas' },
    { id: 2, name: 'Hoodies' },
    { id: 3, name: 'Accesorios' },
  ];

  sortOptions: SortOption[] = [
    { id: 1, name: 'Price: Low to High' },
    { id: 2, name: 'Price: High to Low' },
    { id: 3, name: 'Alphabetic: A-Z' },
    { id: 4, name: 'Alphabetic: Z-A' },
  ];

  selectedCategories: number[] = [0];
  sortOption?: number = 0;
  showFilters: boolean = false;
  priceRange: [number, number] = [0, 100];

  get filteredProducts(): Product[] {
    let filtered =
      this.selectedCategories.length === 0 || this.selectedCategories.includes(0)
        ? this.products
        : this.products.filter(product =>
          this.selectedCategories.includes(product.category)
        );

    filtered = filtered.filter(product =>
      product.price >= this.priceRange[0] && product.price <= this.priceRange[1]
    );

    return filtered;
  }

  get sortedProducts(): Product[] {
    return [...this.filteredProducts].sort((a, b) => {
      switch (this.sortOption) {
        case 1:
          return a.price - b.price;
        case 2:
          return b.price - a.price;
        case 3:
          return a.name.localeCompare(b.name);
        case 4:
          return b.name.localeCompare(a.name);
        default:
          return b.price - a.price;
      }
    });
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = Number(target.value);
    this.setSortOption(value);
  }

  onSelectedCategories(categoryIds: number[]): void {
    this.selectedCategories = categoryIds;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  setSortOption(optionId?: number): void {
    this.sortOption = optionId;
  }

  public addProduct(): void {
    this.router.navigate(['/create-product']);
  }

  public deleteProduct(id: number): void {
    this.products = this.products.filter((producto) => producto.id !== id);
    this.service.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(producto => producto.id !== id);
    });
  }
}
