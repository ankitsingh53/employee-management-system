import { useMutation, useQuery } from "@apollo/client/react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { MY_LEAVES } from "../../apollo/queries/employeeQuery";
import {
  APPLY_LEAVE,
  CANCEL_LEAVE,
} from "../../apollo/mutations/employeeMutation";
import { toast } from "react-toastify";
import Loader from "../Loader";

interface CancelLeaveResponse {
  cancelLeave: {
    message?: string;
  };
}
interface Leave {
  id: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

interface UserLeaves {
  myLeaves: Leave[];
}

interface UserLeaves {
  myLeaves: Leave[]
}
interface ApplyLeaveResponse {
  applyLeave: {
    message: string;
  };
}

const LeaveManagement = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [errors, setErrors] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const {
    data,
    loading: queryLoading,
    refetch,
  } = useQuery<UserLeaves>(MY_LEAVES);

  const [applyLeave, { loading }] = useMutation<ApplyLeaveResponse>(APPLY_LEAVE);
  const [cancelLeave] = useMutation<CancelLeaveResponse>(CANCEL_LEAVE);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let valid = true;

    const err = {
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    };

    if (!formData.leaveType.trim()) {
      err.leaveType = "Leave Type Required";
      valid = false;
    }

    if (!formData.startDate.trim()) {
      err.startDate = "Staet Date Required";
      valid = false;
    }

    if (!formData.endDate.trim()) {
      err.endDate = " End Date Required";
      valid = false;
    }

    if (formData.endDate < formData.startDate) {
      err.endDate = "End date must be after start date";
      valid = false;
    }

    if (!formData.reason.trim()) {
      err.reason = " Reason Required";
      valid = false;
    }

    setErrors(err);

    return valid;
  };
  const handleCancel = () => {
    setFormData({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });

    setErrors({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  const handleLeave = async (id: number) => {
    try {
      const { data } = await cancelLeave({
        variables: { id },
      });
      toast.success(`${data?.cancelLeave.message}`);
      refetch();
    } catch (error) {
      if (error instanceof Error) {
        toast.success(`${error.message}`);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await applyLeave({
        variables: {
          input: formData,
        },
      });

      if (data) {
        toast.success(`${data?.applyLeave.message}`);
      }

      refetch();
      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${err.message}`, {
          autoClose: 2000,
        });
      }
    }
  };
  if (queryLoading) {
    return <Loader />;
  }
  return (
    <>
      <Box sx={{ marginBottom: "30px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Leave Management
        </Typography>

        <Typography color="text.secondary">Apply for leave</Typography>
      </Box>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
        }}
      >
        <TextField
          select
          sx={{ marginTop: "10px" }}
          label="Leave Type"
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="CASUAL">Casual Leave</MenuItem>

          <MenuItem value="SICK">Sick Leave</MenuItem>

          <MenuItem value="EARNED">Earned Leave</MenuItem>
        </TextField>
        {errors && <p style={{ color: "red" }}>{errors.leaveType}</p>}

        <TextField
          type="date"
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ marginTop: "40px" }}
          fullWidth
        />
        {errors && <p style={{ color: "red" }}>{errors.startDate}</p>}

        <TextField
          type="date"
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ marginTop: "40px" }}
          fullWidth
        />
        {errors && <p style={{ color: "red" }}>{errors.endDate}</p>}

        <TextField
          label="Reason"
          name="reason"
          multiline
          rows={4}
          value={formData.reason}
          onChange={handleChange}
          fullWidth
          sx={{ marginTop: "40px" }}
        />
        {errors && <p style={{ color: "red" }}>{errors.reason}</p>}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
        >
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>

          <Button variant="contained" disabled={loading} onClick={handleSubmit}>
            Apply Leave
          </Button>
        </Box>
      </Paper>

      <Box sx={{ marginTop: "30px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "30px" }}>
          Leave History
        </Typography>

        {data?.myLeaves.length === 0 ? (
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              marginTop: "20px",
            }}
          >
            <Typography>No Leave Requests</Typography>
          </Paper>
        ) : (
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              marginTop: "20px",
            }}
          >
            <Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Leave Type</TableCell>

                      <TableCell>Start Date</TableCell>

                      <TableCell>End Date</TableCell>

                      <TableCell>Reason</TableCell>

                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data?.myLeaves.map((leave: any) => (
                      <TableRow key={leave.id}>
                        <TableCell>{leave.leaveType}</TableCell>

                        <TableCell>
                          {new Date(leave.startDate).toLocaleDateString(
                            "en-IN",
                          )}
                        </TableCell>

                        <TableCell>
                          {new Date(leave.endDate).toLocaleDateString("en-IN")}
                        </TableCell>

                        <TableCell>{leave.reason}</TableCell>

                        <TableCell>
                          <Chip
                            label={leave.status}
                            color={
                              leave.status === "APPROVED"
                                ? "success"
                                : leave.status === "REJECTED"
                                  ? "error"
                                  : "warning"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {leave.status === "PENDING" ? (
                            <>
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleLeave(leave.id)}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default LeaveManagement;
