import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: Product | null = null;
  relatedProducts: Product[] = [
    {
      id: 1,
      name: 'Classic Denim Jacket',
      description: 'A timeless piece with modern design and excellent quality.',
      price: 89.99,
      rating: 4.5,
      stock: 12,
      category: 'Jackets',
      imageUrl: 'https://via.placeholder.com/500x500'
    }
  ];

  ngOnInit(): void {
    // Simulación de producto
    this.product = {
      id: 1,
      name: 'Classic Denim Jacket',
      description: 'A timeless piece with modern design and excellent quality.',
      price: 89.99,
      rating: 4.5,
      stock: 12,
      category: 'Jackets',
      imageUrl: 'https://via.placeholder.com/500x500'
    };

    // Simulación de productos relacionados
    this.relatedProducts = [
      {
        id: 2,
        name: 'Slim Fit Jeans',
        description: 'Perfect match for your jacket.',
        price: 59.99,
        rating: 4.2,
        stock: 25,
        category: 'Jeans',
        imageUrl: 'https://via.placeholder.com/300x300'
      },
      {
        id: 3,
        name: 'Leather Boots',
        description: 'Stylish and durable boots.',
        price: 120.00,
        rating: 4.8,
        stock: 8,
        category: 'Footwear',
        imageUrl: 'https://via.placeholder.com/300x300'
      }
    ];
  }
}
