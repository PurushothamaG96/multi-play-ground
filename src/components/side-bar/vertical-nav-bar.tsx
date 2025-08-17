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
  Toolbar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: routes.protected.dashboard,
  },
  { label: "Users", icon: <PeopleIcon />, path: routes.protected.users },
  { label: "Teachers", icon: <SchoolIcon />, path: routes.protected.teachers },
  { label: "Students", icon: <PeopleIcon />, path: routes.protected.students },
  { label: "Parents", icon: <PersonIcon />, path: routes.protected.parents },
  { label: "Classes", icon: <GroupIcon />, path: "/classes" },
  { label: "Courses", icon: <MenuBookIcon />, path: "/courses" },
];

const drawerWidth = 220;
const collapsedWidth = 64;

const VerticalNavBar: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

  return (
    <Box
      sx={{
        border: 2,
        borderColor: "white",
        minHeight: "100vh",
      }}
    >
      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: isMdDown ? collapsedWidth : drawerWidth,
          flexShrink: 0,
           height: "100%",
          [`& .MuiDrawer-paper`]: {
            width: isMdDown ? collapsedWidth : drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
            position: "relative",
            height: "100%"
          },
        }}
      >
        {/* Spacer for AppBar (if you have one at top) */}
        <Toolbar />
        <List>
          {navItems.map((item) => {
            const content = (
              <ListItemButton
                key={item.label}
                onClick={() => router.push(item.path)}
              >
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

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMdDown ? `${collapsedWidth}px` : `${drawerWidth}px`,
          transition: "margin 0.3s ease",
        }}
      >
        <Toolbar /> {/* push content below AppBar if exists */}
        {children}
      </Box>
    </Box>
  );
};

export default VerticalNavBar;
