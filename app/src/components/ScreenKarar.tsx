import React, { useState, useEffect, useRef } from 'react';
import { DecisionId, LevelKey, RoleKey, DecisionChoice } from '../types.ts';
import { CONTENT } from '../content.ts';

interface ScreenKararProps {
  decisionId: DecisionId;
  level: LevelKey;
  role: RoleKey;
  isFocus: boolean;
  onSelectChoice: (choice: DecisionChoice, timedOut?: boolean) => void;
  onOpenTutor: () => void;
  hasUnreadTutorMsg?: boolean;
}

export const ScreenKarar: React.FC<ScreenKararProps> = ({
  decisionId,
  level,
  role,
  isFocus,
  onSelectChoice,
  onOpenTutor,
  hasUnreadTutorMsg,
}) => {
  const decisionData = CONTENT.decisions[decisionId];

  // Hint toggle state (for intermediate level)
  const [hintOpen, setHintOpen] = useState(false);

  // Timer state (for experienced level)
  const [secondsLeft, setSecondsLeft] = useState(60);
  const timedOutRef = useRef(false);

  // Reset timer & hint when decisionId changes
  useEffect(() => {
    setSecondsLeft(60);
    setHintOpen(false);
    timedOutRef.current = false;
  }, [decisionId]);

  // Experienced countdown timer using setInterval & Date
  useEffect(() => {
    if (level !== 'experienced') return;

    const startTimestamp = Date.now();
    const durationSeconds = 60;

    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
      const remaining = Math.max(0, durationSeconds - elapsedSeconds);
      setSecondsLeft(remaining);

      if (remaining <= 0 && !timedOutRef.current) {
        timedOutRef.current = true;
        clearInterval(interval);
        // Risky option (B) auto applied:
        // K1 -> yama, K2 -> hemen, K3 -> ham
        const riskyChoice = decisionData.options.B.value;
        onSelectChoice(riskyChoice, true);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [level, decisionId, onSelectChoice, decisionData.options.B.value]);

  // Determine option test ids
  const optionATestId =
    decisionId === 'K1'
      ? 'k1-option-rollback'
      : decisionId === 'K2'
      ? 'k2-option-test'
      : 'k3-option-mask';

  const optionBTestId =
    decisionId === 'K1'
      ? 'k1-option-hotfix'
      : decisionId === 'K2'
      ? 'k2-option-ship'
      : 'k3-option-raw';

  const stepIndex = decisionId === 'K1' ? 1 : decisionId === 'K2' ? 2 : 3;
  const isBackendRole = role === 'backend';

  return (
    <div className="flex-1 flex flex-col justify-between p-4 pt-4 pb-6">
      <div className="space-y-4">
        {/* Progress & Stage row */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#9FB0C8] uppercase tracking-wider">
              Karar {stepIndex} / 3
            </span>
            <span className="text-[#F28C28] font-bold tracking-wider uppercase">
              KRİZ AŞAMASI
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 h-1.5">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-full rounded-full transition-colors ${
                  step <= stepIndex ? 'bg-[#F28C28]' : 'bg-[#2A4A7A]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Badges & Timer Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isFocus && (
              <span
                data-testid="focus-badge"
                className="bg-[#F28C28] text-[#0B1B33] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
              >
                {CONTENT.common.focusBadge}
              </span>
            )}
            <span className="border border-[#2A4A7A] text-[#9FB0C8] text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
              {decisionData.category}
            </span>
          </div>

          {/* Countdown timer (experienced only) */}
          {level === 'experienced' && (
            <div
              data-testid="timer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#F28C28]/60 bg-[#13294B] font-mono text-xs text-[#F28C28]"
            >
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="animate-spin"
                style={{ animationDuration: '6s' }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>
                0:{String(secondsLeft).padStart(2, '0')}{' '}
                <span className="text-[10px] text-[#9FB0C8]">
                  kalan süre
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Decision Title */}
        <h1
          data-testid="decision-title"
          className="text-lg font-bold tracking-tight text-[#F2F5FA] leading-snug whitespace-pre-line"
        >
          {decisionData.title}
        </h1>

        {/* Context Card with 3px Orange Left Stripe (Hide if empty per Part 2 rule) */}
        {decisionData.context && decisionData.context.trim() !== '' && (
          <div className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-3.5 relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-[#F28C28]" />
            <p className="text-[13px] leading-relaxed text-[#F2F5FA] pl-1 whitespace-pre-line">
              {decisionData.context}
            </p>
          </div>
        )}

        {/* Role Card */}
        <div
          data-testid="role-card"
          className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-3 space-y-1.5"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#9FB0C8]">
            <svg
              viewBox="0 0 24 24"
              width="13"
              height="13"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="text-[#F28C28]"
            >
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            <span>ROLÜN: {CONTENT.profile.role.options[role].toUpperCase()}</span>
          </div>
          <div
            className={`bg-[#050C17] border border-[#2A4A7A]/60 rounded-lg px-2.5 py-2 text-xs text-[#F28C28] break-all leading-relaxed whitespace-pre-line ${
              isBackendRole ? 'font-mono' : 'font-sans'
            }`}
          >
            {decisionData.roleCard[role]}
          </div>
        </div>

        {/* Hint Box & Hint Toggle (MUTUALLY EXCLUSIVE WITH TIMER) */}
        {level !== 'experienced' && (
          <div className="space-y-2">
            {/* Intermediate Toggle */}
            {level === 'intermediate' && !hintOpen && (
              <button
                type="button"
                data-testid="hint-toggle"
                onClick={() => setHintOpen(true)}
                className="w-full py-2 px-3 rounded-lg border border-[#2A4A7A]/80 bg-[#13294B]/50 hover:bg-[#13294B] text-xs text-[#F28C28] flex items-center justify-center gap-1.5 transition-colors font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M9 18h6"></path>
                  <path d="M10 22h4"></path>
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path>
                </svg>
                <span>{CONTENT.common.hintToggle}</span>
              </button>
            )}

            {/* Hint Box (beginner always, intermediate after toggle) */}
            {(level === 'beginner' || (level === 'intermediate' && hintOpen)) && (
              <div
                data-testid="hint-box"
                className="bg-[#13294B]/80 border border-[#2A4A7A] rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#F2F5FA] leading-relaxed"
              >
                <div className="text-[#F28C28] mt-0.5 shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  >
                    <path d="M9 18h6"></path>
                    <path d="M10 22h4"></path>
                    <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path>
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28] block">
                    {CONTENT.common.hintLabel}
                  </span>
                  <p className="text-[12px] text-[#9FB0C8] whitespace-pre-line">
                    {decisionData.hint}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Two Equal-Size Option Buttons Stacked */}
        {/* Rule: Option buttons render as A · {label} / B · {label} with detail as description line (omit if empty). Both options look identical. */}
        <div className="space-y-2.5 pt-1">
          {/* Option A */}
          <button
            type="button"
            data-testid={optionATestId}
            onClick={() => onSelectChoice(decisionData.options.A.value, false)}
            className="w-full text-left p-3.5 bg-[#13294B] hover:bg-[#1C3A66] border border-[#2A4A7A] hover:border-[#F28C28]/60 rounded-xl transition-all shadow-sm group"
          >
            <div className="text-[15px] font-medium text-[#F2F5FA] group-hover:text-[#F28C28] transition-colors">
              A · {decisionData.options.A.label}
            </div>
            {decisionData.options.A.detail && decisionData.options.A.detail.trim() !== '' && (
              <div className="text-xs text-[#9FB0C8] mt-1 line-clamp-2">
                {decisionData.options.A.detail}
              </div>
            )}
          </button>

          {/* Option B */}
          <button
            type="button"
            data-testid={optionBTestId}
            onClick={() => onSelectChoice(decisionData.options.B.value, false)}
            className="w-full text-left p-3.5 bg-[#13294B] hover:bg-[#1C3A66] border border-[#2A4A7A] hover:border-[#F28C28]/60 rounded-xl transition-all shadow-sm group"
          >
            <div className="text-[15px] font-medium text-[#F2F5FA] group-hover:text-[#F28C28] transition-colors">
              B · {decisionData.options.B.label}
            </div>
            {decisionData.options.B.detail && decisionData.options.B.detail.trim() !== '' && (
              <div className="text-xs text-[#9FB0C8] mt-1 line-clamp-2">
                {decisionData.options.B.detail}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Tutor Open Link */}
      <div className="pt-4">
        <button
          type="button"
          data-testid="tutor-open"
          onClick={onOpenTutor}
          className="w-full py-2.5 text-xs text-[#9FB0C8] hover:text-[#F28C28] flex items-center justify-center gap-2 transition-colors"
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
