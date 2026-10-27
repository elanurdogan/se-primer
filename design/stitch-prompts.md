# Google Stitch Promptları

`spec.md`'deki ekranlara karşılık gelen 3 mobil ekran promptu. Her prompt **tek başına** Stitch'e yapıştırılabilir. Ekranların tutarlı çıkması için hepsinde aynı **Ortak stil** bloğu kelimesi kelimesine tekrar edilir.

Dosyada iki sürüm var: önce tamamen Türkçe promptlar, ardından **İngilizce sürüm** (yönergeler İngilizce, ekranda görünen metinler Türkçe). Stitch için İngilizce sürüm önerilir.

| Prompt | Ekran | spec.md karşılığı |
|---|---|---|
| 1 | Giriş (profil soruları) | E2 |
| 2 | Sahne (karar ekranı + tutor paneli) | E4 + E7 |
| 3 | Son (sonuç ve özet) | E6 |

**Kullanım:**
- Stitch'te **Mobile** modunu seçin. Promptu kod bloğunun içinden olduğu gibi kopyalayın.
- Stil kayarsa (renk veya font değişirse) Ortak stil bloğunu ayrı bir mesaj olarak yeniden gönderin.
- Çıktılardan elde edilen kararlar sonra `design/DESIGN.md`'ye yazılacak.

**Atmosfer:** Gece nöbetindeki eczane tezgâhı, nöbet izleme ekranı ve log terminali hissi. Tek renkli (monospace) log parçaları ve durum noktaları kullanılır. Sistem adları kurgusaldır (ReçeteKöprü, KSSK Provizyon Servisi).

---

## Ortak stil (referans)

Aşağıdaki blok üç promptun içinde de aynen yer alır. Burada yalnızca referans için tekrar edilmiştir.

| Token | Değer | Kullanım |
|---|---|---|
| Arka plan | `#0B1B33` | Koyu lacivert, tüm ekran zemini |
| Yüzey | `#13294B` | Kartlar, paneller |
| Yükseltilmiş yüzey | `#1C3A66` | Seçili kart, alt sayfa (bottom sheet) |
| Çizgi | `#2A4A7A` | Kart kenarlıkları, ayırıcılar |
| Vurgu (turuncu) | `#F28C28` | Birincil buton, seçili durum, sayaç, rozet |
| Vurgu üstü metin | `#0B1B33` | Turuncu buton üzerindeki metin |
| Metin | `#F2F5FA` | Ana metin |
| İkincil metin | `#9FB0C8` | Açıklama, etiket |
| Başarı | `#2FB67C` | Yalnızca İYİ son |
| Tehlike | `#E5484D` | Yalnızca KÖTÜ son ve kritik uyarı |

Tipografi: **Inter** (başlık 600–700, gövde 400). Saat, sayaç, durum satırı ve log satırlarında **JetBrains Mono** kullanılır.

---

## Prompt 1 — Giriş: 3 soru

