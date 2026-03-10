import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionUserId, getSessionUserState, setPanelSessionCookies } from "@/lib/panel-session";
import { savePayment } from "@/lib/panel-store";

type PaymentPayload = {
  currentStep?: number;
  cardHolderName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  finalize?: boolean;
  invoice?: {
    companyTitle?: string;
    taxNumber?: string;
    address?: string;
    city?: string;
  };
};

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = getSessionUserId(cookieStore);
    const sessionUser = getSessionUserState(cookieStore);

    if (!userId && !sessionUser) {
      return NextResponse.json({ error: "Oturum bulunamadi." }, { status: 401 });
    }

    const body = (await request.json()) as PaymentPayload;
    const cardHolderName = body.cardHolderName?.trim() ?? "";
    const cardNumber = body.cardNumber?.replace(/\s+/g, "") ?? "";
    const expiry = body.expiry?.trim() ?? "";
    const cvv = body.cvv?.trim() ?? "";
    const invoice = {
      companyTitle: body.invoice?.companyTitle?.trim() ?? "",
      taxNumber: body.invoice?.taxNumber?.trim() ?? "",
      address: body.invoice?.address?.trim() ?? "",
      city: body.invoice?.city?.trim() ?? "",
    };

    if (body.finalize) {
      if (!cardHolderName || cardNumber.length < 16 || !expiry || cvv.length < 3) {
        return NextResponse.json({ error: "Kart bilgilerini eksiksiz girin." }, { status: 400 });
      }

      if (!invoice.companyTitle || !invoice.taxNumber || !invoice.address || !invoice.city) {
        return NextResponse.json({ error: "Fatura bilgilerini eksiksiz girin." }, { status: 400 });
      }
    }

    const user = await savePayment({
      userId: userId || sessionUser!.id,
      currentStep: body.currentStep,
      cardHolderName,
      cardNumber,
      expiry,
      cvv,
      invoice,
      finalize: body.finalize,
    });

    const response = NextResponse.json({ ok: true, redirectTo: "/panel/dashboard", user });
    setPanelSessionCookies(response, user);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Odeme kaydi sirasinda hata olustu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
