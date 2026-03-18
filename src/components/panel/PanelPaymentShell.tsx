"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, FileText, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import type { PanelSessionUser } from "@/lib/panel-types";

type PanelPaymentShellProps = {
  initialUser: PanelSessionUser;
};

function formatExpiryInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function PanelPaymentShell({ initialUser }: PanelPaymentShellProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isSecuring, setIsSecuring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kart bilgileri
  const [cardHolderName, setCardHolderName] = useState(initialUser.payment.cardHolderName || initialUser.fullName);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleGoBack = async () => {
    try {
      await fetch("/api/panel/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stepId: "package",
          values: {
            companySlug: initialUser.selectedPackage?.companySlug ?? "",
            label: initialUser.selectedPackage?.label ?? "",
            locked: true,
            confirmed: true,
          },
          nextStep: 2,
          markCompleted: false,
        }),
      });
    } catch {
      // hata olsa bile geri dön
    }
    router.push("/panel");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!cardHolderName.trim()) { setError("Kart sahibi adı gerekli."); return; }
    if (cardNumber.replace(/\s+/g, "").length < 16) { setError("Kart numarası eksik."); return; }
    if (!expiry.trim() || cvv.trim().length < 3) { setError("Son kullanma tarihi ve CVV gerekli."); return; }

    setIsSaving(true);
    try {
      setIsSecuring(true);
      await new Promise((resolve) => window.setTimeout(resolve, 2200));

      const response = await fetch("/api/panel/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStep: 7,
          finalize: true,
          cardHolderName,
          cardNumber,
          expiry,
          cvv,
          invoice: { companyTitle: "", taxNumber: "", address: "", city: "" },
        }),
      });

      const payload = (await response.json()) as { error?: string; user?: PanelSessionUser; redirectTo?: string };

      if (!response.ok || !payload.user) {
        throw new Error(payload.error || "Ödeme tamamlanamadı.");
      }

      router.push(payload.redirectTo || "/panel/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ödeme tamamlanamadı.");
    } finally {
      setIsSaving(false);
      setIsSecuring(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#F8FBFF_0%,#F2F6FB_100%)] text-[#0F172A]">
      <AnimatePresence>
        {isSecuring ? (
          <motion.div
            key="secure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A] px-6 text-center text-white"
          >
            <ShieldCheck className="h-12 w-12 text-[#7DD3FC]" />
            <p className="mt-6 text-[14px] uppercase tracking-[0.24em] text-[#7DD3FC]">3D Secure</p>
            <h2 className="mt-4 max-w-[13ch] text-[30px] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[34px]">
              Ödeme doğrulanıyor.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/72">
              Kart doğrulaması tamamlanıyor. Başarılı olduğunda dashboard&apos;a yönlendirileceksiniz.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(300px,34vw)_1fr]">
        {/* Sidebar */}
        <section className="hidden bg-[#0F172A] px-10 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <button type="button" onClick={handleGoBack} className="inline-flex items-center gap-2 text-[14px] font-medium text-white/74 transition-colors hover:text-white">
              <ChevronLeft className="h-4 w-4" />
              Geri dön
            </button>
            <p className="mt-10 text-[12px] uppercase tracking-[0.28em] text-[#7DD3FC]">Son Adım</p>
            <h1 className="mt-4 max-w-[12ch] text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] text-white xl:text-[44px]">
              Hepsi bu kadar.
            </h1>
            <p className="mt-6 text-[16px] leading-7 text-white/72">
              Ödemen onaylandıktan sonra kuruluş süreci başlar.
            </p>
          </div>

          {initialUser.selectedPackage ? (
            <div className="rounded-[28px] border border-white/10 bg-white/8 p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7DD3FC]">Paket</p>
              <p className="mt-3 text-[24px] font-semibold">{initialUser.selectedPackage.label}</p>
              {initialUser.selectedPackage.description ? (
                <p className="mt-3 text-[14px] leading-6 text-white/72">{initialUser.selectedPackage.description}</p>
              ) : null}
              <div className="mt-4">
                <span className="rounded-full bg-white px-4 py-2 text-[15px] font-semibold text-[#0F172A]">
                  {initialUser.selectedPackage.priceLabel}
                </span>
              </div>
              {initialUser.selectedPackage.features.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {initialUser.selectedPackage.features.slice(0, 4).map((feature) => (
                    <span key={feature} className="rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-white/82">
                      {feature}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {/* Ana form */}
        <section className="flex min-h-screen flex-col px-5 py-5 sm:px-10 lg:px-16 xl:px-24">
          <header className="flex items-center justify-between lg:hidden">
            <button type="button" onClick={handleGoBack} className="inline-flex items-center gap-2 text-[14px] font-medium text-[#334155]">
              <ChevronLeft className="h-4 w-4" />
              Geri dön
            </button>
            <Image src="/LOGO-END.svg" alt="Work365" width={120} height={34} className="h-8 w-auto" />
          </header>

          <div className="flex flex-1 items-start pt-10 lg:items-center lg:pt-0">
            <form onSubmit={handleSubmit} className="w-full max-w-[580px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#1B98D5]">Adım 3 / 3 · Ödeme</p>
                <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.04em] text-[#0F172A] sm:text-[34px]">
                  Kart bilgilerini gir.
                </h2>

                {/* Paket özeti — mobil */}
                {initialUser.selectedPackage ? (
                  <div className="mt-6 rounded-[20px] border border-[#DCE7F1] bg-white px-5 py-4 lg:hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] font-semibold text-[#0F172A]">{initialUser.selectedPackage.label}</p>
                      <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-[13px] font-semibold text-[#0F172A]">
                        {initialUser.selectedPackage.priceLabel}
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Kart Bilgileri */}
                <div className="mt-8 space-y-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">Kart Bilgileri</p>
                  <FormInput
                    label="Kart sahibinin adı"
                    value={cardHolderName}
                    onChange={setCardHolderName}
                    placeholder="Ad Soyad"
                    autoFocus
                  />
                  <FormInput
                    label="Kart numarası"
                    value={cardNumber}
                    onChange={setCardNumber}
                    placeholder="0000 0000 0000 0000"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Son kullanma"
                      value={expiry}
                      onChange={(v) => setExpiry(formatExpiryInput(v))}
                      placeholder="AA/YY"
                    />
                    <FormInput
                      label="CVV"
                      value={cvv}
                      onChange={setCvv}
                      placeholder="000"
                    />
                  </div>
                </div>

                {/* Fatura notu */}
                <div className="mt-6 flex items-start gap-3 rounded-[20px] border border-[#DCE7F1] bg-[#F8FBFF] px-5 py-4">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#1B98D5]" />
                  <p className="text-[13px] leading-6 text-[#475569]">
                    Şirket kuruluşu henüz tamamlanmadığı için fatura bilgilerin şu an alınmıyor.
                    Tescil resmi olarak tamamlandığında vergi numaranıza kesilmiş fatura e-posta adresinize iletilecektir.
                  </p>
                </div>

                {error ? <p className="mt-4 text-[14px] font-medium text-[#DC2626]">{error}</p> : null}

                <div className="mt-8 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSaving || isSecuring}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-7 py-4 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? "İşleniyor..." : "Ödemeyi Tamamla"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="flex items-center gap-1.5 text-[13px] text-[#94A3B8]">
                    <ShieldCheck className="h-4 w-4" />
                    SSL ile şifrelendi
                  </p>
                </div>
              </motion.div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  autoFocus = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-[#475569]">{label}</label>
      <input
        autoFocus={autoFocus}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[18px] border border-[#DCE7F1] bg-white px-5 py-4 text-[16px] font-medium text-[#0F172A] outline-none transition-all placeholder:text-[#A3B3C2] focus:border-[#1B98D5] focus:shadow-[0_0_0_3px_rgba(27,152,213,0.14)]"
      />
    </div>
  );
}
