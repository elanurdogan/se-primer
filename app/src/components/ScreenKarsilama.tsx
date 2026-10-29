import React from 'react';
import { CONTENT } from '../content.ts';

interface ScreenKarsilamaProps {
  onStart: () => void;
}

export const ScreenKarsilama: React.FC<ScreenKarsilamaProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-4 pt-6 pb-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#F28C28] mb-1 font-mono">
            KRİZ YÖNETİM SİMÜLASYONU
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F2F5FA] mb-2">
            {CONTENT.welcome.title}
          </h1>
          <p className="text-sm leading-relaxed text-[#9FB0C8]">
            {CONTENT.welcome.text}
          </p>
        </div>

        {/* Crisis Briefing Preview Card */}
        <div className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-4 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#F28C28]" />
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F28C28]">
            <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-pulse" />
            NÖBETÇİ MÜHENDİS GÖREV BAŞINDA
          </div>
          <p className="text-[13px] text-[#F2F5FA] leading-relaxed">
            ReçeteKöprü v3.2 yayını sonrası servis kilitlendi. Eczaneler 503 alıyor, hastalar kapıda.
            3 kritik karar vereceksin (Mimari, Test, KVKK). Sokratik AI Tutor düşünmene yardım edecek.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
            <div className="bg-[#050C17] border border-[#2A4A7A]/50 rounded-lg p-2">
              <div className="text-[10px] text-[#9FB0C8]">KUYRUK</div>
              <div className="text-sm font-bold text-[#F28C28]">1.240</div>
            </div>
            <div className="bg-[#050C17] border border-[#2A4A7A]/50 rounded-lg p-2">
              <div className="text-[10px] text-[#9FB0C8]">ECZANE</div>
              <div className="text-sm font-bold text-[#F28C28]">142</div>
            </div>
            <div className="bg-[#050C17] border border-[#2A4A7A]/50 rounded-lg p-2">
              <div className="text-[10px] text-[#9FB0C8]">DURUM</div>
              <div className="text-sm font-bold text-[#E5484D]">HTTP 503</div>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="space-y-2.5 text-xs text-[#9FB0C8]">
          <div className="flex items-start gap-2">
            <span className="text-[#2FB67C] font-bold">✓</span>
            <span>3 karar, 2 son, deterministik simülasyon mantığı</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#2FB67C] font-bold">✓</span>
            <span>Cevabı vermeyen, soru soran Sokratik AI Tutor</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#2FB67C] font-bold">✓</span>
            <span>Rol ve deneyim seviyesine göre kişiselleştirilmiş akış</span>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-6">
        <button
          type="button"
          data-testid="start-button"
          onClick={onStart}
          className="w-full h-[52px] bg-[#F28C28] hover:bg-[#F28C28]/95 text-[#0B1B33] font-semibold text-[15px] rounded-xl flex items-center justify-center transition-all shadow-lg shadow-[#F28C28]/10"
        >
          {CONTENT.welcome.start}
        </button>
      </div>
    </div>
  );
};
