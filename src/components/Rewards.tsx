"use client";

import { motion } from "framer-motion";
import { ChevronRight, ShoppingBag, Cloud, CreditCard, Users, Briefcase, Zap } from "lucide-react";

export default function Rewards() {
  const rewards = [
    { name: "Shopify", category: "E-ticaret", icon: <ShoppingBag className="text-green-600" /> },
    { name: "AWS", category: "Bulut Hizmetleri", icon: <Cloud className="text-orange-500" /> },
    { name: "Mercury", category: "Bankacılık", icon: <CreditCard className="text-blue-500" /> },
    { name: "Hubspot", category: "CRM", icon: <Users className="text-orange-600" /> },
    { name: "Gusto", category: "Bordro", icon: <Briefcase className="text-red-500" /> },
    { name: "Stripe", category: "Ödemeler", icon: <Zap className="text-purple-600" /> },
  ];

  return (
    <section className="py-24 px-6 bg-[#F8F9FA]">
      <div className="max-w-[1230px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side Content */}
        <div className="lg:w-1/2">
          <div className="flex items-center gap-3 mb-6">
            <img src="/LOGO-END.svg" alt="Work365" className="h-6 w-auto" />
            <span className="text-[#9A7B31] font-bold text-sm tracking-widest uppercase">
              Avantajlar ve Ödüller
            </span>
          </div>
          
          <h2 className="text-[40px] md:text-[52px] font-bold text-black mb-6 leading-tight">
            Dünya çapındaki önde gelen markalardan 100.000$'ın üzerinde avantaj kazanın.
          </h2>
          
          <p className="text-xl text-Work365-text mb-10 leading-relaxed max-w-[540px]">
            Özel fırsatlar, büyük indirimler ve kuruculara özel araçlar.
          </p>
          
          <button className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-gray-900 transition-all shadow-xl">
            Pazaryerini ziyaret edin <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side - Grid of 6 Cards */}
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-[24px] shadow-sm flex items-center gap-5 border border-transparent hover:border-gray-200 transition-all cursor-default"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl font-bold">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-black leading-tight">
                  {item.name}
                </h4>
                <p className="text-sm text-Work365-text font-normal">
                  {item.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
