import { getProfile, changePassword } from "../../services/profileService.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
export const profileResolver = {
  Query: {
    viewProfile: async (parent: any, args: any) => {
      const id = args.id;
      console.log(id);
      return await getProfile(id);
    },
  },

  Mutation: {
    updateProfile: async (parent: any, args: any) => {
      console.log(args);
      const { id, ...updateData } = args.input;
      console.log(id, updateData);
    },
    changePassword: async (parent: any, args: any) => {
      const data = args.input;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
      if (!data.currentPassword.trim()) {
        throw new Error("Password is required");
      } else if (!passwordRegex.test(data.currentPassword)) {
        throw new Error(
          "Password must be minimum 4 characters, one letter & one digit",
        );
      }
      if (!data.newPassword.trim()) {
        throw new Error("Password is required");
      } else if (!passwordRegex.test(data.newPassword)) {
        throw new Error(
          "Password must be minimum 4 characters, one letter & one digit",
        );
      }
      // console.log(data.id, data.currentPassword, data.newPassword)
      return await changePassword(data);      
    },
  },
};
