import { AppDataSource } from "../../config/data-source.js";
import { Department } from "../../entities/department.entity.js";
import { Employee } from "../../entities/employee.entity.js";
import { ILike } from "typeorm";

const employeeRepo = await AppDataSource.getRepository(Employee);
const departmentRepo = await AppDataSource.getRepository(Department);

export const getAllEmployee = async (
  page: number,
  limit: number,
  search?: string,
  status?: boolean,
  sortBy: string ="id"
) => {
  const where: any = {
    role: "EMPLOYEE",
  };

  if (status !== undefined) {
    where.status = status;
  }

  const [employees, totalCount] = await employeeRepo.findAndCount({
    where: search?.trim()
      ? [
          {
            ...where,
            firstName: ILike(`%${search}%`),
          
          },
          {
            ...where,
            lastName: ILike(`%${search}%`),
          },
          {
            ...where,
            email: ILike(`%${search}%`),
          },
        ]
      : where,

    relations: {
      department: true,
    },

    skip: (page - 1) * limit,
    take: limit,

    order: {
      [sortBy]: 'ASC'
    },
  });

  return {
    employees,
    totalCount,
  };
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
  const department = await departmentRepo.findOne({
    where: {
      id: data.departmentId,
    },
  });
  if (!department) {
    throw new Error("Department not found");
  }
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

  getEmployee.status = getEmployee.status===true ? false : true; 
  await employeeRepo.save(getEmployee);
  return {
    message: `Employee ${
      getEmployee.status === true
        ? "activated"
        : "deactivated"
    } successfully.`
  };
};
