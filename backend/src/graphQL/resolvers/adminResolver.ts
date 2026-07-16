import { getAdmin } from "../../services/employee/employee.service.js";
import { authAdmin } from "../../services/auth/auth.service.js";
import { generateToken } from "../../utils/jwt.js";

export const adminResolvers = {
  Query: {
    getMe: async (parent: any, args: any, context: any) => {
      if (!context.user) {
        throw new Error("Unauthorized user");
      }
      const adminData = await getAdmin(context.user.id);
      return adminData;
    },
  },

  Mutation: {
    login: async (parent: any, args: any, context: any) => {
      const { email, password } = args.input;
      if (!email.trim() || !password.trim()) {
        throw new Error("All fields Required");
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
          sameSite: "Strict",
        });
        return {
          token,
          message: "You logged in Successfully",
          admin,
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          console.log("An unexpected error occurred", error);
        }
      }
    },
    logout: async (parent: any, args: any, context: any) => {
      context.res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
      return {
        success: true,
        message: "Logged out successfully",
      };
    },
  },
};
