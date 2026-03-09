export type Category = {
  id: string;
  name: string;
  color: string;
  bgColor: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categoryId: string;
  imageUrl: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  content: string;
};

export const CATEGORIES: Category[] = [
  { id: "all", name: "Tümü", color: "#0F172A", bgColor: "#F1F5F9" },
  { id: "sirket-kurulusu", name: "Şirket Kuruluşu Rehberleri", color: "#1B98D5", bgColor: "#EEF7FF" },
  { id: "kosgeb", name: "KOSGEB Başvuru Kılavuzları", color: "#15803D", bgColor: "#EEF9F1" },
  { id: "e-donusum", name: "e-Dönüşüm Zorunlulukları", color: "#E11D48", bgColor: "#FFF1F5" },
  { id: "ekosistem", name: "Girişim Ekosistemi Haberleri", color: "#7C3AED", bgColor: "#F5F0FF" },
];

export const BLOG_POSTS: BlogPost[] = [
  // ─── Şirket Kuruluşu Rehberleri ───
  {
    id: "sirket-1",
    slug: "sahis-sirketi-kurma-rehberi-2025",
    categoryId: "sirket-kurulusu",
    title: "2025 Şahıs Şirketi Kurma Rehberi: Adım Adım Tüm Süreç",
    excerpt: "Şahıs şirketi kurmak hiç bu kadar kolay olmamıştı. Noter gerekmeden, e-Devlet ve İnteraktif Vergi Dairesi üzerinden şirket açılış adımlarını sizin için derledik.",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "12 Mar 2025",
    readTime: "5 dk okuma",
    content: `
<p>Türkiye'de şahıs şirketi kurmak, 2025 itibarıyla tamamıyla dijital bir sürece dönüşmüştür. Vergi dairesine fiziksel olarak gitmenize gerek kalmadan, İnteraktif Vergi Dairesi (İVD) üzerinden birkaç adımda mükellefiyet açabilirsiniz.</p>

<h2>Şahıs Şirketi Nedir?</h2>
<p>Şahıs şirketi (gerçek kişi işletmesi), sermaye şirketlerinden farklı olarak ayrı bir tüzel kişiliğe sahip değildir. İşletme borçlarından kişisel malvarlığınızla sorumlu olursunuz; ancak kurulumu çok daha hızlı, maliyeti ise çok daha düşüktür. Özellikle serbest meslek sahipleri, küçük esnaf ve freelancerlar için ideal yapıdır.</p>

<h2>Kimler Kurabilir?</h2>
<ul>
  <li>18 yaşını doldurmuş Türk vatandaşları veya yabancı uyruklu kişiler</li>
  <li>Kısıtlı olmayan (vesayet altında bulunmayan) gerçek kişiler</li>
  <li>Serbest meslek faaliyeti yürütmek isteyenler (doktor, avukat, mühendis vb.)</li>
</ul>

<h2>Adım Adım Kuruluş Süreci</h2>

<h3>1. Faaliyet Konusunu Belirleyin</h3>
<p>NACE kodları üzerinden ana faaliyet konunuzu seçin. Yanlış bir NACE seçimi ileride vergisel sorunlara yol açabilir. Faaliyet konunuzu net belirledikten sonra İVD'ye giriş yapabilirsiniz.</p>

<h3>2. İnteraktif Vergi Dairesi'nden Mükellefiyet Açın</h3>
<p>ivd.gib.gov.tr adresine e-Devlet şifrenizle giriş yapın. "Basit Usul veya Gerçek Usul Mükellefiyet Tesis" seçeneğini seçin. Adres bilgilerinizi ve faaliyet konunuzu girin. Başvurunuz genellikle 1–2 iş günü içinde onaylanır.</p>

<h3>3. e-İmza veya Mali Mühür Temin Edin</h3>
<p>Fatura düzenleyebilmek için e-İmza (bireysel) veya Mali Mühür (kurumsal) almanız gerekir. e-İmza başvurusunu PTT, E-Güven gibi yetkili hizmet sağlayıcılarından gerçekleştirebilirsiniz.</p>

<h3>4. KEP Hesabı Açın</h3>
<p>Kayıtlı Elektronik Posta (KEP) hesabı, resmi tebligatları dijital ortamda almanızı sağlar. PTT Posta ve Tnb.com.tr gibi sağlayıcılardan açabilirsiniz.</p>

<h3>5. e-Dönüşüm Sürecini Tamamlayın</h3>
<p>Cironuza ve sektörünüze bağlı olarak e-Fatura, e-Arşiv Fatura veya e-Serbest Meslek Makbuzu uygulamalarına dahil olmanız gerekebilir. Work365 üzerinden bu sürecin tamamını tek ekranda yönetebilirsiniz.</p>

<h2>Maliyetler (2025)</h2>
<ul>
  <li><strong>Mükellefiyet açılışı:</strong> Ücretsiz (GİB – İVD üzerinden)</li>
  <li><strong>e-İmza:</strong> Yıllık ~800–1.200 TL</li>
  <li><strong>KEP hesabı:</strong> Yıllık ~500–900 TL</li>
  <li><strong>Defter tasdiki (basit usulde):</strong> Yıllık ~400–600 TL</li>
</ul>

<h2>Sonuç</h2>
<p>Şahıs şirketi kurmak artık birkaç saat içinde tamamlayabileceğiniz bir süreçtir. Mükellefiyet açılışından e-Dönüşüm altyapısının kurulmasına kadar tüm adımları Work365 paneli üzerinden tek noktadan yönetebilirsiniz.</p>
    `,
  },
  {
    id: "sirket-2",
    slug: "limited-mi-anonim-mi-sirket-turu-secimi",
    categoryId: "sirket-kurulusu",
    title: "Limited mi, Anonim mi? Şirket Türü Seçiminde Dikkat Edilmesi Gerekenler",
    excerpt: "Girişiminiz için en doğru şirket türü hangisi? Vergi avantajları, ortaklık yapısı ve kurulum maliyetleri açısından Limited ve Anonim şirketleri karşılaştırdık.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "05 Mar 2025",
    readTime: "8 dk okuma",
    content: `
<p>Girişiminizi bir sermaye şirketi çatısı altında kurmaya karar verdiniz. Peki Limited Şirket (Ltd. Şti.) mi yoksa Anonim Şirket (A.Ş.) mi kurmalısınız? İki yapı arasındaki farkları doğru anlamak, hem vergisel hem de operasyonel açıdan kritik önem taşır.</p>

<h2>Temel Farklar: Hızlı Karşılaştırma</h2>

<h3>Minimum Sermaye</h3>
<ul>
  <li><strong>Limited Şirket:</strong> 10.000 TL (2024 itibarıyla; kısmen bloke edilmiş)</li>
  <li><strong>Anonim Şirket:</strong> 250.000 TL (halka açık olmayan için; kısmen bloke edilmiş)</li>
</ul>

<h3>Ortak Sayısı</h3>
<ul>
  <li><strong>Limited Şirket:</strong> 1–50 ortak</li>
  <li><strong>Anonim Şirket:</strong> En az 1 ortak (tek kişilik A.Ş. mümkün)</li>
</ul>

<h3>Pay Devri</h3>
<ul>
  <li><strong>Limited Şirket:</strong> Pay devri noter onayı gerektirir, diğer ortakların önalım hakkı vardır</li>
  <li><strong>Anonim Şirket:</strong> Hisse senedi ile çok daha kolay devir imkânı; yatırımcı çekmek için tercih edilen yapı</li>
</ul>

<h2>Vergisel Açıdan Fark Var mı?</h2>
<p>Her iki şirket türünde de kurumlar vergisi oranı aynıdır (%25, 2024 ve 2025). Temel vergi farkı, kâr dağıtımında ortaya çıkmaktadır.</p>
<ul>
  <li>Limited Şirket ortakları için kâr payı stopajı uygulanır (%15).</li>
  <li>Anonim Şirketlerde de aynı oran geçerlidir ancak hisse senedi çıkarılmış olması durumunda bazı istisnalar mevcuttur.</li>
</ul>

<h2>Kuruluş Maliyetleri (2025 Tahmini)</h2>
<ul>
  <li><strong>Limited Şirket:</strong> 8.000–15.000 TL (noter + ticaret sicil harcı + müşavir ücreti)</li>
  <li><strong>Anonim Şirket:</strong> 15.000–30.000 TL (ayrıca yönetim kurulu yapılanması gereklilikleri)</li>
</ul>

<h2>Hangi Durumda Hangisi Tercih Edilmeli?</h2>

<h3>Limited Şirket için:</h3>
<ul>
  <li>Az ortaklı, aile veya ekip şirketi kurmak istiyorsanız</li>
  <li>Kurulum maliyetini düşük tutmak istiyorsanız</li>
  <li>Kısa vadede hisse devri veya yatırımcı planınız yoksa</li>
</ul>

<h3>Anonim Şirket için:</h3>
<ul>
  <li>Melek yatırımcı veya VC fonu almayı planlıyorsanız</li>
  <li>Halka arz ya da büyük ölçekli büyüme hedefliyorsanız</li>
  <li>Hisse senedi çıkararak çalışanlara opsiyon planı (ESOP) sunmak istiyorsanız</li>
</ul>

<h2>Work365 ile Kurulum</h2>
<p>Work365 üzerinden hem Limited hem Anonim Şirket kuruluşlarını tek panel üzerinden yönetebilirsiniz. Başlangıç paketinize e-İmza, KEP ve sanal ofis hizmetleri dahil gelir; müşavir koordinasyonu bizden.</p>
    `,
  },
  {
    id: "sirket-3",
    slug: "genc-girisimci-istisnasi-2025",
    categoryId: "sirket-kurulusu",
    title: "Genç Girişimci İstisnası (2025): Şartlar ve Avantajlar Nelerdir?",
    excerpt: "29 yaş altı girişimcilere sağlanan vergi muafiyeti ve 1 yıllık Bağ-Kur prim desteğinden nasıl faydalanabilirsiniz? Güncel başvuru şartları.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "28 Şub 2025",
    readTime: "4 dk okuma",
    content: `
<p>Genç Girişimci İstisnası, Türkiye'de 29 yaşını doldurmamış bireyler için önemli bir vergi ve sigorta avantajı sunmaktadır. 193 sayılı Gelir Vergisi Kanunu'nun mükerrer 20. maddesi kapsamında düzenlenen bu istisna, genç girişimcilerin ilk yıllarındaki mali yükünü önemli ölçüde azaltmaktadır.</p>

<h2>İstisna Kapsamındaki Avantajlar</h2>

<h3>1. Gelir Vergisi İstisnası</h3>
<p>İlk iş yeri açılışında, ticari, zirai veya mesleki faaliyetlerden elde edilen kazançlar 3 vergilendirme dönemi boyunca gelir vergisinden muaf tutulur. 2025 yılı için bu istisna tutarı <strong>230.000 TL</strong> olarak belirlenmiştir (her yıl güncellenir).</p>

<h3>2. Bağ-Kur Prim Desteği</h3>
<p>Faaliyetin başladığı tarihten itibaren 1 yıl süreyle ödenmesi gereken Bağ-Kur (Bağımsız Çalışanlar Sigorta) primleri devlet tarafından karşılanır. 2025 için aylık Bağ-Kur priminin tamamı (asgari prim üzerinden) Hazine'den sağlanır.</p>

<h2>Başvuru Şartları</h2>
<ul>
  <li>İlk defa mükellefiyet tesis edilmesi (daha önce şirket kurulmamış olması)</li>
  <li>İşe başlama tarihinde 29 yaşını doldurmamış olmak (yani 18–28 yaş arası)</li>
  <li>Kendi işyerinde bizzat çalışmak</li>
  <li>Basit usul veya gerçek usul vergilendirmeye tabi olmak</li>
</ul>

<h2>Başvuru Nasıl Yapılır?</h2>
<p>Mükellefiyet açılışı sırasında vergi dairesine beyan etmeniz yeterlidir. Ek bir başvuru formu doldurmanıza gerek yoktur; yaş şartını karşıladığınızı belgelemek için nüfus cüzdanı göstermeniz yeterli olacaktır.</p>

<h2>Dikkat Edilmesi Gereken Noktalar</h2>
<ul>
  <li>İstisna süresi boyunca başka bir faaliyetten kazanç elde edilmemeli</li>
  <li>Ortaklı şirket kurulması halinde bazı kısıtlamalar söz konusu olabilir</li>
  <li>İstisna yalnızca gerçek kişi (şahıs) işletmeleri için geçerlidir; Limited veya A.Ş. için uygulanmaz</li>
</ul>

<h2>Örnek Hesaplama</h2>
<p>27 yaşında bir serbest yazılım danışmanı yıllık 400.000 TL kazanıyorsa: İstisna tutarı 230.000 TL olduğundan, yalnızca kalan 170.000 TL için gelir vergisi öder. Bu durum yıllık ortalama <strong>40.000–60.000 TL</strong> vergi tasarrufu anlamına gelebilir (dilimlere bağlı olarak).</p>

<p>Work365 ile mükellefiyet açılışınızı gerçekleştirirken bu istisnadan otomatik olarak yararlanmanız için danışmanlarımız süreci sizin adınıza yönetir.</p>
    `,
  },

  // ─── KOSGEB Başvuru Kılavuzları ───
  {
    id: "kosgeb-1",
    slug: "kosgeb-ileri-girisimci-destek-programi",
    categoryId: "kosgeb",
    title: "KOSGEB İleri Girişimci Destek Programı: Nasıl Başvurulur?",
    excerpt: "İmalat ve bilişim sektörlerinde iş kuracaklara KOSGEB'in sağladığı 1 milyon TL'ye varan destek paketinin detayları, iş planı hazırlama tüyoları ve süreç akışı.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "10 Mar 2025",
    readTime: "7 dk okuma",
    content: `
<p>KOSGEB İleri Girişimci Destek Programı, imalat, teknoloji ve bilişim alanlarında yenilikçi iş fikirleri geliştiren girişimcilere yönelik kapsamlı bir hibe ve geri ödemesiz destek mekanizmasıdır. 2025 yılı itibarıyla destek üst limiti <strong>1.000.000 TL</strong>'ye yükseltilmiştir.</p>

<h2>Program Kapsamı</h2>
<ul>
  <li>İşletme giderleri desteği (kira, personel, enerji)</li>
  <li>Makine–teçhizat alımı desteği</li>
  <li>Yazılım ve lisans giderleri desteği</li>
  <li>Danışmanlık ve eğitim giderleri desteği</li>
</ul>

<h2>Kimler Başvurabilir?</h2>
<ul>
  <li>Son 1 yıl içinde kurulan veya kuruluş aşamasındaki işletmeler</li>
  <li>İmalat, bilişim, teknoloji veya yenilikçi hizmet sektörlerinde faaliyet gösterenler</li>
  <li>KOSGEB veri tabanına kayıtlı KOBİ'ler</li>
  <li>Girişimcilik eğitimi sertifikasına sahip kişiler (KOSGEB veya akredite kurumlardan)</li>
</ul>

<h2>Başvuru Süreci</h2>

<h3>Adım 1: Girişimcilik Eğitimi</h3>
<p>KOSGEB'in yüz yüze veya çevrimiçi girişimcilik eğitimini tamamlayın. Eğitim süresi yaklaşık 70 saattir ve ücretsizdir.</p>

<h3>Adım 2: İş Planı Hazırlama</h3>
<p>İş planınız değerlendirmenin temel kriteridir. Pazar analizi, finansal projeksiyon ve rekabet analizi bölümlerinin güçlü hazırlanması kabul oranını belirler.</p>

<h3>Adım 3: KOSGEB Sistemi Üzerinden Başvuru</h3>
<p>edevlet.kosgeb.gov.tr üzerinden sisteme giriş yapın, gerekli belgeleri (iş planı, kuruluş evrakları, banka hesap bilgileri) yükleyin ve başvurunuzu tamamlayın.</p>

<h3>Adım 4: Değerlendirme Kurulu</h3>
<p>Başvurunuz bölgesel KOSGEB birimi tarafından değerlendirilir. Sunum yapmanız istenebilir. Onay süresi ortalama 4–8 haftadır.</p>

<h2>Destek Miktarları (2025)</h2>
<ul>
  <li>İşletme giderleri: Ayda en fazla 50.000 TL, toplam 12 ay</li>
  <li>Makine–teçhizat: %75 hibe oranıyla en fazla 300.000 TL</li>
  <li>Yazılım: %75 hibe oranıyla en fazla 100.000 TL</li>
  <li>Danışmanlık: %75 hibe oranıyla en fazla 50.000 TL</li>
</ul>

<h2>İpuçları: Kabul Oranını Artırmak İçin</h2>
<ul>
  <li>Pazar büyüklüğünü somut verilerle destekleyin (TÜİK, sektörel raporlar)</li>
  <li>Finansal projeksiyonlarınızın gerçekçi ve belgelenebilir olduğundan emin olun</li>
  <li>Yenilikçi unsurları (Ar-Ge, teknoloji, ihracat potansiyeli) ön plana çıkarın</li>
  <li>Ekip yetkinliklerini özgeçmişlerle destekleyin</li>
</ul>
    `,
  },
  {
    id: "kosgeb-2",
    slug: "kosgeb-is-plani-nasil-yazilir",
    categoryId: "kosgeb",
    title: "KOSGEB İş Planı (Business Plan) Nasıl Yazılır? Örnek Şablonlar",
    excerpt: "Kurula sunacağınız iş planının kabul alma oranını artırmak için dikkat etmeniz gereken finansal tahminler ve pazar analizi yöntemleri.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "01 Mar 2025",
    readTime: "6 dk okuma",
    content: `
<p>KOSGEB başvurularında iş planı, değerlendirmenin %60–70'ini belirleyen en kritik belgedir. İyi bir iş planı; değerlendirmeciye işinizin viabilite'sini, pazarın gerçekliğini ve ekibinizin yetkinliğini net biçimde aktarmalıdır.</p>

<h2>İş Planının Bölümleri</h2>

<h3>1. Yönetici Özeti (Executive Summary)</h3>
<p>Tüm planı en fazla 1 sayfada özetleyin. Değerlendirmeciler genellikle bu bölümü ilk okur. İş fikrinizi, hedef pazarı, gelir modelini ve talep ettiğiniz destek miktarını net biçimde belirtin.</p>

<h3>2. İşletme Tanımı</h3>
<p>Ürün veya hizmetinizi, sektörünüzü ve rekabet avantajınızı açıklayın. "Neden bu iş? Neden şimdi? Neden siz?" sorularını yanıtlayın.</p>

<h3>3. Pazar Analizi</h3>
<p>Bu bölüm genellikle en zayıf kalan kısımdır. Güçlü bir pazar analizi için:</p>
<ul>
  <li>Toplam Adreslenebilir Pazar (TAM) büyüklüğünü TÜİK, sektör birlikleri veya uluslararası raporlarla destekleyin</li>
  <li>Hedef müşteri profilinizi (persona) tanımlayın</li>
  <li>Rakip analizi yapın; fiyat, ürün ve dağıtım kanalı karşılaştırması ekleyin</li>
</ul>

<h3>4. Pazarlama ve Satış Stratejisi</h3>
<p>Müşteriye nasıl ulaşacaksınız? Hangi kanallar (dijital, sahа, distribütör)? İlk 12 ay için somut müşteri kazanım planı oluşturun.</p>

<h3>5. Operasyon Planı</h3>
<p>Üretim süreci, tedarik zinciri, lokasyon ve kapasiteyi açıklayın. KOSGEB ekipman desteği talep edecekseniz makine teknik özelliklerini ve fiyat tekliflerini (en az 2 farklı tedarikçiden) ekleyin.</p>

<h3>6. Yönetim ve Organizasyon</h3>
<p>Kurucu ekibin özgeçmişini, sektördeki deneyimini ve tamamlayıcı yetkinliklerini açıklayın. Yalnız çalışıyorsanız danışman veya mentor ilişkilerinizden bahsedin.</p>

<h3>7. Finansal Projeksiyonlar (3 Yıl)</h3>
<p>Bu bölüm sayısal olmalıdır:</p>
<ul>
  <li>Gelir projeksiyonu (aylık, 3 yıl)</li>
  <li>Gider tablosu (sabit + değişken)</li>
  <li>Kâr–Zarar tahmini</li>
  <li>Nakit akış tablosu</li>
  <li>Başa baş noktası (break-even) analizi</li>
</ul>

<h2>Sık Yapılan Hatalar</h2>
<ul>
  <li>Pazar büyüklüğünü kaynak göstermeden belirtmek</li>
  <li>Finansal projeksiyonlarda aşırı iyimser olmak (%300 büyüme gibi)</li>
  <li>Rekabet analizini atlamak veya "rakibimiz yok" demek</li>
  <li>İş planını standart bir şablonla doldurmak, özelleştirmemek</li>
</ul>

<h2>Hazır Şablon</h2>
<p>KOSGEB'in resmi sitesinde (kosgeb.gov.tr) program türüne göre iş planı şablonları mevcuttur. Work365 danışmanlık paketi kapsamında iş planı hazırlamanıza destek olunmaktadır.</p>
    `,
  },
  {
    id: "kosgeb-3",
    slug: "kosgeb-kadin-girisimci-destegi-2025",
    categoryId: "kosgeb",
    title: "KOSGEB Kadın Girişimci Desteği 2025 Neler Getiriyor?",
    excerpt: "Pozitif ayrımcılık uygulanan KOSGEB Kadın Girişimci desteğindeki güncel oranlar, ekstra sağlanan puanlar ve başvuru ekranı rehberi.",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "20 Şub 2025",
    readTime: "5 dk okuma",
    content: `
<p>KOSGEB, kadın girişimcilere yönelik pozitif ayrımcılık kapsamında çeşitli avantajlar sunmaktadır. 2025 yılı itibarıyla kadın girişimciler, hem daha yüksek hibe oranlarından hem de değerlendirme puanı avantajından yararlanabilmektedir.</p>

<h2>Kadın Girişimcilere Özel Avantajlar</h2>

<h3>Yükseltilmiş Hibe Oranı</h3>
<p>Standart programlarda %60–70 olan geri ödemesiz destek oranı, kadın girişimciler için <strong>%80'e</strong> yükselebilmektedir. Bu oran programa ve proje türüne göre değişiklik göstermektedir.</p>

<h3>Değerlendirme Puanı Avantajı</h3>
<p>KOSGEB değerlendirme formunda kadın girişimci olduğunuzun beyan edilmesi halinde puanınıza ekstra katkı sağlanmaktadır. Bu avantaj özellikle rekabetçi programlarda belirleyici olabilmektedir.</p>

<h3>Öncelikli İnceleme</h3>
<p>Bazı dönemlerde kadın girişimcilere ait başvurular bölgesel ofisler tarafından öncelikli olarak incelenmektedir.</p>

<h2>Hangi Programlara Başvurabilirsiniz?</h2>
<ul>
  <li><strong>Temel Girişimcilik Destek Programı:</strong> Yeni iş kuracak kadın girişimciler için giriş noktası</li>
  <li><strong>İleri Girişimcilik Destek Programı:</strong> Teknoloji odaklı iş fikirleri için</li>
  <li><strong>KOBİ Geliştirme Destek Programı (KOSGEB-GEP):</strong> Mevcut işletmesi olan kadın KOBİ sahipleri için</li>
  <li><strong>Ar-Ge, İnovasyon ve Endüstriyel Uygulama Destek Programı:</strong> Ürün geliştirme odaklı projeler</li>
</ul>

<h2>Başvuru Süreci (Adım Adım)</h2>
<ol>
  <li>KOSGEB veri tabanına kaydolun (kosgeb.gov.tr)</li>
  <li>Girişimcilik eğitimini tamamlayın (online veya yüz yüze)</li>
  <li>İlgili programın duyurusunu takip edin (kosgeb.gov.tr/duyurular)</li>
  <li>İş planınızı hazırlayın (kadın girişimci statüsünü ve avantajlarını belirtin)</li>
  <li>Sisteme başvurun ve belgeleri yükleyin</li>
</ol>

<h2>Sıkça Sorulan Sorular</h2>

<h3>Eğitim sertifikam başka kurumdan alınmış. Geçerli mi?</h3>
<p>KOSGEB tarafından yetkilendirilmiş kuruluşlardan (üniversiteler, meslek odaları) alınan sertifikalar da kabul edilmektedir. Listesi KOSGEB'in resmi sitesinde yayınlanmaktadır.</p>

<h3>Ortaklı şirket kurarsam kadın girişimci avantajından yararlanabilir miyim?</h3>
<p>Şirkette %50 ve üzeri hisse oranına sahip kadın ortak veya yönetici olunması halinde avantajdan yararlanmak mümkündür (programa göre farklılık gösterebilir).</p>
    `,
  },

  // ─── e-Dönüşüm Zorunlulukları ───
  {
    id: "edonusum-1",
    slug: "e-fatura-e-arsiv-gecis-zorunlulugu-2025",
    categoryId: "e-donusum",
    title: "2025 e-Fatura ve e-Arşiv Geçiş Zorunluluğu: Limitler Neler?",
    excerpt: "GİB tarafından güncellenen e-Fatura geçiş limitleri kimleri kapsıyor? Hangi sektörlerde ciro sınırı aranmaksızın e-Faturaya geçiş zorunlu?",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "08 Mar 2025",
    readTime: "4 dk okuma",
    content: `
<p>Gelir İdaresi Başkanlığı (GİB), e-Fatura ve e-Arşiv Fatura zorunluluklarını her yıl güncellenmekte ve kapsama alınan mükellef sayısını genişletmektedir. 2025 yılı itibarıyla geçerli limitler ve sektörel düzenlemeler aşağıda özetlenmiştir.</p>

<h2>e-Fatura Zorunluluğu: 2025 Brüt Ciro Limiti</h2>
<p>2023 hesap dönemine ait brüt satış hasılatı (veya gayri safi iş hasılatı) <strong>3.000.000 TL ve üzeri</strong> olan mükellefler 1 Temmuz 2024 itibarıyla e-Fatura'ya geçmek zorundaydı. 2025 yılı için bu sınır GİB tarafından netleştirilecek; her yıl Ocak ayında güncellenen Tebliğ'i takip etmeniz önerilir.</p>

<h2>Ciro Sınırı Aranmaksızın e-Fatura Zorunluluğu Olan Sektörler</h2>
<ul>
  <li>Özel hastaneler ve muayenehaneler</li>
  <li>Kuyumcular ve kıymetli taş satıcıları</li>
  <li>e-Ticaret siteleri (elektronik ticaret aracı hizmet sağlayıcıları)</li>
  <li>Demir çelik ürünleri üretici ve ithalatçıları</li>
  <li>Gübre üreticileri ve distribütörleri</li>
  <li>Akaryakıt istasyonları</li>
</ul>

<h2>e-Arşiv Fatura Nedir, Farkı Ne?</h2>
<p>e-Fatura, GİB sistemi üzerinden alıcıya iletilen ve alıcının da e-Fatura mükellefi olduğu durumlarda kullanılan belgedir. e-Arşiv Fatura ise e-Fatura mükellefi olmayan alıcılara (son tüketici veya e-Fatura dışı mükellef) elektronik ortamda düzenlenen belgedir.</p>
<p>e-Arşiv Fatura zorunluluğu için tek bir fatura bazında <strong>5.000 TL</strong> üzeri B2C (son tüketiciye) faturaların e-Arşiv olarak düzenlenmesi gerekmektedir.</p>

<h2>Geçiş Süreci</h2>
<ol>
  <li>GİB Portal'ına (portal.efatura.gov.tr) başvurun</li>
  <li>Mali mühür temin edin (TÜBİTAK-BİLGEM'den)</li>
  <li>e-Fatura entegratörü seçin veya GİB Portal'ı kullanın</li>
  <li>Test sürecini tamamlayın</li>
  <li>Gerçek fatura kesimine geçin</li>
</ol>

<h2>Cezalar</h2>
<p>e-Fatura veya e-Arşiv Fatura zorunluluğuna uymayanlara, her belge için Vergi Usul Kanunu'nun 353. maddesi kapsamında <strong>özel usulsüzlük cezası</strong> uygulanmaktadır. 2025 yılı için fatura başına ceza alt sınırı 6.900 TL'dir.</p>
    `,
  },
  {
    id: "edonusum-2",
    slug: "e-irsaliye-nedir-kimler-kullanmali",
    categoryId: "e-donusum",
    title: "e-İrsaliye Nedir? Kimler e-İrsaliye Kullanmak Zorunda?",
    excerpt: "Lojistik süreçlerin dijitalleşmesiyle gelen e-İrsaliye uygulamasının kapsamı, cezai yaptırımlar ve entegrasyon süreçleri.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "24 Şub 2025",
    readTime: "6 dk okuma",
    content: `
<p>e-İrsaliye, malların taşınması sırasında düzenlenmesi gereken irsaliyenin (sevk irsaliyesinin) elektronik ortamda oluşturulması ve GİB sistemine iletilmesi uygulamasıdır. Fiziksel irsaliyenin yerini alan bu dijital belge, araç üzerinde taşınması gereken kâğıt belge zorunluluğunu ortadan kaldırmaktadır.</p>

<h2>e-İrsaliye Kullanma Zorunluluğu</h2>
<p>Aşağıdaki mükellefler e-İrsaliye uygulamasına dahil olmak zorundadır:</p>
<ul>
  <li>e-Fatura uygulamasına kayıtlı olan mükellefler</li>
  <li>Özel entegratör aracılığıyla ya da GİB Portal'ı üzerinden e-Fatura düzenleyenler</li>
  <li>Mal taşıması yapan tüm e-Fatura mükellefleri</li>
</ul>

<h2>e-İrsaliye Nasıl Düzenlenir?</h2>

<h3>GİB Portal Üzerinden</h3>
<p>portal.einvoice.gov.tr adresine giriş yaparak e-İrsaliye modülünden manuel oluşturabilirsiniz. Küçük hacimli işlemler için uygundur.</p>

<h3>Özel Entegratör veya ERP Entegrasyonu</h3>
<p>Yüksek hacimli lojistik operasyonları için ERP (SAP, Logo, Mikro vb.) veya e-Dönüşüm entegratörü üzerinden otomatik e-İrsaliye oluşturulması tercih edilmektedir.</p>

<h2>e-İrsaliyede Bulunması Gereken Bilgiler</h2>
<ul>
  <li>Gönderici ve alıcı bilgileri (VKN/TCKN, adres)</li>
  <li>Malın cinsi, miktarı ve birimi</li>
  <li>Taşıma aracı plakası ve sürücü bilgisi</li>
  <li>İrsaliye tarihi ve numarası</li>
  <li>GİB'den alınan UUID kodu</li>
</ul>

<h2>Denetim Süreci</h2>
<p>Yol denetimlerinde güvenlik güçleri, taşınan malın e-İrsaliye'ye uygunluğunu GİB sistemi üzerinden anlık sorgulayabilmektedir. Kâğıt irsaliye ibrazı artık kabul edilmemektedir.</p>

<h2>Ceza Uygulamaları</h2>
<p>e-İrsaliye düzenlemeksizin mal taşıyanlar için Vergi Usul Kanunu'nun 353. maddesi uyarınca özel usulsüzlük cezası uygulanmaktadır. 2025 yılı için bu ceza alt sınırı <strong>6.900 TL</strong>'dir ve belge başına hesaplanmaktadır.</p>

<h2>Sık Sorulan Sorular</h2>

<h3>e-İrsaliye ile e-Fatura aynı şey mi?</h3>
<p>Hayır. e-Fatura bir satış belgesidir; e-İrsaliye ise malın fiziksel taşınmasını belgelemektedir. Satış olmaksızın da (örneğin depo transferleri için) e-İrsaliye düzenlenebilir.</p>

<h3>İade durumunda ne olur?</h3>
<p>İade malları için de e-İrsaliye düzenlenmesi gerekmektedir. Bu durumda belge türü "İade İrsaliyesi" olarak seçilmelidir.</p>
    `,
  },
  {
    id: "edonusum-3",
    slug: "e-defter-mukellefi-olmanin-sartlari",
    categoryId: "e-donusum",
    title: "e-Defter Mükellefi Olmanın Şartları ve Avantajları",
    excerpt: "Fiziki defter tutma ve noter tasdik masraflarının ortadan kalktığı e-Defter sistemine geçiş süreci, GİB berat yükleme kuralları.",
    imageUrl: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "15 Şub 2025",
    readTime: "5 dk okuma",
    content: `
<p>e-Defter, yevmiye defteri ve büyük defterin elektronik ortamda tutulması esasına dayanan sistemdir. e-Fatura mükellefiyet zorunluluğu kapsamına girenler aynı zamanda e-Defter'e de geçmek zorundadır.</p>

<h2>e-Defter Zorunluluğu Kimleri Kapsar?</h2>
<ul>
  <li>e-Fatura uygulamasına dahil olan tüm mükellefler</li>
  <li>Bağımsız denetçi kuruluşları (6362 sayılı Kanun kapsamında)</li>
  <li>İsteğe bağlı olarak e-Defter'e geçmek isteyen herhangi bir mükellef</li>
</ul>

<h2>e-Defter Avantajları</h2>

<h3>Maliyet Tasarrufu</h3>
<ul>
  <li>Fiziki defter bastırma ve ciltleme masrafı ortadan kalkar</li>
  <li>Yılda 2 kez yapılan noter tasdik ücretleri (kapanış tasdiki dahil) artık gerekmez</li>
  <li>Depolama ve arşivleme maliyeti azalır</li>
</ul>

<h3>Operasyonel Kolaylık</h3>
<ul>
  <li>Muhasebe yazılımı üzerinden doğrudan oluşturulur</li>
  <li>Vergi incelemelerinde elektronik ortamda ibraz edilir, kâğıt basma zorunluluğu yoktur</li>
  <li>Birden fazla lokasyonda erişim imkânı</li>
</ul>

<h2>e-Defter Oluşturma Süreci</h2>

<h3>1. Mali Mühür Temin Edin</h3>
<p>e-Defter imzalamak için tüzel kişi mali mührü (TÜBİTAK-BİLGEM tarafından sağlanan) zorunludur. Gerçek kişi mükellefler nitelikli elektronik imza (e-İmza) kullanabilir.</p>

<h3>2. e-Defter Yazılımı Seçin</h3>
<p>GİB'in onaylı yazılım listesinden uyumlu bir muhasebe/e-Defter programı seçin. Popüler seçenekler arasında Logo Tiger, Mikro, Luca ve Deka sayılabilir.</p>

<h3>3. Berat Oluşturma ve Yükleme</h3>
<p>Her dönem sonunda (aylık veya geçici vergi dönemlerine göre) defter verileri XML formatında imzalanır ve GİB sistemine yüklenir. GİB, beratı onaylayarak size zincirlenmiş bir berat dosyası geri gönderir.</p>

<h2>Berat Yükleme Tarihleri (2025)</h2>
<ul>
  <li>Ocak–Mart dönemi: En geç Nisan ayı sonuna kadar</li>
  <li>Nisan–Haziran dönemi: En geç Temmuz ayı sonuna kadar</li>
  <li>Temmuz–Eylül dönemi: En geç Ekim ayı sonuna kadar</li>
  <li>Ekim–Aralık dönemi: En geç Nisan ayı sonuna kadar (yıllık)</li>
</ul>

<h2>Ceza Uygulamaları</h2>
<p>e-Defter beratını süresi içinde yüklemeyen mühasebeler her ay için ayrı usulsüzlük cezasına muhatap olabilir. Gecikmeli yüklemenin tespiti halinde ceza uygulanır.</p>
    `,
  },

  // ─── Girişim Ekosistemi Haberleri ───
  {
    id: "ekosistem-1",
    slug: "turkiye-startup-yatirim-raporu-2025-q1",
    categoryId: "ekosistem",
    title: "2025 Q1 Türkiye Startup Yatırım Raporu: Bilişim Liderliği Koruyor",
    excerpt: "İlk çeyrekte Türkiye girişim ekosisteminde gerçekleşen yatırım turları, tohum yatırımlar ve en çok fon çeken sektörlerin detaylı analizi.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "11 Mar 2025",
    readTime: "6 dk okuma",
    content: `
<p>2025 yılının ilk çeyreğinde Türkiye girişim ekosistemindeki yatırım aktivitesi, 2024'ün aynı dönemine kıyasla yüzde 18 artışla kapandı. Toplam 47 yatırım turu gerçekleşti; bunların 29'u tohum (seed) aşamasındaydı.</p>

<h2>Öne Çıkan Sektörler</h2>

<h3>1. Yapay Zeka ve Makine Öğrenimi (%28)</h3>
<p>En fazla fon çeken sektör olmaya devam etti. Özellikle kurumsal yapay zeka çözümleri, görüntü işleme ve doğal dil işleme alanındaki girişimler yatırımcı ilgisini yoğunlaştırdı.</p>

<h3>2. Fintech (%21)</h3>
<p>Açık bankacılık altyapısı, BNPL (şimdi al sonra öde) ve KOBİ finansmanı odaklı girişimler öne çıktı. Merkez Bankası'nın açık bankacılık düzenlemeleri bu alanda yeni fırsatlar yarattı.</p>

<h3>3. SaaS ve İş Yazılımları (%18)</h3>
<p>KOBİ'lere yönelik muhasebe, İK ve operasyon yazılımları özellikle Series A aşamasında güçlü yatırım aldı.</p>

<h3>4. Sağlık Teknolojileri (%14)</h3>
<p>Dijital sağlık platformları ve uzaktan hasta takip sistemleri bu çeyrekte dikkat çekti.</p>

<h2>Tohum Yatırım Ekosistemi</h2>
<p>29 tohum yatırımının ortanca büyüklüğü <strong>750.000 USD</strong> olarak gerçekleşti. En aktif tohum yatırımcıları arasında 212, Revo Capital (erken aşama kolu) ve RisingStars VC yer aldı.</p>

<h2>Coğrafi Dağılım</h2>
<ul>
  <li>İstanbul: %74 (girişim sayısı bazında)</li>
  <li>Ankara: %12</li>
  <li>İzmir: %7</li>
  <li>Diğer: %7</li>
</ul>

<h2>Çıkışlar (Exit)</h2>
<p>Q1'de 3 önemli çıkış gerçekleşti: Bir e-ticaret lojistik şirketinin küresel oyuncuya satışı ve iki stratejik birleşme öne çıkan işlemler oldu.</p>

<h2>Öngörüler: Q2 2025</h2>
<p>Yurt içi LP (limited partner) tabanının genişlemesi ve Körfez bölgesi fonlarının Türkiye odağını artırmasıyla birlikte Q2'nin de güçlü geçmesi beklenmektedir. Özellikle yapay zeka altyapısı ve savunma teknolojileri bu çeyrekte öne çıkabilir.</p>
    `,
  },
  {
    id: "ekosistem-2",
    slug: "tubitak-bigg-2025-cagrisi",
    categoryId: "ekosistem",
    title: "TÜBİTAK BİGG 2025 Çağrısı Açıldı: 2 Milyon TL Hibe",
    excerpt: "Teknoloji odaklı iş fikirlerini ticarileştirmek isteyen girişimciler için TÜBİTAK BİGG (1512) programı yeni dönem çağrı detayları yayınlandı.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "04 Mar 2025",
    readTime: "3 dk okuma",
    content: `
<p>TÜBİTAK Bireysel Genç Girişimci (BİGG – 1512) Programı, 2025 yılının ilk çağrısını açıkladı. Bu dönemde seçilecek girişimcilere kuluçka desteği dahil toplam <strong>2.000.000 TL'ye</strong> kadar hibe sağlanacak.</p>

<h2>BİGG Programı Nedir?</h2>
<p>TÜBİTAK 1512 BİGG, teknoloji tabanlı iş fikirlerini ticari ürüne veya hizmete dönüştürmek isteyen bireysel girişimcileri desteklemek amacıyla 2009'dan bu yana yürütülen köklü bir hibe programıdır.</p>

<h2>2025 Çağrısı: Temel Detaylar</h2>
<ul>
  <li><strong>Başvuru başlangıcı:</strong> 3 Şubat 2025</li>
  <li><strong>Son başvuru tarihi:</strong> 14 Nisan 2025 (17:00)</li>
  <li><strong>Hibe miktarı:</strong> Aşama 1'de 500.000 TL, Aşama 2'de 1.500.000 TL</li>
  <li><strong>Destek süresi:</strong> Aşama 1: 6 ay, Aşama 2: 18 ay</li>
</ul>

<h2>Kimler Başvurabilir?</h2>
<ul>
  <li>Üniversite öğrencileri veya mezunları (son 10 yıl içinde mezun olanlar)</li>
  <li>Araştırmacı veya akademisyenler</li>
  <li>Teknoloji tabanlı bir iş fikrine sahip bireyler</li>
</ul>
<p><strong>Not:</strong> Başvuru bireysel yapılmaktadır; ancak proje ekibi oluşturulabilir.</p>

<h2>Desteklenen Alanlar</h2>
<ul>
  <li>Yapay zeka ve veri bilimi</li>
  <li>Biyoteknoloji ve sağlık teknolojileri</li>
  <li>Tarım teknolojileri (AgriTech)</li>
  <li>Savunma teknolojileri</li>
  <li>Temiz enerji ve çevre teknolojileri</li>
  <li>Endüstriyel otomasyon ve robotik</li>
</ul>

<h2>Başvuru Süreci</h2>
<ol>
  <li>e-Bideb sistemine (ebideb.tubitak.gov.tr) kayıt olun</li>
  <li>Proje başvuru formunu doldurun (iş fikri, pazar analizi, teknolojik yenilik düzeyi)</li>
  <li>Hakem değerlendirmesinden geçin</li>
  <li>Seçilenlere sözlü sunum daveti gönderilir</li>
  <li>Kazananlar belirlenerek kuluçka merkeziyle eşleştirilir</li>
</ol>

<h2>İpuçları</h2>
<ul>
  <li>Projenizin teknolojik yenilik boyutunu öne çıkarın; salt yazılım hizmetleri yerine ürün geliştirme odaklı projeler tercih edilmektedir</li>
  <li>Patent veya faydalı model başvurusu varsa mutlaka belirtin</li>
  <li>Ticari potansiyeli somut verilerle destekleyin</li>
</ul>
    `,
  },
  {
    id: "ekosistem-3",
    slug: "yapay-zeka-girisimlerine-ozel-yeni-fon",
    categoryId: "ekosistem",
    title: "Yapay Zeka Girişimlerine Özel Yeni Fon Kuruldu",
    excerpt: "Sadece yapay zeka ve makine öğrenimi tabanlı donanım/yazılım üreten Türk girişimlerine tohum aşamasında yatırım yapacak yeni VC fonu duyuruldu.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    author: "Work365 İçerik Departmanı",
    authorRole: "Work365 İçerik Departmanı",
    date: "25 Şub 2025",
    readTime: "4 dk okuma",
    content: `
<p>Türkiye girişim ekosistemi, yapay zeka odaklı yeni bir risk sermayesi (VC) fonunun kuruluşuyla birlikte önemli bir haber aldı. "AIFirst Fund" adıyla kurulan fon, münhasıran yapay zeka ve makine öğrenimi tabanlı ürünler geliştiren Türk girişimlerine tohum aşamasında yatırım yapacak.</p>

<h2>Fon Hakkında</h2>
<ul>
  <li><strong>Fon büyüklüğü:</strong> 15 milyon USD (ilk kapanış)</li>
  <li><strong>Hedef büyüklük:</strong> 30 milyon USD</li>
  <li><strong>Çek büyüklüğü:</strong> 250.000 – 1.000.000 USD (tohum aşaması)</li>
  <li><strong>Odak:</strong> Yapay zeka, makine öğrenimi, bilgisayarlı görü ve doğal dil işleme</li>
  <li><strong>Portföy hedefi:</strong> 3 yılda 25 girişim</li>
</ul>

<h2>Fonun Yatırım Kriterleri</h2>

<h3>Teknoloji Derinliği</h3>
<p>Saf yapay zeka ürünleri önceliklidir. API sarmalayan uygulamalar değil; kendi modelini geliştiren veya ince ayar (fine-tuning) yapan girişimler tercih edilmektedir.</p>

<h3>Ekip Yetkinliği</h3>
<p>En az bir teknik kurucu koşulu aranmaktadır. Yapay zeka veya yazılım mühendisliği alanında akademik veya sektörel deneyim büyük avantaj sağlamaktadır.</p>

<h3>Pazar Büyüklüğü</h3>
<p>Fonun yöneticileri, en az 500 milyon USD büyüklüğünde adreslenebilir pazar (TAM) hedefleyen girişimlere odaklanmaktadır.</p>

<h2>Türkiye'de Yapay Zeka Ekosistemi: Mevcut Durum</h2>
<p>TÜBİTAK verilerine göre 2024 yılında Türkiye'de 340'tan fazla yapay zeka girişimi faaliyete başladı; bunların %68'i İstanbul merkezlidir. Bu rakamlar bir önceki yıla göre %42 artışa işaret etmektedir.</p>

<h2>Fona Başvurmak İçin</h2>
<p>Fon, startups@aifirstfund.vc adresinden pitch deck kabulü yapmaktadır. Yatırım sürecinin ilk aşaması 30 dakikalık keşif görüşmesinden oluşmaktadır. Portföy şirketi seçiminin ortalama 6–8 haftada sonuçlandırılması hedeflenmektedir.</p>

<h2>Ekosistem Yorumu</h2>
<p>Yapay zeka odaklı sektörel fonun kurulması, Türkiye'nin bu alandaki mühendis ve akademisyen tabanını finanse edilebilir girişimlere dönüştürme kapasitesini artıracak. 2025 yılı sonuna kadar benzer odaklı 2–3 fonun daha kurulması beklenmektedir.</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  return BLOG_POSTS.filter(
    (p) => p.categoryId === post.categoryId && p.id !== post.id
  ).slice(0, count);
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
