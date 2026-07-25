import { AppDataSource } from "../config/data-source.js";
import { Leave } from "../entities/leaveEntity.js";
import { Employee } from "../entities/employee.entity.js";

const leaveRepo = AppDataSource.getRepository(Leave);
const employeeRepo = AppDataSource.getRepository(Employee);

export const applyLeave = async (userId: number, data: any) => {
  const employee = await employeeRepo.findOne({
    where: {
      id: userId,
    },
  });

  if (!employee) {
    throw new Error("Employee not found");
  }

  const leave = leaveRepo.create({
    leaveType: data.leaveType,
    startDate: data.startDate,
    endDate: data.endDate,
    reason: data.reason,
    employee,
  });

  await leaveRepo.save(leave);

  return {
    message: "Leave applied successfully.",
  };
};

export const myLeaves = async (userId: number) => {
  return await leaveRepo.find({
    where: {
      employee: {
        id: userId,
      },
    },

    order: {
      createdAt: "DESC",
    },
  });
};

// ------Admin--------------

export const allLeaveRequests = async () => {
  return await leaveRepo.find({
    relations: {
      employee: true,
    },

    order: {
      createdAt: "DESC",
    },
  });
};

export const updateLeaveStatus = async (data: any) => {
  const leave = await leaveRepo.findOne({
    where: {
      id: Number(data.id),
    },
  });

  if (!leave) {
    throw new Error("Leave request not found");
  }

  leave.status = data.status;

  await leaveRepo.save(leave);

  return {
    message: "Leave status updated successfully.",
  };
};
