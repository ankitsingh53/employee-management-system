import { adminSchema } from "./adminSchema.js";
import { departmentSchema } from "./departmentSchema.js";
import { employeeSchema } from "./employeeSchema.js";
import { profileSchema } from "./profileSchema.js";
import { userSchema } from "./userSchema.js";
export const typeDefs = `#graphql
   ${adminSchema},
   ${employeeSchema},
   ${userSchema},
   ${profileSchema},
   ${departmentSchema},
`;
