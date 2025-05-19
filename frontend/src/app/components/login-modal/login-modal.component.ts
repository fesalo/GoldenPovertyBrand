import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  standalone: true,
  selector: 'app-login-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css',
})
export class LoginModalComponent {
  public emailOrUsername: string = '';
  public password: string = '';

  public invalidUser: boolean = false;
  public invalidPassword: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  public openModal() {
    const modal = document.getElementById('registroModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  public closeModal() {
    const modal = document.getElementById('registroModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  public login(event: Event) {
    event.preventDefault();

    this.invalidUser = false;
    this.invalidPassword = false;

    if (!this.emailOrUsername || !this.password) return;

    this.userService.getUsers().subscribe((users) => {
      const user = users.find(
        (u) =>
          u.email === this.emailOrUsername || u.userName === this.emailOrUsername
      );

      if (!user) {
        this.invalidUser = true; // Marcar usuario como inválido
        return;
      }

      if (user.password !== this.password) {
        this.invalidPassword = true; // Marcar contraseña como inválida
        return;
      }
      this.authService.login(user.isAdmin);

      this.closeModal();
      this.emailOrUsername = '';
      this.password = '';
    });
  }

  public logout() {
    this.authService.logout();
    alert('Sesión cerrada');
  }

}
