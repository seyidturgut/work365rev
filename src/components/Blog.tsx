"use client";

import { motion } from "framer-motion";

export default function Blog() {
  const posts = [
    {
      title: "ABD'de Ticari Banka Hesabı Nasıl Açılır?",
      description: "İşletme banka hesabı açmak şarttır. Bu kılavuzla (uluslararası girişimcileri de kapsayan) bunu nasıl yapacağınızı keşfedin.",
      image: "/blog_bank.png",
      link: "#"
    },
    {
      title: "E-Ticaret Muhasebesi 101: 2026 Yılında İşletme Sahipleri İçin En İyi Kılavuz",
      description: "E-ticaret, trilyon dolarlık küresel bir sektör haline geldi. 2026 yılına kadar: Elbette, çevrimiçi alışverişin kolaylığı ve dijital mağazaların sınırsız erişimi...",
      image: "/blog_ecommerce.png",
      link: "#"
    },
    {
      title: "Kârınızı En Üst Düzeye Çıkarın: Vergilerde 30.000 Dolar Tasarruf Edin",
      description: "Eğer e-ticaret alanında faaliyet göstermeyi hedefleyen bir satıcıysanız, altı hatta yedi haneli rakamlara ulaşmak hayal gibi görünebilir. Ta ki bunu...",
      image: "/blog_tax.png",
      link: "#"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1230px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#9A7B31] font-bold text-sm uppercase tracking-widest mb-4 block">
            Genel Bakış
          </span>
          <h2 className="text-[40px] md:text-[52px] font-bold text-black mb-6 leading-tight">
            Girişimciler İçin Büyüme Rehberi
          </h2>
          <p className="text-lg text-Work365-text max-w-2xl mx-auto">
            Daha akıllıca ve hızlı bir şekilde büyümenize yardımcı olacak güçlü kaynaklar.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-[#F8F9FA] rounded-[32px] overflow-hidden flex flex-col items-start p-4 hover:shadow-xl transition-shadow border border-transparent hover:border-gray-100 group"
            >
              {/* Image Container */}
              <div className="w-full h-[240px] rounded-[24px] overflow-hidden mb-8">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="px-4 pb-4 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-black mb-4 leading-tight">
                  {post.title}
                </h3>
                <p className="text-Work365-text mb-8 line-clamp-3 text-lg leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-auto">
                  <button className="bg-[#E9ECEF] text-Work365-text px-6 py-3 rounded-full font-bold text-sm hover:bg-[#DEE2E6] transition-colors">
                    Daha fazla bilgi edin
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
