"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

type ServiceTermsSection = {
  title: string;
  paragraphs: readonly string[];
};

type ServiceTermsTemplateProps = {
  eyebrow: string;
  title: string;
  summary: string;
  updatedAt: string;
  highlights: readonly string[];
  sections: readonly ServiceTermsSection[];
};

export default function ServiceTermsTemplate({
  eyebrow,
  title,
  summary,
  updatedAt,
  highlights,
  sections,
}: ServiceTermsTemplateProps) {
  return (
    <main className="bg-white pt-[92px]">
      <Header />

      <section className="px-6 pb-12 pt-10">
        <div className="mx-auto max-w-[1230px]">
          <Link
            href="/fiyatlandirma"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-bold text-black transition-colors hover:bg-black hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Fiyatlandırmaya dön
          </Link>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[34px] bg-[#EEF7FF] px-6 py-7 md:px-8">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#1b98d5]">{eyebrow}</p>
              <h1 className="mt-4 text-[34px] font-bold leading-[1.02] tracking-[-0.04em] text-black md:text-[54px]">
                {title}
              </h1>
              <p className="mt-5 text-[17px] leading-8 text-black/72">{summary}</p>
              <div className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-[13px] font-bold text-black/65 ring-1 ring-black/5">
                Son güncelleme: {updatedAt}
              </div>
            </div>

            <div className="rounded-[34px] bg-[#F8FBFD] px-6 py-7 ring-1 ring-black/6 md:px-8">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#0E4A6E]">Özet</p>
              <div className="mt-5 space-y-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[20px] bg-white px-4 py-4 ring-1 ring-black/5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00A86B]" />
                    <p className="text-[15px] leading-7 text-black/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-2">
        <div className="mx-auto max-w-[980px] space-y-6">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[30px] bg-white px-6 py-6 shadow-sm ring-1 ring-black/6 md:px-8 md:py-8">
              <h2 className="text-[24px] font-bold tracking-[-0.03em] text-black md:text-[30px]">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[16px] leading-8 text-black/72">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
