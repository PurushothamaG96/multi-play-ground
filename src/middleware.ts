// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_AUTH_TOKEN } from "./constants/cookies";
import { getCookie } from "cookies-next/server";
import { routes } from "./constants/routes";

export async function middleware(request: NextRequest) {
  const token = await getCookie(COOKIE_AUTH_TOKEN, {
    req: request,
    res: NextResponse.next(),
  });

  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL(routes.auth.login, request.url));
  }

  return NextResponse.next();
}

// run only on /dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
