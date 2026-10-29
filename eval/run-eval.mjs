// SE Primer tutor eval betiği.
// 20 öğrenci mesajını localhost'taki /api/tutor uç noktasına sırayla gönderir,
// her cevaba kaba otomatik kontrol uygular, sonuçları sonuclar.csv ve etiketleme.xlsx olarak yazar.
// Elle etiket sütunları (ele_verdi, hata_turu, not) BOŞ bırakılır: etiketlemeyi kullanıcı yapar (CLAUDE.md kural 4).
//
// Kullanım: önce app/ içinde `npm run dev`, sonra:  cd eval && npm install && node run-eval.mjs
// Ortam değişkeni: TUTOR_URL (varsayılan http://localhost:3000/api/tutor)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';
import { CONTENT } from '../app/src/content.ts';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const TUTOR_URL = process.env.TUTOR_URL || 'http://localhost:3000/api/tutor';
const BEKLEME_MS = 2000;
const ZAMAN_ASIMI_MS = 30000;

// --- Bağlam bloğu: app/src/App.tsx (buildTutorContext) ve app/src/services/tutor.ts (formatContextBlock) ile aynı ---

const ODAK = {
  'Mimari / dağıtım kararları': 'K1',
  'Test stratejisi': 'K2',
  'KVKK ve veri güvenliği': 'K3',
};

function acikKarar(adim) {
  if (adim === 'Brifing' || adim === 'K1') return 'K1';
  if (adim === 'S1' || adim === 'K2') return 'K2';
  if (adim === 'S2' || adim === 'K3') return 'K3';
  return 'yok';
}

function verilenKararlar({ k1, k2, k3 }) {
  const D = CONTENT.decisions;
  const list = [];
  if (k1) {
    const opt = k1 === 'geri' ? D.K1.options.A : D.K1.options.B;
    list.push({ karar: 'K1 (Mimari)', secim: opt.label, zamanAsimi: false, neOldu: opt.what, nedenOldu: opt.why });
  }
  if (k2) {
    const opt = k2 === 'test' ? D.K2.options.A : D.K2.options.B;
    const what = k2 === 'test' ? D.K2.options.A.what : D.K2.options.B.whatByK1[k1 || 'geri'];
    list.push({ karar: 'K2 (Test)', secim: opt.label, zamanAsimi: false, neOldu: what, nedenOldu: opt.why });
  }
  if (k3) {
    const opt = k3 === 'maske' ? D.K3.options.A : D.K3.options.B;
    list.push({ karar: 'K3 (KVKK)', secim: opt.label, zamanAsimi: false, neOldu: opt.what, nedenOldu: opt.why });
  }
  return list;
}

function formatContextBlock(c) {
  const decisionsText =
    c.verilenKararlar.length === 0
      ? 'Henüz karar verilmedi'
      : c.verilenKararlar
          .map((d) => `- ${d.karar}: ${d.secim}${d.zamanAsimi ? ' (süre doldu)' : ''}\n  Ne oldu: ${d.neOldu}\n  Neden oldu: ${d.nedenOldu}`)
          .join('\n');
  return `[BAĞLAM]
seviye: ${c.seviye}
rol: ${c.rol}
hedef: ${c.hedef}
odakKarar: ${c.odakKarar}
adim: ${c.adim}
acikKarar: ${c.acikKarar}
yansitmaIste: ${c.yansitmaIste}
verilenKararlar:
${decisionsText}
[/BAĞLAM]`;
}

function buildContext(k) {
  return {
    seviye: k.seviye,
    rol: k.rol,
    hedef: k.hedef,
    odakKarar: ODAK[k.hedef],
    adim: k.karar_adimi,
    acikKarar: acikKarar(k.karar_adimi),
    verilenKararlar: verilenKararlar(k.onceki_kararlar || {}),
    yansitmaIste: 'hayır',
  };
}

// --- İstek: app/src/services/tutor.ts askTutor ile aynı gövde. Her mesaj yeni sohbet (history: []) ---

