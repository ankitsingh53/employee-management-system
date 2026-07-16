import { adminResolvers } from "./adminResolver.js";
import { employeeResolver } from "./employeeResolver.js";

export const resolvers = {
  Query: {
    ...adminResolvers.Query,
    ...employeeResolver.Query,
  },

  Mutation: {
    ...adminResolvers.Mutation,
    ...employeeResolver.Mutation,
  },
};
