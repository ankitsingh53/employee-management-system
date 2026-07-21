export const adminSchema = `#graphql

type Employee {
 id: ID!
 firstName: String!
 lastName: String!
 email: String!
 role: String!
}

type AuthResponse {
  message: String!
}

type Query {
getMe: Employee
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