```text
Mobil uygulama ekranı tasarla (390×844, tek sütun, dikey kaydırmalı). Uygulama: "SE Primer" — yazılım mühendisliği öğrencileri için kurgusal bir e-reçete sistemi krizi üzerine kurulu karar oyunu. Bu ekran, oyun başlamadan önce nöbetçi mühendisi tanımak için 3 soru soran profil ekranı.

ORTAK STİL (tüm ekranlarda aynı):
- Atmosfer: gece nöbetindeki eczane tezgâhı, nöbet izleme ekranı ve log terminali hissi. Ciddi, profesyonel, sakin ama gergin. Oyuncak gibi, renkli veya çizgi film tarzı değil. Emoji yok. İlaç kutusu fotoğrafı veya gerçek marka yok.
- Renkler: arka plan koyu lacivert #0B1B33; kart/panel yüzeyi #13294B; seçili kart ve alt sayfa #1C3A66; kenarlık ve ayırıcı #2A4A7A; tek vurgu rengi turuncu #F28C28 (birincil buton, seçili durum, sayaç, rozetler, durum noktası); turuncu üstündeki metin #0B1B33; ana metin #F2F5FA; ikincil metin #9FB0C8; başarı yeşili #2FB67C ve tehlike kırmızısı #E5484D yalnızca sonuç ekranında.
- Tipografi: Inter. Ekran başlığı 24px/700, bölüm başlığı 17px/600, gövde 15px/400, etiket 13px/500 büyük harf ve hafif harf aralığı. Saat, sayaç, durum satırı ve log satırları JetBrains Mono.
- Bileşenler: kartlar 12px köşe yarıçapı, 1px #2A4A7A kenarlık, gölge yok (düz, koyu yüzeyler). Birincil buton tam genişlik, 52px yükseklik, turuncu dolgu, 12px yarıçap. Seçilebilir seçenekler kart biçiminde; seçili olanda 2px turuncu kenarlık ve sağda turuncu onay işareti. Dokunma alanları en az 48px. Yan boşluk 16px, bloklar arası 24px.
- Üst bar: solda küçük turuncu artı/haç (eczane) çizgi ikonu ve "SE Primer" yazısı, sağda JetBrains Mono ile "08:30" saati (ikincil metin rengi). Üst barın hemen altında ince bir nöbet durum şeridi: JetBrains Mono, 12px, yanıp sönen turuncu nokta + "ReçeteKöprü · DURUM: KESİNTİ".
- Tüm arayüz metinleri Türkçe.

EKRAN İÇERİĞİ:
1. Üst bar ve nöbet durum şeridi (ortak stil).
2. Etiket "NÖBET DEVRİ" (turuncu, büyük harf), altında başlık "Nöbetçi sensin", altında ikincil metin: "Önce seni tanıyalım. Cevapların oyunu sana göre ayarlar, hiçbir yere kaydedilmez."
3. İnce ilerleme göstergesi: 3 parçalı yatay çubuk, cevaplanan sorular turuncu.
4. Soru 1 — bölüm başlığı "Yazılım mühendisliğinde ne kadar deneyimlisin?". 3 dikey seçenek kartı, her biri başlık + tek satır açıklama:
   - "Yeni başladım" — "Her kararda ipucu görürsün."
   - "Biraz deneyimim var" — "İstersen ipucu açabilirsin." (bu kart SEÇİLİ durumda gösterilsin)
   - "Deneyimliyim" — "İpucu yok, her karar için 60 saniyen var."
5. Soru 2 — "Bu krizde hangi roldesin?". 3 seçenek kartı, her birinin solunda ince çizgi ikon:
   - "Backend geliştirici" (sunucu ikonu)
   - "Test / QA mühendisi" (onay listesi ikonu) — SEÇİLİ
   - "Proje yöneticisi" (pano ikonu)
6. Soru 3 — "Bu oyundan en çok ne öğrenmek istiyorsun?". 3 seçenek kartı:
   - "Mimari ve dağıtım kararları"
   - "Test stratejisi"
   - "KVKK ve veri güvenliği" — henüz hiçbiri seçili değil
7. Alta sabitlenmiş (sticky) birincil buton "Nöbeti devral". Üçüncü soru cevaplanmadığı için PASİF durumda: %40 opaklık, altında ikincil metin "3 sorunun hepsini cevapla".

Gerçek kişi adı veya gerçek bir kamu sistemi adı kullanma.
```

---

## Prompt 2 — Sahne: karar ekranı

