"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, CreditCard, FileStack, FolderKanban, LayoutDashboard, LogOut, Sparkles, UserCircle2 } from "lucide-react";
import type { PanelSessionUser } from "@/lib/panel-types";

type PanelDashboardShellProps = {
  user: PanelSessionUser;
};

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/panel/dashboard", active: true },
  { label: "Kuruluş Süreci", icon: FolderKanban, href: "/panel" },
  { label: "Belgeler", icon: FileStack, href: "#" },
  { label: "Ödeme", icon: CreditCard, href: "/panel/payment" },
  { label: "Profil", icon: UserCircle2, href: "#" },
  { label: "Çıkış", icon: LogOut, href: "/panel/cikis" },
] as const;

const quickActions = [
  {
    title: "Kuruluş akışını görüntüle",
    description: "Verdiğiniz cevapları ve ilerleme durumunu tek ekranda görün.",
    href: "/panel",
  },
  {
    title: "Belge listesini aç",
    description: "İstenen belgeler için alanı açın ve takip edin.",
    href: "#",
  },
  {
    title: "Ödeme bilgilerini gözden geçir",
    description: "Kart ve fatura verilerini tekrar kontrol edin.",
    href: "/panel/payment",
  },
] as const;

export default function PanelDashboardShell({ user }: PanelDashboardShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#F7FBFF_0%,#F2F6FB_100%)] text-[#0F172A]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[290px_1fr]">
        <motion.aside
          initial={{ x: -48, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative flex flex-col bg-[#0F172A] px-6 py-8 text-white lg:px-7"
        >
          <div>
            <Link href="/" className="inline-flex">
              <Image src="/LOGO-END.svg" alt="Work365" width={144} height={40} className="h-10 w-auto" />
            </Link>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <p className="text-[12px] uppercase tracking-[0.24em] text-[#7DD3FC]">Work365 Panel</p>
              <p className="mt-3 text-[26px] font-bold tracking-[-0.05em]">{user.fullName}</p>
              <p className="mt-2 text-[14px] text-white/70">{user.email}</p>
            </div>

            <nav className="mt-8 space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[18px] px-4 py-3 text-[14px] font-semibold transition-colors ${
                    "active" in item && item.active
                      ? "bg-white text-[#0F172A]"
                      : "text-white/74 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/8 p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7DD3FC]">Paket</p>
              <p className="mt-3 text-[22px] font-semibold tracking-[-0.04em]">{user.selectedPackage?.label || "Henüz seçilmedi"}</p>
              <p className="mt-3 text-[14px] text-white/72">{user.selectedPackage?.priceLabel || "Teklif sırasında netleşecek"}</p>
            </div>
          </div>
        </motion.aside>

        <section className="flex min-h-screen flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.18, ease: "easeOut" }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#1B98D5]">Dashboard</p>
            <h1 className="mt-4 max-w-[12ch] text-[42px] font-bold leading-[0.95] tracking-[-0.06em] sm:text-[58px]">
              Kuruluş süreci başladı.
            </h1>
            <p className="mt-5 max-w-3xl text-[16px] leading-7 text-[#64748B]">
              Paket seçimi, onboarding ve demo ödeme tamamlandı. Artık süreç durumunu sade panelden takip edebilirsiniz.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.28,
                },
              },
            }}
            className="mt-8 grid gap-4 xl:grid-cols-3"
          >
            {quickActions.map((action) => (
              <motion.div
                key={action.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="h-full"
              >
                <Link
                  href={action.href}
                  className="flex h-full flex-col rounded-[30px] border border-[#DCE7F1] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] transition-transform hover:-translate-y-1"
                >
                  <div className="inline-flex rounded-full bg-[#F0F9FF] p-3 text-[#1B98D5]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-[22px] font-semibold tracking-[-0.04em] text-[#0F172A]">{action.title}</p>
                  <p className="mt-3 text-[15px] leading-7 text-[#64748B]">{action.description}</p>
                  <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#1B98D5]">
                    Aç
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.46 }}
              className="rounded-[30px] border border-[#DCE7F1] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]"
            >
              <p className="text-[18px] font-semibold text-[#0F172A]">Durum</p>
              <div className="mt-5 space-y-4">
                <SummaryRow label="Seçilen paket" value={user.selectedPackage?.label || "Henüz seçilmedi"} />
                <SummaryRow label="Ödeme" value={user.payment.status === "paid" ? "Ödendi" : "Bekliyor"} />
                <SummaryRow label="E-Tuğra" value={user.eTugraStatus === "triggered" ? "Tetiklendi" : "Bekliyor"} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.54 }}
              className="rounded-[30px] border border-[#DCE7F1] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]"
            >
              <p className="text-[18px] font-semibold text-[#0F172A]">Süreç zaman çizelgesi</p>
              <div className="mt-5 space-y-3">
                {[
                  "Başvuru alındı",
                  "Kuruluş bilgileri tamamlandı",
                  "Ödeme doğrulandı",
                  "E-Tuğra tetiklendi",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[22px] bg-[#F8FBFF] px-4 py-4">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]" />
                    <div>
                      <p className="text-[16px] font-semibold text-[#0F172A]">{item}</p>
                      <p className="mt-1 text-[14px] leading-6 text-[#64748B]">Bu adım panelde işaretlendi ve süreç akışına işlendi.</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] pb-3 last:border-b-0 last:pb-0">
      <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">{label}</span>
      <span className="text-right text-[15px] font-semibold text-[#0F172A]">{value}</span>
    </div>
  );
}
