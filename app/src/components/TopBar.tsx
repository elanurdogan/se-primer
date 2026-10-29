import React from 'react';
import { GameState } from '../types.ts';
import { CONTENT } from '../content.ts';

interface TopBarProps {
  state: GameState;
}

export const TopBar: React.FC<TopBarProps> = ({ state }) => {
  const isGoodEnding = state === 'SonIyi';
  const isBadEnding = state === 'SonKotu';

  const clock = isGoodEnding ? '12:00' : isBadEnding ? '10:45' : '08:30';
  const statusText = isGoodEnding
    ? 'ReçeteKöprü · DURUM: STABİL'
    : 'ReçeteKöprü · DURUM: KESİNTİ';
  const alertBadge = isGoodEnding ? 'L4-NORMAL' : 'L4-ALERT';

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0B1B33]/95 backdrop-blur-sm border-b border-[#2A4A7A]/60">
      {/* 48px Header Row */}
      <div className="h-12 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Orange Plus-Cross Icon */}
          <div className="w-5 h-5 flex items-center justify-center text-[#F28C28]">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span className="font-semibold text-base tracking-tight text-[#F2F5FA]">
            {CONTENT.common.appName}
          </span>
        </div>

        {/* Mono Clock */}
        <div className="font-mono text-sm tracking-wide text-[#9FB0C8]">
          {clock}
        </div>
      </div>

      {/* Thin Status Strip */}
      <div className="h-6 px-4 flex items-center justify-between bg-[#050C17]/80 border-t border-[#2A4A7A]/30 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isGoodEnding
                ? 'bg-[#2FB67C]'
                : 'bg-[#F28C28] animate-pulse'
            }`}
          />
          <span className={isGoodEnding ? 'text-[#2FB67C]' : 'text-[#9FB0C8]'}>
            {statusText}
          </span>
        </div>
        <span className="text-[#9FB0C8]/70 text-[10px] uppercase tracking-wider font-semibold">
          {alertBadge}
        </span>
      </div>
    </header>
  );
};
