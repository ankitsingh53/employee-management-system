export interface Department {
  id: number;
  department: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  designation: string | null;
  joiningDate: string | null;
  salary: number | null;
  role: "ADMIN" | "EMPLOYEE";
  status: boolean;
  department: Department[] | null;
}

export interface AuthState {
  user: User | null;
  role: "ADMIN" | "EMPLOYEE" | null;
  isAuthenticated: boolean;
  loading: boolean;
}
