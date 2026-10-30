// cypress/videos/demo.cy.js.mp4 dosyasını docs/demo.mp4 olarak yayımlar.
// 60 sn'yi aşan kayıt, kırpılmadan hızlandırılarak 60 sn'nin altına indirilir.
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = process.env.FFMPEG_PATH || require('ffmpeg-static');

const KOK = path.resolve(__dirname, '..');
const KAYNAK = path.join(KOK, 'cypress', 'videos', 'demo.cy.js.mp4');
const HEDEF = path.join(KOK, 'docs', 'demo.mp4');
const HEDEF_SURE_SN = 58;
// cypress.config.js'teki 1300x960 pencerede 390x844 uygulama alanı (g:y:x:y).
const TELEFON_ALANI = '390:844:678:80';

const sureOku = (dosya) => {
  const { stderr } = spawnSync(ffmpeg, ['-hide_banner', '-i', dosya], { encoding: 'utf8' });
  const eslesme = /Duration: (\d+):(\d+):([\d.]+)/.exec(stderr);
  if (!eslesme) throw new Error(`Süre okunamadı: ${dosya}`);
  return Number(eslesme[1]) * 3600 + Number(eslesme[2]) * 60 + Number(eslesme[3]);
};

const kaynakSure = sureOku(KAYNAK);
const carpan = Math.min(1, HEDEF_SURE_SN / kaynakSure);

fs.mkdirSync(path.dirname(HEDEF), { recursive: true });
const sonuc = spawnSync(
  ffmpeg,
  [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-i', KAYNAK,
    '-an',
    '-vf', `crop=${TELEFON_ALANI},setpts=${carpan.toFixed(4)}*PTS`,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '26', '-movflags', '+faststart',
    HEDEF,
  ],
  { stdio: 'inherit' }
);
if (sonuc.status !== 0) process.exit(sonuc.status ?? 1);

const boyutMb = fs.statSync(HEDEF).size / (1024 * 1024);
console.log(
  `docs/demo.mp4: ${sureOku(HEDEF).toFixed(2)} sn, ${boyutMb.toFixed(2)} MB (kaynak ${kaynakSure.toFixed(2)} sn)`
);
