import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import type { CompanyTypeConfig } from "@/app/sirket-kur/company-types";
import { buildPackageSignupHref } from "@/lib/pricing";

type CompanyTypePageTemplateProps = {
  config: CompanyTypeConfig;
};

export default function CompanyTypePageTemplate({ config }: CompanyTypePageTemplateProps) {
  const Icon = config.icon;
  const packageSignupHref = buildPackageSignupHref(config.name, config.price, {
    label: config.name,
    source: "Şirket Kur sayfasından seçildi",
    term: "Tek seferlik başlangıç paketi",
    description: config.heroBody,
    features: [...config.includedItems.slice(0, 4)],
  });

  return (
    <main className="bg-white pt-[92px]">
      <Header />
      <Breadcrumb items={[{ label: "Şirket Kur" }, { label: config.name }]} />

      <section className="px-6 pb-10 pt-10">
        <div className="mx-auto max-w-[1230px]">
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div className={`rounded-[40px] px-7 py-8 md:px-9 md:py-9 ${config.softAccent}`}>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-black/65 ring-1 ring-black/5">
                <Icon className="h-4 w-4" />
                {config.name}
              </div>

              <h1 className="mt-6 max-w-[760px] text-[30px] font-bold leading-[1.02] tracking-[-0.05em] text-black md:text-[50px]">
                {config.heroTitle}
              </h1>
              <p className="mt-6 max-w-[720px] text-[18px] leading-8 text-black/72">{config.heroBody}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={packageSignupHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-[15px] font-bold text-white"
                >
                  {config.name} ile Başla <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#kapsam"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 text-[15px] font-bold text-black"
                >
                  Detayları İncele
                </a>
              </div>
            </div>

            <div className="rounded-[40px] bg-white px-7 py-8 shadow-sm ring-1 ring-black/6 md:px-8 md:py-9">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: config.accent }}>
                    {config.badge}
                  </p>
                  <p className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-black md:text-[42px]">{config.price}</p>
                  <p className="mt-2 text-[14px] leading-7 text-black/58">{config.yearly}</p>
                </div>
                <div className="rounded-[24px] bg-[#F7F9FC] p-4" style={{ color: config.accent }}>
                  <Icon className="h-8 w-8" />
                </div>
              </div>

              <div className="mt-6 rounded-[28px] bg-[#0F172A] px-5 py-5 text-white">
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#B9E5FF]">
                  <ShieldCheck className="h-4 w-4" />
                  {config.highlightLabel}
                </div>
                <p className="mt-3 text-[16px] font-bold leading-7">
                  {config.shortName} yapısında kuruluş, dijital altyapı ve başlangıç akışını tek görünümde başlatın.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {config.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[20px] bg-[#F8FAFD] px-4 py-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: config.accent }} />
                    <span className="text-[15px] leading-7 text-black/72">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-[1230px] gap-5 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="rounded-[34px] bg-[#F8FBFD] px-6 py-7 ring-1 ring-black/6 md:px-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: config.accent }}>
              Bu yapı kimler için uygun?
            </p>
            <div className="mt-5 space-y-3">
              {config.suitableFor.map((item) => (
                <div key={item} className="rounded-[20px] bg-white px-4 py-4 ring-1 ring-black/5">
                  <p className="text-[15px] font-bold leading-7 text-black">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="kapsam" className="rounded-[34px] bg-white px-6 py-7 shadow-sm ring-1 ring-black/6 md:px-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: config.accent }}>
              Başlangıç kapsamında neler var?
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {config.includedItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[18px] bg-[#F8FAFD] px-4 py-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: config.accent }} />
                  <span className="text-[15px] font-medium text-black/72">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-[1230px] rounded-[40px] bg-[linear-gradient(135deg,#FFF4D0_0%,#F5FAFF_52%,#EFF9F5_100%)] px-7 py-8 md:px-10 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: config.accent }}>
                Süreç adımları
              </p>
              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-black md:text-[48px]">
                {config.name} sürecini tek akışta görün.
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-black/70">
                Başvuru, dijital altyapı ve operasyon başlangıcını dağınık iletişim yerine tek görünümde ilerletin.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {config.processSteps.map((step, index) => (
                <div key={step} className="rounded-[24px] bg-white px-5 py-5 ring-1 ring-black/6">
                  <div
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ backgroundColor: config.accent }}
                  >
                    {index + 1}
                  </div>
                  <p className="mt-4 text-[16px] font-bold leading-7 text-black">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {config.ecosystemModules?.length ? (
        <section className="px-6 py-10">
          <div className="mx-auto max-w-[1230px]">
            <div className="mb-8 max-w-[860px]">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#EEF4FF] px-4 py-2">
                <div
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-bold text-white"
                  style={{ backgroundColor: config.accent }}
                >
                  3
                </div>
                <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: config.accent }}>
                  Ekosistem Modülleri
                </p>
              </div>
              <h2 className="mt-4 text-[32px] font-bold tracking-[-0.04em] text-black md:text-[44px]">
                Ek alınabilir modüllerle yapınızı büyütün.
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-black/70">
                Her modül operasyon paketine ek olarak alınabilir. 4 modülün tamamı birlikte tercih edildiğinde ekosistem paketi indirimi yaklaşımı uygulanabilir.
              </p>
            </div>

            <div className="grid gap-5 xl:grid-cols-4">
              {config.ecosystemModules.map((module) => {
                const ModuleIcon = module.icon;

                return (
                  <div
                    key={module.code}
                    className={`rounded-[30px] bg-white px-6 py-7 shadow-sm ring-1 ${
                      module.accent ? "ring-2 ring-[#2F73FF]" : "ring-black/8"
                    }`}
                  >
                    <div
                      className={`inline-flex rounded-[18px] p-4 ${
                        module.accent ? "bg-[#F0E7FF]" : "bg-[#F4F6FA]"
                      }`}
                    >
                      <ModuleIcon className="h-6 w-6" style={{ color: module.accent ? "#7C3AED" : config.accent }} />
                    </div>
                    <p className="mt-5 text-[14px] font-bold uppercase tracking-[0.12em] text-black/48">{module.code}</p>
                    <h3 className="mt-3 text-[18px] font-bold leading-8 text-[#1A2952]">{module.title}</h3>
                    <p className="mt-4 text-[20px] font-bold tracking-[-0.03em] text-[#245FE5]">{module.price}</p>
                    <p className="mt-3 text-[14px] leading-7 text-black/58">{module.subtitle}</p>

                    <div className="mt-5 space-y-3">
                      {module.points.map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F8A5F]" />
                          <p className="text-[14px] leading-7 text-black/72">{point}</p>
                        </div>
                      ))}
                    </div>

                    {module.accent ? (
                      <div className="mt-6 inline-flex rounded-full bg-[#EFE6FF] px-4 py-2 text-[13px] font-bold text-[#7C3AED]">
                        Girişim Platformu
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 pb-12 pt-6">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-8 text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: config.accent }}>
              Sık sorulanlar
            </p>
            <h2 className="mt-3 text-[32px] font-bold tracking-[-0.04em] text-black md:text-[42px]">
              {config.name} hakkında en çok sorulanlar
            </h2>
          </div>

          <div className="space-y-4">
            {config.faq.map((item) => (
              <details key={item.question} className="rounded-[26px] bg-white px-6 py-5 shadow-sm ring-1 ring-black/6">
                <summary className="cursor-pointer list-none text-[17px] font-bold text-black">{item.question}</summary>
                <p className="pt-4 text-[15px] leading-8 text-black/68">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-4">
        <div className="mx-auto max-w-[1230px] rounded-[40px] bg-[#0F172A] px-7 py-9 text-white md:px-10 md:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[760px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#E6F4FF]">Şimdi Başlayın</p>
              <h2 className="mt-3 text-[32px] font-bold tracking-[-0.04em] text-white md:text-[44px]">
                {config.name.toLowerCase()} yapınızı hızlı ve doğru şekilde kurun.
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-white/78">
                Kuruluş, dijital altyapı ve ilk operasyon adımlarını tek paketle başlatın; dağınık süreçler yerine görünür ve hızlı bir başlangıç yapın.
              </p>
            </div>

            <Link
              href={packageSignupHref}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-bold text-black"
            >
              Hemen Başlayın <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