```text
Mobil uygulama ekranı tasarla (390×844, tek sütun). Uygulama: "SE Primer" — yazılım mühendisliği öğrencileri için kurgusal bir e-reçete sistemi krizi üzerine kurulu karar oyunu. Bu ekran oyunun ana sahnesi: nöbetçi mühendis bir kriz anında iki seçenekten birini seçer. Ekranın alt kısmında AI tutor paneli AÇIK durumda (alt sayfa / bottom sheet) gösterilsin.

ORTAK STİL (tüm ekranlarda aynı):
- Atmosfer: gece nöbetindeki eczane tezgâhı, nöbet izleme ekranı ve log terminali hissi. Ciddi, profesyonel, sakin ama gergin. Oyuncak gibi, renkli veya çizgi film tarzı değil. Emoji yok. İlaç kutusu fotoğrafı veya gerçek marka yok.
- Renkler: arka plan koyu lacivert #0B1B33; kart/panel yüzeyi #13294B; seçili kart ve alt sayfa #1C3A66; kenarlık ve ayırıcı #2A4A7A; tek vurgu rengi turuncu #F28C28 (birincil buton, seçili durum, sayaç, rozetler, durum noktası); turuncu üstündeki metin #0B1B33; ana metin #F2F5FA; ikincil metin #9FB0C8; başarı yeşili #2FB67C ve tehlike kırmızısı #E5484D yalnızca sonuç ekranında.
- Tipografi: Inter. Ekran başlığı 24px/700, bölüm başlığı 17px/600, gövde 15px/400, etiket 13px/500 büyük harf ve hafif harf aralığı. Saat, sayaç, durum satırı ve log satırları JetBrains Mono.
- Bileşenler: kartlar 12px köşe yarıçapı, 1px #2A4A7A kenarlık, gölge yok (düz, koyu yüzeyler). Birincil buton tam genişlik, 52px yükseklik, turuncu dolgu, 12px yarıçap. Seçilebilir seçenekler kart biçiminde; seçili olanda 2px turuncu kenarlık ve sağda turuncu onay işareti. Dokunma alanları en az 48px. Yan boşluk 16px, bloklar arası 24px.
- Üst bar: solda küçük turuncu artı/haç (eczane) çizgi ikonu ve "SE Primer" yazısı, sağda JetBrains Mono ile "08:30" saati (ikincil metin rengi). Üst barın hemen altında ince bir nöbet durum şeridi: JetBrains Mono, 12px, yanıp sönen turuncu nokta + "ReçeteKöprü · DURUM: KESİNTİ".
- Tüm arayüz metinleri Türkçe.

EKRAN İÇERİĞİ (yukarıdan aşağıya):
1. Üst bar ve nöbet durum şeridi (ortak stil). Altında "Karar 1 / 3" yazısı ve 3 parçalı ilerleme çubuğu (ilk parça turuncu).
2. SAYAÇ ALANI: sağ üstte, karar başlığının hizasında yuvarlak hatlı bir hap (pill): turuncu ince halka biçiminde geri sayım göstergesi ve içinde JetBrains Mono "0:42". Küçük etiket "kalan süre". (Bu alan yalnızca deneyimli oyuncularda görünür; tasarımda görünür hali çizilsin.)
3. Rozetler: turuncu dolgulu küçük rozet "ODAK KARAR" ve yanında kenarlıklı rozet "MİMARİ".
4. Başlık: "ReçeteKöprü'yü nasıl ayağa kaldırırsın?"
5. KRİZ METNİ kartı (yüzey #13294B, solunda 3px turuncu dikey şerit):
   "08:30. Dün gece yayına alınan ReçeteKöprü v3.2, provizyon servisine zaman aşımı olmadan bağlanıyor. Eczane yazılımları tekrar denedikçe servis kilitlendi. Eczaneler reçete numarasıyla ilaç karşılayamıyor; insülin ve tansiyon ilacı bekleyen kronik hastalar kapıda."
   Kartın altında ikincil metinle, JetBrains Mono küçük bir izleme satırı: "Kuyruktaki reçete: 1.240 · Etkilenen eczane: 142 · HTTP 503".
6. ROL KARTI (daha küçük, kenarlıklı, terminal görünümlü): etiket "ROLÜN: BACKEND GELİŞTİRİCİ", içinde JetBrains Mono log satırı: "ProvizyonClient timeout=30s · threadPool 200/200 busy".
7. İPUCU KARTI: yüzey #13294B, solda turuncu ampul ikonu, etiket "İPUCU", metin: "İki seçeneği 'ne kadar hızlı' sorusuyla değil, 'işler yine bozulursa nereye dönebilirim?' sorusuyla karşılaştır." (Bu kart yalnızca yeni başlayan oyunculara gösterilir; tasarımda görünür hali çizilsin.)
8. İKİ SEÇENEK BUTONU: alt alta, eşit boyutlu, büyük kart-buton. Hiçbiri seçili değil, ikisi de görsel olarak eşit ağırlıkta olsun (hiçbiri "doğru cevap" gibi görünmemeli, renkle ayrıştırma yok):
   - "A · Geri dön" — alt satır: "v3.1 sürümüne rollback"
   - "B · Canlıda yama" — alt satır: "Zaman aşımını kısalt, etkileşim kontrolünü atlanabilir yap"
9. TUTOR PANELİ (alt sayfa, açık, ekranın alt ~%40'ı, yüzey #1C3A66, üstte tutamaç çizgisi, üst köşeler 20px yarıçap):
   - Başlık satırı: solda turuncu küçük daire içinde soru işareti ikonu, "Tutor", altında ikincil metin "Cevabı söylemez, düşünmeni sağlar."; sağda kapat (X) ikonu.
   - Mesajlar: sağa yaslı oyuncu balonu (yüzey #13294B): "Hastalar kapıda, hangisini seçmeliyim?"; sola yaslı tutor balonu (kenarlıklı): "İkisinin de bir bedeli var. Provizyon servisi hiç yanıt vermezse, her iki yolda da eczacının ekranında ne görünür?"
   - En altta mesaj giriş alanı ("Tutor'a sor…" yer tutucu metni) ve sağında turuncu gönder butonu (ok ikonu).

Gerçek kişi, hasta veya gerçek bir kamu sistemi adı kullanma.
```

