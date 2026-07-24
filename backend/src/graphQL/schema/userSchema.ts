export const userSchema = `#graphql
type Employee {
 id: ID!
 firstName: String!
 lastName: String!
 email: String!
 role: String!
}
type AuthResponse {
  token: String
  message: String
}
type Query {
getUser: Employee
}
input RegisterEmployee {
  firstName: String!
  lastName: String!
  email: String!
  password: String!

}
input LoginEmployee {
email: String!
password: String!
}
type LogoutResponse {
  success: Boolean!
  message: String!
}
type Mutation {
registerEmployee(input: RegisterEmployee!): Employee!
loginEmployee (input: LoginEmployee!): AuthResponse!
logoutEmployee: LogoutResponse!
}
`;
