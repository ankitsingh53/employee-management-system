export interface EmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  designation: string;
  salary: number;
  joiningDate: string;
  departmentId: number;
}

export interface UpdateEmployeeInput extends EmployeeInput {
  id: number;
}

export interface GetEmployeeArgs {
  page: number;
  limit: number;
  search?: string;
  searchBy?: string;
}

export interface EmployeeIdArgs {
  id: number;
}