---

## Prompt 3 — Son: sonuç ve özet

```text
Mobil uygulama ekranı tasarla (390×844, tek sütun, dikey kaydırmalı). Uygulama: "SE Primer" — yazılım mühendisliği öğrencileri için kurgusal bir e-reçete sistemi krizi üzerine kurulu karar oyunu. Bu ekran oyunun SON ekranı: üç kararın sonucunu, kararların özetini ve oyuncunun rolüne özel bir dersi gösterir. Nöbet sonu raporu / olay sonrası değerlendirme (postmortem) hissi vermeli. Bu tasarım KÖTÜ son varyantıdır.

ORTAK STİL (tüm ekranlarda aynı):
- Atmosfer: gece nöbetindeki eczane tezgâhı, nöbet izleme ekranı ve log terminali hissi. Ciddi, profesyonel, sakin ama gergin. Oyuncak gibi, renkli veya çizgi film tarzı değil. Emoji yok. İlaç kutusu fotoğrafı veya gerçek marka yok.
- Renkler: arka plan koyu lacivert #0B1B33; kart/panel yüzeyi #13294B; seçili kart ve alt sayfa #1C3A66; kenarlık ve ayırıcı #2A4A7A; tek vurgu rengi turuncu #F28C28 (birincil buton, seçili durum, sayaç, rozetler, durum noktası); turuncu üstündeki metin #0B1B33; ana metin #F2F5FA; ikincil metin #9FB0C8; başarı yeşili #2FB67C ve tehlike kırmızısı #E5484D yalnızca sonuç ekranında.
- Tipografi: Inter. Ekran başlığı 24px/700, bölüm başlığı 17px/600, gövde 15px/400, etiket 13px/500 büyük harf ve hafif harf aralığı. Saat, sayaç, durum satırı ve log satırları JetBrains Mono.
- Bileşenler: kartlar 12px köşe yarıçapı, 1px #2A4A7A kenarlık, gölge yok (düz, koyu yüzeyler). Birincil buton tam genişlik, 52px yükseklik, turuncu dolgu, 12px yarıçap. Seçilebilir seçenekler kart biçiminde; seçili olanda 2px turuncu kenarlık ve sağda turuncu onay işareti. Dokunma alanları en az 48px. Yan boşluk 16px, bloklar arası 24px.
- Üst bar: solda küçük turuncu artı/haç (eczane) çizgi ikonu ve "SE Primer" yazısı, sağda JetBrains Mono ile "08:30" saati (ikincil metin rengi). Üst barın hemen altında ince bir nöbet durum şeridi: JetBrains Mono, 12px, yanıp sönen turuncu nokta + "ReçeteKöprü · DURUM: KESİNTİ".
- Tüm arayüz metinleri Türkçe.

EKRAN İÇERİĞİ:
1. Üst bar (ortak stil), ancak saat "10:45" gösterir ve durum şeridinde nokta kırmızı (#E5484D), metin "ReçeteKöprü · DURUM: İKİNCİ KESİNTİ".
2. SONUÇ BAŞLIĞI kartı: tam genişlik, yüzey #13294B, üstte 4px tehlike kırmızısı (#E5484D) şerit. İçinde kırmızı uyarı ikonu, etiket "NÖBET SONU", büyük başlık "Kötü son", alt metin: "ReçeteKöprü 10:45'te ikinci kez çöktü ve ilaç ile tanı bilgisi içeren reçete logları ekip kanalına sızdı."
3. NEDENLER: başlığın altında iki küçük kırmızı kenarlıklı satır (chip değil, tam genişlik satır):
   - "İkinci çöküş — canlıda yama + testsiz yayın; insülin bekleyen hastaların bir kısmı ilaçsız döndü"
   - "KVKK ihlali — ilaç ve tanı kodu içeren log maskelenmeden 40 kişiye gönderildi"
4. KARARLARIN ÖZETİ: bölüm başlığı "Kararların". 3 satırlık dikey liste; her satır: solda numara dairesi, ortada karar adı ve seçilen seçenek, sağda küçük durum noktası (riskli = turuncu nokta, güvenli = yeşil nokta). İlk satır "ODAK" rozetiyle vurgulu (2px turuncu sol kenarlık):
   - "1 · Mimari — Canlıda yama" — turuncu nokta — "ODAK" rozeti
   - "2 · Test — Hemen yayına al" — turuncu nokta, altında küçük ikincil etiket "(süre doldu)"
   - "3 · KVKK — Olduğu gibi gönderildi" — turuncu nokta
   Her satırın altında ikincil metinle tek satırlık "neden" özeti.
5. ROLÜN İÇİN DERS kartı: yüzey #1C3A66, solda turuncu ikon (kitap veya hedef), etiket "ROLÜN İÇİN DERS · BACKEND GELİŞTİRİCİ", metin: "Belirtiyi değil kökü düzelt: zaman aşımını kısaltıp güvenlik kontrolünü atlanabilir yapmak çöküşü yalnızca erteler, üstüne hasta güvenliğini riske atar."
6. Küçük bağlantı: "Tutor ile bu sonucu konuş" (turuncu metin, soru işareti ikonu).
7. Alta sabit birincil buton "Yeniden oyna" (turuncu).

Gerçek kişi, hasta veya gerçek bir kamu sistemi adı kullanma.
```

