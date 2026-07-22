import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EventNoteIcon from "@mui/icons-material/EventNote";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
  },
  {
    text: "Employees",
    icon: <PeopleIcon />,
    path: "/admin/employees",
  },
  {
    text: "Departments",
    icon: <ApartmentIcon />,
    path: "/admin/add-department",
  },
  {
    text: "Leave Requests",
    icon: <EventNoteIcon />,
    path:"/admin/leave"
  },
];

const SideBar = () => {
  return (
    <Box
      sx={{
        width: 290,
        minHeight: "100%",
        bgcolor: "#F9FAFB",
        borderRight: "1px solid #D1D5DB",
        flexShrink: 0,
      }}
    >
      <List sx={{ p: 2, marginTop: '30px' }}>
        {menuItems.map((item, index) => (
          <Box key={item.text}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: 2,
                py: 1.2,

                "&:hover": {
                  bgcolor: "#ECEFF1",
                },

                "&.Mui-selected": {
                  bgcolor: "#E5E7EB",

                  "& .MuiListItemIcon-root": {
                    color: "#1976D2",
                  },

                  "& .MuiTypography-root": {
                    color: "#374151",
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>

            {index !== menuItems.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
