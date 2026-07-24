import { exitingEmployee } from "../../services/userService/userService.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { saveEmployee } from "../../services/userService/userService.js";
import { generateToken } from "../../utils/jwt.js";
import { getMe } from "../../services/userService/userService.js";
export const userResolver = {
  Query: {
    getUser: async (parent: any, args: any, context: any) => {
      if (!context.user) {
        throw new Error("Unauthorized user");
      }
      const employeeDetails = await getMe(context.user.id);
      return employeeDetails;
    },
  },

  Mutation: {
    registerEmployee: async (parent: any, args: any) => {
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
        } else {
          console.log("An unexpected error occurred", error);
        }
      }
    },
    loginEmployee: async (parent: any, args: any, context: any) => {
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
        if (getEmployee.password === null) {
          throw new Error("Please register before login...");
        }

        const isMatch = comparePassword(password, getEmployee.password);
        console.log(getEmployee.password)
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
    logoutEmployee: async (parent: any, args: any, context: any) => {
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
