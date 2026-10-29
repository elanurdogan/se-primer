# SE Primer — Tasarım Sistemi (DESIGN.md)

> Stitch projesindeki tasarım sisteminden ve dışa aktarılan HTML'den çıkarılmıştır.

> **Kural:** Metin ve davranışın tek doğru kaynağı spec.md'dir; Stitch ekranları yalnızca görsel referanstır. Ekranlardaki örnek sayılar ve metinler uygulamaya taşınmaz.

Kaynak dosyalar: `design/html/*.html` (Stitch dışa aktarımı), `design/*.png` (ekran görüntüleri).
Bu belgedeki tüm değerler bu HTML dosyalarında geçen gerçek değerlerdir. HTML'de karşılığı olmayan değerler **belirtilmemiş** olarak işaretlenmiştir.
Ekranlarla spec arasındaki farklar ve her biri için alınan karar en alttaki uyumsuzluk bölümündedir.

---

## 1. Genel çerçeve

| Özellik | Değer | Kaynak |
|---|---|---|
| Hedef görünüm | 390 px genişlik (`<meta name="viewport" content="width=390, …">`) | 4 dosya |
| Mobil çerçeve | `width: 390px; min-height: 844px` (sahne: `height: 844px`, `overflow: hidden`) | `.mobile-container`, `.mobile-frame` |
| Çerçeve gölgesi | `0 0 40px rgba(0,0,0,0.6)` (sahne: `0 25px 60px -15px rgba(0,0,0,0.7)`) | aynı |
| CSS altyapısı | Tailwind CDN (`https://cdn.tailwindcss.com`) + satır içi `tailwind.config` | 4 dosya |
| İkonlar | Satır içi SVG (giriş, sahne); Google **Material Symbols Outlined** (son ekranları) | — |
| Açık tema | belirtilmemiş (yalnızca koyu tema var) | — |

---

## 2. Renk paleti

### 2.1 Tailwind config'teki renkler

`giris.html`, `son-kotu.html` ve `son-iyi.html` aynı config'i kullanır. `sahne.html` aynı renk değerlerini **farklı token adlarıyla** tanımlar, `successGreen` ve `dangerRed` ise bu dosyada tanımlı değildir.

| Rol | Hex | Token (giriş / son ekranları) | Token (sahne) |
|---|---|---|---|
| Uygulama arka planı | `#0B1B33` | `appBg` | `appBg` |
| Kart yüzeyi | `#13294B` | `cardSurface` | `surfaceCard` |
| Seçili yüzey / panel | `#1C3A66` | `selectedSurface` | `surfaceSelected` |
| Kenarlık | `#2A4A7A` | `appBorder` | `borderColor` |
| Vurgu (turuncu) | `#F28C28` | `accentOrange` | `accentOrange` |
| Birincil metin | `#F2F5FA` | `primaryText` | `textPrimary` |
| İkincil metin | `#9FB0C8` | `secondaryText` | `textSecondary` |
| Başarı (yeşil) | `#2FB67C` | `successGreen` | — |
| Tehlike (kırmızı) | `#E5484D` | `dangerRed` | — |

### 2.2 Config dışında HTML'de doğrudan kullanılan renkler

| Değer | Kullanım | Dosya |
|---|---|---|
| `#07101E` | Mobil çerçeve dışındaki `body` arka planı | sahne |
| `slate-950` (Tailwind) | `body` sınıfı | giriş, son ekranları |
| `#081528` | Durum şeridi arka planı | sahne |
| `#081526` (%80) | Rol kartı arka planı | sahne |
| `#050C17` | Rol kartındaki terminal satırı | sahne |
| `#A7BAEC` | Terminal satırı metni | sahne |
| `slate-200`, `slate-300` (Tailwind) | Kriz metni, tutor balonu, durum şeridi metni | sahne |
| `amber-400` (Tailwind) | "HTTP 503" | sahne |
| `emerald-400` (Tailwind) | Tutor çevrimiçi noktası | sahne |
| `#e07f20` | Gönder butonu hover | sahne |
| `#e07d19` | "Yeniden oyna" hover | son ekranları |
| `#f39c43` | "Tutor ile bu sonucu konuş" hover | son ekranları |

