import { Box } from "@mui/material";
import React from "react";

import VerticalNavBar from "@/components/side-bar/vertical-nav-bar";
import { cookies } from "next/headers";
import { COOKIE_AUTH_TOKEN } from "@/constants/cookies";
import { routes } from "@/constants/routes";
import { redirect } from "next/navigation";
import PrimarySearchAppBar from "@/components/app-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get(COOKIE_AUTH_TOKEN);

  if (!authToken) {
    redirect(routes.login.login);
  }
  return (
    <>
      <PrimarySearchAppBar />
      <Box display={"flex"}>
        <VerticalNavBar />
        <Box component="main" sx={{ margin: 2 }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
