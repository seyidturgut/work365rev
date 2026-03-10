"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { PanelSessionUser } from "@/lib/panel-types";

type PanelPaymentShellProps = {
  initialUser: PanelSessionUser;
};

type PaymentStepKey =
  | "cardHolderName"
  | "cardNumber"
  | "cardMeta"
  | "companyTitle"
  | "taxNumber"
  | "address"
  | "city";

const PAYMENT_STEPS: PaymentStepKey[] = [
  "cardHolderName",
  "cardNumber",
  "cardMeta",
  "companyTitle",
  "taxNumber",
  "address",
  "city",
] as const;

function formatExpiryInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function useTypewriter(text: string) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [text]);

  return visibleText;
}

export default function PanelPaymentShell({ initialUser }: PanelPaymentShellProps) {
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  const [step, setStep] = useState(Math.max(1, initialUser.payment.currentStep || 1));
  const [isSaving, setIsSaving] = useState(false);
  const [isSecuring, setIsSecuring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardHolderName, setCardHolderName] = useState(initialUser.payment.cardHolderName || initialUser.fullName);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [companyTitle, setCompanyTitle] = useState(initialUser.payment.invoice.companyTitle || initialUser.selectedPackage?.label || "");
  const [taxNumber, setTaxNumber] = useState(initialUser.payment.invoice.taxNumber);
  const [address, setAddress] = useState(initialUser.payment.invoice.address);
  const [city, setCity] = useState(initialUser.payment.invoice.city);

  const activeStepId = PAYMENT_STEPS[Math.min(step - 1, PAYMENT_STEPS.length - 1)];
  const question = useMemo(() => {
    switch (activeStepId) {
      case "cardHolderName":
        return "Kart sahibinin adı nedir?";
      case "cardNumber":
        return "Kart numarasını girin.";
      case "cardMeta":
        return "Son kullanma ve CVV bilgilerini alalım.";
      case "companyTitle":
        return "Fatura hangi unvana kesilsin?";
      case "taxNumber":
        return "Vergi numarasını girin.";
      case "address":
        return "Fatura adresini yazın.";
      case "city":
        return "Fatura şehri nedir?";
      default:
        return "";
    }
  }, [activeStepId]);
  const typedQuestion = useTypewriter(question);
  const progress = Math.round(((step - 1) / PAYMENT_STEPS.length) * 100);

  const persistProgress = async (currentStep: number) => {
    const response = await fetch("/api/panel/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentStep,
        cardHolderName,
        cardNumber,
        expiry,
        cvv,
        invoice: {
          companyTitle,
          taxNumber,
          address,
          city,
        },
      }),
    });

    const payload = (await response.json()) as { error?: string; user?: PanelSessionUser };

    if (!response.ok || !payload.user) {
      throw new Error(payload.error || "Ödeme bilgileri kaydedilemedi.");
    }

    setUser(payload.user);
  };

  const handleNext = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (activeStepId === "cardHolderName" && !cardHolderName.trim()) {
      setError("Kart sahibi adı gerekli.");
      return;
    }
    if (activeStepId === "cardNumber" && cardNumber.replace(/\s+/g, "").length < 16) {
      setError("Kart numarası eksik görünüyor.");
      return;
    }
    if (activeStepId === "cardMeta" && (!expiry.trim() || cvv.trim().length < 3)) {
      setError("Son kullanma ve CVV gerekli.");
      return;
    }
    if (activeStepId === "companyTitle" && !companyTitle.trim()) {
      setError("Fatura unvanı gerekli.");
      return;
    }
    if (activeStepId === "taxNumber" && !taxNumber.trim()) {
      setError("Vergi numarası gerekli.");
      return;
    }
    if (activeStepId === "address" && !address.trim()) {
      setError("Fatura adresi gerekli.");
      return;
    }
    if (activeStepId === "city" && !city.trim()) {
      setError("Şehir bilgisi gerekli.");
      return;
    }

    setIsSaving(true);

    try {
      const isLast = activeStepId === "city";

      if (isLast) {
        await persistProgress(PAYMENT_STEPS.length);
        setIsSecuring(true);
        await new Promise((resolve) => window.setTimeout(resolve, 2200));

        const response = await fetch("/api/panel/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStep: PAYMENT_STEPS.length,
            finalize: true,
            cardHolderName,
            cardNumber,
            expiry,
            cvv,
            invoice: {
              companyTitle,
              taxNumber,
              address,
              city,
            },
          }),
        });

        const payload = (await response.json()) as { error?: string; user?: PanelSessionUser; redirectTo?: string };

        if (!response.ok || !payload.user) {
          throw new Error(payload.error || "Ödeme tamamlanamadı.");
        }

        setUser(payload.user);
        router.push(payload.redirectTo || "/panel/dashboard");
        router.refresh();
        return;
      }

      const nextStep = step + 1;
      await persistProgress(nextStep);
      setStep(nextStep);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Ödeme adımı kaydedilemedi.");
    } finally {
      setIsSaving(false);
      setIsSecuring(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#F8FBFF_0%,#F2F6FB_100%)] text-[#0F172A]">
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
              Kart doğrulaması tamamlanıyor. Başarılı olduğunda E-Tuğra başvurusu tetiklenmiş olarak dashboard’a geçeceksiniz.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(300px,34vw)_1fr]">
        <section className="hidden bg-[#0F172A] px-10 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link href="/panel" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/74 transition-colors hover:text-white">
              <ChevronLeft className="h-4 w-4" />
              Wizard’a dön
            </Link>
            <p className="mt-10 text-[12px] uppercase tracking-[0.28em] text-[#7DD3FC]">Ödeme</p>
            <h1 className="mt-4 max-w-[11ch] text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] text-white xl:text-[44px]">
              Ödeme adımını güvenle tamamlayın.
            </h1>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between text-[13px] text-white/72">
              <span>İlerleme</span>
              <span>%{progress}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/12">
              <div className="h-full rounded-full bg-[#38BDF8] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            {user.selectedPackage ? (
              <div className="mt-6 rounded-[28px] border border-white/10 bg-white/8 p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7DD3FC]">Paket</p>
                <p className="mt-3 text-[24px] font-semibold">{user.selectedPackage.label}</p>
                {user.selectedPackage.description ? (
                  <p className="mt-3 text-[14px] leading-6 text-white/72">{user.selectedPackage.description}</p>
                ) : null}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-4 py-2 text-[15px] font-semibold text-[#0F172A]">
                    Ödenecek Tutar: {user.selectedPackage.priceLabel}
                  </span>
                  {user.selectedPackage.term ? (
                    <span className="rounded-full bg-white/10 px-3 py-2 text-[13px] text-white/72">
                      {user.selectedPackage.term}
                    </span>
                  ) : null}
                </div>
                {user.selectedPackage.features.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {user.selectedPackage.features.slice(0, 4).map((feature) => (
                      <span key={feature} className="rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-white/82">
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        <section className="flex min-h-screen flex-col px-5 py-5 sm:px-10 lg:px-16 xl:px-24">
          <header className="flex items-center justify-between lg:hidden">
            <Link href="/panel" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#334155]">
              <ChevronLeft className="h-4 w-4" />
              Wizard’a dön
            </Link>
            <Image src="/LOGO-END.svg" alt="Work365" width={120} height={34} className="h-8 w-auto" />
          </header>

          <div className="flex flex-1 items-center">
            <form onSubmit={handleNext} className="w-full max-w-[820px]">
              <motion.div
                key={activeStepId}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#1B98D5]">
                  {step} / {PAYMENT_STEPS.length}
                </p>
                <h2 className="mt-5 max-w-[15ch] text-[32px] font-semibold leading-[1.03] tracking-[-0.05em] text-[#0F172A] sm:text-[40px] lg:text-[50px]">
                  {typedQuestion}
                </h2>

                {user.selectedPackage ? (
                  <div className="mt-6 rounded-[24px] border border-[#DCE7F1] bg-white px-4 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1B98D5]">Ödenecek</span>
                      <span className="text-[15px] font-semibold text-[#0F172A]">{user.selectedPackage.priceLabel}</span>
                      {user.selectedPackage.term ? (
                        <span className="text-[13px] text-[#64748B]">{user.selectedPackage.term}</span>
                      ) : null}
                    </div>
                    {user.selectedPackage.description ? (
                      <p className="mt-3 text-[14px] leading-6 text-[#475569]">{user.selectedPackage.description}</p>
                    ) : null}
                    {user.selectedPackage.features.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {user.selectedPackage.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full bg-[#F8FAFC] px-3 py-1.5 text-[12px] text-[#334155] ring-1 ring-black/6"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-10">
                  {activeStepId === "cardHolderName" ? (
                    <StepInput autoFocus value={cardHolderName} onChange={setCardHolderName} placeholder="Kart üzerindeki isim" />
                  ) : null}
                  {activeStepId === "cardNumber" ? (
                    <StepInput autoFocus value={cardNumber} onChange={setCardNumber} placeholder="0000 0000 0000 0000" />
                  ) : null}
                  {activeStepId === "cardMeta" ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <StepInput autoFocus value={expiry} onChange={(value) => setExpiry(formatExpiryInput(value))} placeholder="AA/YY" />
                      <StepInput value={cvv} onChange={setCvv} placeholder="CVV" />
                    </div>
                  ) : null}
                  {activeStepId === "companyTitle" ? (
                    <StepInput autoFocus value={companyTitle} onChange={setCompanyTitle} placeholder="Fatura unvanı" />
                  ) : null}
                  {activeStepId === "taxNumber" ? (
                    <StepInput autoFocus value={taxNumber} onChange={setTaxNumber} placeholder="Vergi numarası" />
                  ) : null}
                  {activeStepId === "address" ? (
                    <StepTextArea autoFocus value={address} onChange={setAddress} placeholder="Açık fatura adresi" />
                  ) : null}
                  {activeStepId === "city" ? (
                    <StepInput autoFocus value={city} onChange={setCity} placeholder="Şehir" />
                  ) : null}
                </div>

                {error ? <p className="mt-4 text-[14px] font-medium text-[#DC2626]">{error}</p> : null}

                <div className="mt-10 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSaving || isSecuring}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? "Kaydediliyor..." : activeStepId === "city" ? "Ödemeyi tamamla" : "Devam Et"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

function StepInput({
  value,
  onChange,
  placeholder,
  autoFocus = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}) {
  return (
    <input
      autoFocus={autoFocus}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-[30px] border border-[#DCE7F1] bg-white px-6 py-6 text-[22px] font-medium tracking-[-0.03em] text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.06)] outline-none transition-shadow placeholder:text-[#A3B3C2] focus:shadow-[0_0_0_4px_rgba(27,152,213,0.14)] sm:text-[28px]"
    />
  );
}

function StepTextArea({
  value,
  onChange,
  placeholder,
  autoFocus = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}) {
  return (
    <textarea
      autoFocus={autoFocus}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full rounded-[30px] border border-[#DCE7F1] bg-white px-6 py-6 text-[20px] leading-8 tracking-[-0.03em] text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.06)] outline-none transition-shadow placeholder:text-[#A3B3C2] focus:shadow-[0_0_0_4px_rgba(27,152,213,0.14)] sm:text-[24px]"
    />
  );
}
