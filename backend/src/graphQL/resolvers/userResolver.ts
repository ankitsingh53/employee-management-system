import {
  exitingEmployee,
  savePassword,
} from "../../services/userService/userService.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { saveEmployee } from "../../services/userService/userService.js";
import { generateToken } from "../../utils/jwt.js";
import { getMe } from "../../services/userService/userService.js";
import { requireAuth } from "../../middleware/authorization.js";

import type { GraphQLContext } from "../../types/context.js";

interface EmptyArgs {}

interface RegisterEmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterEmployeeArgs {
  input: RegisterEmployeeInput;
}

interface LoginEmployeeInput {
  email: string;
  password: string;
}

interface LoginEmployeeArgs {
  input: LoginEmployeeInput;
}

interface ForgotPasswordArgs {
  input: LoginEmployeeInput;
}

export const userResolver = {
  Query: {
    getUser: async (_: unknown, __: EmptyArgs, context: GraphQLContext) => {
      const user = requireAuth(context);
      const employeeDetails = await getMe(user.id);
      return employeeDetails;
    },
  },

  Mutation: {
    registerEmployee: async (_: unknown, args: RegisterEmployeeArgs) => {
      const { firstName, lastName, email, password } = args.input;
      const stringPattern = /^[A-Za-z\s'-]+$/;
      if (!firstName.trim()) {
        throw new Error("First name is required!");
      } else if (firstName.length < 3) {
        throw new Error("Name cannot be less than 3 characters");
      } else if (!stringPattern.test(firstName)) {
        throw new Error("Enter valid first name characters");
      }
      if (!lastName.trim()) {
        throw new Error("Last name is required!");
      } else if (lastName.length < 3) {
        throw new Error("Name cannot be less than 3 characters");
      } else if (!stringPattern.test(lastName)) {
        throw new Error("Enter valid last name characters");
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
      if (!email.trim()) {
        throw new Error("Email is required!");
      } else if (!emailRegex.test(email)) {
        throw new Error("Enter valid email address! (must include @ )");
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
      if (!password.trim()) {
        throw new Error("Password is required");
      } else if (!passwordRegex.test(password)) {
        throw new Error(
          "Password must be minimum 4 characters, one letter & one digit",
        );
      }
      try {
        const getEmployee = await exitingEmployee(email);
        if (getEmployee.isRegistered) {
          throw new Error("Employee is already registered ! please login...");
        }
        const hashpass = await hashPassword(password);

        return await saveEmployee(getEmployee.email, hashpass);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
    loginEmployee: async (
      _: unknown,
      args: LoginEmployeeArgs,
      context: GraphQLContext,
    ) => {
      const { email, password } = args.input;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
      if (!email.trim()) {
        throw new Error("Email is required!");
      } else if (!emailRegex.test(email)) {
        throw new Error("Enter valid email address! (must include @ )");
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
      if (!password.trim()) {
        throw new Error("Password is required");
      } else if (!passwordRegex.test(password)) {
        throw new Error(
          "Password must be minimum 4 characters, one letter & one digit",
        );
      }
      try {
        const getEmployee = await exitingEmployee(email);
        if (!getEmployee.isRegistered) {
          throw new Error("Please register before login...");
        }

        const isMatch = await comparePassword(password, getEmployee.password);
        if (!isMatch) {
          throw new Error("Invalid email or password");
        }
        const token = generateToken({
          id: Number(getEmployee.id),
          email: getEmployee.email,
          role: getEmployee.role,
        });
        context.res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
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
    logoutEmployee: async (
      _: unknown,
      __: EmptyArgs,
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
    forgotPassword: async (_: unknown, args: ForgotPasswordArgs) => {
      const { email, password } = args.input;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
      if (!email.trim()) {
        throw new Error("Email is required!");
      } else if (!emailRegex.test(email)) {
        throw new Error("Enter valid email address! (must include @ )");
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
      if (!password.trim()) {
        throw new Error("Password is required");
      } else if (!passwordRegex.test(password)) {
        throw new Error(
          "Password must be minimum 4 characters, one letter & one digit",
        );
      }
      try {
        const getEmployee = await exitingEmployee(email);
        if (!getEmployee.isRegistered) {
          throw new Error("Please register before login...");
        }
        const hashpass = await hashPassword(password);

        return await savePassword(getEmployee.email, hashpass);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
  },
};
