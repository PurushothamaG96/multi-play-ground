import { Box } from "@mui/material";
import React from "react";

import VerticalNavBar from "@/components/side-bar/vertical-nav-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box display={"flex"}>
      <VerticalNavBar />
      <Box component="main" sx={{ margin: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
