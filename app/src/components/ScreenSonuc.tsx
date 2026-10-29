import React, { useState, useEffect, useRef } from 'react';
import { DecisionId, DecisionChoice, K1Choice, TutorContext, TutorMessage } from '../types.ts';
import { CONTENT } from '../content.ts';
import { askTutor } from '../services/tutor.ts';

interface ScreenSonucProps {
  decisionId: DecisionId;
  choice: DecisionChoice;
  k1Choice?: K1Choice;
  timedOut: boolean;
  isFocus: boolean;
  onContinue: () => void;
  onOpenTutor: () => void;
  tutorContext: TutorContext;
  tutorMessages: TutorMessage[];
  onAddTutorMessage: (msg: TutorMessage) => void;
  hasUnreadTutorMsg?: boolean;
  setHasUnreadTutorMsg?: (val: boolean) => void;
}

export const ScreenSonuc: React.FC<ScreenSonucProps> = ({
  decisionId,
  choice,
  k1Choice,
  timedOut,
  isFocus,
  onContinue,
  onOpenTutor,
  tutorContext,
  tutorMessages,
  onAddTutorMessage,
  hasUnreadTutorMsg,
  setHasUnreadTutorMsg,
}) => {
  const decisionData = CONTENT.decisions[decisionId];
  const [deepOpen, setDeepOpen] = useState(false);
  const reflectionTriggeredRef = useRef(false);

  // Determine option data
  const isOptionA =
    (decisionId === 'K1' && choice === 'geri') ||
    (decisionId === 'K2' && choice === 'test') ||
    (decisionId === 'K3' && choice === 'maske');

  const option = isOptionA ? decisionData.options.A : decisionData.options.B;

  // Resolve what text (handling K2-B whatByK1 variant)
  let normalWhat: string = '';
  if (decisionId === 'K2' && !isOptionA) {
    const k1Key = k1Choice || 'geri';
    normalWhat = CONTENT.decisions.K2.options.B.whatByK1[k1Key];
  } else {
    normalWhat = (option as { what: string }).what;
  }

  const normalWhy: string = option.why;

  // What & Why with timeout prefix if applicable
  let whatText: string = normalWhat;
  let whyText: string = normalWhy;

  if (timedOut) {
    const timeoutWhat = decisionData.timeout.what;
    whatText = timeoutWhat ? `${timeoutWhat} ${normalWhat}` : normalWhat;

    const timeoutWhy = decisionData.timeout.why;
    whyText = timeoutWhy && timeoutWhy.trim() !== '' ? `${timeoutWhy} ${normalWhy}` : normalWhy;
  }

  // Automatic reflection call if this is the focus decision (Section 6, goal effect 3)
  useEffect(() => {
    if (isFocus && !reflectionTriggeredRef.current) {
      reflectionTriggeredRef.current = true;
      const triggerReflection = async () => {
        try {
          const reflectionReply = await askTutor(
            { ...tutorContext, yansitmaIste: 'evet' },
            tutorMessages,
            'Bu karar sonrasında durumu nasıl değerlendiriyorsun?'
          );
          onAddTutorMessage({
            id: `t-refl-${Date.now()}`,
            author: 'tutor',
            text: reflectionReply,
            timestamp: Date.now(),
          });
        } catch {
          onAddTutorMessage({
            id: `t-refl-err-${Date.now()}`,
            author: 'tutor',
            text: CONTENT.common.tutorError,
            timestamp: Date.now(),
          });
        }
      };
      triggerReflection();
    }
  }, [isFocus, tutorContext, tutorMessages, onAddTutorMessage, setHasUnreadTutorMsg]);

  const continueLabel =
    decisionId === 'K3' ? CONTENT.common.seeResult : CONTENT.common.continue;

  const stepNumber = decisionId === 'K1' ? 1 : decisionId === 'K2' ? 2 : 3;

  return (
    <div className="flex-1 flex flex-col justify-between p-4 pt-4 pb-6">
      <div className="space-y-4">
        {/* Step indicator */}
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#9FB0C8] uppercase tracking-wider">
            Karar {stepNumber} / 3 Sonucu
          </span>
          <span className="text-[#2FB67C] font-bold tracking-wider uppercase">
            UYGULANDI
          </span>
        </div>

        {/* Selected decision banner */}
        <div className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-3.5 space-y-1">
          <div className="text-[10px] uppercase font-mono tracking-wider text-[#9FB0C8]">
            VERİLEN KARAR
          </div>
          <div className="text-[15px] font-semibold text-[#F2F5FA] flex items-center justify-between">
            <span>{option.label}</span>
            {timedOut && (
              <span className="text-xs text-[#E5484D] font-mono">
                {CONTENT.common.timeoutTag}
              </span>
            )}
          </div>
        </div>

        {/* Timeout notice container (Rendered ONLY on timeout) */}
        {timedOut && (
          <div
            data-testid="outcome-timeout-note"
            className="p-3 bg-[#E5484D]/10 border border-[#E5484D]/40 rounded-xl flex items-center gap-2.5 text-xs text-[#E5484D]"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="shrink-0"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <div
              data-testid="timeout-notice"
              className="font-bold text-xs"
            >
              {CONTENT.common.timeoutNote}
            </div>
          </div>
        )}

        {/* Outcome: What Happened */}
        <div className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-4 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[#F28C28]">
            {CONTENT.common.whatTitle}
          </div>
          <div
            data-testid="outcome-what"
            className="text-[14px] leading-relaxed text-[#F2F5FA] whitespace-pre-line"
          >
            {whatText}
          </div>
        </div>

        {/* Outcome: Why Happened */}
        <div className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-4 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[#F28C28]">
            {CONTENT.common.whyTitle}
          </div>
          <div
            data-testid="outcome-why"
            className="text-[14px] leading-relaxed text-[#9FB0C8] whitespace-pre-line"
          >
            {whyText}
          </div>
        </div>

        {/* Collapsible Deep Dive (Rendered ONLY on focus decision) */}
        {isFocus && (
          <div
            data-testid="outcome-deep"
            className="bg-[#1C3A66]/60 border border-[#2A4A7A] rounded-xl overflow-hidden transition-all"
          >
            <button
              type="button"
              onClick={() => setDeepOpen(!deepOpen)}
              className="w-full p-3.5 flex items-center justify-between text-left text-xs font-semibold text-[#F28C28]"
            >
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span className="uppercase tracking-wider">
                  {CONTENT.common.deepTitle}
                </span>
              </div>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className={`transition-transform ${deepOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {deepOpen && (
              <div className="p-3.5 pt-0 space-y-2 text-xs border-t border-[#2A4A7A]/40 mt-1">
                {decisionData.deep.map((itemText, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[#F2F5FA]">
                    <span className="text-[#F28C28] font-bold">•</span>
                    <span className="leading-relaxed">{itemText}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-5 space-y-2.5">
        <button
          type="button"
          data-testid="outcome-continue"
          onClick={onContinue}
          className="w-full h-[52px] bg-[#F28C28] hover:bg-[#F28C28]/95 text-[#0B1B33] font-semibold text-[15px] rounded-xl flex items-center justify-center transition-all shadow-lg shadow-[#F28C28]/10"
        >
          {continueLabel}
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
