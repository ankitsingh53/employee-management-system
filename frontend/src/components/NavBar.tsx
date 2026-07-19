import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        ml: "240px",
        width: "calc(100% - 240px)",
        background: "#131B63",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
          }}
        >
          Employee Management System
        </Typography>

        <Box
        sx={{
          display:"flex",
          alignItems:"center",
          gap: 1,
          ml:2
        }}
        >
          <Avatar>A</Avatar>

          <Typography>Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;