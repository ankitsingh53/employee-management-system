import {
  Avatar,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../glolbalStore/store";

const EmployeeDashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const dashboardCards = [
    { title: "Leave Balance", value: 12 },
    { title: "Pending Leave", value: 2 },
    { title: "Approved Leave", value: 18 },
  ];

  const leaveData = [
    {
      date: "10 Jul 2026",
      reason: "Sick Leave",
      status: "Approved",
    },
    {
      date: "18 Jul 2026",
      reason: "Casual Leave",
      status: "Pending",
    },
    {
      date: "22 Jul 2026",
      reason: "Personal Work",
      status: "Rejected",
    },
  ];

  return (
    <Box>

      <Typography variant="h4" fontWeight={700}>
        Welcome Back, {user?.firstName}
      </Typography>

      <Grid container spacing={3} sx={{margin: '30px 0'}}>
        {dashboardCards.map((card) => (
          <Grid size={{ xs: 12, md: 4 }} key={card.title}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography color="text.secondary">
                {card.title}
              </Typography>

              <Typography variant="h4" fontWeight="bold" mt={1}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={1}>
        {/* Left */}

        {/* <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mx: "auto",
                mb: 2,
                fontSize: 32,
                bgcolor: "#131B63",
              }}
            >
              {user?.firstName?.charAt(0)}
            </Avatar>

            <Typography variant="h6" fontWeight={600}>
              {user?.firstName} {user?.lastName}
            </Typography>

            <Typography color="text.secondary">
              {user?.role}
            </Typography>

            <Typography mt={3}>
              {user?.email}
            </Typography>

            <Typography color="text.secondary">
              IT Department
            </Typography>

            <Typography color="text.secondary">
              React Developer
            </Typography>
          </Paper>
        </Grid> */}

        {/* <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              mb={2}
            >
              Recent Leave Requests
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Reason</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {leaveData.map((leave) => (
                  <TableRow key={leave.date}>
                    <TableCell>{leave.date}</TableCell>

                    <TableCell>{leave.reason}</TableCell>

                    <TableCell>{leave.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;
