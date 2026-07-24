import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { ADD_EMPLOYEE } from "../../apollo/mutations/adminMutation";
import { GET_DEPARTMENT } from "../../apollo/queries/adminQuery";
// import type { SelectChangeEvent } from "@mui/material";

interface GetFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  departmentId: string;
  designation: string;
  salary: string;
  joiningDate: string;
}
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  departmentId?: string;
  designation?: string;
  salary?: string;
  joiningDate?: string;
}
interface DepartmentData {
  viewDepartment: []
}

const AddEmployee = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<GetFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    departmentId: "",
    designation: "",
    salary: "",
    joiningDate: "",
  });

  const [addEmployee] = useMutation(ADD_EMPLOYEE);
  const { data } = useQuery<DepartmentData>(GET_DEPARTMENT);

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
    const salaryRegex = /^(0|[1-9]\d*)(\.\d+)?$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

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
    if (!formData.designation.trim()) {
      formErrors.designation = "Designation is required !";
      isValid = false;
    } else if (!stringPattern.test(formData.designation)) {
      formErrors.designation = "Enter valid characters";
      isValid = false;
    }
    if (!Number(formData.salary)) {
      formErrors.salary = "Salary is required";
      isValid = false;
    } else if (!salaryRegex.test(formData.salary)) {
      formErrors.salary = "Enter only numeric characters";
      isValid = false;
    }
    if (!formData.joiningDate.trim()) {
      formErrors.joiningDate = "Joining date is required";
      isValid = false;
    } else if (!dateRegex.test(formData.joiningDate)) {
      formErrors.joiningDate = "Enter date in 'yyyy-mm-dd' format";
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
      const employeeData = await addEmployee({
        variables: {
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            designation: formData.designation,
            salary: parseFloat(formData.salary),
            joiningDate: formData.joiningDate,
            departmentId: Number(formData.departmentId),
          },
        },
      });

      // console.log(employeeData);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

  };

  // console.log(formData);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Add Employee
        </Typography>

        <Typography color="text.secondary">
          Fill in the employee details.
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
              gap: 2,
              mb: 3,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>

              <Select
                label="Department"
                defaultValue=""
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                {data?.viewDepartment.map((dept:{id:string, department:string}) => {
                  return (
                    <MenuItem value={dept.id}>
                      {dept.department}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              label="Designation"
              fullWidth
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
            {errors && (
              <Typography
                variant="overline"
                gutterBottom
                sx={{ display: "block", color: "red" }}
              >
                {errors.designation}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
            }}
          >
            <Stack sx={{ flexGrow: "1" }}>
              <TextField
                label="Salary"
                type="number"
                fullWidth
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
              {errors && (
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block", color: "red" }}
                >
                  {errors.salary}
                </Typography>
              )}
            </Stack>

            <Stack sx={{ flexGrow: "1" }}>
              <TextField
                type="date"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
              />
              {errors && (
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ display: "block", color: "red" }}
                >
                  {errors.joiningDate}
                </Typography>
              )}
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/employees")}
            >
              Cancel
            </Button>

            <Button variant="contained" type="submit">
              Save Employee
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddEmployee;






