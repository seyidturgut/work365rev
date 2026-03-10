import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PanelOnboardingShell from "@/components/panel/PanelOnboardingShell";
import { getSessionUserId } from "@/lib/panel-session";
import { getUserById } from "@/lib/panel-store";

export default async function PanelPage() {
  const cookieStore = await cookies();
  const user = await getUserById(getSessionUserId(cookieStore));

  if (!user) {
    redirect("/kayit-ol?mode=login");
  }

  if (user.wizard.status === "completed") {
    redirect(user.payment.status === "paid" ? "/panel/dashboard" : "/panel/payment");
  }

  return <PanelOnboardingShell initialUser={user} />;
}
