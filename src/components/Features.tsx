"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  KeyRound,
  Percent,
  Rocket,
} from "lucide-react";
import { useState } from "react";

type Feature = {
  label: string;
  title: string;
  cta: string;
  href?: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  gridSpan: string;
  mockupType: string;
  packageBadge?: string;
  packageItems?: string[];
};

const features: Feature[] = [
  {
    label: "Şirket Kuruluşu",
    title: "Şirketinizi hızlı, kolay ve doğru adımlarla kurun.",
    cta: "Kuruluş Sürecini Başlatın",
    href: "/fiyatlandirma",
    icon: <Rocket className="w-4 h-4 text-[#A88208]" />,
    bgColor: "bg-[#F6EDC8]",
    textColor: "text-[#A88208]",
    gridSpan: "lg:col-span-2",
    mockupType: "formation",
  },
  {
    label: "Muhasebe",
    title: "Finansal işlemlerinizi tek panelden izleyin ve yönetin.",
    cta: "Muhasebe Görünümünü İnceleyin",
    href: "/ekosistem",
    icon: <BookOpen className="w-4 h-4 text-[#2F73FF]" />,
    bgColor: "bg-[#E7ECF8]",
    textColor: "text-[#2F73FF]",
    gridSpan: "lg:col-span-2",
    mockupType: "bookkeeping",
  },
  {
    label: "Vergiler",
    title: "Vergi süreçlerinizi tek panelden takip edin.",
    cta: "Vergi Süreçlerini Görün",
    href: "/digital-altyapi",
    icon: <Percent className="w-4 h-4 text-[#00A86B]" />,
    bgColor: "bg-[#CFEED6]",
    textColor: "text-[#00A86B]",
    gridSpan: "lg:col-span-2",
    mockupType: "taxes",
  },
  {
    label: "Dijital Altyapı Ürünleri",
    title: "e-İmza ve KEP süreçlerini tek yerden yönetin.",
    cta: "Dijital Altyapıyı İnceleyin",
    href: "/digital-altyapi",
    icon: <KeyRound className="w-4 h-4 text-[#0F766E]" />,
    bgColor: "bg-[#E9F8F6]",
    textColor: "text-[#0F766E]",
    gridSpan: "lg:col-span-3",
    mockupType: "infrastructure",
  },
  {
    label: "Analiz",
    title: "Daha Akıllı İş Kararları İçin Güçlü Analizler.",
    cta: "Satışlarınızı Analiz Edin",
    href: "/ekosistem",
    icon: <BarChart3 className="w-4 h-4 text-[#D84C6F]" />,
    bgColor: "bg-[#FFF2F5]",
    textColor: "text-[#D84C6F]",
    gridSpan: "lg:col-span-3",
    mockupType: "analytics",
  },
];

const featureTabs = [
  "Hepsi Bir Arada İş Paketi",
  "Kuruluş",
  "Muhasebe",
  "Vergiler",
  "Analitik",
];

