"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CheckCircle2,
  Circle,
  Clock,
  CreditCard,
  FileStack,
  FileUp,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  UserCircle2,
} from "lucide-react";
import type { PanelSessionUser } from "@/lib/panel-types";

type PanelDashboardShellProps = {
  user: PanelSessionUser;
};

type Document = {
  id: string;
  label: string;
  hint: string;
  status: "waiting" | "uploaded" | "approved";
};

function getRequiredDocuments(companySlug: string | undefined): Document[] {
  switch (companySlug) {
    case "sahis-sirketi":
      return [
        { id: "kimlik", label: "TC Kimlik fotokopisi", hint: "Ön ve arka yüz", status: "waiting" },
        { id: "ikametgah", label: "İkametgah belgesi", hint: "Son 3 ay içinde alınmış", status: "waiting" },
        { id: "vergi-dairesi", label: "Vergi dairesi seçimi", hint: "Adresinize en yakın vergi dairesi", status: "waiting" },
        { id: "nace", label: "Faaliyet kodu seçimi", hint: "Ne iş yapacağınızı belirtiriz", status: "waiting" },
        { id: "imza", label: "İmza beyannamesi", hint: "e-İmza ile dijital olarak imzalanacak", status: "waiting" },
      ];
    case "limited-sirketi":
      return [
        { id: "kimlik", label: "TC Kimlik fotokopisi", hint: "Tüm ortaklar için ön ve arka yüz", status: "waiting" },
        { id: "ikametgah", label: "İkametgah belgesi", hint: "Tüm ortaklar için, son 3 ay içinde alınmış", status: "waiting" },
        { id: "sozlesme", label: "Şirket ana sözleşmesi taslağı", hint: "Size hazır şablon göndereceğiz", status: "waiting" },
        { id: "pay", label: "Ortaklar pay belirleme", hint: "Kim, kaç pay alacak?", status: "waiting" },
        { id: "unvan", label: "Şirket unvanı onayı", hint: "MERSİS'te uygunluk kontrolü yapıyoruz", status: "waiting" },
        { id: "sermaye", label: "Sermaye taahhüt formu", hint: "Minimum 10.000 TL", status: "waiting" },
      ];
    case "anonim-sirketi":
      return [
        { id: "kimlik", label: "TC Kimlik fotokopisi", hint: "Tüm ortaklar ve yönetim kurulu için", status: "waiting" },
        { id: "ikametgah", label: "İkametgah belgesi", hint: "Tüm ortaklar için, son 3 ay içinde alınmış", status: "waiting" },
        { id: "sozlesme", label: "Esas sözleşme taslağı", hint: "A.Ş. ana sözleşmesi — size şablon hazırlıyoruz", status: "waiting" },
        { id: "yonetim", label: "Yönetim kurulu listesi", hint: "En az 1 kişi, ad-soyad ve TC kimlik", status: "waiting" },
        { id: "sermaye", label: "Sermaye taahhüt formu", hint: "Minimum 250.000 TL", status: "waiting" },
        { id: "blokaj", label: "Banka sermaye blokaj dekontu", hint: "Sermayenin %25'i banka hesabına bloke edilmeli", status: "waiting" },
      ];
    case "bilanco-sirketi":
      return [
        { id: "kimlik", label: "TC Kimlik fotokopisi", hint: "Ön ve arka yüz", status: "waiting" },
        { id: "ikametgah", label: "İkametgah belgesi", hint: "Son 3 ay içinde alınmış", status: "waiting" },
        { id: "faaliyet", label: "Faaliyet belgesi", hint: "Mevcut ticari faaliyetinizi belgeleyen resmi evrak", status: "waiting" },
        { id: "bilanco", label: "Son yıl bilançosu", hint: "Mali müşavirden onaylı", status: "waiting" },
        { id: "vergi-levhasi", label: "Vergi levhası", hint: "Güncel vergi levhanızın kopyası", status: "waiting" },
      ];
    default:
      return [
        { id: "kimlik", label: "TC Kimlik fotokopisi", hint: "Ön ve arka yüz", status: "waiting" },
        { id: "ikametgah", label: "İkametgah belgesi", hint: "Son 3 ay içinde alınmış", status: "waiting" },
        { id: "sozlesme", label: "Hizmet sözleşmesi", hint: "Tarafınıza e-posta ile gönderilecek", status: "waiting" },
      ];
  }
}

