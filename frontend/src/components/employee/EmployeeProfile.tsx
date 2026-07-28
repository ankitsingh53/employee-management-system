import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../glolbalStore/store";

const EmployeeProfile = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "700" }}>
        My Profile
      </Typography>

      <Typography color="text.secondary" sx={{ marginBottom: "40px" }}>
        View your personal and employment information.
      </Typography>

      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", marginBottom: "20px" }}
          >
            Personal Information
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">First Name</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                {user?.firstName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">Last Name</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                {user?.lastName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">Email</Typography>
              <Typography sx={{ fontWeight: "600" }}>{user?.email}</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">Phone Number</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                {user?.phoneNumber || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">Department</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                {user?.department?.[0]?.department || "Not Assigned yet"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">Designation</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                {user?.designation || "Not Assigned yet"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">Joining Date</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                {user?.joiningDate}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">Salary</Typography>
              <Typography sx={{ fontWeight: "600" }}>
                {user ? `₹${user?.salary}` : "-"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/user/edit-profile")}
            >
              Edit Profile
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/user/change-password")}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmployeeProfile;
