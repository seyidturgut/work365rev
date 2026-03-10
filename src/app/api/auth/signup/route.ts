import { NextResponse } from "next/server";
import { PANEL_SESSION_COOKIE } from "@/lib/panel-session";
import { signupUser } from "@/lib/panel-store";

type SignupPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
    selectedPackage?: {
      company?: string | null;
      price?: string | number | null;
      label?: string | null;
      source?: string | null;
      term?: string | null;
      description?: string | null;
      features?: string[] | null;
    } | null;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupPayload;
    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() ?? "";
    const password = body.password ?? "";

    if (!fullName || !email || !phone || !password) {
      return NextResponse.json({ error: "Lutfen zorunlu alanlari doldurun." }, { status: 400 });
    }

    const user = await signupUser({
      fullName,
      email,
      phone,
      password,
      selectedPackage: body.selectedPackage,
    });

    const response = NextResponse.json({ ok: true, redirectTo: "/panel", user });
    response.cookies.set(PANEL_SESSION_COOKIE, user.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kayit sirasinda bir hata olustu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
