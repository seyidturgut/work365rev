import type { Metadata } from "next";
import EkosistemPage from "@/components/EkosistemPage";

export const metadata: Metadata = {
  title: "Ekosistem | Work365",
  description:
    "Dijital ofis, web sitesi, sosyal medya ve içerik yönetimi modülleri ile işletmenizi tek platformdan büyütün. Work365 ekosistem çözümleri.",
};

export default function Page() {
  return <EkosistemPage />;
}
