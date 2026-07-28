import { requireAuth } from "../../middleware/authorization.js";
import { getProfile, changePassword, updateProfile } from "../../services/profileService.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";

import type { GraphQLContext } from "../../types/context.js";

interface EmptyArgs {}

interface ViewProfileArgs {
  id: number;
}

interface UpdateProfileInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface UpdateProfileArgs {
  input: UpdateProfileInput;
}

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordArgs {
  input: ChangePasswordInput;
}

export const profileResolver = {
  Query: {
    viewProfile: async (_: unknown,
  args: ViewProfileArgs,
  context: GraphQLContext) => {
      requireAuth(context);
      const id = args.id;
      return await getProfile(id);
    },
  },

  Mutation: {
    updateProfile: async (_: unknown,
  args: UpdateProfileArgs,
  context: GraphQLContext) => {
      const user = requireAuth(context);
      return await updateProfile(user.id, args.input)
    },

    changePassword: async (_: unknown,
  args: ChangePasswordArgs,
  context: GraphQLContext) => {
      const user = requireAuth(context)
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
      return await changePassword(user.id, data);      
    },
  },
};
