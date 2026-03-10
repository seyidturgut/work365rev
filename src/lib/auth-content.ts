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
    eyebrow: "AYNI MASADA, AYNI HEDEFTE",
    title: "Kurucu ekibinizle birlikte çalışırken şirketleşme sürecini tek akışta yönetin.",
    description:
      "Laptop başındaki ekibiniz için başvuru, evrak ve dijital kurulum adımlarını tek merkezde toplayan daha düzenli bir başlangıç deneyimi.",
    caption: "Kurucu ekip için daha toplu ve koordineli bir başlangıç akışı.",
  },
  {
    id: "modern-office",
    image: "/auth-modern-office.jpg",
    badge: "WORK365 BÜYÜME PAKETİ",
    eyebrow: "MODERN OFİSE UYGUN DÜZEN",
    title: "Modern ofis düzenine yakışan temiz, sakin ve kontrollü bir operasyon zemini kurun.",
    description:
      "Muhasebe, başvuru ve dijital altyapı adımlarını tek düzende toplayarak işinizi daha derli toplu bir ofis ritmiyle başlatın.",
    caption: "Daha temiz ofis hissi, daha okunabilir operasyon akışı.",
  },
  {
    id: "growth-meeting",
    image: "/auth-growth-meeting.jpg",
    badge: "WORK365 EKİP PAKETİ",
    eyebrow: "PLANLAMA TOPLANTILARINA UYGUN ALTYAPI",
    title: "Toplantı masasındaki planları operasyon tarafında da karşılığı olan net bir düzene dönüştürün.",
    description:
      "Workshop, planlama ve ekip toplantıları yapılırken şirket kuruluşu, e-İmza ve ilk operasyon adımları da aynı netlikte ilerlesin.",
    caption: "Toplantı odasında konuşulanlar operasyon tarafında da yerini bulsun.",
  },
] as const;

export const authRotatingMessages = [
  "Kuruluş dosyaları ve başvuru akışı tek yerde.",
  "e-İmza, KEP ve dijital kurulum hazır ritimde ilerler.",
  "Kurucu ekip için daha net operasyon, daha az sürtünme.",
  "İlk günden profesyonel bir başlangıç deneyimi kurun.",
] as const;
