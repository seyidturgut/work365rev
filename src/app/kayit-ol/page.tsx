import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import AuthShowcase from "@/components/auth/AuthShowcase";
import type { AuthMode } from "@/lib/auth-content";
import { getSelectedPackageSummary } from "@/lib/pricing";

type RegisterPageProps = {
  searchParams?: Promise<{
    mode?: string;
    company?: string;
    price?: string;
    label?: string;
    source?: string;
    term?: string;
    description?: string;
    features?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Giriş Yap veya Üye Ol | Work365",
  description: "Work365 hesabınıza giriş yapın veya yeni bir hesap oluşturun.",
};

function resolveMode(mode?: string): AuthMode {
  return mode === "login" ? "login" : "signup";
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const initialMode = resolveMode(params?.mode);
  const selectedPackage = getSelectedPackageSummary(
    params?.company,
    params?.price,
    params?.label,
    params?.source,
    params?.term,
    params?.description,
    params?.features
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F7FBFF_0%,#F2F6FB_100%)] px-4 py-4 lg:px-6 lg:py-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1800px] grid-cols-1 items-start gap-3 lg:min-h-[calc(100vh-3rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(560px,0.9fr)] lg:items-stretch">
        <div className="order-2 h-full lg:order-1">
          <AuthShowcase />
        </div>
        <div className="order-1 flex h-full self-start px-0 py-0 sm:px-1 lg:order-2 lg:px-0">
          <AuthCard initialMode={initialMode} selectedPackage={selectedPackage} />
        </div>
      </div>
    </main>
  );
}
