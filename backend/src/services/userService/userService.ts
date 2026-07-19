import { AppDataSource } from "../../config/data-source.js";
import { Employee } from "../../entities/employee.entity.js";

const userRepo = await AppDataSource.getRepository(Employee);

export const exitingEmployee = async (email: string) => {
  const checkEmployee = await userRepo.findOne({
    where: {
      email,
      role: "EMPLOYEE",
    },
  });
  if (!checkEmployee) {
    throw new Error("You are not an employee of this organisation");
  }

  return checkEmployee;
};

export const saveEmployee = async (email: string, password: string) => {
  const getEmployee = await userRepo.findOne({
    where: {
      email,
      role: "EMPLOYEE",
    },
  });

  if (getEmployee) {
    getEmployee.password = password;
    getEmployee.isRegistered = true;

    await userRepo.save(getEmployee);
  }
  return getEmployee;
};

export const getMe = async (id: number) => {
  const data = await userRepo.findOne({
    where: { id },
  });
  return data;
};