### Prompt 3b — İYİ son varyantı (Prompt 3'ün ardından aynı sohbette gönderin)

```text
Aynı ekranın İYİ son varyantını oluştur. Ortak stil, düzen ve bileşenler tamamen aynı kalsın; yalnızca şunlar değişsin:
- Üst bardaki saat "12:00"; durum şeridinde nokta yeşil (#2FB67C), metin "ReçeteKöprü · DURUM: STABİL".
- Sonuç başlığı kartındaki üst şerit ve ikon başarı yeşili #2FB67C; ikon onay işareti; başlık "İyi son"; alt metin: "ReçeteKöprü öğlene kadar stabil kaldı. Kuyruktaki reçeteler karşılandı, kronik hastalar ilaçlarını aldı ve hiçbir sağlık verisi paylaşılmadı."
- NEDENLER bölümü kaldırılsın.
- Kararların özeti: "1 · Mimari — Geri dön", "2 · Test — Kısa test", "3 · KVKK — Maskelendi"; üçünde de yeşil nokta. ODAK rozeti ilk satırda kalsın.
- Rolün için ders metni: "Geri dönüş yolu bir güvenlik ağıdır: önce bilinen sağlam duruma dön, kökü sakin ortamda çöz."
```

---

# İngilizce sürüm (Stitch için önerilen)

Aşağıdaki promptlar yukarıdakilerle aynı içeriği taşır. Yönergeler İngilizce, ekranda görünecek metinler Türkçedir. Stitch Türkçe yönergeleri yanlış yorumlarsa bu sürümü kullanın.

## Prompt 1 (EN) — Giriş: 3 soru

