"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Gerçek entegrasyon eklenene kadar simüle ediliyor
    await new Promise((r) => window.setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start justify-center gap-4 py-8">
        <div className="rounded-full bg-[#F0FDF4] p-4">
          <CheckCircle2 className="h-8 w-8 text-[#16A34A]" />
        </div>
        <h3 className="text-[24px] font-bold tracking-[-0.03em] text-[#0F172A]">Mesajınız alındı.</h3>
        <p className="text-[15px] leading-7 text-[#64748B]">
          Satış ekibimiz en geç 1 iş günü içinde size geri dönecek.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#475569]">Ad Soyad</label>
          <input
            required
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Adınız Soyadınız"
            className="w-full rounded-[16px] border border-[#DCE7F1] bg-[#F8FBFF] px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-all placeholder:text-[#A3B3C2] focus:border-[#1B98D5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(27,152,213,0.1)]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#475569]">E-posta</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@sirket.com"
            className="w-full rounded-[16px] border border-[#DCE7F1] bg-[#F8FBFF] px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-all placeholder:text-[#A3B3C2] focus:border-[#1B98D5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(27,152,213,0.1)]"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#475569]">Telefon <span className="text-[#94A3B8]">(opsiyonel)</span></label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05xx xxx xx xx"
            className="w-full rounded-[16px] border border-[#DCE7F1] bg-[#F8FBFF] px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-all placeholder:text-[#A3B3C2] focus:border-[#1B98D5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(27,152,213,0.1)]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#475569]">Konu</label>
          <select
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-[16px] border border-[#DCE7F1] bg-[#F8FBFF] px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-all focus:border-[#1B98D5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(27,152,213,0.1)]"
          >
            <option value="" disabled>Seçin...</option>
            <option value="sirket-kurulus">Şirket Kuruluşu</option>
            <option value="dijital-altyapi">Dijital Altyapı</option>
            <option value="ekosistem">Ekosistem Modülleri</option>
            <option value="kolay-startup">KolayStartup</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-[#475569]">Mesajınız</label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nasıl yardımcı olabiliriz?"
          className="w-full rounded-[16px] border border-[#DCE7F1] bg-[#F8FBFF] px-4 py-3 text-[15px] leading-7 text-[#0F172A] outline-none transition-all placeholder:text-[#A3B3C2] focus:border-[#1B98D5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(27,152,213,0.1)]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-7 py-3.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
