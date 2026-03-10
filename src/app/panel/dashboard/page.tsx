import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PanelDashboardShell from "@/components/panel/PanelDashboardShell";
import { getSessionUserId } from "@/lib/panel-session";
import { getUserById } from "@/lib/panel-store";

export default async function PanelDashboardPage() {
  const cookieStore = await cookies();
  const user = await getUserById(getSessionUserId(cookieStore));

  if (!user) {
    redirect("/kayit-ol?mode=login");
  }

  if (user.wizard.status !== "completed" || user.payment.status !== "paid") {
    redirect("/panel");
  }

  return <PanelDashboardShell user={user} />;
}
