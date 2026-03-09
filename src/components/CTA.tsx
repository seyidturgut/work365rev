"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function CTA() {
  const floatingIcons = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", x: -120, y: -40, delay: 0 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg", x: 60, y: 80, delay: 0.5 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg", x: -80, y: 100, delay: 1 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Shopify_Logo.png", x: 140, y: -20, delay: 1.5 },
  ];

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
              Work365'e bugün katılın ve işinizi büyütmeye başlayın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-lg">
                Ücretsiz Hesap Oluşturun <ChevronRight className="w-4 h-4" />
              </button>
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-base flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm">
                Demo Ayarlayın
              </button>
            </div>
          </div>

          {/* Right Side Graphics */}
          <div className="relative lg:w-1/2 mt-12 lg:mt-0 flex justify-center items-center">
            {/* The 3D-ish Box */}
            <div className="relative w-[200px] h-[200px]">
              {/* Box Base (SVG) */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                <path d="M100 160 L40 130 L40 70 L100 100 Z" fill="#F5D042" />
                <path d="M100 160 L160 130 L160 70 L100 100 Z" fill="#E7C032" />
                <path d="M40 70 L100 40 L160 70 L100 100 Z" fill="#9edfff" />
                <path d="M40 70 L30 50 L90 50 L100 100 Z" fill="#E7C032" opacity="0.8" />
                <path d="M160 70 L170 50 L110 50 L100 100 Z" fill="#F5D042" opacity="0.8" />
              </svg>

              {/* Emerging Graphic Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8">
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 bg-[#A3EBB1] rounded-2xl flex items-center justify-center shadow-md"
                >
                  <span className="text-2xl font-bold text-white">%</span>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-12 top-10 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md rotate-[-15deg]"
                >
                  <div className="w-8 h-1 bg-blue-100 rounded-full mb-1" />
                  <div className="w-6 h-1 bg-blue-100 rounded-full" />
                </motion.div>
              </div>

              {/* Floating External Icons */}
              {floatingIcons.map((icon, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  animate={{ 
                    x: icon.x * 0.7, 
                    y: (icon.y + (Math.sin(idx) * 15)) * 0.7,
                    rotate: idx % 2 === 0 ? [0, 5, 0] : [0, -5, 0]
                  }}
                  transition={{ 
                    x: { duration: 0.8, delay: icon.delay },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-50"
                >
                  <img src={icon.src} alt="icon" className="w-6 h-6 object-contain" />
                </motion.div>
              ))}

              {/* Dashed Connecting Lines */}
              <svg className="absolute inset-x-[-100px] inset-y-[-80px] w-[400px] h-[350px] pointer-events-none opacity-10">
                <motion.path
                  d="M50 200 Q 150 100 250 200 T 400 200"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
