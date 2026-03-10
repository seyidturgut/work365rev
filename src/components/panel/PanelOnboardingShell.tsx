"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2, ChevronLeft } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { PanelSessionUser, WizardStepId } from "@/lib/panel-types";

type PanelOnboardingShellProps = {
  initialUser: PanelSessionUser;
};

const WIZARD_STEPS: WizardStepId[] = ["package", "fullName", "phone", "companyName", "activityArea"];

const PACKAGE_CHOICES = [
  { slug: "sahis-sirketi", label: "Şahıs Şirketi" },
  { slug: "limited-sirketi", label: "Limited Şirketi" },
  { slug: "anonim-sirketi", label: "Anonim Şirketi" },
  { slug: "bilanco-sirketi", label: "Bilanço Şirketi" },
  { slug: "m365-0-10-kullanici", label: "Microsoft 365 0-10 Kullanıcı" },
  { slug: "fikir-asamasi", label: "Kolay Startup - Fikir Aşaması" },
] as const;

function useTypewriter(text: string, enabled: boolean) {
  const [visibleText, setVisibleText] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setVisibleText(text);
      return;
    }

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
  }, [enabled, text]);

  return visibleText;
}

export default function PanelOnboardingShell({ initialUser }: PanelOnboardingShellProps) {
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  const [showIntro, setShowIntro] = useState(true);
  const [activeStep, setActiveStep] = useState(Math.max(1, initialUser.wizard.currentStep || 1));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState(initialUser.wizard.answers.fullName.value || initialUser.fullName);
  const [phone, setPhone] = useState(initialUser.wizard.answers.phone.value || initialUser.phone);
  const [companyName, setCompanyName] = useState(initialUser.wizard.answers.companyName.value);
  const [activityArea, setActivityArea] = useState(initialUser.wizard.answers.activityArea.value);
  const [packageState, setPackageState] = useState(initialUser.wizard.answers.package);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  const activeStepId = WIZARD_STEPS[Math.min(activeStep - 1, WIZARD_STEPS.length - 1)];
  const question = useMemo(() => {
    switch (activeStepId) {
      case "package":
        return packageState.locked ? "Seçtiğiniz paket hazır. Bu seçimle devam edelim mi?" : "Hangi paketle başlamak istiyorsunuz?";
      case "fullName":
        return "Sizi nasıl kaydedelim?";
      case "phone":
        return "Size hangi numaradan hızlıca ulaşalım?";
      case "companyName":
        return "Şirket unvanı için aklınızdaki taslak nedir?";
      case "activityArea":
        return "Şirketiniz hangi alanda faaliyet gösterecek?";
      default:
        return "";
    }
  }, [activeStepId, packageState.locked]);
  const typedQuestion = useTypewriter(question, !showIntro);
  const progress = Math.round(((activeStep - 1) / WIZARD_STEPS.length) * 100);

  const stepHint = useMemo(() => {
    switch (activeStepId) {
      case "package":
        return packageState.locked
          ? "Paket bilgisi kayıt sırasında aktarıldı. Değişiklik isterseniz daha sonra destek ekibiyle güncelleyebiliriz."
          : "Seçiminiz kuruluş akışı ve ödeme ekranına aynen taşınacak.";
      case "fullName":
        return "Başvuru ve sözleşme iletişiminde bu isim kullanılacak.";
      case "phone":
        return "Kuruluş sürecindeki ilk teyit ve yönlendirmeler için gerekli.";
      case "companyName":
        return "Taslak isim yeterli. Resmi unvan daha sonra netleşebilir.";
      case "activityArea":
        return "Kısa ve net bir faaliyet tanımı yeterli.";
      default:
        return "";
    }
  }, [activeStepId, packageState.locked]);

  const goNext = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setError(null);

    let values: Record<string, string | boolean>;

    switch (activeStepId) {
      case "package": {
        const chosen = PACKAGE_CHOICES.find((item) => item.slug === packageState.companySlug);
        const label = chosen?.label || packageState.label;

        if (!label || !packageState.companySlug) {
          setError("Devam etmek için bir paket seçin.");
          return;
        }

        values = {
          companySlug: packageState.companySlug,
          label,
          locked: true,
          confirmed: true,
        };
        setPackageState((current) => ({ ...current, locked: true, confirmed: true, label }));
        break;
      }
      case "fullName":
        if (!fullName.trim()) {
          setError("Ad soyad bilgisi gerekli.");
          return;
        }
        values = { value: fullName.trim() };
        break;
      case "phone":
        if (!phone.trim()) {
          setError("Telefon bilgisi gerekli.");
          return;
        }
        values = { value: phone.trim() };
        break;
      case "companyName":
        if (!companyName.trim()) {
          setError("Şirket unvanı taslağı gerekli.");
          return;
        }
        values = { value: companyName.trim() };
        break;
      case "activityArea":
        if (!activityArea.trim()) {
          setError("Faaliyet alanı gerekli.");
          return;
        }
        values = { value: activityArea.trim() };
        break;
      default:
        return;
    }

    setIsSaving(true);

    try {
      const isLast = activeStepId === "activityArea";
      const response = await fetch("/api/panel/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stepId: activeStepId,
          values,
          nextStep: isLast ? WIZARD_STEPS.length : activeStep + 1,
          markCompleted: isLast,
        }),
      });

      const payload = (await response.json()) as { error?: string; user?: PanelSessionUser };

      if (!response.ok || !payload.user) {
        throw new Error(payload.error || "Adım kaydedilemedi.");
      }

      setUser(payload.user);

      if (isLast) {
        router.push("/panel/payment");
        router.refresh();
        return;
      }

      setActiveStep((current) => current + 1);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Adım kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  };

  const currentPackage = user.selectedPackage;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#EAF6FF_0%,#F5F9FD_40%,#FFFFFF_100%)] text-[#0F172A]">
      <AnimatePresence>
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <Image src="/LOGO-END.svg" alt="Work365" width={260} height={72} className="h-16 w-auto sm:h-20" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(300px,34vw)_1fr]">
        <section className="relative hidden lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-black/6 lg:bg-[#0F172A] lg:px-10 lg:py-10 lg:text-white">
          <div>
            <Link href="/" className="inline-flex">
              <Image src="/LOGO-END.svg" alt="Work365" width={132} height={36} className="h-9 w-auto" />
            </Link>
            <div className="mt-5">
              <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/74 transition-colors hover:text-white">
                <ChevronLeft className="h-4 w-4" />
                Ana sayfa
              </Link>
            </div>
            <p className="mt-10 text-[12px] uppercase tracking-[0.3em] text-[#7DD3FC]">Kuruluş Akışı</p>
            <h1 className="mt-4 max-w-[10ch] text-[52px] font-bold leading-[0.94] tracking-[-0.06em] text-white">
              Kuruluş sürecini adım adım netleştiriyoruz.
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-7 text-white/72">
              Cevaplarınız anında kaydedilir. Çıkarsanız aynı sorudan devam edersiniz.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-3 flex items-center justify-between text-[13px] text-white/72">
                <span>İlerleme</span>
                <span>%{progress}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/12">
                <div className="h-full rounded-full bg-[#38BDF8] transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {currentPackage ? (
              <div className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7DD3FC]">Seçilen paket</p>
                <p className="mt-3 text-[24px] font-semibold">{currentPackage.label}</p>
                {currentPackage.description ? (
                  <p className="mt-3 text-[14px] leading-6 text-white/72">{currentPackage.description}</p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2 text-[13px] text-white/72">
                  <span className="rounded-full bg-white/10 px-3 py-1.5">{currentPackage.priceLabel}</span>
                  <span>{currentPackage.detailLabel}</span>
                </div>
                {currentPackage.features.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentPackage.features.slice(0, 4).map((feature) => (
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

        <section className="flex min-h-screen flex-col">
          <header className="flex items-center justify-between px-5 py-5 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#334155]">
              <ChevronLeft className="h-4 w-4" />
              Ana sayfa
            </Link>
            <Image src="/LOGO-END.svg" alt="Work365" width={120} height={34} className="h-8 w-auto" />
          </header>

          <div className="flex min-h-[calc(100vh-72px)] flex-1 items-center px-5 py-8 sm:px-10 lg:min-h-screen lg:px-16 xl:px-24">
            <form onSubmit={goNext} className="w-full max-w-[820px]">
              <motion.div
                key={activeStepId}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#1B98D5]">
                  {activeStep} / {WIZARD_STEPS.length}
                </p>
                <h2 className="mt-5 max-w-[14ch] text-[40px] font-bold leading-[0.98] tracking-[-0.06em] text-[#0F172A] sm:text-[54px] lg:text-[68px]">
                  {typedQuestion}
                </h2>
                <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#64748B]">{stepHint}</p>

                <div className="mt-10">
                  {activeStepId === "package" ? (
                    packageState.locked ? (
                      <div className="rounded-[30px] border border-[#DCE7F1] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:p-8">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[12px] uppercase tracking-[0.22em] text-[#1B98D5]">Hazır seçim</p>
                            <p className="mt-4 text-[28px] font-semibold tracking-[-0.04em] text-[#0F172A]">
                              {packageState.label}
                            </p>
                            <p className="mt-3 text-[15px] leading-7 text-[#64748B]">
                              {currentPackage?.detailLabel || "Paket bilgisi kayıt ekranından aktarıldı."}
                            </p>
                            {currentPackage?.description ? (
                              <p className="mt-3 text-[14px] leading-6 text-[#475569]">{currentPackage.description}</p>
                            ) : null}
                          </div>
                          <div className="rounded-full bg-[#F8FBFF] p-3 text-[#1B98D5]">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#F1F5F9] px-4 py-2 text-[14px] font-semibold text-[#0F172A]">
                            {currentPackage?.priceLabel || "Teklif sırasında netleşecek"}
                          </span>
                          {currentPackage?.term ? (
                            <span className="rounded-full bg-[#F1F5F9] px-4 py-2 text-[14px] text-[#475569]">
                              {currentPackage.term}
                            </span>
                          ) : null}
                        </div>
                        {currentPackage?.features.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {currentPackage.features.slice(0, 4).map((feature) => (
                              <span
                                key={feature}
                                className="rounded-full border border-[#DCE7F1] bg-white px-3 py-1.5 text-[12px] text-[#334155]"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {PACKAGE_CHOICES.map((item) => {
                          const isActive = packageState.companySlug === item.slug;
                          return (
                            <button
                              key={item.slug}
                              type="button"
                              onClick={() => setPackageState({ companySlug: item.slug, label: item.label, locked: false, confirmed: false })}
                              className={`rounded-[26px] border p-5 text-left transition-all ${
                                isActive
                                  ? "border-[#1B98D5] bg-[#F4FBFF] shadow-[0_14px_40px_rgba(27,152,213,0.12)]"
                                  : "border-[#DCE7F1] bg-white hover:border-[#BFD8EB]"
                              }`}
                            >
                              <Building2 className={`h-5 w-5 ${isActive ? "text-[#1B98D5]" : "text-[#94A3B8]"}`} />
                              <p className="mt-5 text-[20px] font-semibold tracking-[-0.03em] text-[#0F172A]">{item.label}</p>
                            </button>
                          );
                        })}
                      </div>
                    )
                  ) : null}

                  {activeStepId === "fullName" ? (
                    <StepInput
                      autoFocus
                      value={fullName}
                      onChange={setFullName}
                      placeholder="Adınız Soyadınız"
                    />
                  ) : null}

                  {activeStepId === "phone" ? (
                    <StepInput
                      autoFocus
                      value={phone}
                      onChange={setPhone}
                      placeholder="05xx xxx xx xx"
                      type="tel"
                    />
                  ) : null}

                  {activeStepId === "companyName" ? (
                    <StepInput
                      autoFocus
                      value={companyName}
                      onChange={setCompanyName}
                      placeholder="Örn. Atlas Yazılım Limited Şirketi"
                    />
                  ) : null}

                  {activeStepId === "activityArea" ? (
                    <StepTextArea
                      autoFocus
                      value={activityArea}
                      onChange={setActivityArea}
                      placeholder="Ne satacaksınız veya hangi hizmeti vereceksiniz?"
                    />
                  ) : null}
                </div>

                {error ? <p className="mt-4 text-[14px] font-medium text-[#DC2626]">{error}</p> : null}

                <div className="mt-10 flex items-center justify-between gap-4">
                  <div className="text-[14px] text-[#94A3B8]">
                    {activeStepId === "package" && packageState.locked ? "Tek tıkla devam edebilirsiniz." : "Cevap verip Enter'a basmanız yeterli."}
                  </div>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#0F172A] px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? "Kaydediliyor..." : activeStepId === "activityArea" ? "Ödemeye geç" : "Devam Et"}
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
  type = "text",
  autoFocus = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <input
      autoFocus={autoFocus}
      type={type}
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
