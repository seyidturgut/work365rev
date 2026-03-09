export type AuthMode = "login" | "signup";

export type AuthSlide = {
  id: string;
  image: string;
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  caption: string;
};

export const authSlides: readonly AuthSlide[] = [
  {
    id: "startup-team",
    image: "/auth-startup-team.jpg",
    badge: "WORK365 KURUCU PAKETİ",
    eyebrow: "EKİPÇE BAŞLAMAK İSTEYENLERE",
    title: "Kurucu ekibinizle aynı masada, aynı akışta ve daha düzenli bir başlangıç yapın.",
    description:
      "Şirketleşme, evrak ve dijital kurulum adımlarını ekip içinde dağılmadan, tek panel mantığında ilerletin.",
    caption: "Kurucu ekip için daha toplu ve görünür bir başlangıç akışı.",
  },
  {
    id: "modern-office",
    image: "/auth-modern-office.jpg",
    badge: "WORK365 BÜYÜME PAKETİ",
    eyebrow: "OFİS DÜZENİNE YAKIŞAN AKIŞ",
    title: "Dağınık belgeler yerine daha temiz, sakin ve düzenli bir çalışma ritmi kurun.",
    description:
      "Muhasebe, başvuru ve dijital altyapı adımlarını aynı düzende toplayarak işinizi kontrollü bir zeminde başlatın.",
    caption: "Modern ekipler için daha okunabilir bir operasyon düzeni.",
  },
  {
    id: "growth-meeting",
    image: "/auth-growth-meeting.jpg",
    badge: "WORK365 EKİP PAKETİ",
    eyebrow: "BÜYÜME TOPLANTILARINA UYGUN ALTYAPI",
    title: "Ekip büyürken toplantı masasındaki kararları operasyon tarafında da karşılık bulan bir düzene taşıyın.",
    description:
      "Şirket kuruluşu, e-İmza, KEP ve ilk operasyon adımlarını büyüme hedeflerinize uygun tek bir deneyimde bir araya getirin.",
    caption: "Büyüme konuşulurken arka ofis tarafı eksik kalmasın.",
  },
] as const;

export const authRotatingMessages = [
  "Kuruluş dosyaları ve başvuru akışı tek yerde.",
  "e-İmza, KEP ve dijital kurulum hazır ritimde ilerler.",
  "Kurucu ekip için daha net operasyon, daha az sürtünme.",
  "İlk günden profesyonel bir başlangıç deneyimi kurun.",
] as const;