function getTimelineItems(user: PanelSessionUser) {
  return [
    {
      label: "Başvuru alındı",
      hint: "Hesabınız oluşturuldu ve süreç başlatıldı.",
      done: true,
    },
    {
      label: "Kuruluş bilgileri tamamlandı",
      hint: "Paket seçimi ve kişisel bilgiler kaydedildi.",
      done: user.wizard.status === "completed",
    },
    {
      label: "Ödeme doğrulandı",
      hint: "Ödeme onayı alındı, kuruluş süreci tetiklendi.",
      done: user.payment.status === "paid",
    },
    {
      label: "Belgeler teslim alındı",
      hint: "Yüklenen belgeler ekibimiz tarafından inceleniyor.",
      done: false,
    },
    {
      label: "Tescil & Teslimat",
      hint: "Şirket tescili tamamlandı, belgeler teslim edildi.",
      done: false,
    },
  ];
}

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/panel/dashboard", active: true },
  { label: "Kuruluş Süreci", icon: FolderKanban, href: "/panel" },
  { label: "Belgeler", icon: FileStack, href: "#" },
  { label: "Ödeme", icon: CreditCard, href: "/panel/payment" },
  { label: "Profil", icon: UserCircle2, href: "#" },
  { label: "Çıkış", icon: LogOut, href: "/panel/cikis" },
] as const;

