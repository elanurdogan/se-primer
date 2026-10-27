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

Tipografi: **Inter** (başlık 600–700, gövde 400). Saat, sayaç ve log satırlarında **JetBrains Mono** kullanılır.

---

## Prompt 1 — Giriş: 3 soru

```text
Mobil uygulama ekranı tasarla (390×844, tek sütun, dikey kaydırmalı). Uygulama: "SE Primer" — yazılım mühendisliği öğrencileri için hastane randevu sistemi krizi üzerine kurulu bir karar oyunu. Bu ekran, oyun başlamadan önce oyuncuyu tanımak için 3 soru soran profil ekranı.

ORTAK STİL (tüm ekranlarda aynı):
- Ton: ciddi, profesyonel, hastane nöbet odası / gece vardiyası atmosferi. Oyuncak gibi, renkli veya çizgi film tarzı değil. Emoji yok.
- Renkler: arka plan koyu lacivert #0B1B33; kart/panel yüzeyi #13294B; seçili kart ve alt sayfa #1C3A66; kenarlık ve ayırıcı #2A4A7A; tek vurgu rengi turuncu #F28C28 (birincil buton, seçili durum, sayaç, rozetler); turuncu üstündeki metin #0B1B33; ana metin #F2F5FA; ikincil metin #9FB0C8; başarı yeşili #2FB67C ve tehlike kırmızısı #E5484D yalnızca sonuç ekranında.
- Tipografi: Inter. Ekran başlığı 24px/700, bölüm başlığı 17px/600, gövde 15px/400, etiket 13px/500 büyük harf ve hafif harf aralığı. Saat, sayaç ve log satırları JetBrains Mono.
- Bileşenler: kartlar 12px köşe yarıçapı, 1px #2A4A7A kenarlık, gölge yok (düz, koyu yüzeyler). Birincil buton tam genişlik, 52px yükseklik, turuncu dolgu, 12px yarıçap. Seçilebilir seçenekler kart biçiminde; seçili olanda 2px turuncu kenarlık ve sağda turuncu onay işareti. Dokunma alanları en az 48px. Yan boşluk 16px, bloklar arası 24px.
- Üst bar: solda küçük turuncu nabız/EKG çizgisi ikonu ve "SE Primer" yazısı, sağda JetBrains Mono ile "08:00" saati (ikincil metin rengi).
- Tüm arayüz metinleri Türkçe.

EKRAN İÇERİĞİ:
1. Üst bar (ortak stil).
2. Etiket "NÖBET ÖNCESİ" (turuncu, büyük harf), altında başlık "Seni tanıyalım", altında ikincil metin: "Cevapların oyunu sana göre ayarlar. Hiçbir yere kaydedilmez."
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
7. Alta sabitlenmiş (sticky) birincil buton "Nöbete başla". Üçüncü soru cevaplanmadığı için PASİF durumda: %40 opaklık, altında ikincil metin "3 sorunun hepsini cevapla".

Gerçek kişi adı kullanma.
```

---

## Prompt 2 — Sahne: karar ekranı

