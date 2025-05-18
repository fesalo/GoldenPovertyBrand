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
  emailOrUsername: string = '';
  password: string = '';

  invalidUser: boolean = false;
  invalidPassword: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private usuariosService: UserService,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  openModal() {
    const modal = document.getElementById('registroModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  closeModal() {
    const modal = document.getElementById('registroModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  login(event: Event) {
    event.preventDefault();

    this.invalidUser = false;
    this.invalidPassword = false;

    if (!this.emailOrUsername || !this.password) return;

    this.usuariosService.getUsers().subscribe((users) => {
  const user = users.find(
    (u) =>
      u.email === this.emailOrUsername || u.username === this.emailOrUsername
  );

      if (!user) {
        this.invalidUser = true; // Marcar usuario como inválido
        return;
      }

      if (user.password !== this.password) {
        this.invalidPassword = true; // Marcar contraseña como inválida
        return;
      }

      this.closeModal();
      this.emailOrUsername = '';
      this.password = '';
    });
  }

  logout() {
    this.authService.logout();
    alert('Sesión cerrada');
  }

  hover = false;
}
