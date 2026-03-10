import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionUserId, getSessionUserState, setPanelSessionCookies } from "@/lib/panel-session";
import { getUserById } from "@/lib/panel-store";

export async function GET() {
  const cookieStore = await cookies();
  const user = (await getUserById(getSessionUserId(cookieStore))) || getSessionUserState(cookieStore);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const response = NextResponse.json({ user });
  setPanelSessionCookies(response, user);
  return response;
}
