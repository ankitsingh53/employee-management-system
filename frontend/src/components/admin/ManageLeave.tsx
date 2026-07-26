import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from "@mui/material";


import { ALL_LEAVE_REQUESTS } from "../../apollo/queries/adminQuery";
import { UPDATE_LEAVE_STATUS } from "../../apollo/mutations/adminMutation";
import Loader from "../Loader";
import { useMutation, useQuery } from "@apollo/client/react";
import { toast } from "react-toastify";

const ManageLeave = () => {
  const { data, loading, refetch } = useQuery(ALL_LEAVE_REQUESTS);

  const [updateLeaveStatus, { loading: updating }] =
    useMutation(UPDATE_LEAVE_STATUS);

  const handleStatus = async (id: number, status: "APPROVED" | "REJECTED") => {
    try {
      await updateLeaveStatus({
        variables: {
          input: {
            id,
            status,
          },
        },
      });

      toast.success("Leave status updated successfully.",{
        autoClose: 2000,
      })

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data)

  if (loading) {
    return <Loader />;
  }
  if (!data?.allLeaveRequests?.length) {
  return (
    <>
      <Box sx={{marginBottom: '30px'}}>
        <Typography variant="h4" sx={{fontWeight:"bold"}}>
          Leave Requests
        </Typography>

        <Typography color="text.secondary">
          Manage employee leave requests
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{fontWeight:"bold", marginBottom: '10px'}}>
          No Leave Requests
        </Typography>

        <Typography color="text.secondary">
          There are no leave requests available.
        </Typography>
      </Paper>
    </>
  );
}
  return (
    <>
      <Box sx={{marginBottom:'30px'}}>
        <Typography variant="h4" sx={{fontWeight:"bold"}} >
          Leave Requests
        </Typography>

        <Typography color="text.secondary">
          Manage employee leave requests
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{fontWeight:'500px'}}>
              <TableCell>Employee</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.allLeaveRequests.map((leave: any) => (
              <TableRow key={leave.id}>
                <TableCell>
                  {leave.employee.firstName} {leave.employee.lastName}
                </TableCell>

                <TableCell>
                  {leave.employee.department[0]?.department ?? "-"}
                </TableCell>

                <TableCell>
                  {leave.leaveType.charAt(0)}
                  {leave.leaveType.slice(1).toLowerCase()}
                </TableCell>

                <TableCell>
                  {new Date(leave.startDate).toLocaleDateString("en-IN")}
                </TableCell>

                <TableCell>
                  {new Date(leave.endDate).toLocaleDateString("en-IN")}
                </TableCell>

                <TableCell>{leave.reason}</TableCell>

                <TableCell>
                  <Chip
                    label={leave.status}
                    size="small"
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
                    <Box sx={{ display:"flex", gap:'10px'}}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        disabled={updating}
                        onClick={() => handleStatus(leave.id, "APPROVED")}
                      >
                        Approve
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        disabled={updating}
                        onClick={() => handleStatus(leave.id, "REJECTED")}
                      >
                        Reject
                      </Button>
                    </Box>
                  ) : (
                    <Chip label="Completed" color="info" size="small" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ManageLeave;
