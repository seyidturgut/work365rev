import type { Metadata } from "next";
import DigitalInfrastructurePage from "@/components/DigitalInfrastructurePage";

export const metadata: Metadata = {
  title: "Dijital Altyapı | Work365",
  description:
    "e-İmza, KEP hesabı ve dijital altyapı paketleri ile Türkiye'de şirketinizin resmi dijital kimliğini hızla oluşturun. Tek başvuruyla tüm altyapıyı kurun.",
};

export default function Page() {
  return <DigitalInfrastructurePage />;
}
