import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "Blog & Rehberler | Work365",
  description:
    "Şirket kuruluşu, KOSGEB destekleri, e-Dönüşüm zorunlulukları ve girişim ekosistemi hakkında en güncel haberler ve detaylı rehberler.",
};

export default function Page() {
  return <BlogPage />;
}
