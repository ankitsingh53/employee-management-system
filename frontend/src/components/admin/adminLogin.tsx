import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import BackButton from "../BackButton";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_ADMIN } from "../../apollo/mutations/adminMutation";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client/react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import { GET_ADMIN } from "../../apollo/queries/adminQuery";

type FormData = {
  email: string;
  password: string;
};
interface FormErrors {
  email?:string,
  password?:string
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const dispatch = useDispatch();
  const[response, setResponse] = useState("")
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({})
  const [loginAdmin, {loading}] = useMutation(LOGIN_ADMIN);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({...errors, [e.target.name]:""})
  };

  const customeValidate = ()=>{
    const formErrors: FormErrors = {};
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

      if (!formData.email.trim()) {
        formErrors.email = "Email is mandatory";
        isValid = false;
      }
      else if(!emailRegex.test(formData.email)){
        formErrors.email = "Enter valid email address and must include @";
        isValid = false;
      }
      if(!formData.password.trim()){
        formErrors.password= "Password is mandatory";
        isValid = false;
      }
      else if (!passwordRegex.test(formData.password)){
        formErrors.password = "Password must be minimum 4 characters, one letter & one digit";
        isValid = false;
      }
      setErrors(formErrors);
      return isValid;
    };
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    let valid = customeValidate();
    if(!valid) return;
    try {
      const {data} = await loginAdmin({
        variables: {
          input: formData
        }
      })
      if(data?.loginAdmin?.message){
        const adminData = await client.query({
          query: GET_ADMIN,
          fetchPolicy: "network-only",
        })
        dispatch(setAuth(adminData.data.getMe))
       
      }
       navigate("/admin/dashboard");
    } catch (err) {
      if(err instanceof Error){
        setResponse(err.message)
      }else {
        console.log(err)
      }
    }
  }

  if(loading){
    return <Box
    sx={{
display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh"
    }}
>
    Loading...
</Box>
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

            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Sign in to manage the organization.
            </Typography>
            {/* {response && <p style={{color:'red'}}>{response}</p>} */}
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
              type="email"
              sx={{ mb: 2 }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="on"
            />
            {/* {errors.email && <p style={{color:'red'}}>{errors.email}</p>}
             */}
             {errors.email && (
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
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              autoComplete="on"
            />
            {/* {errors.password && <p style={{color:'red'}}>{errors.password}</p>} */}
            {errors.password && (
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
              disabled={loading}
            >
             {loading ? "Signing In..." : "Sign In"}
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
