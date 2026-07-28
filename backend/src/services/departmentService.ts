import { AppDataSource } from "../config/data-source.js";
import { Department } from "../entities/department.entity.js";

interface UpdateDepartmentData {
  department: string;
}

const departmentRepo = await AppDataSource.getRepository(Department);

export const getAllDepartment = async () => {
  const getDepartments = await departmentRepo.find({
    order: {
      createdAt: "ASC",
    },
  });
  if (!getDepartments) {
    throw new Error("No departments exist");
  }
  return getDepartments;
};

export const createDepartment = async (department: string) => {
  const getDepartment = await departmentRepo.findOne({
    where: { department },
  });
  if (getDepartment) {
    throw new Error("Department already exist.");
  }
  const addDepartment = departmentRepo.create({ department });
  return await departmentRepo.save(addDepartment);
};

export const changeDepartment = async (
  id: number,
  data: UpdateDepartmentData,
) => {
  const department = await departmentRepo.findOne({
    where: {
      id,
    },
  });
  if (!department) {
    throw new Error("No such department exist");
  }
  Object.assign(department, data);
  return await departmentRepo.save(department);
};

export const removeDepartment = async (id: number) => {
  const department = await departmentRepo.findOne({
    where: { id },
  });
  if (!department) {
    throw new Error("No such department exist");
  }
  await departmentRepo.remove(department);
  return {
    message: "Department deleted successfully",
  };
};