```text
Mobil uygulama ekranı tasarla (390×844, tek sütun). Uygulama: "SE Primer" — yazılım mühendisliği öğrencileri için hastane randevu sistemi krizi üzerine kurulu bir karar oyunu. Bu ekran oyunun ana sahnesi: oyuncu bir kriz anında iki seçenekten birini seçer. Ekranın alt kısmında AI tutor paneli AÇIK durumda (alt sayfa / bottom sheet) gösterilsin.

ORTAK STİL (tüm ekranlarda aynı):
- Ton: ciddi, profesyonel, hastane nöbet odası / gece vardiyası atmosferi. Oyuncak gibi, renkli veya çizgi film tarzı değil. Emoji yok.
- Renkler: arka plan koyu lacivert #0B1B33; kart/panel yüzeyi #13294B; seçili kart ve alt sayfa #1C3A66; kenarlık ve ayırıcı #2A4A7A; tek vurgu rengi turuncu #F28C28 (birincil buton, seçili durum, sayaç, rozetler); turuncu üstündeki metin #0B1B33; ana metin #F2F5FA; ikincil metin #9FB0C8; başarı yeşili #2FB67C ve tehlike kırmızısı #E5484D yalnızca sonuç ekranında.
- Tipografi: Inter. Ekran başlığı 24px/700, bölüm başlığı 17px/600, gövde 15px/400, etiket 13px/500 büyük harf ve hafif harf aralığı. Saat, sayaç ve log satırları JetBrains Mono.
- Bileşenler: kartlar 12px köşe yarıçapı, 1px #2A4A7A kenarlık, gölge yok (düz, koyu yüzeyler). Birincil buton tam genişlik, 52px yükseklik, turuncu dolgu, 12px yarıçap. Seçilebilir seçenekler kart biçiminde; seçili olanda 2px turuncu kenarlık ve sağda turuncu onay işareti. Dokunma alanları en az 48px. Yan boşluk 16px, bloklar arası 24px.
- Üst bar: solda küçük turuncu nabız/EKG çizgisi ikonu ve "SE Primer" yazısı, sağda JetBrains Mono ile "08:00" saati (ikincil metin rengi).
- Tüm arayüz metinleri Türkçe.

EKRAN İÇERİĞİ (yukarıdan aşağıya):
1. Üst bar (ortak stil). Altında "Karar 1 / 3" yazısı ve 3 parçalı ilerleme çubuğu (ilk parça turuncu).
2. SAYAÇ ALANI: sağ üstte, karar başlığının hizasında yuvarlak hatlı bir hap (pill): turuncu ince halka biçiminde geri sayım göstergesi ve içinde JetBrains Mono "0:42". Küçük etiket "kalan süre". (Bu alan yalnızca deneyimli oyuncularda görünür; tasarımda görünür hali çizilsin.)
3. Rozetler: turuncu dolgulu küçük rozet "ODAK KARAR" ve yanında kenarlıklı rozet "MİMARİ".
4. Başlık: "Sistemi nasıl ayağa kaldırırsın?"
5. KRİZ METNİ kartı (yüzey #13294B, solunda 3px turuncu dikey şerit):
   "08:00. Gece 02:00'de yayına alınan v2.4 sürümü veritabanı bağlantılarını kapatmıyor. Bağlantı havuzu doldu, randevu ekranı hata veriyor. Poliklinikler açıldı: 300 hasta bekliyor."
   Kartın altında ikincil metinle küçük bir istatistik satırı: "Bekleyen hasta: 300 · Hata oranı: %100".
6. ROL KARTI (daha küçük, kenarlıklı): etiket "ROLÜN: BACKEND GELİŞTİRİCİ", içinde JetBrains Mono log satırı: "ConnectionPool exhausted (50/50)".
7. İPUCU KARTI: yüzey #13294B, solda turuncu ampul ikonu, etiket "İPUCU", metin: "İki seçeneği 'ne kadar hızlı' sorusuyla değil, 'işler yine bozulursa nereye dönebilirim?' sorusuyla karşılaştır." (Bu kart yalnızca yeni başlayan oyunculara gösterilir; tasarımda görünür hali çizilsin.)
8. İKİ SEÇENEK BUTONU: alt alta, eşit boyutlu, büyük kart-buton. Hiçbiri seçili değil, ikisi de görsel olarak eşit ağırlıkta olsun (hiçbiri "doğru cevap" gibi görünmemeli, renkle ayrıştırma yok):
   - "A · Geri dön" — alt satır: "v2.3 sürümüne rollback"
   - "B · Canlıda yama" — alt satır: "Havuz limitini elle artır"
9. TUTOR PANELİ (alt sayfa, açık, ekranın alt ~%40'ı, yüzey #1C3A66, üstte tutamaç çizgisi, üst köşeler 20px yarıçap):
   - Başlık satırı: solda turuncu küçük daire içinde soru işareti ikonu, "Tutor", altında ikincil metin "Cevabı söylemez, düşünmeni sağlar."; sağda kapat (X) ikonu.
   - Mesajlar: sağa yaslı oyuncu balonu (yüzey #13294B): "Hangisini seçmeliyim?"; sola yaslı tutor balonu (kenarlıklı): "İkisinin de bir bedeli var. Sistem yine bozulursa, her iki yolda da dönebileceğin sağlam bir nokta kalıyor mu?"
   - En altta mesaj giriş alanı ("Tutor'a sor…" yer tutucu metni) ve sağında turuncu gönder butonu (ok ikonu).

Gerçek kişi veya hasta adı kullanma.
```

