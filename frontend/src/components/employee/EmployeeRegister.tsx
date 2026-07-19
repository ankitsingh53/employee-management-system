import {
  Box,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

const EmployeeRegister = () => {
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
        <Typography
          sx={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Employee
          <br />
          Management System
        </Typography>

        <Typography
          sx={{
            mt: 3,
            color: "#D1D5DB",
            fontSize: 17,
            maxWidth: 430,
          }}
        >
          Create your employee account and start using the system.
        </Typography>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 450,
          }}
        >
          <BackButton/>
          <Typography
            sx={{
              fontSize: 34,
              fontWeight: 700,
              mb: 1,
            }}
          >
            Employee Register
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Create your account to continue.
          </Typography>

          <TextField
            fullWidth
            label="First Name"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              bgcolor: "#131B63",
              borderRadius: 2,
            }}
          >
            Register
          </Button>

          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
            }}
          >
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/employee/login")}
            >
              Login
            </Link>
          </Typography>

          <Typography
            sx={{
              mt: 5,
              textAlign: "center",
              color: "gray",
              fontSize: 14,
            }}
          >
            © 2026 Employee Management System
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default EmployeeRegister;