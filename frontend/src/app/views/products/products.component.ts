import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Product, Category } from '../../core/models/product.model';
import { CardComponent, FilterComponent } from './components';

interface SortOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, FilterComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 29.99,
      description: 'Comfortable cotton t-shirt for everyday wear',
      category: 1,
      image: '',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Premium Hoodie',
      price: 59.99,
      description: 'Warm and stylish hoodie for cold days',
      category: 2,
      image: '',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Sport Cap',
      price: 19.99,
      description: 'Lightweight cap with adjustable strap',
      category: 3,
      image: '',
      rating: 4.2,
    },
    {
      id: 4,
      name: 'Slim Fit Jeans',
      price: 49.99,
      description: 'Modern slim fit jeans with stretch fabric',
      category: 3,
      image: '',
      rating: 4.6,
    },
    {
      id: 5,
      name: 'Graphic T-Shirt',
      price: 34.99,
      description: 'Unique graphic print on premium cotton',
      category: 1,
      image: '',
      rating: 4.3,
    },
    {
      id: 6,
      name: 'Winter Jacket',
      price: 89.99,
      description: 'Warm insulated jacket for winter',
      category: 3,
      image: '',
      rating: 4.7,
    },
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
          return b.id - a.id;
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

  setPriceRange(value: number): void {
    this.priceRange = [this.priceRange[0], value];
  }
}
