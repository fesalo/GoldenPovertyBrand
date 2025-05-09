import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/* import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';
import { Cart } from '../../models/cart.model'; */

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: `./header.component.html`,
  styleUrl: `./header.component.css`,
})
export class HeaderComponent {
 /*  currentUser: User | null = null;
  cart: Cart | null = null;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }

  getCartItemCount(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((count, item) => count + item.quantity, 0);
  } */
}
