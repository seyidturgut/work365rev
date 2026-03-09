"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Building2, ReceiptText } from "lucide-react";

const steps = [
  { icon: <Building2 className="w-4 h-4 text-[#1B98D5]" />, label: "Şirket Kuruluşu", status: "done" },
  { icon: <FileText className="w-4 h-4 text-[#A88208]" />, label: "e-İmza & KEP", status: "active" },
  { icon: <ReceiptText className="w-4 h-4 text-black/30" />, label: "e-Dönüşüm", status: "pending" },
];

export default function CTA() {
  return (
    <section className="py-16 px-6 bg-white overflow-hidden">
      <div className="max-w-[1230px] mx-auto">
        <div className="relative bg-[#9edfff] rounded-[48px] min-h-[380px] flex flex-col lg:flex-row items-center justify-between p-10 lg:p-16 overflow-hidden shadow-xl">

          {/* Left Side Content */}
          <div className="relative z-10 lg:w-1/2">
            <h2 className="text-[36px] md:text-[48px] font-bold text-black leading-[1.1] mb-4">
              Daha az laf,<br />
              daha çok Work365.
            </h2>
            <p className="text-lg text-black/80 font-bold mb-8 max-w-[340px]">
              Şirketini bugün kur, dijital altyapını hemen kur.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/fiyatlandirma"
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-lg"
              >
                Şirketini Kur <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/fiyatlandirma"
                className="bg-white text-black px-8 py-4 rounded-full font-bold text-base flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm"
              >
                Paketleri İncele
              </Link>
            </div>
          </div>

          {/* Right Side — Platform UI Animation */}
          <div className="relative lg:w-1/2 mt-12 lg:mt-0 flex justify-center items-center">
            <div className="relative w-[280px]">

              {/* Main card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[24px] shadow-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <img src="/LOGO-END.svg" alt="Work365" className="h-5 w-auto" />
                  <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">Platform</span>
                </div>
                <p className="text-[12px] font-bold text-black/50 mb-2">Kuruluş İlerleme Durumu</p>
                <div className="space-y-3">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        step.status === "done"
                          ? "bg-green-100"
                          : step.status === "active"
                          ? "bg-[#FEF9EC]"
                          : "bg-gray-100"
                      }`}>
                        {step.status === "done" ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          step.icon
                        )}
                      </div>
                      <span className={`text-[13px] font-bold ${
                        step.status === "done"
                          ? "text-green-600"
                          : step.status === "active"
                          ? "text-[#A88208]"
                          : "text-black/30"
                      }`}>{step.label}</span>
                      {step.status === "active" && (
                        <span className="ml-auto text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Devam ediyor</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#1B98D5] to-[#A88208]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "55%" }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] font-bold text-black/40">2/3 adım tamamlandı</p>
              </motion.div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-6 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                </div>
                <span className="text-[11px] font-bold text-black">Tescil Onaylandı</span>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-lg px-3 py-2"
              >
                <p className="text-[10px] font-bold text-black/40">Dijital Altyapı</p>
                <p className="text-[12px] font-bold text-[#1B98D5]">M1 · M2 · M3</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