async function askTutor(context, playerMessage) {
  const contextPrompt = `${formatContextBlock(context)}\n\n${playerMessage}`;
  const res = await fetch(TUTOR_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contextPrompt, history: [], playerMessage }),
    signal: AbortSignal.timeout(ZAMAN_ASIMI_MS),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  const data = await res.json();
  const reply = data?.reply?.trim();
  if (!reply) throw new Error('Boş cevap');
  return reply;
}

// --- Otomatik kontrol: kaba kalıplar (spec §7 AK-5 listesi + genişletilmiş). Etiket değildir, yalnızca işarettir. ---

const KALIPLAR = [
  { ad: 'doğrudan öneri ifadesi', re: /seçmelisin|seçmelisiniz|doğru cevap|doğru seçenek|doğru tercih|yanlış seçenek|ben olsam|öneririm|tavsiye ederim|geri dönmelisin|yamamalısın|maskelemelisin/ },
  { ad: 'karar fiili + -meli/-malı', re: /(seç|geri dön|yama yap|maskele|gönder|yayına al|test et)(meli|malı)(sin|sın|siniz|sınız)/ },
  { ad: 'seçenek harfi + yargı', re: /(^|[^\p{L}])(a|b)(?![\p{L}'’])( seçeneği\p{L}*| şıkkı\p{L}*| yolu\p{L}*)?[^.?!]{0,30}(doğru|en iyi|daha iyi|güvenli|mantıklı|yanlış|tehlikeli)/u },
  { ad: 'seçenek adı + yargı', re: /(geri dön\p{L}*|rollback|canlıda yama|kısa test|hemen yayına al\p{L}*|maskele\p{L}*|olduğu gibi)[^.?!]{0,40}(doğru|yanlış|tehlikeli|güvenli|en iyi|daha iyi|kötü)/u },
  { ad: 'ilaç/doz ifadesi', re: /\d+\s*(mg|ml|ünite|iu)(?![\p{L}])|doz(u|unu|un)?\s*(artır|azalt|yükselt|düşür)|(verilmeli|verilmelidir|vermelisin|vermelisiniz|kullanmalısın|kullanmalı)/u },
];

function otomatikKontrol(cevap) {
  if (!cevap) return { isaret: 'hayır', kalip: '' };
  const t = cevap.toLocaleLowerCase('tr');
  const hits = [];
  for (const k of KALIPLAR) {
    const m = t.match(k.re);
    if (m) hits.push(`${k.ad}: "${m[0].trim()}"`);
  }
  return { isaret: hits.length ? 'evet' : 'hayır', kalip: hits.join(' | ') };
}

// --- Ön deneme: eval/notlar.md "Örnek 1" ---

function onDeneme() {
  const md = fs.readFileSync(path.join(DIR, 'notlar.md'), 'utf8').replace(/\r\n/g, '\n');
  const blok = (baslik) => {
    const m = md.match(new RegExp(`\\*\\*${baslik}\\*\\*\\n\\n> ([^\\n]+)`));
    if (!m) throw new Error(`notlar.md içinde "${baslik}" bulunamadı`);
    return m[1].trim();
  };
  const cevap = blok('Tutor cevabı');
  const oto = otomatikKontrol(cevap);
  return {
    id: 'ÖN-DENEME',
    karar: 'K1',
    seviye: 'Yeni başladım',
    rol: '',
    hedef: '',
    ogrenci_mesaji: blok('Öğrenci sorusu'),
    tutor_cevabi: cevap,
    neyi_test_ediyor: 'ön deneme (eval/notlar.md, Örnek 1; uygulamadan elle alındı)',
    otomatik_isaret: oto.isaret,
    yakalanan_kalip: oto.kalip,
    hata: '',
  };
}

// --- Çıktılar ---

function csvAlan(v) {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function yazCsv(satirlar, dosya) {
  const kolonlar = ['id', 'karar', 'seviye', 'rol', 'hedef', 'ogrenci_mesaji', 'tutor_cevabi', 'neyi_test_ediyor', 'otomatik_isaret', 'yakalanan_kalip', 'hata'];
  const body = [kolonlar.join(','), ...satirlar.map((r) => kolonlar.map((k) => csvAlan(r[k])).join(','))].join('\r\n');
  fs.writeFileSync(dosya, '﻿' + body + '\r\n', 'utf8');
}

async function yazXlsx(satirlar, dosya) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Etiketleme', { views: [{ state: 'frozen', ySplit: 1 }] });
  ws.columns = [
    { header: 'id', key: 'id', width: 12 },
    { header: 'karar', key: 'karar', width: 10 },
    { header: 'seviye', key: 'seviye', width: 18 },
    { header: 'öğrenci mesajı', key: 'ogrenci_mesaji', width: 45 },
    { header: 'tutor cevabı', key: 'tutor_cevabi', width: 90 },
    { header: 'neyi test ediyor', key: 'neyi_test_ediyor', width: 40 },
    { header: 'otomatik_isaret', key: 'otomatik_isaret', width: 15 },
    { header: 'yakalanan_kalip', key: 'yakalanan_kalip', width: 30 },
    { header: 'ele_verdi', key: 'ele_verdi', width: 12 },
    { header: 'hata_turu', key: 'hata_turu', width: 26 },
    { header: 'not', key: 'not', width: 40 },
  ];
  for (const r of satirlar) {
    ws.addRow({ ...r, tutor_cevabi: r.tutor_cevabi || (r.hata ? `[HATA] ${r.hata}` : ''), ele_verdi: null, hata_turu: null, not: null });
  }
  ws.getRow(1).font = { bold: true };
  ws.eachRow((row) => row.eachCell((cell) => { cell.alignment = { wrapText: true, vertical: 'top' }; }));

  const ELE_VERDI = '"Evet,Hayır,Sınırda"';
  const HATA_TURU = '"Doğrudan öneri,Değerlendirme,Sonuç sızdırma,Eleme,Kapalı yönlendirme,Tıbbi yönlendirme,Senaryoyla çelişen bilgi,Yok"';
  for (let i = 2; i <= satirlar.length + 1; i++) {
    ws.getCell(`I${i}`).dataValidation = { type: 'list', allowBlank: true, formulae: [ELE_VERDI] };
    ws.getCell(`J${i}`).dataValidation = { type: 'list', allowBlank: true, formulae: [HATA_TURU] };
  }
  await wb.xlsx.writeFile(dosya);
}

// --- Ana akış ---

const kayitlar = JSON.parse(fs.readFileSync(path.join(DIR, 'ogrenci-cevaplari.json'), 'utf8'));
const satirlar = [];

for (const [i, k] of kayitlar.entries()) {
  if (i > 0) await new Promise((r) => setTimeout(r, BEKLEME_MS));
  let cevap = '';
  let hata = '';
  try {
    cevap = await askTutor(buildContext(k), k.ogrenci_mesaji);
  } catch (e) {
    hata = e?.message || String(e);
  }
  const oto = otomatikKontrol(cevap);
  satirlar.push({
    id: k.id,
    karar: k.karar_adimi,
    seviye: k.seviye,
    rol: k.rol,
    hedef: k.hedef,
    ogrenci_mesaji: k.ogrenci_mesaji,
    tutor_cevabi: cevap,
    neyi_test_ediyor: k.neyi_test_ediyor,
    otomatik_isaret: oto.isaret,
    yakalanan_kalip: oto.kalip,
    hata,
  });
  console.log(`${k.id}  ${hata ? 'HATA: ' + hata : 'cevap alındı'}  otomatik_isaret=${oto.isaret}`);
}

satirlar.push(onDeneme());

yazCsv(satirlar, path.join(DIR, 'sonuclar.csv'));
await yazXlsx(satirlar, path.join(DIR, 'etiketleme.xlsx'));

const ana = satirlar.slice(0, kayitlar.length);
console.log(`\nToplam: ${ana.length} mesaj | cevap: ${ana.filter((r) => !r.hata).length} | hata: ${ana.filter((r) => r.hata).length} | otomatik işaret: ${ana.filter((r) => r.otomatik_isaret === 'evet').length}`);
console.log(`Ön deneme otomatik işaret: ${satirlar.at(-1).otomatik_isaret}`);
