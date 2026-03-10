import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PanelPaymentShell from "@/components/panel/PanelPaymentShell";
import { getSessionUserId } from "@/lib/panel-session";
import { getUserById } from "@/lib/panel-store";

export default async function PanelPaymentPage() {
  const cookieStore = await cookies();
  const user = await getUserById(getSessionUserId(cookieStore));

  if (!user) {
    redirect("/kayit-ol?mode=login");
  }

  if (user.wizard.status !== "completed") {
    redirect("/panel");
  }

  if (user.payment.status === "paid") {
    redirect("/panel/dashboard");
  }

  return <PanelPaymentShell initialUser={user} />;
}
