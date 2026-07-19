export const departmentSchema = `#graphql
   type Department {
     id: ID!
     department: String!
   }

   type Query {
    viewDepartment: [Department!]!
   }

   type DeleteResponse {
    message:String!
   }

   input CreateDepartment {
     department: String!
   }
    input UpdateDepartment {
     id: ID!
     department: String!
   }

   type Mutation {
    addDepartment(input:CreateDepartment!): Department!
    updateDepartment(input:UpdateDepartment!):Department
    deleteDepartment(id:ID!): DeleteResponse
   }
`