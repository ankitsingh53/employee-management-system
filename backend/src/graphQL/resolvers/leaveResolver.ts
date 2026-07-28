import { requireAdmin, requireAuth } from "../../middleware/authorization.js";
import {
  applyLeave,
  myLeaves,
  allLeaveRequests,
  updateLeaveStatus,
  cancelLeave,
} from "../../services/leaveService.js";
import type {
  ApplyLeaveArgs,
  UpdateLeaveStatusArgs,
  CancelLeaveArgs,
} from "../types/leave.js";

import type { GraphQLContext } from "../../types/context.js";

export interface EmptyArgs {}

export interface LeaveInput {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface LeavePaginationInput {
  page: number;
  limit: number;
}

export const leaveResolver = {
  Query: {
    myLeaves: async (_: unknown, __: EmptyArgs, context: GraphQLContext) => {
      const user = requireAuth(context);
      return await myLeaves(user.id);
    },

    allLeaveRequests: async (
      _: unknown,
      args: LeavePaginationInput,
      context: GraphQLContext,
    ) => {
      requireAdmin(context);

      return allLeaveRequests(args);
    },
  },

  Mutation: {
    applyLeave: async (
      _: unknown,
      args: ApplyLeaveArgs,
      context: GraphQLContext,
    ) => {
      const user = requireAuth(context);
      const data = args.input;
      if (!data.leaveType.trim()) {
        throw new Error("Leave type is required");
      }
      if (!data.reason.trim()) {
        throw new Error("Reason is required");
      }
      if (!data.startDate) {
        throw new Error("Start date is required");
      }
      if (!data.endDate) {
        throw new Error("End date is required");
      }
      if (new Date(data.endDate) < new Date(data.startDate)) {
        throw new Error("End date cannot be before start date");
      }
      return await applyLeave(user.id, args.input);
    },

    updateLeaveStatus: async (
      _: unknown,
      args: UpdateLeaveStatusArgs,
      context: GraphQLContext,
    ) => {
      requireAdmin(context);
      return await updateLeaveStatus(args.input);
    },

    cancelLeave: async (
      _: unknown,
      args: CancelLeaveArgs,
      context: GraphQLContext,
    ) => {
      requireAuth(context);
      return await cancelLeave(args.id);
    },
  },
};
