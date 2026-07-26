import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../glolbalStore/store";
import { MY_LEAVES } from "../../apollo/queries/employeeQuery";
import { useQuery } from "@apollo/client/react";


const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data } = useQuery(MY_LEAVES);
  const recentLeaves = data?.myLeaves?.slice(0, 3) || [];

  return (
    <Box>


      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Welcome Back, {user?.firstName}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Have a productive day.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 3,
        }}
      >

        <Paper
          sx={{
            flex: 2,
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Employee Information
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography color="text.secondary">
              Name
            </Typography>

            <Typography sx={{ fontWeight: "bold" }}>
              {user?.firstName} {user?.lastName}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography color="text.secondary" >
              Email
            </Typography>

            <Typography sx={{ fontWeight: "bold" }}>{user?.email}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography color="text.secondary">
              Designation
            </Typography>

            <Typography sx={{ fontWeight: "bold" }}>{user?.designation}</Typography>
          </Box>

          <Box>
            <Typography
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Status
            </Typography>

            <Chip
              label="ACTIVE"
              color="success"
              size="small"
            />
          </Box>
        </Paper>


        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Quick Actions
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => navigate("/user/leave")}
          >
            Apply Leave
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/user/profile")}
          >
            My Profile
          </Button>
        </Paper>
      </Box>

      <Paper
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Recent Leave Requests
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Leave Type
                </TableCell>

                <TableCell sx={{ fontWeight: "bold" }}>
                 Start Date
                </TableCell>

                <TableCell sx={{ fontWeight: "bold" }}>
                 End Date
                </TableCell>

                <TableCell sx={{ fontWeight: "bold" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {recentLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>
                    {leave.leaveType}
                  </TableCell>

                  <TableCell>
                    {new Date(leave.startDate).toLocaleDateString(
                            "en-IN",
                          )}
                  </TableCell>

                  <TableCell>
                    {new Date(leave.endDate).toLocaleDateString(
                      "en-IN",
                    )}
                  </TableCell>

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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default EmployeeDashboard;