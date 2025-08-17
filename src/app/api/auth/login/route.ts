// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";

import { COOKIE_LOGIN_MFA, setAuthTokenCookie } from "@/constants/cookies";
import authenticatedAxios from "@/hooks/axios";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { config } from "@/config/vars";
import { initializeApp } from "firebase/app";

const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);

export async function POST(req: NextRequest) {
  try {
    const loginPayload = await req.json();

    const { data } = await authenticatedAxios({
      method: "POST",
      url: `/api/v1/auth/login`,
      data: loginPayload,
    });

    const token = data?.token;

    if (token) {
      await signInWithCustomToken(auth, token);
      const idToken = await auth.currentUser?.getIdToken(true);

      if (idToken) {
        const response = NextResponse.json({ success: true });
        response.cookies.set({
          name: COOKIE_LOGIN_MFA,
          value: idToken,
          maxAge: 60 * 60,
          path: "/",
          sameSite: "lax",
        });

        return response;
      }
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 401 }
    );
  }
}
