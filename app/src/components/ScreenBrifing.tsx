import React from 'react';
import { RoleKey } from '../types.ts';
import { CONTENT } from '../content.ts';

interface ScreenBrifingProps {
  role: RoleKey;
  onContinue: () => void;
  onOpenTutor: () => void;
  hasUnreadTutorMsg?: boolean;
}

export const ScreenBrifing: React.FC<ScreenBrifingProps> = ({
  role,
  onContinue,
  onOpenTutor,
  hasUnreadTutorMsg,
}) => {
  const roleMsg = CONTENT.briefing.roleMessage[role];

  return (
    <div className="flex-1 flex flex-col justify-between p-4 pt-4 pb-6">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#F28C28] mb-1 font-mono">
            08:30 · KRİZ BRİFİNGİ
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#F2F5FA] mb-1 leading-snug">
            {CONTENT.briefing.title}
          </h1>
        </div>

        {/* Briefing Text Card: renders paragraphs with line breaks preserved */}
        <div className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-4 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-[#F28C28]" />
          <div
            data-testid="briefing-text"
            className="text-[13px] leading-relaxed text-[#F2F5FA] space-y-2.5 whitespace-pre-line pl-1"
          >
            {CONTENT.briefing.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* Role Message Card */}
        <div className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#F28C28] uppercase font-semibold">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            <span>{roleMsg.speaker}</span>
          </div>
          <div
            data-testid="briefing-role-message"
            className="text-[13px] leading-relaxed text-[#F2F5FA] font-sans whitespace-pre-line pl-1"
          >
            {roleMsg.text}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 space-y-2.5">
        <button
          type="button"
          data-testid="briefing-continue"
          onClick={onContinue}
          className="w-full h-[52px] bg-[#F28C28] hover:bg-[#F28C28]/95 text-[#0B1B33] font-semibold text-[15px] rounded-xl flex items-center justify-center transition-all shadow-lg shadow-[#F28C28]/10"
        >
          {CONTENT.common.continue}
        </button>

        <button
          type="button"
          data-testid="tutor-open"
          onClick={onOpenTutor}
          className="w-full py-2.5 text-xs text-[#9FB0C8] hover:text-[#F28C28] flex items-center justify-center gap-2 transition-colors relative"
        >
          <div className="w-5 h-5 rounded-full bg-[#1C3A66] border border-[#2A4A7A] text-[#F28C28] flex items-center justify-center text-xs font-bold">
            ?
          </div>
          <span>{CONTENT.common.tutorOpen}</span>
          {hasUnreadTutorMsg && (
            <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-ping" />
          )}
        </button>
      </div>
    </div>
  );
};