### 2.3 Saydamlık kalıpları

`border-[#2A4A7A]/60`, `bg-[#0B1B33]/95` (sabit üst ve alt çubuk, `backdrop-blur`), `bg-accentOrange/10` ve `border-accentOrange/30` (ipucu ikonu), `bg-[#E5484D]/[0.08]` (kritik bulgu satırı), `bg-[#E5484D]/15` ve `bg-[#2FB67C]/15` (saat rozeti), `opacity-40` (pasif buton).

---

## 3. Tipografi

| Özellik | Değer |
|---|---|
| Sans | `Inter`, yedek `sans-serif` (Google Fonts, ağırlıklar 400/500/600/700) |
| Mono | `"JetBrains Mono"`, yedek `monospace` (Google Fonts, ağırlıklar 400/500/600) |
| Yumuşatma | `-webkit-font-smoothing: antialiased` |
| Satır yüksekliği | Tailwind yardımcıları: `leading-none`, `leading-tight`, `leading-snug`, `leading-relaxed`. Özel değer belirtilmemiş. |

### 3.1 Metin ölçeği (HTML'de geçen değerler)

| Kullanım | Boyut | Ağırlık | Yazı tipi |
|---|---|---|---|
| Ekran başlığı (giriş) | `24px` | 700 (`font-bold`) | Inter |
| Son başlığı ("Kötü son" / "İyi son") | `text-2xl` (24px) | 700 | Inter |
| Karar başlığı (sahne) | `18px` | 700 | Inter |
| Soru başlığı / bölüm başlığı | `17px` | 600 | Inter |
| Seçenek başlığı, birincil buton | `15px` | 500 (seçili: 600) / buton 600 | Inter |
| Giriş açıklaması | `15px` | 400 | Inter |
| Son açıklaması | `14px` | 400 | Inter |
| Karar satırı başlığı (son) | `14px` | 500 | Inter |
| Seçenek açıklaması, yardımcı metin | `13px` | 400 | Inter |
| Üst bölüm etiketi ("NÖBET DEVRİ") | `13px`, büyük harf, `tracking-wider` | 500 | Inter |
| Karar seçeneği (sahne) | `text-sm` (14px) başlık / `text-xs` (12px) açıklama | 600 / 400 | Inter |
| Tutor mesajları, giriş alanı | `text-xs` (12px) | 400 | Inter |
| Durum şeridi, ilerleme etiketi | `11px` | 400–500 | JetBrains Mono |
| Rozet ("ODAK KARAR", "MİMARİ") | `10px`, büyük harf, `tracking-wider` | 700 / 600 | Inter |
| Saat, sayaç, metrikler | `text-xs` (12px) – `text-base` (16px) | 500–600 | JetBrains Mono |
| "ODAK" rozeti (son) | `9px` | 700 | JetBrains Mono |

---

## 4. Köşe yuvarlaklıkları

Tailwind config'te `borderRadius` tanımlanmamıştır. Aşağıdakiler HTML sınıflarında geçen değerlerdir. Parantez içindeki karşılıklar Tailwind'in varsayılan ölçeğidir.

| Değer | Kullanım |
|---|---|
| `rounded-[12px]` | Giriş seçenek kartları, birincil buton |
| `rounded-xl` (12px) | Sahne kartları, karar seçenekleri, tutor giriş alanı ve gönder butonu, son ekranı kartları, "Yeniden oyna" |
| `rounded-t-[20px]` | Tutor alt paneli (yalnızca üst köşeler) |
| `rounded-2xl` (16px) + `rounded-tr-sm` / `rounded-tl-sm` (2px) | Tutor mesaj balonları (oyuncu sağ üst, tutor sol üst köşesi sivri) |
| `rounded-lg` (8px) | Metrik kutuları (son), tutor kapat butonu |
| `rounded` (4px) | Rozetler, terminal satırı, saat rozeti |
| `rounded-full` | İlerleme segmentleri, durum noktaları, radyo daireleri, numara daireleri, sayaç hapı |

---

## 5. Boşluklar

Tailwind config'te `spacing` tanımlanmamıştır. HTML'de varsayılan Tailwind ölçeği kullanılır (1 birim = 4px).

