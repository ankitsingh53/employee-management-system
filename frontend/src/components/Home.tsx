import { Box, Paper, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Side */}
      <Box
        sx={{
          width: { xs: 0, md: "50%" },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "#131B63",
          color: "#fff",
          px: 8,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Employee
          <br />
          Management System
        </Typography>

        <Typography sx={{ mt: 3, color: "#D1D5DB", maxWidth: 450 }}>
          Streamline your workforce operations, track profile, manage your activity, and empower your team securely.
        </Typography>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#fff",
          p: 3,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome Back
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
            Select your portal to securely access the system.
          </Typography>

          <Paper
            elevation={2}
            onClick={() => navigate("/admin/login")}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#F5F5F5",
              },
            }}
          >
            <Typography>Admin Portal</Typography>

            <ArrowForwardIosIcon fontSize="small" />
          </Paper>

          <Paper
            elevation={2}
            onClick={() => navigate("/user/register")}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#F5F5F5",
              },
            }}
          >
            <Typography>Employee Portal</Typography>

            <ArrowForwardIosIcon fontSize="small" />
          </Paper>

          <Typography
            sx={{
              mt: 6,
              textAlign: "center",
              color: "gray",
              fontSize: 14,
            }}
          >
            © 2026 Employee Management System
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;