import React from 'react';
import { LevelKey, RoleKey, GoalKey } from '../types.ts';
import { CONTENT } from '../content.ts';

interface ScreenProfilProps {
  level: LevelKey | null;
  role: RoleKey | null;
  goal: GoalKey | null;
  onSelectLevel: (lvl: LevelKey) => void;
  onSelectRole: (r: RoleKey) => void;
  onSelectGoal: (g: GoalKey) => void;
  onSubmit: () => void;
}

export const ScreenProfil: React.FC<ScreenProfilProps> = ({
  level,
  role,
  goal,
  onSelectLevel,
  onSelectRole,
  onSelectGoal,
  onSubmit,
}) => {
  const answeredCount = (level ? 1 : 0) + (role ? 1 : 0) + (goal ? 1 : 0);
  const isComplete = answeredCount === 3;

  return (
    <div className="flex-1 flex flex-col justify-between p-4 pt-5 pb-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#F28C28] mb-1 font-mono">
            NÖBET DEVRİ
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F2F5FA] mb-1.5">
            {CONTENT.profile.title}
          </h1>
          <p className="text-sm leading-relaxed text-[#9FB0C8]">
            {CONTENT.profile.instruction}
          </p>
        </div>

        {/* Survey Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#9FB0C8] tracking-wider uppercase">
              ANKET İLERLEMESİ
            </span>
            <span className="text-[#F28C28] font-bold">
              {answeredCount} / 3
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 h-1.5">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-full rounded-full transition-colors ${
                  step <= answeredCount ? 'bg-[#F28C28]' : 'bg-[#2A4A7A]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question 1: Level */}
        <div className="space-y-2.5">
          <h2 className="text-[15px] font-semibold text-[#F2F5FA]">
            {CONTENT.profile.level.question}
          </h2>
          <div className="space-y-2">
            {/* Beginner */}
            <button
              type="button"
              data-testid="level-beginner"
              onClick={() => onSelectLevel('beginner')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                level === 'beginner'
                  ? 'bg-[#1C3A66] border-[#F28C28] border-2 shadow-md'
                  : 'bg-[#13294B] border-[#2A4A7A] hover:bg-[#13294B]/90'
              }`}
            >
              <div>
                <div className="text-[15px] font-medium text-[#F2F5FA]">
                  {CONTENT.profile.level.options.beginner}
                </div>
                <div className="text-xs text-[#9FB0C8] mt-0.5">
                  Her kararda ipucu görürsün.
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  level === 'beginner'
                    ? 'border-[#F28C28] bg-[#F28C28] text-[#0B1B33]'
                    : 'border-[#2A4A7A]'
                }`}
              >
                {level === 'beginner' && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>

            {/* Intermediate */}
            <button
              type="button"
              data-testid="level-intermediate"
              onClick={() => onSelectLevel('intermediate')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                level === 'intermediate'
                  ? 'bg-[#1C3A66] border-[#F28C28] border-2 shadow-md'
                  : 'bg-[#13294B] border-[#2A4A7A] hover:bg-[#13294B]/90'
              }`}
            >
              <div>
                <div className="text-[15px] font-medium text-[#F2F5FA]">
                  {CONTENT.profile.level.options.intermediate}
                </div>
                <div className="text-xs text-[#9FB0C8] mt-0.5">
                  İstersen ipucu açabilirsin.
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  level === 'intermediate'
                    ? 'border-[#F28C28] bg-[#F28C28] text-[#0B1B33]'
                    : 'border-[#2A4A7A]'
                }`}
              >
                {level === 'intermediate' && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>

            {/* Experienced */}
            <button
              type="button"
              data-testid="level-experienced"
              onClick={() => onSelectLevel('experienced')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                level === 'experienced'
                  ? 'bg-[#1C3A66] border-[#F28C28] border-2 shadow-md'
                  : 'bg-[#13294B] border-[#2A4A7A] hover:bg-[#13294B]/90'
              }`}
            >
              <div>
                <div className="text-[15px] font-medium text-[#F2F5FA]">
                  {CONTENT.profile.level.options.experienced}
                </div>
                <div className="text-xs text-[#9FB0C8] mt-0.5">
                  İpucu yok, her karar için 60 saniyen var.
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  level === 'experienced'
                    ? 'border-[#F28C28] bg-[#F28C28] text-[#0B1B33]'
                    : 'border-[#2A4A7A]'
                }`}
              >
                {level === 'experienced' && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Question 2: Role */}
        <div className="space-y-2.5">
          <h2 className="text-[15px] font-semibold text-[#F2F5FA]">
            {CONTENT.profile.role.question}
          </h2>
          <div className="space-y-2">
            {/* Backend */}
            <button
              type="button"
              data-testid="role-backend"
              onClick={() => onSelectRole('backend')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                role === 'backend'
                  ? 'bg-[#1C3A66] border-[#F28C28] border-2 shadow-md'
                  : 'bg-[#13294B] border-[#2A4A7A] hover:bg-[#13294B]/90'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-[#9FB0C8]">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                  </svg>
                </div>
                <div className="text-[15px] font-medium text-[#F2F5FA]">
                  {CONTENT.profile.role.options.backend}
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  role === 'backend'
                    ? 'border-[#F28C28] bg-[#F28C28] text-[#0B1B33]'
                    : 'border-[#2A4A7A]'
                }`}
              >
                {role === 'backend' && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>

            {/* QA */}
            <button
              type="button"
              data-testid="role-qa"
              onClick={() => onSelectRole('qa')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                role === 'qa'
                  ? 'bg-[#1C3A66] border-[#F28C28] border-2 shadow-md'
                  : 'bg-[#13294B] border-[#2A4A7A] hover:bg-[#13294B]/90'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-[#9FB0C8]">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <div className="text-[15px] font-medium text-[#F2F5FA]">
                  {CONTENT.profile.role.options.qa}
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  role === 'qa'
                    ? 'border-[#F28C28] bg-[#F28C28] text-[#0B1B33]'
                    : 'border-[#2A4A7A]'
                }`}
              >
                {role === 'qa' && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>

            {/* PM */}
            <button
              type="button"
              data-testid="role-pm"
              onClick={() => onSelectRole('pm')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                role === 'pm'
                  ? 'bg-[#1C3A66] border-[#F28C28] border-2 shadow-md'
                  : 'bg-[#13294B] border-[#2A4A7A] hover:bg-[#13294B]/90'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-[#9FB0C8]">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div className="text-[15px] font-medium text-[#F2F5FA]">
                  {CONTENT.profile.role.options.pm}
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  role === 'pm'
                    ? 'border-[#F28C28] bg-[#F28C28] text-[#0B1B33]'
                    : 'border-[#2A4A7A]'
                }`}
              >
                {role === 'pm' && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Question 3: Goal */}
        <div className="space-y-2.5">
          <h2 className="text-[15px] font-semibold text-[#F2F5FA]">
            {CONTENT.profile.goal.question}
          </h2>
          <div className="space-y-2">
            {/* Architecture */}
            <button
              type="button"
              data-testid="goal-architecture"
              onClick={() => onSelectGoal('architecture')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                goal === 'architecture'
                  ? 'bg-[#1C3A66] border-[#F28C28] border-2 shadow-md'
                  : 'bg-[#13294B] border-[#2A4A7A] hover:bg-[#13294B]/90'
              }`}
            >
              <div className="text-[15px] font-medium text-[#F2F5FA]">
                {CONTENT.profile.goal.options.architecture}
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  goal === 'architecture'
                    ? 'border-[#F28C28] bg-[#F28C28] text-[#0B1B33]'
                    : 'border-[#2A4A7A]'
                }`}
              >
                {goal === 'architecture' && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>

            {/* Testing */}
            <button
              type="button"
              data-testid="goal-testing"
              onClick={() => onSelectGoal('testing')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                goal === 'testing'
                  ? 'bg-[#1C3A66] border-[#F28C28] border-2 shadow-md'
                  : 'bg-[#13294B] border-[#2A4A7A] hover:bg-[#13294B]/90'
              }`}
            >
              <div className="text-[15px] font-medium text-[#F2F5FA]">
                {CONTENT.profile.goal.options.testing}
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  goal === 'testing'
                    ? 'border-[#F28C28] bg-[#F28C28] text-[#0B1B33]'
                    : 'border-[#2A4A7A]'
                }`}
              >
                {goal === 'testing' && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>

            {/* KVKK */}
            <button
              type="button"
              data-testid="goal-kvkk"
              onClick={() => onSelectGoal('kvkk')}
              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                goal === 'kvkk'
                  ? 'bg-[#1C3A66] border-[#F28C28] border-2 shadow-md'
                  : 'bg-[#13294B] border-[#2A4A7A] hover:bg-[#13294B]/90'
              }`}
            >
              <div className="text-[15px] font-medium text-[#F2F5FA]">
                {CONTENT.profile.goal.options.kvkk}
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  goal === 'kvkk'
                    ? 'border-[#F28C28] bg-[#F28C28] text-[#0B1B33]'
                    : 'border-[#2A4A7A]'
                }`}
              >
                {goal === 'kvkk' && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 space-y-2">
        <button
          type="button"
          data-testid="profile-submit"
          disabled={!isComplete}
          onClick={onSubmit}
          className="w-full h-[52px] bg-[#F28C28] hover:bg-[#F28C28]/95 disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1B33] font-semibold text-[15px] rounded-xl flex items-center justify-center transition-all shadow-lg shadow-[#F28C28]/10"
        >
          {CONTENT.profile.submit}
        </button>
        {!isComplete && (
          <p className="text-center text-xs text-[#9FB0C8]">
            {CONTENT.profile.instruction}
          </p>
        )}
      </div>
    </div>
  );
};
