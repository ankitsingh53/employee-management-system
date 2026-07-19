export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
}

export interface AuthState {
  user: User | null;
  role: 'ADMIN' | 'EMPLOYEE' | null;
  isAuthenticated: boolean;
  loading: boolean;
}