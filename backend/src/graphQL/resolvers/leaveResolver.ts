import {
  applyLeave,
  myLeaves,
  allLeaveRequests,
  updateLeaveStatus,
} from "../../services/leaveService.js";

export const leaveResolver = {
  Query: {
    myLeaves: async (_parent: any, _args: any, context: any) => {
      return await myLeaves(context.user.id);
    },

    allLeaveRequests: async () => {
      return await allLeaveRequests();
    },
  },

  Mutation: {
    applyLeave: async (_parent: any, args: any, context: any) => {
      const data = args.input;
      if (!data.leaveType.trim()) throw new Error("Leave type is required");

      if (!data.reason.trim()) throw new Error("Reason is required");

      if (!data.startDate) throw new Error("Start date is required");

      if (!data.endDate) throw new Error("End date is required");

      if (new Date(data.endDate) < new Date(data.startDate))
        throw new Error("End date cannot be before start date");
      return await applyLeave(
        context.user.id,

        args.input,
      );
    },

    updateLeaveStatus: async (
      _parent: any,

      args: any,
    ) => {
      return await updateLeaveStatus(args.input);
    },
  },
};
