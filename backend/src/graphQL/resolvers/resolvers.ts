import { adminResolvers } from "./adminResolver.js";
import { departmentResolver } from "./departmentResolver.js";
import { employeeResolver } from "./employeeResolver.js";
import { profileResolver } from "./profileResolver.js";
import { userResolver } from "./userResolver.js";

export const resolvers = {
  Query: {
    ...adminResolvers.Query,
    ...employeeResolver.Query,
    ...userResolver.Query,
    ...profileResolver.Query,
    ...departmentResolver.Query,
  },

  Mutation: {
    ...adminResolvers.Mutation,
    ...employeeResolver.Mutation,
    ...userResolver.Mutation,
    ...departmentResolver.Mutation
  },
};
