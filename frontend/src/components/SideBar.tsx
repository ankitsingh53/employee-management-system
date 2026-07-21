import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EventNoteIcon from "@mui/icons-material/EventNote";

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
];

const SideBar = () => {
  return (
    <Box
      sx={{
        width: 290,
        minHeight: "100%",
        bgcolor: "#fff",
        borderRight: "1px solid #E5E7EB",
        flexShrink: 0,
        marginTop: " 20px",
        marginLeft: "10px",
      }}
    >
      <List sx={{ p: 2 }}>
        {menuItems.map((item, index) => (
          <Box key={item.text}>
            <ListItemButton
              selected={index === 0}
              sx={{
                borderRadius: 2,
                py: 1.2,

                "&:hover": {
                  bgcolor: "#F5F5F5",
                },

                "&.Mui-selected": {
                  bgcolor: "#EEF4FF",

                  "& .MuiListItemIcon-root": {
                    color: "#1976D2",
                  },

                  "& .MuiTypography-root": {
                    color: "#1976D2",
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
