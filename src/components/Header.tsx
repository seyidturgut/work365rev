"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ChevronRight,
  Globe,
  Landmark,
  Layers,
  Menu,
  Network,
  ReceiptText,
  Rocket,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const companyItems = [
  {
    href: "/sirket-kur/sahis-sirketi",
    label: "Şahıs Şirketi",
    description: "Hızlı başlangıç ve düşük operasyon yükü",
    icon: UserRound,
  },
  {
    href: "/sirket-kur/limited-sirketi",
    label: "Limited Şirketi",
    description: "Dengeli büyüme ve ortaklı kullanım",
    icon: Building2,
  },
  {
    href: "/sirket-kur/anonim-sirketi",
    label: "Anonim Şirketi",
    description: "Kurumsal yapı ve yatırım odaklı kullanım",
    icon: Landmark,
  },
  {
    href: "/sirket-kur/bilanco-sirketi",
    label: "Bilanço Şirketi",
    description: "Yoğun operasyon ve kayıt disiplini",
    icon: ReceiptText,
  },
] as const;

const serviceItems = [
  {
    href: "/digital-altyapi",
    label: "Dijital Altyapı",
    description: "e-İmza, KEP ve sanal ofis çözümleri",
    icon: Layers,
  },
  {
    href: "/ekosistem",
    label: "Ekosistem",
    description: "M365, web sitesi, sosyal medya ve büyüme modülleri",
    icon: Network,
  },
  {
    href: "/kolay-startup",
    label: "KolayStartup",
    description: "Girişimciler için startup ekosistemi platformu",
    icon: Rocket,
  },
  {
    href: "/iletisim",
    label: "İletişim",
    description: "Satış ekibimize ulaşın",
    icon: Globe,
  },
] as const;

const navItems = [
  { href: "/blog", label: "Blog" },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsCompanyMenuOpen(false);
    setIsServiceMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileCompanyOpen(false);
    setIsMobileServiceOpen(false);
  }, [pathname]);

  const isCompanyPage = useMemo(
    () => companyItems.some((item) => pathname?.startsWith(item.href)),
    [pathname]
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ${
        isHome ? "bg-[aliceblue]" : "bg-white"
      } pt-2 ${isScrolled ? "pb-2 shadow-sm" : "pb-2"}`}
    >
      <div
        className={`mx-auto flex max-w-[1230px] justify-end overflow-hidden px-6 transition-all duration-300 ${
          isScrolled ? "mb-0 h-0 opacity-0" : "mb-3 h-5 opacity-100"
        }`}
      >
        <div className="flex items-center whitespace-nowrap text-[13px] font-normal text-Work365-text">
          <span className="mr-2">Zaten Bir Hesabınız Var Mı?</span>
          <Link href="/giris" className="flex items-center font-bold transition-opacity hover:opacity-70">
            Giriş Yap <ChevronRight className="ml-1 h-4 w-4" strokeWidth={3} />
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1230px] items-center justify-between gap-8 px-6">
        <div className="flex min-w-0 items-center gap-11">
          <Link href="/" className="flex shrink-0 items-center">
            <img src="/LOGO-END.svg" alt="Work365 Logo" className="h-8 w-auto" />
          </Link>

          <nav className="hidden items-center space-x-8 text-[14px] font-semibold text-Work365-text xl:flex">
            <Link
              href="/fiyatlandirma"
              className="whitespace-nowrap tracking-[-0.01em] transition-opacity hover:opacity-70"
            >
              <span>Fiyatlandırma</span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsCompanyMenuOpen(true)}
              onMouseLeave={() => setIsCompanyMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCompanyMenuOpen((prev) => !prev)}
                className={`flex items-center gap-2 whitespace-nowrap tracking-[-0.01em] transition-opacity hover:opacity-70 ${
                  isCompanyPage ? "text-black" : ""
                }`}
              >
                <span>Şirket Kur</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCompanyMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
                  isCompanyMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="w-[360px] rounded-[28px] bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-black/6">
                  {companyItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-3 rounded-[18px] px-3 py-3 transition-colors ${
                          active ? "bg-[#F7FAFF]" : "hover:bg-[#F7FAFF]"
                        }`}
                      >
                        <div className="mt-0.5 rounded-[16px] bg-[#F4F6FA] p-2.5 text-black">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-black">{item.label}</p>
                          <p className="mt-1 text-[12px] leading-5 text-black/58">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Hizmetler dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServiceMenuOpen(true)}
              onMouseLeave={() => setIsServiceMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsServiceMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 whitespace-nowrap tracking-[-0.01em] transition-opacity hover:opacity-70"
              >
                <span>Hizmetler</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isServiceMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
                  isServiceMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="w-[340px] rounded-[28px] bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-black/6">
                  {serviceItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-3 rounded-[18px] px-3 py-3 transition-colors ${
                          active ? "bg-[#F7FAFF]" : "hover:bg-[#F7FAFF]"
                        }`}
                      >
                        <div className="mt-0.5 rounded-[16px] bg-[#F4F6FA] p-2.5 text-black">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-black">{item.label}</p>
                          <p className="mt-1 text-[12px] leading-5 text-black/58">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap tracking-[-0.01em] transition-opacity hover:opacity-70"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center xl:flex">
          <Link
            href="/kayit-ol"
            className="whitespace-nowrap rounded-full bg-black px-5 py-3 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-gray-800"
          >
            Kayıt Ol
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="shrink-0 p-2 xl:hidden"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-black/5 bg-white xl:hidden">
          <div className="mx-auto max-w-[1230px] px-6 py-4">
            <div className="space-y-2">
              <Link
                href="/fiyatlandirma"
                className="flex items-center justify-between rounded-[18px] bg-[#F7F9FC] px-4 py-3 text-[14px] font-bold text-black"
              >
                Fiyatlandırma
                <ChevronRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileCompanyOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-[18px] bg-[#F7F9FC] px-4 py-3 text-left text-[14px] font-bold text-black"
              >
                <span className="flex items-center gap-3">
                  <BriefcaseBusiness className="h-5 w-5" />
                  Şirket Kur
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isMobileCompanyOpen ? "rotate-180" : ""}`} />
              </button>

              {isMobileCompanyOpen ? (
                <div className="space-y-2 rounded-[20px] bg-[#FAFBFD] p-2">
                  {companyItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-[16px] px-3 py-3 transition-colors hover:bg-white"
                      >
                        <div className="rounded-xl bg-white p-2.5 ring-1 ring-black/5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-black">{item.label}</p>
                          <p className="mt-1 text-[12px] leading-5 text-black/58">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}

              {/* Hizmetler mobile */}
              <button
                type="button"
                onClick={() => setIsMobileServiceOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-[18px] bg-[#F7F9FC] px-4 py-3 text-left text-[14px] font-bold text-black"
              >
                <span className="flex items-center gap-3">
                  <Layers className="h-5 w-5" />
                  Hizmetler
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isMobileServiceOpen ? "rotate-180" : ""}`} />
              </button>

              {isMobileServiceOpen ? (
                <div className="space-y-2 rounded-[20px] bg-[#FAFBFD] p-2">
                  {serviceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-[16px] px-3 py-3 transition-colors hover:bg-white"
                      >
                        <div className="rounded-xl bg-white p-2.5 ring-1 ring-black/5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-black">{item.label}</p>
                          <p className="mt-1 text-[12px] leading-5 text-black/58">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-[18px] bg-[#F7F9FC] px-4 py-3 text-[14px] font-bold text-black"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
            </div>

            <Link
              href="/kayit-ol"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-[13px] font-bold text-white"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
