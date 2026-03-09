"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  Rocket,
  Handshake,
  BrainCircuit,
  Briefcase,
  BadgeDollarSign,
  Users,
  Puzzle,
  Sprout,
  TrendingUp,
  Target,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function KolayStartupPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="pt-40 pb-20 px-6 max-w-[1230px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <motion.div initial="hidden" animate="visible">
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 bg-[#EFF8FF] text-[#1b98d5] text-[13px] font-bold px-4 py-2 rounded-full border border-[#BEE3F8] mb-6"
              >
                <Rocket className="w-4 h-4" />
                Türkiye odaklı startup ekosistemi platformu
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-[52px] md:text-[64px] font-bold tracking-tighter leading-[0.95] text-black mb-6"
              >
                KolayStartup
                <br />
                <span className="text-[#1b98d5]">tam olarak</span>
                <br />
                ne yapıyor?
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-Work365-text leading-relaxed max-w-[480px] mb-8"
              >
                Girişimcileri, yatırımcıları ve hizmet sağlayıcıları tek dijital
                çatı altında buluşturan; startup yolculuğunu erken aşamadan
                büyümeye kadar daha erişilebilir kılan platform.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link
                  href="#ne-yapiyor"
                  className="bg-black hover:bg-gray-800 text-white px-7 py-4 rounded-full text-[15px] font-bold transition-colors flex items-center gap-2"
                >
                  Hizmeti Keşfet <ChevronRight className="w-5 h-5" strokeWidth={3} />
                </Link>
                <Link
                  href="#fiyatlandirma"
                  className="border border-black/10 hover:bg-gray-50 text-black px-7 py-4 rounded-full text-[15px] font-bold transition-colors"
                >
                  Planları Gör
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { value: "500+", label: "Aktif startup" },
                  { value: "200+", label: "Yatırımcı ağı" },
                  { value: "₺50M+", label: "Başarılı eşleşme" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#F7FAFF] rounded-2xl p-4 border border-[#E5EEF8]"
                  >
                    <p className="text-[22px] font-bold text-black tracking-tight">{s.value}</p>
                    <p className="text-[13px] text-Work365-text mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F7FAFF] rounded-[36px] p-6 border border-[#E5EEF8] space-y-4"
            >
              {/* Flow Card */}
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-[#F0F4FA]">
                <p className="text-[12px] font-bold text-[#1b98d5] uppercase tracking-wider mb-4">
                  Platformun sunduğu temel akış
                </p>
                <div className="space-y-3">
                  {[
                    { title: "Startup profili oluşturma", desc: "Yatırımcı ve ortaklara görünür olun", tag: "Başlangıç" },
                    { title: "AI destekli değerlendirme", desc: "Başvuruların daha hızlı incelenmesi", tag: "AI" },
                    { title: "Yatırımcı & ekip eşleştirme", desc: "Uygun bağlantılara erişim", tag: "Eşleştirme" },
                    { title: "Yan hizmetler ve modüller", desc: "KolayJob ve KolayTeam ile genişleme", tag: "Ekosistem" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between gap-3 bg-[#F7FAFF] rounded-[16px] px-4 py-3"
                    >
                      <div>
                        <p className="text-[14px] font-bold text-black">{item.title}</p>
                        <p className="text-[12px] text-Work365-text">{item.desc}</p>
                      </div>
                      <span className="bg-[#EFF8FF] text-[#1b98d5] text-[11px] font-bold px-3 py-1 rounded-full border border-[#BEE3F8] whitespace-nowrap">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audience mini card */}
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-[#F0F4FA]">
                <p className="text-[12px] font-bold text-[#1b98d5] uppercase tracking-wider mb-4">
                  Kime hitap ediyor?
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Girişimciler", tag: "Fon & görünürlük" },
                    { label: "Yatırımcılar", tag: "Deal flow" },
                    { label: "Yetenekler", tag: "İş fırsatı" },
                  ].map((a) => (
                    <div
                      key={a.label}
                      className="flex items-center justify-between bg-[#F7FAFF] rounded-[14px] px-4 py-3"
                    >
                      <p className="text-[14px] font-bold text-black">{a.label}</p>
                      <span className="bg-[#EFF8FF] text-[#1b98d5] text-[11px] font-bold px-3 py-1 rounded-full border border-[#BEE3F8]">
                        {a.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ne yapıyor */}
        <section id="ne-yapiyor" className="py-24 px-6 bg-[aliceblue]">
          <div className="max-w-[1230px] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 bg-[#EFF8FF] text-[#1b98d5] text-[13px] font-bold px-4 py-2 rounded-full border border-[#BEE3F8] mb-4"
              >
                Özet
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-[40px] md:text-[52px] font-bold tracking-tighter text-black mb-4"
              >
                KolayStartup&apos;ın verdiği hizmet
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-Work365-text max-w-[680px] mb-12"
              >
                Sadece startup listeleyen bir dizin değil; yatırım, ekip kurma,
                işe alım ve profesyonel destek süreçlerini aynı deneyim içinde
                toplayan çok katmanlı bir girişim ekosistemi çözümü.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: Rocket,
                  title: "Startup görünürlüğü sağlar",
                  desc: "Girişimler kendilerini tanıtabilecek, yatırımcılara ulaşabilecek ve aşamalarına göre daha görünür hale gelebilecek bir profile sahip olur.",
                  delay: 0,
                },
                {
                  icon: Handshake,
                  title: "Doğru bağlantıları kurar",
                  desc: "Yatırımcı, mentor, danışman, kurucu ortak veya takım üyesi gibi kritik paydaşlarla eşleşme mantığı üzerine kurulmuştur.",
                  delay: 1,
                },
                {
                  icon: BrainCircuit,
                  title: "AI ile süreci hızlandırır",
                  desc: "Başvuru değerlendirmesi ve eşleştirme süreçlerinde yapay zeka destekli karar akışları kullanarak verimlilik sunar.",
                  delay: 2,
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    custom={card.delay}
                    className="bg-white rounded-[28px] p-7 border border-[#E5EEF8] shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-[16px] bg-[#EFF8FF] border border-[#BEE3F8] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-[#1b98d5]" />
                    </div>
                    <h3 className="text-[20px] font-bold text-black tracking-tight mb-3">{card.title}</h3>
                    <p className="text-Work365-text leading-relaxed">{card.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Modüller */}
        <section id="moduller" className="py-24 px-6">
          <div className="max-w-[1230px] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 bg-[#EFF8FF] text-[#1b98d5] text-[13px] font-bold px-4 py-2 rounded-full border border-[#BEE3F8] mb-4"
              >
                Platform modülleri
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-[40px] md:text-[52px] font-bold tracking-tighter text-black mb-4"
              >
                Tek platform içinde
                <br />
                <span className="text-[#1b98d5]">birden fazla çözüm</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-Work365-text max-w-[680px] mb-12"
              >
                KolayStartup, ana platformun yanında işe alım ve takım kurma
                gibi özel alt modüllerle girişimlerin operasyonel boşluklarını
                kapatmaya çalışır.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Briefcase,
                  title: "Startup Kataloğu",
                  desc: "Startupların keşfedilmesini, filtrelenmesini ve yatırımcılar tarafından incelenmesini kolaylaştıran listeleme yapısı sunar.",
                  delay: 0,
                },
                {
                  icon: BadgeDollarSign,
                  title: "Yatırımcı Ağı",
                  desc: "Farklı yatırım tipleri ve odak alanlarına göre yatırımcıların görülebildiği, startup-yatırımcı buluşmasını kolaylaştıran bölüm.",
                  delay: 1,
                },
                {
                  icon: Users,
                  title: "KolayJob",
                  desc: "Startup odaklı insan kaynakları modülü; adaylarla açık pozisyonları AI destekli şekilde eşleştirmeyi hedefler.",
                  delay: 2,
                },
                {
                  icon: Puzzle,
                  title: "KolayTeam",
                  desc: "Kurucu ortak ve ekip üyesi bulmayı kolaylaştırır; vizyon, rol ve beceri uyumuna göre bağlantı kurma mantığı sunar.",
                  delay: 3,
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    custom={card.delay}
                    className="bg-[#F7FAFF] rounded-[28px] p-6 border border-[#E5EEF8] hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-[16px] bg-white border border-[#E5EEF8] flex items-center justify-center mb-5 shadow-sm">
                      <Icon className="w-6 h-6 text-[#1b98d5]" />
                    </div>
                    <h3 className="text-[18px] font-bold text-black tracking-tight mb-2">{card.title}</h3>
                    <p className="text-[14px] text-Work365-text leading-relaxed">{card.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Hedef Kitle */}
        <section className="py-24 px-6 bg-[aliceblue]">
          <div className="max-w-[1230px] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 bg-[#EFF8FF] text-[#1b98d5] text-[13px] font-bold px-4 py-2 rounded-full border border-[#BEE3F8] mb-4"
              >
                Hedef kitle
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-[40px] md:text-[52px] font-bold tracking-tighter text-black mb-4"
              >
                Kimler için değer üretiyor?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-Work365-text max-w-[600px] mb-12"
              >
                KolayStartup aynı anda üç ana kullanıcı grubuna hitap edecek şekilde kurgulanmış.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: Sprout,
                  title: "Girişimciler için",
                  desc: "Yatırımcıya görünür olmak, ekip kurmak, yetenek bulmak, danışman ve hizmet sağlayıcılara erişmek isteyen girişimler için merkezi alan.",
                  delay: 0,
                },
                {
                  icon: TrendingUp,
                  title: "Yatırımcılar için",
                  desc: "Deal flow kalitesini artırmak, girişimleri filtrelemek ve ilgi alanına göre potansiyel fırsatları daha düzenli incelemek isteyenler için.",
                  delay: 1,
                },
                {
                  icon: Target,
                  title: "Yetenek ve uzmanlar için",
                  desc: "Startup dünyasında iş arayan profesyoneller, kurucu ortak olmak isteyen adaylar ve hizmet sağlayıcılar için erişim noktası.",
                  delay: 2,
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    custom={card.delay}
                    className="bg-white rounded-[28px] p-7 border border-[#E5EEF8] shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-[16px] bg-[#EFF8FF] border border-[#BEE3F8] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-[#1b98d5]" />
                    </div>
                    <h3 className="text-[20px] font-bold text-black tracking-tight mb-3">{card.title}</h3>
                    <p className="text-Work365-text leading-relaxed">{card.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Nasıl çalışır */}
        <section id="nasil-calisir" className="py-24 px-6">
          <div className="max-w-[1230px] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 bg-[#EFF8FF] text-[#1b98d5] text-[13px] font-bold px-4 py-2 rounded-full border border-[#BEE3F8] mb-4"
              >
                İşleyiş
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-[40px] md:text-[52px] font-bold tracking-tighter text-black mb-4"
              >
                Platform nasıl çalışıyor?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-Work365-text max-w-[640px] mb-12"
              >
                Kullanıcıyı başvurudan eşleşmeye ve oradan büyüme aşamasına
                kadar yönlendiren basit bir akış sunar.
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Steps */}
              <div className="space-y-4">
                {[
                  {
                    n: "1",
                    title: "Başvuru ve profil oluşturma",
                    desc: "Startup, yatırımcı veya hizmet sağlayıcı platforma kayıt olur; profiliyle ekosistemde görünür hale gelir.",
                    delay: 0,
                  },
                  {
                    n: "2",
                    title: "AI destekli inceleme",
                    desc: "Sistem, başvuruyu daha hızlı değerlendirmek ve ilk seviyede sınıflandırmak için yapay zeka akışlarından yararlanır.",
                    delay: 1,
                  },
                  {
                    n: "3",
                    title: "Doğru kişilerle eşleşme",
                    desc: "Yatırımcı, ekip arkadaşı, aday çalışan veya profesyonel hizmet sağlayıcılarla daha isabetli bağlantılar kurulması amaçlanır.",
                    delay: 2,
                  },
                  {
                    n: "4",
                    title: "Büyüme ve ölçekleme",
                    desc: "Kullanıcı, ihtiyacına göre modüller ve daha üst planlarla girişiminin bir sonraki aşamasına geçebilir.",
                    delay: 3,
                  },
                ].map((step) => (
                  <motion.div
                    key={step.n}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    custom={step.delay}
                    className="flex gap-4 bg-[#F7FAFF] rounded-[22px] p-5 border border-[#E5EEF8]"
                  >
                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#1b98d5] text-white font-bold text-[15px] flex items-center justify-center">
                      {step.n}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-black mb-1">{step.title}</h4>
                      <p className="text-[14px] text-Work365-text leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={0}
                className="bg-[#F7FAFF] rounded-[28px] p-7 border border-[#E5EEF8] h-fit"
              >
                <div className="w-12 h-12 rounded-[16px] bg-[#EFF8FF] border border-[#BEE3F8] flex items-center justify-center mb-5">
                  <BrainCircuit className="w-6 h-6 text-[#1b98d5]" />
                </div>
                <h3 className="text-[22px] font-bold text-black tracking-tight mb-3">
                  Neden dikkat çekiyor?
                </h3>
                <p className="text-Work365-text mb-6 leading-relaxed">
                  KolayStartup&apos;ın ana farkı, bir startup&apos;ın sadece yatırım değil;
                  ekip, işe alım, danışmanlık ve görünürlük ihtiyaçlarını tek
                  arayüzde birleştirmeye çalışmasıdır.
                </p>
                <div className="space-y-3">
                  {[
                    { title: "Çoklu kullanıcı tipi", desc: "startup, yatırımcı ve hizmet sağlayıcıları aynı ekosistemde toplar" },
                    { title: "Modüler yapı", desc: "KolayJob ve KolayTeam gibi alt ürünlerle dikey genişleme sunar" },
                    { title: "Aşama bazlı yaklaşım", desc: "fikir aşamasından kurumsal büyümeye kadar plan mantığı kurar" },
                    { title: "Düşük bariyerli başlangıç", desc: "ücretsiz deneme ve giriş odaklı çağrılarla kullanıcı kazanımını destekler" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 bg-white rounded-[16px] px-4 py-3 border border-[#E5EEF8]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#1b98d5] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[14px] font-bold text-black">{item.title}: </span>
                        <span className="text-[14px] text-Work365-text">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Fiyatlandırma */}
        <section id="fiyatlandirma" className="py-24 px-6 bg-[aliceblue]">
          <div className="max-w-[1230px] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 bg-[#EFF8FF] text-[#1b98d5] text-[13px] font-bold px-4 py-2 rounded-full border border-[#BEE3F8] mb-4"
              >
                Plan yapısı
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-[40px] md:text-[52px] font-bold tracking-tighter text-black mb-4"
              >
                Fikir aşamasından
                <br />
                <span className="text-[#1b98d5]">kurumsal büyümeye</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-Work365-text max-w-[640px] mb-12"
              >
                Startup&apos;ın olgunluk seviyesi arttıkça daha fazla görünürlük,
                erişim ve destek veren katmanlı abonelikler.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  name: "Fikir Aşaması",
                  desc: "İlk görünürlük ve temel araçlar",
                  price: "₺3.465",
                  features: ["Profil oluşturma", "AI pitch değerlendirme", "Temel dashboard erişimi", "Mentor görünürlüğü"],
                  featured: false,
                  delay: 0,
                },
                {
                  name: "MVP Geliştirme",
                  desc: "Yatırımcı görünürlüğü ve analitik",
                  price: "₺6.965",
                  features: ["KolayJob & KolayTeam erişimi", "Gelişmiş analitik", "Öncelikli destek", "Mentor ve danışman erişimi"],
                  featured: true,
                  badge: "En Popüler",
                  delay: 1,
                },
                {
                  name: "Piyasaya Sürüldü",
                  desc: "Ürün pazarda, büyüme hedefli",
                  price: "₺10.465",
                  features: ["API erişimi", "2. el hisse satışı", "Gelişmiş eşleştirme", "SPK ve hukuki danışman erişimi"],
                  featured: false,
                  delay: 2,
                },
                {
                  name: "Kurumsal",
                  desc: "Ölçeklenen girişimler için",
                  price: "₺17.465",
                  features: ["Medya / PR görünürlüğü", "Özel hesap yöneticisi", "Özel danışmanlık erişimi", "Gelişmiş destek seviyesi"],
                  featured: false,
                  delay: 3,
                },
              ].map((plan) => (
                <motion.div
                  key={plan.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  custom={plan.delay}
                  className={`relative rounded-[28px] p-6 border flex flex-col ${
                    plan.featured
                      ? "bg-black border-black text-white shadow-xl scale-[1.03]"
                      : "bg-white border-[#E5EEF8] shadow-sm"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute top-4 right-4 bg-[#F2D96D] text-black text-[11px] font-bold px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className={`text-[18px] font-bold mb-1 ${plan.featured ? "text-white" : "text-black"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-[13px] mb-5 ${plan.featured ? "text-white/60" : "text-Work365-text"}`}>
                    {plan.desc}
                  </p>
                  <div className={`text-[34px] font-bold tracking-tighter mb-1 ${plan.featured ? "text-white" : "text-black"}`}>
                    {plan.price}
                  </div>
                  <p className={`text-[13px] mb-6 ${plan.featured ? "text-white/50" : "text-Work365-text"}`}>/ ay</p>
                  <ul className="space-y-2 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 ${plan.featured ? "text-[#1b98d5]" : "text-[#1b98d5]"}`}
                        />
                        <span className={`text-[13px] ${plan.featured ? "text-white/80" : "text-Work365-text"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`mt-auto text-center py-3 rounded-full text-[14px] font-bold transition-colors ${
                      plan.featured
                        ? "bg-[#1b98d5] hover:bg-[#1686be] text-white"
                        : "border border-black/10 hover:bg-gray-50 text-black"
                    }`}
                  >
                    Başla
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-[1230px] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0}
              className="bg-black rounded-[36px] p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              <div>
                <span className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-[13px] font-bold px-4 py-2 rounded-full border border-white/10 mb-5">
                  Tek cümlede
                </span>
                <h2 className="text-[36px] md:text-[48px] font-bold tracking-tighter text-white leading-tight mb-4">
                  Startup&apos;ın ihtiyaç duyduğu her şey
                  <br />
                  <span className="text-[#1b98d5]">tek platformda.</span>
                </h2>
                <p className="text-white/60 text-lg max-w-[520px]">
                  Kurmak, büyütmek ve doğru insanlara ulaşmak için gereken
                  tüm araçlar ve bağlantılar tek yerden.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  href="/register"
                  className="bg-[#1b98d5] hover:bg-[#1686be] text-white px-8 py-4 rounded-full text-[15px] font-bold transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  Hemen Başla <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#fiyatlandirma"
                  className="border border-white/15 hover:bg-white/5 text-white px-8 py-4 rounded-full text-[15px] font-bold transition-colors text-center whitespace-nowrap"
                >
                  Fiyatları İncele
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
