import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import SideBar from "./SideBar";

const DashboardLayout = () => {
  return (
    <>
      <NavBar />
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "#F8FAFC",
        }}
      >
        <SideBar />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 4,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
