import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../glolbalStore/store";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { LOGOUT_ADMIN } from "../apollo/mutations/adminMutation";
import { logout } from "../features/auth/authSlice";
import { LOGOUT_EMPLOYEE } from "../apollo/mutations/employeeMutation";

const NavBar = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [logoutAdmin] = useMutation(LOGOUT_ADMIN);

  const [logoutEmployee] = useMutation(LOGOUT_EMPLOYEE);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
  try {
    if (user?.role === "ADMIN") {
      const { data } = await logoutAdmin();

      if (data?.logoutAdmin?.success) {
        dispatch(logout());
        await client.clearStore();
        handleClose();
        navigate("/admin/login");
      }
    } else if (user?.role === "EMPLOYEE") {
      const { data } = await logoutEmployee();

      if (data?.logoutEmployee?.success) {
        dispatch(logout());
        await client.clearStore();
        handleClose();
        navigate("/user/login");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#131B63",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "500", letterSpacing: 0.5 }}>
          Employee Management System
        </Typography>

        <Box
          onClick={handleClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#6B7280",
              color: "#fff",
            }}
          >
            {user?.firstName?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography>{user?.firstName}</Typography>
        </Box>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
