"use client";
import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Tooltip,
  ListItemButton,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon /> },
  { label: "Teachers", icon: <SchoolIcon /> },
  { label: "Students", icon: <PeopleIcon /> },
  { label: "Parents", icon: <PersonIcon /> },
  { label: "Classes", icon: <GroupIcon /> },
  { label: "Courses", icon: <MenuBookIcon /> },
];

const drawerWidth = 220;
const collapsedWidth = 64;

const VerticalNavBar: React.FC = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isMdDown ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isMdDown ? collapsedWidth : drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
            overflowX: "hidden",
            top: 64, // Offset for AppBar
            height: "calc(100% - 64px)", // Adjust height
            position: "fixed", // Required for top offset to take effect
          },
        }}
      >
        <List>
          {navItems.map((item) => {
            const content = (
              <ListItemButton key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!isMdDown && <ListItemText primary={item.label} />}
              </ListItemButton>
            );

            return isMdDown ? (
              <Tooltip
                key={item.label}
                title={item.label}
                placement="right"
                arrow
              >
                {content}
              </Tooltip>
            ) : (
              content
            );
          })}
        </List>
      </Drawer>
      {/* Main content placeholder to prevent content from going under the drawer */}
    </Box>
  );
};

export default VerticalNavBar;