---

## Prompt 3 — Son: sonuç ve özet

```text
Mobil uygulama ekranı tasarla (390×844, tek sütun, dikey kaydırmalı). Uygulama: "SE Primer" — yazılım mühendisliği öğrencileri için hastane randevu sistemi krizi üzerine kurulu bir karar oyunu. Bu ekran oyunun SON ekranı: üç kararın sonucunu, kararların özetini ve oyuncunun rolüne özel bir dersi gösterir. Bu tasarım KÖTÜ son varyantıdır.

ORTAK STİL (tüm ekranlarda aynı):
- Ton: ciddi, profesyonel, hastane nöbet odası / gece vardiyası atmosferi. Oyuncak gibi, renkli veya çizgi film tarzı değil. Emoji yok.
- Renkler: arka plan koyu lacivert #0B1B33; kart/panel yüzeyi #13294B; seçili kart ve alt sayfa #1C3A66; kenarlık ve ayırıcı #2A4A7A; tek vurgu rengi turuncu #F28C28 (birincil buton, seçili durum, sayaç, rozetler); turuncu üstündeki metin #0B1B33; ana metin #F2F5FA; ikincil metin #9FB0C8; başarı yeşili #2FB67C ve tehlike kırmızısı #E5484D yalnızca sonuç ekranında.
- Tipografi: Inter. Ekran başlığı 24px/700, bölüm başlığı 17px/600, gövde 15px/400, etiket 13px/500 büyük harf ve hafif harf aralığı. Saat, sayaç ve log satırları JetBrains Mono.
- Bileşenler: kartlar 12px köşe yarıçapı, 1px #2A4A7A kenarlık, gölge yok (düz, koyu yüzeyler). Birincil buton tam genişlik, 52px yükseklik, turuncu dolgu, 12px yarıçap. Seçilebilir seçenekler kart biçiminde; seçili olanda 2px turuncu kenarlık ve sağda turuncu onay işareti. Dokunma alanları en az 48px. Yan boşluk 16px, bloklar arası 24px.
- Üst bar: solda küçük turuncu nabız/EKG çizgisi ikonu ve "SE Primer" yazısı, sağda JetBrains Mono ile "08:00" saati (ikincil metin rengi).
- Tüm arayüz metinleri Türkçe.

EKRAN İÇERİĞİ:
1. Üst bar (ortak stil), ancak saat "10:30" gösterir.
2. SONUÇ BAŞLIĞI kartı: tam genişlik, yüzey #13294B, üstte 4px tehlike kırmızısı (#E5484D) şerit. İçinde kırmızı uyarı ikonu, etiket "SONUÇ", büyük başlık "Kötü son", alt metin: "Sistem 10:30'da ikinci kez çöktü ve hasta verisi ekip kanalına sızdı."
3. NEDENLER: başlığın altında iki küçük kırmızı kenarlıklı satır (chip değil, tam genişlik satır):
   - "İkinci çöküş — canlıda yama + testsiz yayın"
   - "KVKK ihlali — log maskelenmeden 40 kişiye gönderildi"
4. KARARLARIN ÖZETİ: bölüm başlığı "Kararların". 3 satırlık dikey liste; her satır: solda numara dairesi, ortada karar adı ve seçilen seçenek, sağda küçük durum noktası (riskli = turuncu nokta, güvenli = yeşil nokta). İlk satır "ODAK" rozetiyle vurgulu (2px turuncu sol kenarlık):
   - "1 · Mimari — Canlıda yama" — turuncu nokta — "ODAK" rozeti
   - "2 · Test — Hemen yayına al" — turuncu nokta, altında küçük ikincil etiket "(süre doldu)"
   - "3 · KVKK — Olduğu gibi gönderildi" — turuncu nokta
   Her satırın altında ikincil metinle tek satırlık "neden" özeti.
5. ROLÜN İÇİN DERS kartı: yüzey #1C3A66, solda turuncu ikon (kitap veya hedef), etiket "ROLÜN İÇİN DERS · BACKEND GELİŞTİRİCİ", metin: "Belirtiyi değil kökü düzelt: havuz limitini büyütmek bağlantıları kapatmayan kodu düzeltmez, yalnızca çöküşü erteler."
6. Küçük bağlantı: "Tutor ile bu sonucu konuş" (turuncu metin, soru işareti ikonu).
7. Alta sabit birincil buton "Yeniden oyna" (turuncu).

Gerçek kişi veya hasta adı kullanma.
```

