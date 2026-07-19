import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import BackButton from "../BackButton";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_ADMIN } from "../../apollo/mutations/adminMutation";

type FormData = {
  email: string;
  password: string;
};

const AdminLogin = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loginAdmin, {loading, error, data}] = useMutation(LOGIN_ADMIN);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    console.log(data)


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const {data} = await loginAdmin({
        variables: {
          input: formData
        }
      })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
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
          Streamline your workforce operations with our comprehensive employee
          management solution.
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
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 420,
          }}
        >
          <BackButton />
          <Box component="form" noValidate autoComplete="On" onSubmit={handleSubmit}>
            <Typography
              sx={{
                fontSize: "34px",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Admin Login
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Sign in to manage the organization.
            </Typography>

            <Typography sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>

            <TextField
              fullWidth
              placeholder="Enter your email"
              type="email"
              sx={{ mb: 3 }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="on"
            />

            <Typography sx={{ mb: 1, fontWeight: 500 }}>Password</Typography>

            <TextField
              fullWidth
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              autoComplete="on"
            />

            {/* <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
            }}
          >
            <Link
              href="#"
              underline="hover"
              sx={{
                fontSize: "14px",
              }}
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
                fontSize: "16px",

                "&:hover": {
                  bgcolor: "#0F164C",
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              mt: 5,
              color: "gray",
              fontSize: "14px",
            }}
          >
            © 2026 Employee Management System
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminLogin;