| Değer | Kullanım |
|---|---|
| `px-4` (16px) | Yatay sayfa kenar boşluğu (tüm ekranlar) |
| `h-12` (48px) | Üst çubuk yüksekliği |
| `py-1.5` (6px) / `h-7` (28px) | Durum şeridi (giriş ve son / sahne) |
| `pt-5` (20px), `gap-6` (24px) | Ana içerik üst boşluğu ve bölümler arası boşluk (giriş, son ekranları) |
| `pt-3`, `space-y-3.5` (12px / 14px) | Sahne içerik boşlukları |
| `gap-3` (12px) | Soru başlığı ile seçenekler arası |
| `gap-2.5` / `space-y-2.5` (10px) | Seçenek kartları arası |
| `p-3.5` (14px) | Seçenek kartı ve karar satırı iç boşluğu |
| `p-4` (16px) | Sonuç başlık kartı, ders kartı, sabit alt çubuk |
| `pb-36` (144px) | Giriş: sabit alt buton için alt boşluk |
| `pb-[330px]` | Sahne: açık tutor paneli için alt boşluk |
| `min-h-[58px]` / `[52px]` / `[50px]` | Seviye / rol / hedef seçenek kartı minimum yüksekliği |
| `h-[52px]` | Birincil buton yüksekliği |
| `h-1.5` (6px), `gap-2` / `gap-1.5` | İlerleme çubuğu yüksekliği ve segment aralığı |
| `320px` | Tutor paneli yüksekliği (satır içi stil) |

---

## 6. Bileşenler

