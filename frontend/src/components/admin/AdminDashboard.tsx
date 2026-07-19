import { Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{fontWeight:700}}
        gutterBottom
      >
        Welcome Back, Admin
      </Typography>

      <Typography color="text.secondary">
        Here's what's happening today.
      </Typography>
    </>
  );
};

export default AdminDashboard;