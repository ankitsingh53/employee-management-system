import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import type { RootState } from "../glolbalStore/store";
import Loader from "./Loader";

const DashboardLayout = () => {
  const user = useSelector((state: RootState)=>state.auth)
  if(user.loading){
    return <Loader/>
  }
  return (
    <>
      <NavBar />
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "#F3F4F6",
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
