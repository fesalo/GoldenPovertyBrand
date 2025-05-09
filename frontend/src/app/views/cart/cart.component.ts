import { Component } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 29.99,
      size: 'M',
      color: 'White',
      quantity: 2,
      image: ''
    },
    {
      id: 2,
      name: 'Premium Hoodie',
      price: 59.99,
      size: 'L',
      color: 'Black',
      quantity: 1,
      image: ''
    }
  ];

  updateQuantity(id: number, newQuantity: number): void {
    if (newQuantity < 1) return;
    this.cartItems = this.cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get shipping(): number {
    return this.subtotal > 100 ? 0 : 10;
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }
}
