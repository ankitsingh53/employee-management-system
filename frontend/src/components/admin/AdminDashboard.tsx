import { useQuery } from "@apollo/client/react";
import { Paper, Typography, Box } from "@mui/material";
import { GET_ADMIN } from "../../apollo/queries/adminQuery";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../glolbalStore/store";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import EventNoteIcon from "@mui/icons-material/EventNote";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery<any>(GET_ADMIN);
  const user = useSelector((state:RootState)=>state.auth.user)

  useEffect(() => {
    if (data?.getMe) {
      dispatch(setAuth(data.getMe));
    }
  }, [data, dispatch]);

  // console.log(data);
  // console.log(user)

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>Not Signed in or some error</h2>;
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        Welcome Back, {user?.firstName}
      </Typography>

      <Typography color="text.secondary">
        Here's what's happening today.
      </Typography>

      <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    gap: 3,
  }}
>
  <Paper sx={{ p: 3 }}>
    <PeopleIcon color="primary" fontSize="large" />
    <Typography variant="h4" sx={{fontWeight:"bold", mt:"1"}} >
      120
    </Typography>
    <Typography color="text.secondary">
      Total Employees
    </Typography>
  </Paper>

  <Paper sx={{ p: 3 }}>
    <PersonIcon color="success" fontSize="large" />
    <Typography variant="h4" sx={{fontWeight:"bold", mt:"1"}}>
      95
    </Typography>
    <Typography color="text.secondary">
      Active Employees
    </Typography>
  </Paper>

  <Paper sx={{ p: 3 }}>
    <BusinessIcon color="warning" fontSize="large" />
    <Typography variant="h4" sx={{fontWeight:"bold", mt:"1"}}>
      8
    </Typography>
    <Typography color="text.secondary">
      Departments
    </Typography>
  </Paper>

  <Paper sx={{ p: 3 }}>
    <EventNoteIcon color="error" fontSize="large" />
    <Typography variant="h4" sx={{fontWeight:"bold", mt:"1"}}>
      14
    </Typography>
    <Typography color="text.secondary">
      Pending Leave
    </Typography>
  </Paper>
</Box>
    </>
  );
};

export default AdminDashboard;
