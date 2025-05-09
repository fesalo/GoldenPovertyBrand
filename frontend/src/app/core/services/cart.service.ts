import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem, Order, ShippingDetails, PaymentMethod } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({ items: [], total: 0 });
  public cart$ = this.cartSubject.asObservable();
  
  // Mock orders data
  private orders: Order[] = [];

  constructor() {
    // Initialize cart from localStorage if available
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const cart = JSON.parse(storedCart);
        this.cartSubject.next(cart);
      } catch (error) {
        localStorage.removeItem('cart');
        this.cartSubject.next({ items: [], total: 0 });
      }
    }
  }

  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  addToCart(item: Omit<CartItem, 'quantity'>): void {
    const currentCart = this.cartSubject.value;
    const existingItemIndex = currentCart.items.findIndex(
      i => i.productId === item.productId && i.size === item.size && i.color === item.color
    );
    
    let updatedItems: CartItem[];
    
    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      updatedItems = currentCart.items.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
    } else {
      // Add new item
      updatedItems = [...currentCart.items, { ...item, quantity: 1 }];
    }
    
    const updatedCart = {
      items: updatedItems,
      total: this.calculateTotal(updatedItems)
    };
    
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  updateItemQuantity(productId: string, size: string, color: string, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.map(item => {
      if (item.productId === productId && item.size === size && item.color === color) {
        return { ...item, quantity };
      }
      return item;
    });
    
    const updatedCart = {
      items: updatedItems,
      total: this.calculateTotal(updatedItems)
    };
    
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  removeItem(productId: string, size: string, color: string): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.filter(
      item => !(item.productId === productId && item.size === size && item.color === color)
    );
    
    const updatedCart = {
      items: updatedItems,
      total: this.calculateTotal(updatedItems)
    };
    
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  clearCart(): void {
    const emptyCart = { items: [], total: 0 };
    this.cartSubject.next(emptyCart);
    this.saveCartToStorage(emptyCart);
  }

  checkout(userId: string, shippingDetails: ShippingDetails, paymentMethod: PaymentMethod): Observable<Order> {
    return new Observable(observer => {
      setTimeout(() => {
        const currentCart = this.cartSubject.value;
        
        if (currentCart.items.length === 0) {
          observer.error(new Error('Cart is empty'));
          return;
        }
        
        const order: Order = {
          id: Math.random().toString(36).substr(2, 9),
          userId,
          items: [...currentCart.items],
          total: currentCart.total,
          shippingDetails,
          paymentMethod,
          status: 'pending',
          createdAt: new Date()
        };
        
        // Save order
        this.orders.push(order);
        
        // Clear cart after successful checkout
        this.clearCart();
        
        observer.next(order);
        observer.complete();
      }, 1000); // Simulate network delay
    });
  }

  getOrders(userId: string): Observable<Order[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const userOrders = this.orders.filter(order => order.userId === userId);
        observer.next(userOrders);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  getAllOrders(): Observable<Order[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next([...this.orders]);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }
}