import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[aliceblue] text-[#0F172A]">
      <Header />

      <section className="px-6 pb-12 pt-36 md:pt-40">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[36px] border border-black/6 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-[#0F172A] px-8 py-10 text-white md:px-12 md:py-14">
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-white/60">İletişim</p>
              <h1 className="mt-4 max-w-[12ch] text-[36px] font-extrabold tracking-[-0.05em] md:text-[52px]">
                Ekibimiz size uygun akışı birlikte planlasın.
              </h1>
              <p className="mt-5 max-w-[56ch] text-[17px] leading-8 text-white/72">
                Kuruluş paketi, dijital altyapı veya ekosistem modülleri için kısa bir ihtiyaç görüşmesi planlayın.
                Talebiniz satış ekibimize düşer ve size en doğru paketle geri dönüş yapılır.
              </p>

              <div className="mt-10 space-y-4 text-[15px] text-white/82">
                <p>E-posta: hello@work365.co</p>
                <p>Telefon: +90 850 000 36 35</p>
                <p>Çalışma saatleri: Hafta içi 09:00 - 18:00</p>
              </div>
            </div>

            <div className="px-8 py-10 md:px-12 md:py-14">
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#1B98D5]">Mesaj Gönderin</p>
              <h2 className="mt-4 text-[28px] font-bold tracking-[-0.04em] text-[#0F172A] md:text-[34px]">
                Size en kısa sürede dönelim.
              </h2>
              <p className="mt-3 text-[14px] leading-6 text-[#64748B]">
                Formu doldurun, satış ekibimiz 1 iş günü içinde iletişime geçer.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
              <div className="mt-8 border-t border-[#E2E8F0] pt-6">
                <p className="text-[13px] text-[#94A3B8]">Ya da direkt ulaşın:</p>
                <div className="mt-2 flex flex-wrap gap-4 text-[13px] font-medium text-[#475569]">
                  <Link href="mailto:hello@work365.co" className="hover:text-[#1B98D5]">hello@work365.co</Link>
                  <span>·</span>
                  <Link href="tel:+908500003635" className="hover:text-[#1B98D5]">+90 850 000 36 35</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
