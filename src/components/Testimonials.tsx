"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Adam Fuller",
      role: "Flagaholics'in Kurucu Ortağı",
      quote: "Work365, Flagaholics'in yasal ve mali işlemlerini halletti, böylece biz de büyümeye ve harika bir müşteri deneyimi sunmaya odaklanabildik.",
      image: "/founder_gym.png",
      headshot: "/founder_1.png",
      color: "bg-[#E6F9F9]"
    },
    {
      name: "Deon Bryan",
      role: "Viteranz'da CEO",
      quote: "Şirket kurmak hiç bu kadar kolay olmamıştı. Work365 ekibi her adımda yanımızdaydı ve tüm bürokrasiyi bizim için çözdü.",
      image: "/founder_1.png",
      headshot: "/founder_1.png",
      color: "bg-[#FDF2E9]"
    },
    {
      name: "Alex Lieberman",
      role: "Storyar'ın kurucusu",
      quote: "ABD pazarına açılmak büyük bir adımdı. Work365 ile bu süreci sorunsuz bir şekilde atlattık. Gerçekten kurucular dostu bir platform.",
      image: "/founder_2.png",
      headshot: "/founder_2.png",
      color: "bg-[#F0F4F8]"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1230px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 px-4">
          <span className="text-[#9A7B31] font-bold text-sm uppercase tracking-widest mb-4 block">
            10.000'den fazla Kurucu
          </span>
          <h2 className="text-[32px] md:text-[52px] font-bold text-black mb-6 leading-tight max-w-5xl mx-auto">
            Kurucular için tasarlandı. Kurucular tarafından seviliyor.
          </h2>
        </div>

        {/* Dynamic Display Area */}
        <div className="flex flex-col lg:flex-row gap-6 h-[650px]">
          {/* Main Content Card (Expanded) */}
          <div className="flex-grow h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className={`w-full h-full ${testimonials[activeIndex].color} rounded-[48px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12`}
              >
                {/* Visual / Image Side */}
                <div className="w-full md:w-1/2 h-[300px] md:h-full rounded-[32px] overflow-hidden shadow-2xl relative">
                   <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                   />
                   {/* Play button overlay if needed */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                      </div>
                   </div>
                </div>

                {/* Text Content Side */}
                <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                  <div className="text-[#00CCCC] mb-8">
                    <Quote className="w-16 h-16 fill-current" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 leading-snug">
                    {testimonials[activeIndex].quote}
                  </h3>
                  
                  <div>
                    <h4 className="text-xl font-bold text-black mb-1">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-lg text-Work365-text font-normal">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Vertical Navigation Slabs */}
          <div className="hidden lg:flex gap-4 h-full">
            {testimonials.map((t, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-24 h-full rounded-[32px] overflow-hidden transition-all duration-500 group ${
                  activeIndex === idx ? "ring-4 ring-offset-4 ring-black" : ""
                }`}
              >
                {/* Background Image / Headshot */}
                <img 
                  src={t.headshot} 
                  alt={t.name} 
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeIndex === idx ? "scale-110 brightness-100" : "brightness-50 grayscale group-hover:grayscale-0 group-hover:brightness-100"
                  }`}
                />
                
                {/* Vertical Text Label */}
                <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                   <span className="[writing-mode:vertical-lr] rotate-180 text-white font-bold text-lg whitespace-nowrap">
                      {t.name} <span className="text-white/60 font-normal ml-2">— {t.role.split(' ')[0]}</span>
                   </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
