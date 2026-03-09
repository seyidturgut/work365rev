"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { authRotatingMessages, authSlides } from "@/lib/auth-content";

const SLIDE_INTERVAL_MS = 5000;
const MESSAGE_INTERVAL_MS = 2800;

export default function AuthShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeMessage, setActiveMessage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % authSlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveMessage((current) => (current + 1) % authRotatingMessages.length);
    }, MESSAGE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = authSlides[activeSlide];

  return (
    <section className="relative isolate flex min-h-[360px] overflow-hidden rounded-[32px] bg-[#07111B] lg:min-h-[calc(100vh-48px)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.9)_0%,rgba(2,6,23,0.56)_46%,rgba(7,17,27,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,152,213,0.25),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_26%)]" />

      <div className="relative z-10 flex w-full flex-col justify-between p-6 sm:p-8 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3 text-white/88">
          <span className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-[11px] font-bold tracking-[0.34em] sm:text-[12px]">
            {currentSlide.badge}
          </span>
          <span className="text-[10px] font-medium tracking-[0.32em] text-white/70 sm:text-[12px]">
            {currentSlide.eyebrow}
          </span>
        </div>

        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="max-w-4xl text-[26px] font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-[34px] lg:text-[46px]">
                {currentSlide.title}
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-8 text-white/78 sm:text-[19px]">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={authRotatingMessages[activeMessage]}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14px] font-semibold tracking-[0.02em] text-[#D6EDFA] sm:text-[15px]"
              >
                {authRotatingMessages[activeMessage]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            {authSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`${index + 1}. görseli göster`}
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "w-11 bg-white" : "w-3 bg-white/45 hover:bg-white/72"
                }`}
              />
            ))}
          </div>
          <p className="text-right text-[13px] text-white/70 sm:text-[15px]">
            {currentSlide.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
