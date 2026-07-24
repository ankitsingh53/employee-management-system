import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import React, { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { LOGIN_EMPLOYEE } from "../../apollo/mutations/employeeMutation";
import { useDispatch } from "react-redux";
import { GET_USER } from "../../apollo/queries/employeeQuery";
import { setAuth } from "../../features/auth/authSlice";

interface FormData {
  email: string;
  password: string ;
}
interface FormError {
  email?: string;
  password?: string ;
}

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [loginEmployee] = useMutation(LOGIN_EMPLOYEE);
  const [response, setResponse] = useState<String>("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormError>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({...errors, [e.target.name]:""})
  };

  const customeValidate = () => {
    const formErrors:FormError = {};
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!formData.email.trim()) {
      formErrors.email = "Email is mandatory";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Enter valid email address and must include @";
      isValid = false;
    }
    if (!formData.password.trim()) {
      formErrors.password = "Password is mandatory";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      formErrors.password =
        "Password must be minimum 4 characters, one letter & one digit";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = customeValidate();
    if(!valid) return;
    try {
      const {data} = await loginEmployee({
        variables: {
          input: formData,
        },
      });
      if (data?.loginEmployee?.message) {
      const userData = await client.query({
        query: GET_USER,
        fetchPolicy: "network-only",
      });

      dispatch(setAuth(userData.data.getUser));

      navigate("/user/dashboard");
    }
    } catch (error) {
      if (error instanceof Error) {
        setResponse(error.message);
      } else {
        console.log(error);
      }
    }
  };

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

            {response && (
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block", color: "red" }}
                >
                  {response}
                </Typography>
                 )}
            <Typography sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>

            <TextField
              fullWidth
              placeholder="Enter your email"
              sx={{ mb: 2 }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="on"
            />
            {errors && (
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block", color: "red" }}
                >
                  {errors.email}
                </Typography>
              )}

            <Typography sx={{ mb: 1, fontWeight: 500 }}>Password</Typography>

            <TextField
              fullWidth
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="on"
            />
            {errors && (
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block", color: "red" }}
                >
                  {errors.password}
                </Typography>
              )}

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
