export interface Department {
  id: number;
  department: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  designation: string | null;
  joiningDate: string | null;
  salary: number | null;
  role: "ADMIN" | "EMPLOYEE";
  department: Department[] | null;
}

export interface AuthState {
  user: User | null;
  role: 'ADMIN' | 'EMPLOYEE' | null;
  isAuthenticated: boolean;
  loading: boolean;
}