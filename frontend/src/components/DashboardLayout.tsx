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


// import { Box, Toolbar } from "@mui/material";
// import { Outlet } from "react-router-dom";

// import Navbar from "./NavBar";
// import Sidebar from "./SideBar";

// const drawerWidth = 230;

// const DashboardLayout = () => {
//   return (
//     <>
//       {/* Full Width AppBar */}
//       <Navbar />

//       <Box sx={{display:"flex"}}>
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             ml: `${drawerWidth}px`,
//             p: 3,
//             bgcolor: "#f5f5f5",
//             minHeight: "100vh",
//           }}
//         >
//           {/* Space below AppBar */}
//           <Toolbar />

//           <Outlet />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default DashboardLayout;