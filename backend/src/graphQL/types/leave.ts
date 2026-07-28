export interface ApplyLeaveArgs {
  input: {
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
  };
}

export interface UpdateLeaveStatusArgs {
  input: {
    id: number;
    status: string;
  };
}

export interface CancelLeaveArgs {
  id: number;
}