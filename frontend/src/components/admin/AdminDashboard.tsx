import { Paper, Typography, Box, Button, Chip } from "@mui/material";
import { useQuery } from "@apollo/client/react";
import { GET_ADMIN} from "../../apollo/queries/adminQuery";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import type { RootState } from "../../glolbalStore/store";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";
import { GET_ADMIN_DASHBOARD } from "../../apollo/queries/adminQuery";
import Loader from "../Loader";

interface DashboardData {
  adminDashboard: {
    totalEmployees: number;
    activeEmployees: number;
    totalDepartments: number;
    pendingLeaves: number;
  };
}
interface AdminDataResponse {
  getMe?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    departmentId: string;
    designation: string;
    salary: number;
    joiningDate: string;
    role: "ADMIN" | "EMPLOYEE";
    status: boolean;
    department: Array<{
      id: number;
      department: string;
    }>;
  };
}
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<AdminDataResponse>(GET_ADMIN);
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
    refetch,
  } = useQuery<DashboardData>(GET_ADMIN_DASHBOARD);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (data?.getMe) {
      dispatch(setAuth(data.getMe));
      refetch();
    }
  }, [data, dispatch]);

  if (loading || dashboardLoading) return <Loader />;

  if (error || dashboardError) return <h2>Something went wrong.</h2>;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Welcome Back, {user?.firstName}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening today.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <PeopleIcon color="primary" />

          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
            {dashboardData?.adminDashboard.totalEmployees || 0}
          </Typography>

          <Typography color="text.secondary">Total Employees</Typography>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <PersonIcon color="success" />

          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
            {dashboardData?.adminDashboard.activeEmployees || 0}
          </Typography>

          <Typography color="text.secondary">Active Employees</Typography>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <BusinessIcon color="warning" />

          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
            {dashboardData?.adminDashboard.totalDepartments || 0}
          </Typography>

          <Typography color="text.secondary">Total Departments</Typography>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <EventNoteIcon color="error" />

          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
            {dashboardData?.adminDashboard.pendingLeaves || 0}
          </Typography>

          <Typography color="text.secondary">Pending Leave Requests</Typography>
        </Paper>
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
            flex: 1,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Administrator
          </Typography>

          <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                bgcolor: "grey.100",
              }}
            >
              <Typography sx={{ width: 100, fontWeight: "bold" }}>
                Name
              </Typography>

              <Typography>
                {user?.firstName} {user?.lastName}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
              }}
            >
              <Typography sx={{ width: 100, fontWeight: "bold" }}>
                Email
              </Typography>

              <Typography>{user?.email}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                bgcolor: "grey.100",
              }}
            >
              <Typography sx={{ width: 100, fontWeight: "bold" }}>
                Role
              </Typography>

              <Typography>{user?.role}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
              }}
            >
              <Typography sx={{ width: 100, fontWeight: "bold" }}>
                Status
              </Typography>

              <Chip label="ACTIVE" color="success" size="small" />
            </Box>
          </Box>
        </Paper>

        {/* Quick Actions */}

        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 2,
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
            onClick={() => navigate("/admin/add-employee")}
          >
            Add Employee
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => navigate("/admin/employees")}
          >
            Manage Employees
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => navigate("/admin/add-department")}
          >
            Manage Departments
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/admin/manage-leave")}
          >
            Manage Leave Requests
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
