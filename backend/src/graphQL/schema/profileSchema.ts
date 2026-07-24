export const profileSchema = `#graphql

type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    designation: String!
    salary: Float!
    joiningDate: String!
    isActive: Boolean!
    role: String!
    department: [Department!]!
  }
    type Response {
      message: String!
    }

  type Query {
  viewProfile(id:ID!): Employee!
  }

  input UpdateProfile {
   id: ID!
   firstName: String!
   lastName: String!
   email:String!
   phoneNumber:String!
  }
   input PasswordInput {
     id: ID!
     currentPassword: String!
     newPassword: String!
   }

  type Mutation {
   updateProfile(input: UpdateProfile!): Employee!
   changePassword(input: PasswordInput!): Response
 }
  
`