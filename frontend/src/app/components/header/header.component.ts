import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../../core/services/auth.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginModalComponent],
  templateUrl: `./header.component.html`,
  styleUrl: `./header.component.css`,
})
export class HeaderComponent {
  constructor( private authService: AuthService ) {};

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
