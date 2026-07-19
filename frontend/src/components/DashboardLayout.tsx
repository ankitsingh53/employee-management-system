import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./SideBar";
import Navbar from "./NavBar";

const DashboardLayout = () => {
  return (
    <>
    <Box sx={{display:"flex"}}>
      <Navbar />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
    </>
  );
};

export default DashboardLayout;