import { AppDataSource } from "../../config/data-source.js";
import { Department } from "../../entities/department.entity.js";

import { Employee } from "../../entities/employee.entity.js";
import { Leave } from "../../entities/leaveEntity.js";

const authRepo = await AppDataSource.getRepository(Employee);
const employeeRepo = await AppDataSource.getRepository(Employee);

const departmentRepo = await AppDataSource.getRepository(Department);

const leaveRepo = await AppDataSource.getRepository(Leave);

export const authAdmin = async(email:string)=>{
    const getAdmin = authRepo.findOne({
        where: {
            email,
            role: "ADMIN",
        },
    });

    return getAdmin;
}

export const getAdminDashboard = async () => {
    const totalEmployees = await employeeRepo.count({
  where: {
    role: "EMPLOYEE",
  },
});
const activeEmployees = await employeeRepo.count({
  where: {
    role: "EMPLOYEE",
    status: true,
  },
});
const totalDepartments = await departmentRepo.count();

const pendingLeaves = await leaveRepo.count({
  where: {
    status: "PENDING",
    employee:{
      status:true,
    }
  },
});

return {
  totalEmployees,
  activeEmployees,
  totalDepartments,
  pendingLeaves,
};
};