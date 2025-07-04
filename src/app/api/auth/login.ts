import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${process.env.API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  const token = json?.data?.token;

  if (!token) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.headers.set(
    "Set-Cookie",
    serialize("__cookie_auth_token_client", token, {
      path: "/",
      httpOnly: true, // ❗ Required to be readable by server
      maxAge: 60 * 60 * 24 * 30,
    })
  );

  return token;
}
