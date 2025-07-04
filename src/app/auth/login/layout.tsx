import { cookies } from "next/headers";
import { COOKIE_AUTH_TOKEN } from "@/constants/cookies";
import { routes } from "@/constants/routes";

import { redirect } from "next/navigation";
import React from "react";

async function LoginLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get(COOKIE_AUTH_TOKEN);

  if (authToken) {
    redirect(routes.protected.dashboard);
  }
  return <>{children}</>;
}

export default LoginLayout;
