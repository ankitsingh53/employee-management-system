import { AppDataSource } from "../config/data-source.js";
import { Employee } from "../entities/employee.entity.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";

const profileRepo = await AppDataSource.getRepository(Employee);

interface UpdateProfileInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export const getProfile = async (id: number) => {
  const data = await profileRepo.findOne({
    where: {
      id,
      role: "EMPLOYEE",
    },
    relations: {
      department: true,
    },
  });
  if (!data) {
    throw new Error("No Employee found");
  }
  return data;
};

export const updateProfile = async (id: number, data: UpdateProfileInput) => {
  const currentUser = await profileRepo.findOne({
    where: {
      id,
      role: "EMPLOYEE",
    },
    relations: {
      department: true,
    },
  });
  if (!currentUser) {
    throw new Error("Employee not found !");
  }
  currentUser.firstName = data.firstName;
  currentUser.lastName = data.lastName;
  currentUser.email = data.email;
  currentUser.phoneNumber = data.phoneNumber;

  await profileRepo.save(currentUser);
  return currentUser;
};

export const changePassword = async (id: number, data: ChangePasswordInput) => {
  console.log("Service", data);
  const getUser = await profileRepo.findOne({
    where: {
      id,
    },
  });
  if (!getUser) {
    throw new Error("Current user is not found");
  }
  console.log(getUser);

  const isMatch = await comparePassword(data.currentPassword, getUser.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Current Password is wrong!!");
  }
  const hashNewPassword = await hashPassword(data.newPassword);

  console.log(hashNewPassword);

  getUser.password = hashNewPassword;

  console.log(getUser);

  await profileRepo.save(getUser);
  return {
    message: "Password changed successfully.",
  };
};
