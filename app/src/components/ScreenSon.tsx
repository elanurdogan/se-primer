import React from 'react';
import {
  K1Choice,
  K2Choice,
  K3Choice,
  RoleKey,
  GoalKey,
  DecisionId,
} from '../types.ts';
import { CONTENT } from '../content.ts';

interface ScreenSonProps {
  k1: K1Choice;
  k2: K2Choice;
  k3: K3Choice;
  zamanAsimi: Record<DecisionId, boolean>;
  role: RoleKey;
  goal: GoalKey;
  onRestart: () => void;
  onOpenTutor: () => void;
  hasUnreadTutorMsg?: boolean;
}

export const ScreenSon: React.FC<ScreenSonProps> = ({
  k1,
  k2,
  k3,
  zamanAsimi,
  role,
  goal,
  onRestart,
  onOpenTutor,
  hasUnreadTutorMsg,
}) => {
  // Bad Ending rule: k3 === 'ham' || (k1 === 'yama' && k2 === 'hemen')
  const hasCrashReason = k1 === 'yama' && k2 === 'hemen';
  const hasKvkkReason = k3 === 'ham';
  const isBad = hasCrashReason || hasKvkkReason;

  // Close calls on Good ending:
  const isCloseCallGeriHemen = !isBad && k1 === 'geri' && k2 === 'hemen';
  const isCloseCallYamaTest = !isBad && k1 === 'yama' && k2 === 'test';

  // Determine focus decision based on goal
  const focusDecisionId: DecisionId =
    goal === 'architecture' ? 'K1' : goal === 'testing' ? 'K2' : 'K3';

  // Rule: Summary rows on the ending read {category} — {label}, plus (süre doldu) if timed out
  // Order: focus decision first, then the others in K1 → K2 → K3 order.
  const k1Opt = k1 === 'geri' ? CONTENT.decisions.K1.options.A : CONTENT.decisions.K1.options.B;
  const k2Opt = k2 === 'test' ? CONTENT.decisions.K2.options.A : CONTENT.decisions.K2.options.B;
  const k3Opt = k3 === 'maske' ? CONTENT.decisions.K3.options.A : CONTENT.decisions.K3.options.B;

  const k1Desc =
    k1 === 'geri'
      ? CONTENT.decisions.K1.options.A.what
      : CONTENT.decisions.K1.options.B.what;
  const k2Desc =
    k2 === 'test'
      ? CONTENT.decisions.K2.options.A.what
      : CONTENT.decisions.K2.options.B.whatByK1[k1];
  const k3Desc =
    k3 === 'maske'
      ? CONTENT.decisions.K3.options.A.what
      : CONTENT.decisions.K3.options.B.what;

  const summaryK1 = {
    id: 'K1' as DecisionId,
    num: 1,
    category: CONTENT.decisions.K1.category,
    label: k1Opt.label,
    desc: k1Desc,
    timedOut: zamanAsimi.K1,
    isGood: k1 === 'geri',
  };

  const summaryK2 = {
    id: 'K2' as DecisionId,
    num: 2,
    category: CONTENT.decisions.K2.category,
    label: k2Opt.label,
    desc: k2Desc,
    timedOut: zamanAsimi.K2,
    isGood: k2 === 'test',
  };

  const summaryK3 = {
    id: 'K3' as DecisionId,
    num: 3,
    category: CONTENT.decisions.K3.category,
    label: k3Opt.label,
    desc: k3Desc,
    timedOut: zamanAsimi.K3,
    isGood: k3 === 'maske',
  };

  const allSummaries = [summaryK1, summaryK2, summaryK3];
  // Sort: focus decision first, then K1 -> K2 -> K3 order
  const sortedSummaries = [...allSummaries].sort((a, b) => {
    if (a.id === focusDecisionId) return -1;
    if (b.id === focusDecisionId) return 1;
    return a.num - b.num;
  });

  const roleLesson = CONTENT.endings.roleLesson[role][isBad ? 'bad' : 'good'];
  const roleNameUpper = CONTENT.profile.role.options[role].toUpperCase();

  return (
    <div className="flex-1 flex flex-col justify-between p-4 pt-3 pb-6">
      <div className="space-y-4">
        {/* Postmortem top banner */}
        <div className="flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isBad ? 'bg-[#E5484D]' : 'bg-[#2FB67C]'
              }`}
            />
            <span className="text-[#9FB0C8]">POSTMORTEM #882</span>
          </div>
          <span
            className={`font-semibold tracking-wider ${
              isBad ? 'text-[#E5484D]' : 'text-[#2FB67C]'
            }`}
          >
            {isBad ? 'SEV-1 TERMINATED' : 'ÇÖZÜLDÜ · STABİL'}
          </span>
        </div>

        {/* GOOD Ending Container (Rendered ONLY if good) */}
        {!isBad && (
          <div
            data-testid="ending-good"
            className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-4 relative overflow-hidden space-y-3"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#2FB67C]" />
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-1.5 text-[#2FB67C] font-semibold">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="uppercase tracking-wider">NÖBET SONU</span>
              </div>
              <span className="font-mono text-[#9FB0C8]">12:00</span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#F2F5FA]">
              {CONTENT.endings.goodTitle}
            </h1>

            <p className="text-[13px] leading-relaxed text-[#9FB0C8] whitespace-pre-line">
              {CONTENT.endings.good}
            </p>

            {/* Close-call note below endings.good if applicable */}
            {isCloseCallGeriHemen && (
              <div className="p-2.5 rounded-lg bg-[#F28C28]/10 border border-[#F28C28]/30 text-xs text-[#F28C28] leading-relaxed whitespace-pre-line">
                {CONTENT.endings.closeCall.geriHemen}
              </div>
            )}
            {isCloseCallYamaTest && (
              <div className="p-2.5 rounded-lg bg-[#F28C28]/10 border border-[#F28C28]/30 text-xs text-[#F28C28] leading-relaxed whitespace-pre-line">
                {CONTENT.endings.closeCall.yamaTest}
              </div>
            )}

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
              <div className="bg-[#050C17] border border-[#2A4A7A]/50 rounded-lg p-2.5">
                <div className="text-[10px] text-[#9FB0C8] uppercase">
                  KESİNTİ SÜRESİ
                </div>
                <div className="text-sm font-bold text-[#2FB67C] mt-0.5">
                  14 dk
                </div>
              </div>
              <div className="bg-[#050C17] border border-[#2A4A7A]/50 rounded-lg p-2.5">
                <div className="text-[10px] text-[#9FB0C8] uppercase">
                  BAŞARILI REÇETE
                </div>
                <div className="text-sm font-bold text-[#2FB67C] mt-0.5">
                  1.420 Adet
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BAD Ending Container (Rendered ONLY if bad) */}
        {isBad && (
          <div
            data-testid="ending-bad"
            className="bg-[#13294B] border border-[#2A4A7A] rounded-xl p-4 relative overflow-hidden space-y-3"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#E5484D]" />
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-1.5 text-[#E5484D] font-semibold">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span className="uppercase tracking-wider">NÖBET SONU</span>
              </div>
              <span className="font-mono text-[#9FB0C8]">10:45</span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#F2F5FA]">
              {CONTENT.endings.badTitle}
            </h1>

            <p className="text-[13px] leading-relaxed text-[#9FB0C8] whitespace-pre-line">
              ReçeteKöprü 10:45'te ikinci kez çöktü ve ilaç ile tanı bilgisi içeren
              reçete logları ekip kanalına sızdı.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
              <div className="bg-[#050C17] border border-[#2A4A7A]/50 rounded-lg p-2.5">
                <div className="text-[10px] text-[#9FB0C8] uppercase">
                  KESİNTİ SÜRESİ
                </div>
                <div className="text-sm font-bold text-[#E5484D] mt-0.5">
                  42 dk 18 sn
                </div>
              </div>
              <div className="bg-[#050C17] border border-[#2A4A7A]/50 rounded-lg p-2.5">
                <div className="text-[10px] text-[#9FB0C8] uppercase">
                  ETKİLENEN REÇETE
                </div>
                <div className="text-sm font-bold text-[#F28C28] mt-0.5">
                  1.420 Adet
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reason Rows on BAD (Rendered ONLY if bad and respective reason applies) */}
        {isBad && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#9FB0C8] uppercase tracking-wider">
                KRİTİK BULGULAR
              </span>
              <span className="text-[#E5484D] font-bold">
                {(hasCrashReason ? 1 : 0) + (hasKvkkReason ? 1 : 0)} Hata
              </span>
            </div>

            {/* Crash Reason: Section 5 requirement */}
            {hasCrashReason && (
              <div
                data-testid="ending-reason-crash"
                className="p-3 rounded-xl bg-[#E5484D]/[0.08] border border-[#E5484D]/30 flex items-start gap-2.5 text-xs text-[#F2F5FA] leading-relaxed whitespace-pre-line"
              >
                <div className="text-[#E5484D] mt-0.5 shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <span>{CONTENT.endings.badCrash} </span>
                  <span
                    data-testid="ending-patient-impact"
                    className="font-medium text-[#F2F5FA]"
                  >
                    {CONTENT.endings.badCrashPatientImpact}
                  </span>
                  <span> {CONTENT.endings.clinicalNote}</span>
                </div>
              </div>
            )}

            {/* KVKK Reason: Section 5 requirement */}
            {hasKvkkReason && (
              <div
                data-testid="ending-reason-kvkk"
                className="p-3 rounded-xl bg-[#E5484D]/[0.08] border border-[#E5484D]/30 flex items-start gap-2.5 text-xs text-[#F2F5FA] leading-relaxed whitespace-pre-line"
              >
                <div className="text-[#E5484D] mt-0.5 shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div>{CONTENT.endings.badKvkk}</div>
              </div>
            )}
          </div>
        )}

        {/* Karar Özeti (ending-summary): 3 rows, focus decision first, highlighted */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#9FB0C8] uppercase tracking-wider">
              {CONTENT.endings.summaryTitle}
            </span>
            <span className="text-[#9FB0C8]">
              {isBad ? '3/3 İncelendi' : '3/3 Başarılı'}
            </span>
          </div>

          <div data-testid="ending-summary" className="space-y-2">
            {sortedSummaries.map((item) => {
              const isItemFocus = item.id === focusDecisionId;
              const titleText = `${item.category} — ${item.label}${
                item.timedOut ? ` ${CONTENT.common.timeoutTag}` : ''
              }`;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 relative transition-all ${
                    isItemFocus
                      ? 'bg-[#1C3A66] border-[#2A4A7A] border-l-4 border-l-[#F28C28]'
                      : 'bg-[#13294B] border-[#2A4A7A]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#050C17] border border-[#2A4A7A] text-[11px] font-mono text-[#9FB0C8] flex items-center justify-center shrink-0 mt-0.5">
                      {item.num}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-medium text-[#F2F5FA]">
                          {titleText}
                        </span>
                        {isItemFocus && (
                          <span className="bg-[#F28C28] text-[#0B1B33] text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded">
                            {CONTENT.common.focusBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#9FB0C8] leading-relaxed whitespace-pre-line">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                      item.isGood ? 'bg-[#2FB67C]' : 'bg-[#F28C28]'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Role Lesson Card (ending-role-lesson) */}
        <div
          data-testid="ending-role-lesson"
          className="bg-[#1C3A66] border border-[#2A4A7A] rounded-xl p-4 space-y-1.5"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#F28C28]">
            <svg
              viewBox="0 0 24 24"
              width="13"
              height="13"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>{CONTENT.endings.roleLessonTitle.toUpperCase()} · {roleNameUpper}</span>
          </div>
          <p className="text-[13px] leading-relaxed text-[#F2F5FA] whitespace-pre-line">
            {roleLesson}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-5 space-y-2.5">
        {/* Tutor Link */}
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

        {/* Primary Restart Button */}
        <button
          type="button"
          data-testid="restart-button"
          onClick={onRestart}
          className="w-full h-[52px] bg-[#F28C28] hover:bg-[#F28C28]/95 text-[#0B1B33] font-semibold text-[15px] rounded-xl flex items-center justify-center transition-all shadow-lg shadow-[#F28C28]/10"
        >
          {CONTENT.common.restart}
        </button>
      </div>
    </div>
  );
};
