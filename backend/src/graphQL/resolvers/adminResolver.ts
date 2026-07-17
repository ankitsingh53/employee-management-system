import { getAdmin } from "../../services/employee/employee.service.js";
import { authAdmin } from "../../services/admin/adminService.js";
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
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
      if (!email.trim()) {
        throw new Error("Email is Required");
      }
      else if(!emailRegex.test(email)){
        throw new Error("Enter valid email and must include @")
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/
      if(!password.trim()){
        throw new Error("Password is required")
      }
      else if (!passwordRegex.test(password)){
        throw new Error("Password must be minimum 4 characters, one letter & one digit")
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
