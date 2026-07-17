export const profileSchema = `#graphql
  type Employee {
    id: ID!
    firstName: String!
    lastName:String!
    email:String!
    phoneNumber:String!
    designation:String!
    joiningDate: String!
  }

  type Query {
  viewProfile(id:ID!): Employee!
  }

  input UpdateProfile {
   firstName: String!
   lastName: String!
   email:String!
   phoneNumber:String!
  }

`