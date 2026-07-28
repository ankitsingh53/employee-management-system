export const leaveSchema = `#graphql
type Leave {
  id: ID!
  leaveType: String!
  startDate: String!
  endDate: String!
  reason: String!
  status: String!
  employee: Employee
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

type LeavePagination {
 leaves: [Leave!]!
 totalCount: Int!
}

 type Query {
  myLeaves: [Leave!]!
  allLeaveRequests(page: Int!, limit: Int!): LeavePagination!
}

 type Mutation {
  applyLeave(input: ApplyLeaveInput!): LeaveResponse!
  updateLeaveStatus(
    input: UpdateLeaveStatusInput!
  ): LeaveResponse!
  cancelLeave(id: ID!): LeaveResponse!
}

`;