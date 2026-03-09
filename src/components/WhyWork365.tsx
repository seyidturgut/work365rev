"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function WhyWork365() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1230px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#9A7B31] font-bold text-sm uppercase tracking-widest mb-4 block">
            Kaynaklar
          </span>
          <h2 className="text-[40px] md:text-[56px] font-bold text-black mb-6 leading-tight">
            Neden Work365?
          </h2>
          <p className="text-xl text-Work365-text max-w-3xl mx-auto leading-relaxed">
            Biz sadece işletmenizi kurmuyoruz, sizi başarıya hazırlıyoruz.<br />
            Work365'in rakiplerine karşı nasıl bir performans sergilediğini görün.
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Work365 Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl"
          >
            {/* Background Image with Tint */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/happy_founder.png')" }}
            />
            {/* Darker Yellow/Golden Overlay for better contrast */}
            <div className="absolute inset-0 bg-[#A68911]/50 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />

            {/* Content Text */}
            <div className="absolute bottom-10 left-8 right-8 z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Work365 ile yapın
              </h3>
              <p className="text-lg text-white/90 font-bold mb-6 leading-tight">
                Hayallerinizi kurun. Gerisini biz hallederiz.
              </p>
              <button className="bg-black text-white px-7 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-gray-900 transition-colors shadow-lg">
                Paketleri İncele <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* DIY Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl bg-black"
          >
            {/* Background Image B&W */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-50 transition-transform duration-700 group-hover:scale-105 grayscale"
              style={{ backgroundImage: "url('/stressed_founder.png')" }}
            />
            {/* Darker Gradient for deep contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Drifting Keywords in background */}
            <div className="absolute inset-0 flex flex-wrap p-10 gap-x-12 opacity-20 pointer-events-none">
              <span className="text-white text-2xl font-bold">Stres</span>
              <span className="ml-auto text-white text-3xl font-bold">Son Tarihler</span>
              <span className="mt-20 text-white text-xl font-bold">Aksayan Süreçler</span>
              <span className="mt-auto text-white text-2xl font-bold">Evrak Yükü</span>
            </div>

            {/* Content Text */}
            <div className="absolute bottom-10 left-8 right-8 z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Kendin Yap
              </h3>
              <p className="text-lg text-gray-200 font-bold mb-6 leading-tight">
                Tüm süreci tek başınıza yönetmek yerine farkı görün.
              </p>
              <Link href="/karsilastir" className="bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg w-fit">
                Karşılaştır <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
