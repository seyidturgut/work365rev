import { NextResponse } from "next/server";
import { setPanelSessionCookies } from "@/lib/panel-session";
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
        ? await createOrGetGoogleDemoUser(body.selectedPackage)
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
    setPanelSessionCookies(response, user);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Giris sirasinda bir hata olustu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
