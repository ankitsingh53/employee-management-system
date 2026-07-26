import { requireAdmin, requireAuth } from "../../middleware/authorization.js";
import {
  applyLeave,
  myLeaves,
  allLeaveRequests,
  updateLeaveStatus,
  cancelLeave,
} from "../../services/leaveService.js";

export const leaveResolver = {
  Query: {
    myLeaves: async (_parent: any, _args: any, context: any) => {
      requireAuth(context)
      return await myLeaves(context.user.id);
    },

    allLeaveRequests: async (parent:any, args:any, context:any) => {
      requireAdmin(context)
      return allLeaveRequests();
    },
  },

  Mutation: {
    applyLeave: async (_parent: any, args: any, context: any) => {
      requireAuth(context);
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
      return await applyLeave(context.user.id, args.input);
    },

    updateLeaveStatus: async (_parent: any, args: any, context:any) => {
      requireAdmin(context)
      return await updateLeaveStatus(args.input);
    },

    cancelLeave: async(parent:any, args:any, context:any)=>{
      requireAuth(context)
      return await cancelLeave(args.id)
    }
  },
};
