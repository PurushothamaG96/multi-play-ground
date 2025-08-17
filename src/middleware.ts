import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./constants/routes";
import { getCookie } from "cookies-next/server";
import { COOKIE_AUTH_TOKEN, getAuthTokenCookie } from "./constants/cookies";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  // const res = NextResponse.next();
  const isAuthenticated = await getCookie(COOKIE_AUTH_TOKEN, {
    res,
    req: request,
  });

  // List of protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    ) &&
    !isAuthenticated
  ) {
    const loginUrl = new URL(routes.auth.login, request.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Optionally, specify which paths to run the middleware on
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