export default function PanelDashboardShell({ user }: PanelDashboardShellProps) {
  const companySlug = user.selectedPackage?.companySlug;
  const documents = getRequiredDocuments(companySlug);
  const waitingCount = documents.filter((d) => d.status === "waiting").length;
  const timelineItems = getTimelineItems(user);
  const completedTimelineCount = timelineItems.filter((t) => t.done).length;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F7FBFF_0%,#F2F6FB_100%)] text-[#0F172A]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[270px_1fr]">
        {/* Sidebar — desktop only */}
        <motion.aside
          initial={{ x: -48, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="hidden flex-col bg-[#0F172A] px-6 py-8 text-white lg:flex lg:px-7"
        >
          <div>
            <Link href="/" className="inline-flex">
              <Image src="/LOGO-END.svg" alt="Work365" width={144} height={40} className="h-10 w-auto" />
            </Link>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/8 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7DD3FC]">Hesap</p>
              <p className="mt-2 text-[20px] font-bold tracking-[-0.04em]">{user.fullName}</p>
              <p className="mt-1 text-[13px] text-white/60">{user.email}</p>
            </div>

            <nav className="mt-6 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[16px] px-4 py-3 text-[14px] font-semibold transition-colors ${
                    "active" in item && item.active
                      ? "bg-white text-[#0F172A]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-6">
            <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7DD3FC]">Paket</p>
              <p className="mt-2 text-[18px] font-semibold">{user.selectedPackage?.label || "Henüz seçilmedi"}</p>
              <p className="mt-1 text-[13px] text-white/60">{user.selectedPackage?.priceLabel || ""}</p>
            </div>
          </div>
        </motion.aside>

        {/* Ana içerik */}
        <section className="flex flex-col px-5 py-6 pb-24 sm:px-8 lg:pb-10 lg:px-12 lg:py-10">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.12, ease: "easeOut" }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#1B98D5]">Dashboard</p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <h1 className="text-[36px] font-bold leading-[1.0] tracking-[-0.05em] sm:text-[48px]">
                {user.selectedPackage?.label || "Kuruluş"} süreci
              </h1>
              <div className="flex items-center gap-2 rounded-full border border-[#DCE7F1] bg-white px-4 py-2 text-[14px] font-semibold text-[#0F172A] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
                {completedTimelineCount} / {timelineItems.length} adım tamamlandı
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#64748B]">
              Ödemeniz onaylandı. Aşağıdaki belgeleri yükleyerek kuruluş sürecinizi tamamlayın.
            </p>
          </motion.div>

          {/* Durum Şeridi */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.22 }}
            className="mt-6 grid grid-cols-3 gap-3"
          >
            {[
              {
                label: "Paket",
                value: user.selectedPackage?.label || "Seçilmedi",
                done: Boolean(user.selectedPackage),
              },
              {
                label: "Ödeme",
                value: user.payment.status === "paid" ? "Ödendi" : "Bekliyor",
                done: user.payment.status === "paid",
              },
              {
                label: "e-İmza",
                value: user.eTugraStatus === "triggered" ? "Tetiklendi" : "Bekleniyor",
                done: user.eTugraStatus === "triggered",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[20px] border border-[#DCE7F1] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">{item.label}</p>
                <p className={`mt-2 truncate text-[15px] font-bold ${item.done ? "text-[#16A34A]" : "text-[#0F172A]"}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Belge Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.3 }}
            className="mt-6 rounded-[28px] border border-[#DCE7F1] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1B98D5]">Gerekli Belgeler</p>
                <p className="mt-1 text-[20px] font-bold tracking-[-0.04em] text-[#0F172A]">
                  {waitingCount} belge bekleniyor
                </p>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-[#64748B]">
                  {documents.length - waitingCount} / {documents.length} tamamlandı
                </p>
                <div className="mt-2 h-1.5 w-32 rounded-full bg-[#E2E8F0]">
                  <div
                    className="h-full rounded-full bg-[#16A34A] transition-all duration-500"
                    style={{ width: `${((documents.length - waitingCount) / documents.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.24, delay: 0.35 + index * 0.06 }}
                  className={`flex items-center justify-between gap-4 rounded-[18px] border px-4 py-4 transition-colors ${
                    doc.status === "approved"
                      ? "border-[#BBF7D0] bg-[#F0FDF4]"
                      : doc.status === "uploaded"
                        ? "border-[#BFDBFE] bg-[#EFF6FF]"
                        : "border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {doc.status === "approved" ? (
                        <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />
                      ) : doc.status === "uploaded" ? (
                        <Clock className="h-5 w-5 text-[#2563EB]" />
                      ) : (
                        <Circle className="h-5 w-5 text-[#CBD5E1]" />
                      )}
                    </div>
                    <div>
                      <p className={`text-[15px] font-semibold ${doc.status === "waiting" ? "text-[#0F172A]" : doc.status === "uploaded" ? "text-[#1D4ED8]" : "text-[#15803D]"}`}>
                        {doc.label}
                      </p>
                      <p className="mt-0.5 text-[13px] text-[#64748B]">{doc.hint}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {doc.status === "approved" ? (
                      <span className="rounded-full bg-[#DCF7E8] px-3 py-1 text-[12px] font-semibold text-[#15803D]">
                        Onaylandı
                      </span>
                    ) : doc.status === "uploaded" ? (
                      <span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold text-[#1D4ED8]">
                        İnceleniyor
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled
                        title="Belge yükleme yakında aktif olacak"
                        className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-[#DCE7F1] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#94A3B8] opacity-60"
                      >
                        <FileUp className="h-3.5 w-3.5" />
                        Yakında
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-5 text-[13px] text-[#94A3B8]">
              Belgelerinizi yükledikten sonra ekibimiz 1 iş günü içinde inceler ve sizi bilgilendirir.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: 0.46 }}
            className="mt-6 rounded-[28px] border border-[#DCE7F1] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]"
          >
            <p className="text-[16px] font-bold tracking-[-0.03em] text-[#0F172A]">Süreç Zaman Çizelgesi</p>
            <div className="mt-5 space-y-2">
              {timelineItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-start gap-3 rounded-[18px] px-4 py-3.5 ${
                    item.done ? "bg-[#F0FDF4]" : "bg-[#F8FAFC]"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.done ? (
                      <BadgeCheck className="h-5 w-5 text-[#16A34A]" />
                    ) : (
                      <Circle className="h-5 w-5 text-[#CBD5E1]" />
                    )}
                  </div>
                  <div>
                    <p className={`text-[15px] font-semibold ${item.done ? "text-[#15803D]" : "text-[#64748B]"}`}>
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[13px] text-[#94A3B8]">{item.hint}</p>
                  </div>
                  {index === completedTimelineCount && !item.done && (
                    <span className="ml-auto shrink-0 rounded-full bg-[#FEF3C7] px-2.5 py-1 text-[11px] font-semibold text-[#92400E]">
                      Sıradaki
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* Mobil bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-around border-t border-[#E2E8F0] bg-white px-2 py-2 lg:hidden">
        {[
          { label: "Dashboard", icon: LayoutDashboard, href: "/panel/dashboard" },
          { label: "Belgeler", icon: FileStack, href: "#" },
          { label: "Ödeme", icon: CreditCard, href: "/panel/payment" },
          { label: "Çıkış", icon: LogOut, href: "/panel/cikis" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-1 flex-col items-center gap-1 rounded-[14px] py-2 text-[#64748B] transition-colors hover:text-[#0F172A]"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
