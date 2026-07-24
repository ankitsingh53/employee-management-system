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
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_EMP_BY_ID, GET_EMPLOYEE } from "../../apollo/queries/adminQuery";
import { UPDATE_PROFILE } from "../../apollo/mutations/employeeMutation";

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
    const {id} = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<GetFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const {data: empData} = useQuery(GET_EMP_BY_ID, {
    variables:{
        id: Number(id)
    }
  });

  // console.log(empData)

  useEffect(() => {
  if (empData?.getEmployeeById) {
    const employee = empData.getEmployeeById;
    // console.log(employee)

    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber
    });
  }
}, [empData]);

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
       await updateProfile({
        variables: {
          input: {
            id:id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          },
        },
        refetchQueries: [{ query: GET_EMPLOYEE }],
        awaitRefetchQueries: true,
      });
      
      // navigate("/user/profile")
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

  };

  // console.log(formData)
  
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






