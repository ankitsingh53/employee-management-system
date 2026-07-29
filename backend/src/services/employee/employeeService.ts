import { AppDataSource } from "../../config/data-source.js";
import { Department } from "../../entities/department.entity.js";
import { Employee } from "../../entities/employee.entity.js";
import type { EmployeeInput } from "../../graphQL/types/employee.js";
import { sendRegisterMail } from "../../utils/email.js";

const employeeRepo = await AppDataSource.getRepository(Employee);
const departmentRepo = await AppDataSource.getRepository(Department);

export const getAllEmployee = async (
  page: number,
  limit: number,
  search?: string,
  searchBy?: string,
) => {
  const query = employeeRepo
    .createQueryBuilder("employee")
    .leftJoinAndSelect("employee.department", "department")
    .where("employee.role = :role", { role: "EMPLOYEE" });

  if (search?.trim()) {
    switch (searchBy) {
      case "firstName":
        query.andWhere("employee.firstName ILIKE :search", {
          search: `%${search}%`,
        });
        break;

      case "email":
        query.andWhere("employee.email ILIKE :search", {
          search: `%${search}%`,
        });
        break;

      case "designation":
        query.andWhere("employee.designation ILIKE :search", {
          search: `%${search}%`,
        });
        break;

      case "joiningDate":
        query.andWhere("employee.joiningDate = :search", {
          search,
        });
        break;

      case "department":
        query.andWhere("department.department ILIKE :search", {
          search: `%${search}%`,
        });
        break;

      default:
        query.andWhere(
          "(employee.firstName ILIKE :search OR employee.lastName ILIKE :search)",
          {
            search: `%${search}%`,
          },
        );
    }
  }

  query
    .orderBy("employee.id", "DESC")
    .skip((page - 1) * limit)
    .take(limit);

  const [employees, totalCount] = await query.getManyAndCount();

  return {
    employees,
    totalCount,
  };
};

export const employeeByID = async (id: number) => {
  const getEmployeeDetails = await employeeRepo.findOne({
    relations: {
      department: true,
    },
    where: {
      role: "EMPLOYEE",
      id,
    },
  });
  if (!getEmployeeDetails) {
    throw new Error("Employee not found");
  }
  return await getEmployeeDetails;
};
export const addEmployee = async (data: EmployeeInput) => {
  const existingEmployee = await employeeRepo.findOne({
    where: {
      role: "EMPLOYEE",
      email: data.email,
    },
  });
  if (existingEmployee?.email.length) {
    throw new Error("Employee already exit.");
  }
  const department = await departmentRepo.findOne({
    where: {
      id: data.departmentId,
    },
  });
  if (!department) {
    throw new Error("Department not found");
  }
  const createEmployee = employeeRepo.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    designation: data.designation,
    salary: data.salary,
    joiningDate: data.joiningDate,
  });
  createEmployee.department = [department];

  

 const savedEmployee = await employeeRepo.save(createEmployee);

  await sendRegisterMail(
    createEmployee.email,
    createEmployee.firstName,
    createEmployee.lastName,
  );
  return savedEmployee;
};

export const updateEmployee = async (
  id: number,
  updatedData: EmployeeInput,
) => {
  const getEmployee = await employeeRepo.findOne({
    where: {
      id,
      role: "EMPLOYEE",
    },
    relations: {
      department: true,
    },
  });
  if (!getEmployee) {
    throw new Error("Employee not found");
  }
  const department = await departmentRepo.findOne({
    where: {
      id: updatedData.departmentId,
    },
  });
  if (!department) {
    throw new Error("Department not found");
  }
  const { departmentId, ...employeeData } = updatedData;
  Object.assign(getEmployee, employeeData);
  getEmployee.department = [department];
  return await employeeRepo.save(getEmployee);
};

export const deleteEmployee = async (id: number) => {
  const getEmployee = await employeeRepo.findOne({
    where: {
      role: "EMPLOYEE",
      id,
    },
  });
  if (!getEmployee) {
    throw new Error("Employee not found");
  }

  getEmployee.status = getEmployee.status === true ? false : true;
  await employeeRepo.save(getEmployee);
  return {
    message: `Employee ${
      getEmployee.status === true ? "activated" : "deactivated"
    } successfully.`,
  };
};