| Bileşen | Görünüm (HTML'deki değerler) | Ekran |
|---|---|---|
| **Üst çubuk** | 48px, `#0B1B33`/95 + blur, sticky. Solda turuncu artı ikonu + "SE Primer", sağda mono saat | Hepsi |
| **Durum şeridi** | Mono 11px. Nokta + "ReçeteKöprü · DURUM: …" + sağda seviye kodu. Kesintide turuncu ve yanıp sönen nokta (`blink 1.4s` / `pulse-dot 1.8s`), stabil durumda yeşil | Hepsi |
| **İlerleme çubuğu** | 3 segment, 6px, `rounded-full`. Dolu segment turuncu, boş segment `#1C3A66` veya `borderColor/50` | Giriş, sahne |
| **Seçenek kartı (profil)** | `#13294B`, 1px `#2A4A7A`, 12px köşe. Seçiliyken `#1C3A66`, 2px turuncu kenarlık ve sağda turuncu onay işareti. Seçili değilken 20px boş daire | Giriş |
| **Birincil buton** | 52px, turuncu dolgu, `#0B1B33` metin, 15px/600. Pasifken `opacity-40` + `cursor-not-allowed` | Giriş, son ekranları |
| **Odak rozeti** | Turuncu dolgu, koyu metin, 10px büyük harf, 4px köşe ("ODAK KARAR") | Sahne |
| **Kategori rozeti** | 1px kenarlık, ikincil metin ("MİMARİ") | Sahne |
| **Sayaç hapı** | `rounded-full`, `#13294B`. Turuncu halka (SVG, `stroke-dasharray`) + mono "0:42" + "kalan süre" | Sahne |
| **Kriz metni kartı** | `#13294B`, solda 3px turuncu şerit, 13px metin | Sahne |
| **İzleme satırı** | Mono 10.5px, "·" ile ayrılmış metrikler | Sahne |
| **Rol kartı** | Terminal görünümlü: başlık "ROLÜN: …" + `#050C17` zemin üzerinde mono log satırı | Sahne |
| **İpucu kartı** | `#13294B`, turuncu ampul ikonu (yarı saydam daire), "İPUCU" etiketi + 12px metin | Sahne |
| **Karar seçeneği** | Tam genişlik buton, `#13294B`, eşit boyut, renkle ayrım yok. Başlık "A · …", sağda harf dairesi, altında açıklama | Sahne |
| **Tutor paneli** | Alt panel, 320px, `#1C3A66`, üst köşeler 20px. Sürükleme tutamağı, başlık (turuncu "?" ikonu + "Tutor" + yeşil nokta + alt başlık), kapat (X) butonu, mesaj listesi, giriş alanı ve turuncu gönder butonu | Sahne |
| **Mesaj balonu** | Oyuncu sağda, `#13294B` dolgulu. Tutor solda, turuncu/40 kenarlıklı, yanında "T" avatarı | Sahne |
| **Postmortem şeridi** | Mono 11px, `#13294B` hap. "POSTMORTEM #882" + sağda durum (kırmızı veya yeşil) | Son ekranları |
| **Sonuç başlık kartı** | `#13294B`, üstte 4px kırmızı/yeşil şerit, "NÖBET SONU" + saat rozeti, 24px başlık, açıklama, 2'li metrik ızgarası | Son ekranları |
| **Kritik bulgu satırı** | `#E5484D` %8 zemin, Material ikon (`error`, `lock_open`), 13px metin | Kötü son |
| **Karar özeti satırı** | Numara dairesi + "Kategori — Seçim" + açıklama + sağda durum noktası. Odak satırı `#1C3A66`, solda 4px renkli şerit ve "ODAK" rozeti | Son ekranları |
| **Ders kartı** | `#1C3A66`, turuncu mono başlık "ROLÜN İÇİN DERS · …" + 13px metin | Son ekranları |
| **Tutor bağlantısı** | Turuncu metin + `help` ikonu, "Tutor ile bu sonucu konuş" | Son ekranları |

---

## 7. Ekran listesi

| Ekran | Görüntü | HTML | spec.md karşılığı |
|---|---|---|---|
| Giriş (profil) | [giris.png](design/giris.png) | [giris.html](design/html/giris.html) | E2 — Profil |
| Sahne (karar + tutor açık) | [sahne.png](design/sahne.png) | [sahne.html](design/html/sahne.html) | E4 — Karar (K1) + E7 — Tutor paneli |
| Kötü son | [son-kotu.png](design/son-kotu.png) | [son-kotu.html](design/html/son-kotu.html) | E6 — Son (KÖTÜ, #8: yama + hemen + ham) |
| İyi son | [son-iyi.png](design/son-iyi.png) | [son-iyi.html](design/html/son-iyi.html) | E6 — Son (İYİ, #1: geri + test + maske) |

E1 (Karşılama), E3 (Brifing) ve E5 (Sonuç) için Stitch ekranı yoktur.

---

## 8. `data-testid` eşlemesi

Stitch HTML'lerinde **hiç `data-testid` yoktur**. Aşağıdaki adlar `spec.md` §8'den birebir alınmıştır ve uygulamada (`app/`) eklenecektir. Spec'te karşılığı olmayan bileşenler "—" ile işaretlidir.

### Giriş (E2)

| Bileşen | `data-testid` |
|---|---|
| Seviye: Yeni başladım | `level-beginner` |
| Seviye: Biraz deneyimim var | `level-intermediate` |
| Seviye: Deneyimliyim | `level-experienced` |
| Rol: Backend geliştirici | `role-backend` |
| Rol: Test / QA mühendisi | `role-qa` |
| Rol: Proje yöneticisi | `role-pm` |
| Hedef: Mimari ve dağıtım kararları | `goal-architecture` |
| Hedef: Test stratejisi | `goal-testing` |
| Hedef: KVKK ve veri güvenliği | `goal-kvkk` |
| "Nöbeti devral" butonu | `profile-submit` |
| Üst çubuk, durum şeridi, ilerleme çubuğu | — |

### Sahne (E4)

| Bileşen | `data-testid` |
|---|---|
| Karar başlığı | `decision-title` |
| Seçenek A · Geri dön | `k1-option-rollback` (K2: `k2-option-test`, K3: `k3-option-mask`) |
| Seçenek B · Canlıda yama | `k1-option-hotfix` (K2: `k2-option-ship`, K3: `k3-option-raw`) |
| Rol kartı | `role-card` |
| "ODAK KARAR" rozeti | `focus-badge` |
| İpucu kartı | `hint-box` |
| İpucu göster butonu (ekranda yok) | `hint-toggle` |
| Sayaç hapı | `timer` |
| Tutor'u aç (ekranda yok, panel açık çizilmiş) | `tutor-open` |
| "MİMARİ" rozeti, kriz metni kartı, izleme satırı, "Karar 1 / 3" ilerlemesi | — |

### Tutor paneli (E7)

| Bileşen | `data-testid` |
|---|---|
| Panel kapsayıcısı | `tutor-panel` |
| Mesaj listesi | `tutor-messages` |
| Mesaj balonu (`data-author="player"` / `"tutor"`) | `tutor-message` |
| Yükleniyor göstergesi (ekranda yok) | `tutor-loading` |
| "Tutor'a sor…" giriş alanı | `tutor-input` |
| Gönder butonu | `tutor-send` |
| Kapat (X) butonu | `tutor-close` |
| Sürükleme tutamağı | — |

### Kötü son / İyi son (E6)

| Bileşen | `data-testid` |
|---|---|
| Kötü son kapsayıcısı | `ending-bad` |
| İyi son kapsayıcısı | `ending-good` |
| Kritik bulgu: ikinci çöküş | `ending-reason-crash` |
| Kritik bulgu: KVKK ihlali | `ending-reason-kvkk` |
| "Kararların" listesi | `ending-summary` |
| "Rolün için ders" kartı | `ending-role-lesson` |
| "Yeniden oyna" butonu | `restart-button` |
| "Tutor ile bu sonucu konuş" | `tutor-open` |
| Postmortem şeridi, metrik ızgarası | — |

---

## 9. Koşullu görünen bileşenler

**Süre sayacı ile ipucu kartı birbirini dışlar.** Aynı karar ekranında hiçbir zaman birlikte görünmezler:

- **Yeni başladım:** ipucu kartı var, sayaç yok.
- **Biraz deneyimim var:** ipucu kartı gizli (`hint-toggle` ile açılır), sayaç yok.
- **Deneyimliyim:** 60 sn sayaç var, ipucu kartı ve `hint-toggle` yok.

Sahne taslağında (`design/sahne.png`) sayacın, ipucu kartının ve odak rozetinin birlikte görünmesinin tek nedeni tüm durumları tek taslakta göstermektir. Bu gerçek bir oyun durumu değildir. Uygulamada:

| Bileşen | `data-testid` | Ne zaman görünür (spec §2) |
|---|---|---|
| İpucu kartı | `hint-box` | **Yeni başladım:** her karar ekranında otomatik açık. **Biraz deneyimim var:** gizli, `hint-toggle` ile açılır. **Deneyimliyim:** hiç yok (kart ve buton DOM'da yok). |
| İpucu göster butonu | `hint-toggle` | Yalnızca **Biraz deneyimim var** seviyesinde. |
| Süre sayacı | `timer` | Yalnızca **Deneyimliyim** seviyesinde ve yalnızca K1/K2/K3 ekranlarında, 60 sn'den geri sayar. |
| Odak rozeti | `focus-badge` | Yalnızca **hedef**le eşleşen karar ekranında (Mimari → K1, Test → K2, KVKK → K3). |

Son ekranında karar özetindeki "ODAK" rozeti ve vurgulu satır da hedefe göre değişir: odak karar listenin ilk sırasında yer alır. Kritik bulgu satırları (`ending-reason-*`) yalnızca geçerli olan KÖTÜ nedenleri için gösterilir.

---

## 10. Ekranlar ile spec.md arasındaki uyumsuzluklar

Her maddenin kararı dört seçenekten biridir:

- **spec geçerli:** Uygulamada spec metni ve davranışı kullanılır.
- **Stitch'te düzeltildi:** Ekran yeniden dışa aktarıldı.
- **spec'e eklendi:** Eksik tanım spec.md'ye eklendi.
- **dekoratif öğe, test edilmez:** Görsel olarak kullanılabilir, `data-testid` almaz. Gösterilen sayılar spec'teki senaryoyla (§3: 142 eczane, kuyrukta 1.240 reçete, 10:45'te ikinci çöküş vb.) çelişmemelidir.

### 10.1 Ekranda olup spec'te olmayan öğeler

| # | Öğe | Karar |
|---|---|---|
| 1 | **Üst çubuk ve durum şeridi** (tüm ekranlar): "SE Primer", saat (08:30 / 10:45 / 12:00), "ReçeteKöprü · DURUM: KESİNTİ / STABİL", "L4-ALERT" / "L4-NORMAL". | dekoratif öğe, test edilmez |
| 2 | **Giriş:** "NÖBET DEVRİ" etiketi, "Nöbetçi sensin" başlığı, "Önce seni tanıyalım…" açıklaması, "ANKET İLERLEMESİ 2 / 3" çubuğu, "3 sorunun hepsini cevapla" yardımcı metni, seviye seçeneklerinin alt açıklamaları ("Her kararda ipucu görürsün." vb.), rol ikonları. | dekoratif öğe, test edilmez |
| 3 | **Sahne:** "Karar 1 / 3" ilerlemesi ve "KRİZ AŞAMASI" etiketi, "MİMARİ" kategori rozeti, izleme satırı ("Kuyruktaki reçete: 1.240 · Etkilenen eczane: 142 · HTTP 503"), seçeneklerdeki harf daireleri, tutor alt başlığı "Cevabı söylemez, düşünmeni sağlar.", çevrimiçi noktası, "T" avatarı, sürükleme tutamağı. | dekoratif öğe, test edilmez (izleme satırındaki sayılar §3 ile uyumlu) |
| 4 | **Son ekranları, postmortem ve metrikler:** "POSTMORTEM #882" şeridi ("SEV-1 TERMINATED" / "ÇÖZÜLDÜ · STABİL"), "NÖBET SONU" etiketi ve saat rozeti, metrik ızgarası (Kötü: "42 dk 18 sn", "1.420 Adet"; İyi: "14 dk", "1.420 Adet"), "Kritik Bulgular · 2 Hata", "3/3 İncelendi" / "3/3 Başarılı", "Farklı kararlar alarak sistemi stabil tutmayı dene." metni. | dekoratif öğe, test edilmez. Ekrandaki "1.420" (§3'te 1.240) ve iyi sondaki "14 dk" (§3 K1-A'da geri dönüş 15 dk, toparlanma 20. dakika) spec'le çeliştiği için uygulamaya taşınmaz. |
| 5 | **Son ekranları, karar satırı açıklamaları** ("kuyruk birikip veritabanı kilitlendi" vb.). | spec geçerli (karar özeti §3'teki seçimlerden üretilir, bkz. 10.3) |
| 6 | **"Rolün için ders" metinleri** ("Belirtiyi değil kökü düzelt…", "Geri dönüş yolu bir güvenlik ağıdır…"): Spec kartı tanımlıyordu (`ending-role-lesson`) ama metinlerini vermiyordu. | spec'e eklendi (spec §4.3, rol × son türü tablosu) |
| 7 | **Kötü son ekranında artık kalmış alt çubuk:** Giriş ekranından kalan pasif "Nöbeti devral" butonu ve "3 sorunun hepsini cevapla" metni. | Stitch'te düzeltildi (`design/son-kotu.png` ve `design/html/son-kotu.html` yenilendi) |
| 8 | **"Yeniden oyna" betiği:** Buton metni "Sistem Sıfırlanıyor..." olur ve sayfa yenilenir (`window.location.reload()`). | spec'e eklendi (spec §4.5: sayfa yenilenmez, durum ve profil sıfırlanır, `Karsilama`'ya dönülür) |
| 9 | **`<title>`:** Son ekranlarında da "SE Primer - Nöbet Devri" yazıyor. | dekoratif öğe, test edilmez |

### 10.2 Spec'te olup ekranda olmayan öğeler

| # | Öğe | Karar |
|---|---|---|
| 1 | **Ekranlar:** E1 Karşılama (`start-button`), E3 Kriz brifingi (`briefing-text`, `briefing-role-message`, `briefing-continue`), E5 Sonuç ekranı (`outcome-what`, `outcome-why`, `outcome-timeout-note`, `outcome-deep` "Derinlemesine" bölümü, `outcome-continue`). | spec geçerli (ekranlar spec'e göre, bu belgedeki görsel dille yapılır) |
| 2 | **`data-testid`'ler:** Stitch HTML'lerinin hiçbirinde yok. | spec geçerli (§8'deki adlar kullanılır) |
| 3 | **Sahne:** `hint-toggle` ("İpucu göster") butonu, `tutor-open` butonu (panel açık çizildiği için tetikleyici yok) ve `tutor-loading` göstergesi çizilmemiş. | spec geçerli |
| 4 | **Sahne, koşul çelişkisi:** Sayaç ile ipucu kartı aynı anda gösteriliyor. | spec geçerli (birbirini dışlar, spec §2.1; bkz. §9) |
| 5 | **Kötü son:** §3'teki **klinik sonuç notu** (ikinci çöküş nedeninde gösterilecek) ekranda yok. | spec geçerli |
| 6 | **İyi son:** *Kıl payı* İYİ durumu (#2, #3) için riskli kararı belirten bir öğe tasarlanmamış. Ekranda yalnızca temiz İYİ (#1) var. | spec geçerli |
| 7 | **Süre doldu notu:** Sahnede yok (E5'e ait). Son ekranında yalnızca "(süre doldu)" etiketi var. | spec geçerli |

### 10.3 Metin farkları

| Yer | Ekrandaki metin | spec.md'deki metin | Karar |
|---|---|---|---|
| Giriş, profil butonu | "Nöbeti devral" | "Devam" (§8 E2, `profile-submit`) | spec geçerli |
| Giriş, hedef seçeneği | "Mimari ve dağıtım kararları" | "Mimari / dağıtım kararları" (§2.3) | spec geçerli |
| Sahne, seçenek A | "A · Geri dön" / "v3.1 sürümüne rollback" | "Geri dön (v3.1'e rollback)" | spec geçerli |
| Sahne, seçenek B açıklaması | "Zaman aşımını kısalt, etkileşim kontrolünü atlanabilir yap" | "zaman aşımını kısalt, kontrolü atlanabilir yap" | spec geçerli |
| Son ekranları, tutor tetikleyici | "Tutor ile bu sonucu konuş" | "Tutor'u aç" (§8 E6) | spec geçerli |
| Kötü son, açıklama | "ReçeteKöprü 10:45'te ikinci kez çöktü ve ilaç ile tanı bilgisi içeren reçete logları ekip kanalına sızdı." | Nedene göre iki ayrı metin (§4.3): ikinci çöküş ve KVKK ihlali | spec geçerli |
| Kötü son, K1 satırı | "Zaman aşımı düşürüldü, koruma atlandı; kuyruk birikip veritabanı kilitlendi." | Veritabanı kilitlenmesi yok. Neden: kapatılmayan bağlantılar ve tekrar deneme yükü, fail-open kontrol (§3 K1-B) | spec geçerli |
| Kötü son, K2 satırı | "…provizyon deserialization hatası yakalanamadı." | Deserialization hatası yok. Neden: devre kesici ayarlarının elle değiştirilen zaman aşımıyla çakışması, tekrar deneme fırtınası (§3 K2-B) | spec geçerli |
| İyi son, K1 satırı ve metrik | "…provizyon kilitlenmesi anında çözüldü." / "Kesinti süresi 14 dk" | Geri dönüş 15 dk sürer, bazı eczaneler 20. dakikada toparlanır (§3 K1-A) | spec geçerli |
| İyi son, K2 satırı | "Temel işlevler ve reçete provizyonu hızlı regresyon testiyle doğrulandı." | Staging'de 20 dk hedefli test (provizyon yavaş yanıt simülasyonu + yük), devre kesicideki fail-open hatasını yakalar (§3 K2-A) | spec geçerli |
| Kötü / İyi son, etkilenen reçete | "1.420 Adet" | Kuyrukta 1.240 reçete (§3). 1.420 değeri spec'te yok | dekoratif öğe, test edilmez. Spec'le çelişen sayı uygulamaya taşınmaz. |
| Giriş ↔ sahne/son tutarlılığı | Girişte seçili rol "Test / QA mühendisi" | Sahne ve son ekranlarında rol "Backend geliştirici" (örnek ekranlar farklı profillerle çizilmiş) | spec geçerli (rol kartı ve ders metni seçilen role göre §2.2 ve §4.3'ten gelir) |
