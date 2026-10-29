export const CONTENT = {
  common: {
    appName: "SE Primer",
    continue: "Devam",
    seeResult: "Sonucu gör",
    tutorOpen: "Tutor'u aç",
    tutorSend: "Gönder",
    tutorCloseAria: "Paneli kapat",
    tutorInputAria: "Mesaj giriş alanı",
    tutorError: "Tutor'a şu an ulaşılamıyor. Oyuna devam edebilirsin, birazdan tekrar dene.",
    focusBadge: "Odak karar",
    hintLabel: "İpucu",
    hintToggle: "İpucu göster",
    timeoutNote: "Süre doldu",
    timeoutTag: "(süre doldu)",
    whatTitle: "Ne oldu?",
    whyTitle: "Neden oldu?",
    deepTitle: "Derinlemesine",
    restart: "Yeniden oyna",
  },

  welcome: {
    title: "SE Primer",
    text: "Saat 08:30. Reçete sistemi çöktü. Nöbetçi sensin.",
    start: "Başla",
  },

  profile: {
    title: "Nöbetçi sensin",
    instruction: "Devam etmek için 3 sorunun hepsini cevapla",
    submit: "Nöbeti devral",
    level: {
      question: "Yazılım mühendisliğinde ne kadar deneyimlisin?",
      options: { beginner: "Yeni başladım", intermediate: "Biraz deneyimim var", experienced: "Deneyimliyim" },
    },
    role: {
      question: "Bu krizde hangi roldesin?",
      options: { backend: "Backend geliştirici", qa: "Test / QA mühendisi", pm: "Proje yöneticisi" },
    },
    goal: {
      question: "Bu oyundan en çok ne öğrenmek istiyorsun?",
      options: { architecture: "Mimari / dağıtım kararları", testing: "Test stratejisi", kvkk: "KVKK ve veri güvenliği" },
    },
  },

  briefing: {
    title: "Saat 08:30. Reçete sistemi çöktü. Nöbetçi sensin.",
    paragraphs: [
      "Dün gece 23:00'te kurgusal reçete sorgulama servisi ReçeteKöprü'nün v3.2 sürümü yayına alındı. Bu sürümde iki yenilik var:",
      "• Reçete sorgusu artık kurgusal sigorta kurumu KSSK'nin Provizyon Servisi'ne yeni bir API üzerinden bağlanıyor.\n• Her sorguda ilaç etkileşim kontrolü yapılıyor.",
      "v3.2'deki hata şu: Provizyon Servisi'ne yapılan çağrıda zaman aşımı 30 saniye ve yavaş yanıtlarda bağlantılar kapatılmıyor. Sabah eczaneler açılınca Provizyon Servisi yavaşladı. Bu sırada eczane yazılımlarının iki davranışı durumu ağırlaştırdı:",
      "• Tekrar deneme: Eczane yazılımı başarısız bir sorguyu hemen 3 kez tekrar deniyor.\n• Önbellek: Hata yanıtını 5 dakika önbellekte tutuyor.",
      "Tekrar denemeler yükü katladı ve ReçeteKöprü'nün iş parçacığı havuzu doldu. Servis artık 503 dönüyor.",
      "Sonuç: İl genelinde 142 eczane reçete numarasıyla ilaç karşılayamıyor ve kuyrukta 1.240 reçete var. İnsülin ve tansiyon ilacı bekleyen kronik hastalar kapıda.",
    ],
    roleMessage: {
      backend: { speaker: "Nöbetçi DevOps", text: "ReçeteKöprü 503 dönüyor, iş parçacığı havuzu tamamen dolu." },
      qa: { speaker: "QA lideri", text: "Staging hazır, provizyon gecikme simülasyonu 20 dk sürer." },
      pm: { speaker: "Bölge eczane koordinatörü", text: "Kapıda insülin bekleyen hastalar var, sistem ne zaman açılıyor?" },
    },
  },

  decisions: {
    K1: {
      category: "Mimari",
      title: "ReçeteKöprü'yü nasıl ayağa kaldırırsın?",
      context: "",
      hint: "İki seçeneği 'ne kadar hızlı' sorusuyla değil, 'işler yine bozulursa nereye dönebilirim?' sorusuyla karşılaştır.",
      roleCard: {
        backend: "Log satırı: ProvizyonClient timeout=30s · threadPool 200/200 busy",
        qa: "v3.2 regresyon kapsamı: %58. Provizyon zaman aşımı senaryosu hiç test edilmemiş.",
        pm: "Tahmini süreler: geri dön 15 dk / yama 5 dk",
      },
      options: {
        A: {
          id: "rollback", value: "geri",
          label: "Geri dön", detail: "v3.1'e rollback",
          what: "15 dakikada ReçeteKöprü bir önceki kararlı sürüm olan v3.1'e döndü ve sorgular yeniden yanıt vermeye başladı. Eczane yazılımları hata yanıtını 5 dakika önbellekte tuttuğu için bazı eczaneler ancak 20. dakikada toparlandı. v3.2'nin yeni provizyon entegrasyonu geçici olarak devre dışı kaldı. Etkileşim kontrolü v3.1'deki temel kurallarla çalışmaya devam etti.",
          why: "Bilinen sağlam bir sürüme dönmek hatayı ortadan kaldırmanın en düşük riskli yoludur. Kök neden artık hastalar kapıda beklerken değil, sakin bir ortamda incelenebilir. Bedeli birkaç dakika daha geç açılmak, yeni özelliğin kaybı ve istemci önbelleğinin toparlanmayı geciktirmesidir.",
        },
        B: {
          id: "hotfix", value: "yama",
          label: "Canlıda yama", detail: "zaman aşımını kısalt, kontrolü atlanabilir yap",
          what: "5 dakikada Provizyon Servisi çağrısının zaman aşımı canlı ortamda elle 30 sn'den 2 sn'ye indirildi. İlaç etkileşim kontrolü \"hata olursa atla\" moduna alındı. Sorgular hızla dönmeye başladı. Ancak Provizyon Servisi yavaş kaldıkça reçetelerin bir kısmı etkileşim kontrolü yapılmadan karşılandı ve eczacının ekranında bunu belirten bir uyarı çıkmadı.",
          why: "Belirti tedavi edildi, kök neden (kapatılmayan bağlantılar, tekrar deneme yükü) yerinde duruyor. Üstelik güvenlik kontrolü fail-open yapıldı: bağımlı servis yanıt vermediğinde kontrol sessizce atlanıyor. Bu yüzden riskli bir ilaç kombinasyonu uyarısız verilebilir. Canlıda test edilmemiş, kayıt altına alınmamış bir değişiklik yapıldı ve artık \"bilinen sağlam durum\" da yok.",
        },
      },
      riskyOption: "B",
      timeout: {
        what: "Karar gelmeyince Nöbetçi DevOps beklemeden zaman aşımını kısalttı ve etkileşim kontrolünü atlanabilir yaptı.",
        why: "Krizde karar vermemek de bir karardır. Boşluğu en hızlı görünen çözüm doldurur.",
      },
      deep: [
        "Rollback ile roll-forward karşılaştırması",
        "Fail-open ile fail-closed farkı",
      ],
    },

    K2: {
      category: "Test",
      title: "Kalıcı düzeltme (v3.2.1) hazır. Ne yaparsın?",
      context: "Düzeltme şunları içeriyor: 2 sn zaman aşımı, Provizyon Servisi için devre kesici (circuit breaker), bağlantıların her durumda kapatılması.",
      hint: "Düzeltmenin dokunduğu akışları say. Hangilerini gerçekten denedin?",
      roleCard: {
        backend: "Düzeltmenin diff özeti: zaman aşımı 2 sn + devre kesici + bağlantı kapatma, 4 dosya, 57 satır",
        qa: "Hazır test senaryoları: reçete sorgu / provizyon yavaş yanıt / etkileşim uyarısı",
        pm: "Gecikme maliyeti: dakikada ~40 reçete kuyruğa ekleniyor",
      },
      options: {
        A: {
          id: "test", value: "test",
          label: "Kısa test", detail: "staging'de 20 dk hedefli test: provizyon yavaş yanıt simülasyonu + yük",
          what: "Test bir uç durumu yakaladı. Provizyon Servisi yavaşlayıp devre kesici açıldığında, etkileşim kontrolü sessizce atlanıyordu (fail-open). Kod düzeltildi: devre kesici açıkken reçete \"etkileşim kontrolü yapılamadı\" uyarısıyla eczacıya gösteriliyor ve eczacı onaylamadan ilaç verilmiyor (fail-closed). v3.2.1 sorunsuz yayına alındı.",
          why: "Bağımlı servisin yavaşladığı durumu taklit eden kısa ama hedefli bir test, kriz anında bile regresyonu yakalar. 20 dakikalık gecikme, ikinci bir çöküşten ve uyarısız verilen bir ilaçtan çok daha ucuzdur.",
        },
        B: {
          id: "ship", value: "hemen",
          label: "Hemen yayına al", detail: "",
          whatByK1: {
            geri: "v3.2.1 testsiz yayına alındı. Devre kesici açıldığında etkileşim kontrolünün atlandığı 40 dakika sonra izleme alarmıyla fark edildi. Ekip, az önce denediği geri dönüş adımıyla 3 dakikada tekrar v3.1'e döndü. Bu aralıkta kontrolsüz karşılanan reçeteler listelendi ve eczacılar tarafından elle gözden geçirildi. Hiçbir hasta zarar görmedi.",
            yama: "v3.2.1 testsiz yayına alındı. Yeni sürümün devre kesici ayarları, canlıda elle değiştirilmiş zaman aşımı ayarıyla çakıştı. Devre kesici sürekli açılıp kapandı ve eczane yazılımlarının tekrar denemeleri bir tekrar deneme fırtınasına dönüştü. 10:45'te ReçeteKöprü ikinci kez çöktü. Önce hata önbelleği, sonra kapanan mesai yüzünden insülin ve tansiyon ilacı bekleyen kronik hastaların bir kısmı ilaçsız eve döndü.",
          },
          why: "Baskı altında test atlamak, gözden kaçan uç durumları doğrudan canlıya taşır. Bunun bedelini, elinde bir güvenlik ağı (temiz geri dönüş yolu) olup olmadığı belirler. Elle yapılmış canlı değişiklikler, yeni sürümün varsayımlarını sessizce bozar.",
        },
      },
      riskyOption: "B",
      timeout: {
        what: "Karar gelmeyince baskı altındaki ekip düzeltmeyi doğrudan yayına aldı.",
        why: "",
      },
      deep: [
        "Risk tabanlı test",
        "Bağımlı servis yavaşlığının simülasyonu",
        "Devre kesici (circuit breaker)",
      ],
    },

    K3: {
      category: "KVKK",
      title: "Hata analizi için ReçeteKöprü log dosyası ekip kanalına gönderilecek.",
      context: "Kanalda eczane yazılımı tedarikçisi dahil 40 kişi var. Logda hastanın adı, TC kimlik numarası, reçetedeki ilaç ve tanı kodu bulunuyor.",
      hint: "Hatayı analiz etmek için logdaki hangi alanlara gerçekten ihtiyaç var?",
      roleCard: {
        backend: "Log örneği: hasta=Hasta-001 tc=*** rx=RX-XXXX ilac=*** tani=*** hata=PROVIZYON_TIMEOUT",
        qa: "Test verisi politikası: \"yalnızca sentetik reçete (RX-XXXX)\"",
        pm: "Paydaşlar: log kanalında eczane yazılımı tedarikçisi dahil 40 kişi",
      },
      options: {
        A: {
          id: "mask", value: "maske",
          label: "Maskele, sonra gönder", detail: "",
          what: "Hazır bir betikle log 10 dakikada maskelendi:\n• hasta adı → Hasta-001\n• reçete numarası → RX-XXXX\n• TC kimlik no, ilaç ve tanı kodu → ***\nİstek kimliği, zaman damgası, uç nokta ve hata kodu korundu. Ekip, tekrar deneme fırtınasını bu alanlarla analiz etti. Hiçbir sağlık verisi paylaşılmadı.",
          why: "Hata analizi için kimin hangi ilacı kullandığı değil, hangi isteğin nerede takıldığı gerekir. KVKK'nın veri minimizasyonu ilkesine göre amaç için gerekmeyen veri paylaşılmaz. Adı silmek tek başına yetmez, çünkü TC no, ilaç ve tanı kodu birlikte kişiyi yine tanımlar ve sağlık durumunu açığa çıkarır.",
        },
        B: {
          id: "raw", value: "ham",
          label: "Ekibe olduğu gibi at", detail: "",
          what: "Analiz 10 dakika erken başladı. Ama hastaların adı, TC kimlik numarası, kullandıkları ilaçlar ve tanı kodları, dış tedarikçi dahil 40 kişiye gitti. Örneğin bir insülin reçetesi, kişinin diyabet hastası olduğunu doğrudan açığa çıkarıyor. Kurumun veri sorumlusu ihlali KVK Kurulu'na bildirmek zorunda kaldı.",
          why: "İlaç ve tanı bilgisi sağlık verisidir. Sağlık verisi KVKK'ya göre özel nitelikli kişisel veridir (md. 6). İşlenmesi ve aktarılması sıkı koşullara bağlıdır. Amaç için gerekli olmayan bir paylaşım ihlaldir ve \"acil durumdu\" gerekçesi bunu meşru kılmaz.",
        },
      },
      riskyOption: "B",
      timeout: {
        what: "Karar gelmeyince ekipten biri beklemeden logu kanala attı.",
        why: "",
      },
      deep: [
        "Veri minimizasyonu",
        "Özel nitelikli kişisel veri",
        "Takma adlandırma (pseudonymization)",
      ],
    },
  },

  endings: {
    goodTitle: "İyi son",
    badTitle: "Kötü son",
    summaryTitle: "Karar özeti",
    roleLessonTitle: "Rolün için ders",
    good: "ReçeteKöprü öğlene kadar stabil kaldı. Kuyruktaki reçeteler karşılandı, kronik hastalar ilaçlarını aldı ve hiçbir sağlık verisi paylaşılmadı.",
    closeCall: {
      geriHemen: "Kıl payı: geri dönüş yolu kurtardı, kontrolsüz reçeteler elle gözden geçirildi",
      yamaTest: "Kıl payı: test fail-open hatasını yakaladı, yama süresince kontrolsüz karşılanan reçeteler sonradan tarandı",
    },
    badCrash: "ReçeteKöprü 10:45'te ikinci kez çöktü.",
    badCrashPatientImpact: "İnsülin ve tansiyon ilacı bekleyen hastaların bir kısmı ilaçsız eve döndü.",
    clinicalNote: "İnsülin dozu geciken diyabet hastalarında kan şekeri kontrolü bozulabilir. Tansiyon ilacı aniden kesilen hastalarda kan basıncı hızla yükselebilir. Bu yüzden kronik hasta ilacındaki gecikme yalnızca bir \"bekleme süresi\" değil, klinik bir risktir.",
    badKvkk: "İlaç ve tanı bilgisi içeren reçete logu, dış tedarikçi dahil 40 kişiye maskelenmeden gitti. Kurum ihlali KVK Kurulu'na bildirdi.",
    roleLesson: {
      backend: {
        good: "Bağımlı bir servis yavaşladığında sistemin ne yapacağı bir tasarım kararıdır. Zaman aşımı, devre kesici ve fail-closed kontrol kök nedeni çözer. Canlıda yapılan hızlı bir ayar ise yalnızca belirtiyi örter.",
        bad: "Canlıda elle yapılan bir ayar da, maskelenmemiş bir log satırı da kodda görünmez ama sistemi bozar. Belirtiyi değil kökü düzelt. Logda yalnızca hatayı analiz etmeye yetecek alanları paylaş.",
      },
      qa: {
        good: "Kriz anında test bütün akışları değil, en riskli akışı hedefler. Bağımlı servisin yavaşladığı durumu taklit etmek ve temiz bir geri dönüş yolu bulundurmak, uç durumların eczacının ekranına ulaşmasını engeller.",
        bad: "Baskı altında atlanan her doğrulama adımı riski canlıya ya da paylaşım kanalına taşır. Bağımlı servis yavaşlarken neyin bozulduğunu ve paylaşılan verinin amaca uygun olup olmadığını doğrulamak da QA'nın işidir.",
      },
      pm: {
        good: "Hız ile risk arasındaki dengeyi görünür kıldın. Birkaç dakikalık gecikme, ikinci bir kesintiden ve bir veri ihlalinden çok daha ucuzdur. Paydaşlara bunu söyleyebilmek de krizi yönetmenin bir parçasıdır.",
        bad: "Kapıdaki baskı en hızlı görünen seçeneği cazip kılar. Ama ikinci bir kesinti ya da bir veri ihlali, kazanılan dakikalardan çok daha pahalıya gelir. Riskli bir kararı kimin, hangi bilgiyle onayladığını görünür kıl.",
      },
    },
  },
} as const;
