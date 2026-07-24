import { AppDataSource } from "../../config/data-source.js";
import { Department } from "../../entities/department.entity.js";
import { Employee } from "../../entities/employee.entity.js";

const employeeRepo = await AppDataSource.getRepository(Employee);
const departmentRepo = await AppDataSource.getRepository(Department);

export const getAllEmployee = async () => {
  const employeeDetails = await employeeRepo.find({
    relations: {
      department: true,
    },
    where: {
      role: "EMPLOYEE",
    },
  });
  if (!employeeDetails) {
    throw new Error("No employee has been registered yet!");
  }
  return employeeDetails;
};
export const employeeByID = async (id: number) => {
  const getEmployeeDetails = await employeeRepo.findOne({
    relations:{
      department:true
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
export const addEmployee = async (data: any) => {
  const existingEmployee = await employeeRepo.findOne({
    where: {
      role: "EMPLOYEE",
      email: data.email,
    },
  });
  if (existingEmployee?.email.length) {
    throw new Error("Employee already exit.");
  }
  // console.log(data.departmentId)
  const department = await departmentRepo.findOne({
    where: {
      id: data.departmentId,
    },
  });
  if (!department) {
    throw new Error("Department not found");
  }
  // console.log(department)
  const createEmployee = employeeRepo.create({
    "firstName": data.firstName,
    "lastName": data.lastName,
    "email": data.email,
    "phoneNumber": data.phoneNumber,
    "designation": data.designation,
    "salary": data.salary,
    "joiningDate": data.joiningDate,
  });
  createEmployee.department = [department];
  console.log(createEmployee);
  return await employeeRepo.save(createEmployee);
};

export const updateEmployee = async (id: number, updatedData: any) => {
  const getEmployee = await employeeRepo.findOne({
    where: {
      id,
      role: "EMPLOYEE",
    },
    relations:{
      department:true
    }
  });
  if (!getEmployee) {
    throw new Error("Employee not found");
  }
  const department = await departmentRepo.findOne({
    where:{
      id:updatedData.departmentId
    }
  })
  if(!department){
    throw new Error("Department not found");
  }
  const {departmentId, ...employeeData} = updatedData
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
  await employeeRepo.remove(getEmployee);
  return {
    message: "Employee deleted successfully",
  };
};
