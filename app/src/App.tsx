import React, { useState } from 'react';
import {
  GameState,
  LevelKey,
  RoleKey,
  GoalKey,
  K1Choice,
  K2Choice,
  K3Choice,
  DecisionChoice,
  DecisionId,
  TutorMessage,
  TutorContext,
} from './types.ts';
import { CONTENT } from './content.ts';
import { TopBar } from './components/TopBar.tsx';
import { ScreenKarsilama } from './components/ScreenKarsilama.tsx';
import { ScreenProfil } from './components/ScreenProfil.tsx';
import { ScreenBrifing } from './components/ScreenBrifing.tsx';
import { ScreenKarar } from './components/ScreenKarar.tsx';
import { ScreenSonuc } from './components/ScreenSonuc.tsx';
import { ScreenSon } from './components/ScreenSon.tsx';
import { TutorPanel } from './components/TutorPanel.tsx';

export default function App() {
  // Navigation / State Machine
  const [state, setState] = useState<GameState>('Karsilama');

  // User Profile
  const [level, setLevel] = useState<LevelKey | null>(null);
  const [role, setRole] = useState<RoleKey | null>(null);
  const [goal, setGoal] = useState<GoalKey | null>(null);

  // Decision Choices
  const [k1, setK1] = useState<K1Choice | null>(null);
  const [k2, setK2] = useState<K2Choice | null>(null);
  const [k3, setK3] = useState<K3Choice | null>(null);

  // Timeouts per decision
  const [zamanAsimi, setZamanAsimi] = useState<Record<DecisionId, boolean>>({
    K1: false,
    K2: false,
    K3: false,
  });

  // Tutor State
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorMessages, setTutorMessages] = useState<TutorMessage[]>([]);
  const [hasUnreadTutorMsg, setHasUnreadTutorMsg] = useState(false);

  // Focus Decision based on Goal
  const focusDecisionId: DecisionId =
    goal === 'architecture' ? 'K1' : goal === 'testing' ? 'K2' : 'K3';

  // Construct Tutor Context
  const getTutorContext = (yansitmaIste: 'evet' | 'hayır' = 'hayır'): TutorContext => {
    const seviyeLabel = level ? CONTENT.profile.level.options[level] : 'Belirtilmedi';
    const rolLabel = role ? CONTENT.profile.role.options[role] : 'Belirtilmedi';
    const hedefLabel = goal ? CONTENT.profile.goal.options[goal] : 'Belirtilmedi';

    let acikKarar = 'yok';
    if (state === 'Brifing' || state === 'K1') acikKarar = 'K1';
    else if (state === 'S1' || state === 'K2') acikKarar = 'K2';
    else if (state === 'S2' || state === 'K3') acikKarar = 'K3';
    else acikKarar = 'yok';

    const verilenKararlar: TutorContext['verilenKararlar'] = [];

    if (k1) {
      const opt = k1 === 'geri' ? CONTENT.decisions.K1.options.A : CONTENT.decisions.K1.options.B;
      verilenKararlar.push({
        karar: 'K1 (Mimari)',
        secim: opt.label,
        zamanAsimi: zamanAsimi.K1,
        neOldu: opt.what,
        nedenOldu: opt.why,
      });
    }

    if (k2) {
      const opt = k2 === 'test' ? CONTENT.decisions.K2.options.A : CONTENT.decisions.K2.options.B;
      const whatText =
        k2 === 'test'
          ? CONTENT.decisions.K2.options.A.what
          : CONTENT.decisions.K2.options.B.whatByK1[k1 || 'geri'];

      verilenKararlar.push({
        karar: 'K2 (Test)',
        secim: opt.label,
        zamanAsimi: zamanAsimi.K2,
        neOldu: whatText,
        nedenOldu: opt.why,
      });
    }

    if (k3) {
      const opt = k3 === 'maske' ? CONTENT.decisions.K3.options.A : CONTENT.decisions.K3.options.B;
      verilenKararlar.push({
        karar: 'K3 (KVKK)',
        secim: opt.label,
        zamanAsimi: zamanAsimi.K3,
        neOldu: opt.what,
        nedenOldu: opt.why,
      });
    }

    return {
      seviye: seviyeLabel,
      rol: rolLabel,
      hedef: hedefLabel,
      odakKarar: focusDecisionId,
      adim: state,
      acikKarar,
      verilenKararlar,
      yansitmaIste,
    };
  };

  // Reset Game completely in-memory (Section 6 & 8)
  const handleRestart = () => {
    setState('Karsilama');
    setLevel(null);
    setRole(null);
    setGoal(null);
    setK1(null);
    setK2(null);
    setK3(null);
    setZamanAsimi({ K1: false, K2: false, K3: false });
    setIsTutorOpen(false);
    setTutorMessages([]);
    setHasUnreadTutorMsg(false);
  };

  const handleOpenTutor = () => {
    setIsTutorOpen(true);
    setHasUnreadTutorMsg(false);
  };

  const handleAddTutorMessage = (msg: TutorMessage) => {
    setTutorMessages((prev) => [...prev, msg]);
  };

  // Decision selection handler
  const handleDecisionSelect = (
    id: DecisionId,
    choice: DecisionChoice,
    timedOut: boolean = false
  ) => {
    if (timedOut) {
      setZamanAsimi((prev) => ({ ...prev, [id]: true }));
    }

    if (id === 'K1') {
      setK1(choice as K1Choice);
      setState('S1');
    } else if (id === 'K2') {
      setK2(choice as K2Choice);
      setState('S2');
    } else if (id === 'K3') {
      setK3(choice as K3Choice);
      setState('S3');
    }
  };

  // Evaluate ending (Choice node: Degerlendir)
  const handleEvaluateEnding = () => {
    // Rule: BAD <=> (k3 = ham) OR (k1 = yama AND k2 = hemen). Otherwise GOOD.
    const isBad = k3 === 'ham' || (k1 === 'yama' && k2 === 'hemen');
    if (isBad) {
      setState('SonKotu');
    } else {
      setState('SonIyi');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07101E] text-[#F2F5FA] flex justify-center selection:bg-[#F28C28] selection:text-[#0B1B33]">
      {/* 390px Mobile Viewport Container */}
      <main className="w-full max-w-[390px] min-h-screen bg-[#0B1B33] flex flex-col relative shadow-2xl border-x border-[#2A4A7A]/30 overflow-x-hidden">
        {/* Sticky Top Bar & Status Strip */}
        <TopBar state={state} />

        {/* Screen State Machine */}
        <div className="flex-1 flex flex-col">
          {state === 'Karsilama' && (
            <ScreenKarsilama onStart={() => setState('Profil')} />
          )}

          {state === 'Profil' && (
            <ScreenProfil
              level={level}
              role={role}
              goal={goal}
              onSelectLevel={setLevel}
              onSelectRole={setRole}
              onSelectGoal={setGoal}
              onSubmit={() => setState('Brifing')}
            />
          )}

          {state === 'Brifing' && role && (
            <ScreenBrifing
              role={role}
              onContinue={() => setState('K1')}
              onOpenTutor={handleOpenTutor}
              hasUnreadTutorMsg={hasUnreadTutorMsg}
            />
          )}

          {state === 'K1' && level && role && (
            <ScreenKarar
              decisionId="K1"
              level={level}
              role={role}
              isFocus={focusDecisionId === 'K1'}
              onSelectChoice={(choice, timedOut) =>
                handleDecisionSelect('K1', choice, timedOut)
              }
              onOpenTutor={handleOpenTutor}
              hasUnreadTutorMsg={hasUnreadTutorMsg}
            />
          )}

          {state === 'S1' && k1 && (
            <ScreenSonuc
              decisionId="K1"
              choice={k1}
              timedOut={zamanAsimi.K1}
              isFocus={focusDecisionId === 'K1'}
              onContinue={() => setState('K2')}
              onOpenTutor={handleOpenTutor}
              tutorContext={getTutorContext()}
              tutorMessages={tutorMessages}
              onAddTutorMessage={handleAddTutorMessage}
              hasUnreadTutorMsg={hasUnreadTutorMsg}
              setHasUnreadTutorMsg={setHasUnreadTutorMsg}
            />
          )}

          {state === 'K2' && level && role && (
            <ScreenKarar
              decisionId="K2"
              level={level}
              role={role}
              isFocus={focusDecisionId === 'K2'}
              onSelectChoice={(choice, timedOut) =>
                handleDecisionSelect('K2', choice, timedOut)
              }
              onOpenTutor={handleOpenTutor}
              hasUnreadTutorMsg={hasUnreadTutorMsg}
            />
          )}

          {state === 'S2' && k2 && (
            <ScreenSonuc
              decisionId="K2"
              choice={k2}
              k1Choice={k1 || undefined}
              timedOut={zamanAsimi.K2}
              isFocus={focusDecisionId === 'K2'}
              onContinue={() => setState('K3')}
              onOpenTutor={handleOpenTutor}
              tutorContext={getTutorContext()}
              tutorMessages={tutorMessages}
              onAddTutorMessage={handleAddTutorMessage}
              hasUnreadTutorMsg={hasUnreadTutorMsg}
              setHasUnreadTutorMsg={setHasUnreadTutorMsg}
            />
          )}

          {state === 'K3' && level && role && (
            <ScreenKarar
              decisionId="K3"
              level={level}
              role={role}
              isFocus={focusDecisionId === 'K3'}
              onSelectChoice={(choice, timedOut) =>
                handleDecisionSelect('K3', choice, timedOut)
              }
              onOpenTutor={handleOpenTutor}
              hasUnreadTutorMsg={hasUnreadTutorMsg}
            />
          )}

          {state === 'S3' && k3 && (
            <ScreenSonuc
              decisionId="K3"
              choice={k3}
              timedOut={zamanAsimi.K3}
              isFocus={focusDecisionId === 'K3'}
              onContinue={handleEvaluateEnding}
              onOpenTutor={handleOpenTutor}
              tutorContext={getTutorContext()}
              tutorMessages={tutorMessages}
              onAddTutorMessage={handleAddTutorMessage}
              hasUnreadTutorMsg={hasUnreadTutorMsg}
              setHasUnreadTutorMsg={setHasUnreadTutorMsg}
            />
          )}

          {(state === 'SonIyi' || state === 'SonKotu') &&
            k1 &&
            k2 &&
            k3 &&
            role &&
            goal && (
              <ScreenSon
                k1={k1}
                k2={k2}
                k3={k3}
                zamanAsimi={zamanAsimi}
                role={role}
                goal={goal}
                onRestart={handleRestart}
                onOpenTutor={handleOpenTutor}
                hasUnreadTutorMsg={hasUnreadTutorMsg}
              />
            )}
        </div>

        {/* Tutor Overlay Panel */}
        <TutorPanel
          isOpen={isTutorOpen}
          onClose={() => setIsTutorOpen(false)}
          messages={tutorMessages}
          onAddMessage={handleAddTutorMessage}
          context={getTutorContext()}
        />
      </main>
    </div>
  );
}