### Prompt 3b — İYİ son varyantı (Prompt 3'ün ardından aynı sohbette gönderin)

```text
Aynı ekranın İYİ son varyantını oluştur. Ortak stil, düzen ve bileşenler tamamen aynı kalsın; yalnızca şunlar değişsin:
- Üst bardaki saat "12:00".
- Sonuç başlığı kartındaki üst şerit ve ikon başarı yeşili #2FB67C; ikon onay işareti; başlık "İyi son"; alt metin: "Sistem öğlene kadar stabil kaldı, 300 hastanın randevusu işlendi, hiçbir kişisel veri paylaşılmadı."
- NEDENLER bölümü kaldırılsın.
- Kararların özeti: "1 · Mimari — Geri dön", "2 · Test — Kısa test", "3 · KVKK — Maskelendi"; üçünde de yeşil nokta. ODAK rozeti ilk satırda kalsın.
- Rolün için ders metni: "Geri dönüş yolu bir güvenlik ağıdır: önce bilinen sağlam duruma dön, kökü sakin ortamda çöz."
```

---

# İngilizce sürüm (Stitch için önerilen)

Aşağıdaki promptlar yukarıdakilerle aynı içeriği taşır. Yönergeler İngilizce, ekranda görünecek metinler Türkçedir. Stitch Türkçe yönergeleri yanlış yorumlarsa bu sürümü kullanın.

## Prompt 1 (EN) — Giriş: 3 soru

```text
Design a mobile app screen (390×844, single column, vertically scrollable). App: "SE Primer" — a decision game for software engineering students set during a hospital appointment-system crisis. This screen is the profile screen shown before the game starts; it asks the player 3 questions to personalize the game.

SHARED STYLE (identical on every screen):
- Tone: serious, professional, hospital on-call room / night-shift atmosphere. Not playful, not colorful, not cartoonish. No emoji.
- Colors: background dark navy #0B1B33; card/panel surface #13294B; selected card and bottom sheet #1C3A66; borders and dividers #2A4A7A; single accent color orange #F28C28 (primary button, selected state, timer, badges); text on orange #0B1B33; primary text #F2F5FA; secondary text #9FB0C8; success green #2FB67C and danger red #E5484D are used ONLY on the result screen.
- Typography: Inter. Screen title 24px/700, section title 17px/600, body 15px/400, labels 13px/500 uppercase with slight letter spacing. Clock, timer and log lines use JetBrains Mono.
- Components: cards with 12px corner radius, 1px #2A4A7A border, no shadows (flat, dark surfaces). Primary button full width, 52px tall, orange fill, 12px radius. Selectable options are cards; the selected one has a 2px orange border and an orange checkmark on the right. Touch targets at least 48px. 16px side padding, 24px spacing between blocks.
- Top bar: on the left a small orange pulse/ECG line icon and the text "SE Primer"; on the right the time "08:00" in JetBrains Mono (secondary text color).
- ALL visible UI text must be in Turkish, exactly as written in quotes below. Do not translate it.

SCREEN CONTENT:
1. Top bar (shared style).
2. Orange uppercase label "NÖBET ÖNCESİ", below it the title "Seni tanıyalım", below that secondary text: "Cevapların oyunu sana göre ayarlar. Hiçbir yere kaydedilmez."
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
7. Sticky primary button at the bottom: "Nöbete başla". It is in the DISABLED state because question 3 is unanswered: 40% opacity, with secondary helper text below it: "3 sorunun hepsini cevapla".

Do not use any real person's name.
```

## Prompt 2 (EN) — Sahne: karar ekranı