```text
Design a mobile app screen (390×844, single column, vertically scrollable). App: "SE Primer" — a decision game for software engineering students set during a crisis in a fictional e-prescription system. This screen is the profile screen shown before the game starts; it asks the on-call engineer 3 questions to personalize the game.

SHARED STYLE (identical on every screen):
- Atmosphere: a night-duty pharmacy counter, an on-call monitoring screen and a log terminal feel. Serious, professional, calm but tense. Not playful, not colorful, not cartoonish. No emoji. No photos of medicine boxes and no real brands.
- Colors: background dark navy #0B1B33; card/panel surface #13294B; selected card and bottom sheet #1C3A66; borders and dividers #2A4A7A; single accent color orange #F28C28 (primary button, selected state, timer, badges, status dot); text on orange #0B1B33; primary text #F2F5FA; secondary text #9FB0C8; success green #2FB67C and danger red #E5484D are used ONLY on the result screen.
- Typography: Inter. Screen title 24px/700, section title 17px/600, body 15px/400, labels 13px/500 uppercase with slight letter spacing. Clock, timer, status strip and log lines use JetBrains Mono.
- Components: cards with 12px corner radius, 1px #2A4A7A border, no shadows (flat, dark surfaces). Primary button full width, 52px tall, orange fill, 12px radius. Selectable options are cards; the selected one has a 2px orange border and an orange checkmark on the right. Touch targets at least 48px. 16px side padding, 24px spacing between blocks.
- Top bar: on the left a small orange plus/cross (pharmacy) line icon and the text "SE Primer"; on the right the time "08:30" in JetBrains Mono (secondary text color). Directly below the top bar, a thin on-call status strip: JetBrains Mono 12px, a blinking orange dot + "ReçeteKöprü · DURUM: KESİNTİ".
- ALL visible UI text must be in Turkish, exactly as written in quotes below. Do not translate it.

SCREEN CONTENT:
1. Top bar and on-call status strip (shared style).
2. Orange uppercase label "NÖBET DEVRİ", below it the title "Nöbetçi sensin", below that secondary text: "Önce seni tanıyalım. Cevapların oyunu sana göre ayarlar, hiçbir yere kaydedilmez."
3. Thin progress indicator: a 3-segment horizontal bar; answered questions are orange.
4. Question 1 — section title "Yazılım mühendisliğinde ne kadar deneyimlisin?". 3 stacked option cards, each with a title + one-line description:
   - "Yeni başladım" — "Her kararda ipucu görürsün."
   - "Biraz deneyimim var" — "İstersen ipucu açabilirsin." (show this card in the SELECTED state)
   - "Deneyimliyim" — "İpucu yok, her karar için 60 saniyen var."
5. Question 2 — "Bu krizde hangi roldesin?". 3 option cards, each with a thin line icon on the left:
   - "Backend geliştirici" (server icon)
   - "Test / QA mühendisi" (checklist icon) — SELECTED
   - "Proje yöneticisi" (clipboard icon)
6. Question 3 — "Bu oyundan en çok ne öğrenmek istiyorsun?". 3 option cards:
   - "Mimari ve dağıtım kararları"
   - "Test stratejisi"
   - "KVKK ve veri güvenliği" — none selected yet
7. Sticky primary button at the bottom: "Nöbeti devral". It is in the DISABLED state because question 3 is unanswered: 40% opacity, with secondary helper text below it: "3 sorunun hepsini cevapla".

Do not use any real person's name or the name of any real public-sector system.
```

## Prompt 2 (EN) — Sahne: karar ekranı

