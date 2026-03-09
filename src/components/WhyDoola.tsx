"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function WhyDoola() {
  const comparisonData = [
    { feature: "Zaman Alan Evrak İşleri", Work365: false, diy: true },
    { feature: "Gecikme Cezaları", Work365: false, diy: true },
    { feature: "Karmaşık Vergi Formları", Work365: false, diy: true },
    { feature: "Özel Muhasebe Uzmanı", Work365: true, diy: false },
    { feature: "Otomatik Eyalet Bildirimleri", Work365: true, diy: false },
    { feature: "Ücretsiz Vergi Danışmanlığı", Work365: true, diy: false },
    { feature: "Yapay Zeka Destekli İçgörüler", Work365: true, diy: false },
    { feature: "Hızlı Banka Hesabı Açılışı", Work365: true, diy: false },
  ];

  return (
    <section className="py-24 px-6 bg-Work365-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Neden Work365?
          </h2>
          <p className="text-xl text-Work365-text">
            Kendi başınıza yapmak yerine, işi uzmanlara bırakın.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 p-6 text-center lg:text-left">
            <div className="col-span-1 font-semibold text-Work365-text uppercase tracking-wider text-sm lg:text-base hidden lg:block">Karşılaştırma</div>
            <div className="col-span-1 font-bold text-xl lg:text-2xl text-center">Kendin Yap</div>
            <div className="col-span-1 font-bold text-xl lg:text-2xl text-center text-Work365-primary-hover">Work365 ile</div>
          </div>

          <div className="p-0">
            {comparisonData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`grid grid-cols-3 p-6 border-b border-gray-100 items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                <div className="col-span-1 font-normal text-Work365-text text-sm md:text-base text-center lg:text-left">
                  {item.feature}
                </div>
                <div className="col-span-1 flex justify-center">
                  {item.diy ? (
                    <Check className="w-6 h-6 text-red-500" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="col-span-1 flex justify-center">
                  {item.Work365 ? (
                    <div className="bg-Work365-primary/20 p-2 rounded-full">
                      <Check className="w-6 h-6 text-black" />
                    </div>
                  ) : (
                    <X className="w-5 h-5 text-gray-300" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="p-8 text-center bg-gray-50">
            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
              Bize Katılın
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
