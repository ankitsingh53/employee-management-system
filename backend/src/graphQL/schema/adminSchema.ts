export const adminSchema = `#graphql

type Employee {
 id: ID!
 firstName: String!
 lastName: String!
 email: String!
 role: String!
}
 type AdminDashboard {
  totalEmployees: Int!
  activeEmployees: Int!
  totalDepartments: Int!
  pendingLeaves: Int!
}

type AuthResponse {
  message: String!
}

type Query {
getMe: Employee
adminDashboard: AdminDashboard!
}


input LoginEmployeeInput {
email: String!
password: String!
}

type LogoutResponse {
  success: Boolean!
  message: String!
}

type Mutation {
loginAdmin (input: LoginEmployeeInput!): AuthResponse!
logoutAdmin: LogoutResponse!
}

`;