```text
Design a mobile app screen (390×844, single column). App: "SE Primer" — a decision game for software engineering students set during a crisis in a fictional e-prescription system. This screen is the main game scene: during a crisis the on-call engineer chooses one of two options. Show the AI tutor panel in its OPEN state as a bottom sheet in the lower part of the screen.

SHARED STYLE (identical on every screen):
- Atmosphere: a night-duty pharmacy counter, an on-call monitoring screen and a log terminal feel. Serious, professional, calm but tense. Not playful, not colorful, not cartoonish. No emoji. No photos of medicine boxes and no real brands.
- Colors: background dark navy #0B1B33; card/panel surface #13294B; selected card and bottom sheet #1C3A66; borders and dividers #2A4A7A; single accent color orange #F28C28 (primary button, selected state, timer, badges, status dot); text on orange #0B1B33; primary text #F2F5FA; secondary text #9FB0C8; success green #2FB67C and danger red #E5484D are used ONLY on the result screen.
- Typography: Inter. Screen title 24px/700, section title 17px/600, body 15px/400, labels 13px/500 uppercase with slight letter spacing. Clock, timer, status strip and log lines use JetBrains Mono.
- Components: cards with 12px corner radius, 1px #2A4A7A border, no shadows (flat, dark surfaces). Primary button full width, 52px tall, orange fill, 12px radius. Selectable options are cards; the selected one has a 2px orange border and an orange checkmark on the right. Touch targets at least 48px. 16px side padding, 24px spacing between blocks.
- Top bar: on the left a small orange plus/cross (pharmacy) line icon and the text "SE Primer"; on the right the time "08:30" in JetBrains Mono (secondary text color). Directly below the top bar, a thin on-call status strip: JetBrains Mono 12px, a blinking orange dot + "ReçeteKöprü · DURUM: KESİNTİ".
- ALL visible UI text must be in Turkish, exactly as written in quotes below. Do not translate it.

SCREEN CONTENT (top to bottom):
1. Top bar and on-call status strip (shared style). Below them the text "Karar 1 / 3" and a 3-segment progress bar (first segment orange).
2. TIMER AREA: top right, aligned with the decision title, a rounded pill containing a thin orange ring-style countdown indicator with "0:42" inside in JetBrains Mono, and a small label "kalan süre". (In the game this only appears for experienced players; draw it in its visible state.)
3. Badges: a small orange-filled badge "ODAK KARAR" and next to it an outlined badge "MİMARİ".
4. Title: "ReçeteKöprü'yü nasıl ayağa kaldırırsın?"
5. CRISIS TEXT card (surface #13294B, 3px vertical orange stripe on the left):
   "08:30. Dün gece yayına alınan ReçeteKöprü v3.2, provizyon servisine zaman aşımı olmadan bağlanıyor. Eczane yazılımları tekrar denedikçe servis kilitlendi. Eczaneler reçete numarasıyla ilaç karşılayamıyor; insülin ve tansiyon ilacı bekleyen kronik hastalar kapıda."
   Below the card, a small monitoring line in secondary text, JetBrains Mono: "Kuyruktaki reçete: 1.240 · Etkilenen eczane: 142 · HTTP 503".
6. ROLE CARD (smaller, outlined, terminal-like): label "ROLÜN: BACKEND GELİŞTİRİCİ", containing a JetBrains Mono log line: "ProvizyonClient timeout=30s · threadPool 200/200 busy".
7. HINT CARD: surface #13294B, an orange lightbulb icon on the left, label "İPUCU", text: "İki seçeneği 'ne kadar hızlı' sorusuyla değil, 'işler yine bozulursa nereye dönebilirim?' sorusuyla karşılaştır." (In the game this only appears for beginner players; draw it in its visible state.)
8. TWO OPTION BUTTONS: stacked, equal size, large card-buttons. Neither is selected, and both must carry exactly equal visual weight (neither should look like "the right answer"; no color differentiation):
   - "A · Geri dön" — second line: "v3.1 sürümüne rollback"
   - "B · Canlıda yama" — second line: "Zaman aşımını kısalt, etkileşim kontrolünü atlanabilir yap"
9. TUTOR PANEL (open bottom sheet, about the lower 40% of the screen, surface #1C3A66, drag handle at the top, 20px radius on the top corners):
   - Header row: on the left a small orange circle with a question-mark icon, the title "Tutor", and below it secondary text "Cevabı söylemez, düşünmeni sağlar."; on the right a close (X) icon.
   - Messages: a right-aligned player bubble (surface #13294B): "Hastalar kapıda, hangisini seçmeliyim?"; a left-aligned outlined tutor bubble: "İkisinin de bir bedeli var. Provizyon servisi hiç yanıt vermezse, her iki yolda da eczacının ekranında ne görünür?"
   - At the very bottom, a message input with placeholder "Tutor'a sor…" and an orange send button with an arrow icon on its right.

Do not use any real person's or patient's name, or the name of any real public-sector system.
```

## Prompt 3 (EN) — Son: sonuç ve özet

