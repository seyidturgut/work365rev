import type { Metadata } from "next";
import ServiceTermsTemplate from "@/components/ServiceTermsTemplate";

export const metadata: Metadata = {
  title: "Para İade Koşulları | Work365",
  description: "Work365 para iade koşulları ve hizmet kaynaklı kuruluş hatalarına ilişkin örnek şartlar sayfası.",
};

const highlights = [
  "Work365 kaynaklı kuruluş hatalarında ilgili hizmet kalemi için iade süreci başlatılabilir.",
  "Müşteri kaynaklı belge eksikliği, yanlış beyan veya üçüncü taraf gecikmeleri bu kapsamın dışında kalır.",
  "İade değerlendirmesi yazılı başvuru ve işlem kayıtları üzerinden örnek süreçle ilerler.",
];

const sections = [
  {
    title: "1. Kapsam",
    paragraphs: [
      "Bu sayfa, Work365 tarafından sunulan kuruluş hizmetlerinde uygulanabilecek örnek para iade koşullarını açıklamak için hazırlanmış demo içeriktir. Nihai hukuki metin değildir; ileride gerçek şartlar metniyle değiştirilecektir.",
      "İade taahhüdü yalnızca Work365 hizmet akışından doğrudan kaynaklanan ve müşterinin sağladığı bilgi veya belge hatasından bağımsız olarak oluşan kuruluş hataları için değerlendirilir.",
    ],
  },
  {
    title: "2. İade Değerlendirme Şartları",
    paragraphs: [
      "Bir iade talebinin değerlendirmeye alınabilmesi için müşterinin hizmet satın alma kaydı, başvuru akışı ve ilgili hata çıktısının doğrulanabilir olması gerekir.",
      "Yanlış belge yüklenmesi, eksik evrak gönderimi, başvurunun müşteri tarafından geciktirilmesi veya üçüncü taraf kurumların karar ve süreleri bu iade kapsamına otomatik olarak dahil edilmez.",
    ],
  },
  {
    title: "3. Süreç Nasıl İşler",
    paragraphs: [
      "Müşteri destek ekibine yazılı başvuru yaptıktan sonra ilgili sipariş ve hizmet akışı incelenir. Work365 kaynaklı açık bir kuruluş hatası tespit edilirse, hataya konu hizmet kalemi için iade veya telafi seçeneği değerlendirilir.",
      "Demo senaryosunda inceleme süresi 5 ila 10 iş günü olarak öngörülür. Gerçek sözleşme metinlerinde bu süre ayrıca tanımlanacaktır.",
    ],
  },
  {
    title: "4. Kapsam Dışında Kalan Durumlar",
    paragraphs: [
      "Kamu kurumlarının ek belge talebi, harç ve resmi ödeme değişiklikleri, müşteri beyanına dayalı yanlış bilgi girişi veya müşteri tarafından başlatılan kapsam değişiklikleri iade kapsamı dışında değerlendirilebilir.",
      "e-İmza, KEP, sanal ofis veya üçüncü taraf servislerin aktif kullanımından sonra doğan hizmet bedelleri ayrıca kendi sağlayıcı koşullarına tabi olabilir.",
    ],
  },
  {
    title: "5. İletişim",
    paragraphs: [
      "Gerçek hizmet şartları yayına alındığında bu bölümde resmi destek ve hukuk iletişim kanalları yer alacaktır.",
      "Şimdilik bu sayfa, fiyatlandırma ve garanti bandındaki yönlendirme için kullanılan örnek bir şartlar sayfasıdır.",
    ],
  },
] as const;

export default function RefundPolicyPage() {
  return (
    <ServiceTermsTemplate
      eyebrow="Hizmet Şartları"
      title="Para İade Koşulları"
      summary="Work365 hizmet akışından kaynaklanan kuruluş hatalarında uygulanabilecek örnek iade yaklaşımını burada bulabilirsiniz. Bu sayfa demo veriyle doldurulmuştur ve ileride aynı yapı diğer hizmet şartları içeriklerinde de kullanılacaktır."
      updatedAt="09 Mart 2026"
      highlights={highlights}
      sections={sections}
    />
  );
}