```text
Design a mobile app screen (390×844, single column). App: "SE Primer" — a decision game for software engineering students set during a hospital appointment-system crisis. This screen is the main game scene: during a crisis the player chooses one of two options. Show the AI tutor panel in its OPEN state as a bottom sheet in the lower part of the screen.

SHARED STYLE (identical on every screen):
- Tone: serious, professional, hospital on-call room / night-shift atmosphere. Not playful, not colorful, not cartoonish. No emoji.
- Colors: background dark navy #0B1B33; card/panel surface #13294B; selected card and bottom sheet #1C3A66; borders and dividers #2A4A7A; single accent color orange #F28C28 (primary button, selected state, timer, badges); text on orange #0B1B33; primary text #F2F5FA; secondary text #9FB0C8; success green #2FB67C and danger red #E5484D are used ONLY on the result screen.
- Typography: Inter. Screen title 24px/700, section title 17px/600, body 15px/400, labels 13px/500 uppercase with slight letter spacing. Clock, timer and log lines use JetBrains Mono.
- Components: cards with 12px corner radius, 1px #2A4A7A border, no shadows (flat, dark surfaces). Primary button full width, 52px tall, orange fill, 12px radius. Selectable options are cards; the selected one has a 2px orange border and an orange checkmark on the right. Touch targets at least 48px. 16px side padding, 24px spacing between blocks.
- Top bar: on the left a small orange pulse/ECG line icon and the text "SE Primer"; on the right the time "08:00" in JetBrains Mono (secondary text color).
- ALL visible UI text must be in Turkish, exactly as written in quotes below. Do not translate it.

SCREEN CONTENT (top to bottom):
1. Top bar (shared style). Below it the text "Karar 1 / 3" and a 3-segment progress bar (first segment orange).
2. TIMER AREA: top right, aligned with the decision title, a rounded pill containing a thin orange ring-style countdown indicator with "0:42" inside in JetBrains Mono, and a small label "kalan süre". (In the game this only appears for experienced players; draw it in its visible state.)
3. Badges: a small orange-filled badge "ODAK KARAR" and next to it an outlined badge "MİMARİ".
4. Title: "Sistemi nasıl ayağa kaldırırsın?"
5. CRISIS TEXT card (surface #13294B, 3px vertical orange stripe on the left):
   "08:00. Gece 02:00'de yayına alınan v2.4 sürümü veritabanı bağlantılarını kapatmıyor. Bağlantı havuzu doldu, randevu ekranı hata veriyor. Poliklinikler açıldı: 300 hasta bekliyor."
   Below the card, a small stats line in secondary text: "Bekleyen hasta: 300 · Hata oranı: %100".
6. ROLE CARD (smaller, outlined): label "ROLÜN: BACKEND GELİŞTİRİCİ", containing a JetBrains Mono log line: "ConnectionPool exhausted (50/50)".
7. HINT CARD: surface #13294B, an orange lightbulb icon on the left, label "İPUCU", text: "İki seçeneği 'ne kadar hızlı' sorusuyla değil, 'işler yine bozulursa nereye dönebilirim?' sorusuyla karşılaştır." (In the game this only appears for beginner players; draw it in its visible state.)
8. TWO OPTION BUTTONS: stacked, equal size, large card-buttons. Neither is selected, and both must carry exactly equal visual weight (neither should look like "the right answer"; no color differentiation):
   - "A · Geri dön" — second line: "v2.3 sürümüne rollback"
   - "B · Canlıda yama" — second line: "Havuz limitini elle artır"
9. TUTOR PANEL (open bottom sheet, about the lower 40% of the screen, surface #1C3A66, drag handle at the top, 20px radius on the top corners):
   - Header row: on the left a small orange circle with a question-mark icon, the title "Tutor", and below it secondary text "Cevabı söylemez, düşünmeni sağlar."; on the right a close (X) icon.
   - Messages: a right-aligned player bubble (surface #13294B): "Hangisini seçmeliyim?"; a left-aligned outlined tutor bubble: "İkisinin de bir bedeli var. Sistem yine bozulursa, her iki yolda da dönebileceğin sağlam bir nokta kalıyor mu?"
   - At the very bottom, a message input with placeholder "Tutor'a sor…" and an orange send button with an arrow icon on its right.

Do not use any real person's or patient's name.
```

## Prompt 3 (EN) — Son: sonuç ve özet

