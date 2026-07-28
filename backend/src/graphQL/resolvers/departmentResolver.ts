import { requireAdmin } from "../../middleware/authorization.js";
import {
  createDepartment,
  getAllDepartment,
} from "../../services/departmentService.js";
import { changeDepartment } from "../../services/departmentService.js";
import { removeDepartment } from "../../services/departmentService.js";
import type { GraphQLContext } from "../../types/context.js";


interface EmptyArgs {}

interface DeleteDepartmentArgs {
  id: number;
}

interface DepartmentInput {
  input: {
    department: string;
  };
}

interface UpdateDepartmentArgs {
  input: {
    id: number;
    department: string;
  };
}

export const departmentResolver = {
  Query: {
    viewDepartment: async (_: unknown, args: EmptyArgs, context: GraphQLContext) => {
      requireAdmin(context);
      return await getAllDepartment();
    },
  },
  Mutation: {
    addDepartment: async (_: unknown, args: DepartmentInput, context: GraphQLContext) => {
      requireAdmin(context)
      const { department } = args.input;
      const stringPattern = /^[A-Za-z\s'\-\/\\ ]+$/;
      if (!department.trim()) {
        throw new Error("Department is required and cannot be empty.");
      } else if (!stringPattern.test(department)) {
        throw new Error("Only Characters are allowed");
      }

      return await createDepartment(department);
    },

    updateDepartment: async (_: unknown, args: UpdateDepartmentArgs, context: GraphQLContext) => {
      requireAdmin(context)
      const { id, ...data } = args.input;
      const stringPattern = /^[A-Za-z\s'\-\/\\ ]+$/;
      if (!data.department.trim()) {
        throw new Error("Department is required and cannot be empty.");
      } else if (!stringPattern.test(data.department)) {
        throw new Error("Only Characters are allowed");
      }

      return await changeDepartment(id, data);
    },

    deleteDepartment: async (_: unknown, args: DeleteDepartmentArgs, context: GraphQLContext) => {
      requireAdmin(context)
      const id = args.id;
      return await removeDepartment(id);
    },
  },
};
