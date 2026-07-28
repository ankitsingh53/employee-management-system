import { AppDataSource } from "../config/data-source.js";
import { Leave } from "../entities/leaveEntity.js";
import { Employee } from "../entities/employee.entity.js";
import { sendLeaveStatusEmail } from "../utils/email.js";
import type { LeavePaginationInput } from "../graphQL/resolvers/leaveResolver.js";

export interface LeaveInput {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface UpdateLeaveStatusInput {
  id: number;
  status: string;
}

const leaveRepo = AppDataSource.getRepository(Leave);
const employeeRepo = AppDataSource.getRepository(Employee);

export const applyLeave = async (userId: number, data: LeaveInput) => {
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

export const allLeaveRequests = async (data: LeavePaginationInput) => {
  console.log(data.page);
  const [leave, totalCount] = await leaveRepo.findAndCount({
    relations: {
      employee: {
        department: true,
      },
    },
    where: {
      employee: {
        status: true,
      },
    },
    skip: (data.page - 1) * data.limit,
    take: data.limit,
    order: {
      createdAt: "DESC",
    },
  });
  if (leave.length === 0) {
    throw new Error("No leave request found");
  }
  return {
    leaves: leave,
    totalCount,
  };
};

export const updateLeaveStatus = async (data: UpdateLeaveStatusInput) => {
  const leave = await leaveRepo.findOne({
    where: {
      id: Number(data.id),
    },
    relations: {
      employee: true,
    },
  });

  if (!leave) {
    throw new Error("Leave request not found");
  }

  leave.status = data.status;

  await leaveRepo.save(leave);
  await sendLeaveStatusEmail(
    leave.employee.email,
    leave.employee.firstName,
    leave.status,
  );

  return {
    message: "Leave status updated successfully.",
  };
};

export const cancelLeave = async (id: number) => {
  const leave = await leaveRepo.findOne({
    where: { id },
  });

  console.log(leave);
  if (!leave) {
    throw new Error("Leave not found");
  }

  if (leave.status !== "PENDING") {
    throw new Error("Only pending leave can be cancelled.");
  }

  await leaveRepo.remove(leave);

  return {
    message: "Leave cancelled successfully.",
  };
};
