export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
