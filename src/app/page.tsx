import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyWork365 from "@/components/WhyWork365";
import Blog from "@/components/Blog";
import Rewards from "@/components/Rewards";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <WhyWork365 />
      <Blog />
      <Rewards />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

