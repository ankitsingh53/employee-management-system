import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../golbalStore/store";

const Navbar = () => {
  const user = useSelector((state:RootState)=>state.auth.user)
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
          <Avatar>{user?.firstName[0].toUpperCase()}</Avatar>

          <Typography>{user?.firstName}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;



// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Avatar,
//   Button,
// } from "@mui/material";

// const Navbar = () => {
//   return (
//     <AppBar position="fixed">
//       <Toolbar>
//         {/* Logo */}
//         <Typography variant="h6" sx={{fontWeight:"bold"}}>
//           EMS
//         </Typography>

//         {/* Title */}
//         <Typography
//           variant="h6"
//           sx={{
//             ml: 3,
//             flexGrow: 1,
//           }}
//         >
//           Employee Management System
//         </Typography>

//         <Box
//         sx={{
//           display:"flex",
//           alignItems:"center",
//           gap:2
//         }}
          
//         >
//           <Avatar>A</Avatar>

//           <Typography>Admin</Typography>

//           <Button color="inherit">
//             Logout
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;