export default function Features() {
  const [activeTab, setActiveTab] = useState("Hepsi Bir Arada İş Paketi");

  return (
    <section className="py-24 px-6 bg-[#F7F7F5] overflow-hidden">
      <div className="max-w-[1230px] mx-auto">
        <div className="mb-14 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-black/10 pb-5 text-[16px] font-semibold text-black/55 md:gap-x-12 md:text-[18px]">
              {featureTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 transition-colors ${
                    activeTab === tab ? "text-black" : "hover:text-black"
                  }`}
                >
                  {tab}
                  {activeTab === tab ? (
                    <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-black" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto">
            <Link
              href="/fiyatlandirma"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-[16px] font-bold text-white"
            >
              Paketleri İncele <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {activeTab === "Kuruluş" ? (
          <FormationShowcase />
        ) : activeTab === "Muhasebe" ? (
          <BookkeepingShowcase />
        ) : activeTab === "Vergiler" ? (
          <TaxesShowcase />
        ) : activeTab === "Analitik" ? (
          <AnalyticsShowcase />
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {features.map((feature, index) => {
            const isHorizontal = index >= 3;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative overflow-hidden group rounded-[40px] ${feature.bgColor} ${feature.gridSpan} ${
                  isHorizontal ? "min-h-[220px] flex-row items-center p-8" : "min-h-[288px] flex-col px-8 pt-8 pb-0 md:min-h-[298px]"
                } flex`}
              >
                <div className={`${isHorizontal ? "w-2/5" : "w-full"}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1">{feature.icon}</div>
                    <span className={`text-[14px] font-bold ${feature.textColor}`}>{feature.label}</span>
                  </div>

                  <h3 className={`${isHorizontal ? "text-[22px] md:text-[24px]" : "text-[20px] md:text-[22px]"} max-w-[430px] font-bold leading-[1.2] tracking-[-0.03em] text-black mb-4`}>
                    {feature.title}
                  </h3>

                  {feature.href ? (
                    <Link
                      href={feature.href}
                      className="flex items-center gap-2 text-[14px] font-semibold text-black group-hover:gap-3 transition-all"
                    >
                      {feature.cta} <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button className="flex items-center gap-2 text-[14px] font-semibold text-black group-hover:gap-3 transition-all">
                      {feature.cta} <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div
                  className={`overflow-hidden ${
                    isHorizontal
                      ? "relative h-full w-3/5 translate-x-12 translate-y-10 transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8"
                      : "relative mt-5 h-[184px] w-full transition-transform duration-500 group-hover:translate-y-1 md:h-[194px]"
                  }`}
                >
                  {feature.mockupType === "formation" ? (
                    <FormationMockup isHorizontal={isHorizontal} hideStroke={!isHorizontal} />
                  ) : feature.mockupType === "bookkeeping" ? (
                    <BookkeepingMockup isHorizontal={isHorizontal} />
                  ) : feature.mockupType === "taxes" ? (
                    <TaxesMockup isHorizontal={isHorizontal} />
                  ) : feature.mockupType === "infrastructure" ? (
                    <DigitalInfrastructureMockup />
                  ) : feature.mockupType === "analytics" ? (
                    <PackageAnalyticsMockup />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-white shadow-2xl border border-gray-100 p-3 ${
                        isHorizontal ? "rounded-tl-2xl rounded-bl-2xl" : "rounded-t-3xl"
                      }`}
                    >
                      <div className="w-full h-full bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden">
                        <div className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="w-16 h-2 bg-gray-200 rounded-full" />
                            <div className="w-5 h-5 bg-gray-100 rounded-full" />
                          </div>
                          <div className="w-full h-24 bg-gray-100/50 rounded-lg flex items-center justify-center">
                            <div className="w-3/4 space-y-2">
                              <div className="h-1 bg-gray-200 rounded w-full" />
                              <div className="h-1 bg-gray-200 rounded w-5/6" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}

function FormationShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.22fr_0.92fr_0.92fr]">
      <div className="rounded-[38px] bg-[#F6EDC8] px-7 pt-8 pb-6">
        <p className="text-[16px] font-bold text-[#A88208]">Kuruluş Dosyaları</p>
        <h3 className="mt-5 max-w-[520px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
          Uzmanlar Tarafından Hazırlanan Şirket Kuruluş Dosyalarıyla Yasalara Uygun Kalın.
        </h3>
        <p className="mt-5 max-w-[540px] text-[17px] leading-[1.5] text-black/85">
          Evrak işlerini, başvuruları ve yasal uyumluluk süreçlerini biz hallediyoruz, böylece siz vizyonunuza odaklanabiliyorsunuz.
        </p>
        <div className="relative mt-8 h-[240px] overflow-hidden md:h-[270px]">
          <div className="absolute left-0 top-0 h-[308px] w-[calc(100%/0.72)] origin-top-left scale-[0.72] md:h-[336px] md:w-[calc(100%/0.74)] md:scale-[0.74]">
            <FormationMockup isHorizontal={false} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-[38px] bg-[#F6EDC8] px-7 pt-8 pb-7">
          <p className="text-[16px] font-bold text-[#A88208]">Resmi Başvuru Süreçleri</p>
          <h3 className="mt-5 text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
            Şirketiniz için resmi başvuru süreçlerini kolayca tamamlayın.
          </h3>
          <p className="mt-5 max-w-[380px] text-[17px] leading-[1.5] text-black/85">
            Gerekli kayıt ve başvuru adımlarını tek akışta zahmetsizce yönetin.
          </p>
          <div className="mt-6 flex h-[170px] items-end justify-center rounded-[24px] bg-[radial-gradient(circle_at_center,#F2D96D_0,#F2D96D_33%,transparent_34%)]">
            <Image
              src="/ein.png.webp"
              alt="Resmi başvuru süreçleri görseli"
              width={280}
              height={190}
              className="h-auto w-[240px] object-contain"
            />
          </div>
        </div>

        <div className="rounded-[38px] border border-[#B89214] bg-white px-7 pt-8 pb-7">
          <p className="text-[16px] font-bold text-[#A88208]">İşletme Anlaşması</p>
          <h3 className="mt-5 max-w-[420px] text-[18px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[21px]">
            Şirketinizin faaliyetlerini bir işletme sözleşmesiyle koruyun.
          </h3>
        </div>
      </div>

      <div className="rounded-[38px] bg-[#F6EDC8] px-7 pt-8 pb-7">
        <p className="text-[16px] font-bold text-[#A88208]">Kayıtlı Temsilci Hizmetleri</p>
        <h3 className="mt-5 text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
          İşletmeniz İçin Güvenilir Kayıtlı Temsilci Hizmetleri.
        </h3>
        <p className="mt-5 max-w-[390px] text-[17px] leading-[1.5] text-black/85">
          Önemli devlet belgelerinizi bizimle takip edin, hiçbir süreci kaçırmayın.
        </p>
        <div className="mt-6 flex h-[290px] items-end justify-center rounded-[28px] bg-[radial-gradient(circle_at_42%_35%,#F2D96D_0,#F2D96D_26%,transparent_27%)]">
          <Image
            src="/registered-agent.png.webp"
            alt="Kayıtlı temsilci hizmetleri görseli"
            width={420}
            height={320}
            className="h-auto w-[310px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function BookkeepingShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.08fr_1.2fr]">
      <div className="rounded-[38px] bg-[#E7ECF8] px-7 pt-8 pb-6">
        <p className="text-[16px] font-bold text-[#2F73FF]">İşlemlerinizi Takip Edin</p>
        <h3 className="mt-5 max-w-[620px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
          Tüm finansal işlemlerinizi tek bir yerden takip edin, kategorize edin ve izleyin.
        </h3>
        <p className="mt-5 max-w-[700px] text-[17px] leading-[1.5] text-black/85">
          Gerçek zamanlı bilgilere erişerek her zaman güncel kalın ve kayıtlarınızı düzenli tutun. Hiçbir işlemi kaçırmayın.
        </p>
        <div className="relative mt-8 h-[240px] overflow-hidden md:h-[270px]">
          <div className="absolute left-0 top-0 h-[308px] w-[calc(100%/0.72)] origin-top-left scale-[0.72] md:h-[336px] md:w-[calc(100%/0.74)] md:scale-[0.74]">
            <BookkeepingMockup isHorizontal={false} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-[38px] border-2 border-[#2F73FF] bg-white px-7 pt-8 pb-10">
          <p className="text-[16px] font-bold text-[#2F73FF]">Faturaları Gönder</p>
          <h3 className="mt-5 max-w-[760px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
            Profesyonel faturaları saniyeler içinde göndererek zamandan tasarruf edin ve müşterilerinizi etkileyin.
          </h3>
        </div>

        <div className="relative overflow-hidden rounded-[38px] bg-[#E7ECF8] px-7 pt-8 pb-7">
          <p className="text-[16px] font-bold text-[#2F73FF]">Özel Muhasebeci</p>
          <h3 className="mt-5 max-w-[760px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
            İşletmenizi Tanıyan, Alanında Uzman Bir Muhasebeci.
          </h3>
          <p className="mt-5 max-w-[760px] text-[17px] leading-[1.5] text-black/85">
            Gece geç saatlere kadar hesap tablolarıyla uğraşmaya veda edin. Uzman muhasebe desteğiyle, paranızın durumunu her zaman bileceksiniz.
          </p>
          <div className="mt-6 flex h-[190px] items-end justify-end rounded-[26px] bg-[radial-gradient(circle_at_76%_58%,rgba(47,115,255,0.18)_0,rgba(47,115,255,0.18)_16%,transparent_17%)]">
            <Image
              src="/muhasebe.webp"
              alt="Muhasebe uzmanı görseli"
              width={340}
              height={220}
              className="h-auto w-[260px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxesShowcase() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.12fr_0.88fr]">
      <div className="rounded-[34px] bg-[#CFEED6] px-6 pt-7 pb-5">
        <p className="text-[16px] font-bold text-[#15803D]">Yıllık Vergi Beyannameleri</p>
        <h3 className="mt-4 max-w-[700px] text-[19px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[22px]">
          Vergi beyannamelerinizi zamanında vererek yasalara uyumlu kalın.
        </h3>
        <p className="mt-4 max-w-[720px] text-[16px] leading-[1.5] text-black/85">
          Vergi süreçlerinizi zamanında ve doğru şekilde yönetiyoruz, böylece cezalardan kaçınabilir ve işinizi büyütmeye odaklanabilirsiniz.
        </p>
        <div className="relative mt-6 h-[210px] overflow-hidden md:h-[238px]">
          <div className="absolute left-0 top-0 h-[288px] w-[calc(100%/0.69)] origin-top-left scale-[0.69] md:h-[304px] md:w-[calc(100%/0.71)] md:scale-[0.71]">
            <TaxesMockup isHorizontal={false} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative overflow-hidden rounded-[34px] bg-[#CFEED6] px-6 pt-7 pb-6">
          <p className="text-[16px] font-bold text-[#15803D]">Vergi Beyan Takibi</p>
          <h3 className="mt-4 max-w-[500px] text-[19px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[22px]">
            İşletmeler için doğru ve zamanında vergi beyan takibi.
          </h3>
          <p className="mt-4 max-w-[500px] text-[16px] leading-[1.5] text-black/85">
            Son teslim tarihlerini kaçırmadan, tüm süreçleri tek merkezden takip edin ve dosyalamanızı güvenle yönetin.
          </p>
          <div className="mt-5 flex h-[180px] items-end justify-end rounded-[22px] bg-[radial-gradient(circle_at_70%_60%,rgba(21,128,61,0.16)_0,rgba(21,128,61,0.16)_17%,transparent_18%)]">
            <Image
              src="/vergi.webp"
              alt="Vergi süreçleri görseli"
              width={300}
              height={220}
              className="h-auto w-[190px] object-contain"
            />
          </div>
        </div>

        <div className="rounded-[34px] border-2 border-[#15803D] bg-white px-6 pt-7 pb-6">
          <p className="text-[16px] font-bold text-[#15803D]">Lisanslı Vergi Uzmanı Danışmanlığı</p>
          <h3 className="mt-4 max-w-[520px] text-[19px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[22px]">
            Vergi işlemlerinizde size rehberlik edecek kişiselleştirilmiş uzman desteği.
          </h3>
        </div>
      </div>
    </div>
  );
}

function AnalyticsShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <div className="rounded-[38px] bg-[#F9E8EE] px-7 pt-8 pb-6">
        <p className="text-[16px] font-bold text-[#A16876]">İş Analitiği</p>
        <h3 className="mt-5 max-w-[700px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
          Daha akıllı kararlar için tasarlanmış güçlü panel analitiği.
        </h3>
        <p className="mt-5 max-w-[760px] text-[17px] leading-[1.5] text-black/85">
          Gelir, gider, operasyon ve süreç performansını tek panelden izleyerek daha hızlı ve daha doğru kararlar alın.
        </p>
        <div className="relative mt-8 h-[250px] overflow-hidden md:h-[280px]">
          <div className="absolute left-0 top-0 h-[322px] w-[calc(100%/0.74)] origin-top-left scale-[0.74] md:h-[350px] md:w-[calc(100%/0.76)] md:scale-[0.76]">
            <OrdersAnalyticsMockup />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-[38px] bg-[#F9E8EE] px-7 pt-8 pb-6">
          <div className="relative h-[210px] overflow-hidden md:h-[228px]">
            <div className="absolute left-0 top-0 h-[260px] w-[calc(100%/0.76)] origin-top-left scale-[0.76] md:h-[280px] md:w-[calc(100%/0.8)] md:scale-[0.8]">
              <CampaignAnalyticsMockup />
            </div>
          </div>
        </div>

        <div className="rounded-[38px] bg-[#F9E8EE] px-7 pt-8 pb-7">
          <p className="text-[16px] font-bold text-[#A16876]">Performansı Takip Et</p>
          <h3 className="mt-5 max-w-[620px] text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-black md:text-[24px]">
            İşletmenizin performansını eksiksiz olarak takip edin.
          </h3>
          <p className="mt-5 max-w-[640px] text-[17px] leading-[1.5] text-black/85">
            Finansal görünüm, operasyon yoğunluğu ve süreç verimliliğine ilişkin metrikleri tek panelden takip edin.
          </p>
        </div>
      </div>
    </div>
  );
}

