"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Work365 ile çalışmak için ABD vatandaşı olmam gerekiyor mu?",
    answer: "Hayır. Dünya çapındaki girişimcilerin ABD şirketlerini kurmalarına ve büyütmelerine yardımcı oluyoruz. ABD vatandaşı olmadan da LLC kurabilirsiniz."
  },
  {
    question: "Başlamak için sizden hangi bilgilere ihtiyacımız var?",
    answer: "Sadece şirket adınız, adresiniz (biz sağlayabiliriz) ve pasaport kopyanız ile adres kanıtınız gibi temel kimlik bilgileri yeterlidir."
  },
  {
    question: "Work365 Analytics kimler içindir?",
    answer: "Finansal verilerini net bir şekilde görmek, geliri, gideri ve reklam harcamalarını tek panelde analiz etmek isteyen tüm işletme sahipleri içindir."
  },
  {
    question: "Hala bir sorunuz mu var?",
    answer: "Bize her zaman hello@Work365.com adresinden veya sağ alt köşedeki canlı destek simgesinden ulaşabilirsiniz. Uzman ekibimiz sorularınızı yanıtlamaktan memnuniyet duyar."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Sıkça Sorulan Sorular</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-Work365-text shrink-0 ml-4" />
                ) : (
                  <Plus className="w-5 h-5 text-Work365-text shrink-0 ml-4" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-6 pt-0 bg-gray-50 text-Work365-text leading-relaxed border-t border-gray-100">
                  <p className="mt-4">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