```text
Design a mobile app screen (390×844, single column, vertically scrollable). App: "SE Primer" — a decision game for software engineering students set during a crisis in a fictional e-prescription system. This is the game's END screen: it shows the outcome of the three decisions, a summary of the decisions, and a lesson specific to the player's role. It should feel like an end-of-shift report / incident postmortem. This design is the BAD ending variant.

SHARED STYLE (identical on every screen):
- Atmosphere: a night-duty pharmacy counter, an on-call monitoring screen and a log terminal feel. Serious, professional, calm but tense. Not playful, not colorful, not cartoonish. No emoji. No photos of medicine boxes and no real brands.
- Colors: background dark navy #0B1B33; card/panel surface #13294B; selected card and bottom sheet #1C3A66; borders and dividers #2A4A7A; single accent color orange #F28C28 (primary button, selected state, timer, badges, status dot); text on orange #0B1B33; primary text #F2F5FA; secondary text #9FB0C8; success green #2FB67C and danger red #E5484D are used ONLY on the result screen.
- Typography: Inter. Screen title 24px/700, section title 17px/600, body 15px/400, labels 13px/500 uppercase with slight letter spacing. Clock, timer, status strip and log lines use JetBrains Mono.
- Components: cards with 12px corner radius, 1px #2A4A7A border, no shadows (flat, dark surfaces). Primary button full width, 52px tall, orange fill, 12px radius. Selectable options are cards; the selected one has a 2px orange border and an orange checkmark on the right. Touch targets at least 48px. 16px side padding, 24px spacing between blocks.
- Top bar: on the left a small orange plus/cross (pharmacy) line icon and the text "SE Primer"; on the right the time "08:30" in JetBrains Mono (secondary text color). Directly below the top bar, a thin on-call status strip: JetBrains Mono 12px, a blinking orange dot + "ReçeteKöprü · DURUM: KESİNTİ".
- ALL visible UI text must be in Turkish, exactly as written in quotes below. Do not translate it.

SCREEN CONTENT:
1. Top bar (shared style), except the clock shows "10:45" and the status strip has a red (#E5484D) dot with the text "ReçeteKöprü · DURUM: İKİNCİ KESİNTİ".
2. RESULT HEADER card: full width, surface #13294B, a 4px danger-red (#E5484D) stripe across the top. Inside: a red warning icon, label "NÖBET SONU", large title "Kötü son", subtext: "ReçeteKöprü 10:45'te ikinci kez çöktü ve ilaç ile tanı bilgisi içeren reçete logları ekip kanalına sızdı."
3. REASONS: below the header, two small red-outlined rows (full-width rows, not chips):
   - "İkinci çöküş — canlıda yama + testsiz yayın; insülin bekleyen hastaların bir kısmı ilaçsız döndü"
   - "KVKK ihlali — ilaç ve tanı kodu içeren log maskelenmeden 40 kişiye gönderildi"
4. DECISION SUMMARY: section title "Kararların". A 3-row vertical list; each row has a number circle on the left, the decision name and chosen option in the middle, and a small status dot on the right (risky = orange dot, safe = green dot). The first row is highlighted with an "ODAK" badge (2px orange left border):
   - "1 · Mimari — Canlıda yama" — orange dot — "ODAK" badge
   - "2 · Test — Hemen yayına al" — orange dot, with a small secondary label below: "(süre doldu)"
   - "3 · KVKK — Olduğu gibi gönderildi" — orange dot
   Under each row, a one-line "why" summary in secondary text.
5. ROLE LESSON card: surface #1C3A66, an orange icon on the left (book or target), label "ROLÜN İÇİN DERS · BACKEND GELİŞTİRİCİ", text: "Belirtiyi değil kökü düzelt: zaman aşımını kısaltıp güvenlik kontrolünü atlanabilir yapmak çöküşü yalnızca erteler, üstüne hasta güvenliğini riske atar."
6. Small link: "Tutor ile bu sonucu konuş" (orange text, question-mark icon).
7. Sticky primary button at the bottom: "Yeniden oyna" (orange).

Do not use any real person's or patient's name, or the name of any real public-sector system.
```

### Prompt 3b (EN) — İYİ son varyantı (Prompt 3'ün ardından aynı sohbette gönderin)

```text
Create the GOOD ending variant of the same screen. Keep the shared style, layout and components exactly the same; change only the following:
- The clock in the top bar shows "12:00"; the status strip has a green (#2FB67C) dot with the text "ReçeteKöprü · DURUM: STABİL".
- In the result header card, the top stripe and the icon use success green #2FB67C; the icon is a checkmark; the title is "İyi son"; the subtext is: "ReçeteKöprü öğlene kadar stabil kaldı. Kuyruktaki reçeteler karşılandı, kronik hastalar ilaçlarını aldı ve hiçbir sağlık verisi paylaşılmadı."
- Remove the REASONS section.
- Decision summary: "1 · Mimari — Geri dön", "2 · Test — Kısa test", "3 · KVKK — Maskelendi"; all three with green dots. Keep the ODAK badge on the first row.
- Role lesson text: "Geri dönüş yolu bir güvenlik ağıdır: önce bilinen sağlam duruma dön, kökü sakin ortamda çöz."
- All visible UI text stays in Turkish.
```
