"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LockKeyhole, Mail, Trash2, UserRound } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import type { AuthMode } from "@/lib/auth-content";
import type { SelectedPackageSummary } from "@/lib/pricing";

type AuthCardProps = {
  initialMode: AuthMode;
  selectedPackage: SelectedPackageSummary | null;
};

type LoginFields = {
  email: string;
  password: string;
};

type SignupFields = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

type ValidationErrors = Partial<Record<keyof LoginFields | keyof SignupFields | "form", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const defaultLoginFields: LoginFields = {
  email: "",
  password: "",
};

const defaultSignupFields: SignupFields = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

export default function AuthCard({ initialMode, selectedPackage }: AuthCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loginFields, setLoginFields] = useState<LoginFields>(defaultLoginFields);
  const [signupFields, setSignupFields] = useState<SignupFields>(defaultSignupFields);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPackageVisible, setIsPackageVisible] = useState(Boolean(selectedPackage));

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    setIsPackageVisible(Boolean(selectedPackage));
  }, [selectedPackage]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrors({});
    setFeedback(null);
    const nextQuery = new URLSearchParams(searchParams.toString());
    nextQuery.set("mode", nextMode);
    router.replace(`/kayit-ol?${nextQuery.toString()}`, { scroll: false });
  };

  const dismissSelectedPackage = () => {
    setIsPackageVisible(false);
    const nextQuery = new URLSearchParams(searchParams.toString());
    nextQuery.delete("company");
    nextQuery.delete("price");
    const nextUrl = nextQuery.toString() ? `/kayit-ol?${nextQuery.toString()}` : "/kayit-ol";
    router.replace(nextUrl, { scroll: false });
  };

  const validateLogin = () => {
    const nextErrors: ValidationErrors = {};

    if (!loginFields.email.trim()) {
      nextErrors.email = "E-posta alanı zorunludur.";
    } else if (!EMAIL_PATTERN.test(loginFields.email)) {
      nextErrors.email = "Geçerli bir e-posta adresi girin.";
    }

    if (!loginFields.password) {
      nextErrors.password = "Şifre alanı zorunludur.";
    } else if (loginFields.password.length < 6) {
      nextErrors.password = "Şifre en az 6 karakter olmalıdır.";
    }

    return nextErrors;
  };

  const validateSignup = () => {
    const nextErrors: ValidationErrors = {};

    if (!signupFields.fullName.trim()) {
      nextErrors.fullName = "Ad soyad alanı zorunludur.";
    }

    if (!signupFields.email.trim()) {
      nextErrors.email = "E-posta alanı zorunludur.";
    } else if (!EMAIL_PATTERN.test(signupFields.email)) {
      nextErrors.email = "Geçerli bir e-posta adresi girin.";
    }

    if (!signupFields.password) {
      nextErrors.password = "Şifre alanı zorunludur.";
    } else if (signupFields.password.length < 8) {
      nextErrors.password = "Şifre en az 8 karakter olmalıdır.";
    }

    if (!signupFields.confirmPassword) {
      nextErrors.confirmPassword = "Şifre tekrar alanı zorunludur.";
    } else if (signupFields.confirmPassword !== signupFields.password) {
      nextErrors.confirmPassword = "Şifreler birbiriyle eşleşmiyor.";
    }

    if (!signupFields.acceptedTerms) {
      nextErrors.acceptedTerms = "Devam etmek için koşulları onaylayın.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = mode === "login" ? validateLogin() : validateSignup();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback(null);
      return;
    }

    setFeedback(
      mode === "login"
        ? "Demo giriş akışı hazır. Gerçek auth entegrasyonu bağlandığında bu form canlı çalışacak."
        : "Demo kayıt akışı hazır. Gerçek auth entegrasyonu bağlandığında hesabınız burada oluşturulacak."
    );
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-[760px] flex-col rounded-[32px] border border-black/8 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-7 lg:min-h-[calc(100vh-48px)] lg:p-8">
      <div className="mb-6 flex flex-col items-center text-center">
        <Image src="/LOGO-END.svg" alt="Work365" width={150} height={40} className="h-10 w-auto" />
        <h2 className="mt-6 text-[34px] font-bold tracking-[-0.04em] text-[#0F172A] sm:text-[38px]">
          Hoş Geldiniz
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#64748B] sm:text-[16px]">
          Work365 ile şirket kuruluşunu, dijital altyapınızı ve ilk operasyon adımlarınızı tek akışta yönetin.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 rounded-full bg-[#EEF3F8] p-1">
        {[
          { key: "login", label: "Giriş Yap" },
          { key: "signup", label: "Üye Ol" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => switchMode(tab.key as AuthMode)}
            className={`rounded-full px-4 py-2.5 text-[15px] font-bold transition-all duration-200 ${
              mode === tab.key
                ? "bg-[#1B98D5] text-white shadow-[0_8px_20px_rgba(27,152,213,0.28)]"
                : "text-[#4B5563] hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {selectedPackage && isPackageVisible ? (
        <div className="mb-5 rounded-[22px] border border-[#D9E6F2] bg-[#F7FBFF] px-4 py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1B98D5]">
                Seçtiğiniz Paket
              </p>
              <p className="mt-3 text-[16px] font-bold text-[#0F172A]">{selectedPackage.company}</p>
              <p className="mt-1 text-[13px] text-[#64748B]">Fiyatlandırma ekranından seçildi</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start">
              <span className="rounded-full bg-white px-3 py-2 text-[13px] font-bold text-[#0F172A] ring-1 ring-black/6">
                {selectedPackage.priceLabel}
              </span>
              <button
                type="button"
                onClick={dismissSelectedPackage}
                aria-label="Seçilen paketi kaldır"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#64748B] ring-1 ring-black/6 transition-colors hover:text-[#DC2626]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Field
                label="E-posta"
                icon={<Mail className="h-4 w-4" />}
                type="email"
                placeholder="ornek@marka.com"
                value={loginFields.email}
                error={errors.email}
                onChange={(value) => setLoginFields((current) => ({ ...current, email: value }))}
              />
              <Field
                label="Şifre"
                icon={<LockKeyhole className="h-4 w-4" />}
                type="password"
                placeholder="Şifrenizi girin"
                value={loginFields.password}
                error={errors.password}
                onChange={(value) => setLoginFields((current) => ({ ...current, password: value }))}
              />

              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#64748B]">Demo akışta şifre sıfırlama bağlı değil.</span>
                <button type="button" className="font-bold text-[#1B98D5] transition-opacity hover:opacity-75">
                  Şifremi Unuttum
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Ad Soyad"
                  icon={<UserRound className="h-4 w-4" />}
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={signupFields.fullName}
                  error={errors.fullName}
                  onChange={(value) => setSignupFields((current) => ({ ...current, fullName: value }))}
                />
                <Field
                  label="E-posta"
                  icon={<Mail className="h-4 w-4" />}
                  type="email"
                  placeholder="kurucu@marka.com"
                  value={signupFields.email}
                  error={errors.email}
                  onChange={(value) => setSignupFields((current) => ({ ...current, email: value }))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Şifre"
                  icon={<LockKeyhole className="h-4 w-4" />}
                  type="password"
                  placeholder="En az 8 karakter"
                  value={signupFields.password}
                  error={errors.password}
                  onChange={(value) => setSignupFields((current) => ({ ...current, password: value }))}
                />
                <Field
                  label="Şifre Tekrar"
                  icon={<LockKeyhole className="h-4 w-4" />}
                  type="password"
                  placeholder="Şifrenizi tekrar girin"
                  value={signupFields.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={(value) => setSignupFields((current) => ({ ...current, confirmPassword: value }))}
                />
              </div>

              <label className="flex items-start gap-3 rounded-[20px] border border-[#DCE4EC] bg-[#F8FBFD] px-4 py-3.5 text-[14px] text-[#475569]">
                <input
                  type="checkbox"
                  checked={signupFields.acceptedTerms}
                  onChange={(event) =>
                    setSignupFields((current) => ({ ...current, acceptedTerms: event.target.checked }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-[#C7D2DA] text-[#1B98D5] focus:ring-[#1B98D5]"
                />
                <span>
                  <span className="font-semibold text-[#0F172A]">KVKK ve kullanım koşullarını</span> okudum,
                  Work365 demo hesabı oluşturmaya onay veriyorum.
                </span>
              </label>
              {errors.acceptedTerms ? (
                <p className="mt-2 text-[13px] font-medium text-[#DC2626]">{errors.acceptedTerms}</p>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {feedback ? (
          <div className="rounded-[20px] border border-[#BDE7D1] bg-[#F1FBF6] px-4 py-4 text-[14px] text-[#166534]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{feedback}</p>
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-[18px] bg-[#0F172A] px-5 py-3.5 text-[15px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-black"
        >
          {mode === "login" ? "Giriş Yap" : "Ücretsiz Hesap Oluştur"}
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="border-t border-[#E2E8F0] pt-4 text-[14px] text-[#64748B]">
          <p>
            Sorun mu yaşıyorsunuz?{" "}
            <Link href="/hizmet-sartlari/para-iade-kosullari" className="font-bold text-[#1B98D5] hover:opacity-75">
              Yardım Alın
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-5">
            <Link href="#" className="transition-colors hover:text-black">
              KVKK
            </Link>
            <Link
              href="/hizmet-sartlari/para-iade-kosullari"
              className="transition-colors hover:text-black"
            >
              Para İade Koşulları
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  icon: ReactNode;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function Field({ label, icon, type, placeholder, value, error, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-bold text-[#111827]">{label}</span>
      <div
        className={`flex items-center gap-3 rounded-[18px] border bg-white px-4 py-3 transition-shadow focus-within:shadow-[0_0_0_4px_rgba(27,152,213,0.12)] ${
          error ? "border-[#FCA5A5]" : "border-[#D7DFE8]"
        }`}
      >
        <span className="text-[#94A3B8]">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full border-none bg-transparent text-[15px] text-[#0F172A] outline-none placeholder:text-[#9CA3AF]"
        />
      </div>
      {error ? <p className="mt-2 text-[13px] font-medium text-[#DC2626]">{error}</p> : null}
    </label>
  );
}
