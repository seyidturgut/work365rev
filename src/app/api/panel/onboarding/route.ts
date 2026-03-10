import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionUserId, getSessionUserState, setPanelSessionCookies } from "@/lib/panel-session";
import { updateOnboardingStep } from "@/lib/panel-store";
import type { WizardStepId } from "@/lib/panel-types";

type OnboardingPayload = {
  stepId?: WizardStepId;
  values?: Record<string, string | boolean>;
  nextStep?: number;
  markCompleted?: boolean;
};

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = getSessionUserId(cookieStore);
    const sessionUser = getSessionUserState(cookieStore);

    if (!userId && !sessionUser) {
      return NextResponse.json({ error: "Oturum bulunamadi." }, { status: 401 });
    }

    const body = (await request.json()) as OnboardingPayload;

    if (!body.stepId || !body.values) {
      return NextResponse.json({ error: "Gecerli bir onboarding adimi gonderin." }, { status: 400 });
    }

    const user = await updateOnboardingStep({
      userId: userId || sessionUser!.id,
      stepId: body.stepId,
      values: body.values,
      nextStep: body.nextStep,
      markCompleted: body.markCompleted,
    });

    const response = NextResponse.json({ ok: true, user });
    setPanelSessionCookies(response, user);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onboarding kaydi basarisiz oldu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
