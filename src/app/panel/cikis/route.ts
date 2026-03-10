import { NextResponse } from "next/server";
import { PANEL_SESSION_COOKIE } from "@/lib/panel-session";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/kayit-ol?mode=login", request.url));
  response.cookies.set(PANEL_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
