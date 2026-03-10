import { NextResponse } from "next/server";
import { PANEL_SESSION_COOKIE } from "@/lib/panel-session";
import { createOrGetGoogleDemoUser, loginUser } from "@/lib/panel-store";

type LoginPayload = {
  email?: string;
  password?: string;
  provider?: "google";
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
    const body = (await request.json()) as LoginPayload;
    const user =
      body.provider === "google"
        ? await createOrGetGoogleDemoUser()
        : await loginUser({
            email: body.email?.trim().toLowerCase() ?? "",
            password: body.password ?? "",
            selectedPackage: body.selectedPackage,
          });

    const redirectTo =
      user.wizard.status === "completed"
        ? user.payment.status === "paid"
          ? "/panel/dashboard"
          : "/panel/payment"
        : "/panel";
    const response = NextResponse.json({ ok: true, redirectTo, user });
    response.cookies.set(PANEL_SESSION_COOKIE, user.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Giris sirasinda bir hata olustu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
