import { getAdmin } from "../../services/employee/employee.service.js";
import { authAdmin } from "../../services/admin/adminService.js";
import { generateToken } from "../../utils/jwt.js";
import { requireAdmin, requireAuth } from "../../middleware/authorization.js";
import { getAdminDashboard } from "../../services/admin/adminService.js";
import type { GraphQLContext } from "../../types/context.js";

export interface LoginAdminArgs {
  input: {
    email: string;
    password: string;
  };
}

export interface EmptyArgs {}

export const adminResolvers = {
  Query: {
    getMe: async (_: unknown, args: EmptyArgs, context: GraphQLContext) => {
      const user = requireAdmin(context);
      const adminData = await getAdmin(user.id);
      return adminData;
    },
    adminDashboard: async (
      _: unknown,
      args: EmptyArgs,
      context: GraphQLContext,
    ) => {
      requireAdmin(context);

      return await getAdminDashboard();
    },
  },

  Mutation: {
    loginAdmin: async (
      _: unknown,
      args: LoginAdminArgs,
      context: GraphQLContext,
    ) => {
      const { email, password } = args.input;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
      if (!email.trim()) {
        throw new Error("Email is Required");
      } else if (!emailRegex.test(email)) {
        throw new Error("Enter valid email and must include @");
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
      if (!password.trim()) {
        throw new Error("Password is required");
      } else if (!passwordRegex.test(password)) {
        throw new Error(
          "Password must be minimum 4 characters, 1 letter & 1 digit",
        );
      }
      try {
        const admin = await authAdmin(email);
        if (!admin) {
          throw new Error("No admin found!");
        }
        const isMatch = password === admin.password;
        if (!isMatch) {
          throw new Error("Invalid email or password");
        }
        const token = generateToken({
          id: admin.id,
          email: admin.email,
          role: admin.role,
        });
        context.res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        return {
          token,
          message: "You logged in Successfully",
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
    logoutAdmin: async (
      _: unknown,
      args: EmptyArgs,
      context: GraphQLContext,
    ) => {
      context.res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return {
        success: true,
        message: "Logged out successfully",
      };
    },
  },
};
