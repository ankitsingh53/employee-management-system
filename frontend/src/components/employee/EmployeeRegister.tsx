import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import { useMutation } from "@apollo/client/react";
import { REGISTER_EMPLOYEE } from "../../apollo/mutations/employeeMutation";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [registerEmployee, { loading }] = useMutation(REGISTER_EMPLOYEE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const customeValidate = () => {
    const formErrors: FormErrors = {};
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    const stringPattern = /^[A-Za-z\s'-]+$/;

    if (!formData.firstName.trim()) {
      formErrors.firstName = "First name is required";
      isValid = false;
    } else if (!stringPattern.test(formData.firstName)) {
      formErrors.firstName = "Only Characters are allowed";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = "First name is required";
      isValid = false;
    } else if (!stringPattern.test(formData.lastName)) {
      formErrors.lastName = "Only Characters are allowed";
      isValid = false;
    }
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
    if (!valid) return;
    try {
      const {data} =  await registerEmployee({
        variables: {
          input: formData,
        },
      });
      
      if(data){
        navigate("/user/login")
        toast.success("Registered Successfully", {
          autoClose: 2000,
        })
      }
    } catch (err) {
      if (err instanceof Error){
        toast.error(`${err.message}`,{
          autoClose: 2000,
        })
      } 
    }
  };

  if(loading) return <Loader/>

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/*------------- Left side------- */}
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

      {/* ---------Right SIde------------ */}
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
          <BackButton path="/"/>
          <Box
            component="form"
            noValidate
            autoComplete="On"
            onSubmit={handleSubmit}
          >
            <Typography
              sx={{
                fontSize: 34,
                fontWeight: 700,
                mb: 1,
              }}
            >
              Employee Register
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Create your account to continue.
            </Typography>

            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              autoComplete="on"
            />
            {errors.firstName && (
              <p style={{ color: "red" }}>{errors.firstName}</p>
            )}

            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              autoComplete="on"
            />
            {errors.lastName && (
              <p style={{ color: "red" }}>{errors.lastName}</p>
            )}

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              name="email"
              onChange={handleChange}
              value={formData.email}
              autoComplete="on"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <TextField
              fullWidth
              label="Password"
              type={showCurrent ? "text" : "password"}
              margin="normal"
              name="password"
              onChange={handleChange}
              value={formData.password}
              autoComplete="on"
              slotProps={{
                input:{
                    endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrent(!showCurrent)}
                      edge="end"
                    >
                      {showCurrent ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                }
              }}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: "#131B63",
                borderRadius: 2,
              }}
            >
              Register
            </Button>
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
            }}
          >
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/user/login")}
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