function OrdersAnalyticsMockup() {
  return (
    <div className="h-full overflow-hidden rounded-[30px] border-2 border-[#B37A89] bg-white p-5 shadow-xl">
      <h4 className="text-lg font-bold text-black">Orders</h4>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {["Jan 1 - Jan 31", "Platform", "Status"].map((item, index) => (
            <div
              key={item}
              className={`rounded-full px-3 py-1.5 text-[8px] font-bold ${
                index === 0 ? "bg-black text-white" : "bg-[#F2F2F2] text-black/65"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-full bg-black px-3 py-1.5 text-[8px] font-bold text-white">Export</div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {[
          ["Toplam Sipariş", "786", "-1%"],
          ["Toplam Satış", "20.786 ₺", "+3%"],
          ["Ortalama Sepet", "73 ₺", "+13%"],
          ["İade Oranı", "12%", "-13%"],
        ].map(([label, value, delta]) => (
          <div key={label} className="rounded-[18px] bg-[#F7F8FB] p-3">
            <p className="text-[8px] font-semibold text-black/65">{label}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <p className="text-sm font-bold text-black">{value}</p>
              <span className={`text-[8px] font-bold ${delta.startsWith("+") ? "text-[#16A34A]" : "text-[#DC2626]"}`}>{delta}</span>
            </div>
            <div className="mt-3 flex h-10 items-end gap-1">
              {[42, 68, 55, 18, 24, 46, 40, 60].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-full bg-[linear-gradient(180deg,#AFCBFF_0%,#2F73FF_100%)]"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {[
          ["#25848", "Ergonomic Office Chair - Grey", "4.858 ₺", "Ödendi"],
          ["#24147", "Ergonomic Office Chair - Blue", "2.920 ₺", "İade"],
          ["#12838", "14K Solid Sideways Necklace", "516 ₺", "Ödendi"],
        ].map(([id, title, total, status]) => (
          <div key={id} className="grid grid-cols-[0.7fr_2.2fr_1fr_0.8fr] items-center rounded-[16px] bg-[#FBFBFC] px-4 py-3">
            <span className="text-[8px] font-bold text-black/45">{id}</span>
            <div>
              <p className="text-[9px] font-semibold text-black">{title}</p>
              <p className="text-[8px] text-black/45">Sipariş kaydı</p>
            </div>
            <span className="text-[9px] font-bold text-black">{total}</span>
            <span className={`inline-flex justify-center rounded-full px-2 py-1 text-[8px] font-bold ${status === "Ödendi" ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#F3F4F6] text-[#6B7280]"}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignAnalyticsMockup() {
  return (
    <div className="h-full overflow-hidden rounded-[28px] border-2 border-[#B37A89] bg-white p-4 shadow-xl">
      <div className="flex gap-2">
        {["Dec 1, 2024 - Jun 1, 2025", "Google Ads", "Meta Ads", "TikTok Ads"].map((item, index) => (
          <div
            key={item}
            className={`rounded-full px-3 py-1.5 text-[8px] font-bold ${index === 0 ? "bg-black text-white" : "bg-[#F2F2F2] text-black/65"}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1.55fr_0.78fr_0.78fr] gap-3">
        <div className="rounded-[16px] bg-[#F7F8FB] p-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[8px] font-semibold text-black/65">Toplam Harcama</p>
              <p className="mt-1 text-sm font-bold text-black">11.212 ₺</p>
            </div>
            <span className="text-[8px] text-black/35">1.000</span>
          </div>
          <div className="mt-3 flex h-16 items-end gap-1">
            {[10, 24, 18, 44, 26, 48, 40, 22, 16, 28, 44, 30, 52, 40, 36, 44, 50, 22, 34, 28, 36].map((height, index) => (
              <div key={index} className="flex-1 rounded-t-full bg-[#D7E6FF]" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        {[
          ["Toplam Satış", "27.917 ₺"],
          ["ROAS", "2.49"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[16px] bg-[#F7F8FB] p-3">
            <p className="text-[8px] font-semibold text-black/65">{label}</p>
            <p className="mt-1 text-sm font-bold text-black">{value}</p>
            <div className="mt-4 flex h-14 items-end">
              <svg viewBox="0 0 100 50" className="h-full w-full">
                <path d="M0 28 L20 10 L40 16 L60 44 L80 40 L100 18" fill="none" stroke="#2F73FF" strokeWidth="2.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {[
          ["Gösterim", "199.122"],
          ["Tıklama", "10.524"],
          ["TBM", "1.06 ₺"],
          ["CTR", "%5.28"],
        ].map(([label, value], index) => (
          <div key={label} className="rounded-[16px] bg-[#F7F8FB] p-3">
            <p className="text-[8px] font-semibold text-black/65">{label}</p>
            <p className="mt-1 text-sm font-bold text-black">{value}</p>
            <div className="mt-3 flex h-12 items-end">
              <svg viewBox="0 0 100 50" className="h-full w-full">
                <path
                  d={index === 0 ? "M0 24 L20 16 L40 18 L60 12 L80 8 L100 8" : index === 1 ? "M0 32 L20 8 L40 14 L60 46 L80 40 L100 12" : index === 2 ? "M0 24 L20 8 L40 14 L60 46 L80 40 L100 14" : "M0 18 L20 16 L40 18 L60 12 L80 8 L100 8"}
                  fill="none"
                  stroke="#2F73FF"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DigitalInfrastructureMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-tl-2xl rounded-bl-2xl border border-[#D8ECE8] bg-white p-4 shadow-2xl">
      <div className="flex h-full flex-col rounded-[22px] bg-[#F6FBFA] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0F766E]">
              Dijital Altyapi
            </p>
            <p className="mt-1 text-sm font-bold text-black">Urun ve Yetki Paneli</p>
          </div>
          <div className="rounded-full bg-[#DDF5F1] px-3 py-1 text-[10px] font-bold text-[#0F766E]">
            Aktif
          </div>
        </div>

        <div className="mt-4 grid flex-1 grid-cols-[1.15fr_0.85fr] gap-3">
          <div className="rounded-[18px] bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-black">e-Imza</p>
                <p className="mt-1 text-[10px] text-black/55">E-Tugra Nitelikli</p>
              </div>
              <div className="rounded-full bg-[#E8F7F3] px-2.5 py-1 text-[9px] font-bold text-[#0F766E]">
                Hazir
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {[
                "Nitelikli elektronik sertifika",
                "Basvuru ve kimlik dogrulama takibi",
                "Imza suresi ve yenileme hatirlatmasi",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl bg-[#F7FAF9] px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-[#0F766E]" />
                  <span className="text-[10px] font-medium text-black/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-[18px] bg-[#DDF5F1] p-4">
              <p className="text-[11px] font-bold text-black">KEP</p>
              <p className="mt-1 text-[10px] text-black/60">Kurumsal ileti gonderimi</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white px-3 py-2">
                  <p className="text-[8px] font-semibold text-black/50">Hesap</p>
                  <p className="mt-1 text-[10px] font-bold text-black">Aktif</p>
                </div>
                <div className="rounded-xl bg-white px-3 py-2">
                  <p className="text-[8px] font-semibold text-black/50">Bildirim</p>
                  <p className="mt-1 text-[10px] font-bold text-black">Acik</p>
                </div>
              </div>
            </div>

            <div className="rounded-[18px] bg-white p-4">
              <p className="text-[10px] font-bold text-black">Temel Ozellikler</p>
              <div className="mt-3 space-y-2">
                {["Resmi bildirim takibi", "Delil niteliginde gonderim", "Panelden kolay yonetim"].map((item) => (
                  <div key={item} className="rounded-xl bg-[#F7FAF9] px-3 py-2 text-[10px] font-medium text-black/70">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageAnalyticsMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-tl-2xl rounded-bl-2xl border border-[#E9D3DA] bg-white p-4 shadow-2xl">
      <div className="flex h-full flex-col rounded-[22px] bg-[#FCF7F9] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#D84C6F]">
              Analiz Paneli
            </p>
            <p className="mt-1 text-sm font-bold text-black">Genel Performans</p>
          </div>
          <div className="rounded-full bg-[#FCE7EE] px-3 py-1 text-[10px] font-bold text-[#D84C6F]">
            Canli
          </div>
        </div>

        <div className="mt-4 grid flex-1 grid-cols-[1.2fr_0.8fr] gap-3">
          <div className="rounded-[18px] bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-black/55">Aylik Gorunum</p>
                <p className="mt-1 text-sm font-bold text-black">Gelir ve Islem Akisi</p>
              </div>
              <span className="text-[9px] font-bold text-[#16A34A]">+18.2%</span>
            </div>

            <div className="mt-4 flex h-20 items-end gap-1.5">
              {[30, 54, 42, 68, 74, 52, 80, 58, 86, 64, 76, 92].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-full bg-[linear-gradient(180deg,#F7B6C6_0%,#D84C6F_100%)]"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ["Gelir", "248.000 ₺"],
                ["Gider", "83.400 ₺"],
                ["Verim", "%72"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-[#FCF7F9] px-3 py-2">
                  <p className="text-[8px] font-semibold text-black/45">{label}</p>
                  <p className="mt-1 text-[10px] font-bold text-black">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-[18px] bg-white p-4">
              <p className="text-[10px] font-semibold text-black/55">Kritik Metrikler</p>
              <div className="mt-3 space-y-2">
                {[
                  ["Aktif Surec", "24"],
                  ["Bekleyen Gorev", "8"],
                  ["Tamamlanan", "126"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-xl bg-[#FCF7F9] px-3 py-2">
                    <span className="text-[9px] font-medium text-black/65">{label}</span>
                    <span className="text-[10px] font-bold text-black">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] bg-[#FCE7EE] p-4">
              <p className="text-[10px] font-bold text-[#D84C6F]">Ozet</p>
              <p className="mt-2 text-[10px] leading-[1.5] text-black/70">
                Gelir, operasyon ve surec verilerini tek ekranda izleyin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormationMockup({
  isHorizontal,
  alignBottom = false,
  hideStroke = false,
}: {
  isHorizontal: boolean;
  alignBottom?: boolean;
  hideStroke?: boolean;
}) {
  return (
    <div
      className={`${alignBottom ? "absolute bottom-0 left-5 w-[58%] md:w-[60%]" : "absolute inset-0"} overflow-hidden ${
        hideStroke ? "border border-[#E8DFC5]" : "border-2 border-[#A88208]"
      } bg-[#FFFDF7] shadow-2xl ${
        isHorizontal ? "rounded-tl-2xl rounded-bl-2xl p-4" : "rounded-t-3xl p-4"
      }`}
    >
      <div className="flex h-full flex-col rounded-[24px] bg-white px-5 py-5">
        <h4 className="text-lg font-bold text-black">Şirket</h4>

        <div className="mt-4 grid flex-1 gap-3">
          <div className="grid grid-cols-[0.78fr_1.22fr] gap-3">
            <div className="rounded-[18px] bg-[#F7F7F7] p-3">
              <div className="mb-3 h-1.5 w-16 rounded-full bg-[#26A65B]" />
              <p className="text-[9px] font-semibold text-[#7B8087]">Adım 3/4</p>
              <div className="mt-3 space-y-2.5">
                {[
                  { label: "Başlangıç Bilgileri", active: false },
                  { label: "Şirket Profili", active: false },
                  { label: "Dosyalama Tamamlandı", active: true },
                  { label: "Tescil Aşaması", active: false },
                ].map(({ label, active }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full border ${
                        active ? "border-[#A88208] bg-[#FFF4C7]" : "border-[#AEB4BC] bg-white"
                      }`}
                    />
                    <span className={`text-[9px] font-medium ${active ? "text-[#A88208]" : "text-[#5F6368]"}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] bg-[#F2DF88] p-4">
              <div className="inline-flex rounded-full bg-[#F8E58D] px-2 py-1 text-[8px] font-bold text-[#6C5200]">
                Devam Ediyor
              </div>
              <h5 className="mt-3 text-xs font-bold text-black">Kuruluş Dosyası Hazırlanıyor</h5>
              <p className="mt-2 text-[9px] leading-[1.5] text-black/75">
                Belgeler ve başvuru akışı uzman ekip tarafından hazırlanıyor. Durum değiştiğinde panelden anında görebilirsiniz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[1.55fr_0.8fr] gap-3">
            <div className="rounded-[18px] bg-[#F7F7F7] p-4">
              <h5 className="text-xs font-bold text-black">Information</h5>
              <div className="mt-3 space-y-2.5">
                {[
                  ["Şirket Ünvanı", "Wonderland Digital"],
                  ["Şirket Türü", "Limited"],
                  ["MERSIS No", "123-456789"],
                  ["Şehir", "Istanbul"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[0.9fr_1.1fr] items-center gap-3">
                    <span className="text-[9px] font-semibold text-[#5F6368]">{label}</span>
                    <div className="flex items-center justify-between rounded-xl bg-white px-2.5 py-1.5">
                      <span className="text-[9px] text-[#7B8087]">{value}</span>
                      <div className="h-2.5 w-2.5 rounded-sm border border-[#AEB4BC]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-[18px] bg-[#F7F7F7] p-4">
                <div className="h-3 w-3 rounded-sm border border-black/70" />
                <p className="mt-4 text-[10px] font-bold text-black">Şirket Belgeleri</p>
                <p className="mt-1 text-[9px] text-black/55">6 belge</p>
                <div className="mt-4 inline-flex rounded-full bg-black px-3 py-1.5 text-[8px] font-bold text-white">
                  Belgeleri Gör
                </div>
              </div>

              <div className="rounded-[18px] bg-[#EEF3FD] p-4">
                <div className="h-3 w-3 rounded-sm border border-black/70" />
                <p className="mt-4 text-[10px] font-bold text-black">Uzman Desteği</p>
                <p className="mt-1 text-[9px] leading-[1.5] text-black/60">
                  Başvuru ve belge akışı için ekibimiz hazır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookkeepingMockup({
  isHorizontal,
  alignBottom = false,
}: {
  isHorizontal: boolean;
  alignBottom?: boolean;
}) {
  return (
    <div
      className={`${alignBottom ? "absolute bottom-[-26px] left-5 w-[74%] md:w-[76%]" : "absolute inset-0"} overflow-hidden border border-[#DCE8F6] bg-[#F7FBFF] shadow-2xl ${
        isHorizontal ? "rounded-tl-2xl rounded-bl-2xl p-4" : "rounded-t-3xl p-4"
      }`}
    >
      <div className="flex h-full flex-col rounded-[24px] border border-[#E6EEF7] bg-white">
        <div className="flex items-center justify-between border-b border-[#EEF4FA] px-4 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">
              Muhasebe Paneli
            </p>
            <p className="mt-1 text-xs font-bold text-black">Mart Özeti</p>
          </div>
          <div className="rounded-full bg-[#F2F7FF] px-3 py-1 text-[10px] font-bold text-[#1b98d5]">
            Güncel
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[20px] bg-[#F7FBFF] p-3">
              <p className="text-[10px] font-semibold text-[#7B8087]">Toplam Gelir</p>
              <p className="mt-1 text-base font-bold text-black">184.500 ₺</p>
              <p className="mt-1 text-[10px] font-bold text-[#00A86B]">+12.4%</p>
            </div>
            <div className="rounded-[20px] bg-[#F8F8F8] p-3">
              <p className="text-[10px] font-semibold text-[#7B8087]">Toplam Gider</p>
              <p className="mt-1 text-base font-bold text-black">62.300 ₺</p>
              <p className="mt-1 text-[10px] font-bold text-[#C08F00]">Kontrol altında</p>
            </div>
          </div>

          <div className="rounded-[22px] bg-[#F7FBFF] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-bold text-[#1b98d5]">Nakit Akışı</p>
              <p className="text-[10px] font-semibold text-[#7B8087]">Son 30 gün</p>
            </div>
            <div className="flex h-20 items-end gap-2">
              {[42, 58, 44, 72, 64, 88, 76].map((height, index) => (
                <div key={index} className="flex-1 rounded-t-full bg-[linear-gradient(180deg,#9edfff_0%,#1b98d5_100%)]" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {[
              ["Fatura Kontrolü", "12 evrak bekliyor"],
              ["Banka Mutabakatı", "Güncel"],
              ["Uzman Notu", "2 işlem incelenecek"],
            ].map(([title, detail]) => (
              <div key={title} className="flex items-center justify-between rounded-2xl bg-[#FAFCFF] px-3 py-2.5">
                <span className="text-[11px] font-semibold text-black">{title}</span>
                <span className="text-[10px] font-bold text-[#7B8087]">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxesMockup({
  isHorizontal,
  alignBottom = false,
}: {
  isHorizontal: boolean;
  alignBottom?: boolean;
}) {
  return (
    <div
      className={`${alignBottom ? "absolute bottom-[-26px] left-5 w-[74%] md:w-[76%]" : "absolute inset-0"} overflow-hidden border border-[#A7DDB5] bg-[#EAF9EE] shadow-2xl ${
        isHorizontal ? "rounded-tl-2xl rounded-bl-2xl p-4" : "rounded-t-3xl p-4"
      }`}
    >
      <div className="flex h-full flex-col rounded-[24px] border border-[#BDE8C7] bg-white/92">
        <div className="flex items-center justify-between border-b border-[#E7F6EB] px-4 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#15803D]">
              Vergi Paneli
            </p>
            <p className="mt-1 text-xs font-bold text-black">Beyan ve Evrak Takibi</p>
          </div>
          <div className="rounded-full bg-[#DCF8E4] px-3 py-1 text-[10px] font-bold text-[#15803D]">
            Hazır
          </div>
        </div>

        <div className="grid flex-1 gap-3 p-4">
          <div className="grid grid-cols-[1.4fr_0.9fr] gap-3">
            <div className="rounded-[20px] bg-[#F7FBF8] p-3">
              <p className="text-[10px] font-semibold text-[#7B8087]">Yaklaşan Beyan</p>
              <p className="mt-1 text-sm font-bold text-black">KDV Beyannamesi</p>
              <p className="mt-2 text-[10px] font-bold text-[#15803D]">Son gün: 26 Mart</p>
            </div>
            <div className="rounded-[20px] bg-[#DCF8E4] p-3">
              <p className="text-[10px] font-semibold text-[#15803D]">Bu Ay</p>
              <p className="mt-1 text-sm font-bold text-black">4 görev</p>
            </div>
          </div>

          <div className="rounded-[22px] bg-[#F7FBF8] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-bold text-[#15803D]">Evrak Durumu</p>
              <p className="text-[10px] font-semibold text-[#7B8087]">Güncel</p>
            </div>
            <div className="space-y-2">
              {[
                ["KDV Evrakları", "Tamamlandı"],
                ["Muhtasar Kontrolü", "İnceleniyor"],
                ["Geçici Vergi Dosyası", "Hazırlanıyor"],
              ].map(([title, status]) => (
                <div key={title} className="flex items-center justify-between rounded-2xl bg-white px-3 py-2.5">
                  <span className="text-[11px] font-semibold text-black">{title}</span>
                  <span className="text-[10px] font-bold text-[#15803D]">{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] bg-white px-3 py-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#15803D]">Uzman Desteği</span>
              <span className="text-[10px] font-semibold text-[#7B8087]">Aktif</span>
            </div>
            <p className="text-[10px] leading-relaxed text-[#5F6368]">
              Tüm vergi beyanlarınız, son tarih uyarıları ve evrak kontrolleri tek akışta yönetiliyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
