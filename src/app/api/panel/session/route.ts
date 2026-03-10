import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/panel-session";
import { getUserById } from "@/lib/panel-store";

export async function GET() {
  const cookieStore = await cookies();
  const user = await getUserById(getSessionUserId(cookieStore));

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
