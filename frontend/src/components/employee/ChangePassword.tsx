import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASSWORD } from "../../apollo/mutations/employeeMutation";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const customValidate = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    let isValid = true;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least 4 characters, one letter and one number";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = customValidate();

    if (!valid) return;

    try {
      const { data } = await changePassword({
        variables: {
          input: {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          },
        },
      });

      if(data){
      navigate("/user/profile");
      toast.success("Password changed successfully")
      }
    } catch (error) {
      if(error instanceof Error){
        toast.error(`${error.message}`)
      }
    }
  };
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Change Password
        </Typography>

        <Typography color="text.secondary">
          Update your account password.
        </Typography>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
          }}
        >
          <Stack spacing={3}>
            <TextField
              label="Current Password"
              name="currentPassword"
              type={showCurrent ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleChange}
              fullWidth
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

            <Typography
              variant="overline"
              sx={{ color: "red", display: "block" }}
            >
              {errors.currentPassword}
            </Typography>

            <TextField
              label="New Password"
              name="newPassword"
              type={showNew ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              fullWidth
              slotProps={{
                input:{
                    endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                      {showNew ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                }
              }}
            />

            <Typography
              variant="overline"
              sx={{ color: "red", display: "block" }}
            >
              {errors.newPassword}
            </Typography>

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              slotProps={{
                input:{
                    endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm(!showConfirm)}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                }
              }}
            />

            <Typography
              variant="overline"
              sx={{ color: "red", display: "block" }}
            >
              {errors.confirmPassword}
            </Typography>

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

              <Button variant="contained" type="submit" disabled={loading}>
                Change Password
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChangePassword;
