import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_PROFILE } from "../../apollo/mutations/employeeMutation";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import type { RootState } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

interface GetFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}
const EditProfile = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<GetFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const user = useSelector((state: RootState)=> state.auth.user);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  useEffect(() => {
  if (!user) return ;
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
}, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const customeValidate = () => {
    const formErrors:FormErrors = {};
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    const stringPattern = /^[A-Za-z\s'-]+$/;
    const mobileValidation = /^(0|91)?[6-9][0-9]{9}$/;

    if (!formData.firstName.trim()) {
      formErrors.firstName = "First name is required";
      isValid = false;
    } else if (!stringPattern.test(formData.firstName)) {
      formErrors.firstName = "Only Characters are allowed";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = "Last name is required";
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
    if (!formData.phoneNumber.trim()) {
      formErrors.phoneNumber = "Mobile number is required !";
      isValid = false;
    } else if (!mobileValidation.test(formData.phoneNumber)) {
      formErrors.phoneNumber = "Enter valid mobile number";
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
      const {data} = await updateProfile({
        variables: {
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          },
        },
      });
      console.log(data.updateProfile)
      if(data.updateProfile){
      dispatch(setAuth(data.updateProfile));
      }
      navigate("/user/profile")
      toast.success("Updated Successfully",{
        "autoClose": 2000,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

  };
  
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Edit Profile
        </Typography>

        <Typography color="text.secondary">
          Update your details:
        </Typography>
      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="On"
        onSubmit={handleSubmit}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
            }}
          >
            <Stack sx={{ flexGrow: "1" }}>
              <TextField
                label="First Name"
                fullWidth
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors && (
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block", color: "red" }}
                >
                  {errors.firstName}
                </Typography>
              )}
            </Stack>
            <Stack sx={{ flexGrow: "1" }}>
              <TextField
                label="Last Name"
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors && (
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block", color: "red" }}
                >
                  {errors.lastName}
                </Typography>
              )}
            </Stack>
          </Box>

          <TextField
            label="Email"
            disabled
            fullWidth
            sx={{ mb: 3 }}
            name="email"
            value={formData.email}
            onChange={handleChange}
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
          <TextField
            label="Phone Number"
            fullWidth
            sx={{ mb: 3 }}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors && (
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block", color: "red" }}
            >
              {errors.phoneNumber}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/user/profile")}
            >
              Cancel
            </Button>

            <Button variant="contained" type="submit">
              Update Profile
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditProfile;






