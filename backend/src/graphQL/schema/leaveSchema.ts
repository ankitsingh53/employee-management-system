export const leaveSchema = `#graphql
type Leave {
  id: ID!
  leaveType: String!
  startDate: String!
  endDate: String!
  reason: String!
  status: String!
  employee: Employee!
}

input ApplyLeaveInput {
  leaveType: String!
  startDate: String!
  endDate: String!
  reason: String!
}

input UpdateLeaveStatusInput {
  id: ID!
  status: String!
}

type LeaveResponse {
  message: String!
}

 type Query {
  myLeaves: [Leave!]!
  allLeaveRequests: [Leave!]!
}

 type Mutation {
  applyLeave(input: ApplyLeaveInput!): LeaveResponse!
  updateLeaveStatus(
    input: UpdateLeaveStatusInput!
  ): LeaveResponse!
}

`;