```text
Design a mobile app screen (390×844, single column, vertically scrollable). App: "SE Primer" — a decision game for software engineering students set during a hospital appointment-system crisis. This is the game's END screen: it shows the outcome of the three decisions, a summary of the decisions, and a lesson specific to the player's role. This design is the BAD ending variant.

SHARED STYLE (identical on every screen):
- Tone: serious, professional, hospital on-call room / night-shift atmosphere. Not playful, not colorful, not cartoonish. No emoji.
- Colors: background dark navy #0B1B33; card/panel surface #13294B; selected card and bottom sheet #1C3A66; borders and dividers #2A4A7A; single accent color orange #F28C28 (primary button, selected state, timer, badges); text on orange #0B1B33; primary text #F2F5FA; secondary text #9FB0C8; success green #2FB67C and danger red #E5484D are used ONLY on the result screen.
- Typography: Inter. Screen title 24px/700, section title 17px/600, body 15px/400, labels 13px/500 uppercase with slight letter spacing. Clock, timer and log lines use JetBrains Mono.
- Components: cards with 12px corner radius, 1px #2A4A7A border, no shadows (flat, dark surfaces). Primary button full width, 52px tall, orange fill, 12px radius. Selectable options are cards; the selected one has a 2px orange border and an orange checkmark on the right. Touch targets at least 48px. 16px side padding, 24px spacing between blocks.
- Top bar: on the left a small orange pulse/ECG line icon and the text "SE Primer"; on the right the time "08:00" in JetBrains Mono (secondary text color).
- ALL visible UI text must be in Turkish, exactly as written in quotes below. Do not translate it.

SCREEN CONTENT:
1. Top bar (shared style), except the clock shows "10:30".
2. RESULT HEADER card: full width, surface #13294B, a 4px danger-red (#E5484D) stripe across the top. Inside: a red warning icon, label "SONUÇ", large title "Kötü son", subtext: "Sistem 10:30'da ikinci kez çöktü ve hasta verisi ekip kanalına sızdı."
3. REASONS: below the header, two small red-outlined rows (full-width rows, not chips):
   - "İkinci çöküş — canlıda yama + testsiz yayın"
   - "KVKK ihlali — log maskelenmeden 40 kişiye gönderildi"
4. DECISION SUMMARY: section title "Kararların". A 3-row vertical list; each row has a number circle on the left, the decision name and chosen option in the middle, and a small status dot on the right (risky = orange dot, safe = green dot). The first row is highlighted with an "ODAK" badge (2px orange left border):
   - "1 · Mimari — Canlıda yama" — orange dot — "ODAK" badge
   - "2 · Test — Hemen yayına al" — orange dot, with a small secondary label below: "(süre doldu)"
   - "3 · KVKK — Olduğu gibi gönderildi" — orange dot
   Under each row, a one-line "why" summary in secondary text.
5. ROLE LESSON card: surface #1C3A66, an orange icon on the left (book or target), label "ROLÜN İÇİN DERS · BACKEND GELİŞTİRİCİ", text: "Belirtiyi değil kökü düzelt: havuz limitini büyütmek bağlantıları kapatmayan kodu düzeltmez, yalnızca çöküşü erteler."
6. Small link: "Tutor ile bu sonucu konuş" (orange text, question-mark icon).
7. Sticky primary button at the bottom: "Yeniden oyna" (orange).

Do not use any real person's or patient's name.
```

### Prompt 3b (EN) — İYİ son varyantı (Prompt 3'ün ardından aynı sohbette gönderin)

```text
Create the GOOD ending variant of the same screen. Keep the shared style, layout and components exactly the same; change only the following:
- The clock in the top bar shows "12:00".
- In the result header card, the top stripe and the icon use success green #2FB67C; the icon is a checkmark; the title is "İyi son"; the subtext is: "Sistem öğlene kadar stabil kaldı, 300 hastanın randevusu işlendi, hiçbir kişisel veri paylaşılmadı."
- Remove the REASONS section.
- Decision summary: "1 · Mimari — Geri dön", "2 · Test — Kısa test", "3 · KVKK — Maskelendi"; all three with green dots. Keep the ODAK badge on the first row.
- Role lesson text: "Geri dönüş yolu bir güvenlik ağıdır: önce bilinen sağlam duruma dön, kökü sakin ortamda çöz."
- All visible UI text stays in Turkish.
```
