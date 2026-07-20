import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Employees",
    icon: <PeopleIcon />,
  },
  {
    text: "Departments",
    icon: <ApartmentIcon />,
  },
  {
    text: "Leave Requests",
    icon: <EventNoteIcon />,
  },
  {
    text: "Reports",
    icon: <AssessmentIcon />,
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
  },
];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#fff",
        },
      }}
    >
      <Toolbar />

      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;


// import {
//   Drawer,
//   Toolbar,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import SettingsIcon from "@mui/icons-material/Settings";

// const drawerWidth = 230;

// const menu = [
//   {
//     text: "Dashboard",
//     icon: <DashboardIcon />,
//   },
//   {
//     text: "Employees",
//     icon: <PeopleIcon />,
//   },
//   {
//     text: "Departments",
//     icon: <ApartmentIcon />,
//   },
//   {
//     text: "Leave Requests",
//     icon: <EventNoteIcon />,
//   },
//   {
//     text: "Reports",
//     icon: <AssessmentIcon />,
//   },
//   {
//     text: "Settings",
//     icon: <SettingsIcon />,
//   },
// ];

// const Sidebar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,

//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//         },
//       }}
//     >
//       {/* Makes the sidebar start below the AppBar */}
//       <Toolbar />

//       <List>
//         {menu.map((item) => (
//           <ListItemButton key={item.text}>
//             <ListItemIcon>
//               {item.icon}
//             </ListItemIcon>

//             <ListItemText primary={item.text} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;