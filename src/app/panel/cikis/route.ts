import { NextResponse } from "next/server";
import { clearPanelSessionCookies } from "@/lib/panel-session";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/kayit-ol?mode=login", request.url));
  clearPanelSessionCookies(response);
  return response;
}
