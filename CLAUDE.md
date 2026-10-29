# SE Primer — YZM301

YZM301 dersi için hazırlanan “SE Primer” ödevi: eczane / e-reçete sistemi krizi üzerine kurulu, mobilde oynanan, kişiselleştirilmiş ve seçimli bir yazılım mühendisliği oyunu.

## Senaryo

“08:30, reçete sistemi çöktü. Nöbetçi sensin.” Dün gece kurgusal reçete sorgulama servisi **ReçeteKöprü**'nün yeni sürümü yayına alındı. Eczaneler reçete numarasıyla ilaç karşılayamıyor. İnsülin ve tansiyon ilacı bekleyen kronik hastalar kapıda. Ayrıntılar `spec.md` §3'te.

Sistem ve kurum adları **kurgusaldır** (ReçeteKöprü, KSSK Provizyon Servisi). Gerçek bir kamu sistemi veya kurum adı kullanılmaz.

## Oyunun kapsamı

- **Giriş ekranı:** 3 soru — seviye, rol, hedef (oyunu kişiselleştirir).
- **Kararlar:** 3 karar — mimari, test, KVKK.
- **Sonlar:** 2 son (kararlara göre belirlenir).
- **Sokratik AI tutor:** Oyuncuya soru sorarak ve ipucu vererek yol gösterir; **cevabı asla doğrudan vermez.**

### Kapsam dışı

- Hesap / giriş (login) sistemi
- İkinci bölüm
- Gerçek hasta verisi
- Native (yerel) mobil uygulama — oyun mobil tarayıcıda çalışır

## İş akışı

1. `spec.md` — gereksinim ve oyun spesifikasyonu
2. Stitch tasarımı → `design/DESIGN.md`
3. Google AI Studio ile uygulama → `app/`
4. Tutor değerlendirmesi (20 cevap) → `eval/`
5. Cypress E2E testleri + 60 sn demo videosu → `cypress/`
6. `README.md`

## Klasör yapısı

```
se-primer/
├── CLAUDE.md
├── spec.md          # oyun spesifikasyonu
├── README.md        # (oluşturulacak)
├── design/          # Stitch çıktıları, DESIGN.md
├── app/             # Google AI Studio uygulaması
├── eval/            # Tutor eval veri seti ve etiketler
└── cypress/         # E2E testleri, demo videosu
```

## Kurallar

1. **Dil:** Tüm repo dokümanları (spec, DESIGN, README, eval notları, yorumlar dahil dokümantasyon) **Türkçe** yazılır. Harici araçlara verilen promptlar (Stitch, AI Studio vb.) bu kurala tabi değildir: yönergeleri İngilizce olabilir, ancak ekranda görünen metinler Türkçe kalır.
2. **Hasta verisi:** Gerçek hasta verisi **asla** kullanılmaz. Uydurma veriler bile maskeli olur: hasta `Hasta-001`, `Hasta-002`; reçete numarası `RX-XXXX`; TC kimlik no, ilaç ve tanı kodu `***`. Gerçekçi ad-soyad, TC kimlik no, telefon, reçete no vb. üretilmez. Bir kişiyle ilişkilendirilmiş ilaç veya tanı örneği verilmez.
3. **data-testid:** Her etkileşimli UI öğesinin (buton, input, seçenek, link, tutor giriş alanı vb.) bir `data-testid` özniteliği olur; Cypress testleri bu seçicilerle yazılır.
4. **Eval etiketlemesi:** Tutor eval’indeki 20 cevabın etiketlemesini **model yapmaz, kullanıcı yapar.** Model yalnızca etiketleme şablonunu/dosyasını hazırlayabilir; etiket alanlarını boş bırakır ve doldurmaz, tahmin önermez.

## Çalışma kuralları

- Sürüm çakışması, eksik paket, yapılandırma hatası gibi teknik engellerde model en kalıcı çözümü kendisi seçer, uygular ve özette tek satırla belirtir.
- Model yalnızca kullanıcının yapması gereken işlerde (tarayıcı, API anahtarı, eval etiketlemesi) ya da ödev kapsamını değiştiren kararlarda durup sorar.

## Notlar

- `cypress/videos/` git’e eklenmez; yalnızca final demo videosu (`cypress/videos/final-demo.mp4`) istisnadır.
- API anahtarları `.env` içinde tutulur ve commit edilmez.
