import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Mock admin user
  private adminUser: User = {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    isAdmin: true
  };

  constructor() {}

  initializeAuthFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  login(loginRequest: LoginRequest): Observable<User> {
    // For demo purposes, hardcoded admin authentication
    if (loginRequest.username === 'admin' && loginRequest.password === 'admin123') {
      return of(this.adminUser).pipe(
        delay(800), // Simulate network delay
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
    }
    
    // In a real app, you would make an HTTP request to your backend
    return throwError(() => new Error('Invalid username or password'));
  }

  register(registerRequest: RegisterRequest): Observable<User> {
    // In a real app, you would make an HTTP request to your backend
    // This is a mock implementation
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: registerRequest.username,
      email: registerRequest.email,
      isAdmin: false
    };
    
    return of(newUser).pipe(
      delay(800), // Simulate network delay
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.isAdmin || false;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}