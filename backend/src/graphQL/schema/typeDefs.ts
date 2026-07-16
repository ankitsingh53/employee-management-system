import { adminSchema } from "./adminSchema.js";
import { employeeSchema } from "./employeeSchema.js";
export const typeDefs = `#graphql
   ${adminSchema},
   ${employeeSchema},
`;
