import { isContext } from "node:vm";
import { requireAuth } from "../../middleware/authorization.js";
import { getProfile, changePassword, updateProfile } from "../../services/profileService.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
export const profileResolver = {
  Query: {
    viewProfile: async (_:any, args: any, context:any) => {
      requireAuth(context);
      const id = args.id;
      return await getProfile(id);
    },
  },

  Mutation: {
    updateProfile: async (parent: any, args: any, context:any) => {
      const user = requireAuth(context);
      return await updateProfile(user.id, args.input)
    },

    changePassword: async (parent: any, args: any, context:any) => {
      requireAuth(context)
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
      return await changePassword(context.user.id, data);      
    },
  },
};
