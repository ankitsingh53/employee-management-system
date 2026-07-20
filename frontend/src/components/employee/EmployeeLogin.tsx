import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { data, useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_EMPLOYEE } from "../../apollo/mutations/employeeMutation";

interface FormData {
  email: "";
  password: "";
}

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [loginEmployee, { loading }] = useMutation(LOGIN_EMPLOYEE);
  const [response, setResponse] = useState<String>("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginEmployee({
        variables: {
          input: formData,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setResponse(error.message);
      } else {
        console.log(error);
      }
    }
  };

  console.log(data)

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
            fontSize: "52px",
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
            fontSize: "17px",
            color: "#D1D5DB",
            maxWidth: 420,
          }}
        >
          Access your employee account securely and manage your profile.
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
            maxWidth: 420,
          }}
        >
          <BackButton />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
          >
            <Typography
              sx={{
                fontSize: "34px",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Employee Login
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Sign in to access your account.
            </Typography>

            <Typography sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>

            <TextField
              fullWidth
              placeholder="Enter your email"
              sx={{ mb: 3 }}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Typography sx={{ mb: 1, fontWeight: 500 }}>Password</Typography>

            <TextField
              fullWidth
              type="password"
              placeholder="Enter your password"
            />

            {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Link
              component="button"
              underline="hover"
              onClick={() => navigate("/employee/register")}
            >
              Register
            </Link>

            <Link
              component="button"
              underline="hover"
            >
              Forgot Password?
            </Link>
          </Box> */}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 4,
                py: 1.5,
                bgcolor: "#131B63",
                borderRadius: 2,
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 5,
              textAlign: "center",
              color: "gray",
            }}
          >
            © 2026 Employee Management System
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default EmployeeLogin;
