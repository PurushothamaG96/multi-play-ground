import { Box } from "@mui/material";
import React from "react";

import VerticalNavBar from "@/components/side-bar/vertical-nav-bar";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  return (
    <>
      <Box
        display={"flex"}
        sx={{
          border: 2,
          borderColor: "white",
        }}
      >
        <VerticalNavBar />
        <Box component="main">{children}</Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
