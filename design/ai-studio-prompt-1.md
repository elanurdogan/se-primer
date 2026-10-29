# Build: "SE Primer" — a mobile crisis game for software engineering students

**This is Part 1 of 2** (structure, design, flow, test ids). Part 2 follows in my next message with all Turkish game content and the tutor system instruction.

You are building a complete, self-contained web app. You cannot see any repository; everything you need is in this prompt. I will also attach **4 screenshots exported from Stitch**: `giris.png` (profile screen), `sahne.png` (decision screen with tutor panel open), `son-kotu.png` (bad ending), `son-iyi.png` (good ending). Use them as the **visual reference only**. All on-screen text, numbers and behavior come from this prompt, never from the screenshots.

**All user-facing text is Turkish** and must be used **exactly** as written below (character for character, including Turkish letters ç ğ ı İ ö ş ü). Do not translate, shorten, rephrase or "improve" any Turkish string.

---

## 1. Purpose and scope

SE Primer is a short (5–8 minute) single-session game. It is 08:30, the fictional e-prescription service **ReçeteKöprü** crashed after last night's release, and the player is on call. The player makes **3 decisions** (architecture, testing, KVKK/data protection), sees what happened and why after each one, and reaches **one of 2 endings**. A **Socratic AI tutor** (Gemini) helps the player think. It asks questions and gives hints, and it **never gives the answer**.

All system and organization names (ReçeteKöprü, KSSK Provizyon Servisi) are fictional.

**In scope:** profile questions (level, role, goal) that personalize the game, 3 decisions, 2 endings, the tutor panel.

**Out of scope. Do NOT build:**
- Any account, login, sign-up or user database.
- Any real patient data. Patients are only `Hasta-001`, `Hasta-002`; prescriptions only `RX-XXXX`; national ID, drug and diagnosis codes only `***`. Never generate realistic names, IDs, phone numbers or prescription numbers.
- A second chapter or level.
- A native app. This is a mobile-first web app.
- Persistent storage. No localStorage, sessionStorage, IndexedDB or cookies for game state. Everything lives in memory and resets on page load.

---

## 2. Tech and architecture

- React + TypeScript single-page app, Tailwind CSS. Mobile-first; it must look **pixel-clean at 390 px width** (iPhone-sized viewport, e.g. 375×812 and 390×844), with no horizontal scroll. On wider screens, center a 390 px column.
- **Deterministic game logic.** The state machine, all game texts and both endings are fixed in code. **Gemini never generates game content, outcomes or endings.** Gemini is used **only** for the tutor chat.
- Put **all Turkish game text** in **one data file**, `src/content.ts`, exactly as given in Part 2. Components read strings only from this file (plus the tutor's replies).
- Put the tutor call in **one separate module**, `src/services/tutor.ts`, exporting a single function, e.g. `askTutor(context, history, playerMessage): Promise<string>`. No other file may call Gemini. It must be easy to mock in tests, and requests must go through the browser's network layer (fetch/HTTP) so Cypress `cy.intercept` can stub them.
- The tutor's **system instruction is the exact text given in Part 2**, embedded verbatim as a string constant (e.g. `src/prompts/tutorSystem.ts`). Do not edit it.
- Use the Gemini API key mechanism AI Studio Build provides. Never hard-code a key.
- **Timer:** implement with `setInterval`/`setTimeout` and `Date` (not `requestAnimationFrame` or `performance.now`) so Cypress `cy.clock()` / `cy.tick()` can control it.

---

## 3. Design system (from the Stitch export)

Dark theme only.

**Colors**

| Token | Hex | Use |
|---|---|---|
| appBg | `#0B1B33` | app background |
| cardSurface | `#13294B` | cards, option buttons |
| selectedSurface | `#1C3A66` | selected option, tutor panel, highlighted summary row |
| appBorder | `#2A4A7A` | borders, inactive progress segments |
| accentOrange | `#F28C28` | primary buttons, selection border, focus badge, timer, links |
| primaryText | `#F2F5FA` | main text |
| secondaryText | `#9FB0C8` | secondary text, labels |
| successGreen | `#2FB67C` | good ending accents, "stable" status dot |
| dangerRed | `#E5484D` | bad ending accents, reason rows (at 8% opacity background) |

Outside the 390 px column, the page background is `#07101E`. Terminal-style lines in role cards use `#050C17` as background.

**Fonts:** Inter (400/500/600/700) for UI text; JetBrains Mono (400/500/600) for clock, status strip, timer, metrics, log lines and small uppercase labels. Load both from Google Fonts.

**Type scale:** screen title 24px bold; decision title 18px bold; section/question title 17px semibold; option title and primary button 15px (500, selected 600); body 14–15px; option description and helper text 13px; mono labels 11px; badges 10px uppercase bold with wide tracking.

**Radius:** 12px for cards, options and buttons; 20px top corners for the tutor bottom sheet; 16px for chat bubbles (the corner next to the speaker is 2px); 8px for metric boxes; 4px for badges; full for dots, progress segments and the timer pill.

**Spacing:** 16px horizontal page padding; 48px top bar; 20px top padding and 24px gaps between sections; 10px between option cards; 14px inner padding on option cards; 16px inner padding on result cards. Primary button height 52px.

**Components (match the screenshots):**
- **Top bar** (sticky, 48px): orange plus-cross icon + "SE Primer" on the left, mono clock on the right. Below it, a thin mono **status strip** with a dot + "ReçeteKöprü · DURUM: KESİNTİ" (orange blinking dot) during the crisis, and "ReçeteKöprü · DURUM: STABİL" (green dot) on the good ending. These are decorative and need no test ids. Any numbers shown in decorative elements must not contradict the scenario (142 eczane, 1.240 reçete in queue, second crash at 10:45).
- **Progress bar:** 3 segments, 6px high. Filled segments orange, empty segments appBorder.
- **Profile option card:** cardSurface, 1px appBorder, 12px radius, empty 20px circle on the right. When selected: selectedSurface, 2px orange border, orange check mark.
- **Primary button:** full width, 52px, orange fill, appBg text, 15px semibold. When disabled: 40% opacity, `cursor: not-allowed`, and the real `disabled` attribute.
- **Decision screen:** "Odak karar" badge (orange fill, dark text) next to a category badge (outlined); timer pill on the right (orange ring + mono `0:42`); decision title; context card with a 3px orange left stripe; **role card** styled like a terminal (uppercase label + mono line on `#050C17`); **hint card** (lightbulb icon, uppercase "İPUCU" label, 12–13px text); two **equal-size option buttons** stacked, same color (never color-code the "right" answer), each with a title "A · …" / "B · …" and a one-line description.
- **Tutor panel:** bottom sheet, ~40% of the screen height, selectedSurface, 20px top radius, drag handle, header with an orange "?" circle + "Tutor" + close (X) button, scrollable message list (player bubbles right on cardSurface; tutor bubbles left, outlined with orange at 40%), input + orange send button at the bottom.
- **Ending screen:** header card with a 4px top stripe (red for bad, green for good), title, ending text; reason rows (red, 8% background, icon); "Karar özeti" list with numbered rows, the focus decision first, highlighted with selectedSurface, a 4px left stripe and an "Odak karar" badge; "Rolün için ders" card (selectedSurface, orange mono label); tutor link; primary "Yeniden oyna" button.

Screens without a Stitch screenshot (E1 Karşılama, E3 Brifing, E5 Sonuç) must be built **in the same design language** using these tokens and components.

---

## 4. Screens and flow (state machine)

| State | Screen | Description |
|---|---|---|
| `Karsilama` | E1 Karşılama | Welcome screen |
| `Profil` | E2 Profil | 3 profile questions on one screen |
| `Brifing` | E3 Brifing | 08:30 crisis briefing |
| `K1`, `K2`, `K3` | E4 Karar | Decision screens (one shared template). 60 s timer only for "Deneyimliyim" |
| `S1`, `S2`, `S3` | E5 Sonuç | Outcome screens ("Ne oldu?" / "Neden oldu?"). No timer |
| `Degerlendir` | — | Choice node, no screen |
| `SonIyi`, `SonKotu` | E6 Son | The two endings |

Session variables: `seviye`, `rol`, `hedef`, `k1 ∈ {geri, yama}`, `k2 ∈ {test, hemen}`, `k3 ∈ {maske, ham}`, and a `zamanAsimi: boolean` per decision.

Transitions:
- Karsilama → Profil: "Başla"
- Profil → Brifing: "Nöbeti devral" (enabled only when all 3 questions are answered)
- Brifing → K1: "Devam"
- K1 → S1: rollback (k1=geri) | hotfix (k1=yama) | timeout (k1=yama)
- S1 → K2: "Devam"
- K2 → S2: test (k2=test) | ship (k2=hemen) | timeout (k2=hemen)
- S2 → K3: "Devam"
- K3 → S3: mask (k3=maske) | raw (k3=ham) | timeout (k3=ham)
- S3 → Degerlendir: "Sonucu gör"
- Degerlendir → SonKotu if `k3 = ham` OR (`k1 = yama` AND `k2 = hemen`); otherwise → SonIyi
- SonIyi / SonKotu → Karsilama: "Yeniden oyna"

The **tutor panel (E7) is an overlay, not a state.** It can be opened and closed on every screen from Brifing to the endings. Opening it does not change the state and does **not** pause the timer.

Decisions always come in the order K1 → K2 → K3. The decisions and their outcomes **do not depend on the role**; the role only changes the perspective texts.

---

## 5. Endings: all 8 paths

Rule: **BAD ⇔ (k3 = ham) OR (k1 = yama AND k2 = hemen)**. Otherwise GOOD.

| # | K1 | K2 | K3 | Ending | Reason(s) shown |
|---|---|---|---|---|---|
| 1 | geri | test | maske | **GOOD (clean)** | — |
| 2 | geri | hemen | maske | **GOOD (close call)** | `closeCall.geriHemen` |
| 3 | yama | test | maske | **GOOD (close call)** | `closeCall.yamaTest` |
| 4 | yama | hemen | maske | **BAD** | crash |
| 5 | geri | test | ham | **BAD** | KVKK |
| 6 | geri | hemen | ham | **BAD** | KVKK |
| 7 | yama | test | ham | **BAD** | KVKK |
| 8 | yama | hemen | ham | **BAD** | crash + KVKK |

- On BAD, show **every** reason that applies: the crash reason (`ending-reason-crash`) holds `endings.badCrash` followed by `endings.clinicalNote`; the KVKK reason (`ending-reason-kvkk`) holds `endings.badKvkk`. Render a reason element **only** if it applies (otherwise it must not be in the DOM).
- On a close-call GOOD (#2, #3), show `endings.good` and, below it, the matching close-call note that names the risky decision.
- Decisions made by timeout count like normal decisions and are labeled "(süre doldu)" in the summary.

---

## 6. Personalization

**Level** (`seviye`):

| Answer | Hint card (`hint-box`) | "İpucu göster" (`hint-toggle`) | Timer (`timer`) |
|---|---|---|---|
| Yeni başladım | Shown, open automatically on every decision screen | Not rendered | Not rendered |
| Biraz deneyimim var | Hidden until the player presses the toggle | Rendered | Not rendered |
| Deneyimliyim | Not rendered | Not rendered | 60 s countdown on K1, K2, K3 |

- **The hint card and the timer are mutually exclusive.** They never appear together on any decision screen. "Not rendered" means the element is absent from the DOM, not just hidden.
- The timer starts at 60 on every decision screen and resets only when leaving the decision screen. It keeps running while the tutor panel is open. At 0, the decision's **risky option is applied automatically** (K1 → yama, K2 → hemen, K3 → ham), `zamanAsimi = true`, and the game moves to the outcome screen.
- On a timed-out outcome screen, show `outcome-timeout-note` with the text "Süre doldu" above the normal texts. In that case `outcome-what` shows the decision's `timeout.what` text followed by the risky option's normal `what` text (for K2, use the variant that matches K1). `outcome-why` shows `timeout.why` (if defined) followed by the risky option's normal `why` text.

**Role** (`rol`) changes only: the first message on the briefing screen, the role card on each decision screen, the tutor's framing (sent as context), and the "Rolün için ders" text on the ending.

**Goal** (`hedef`) selects the **focus decision**: Mimari / dağıtım kararları → K1, Test stratejisi → K2, KVKK ve veri güvenliği → K3. Effects:
1. The focus decision screen shows the **"Odak karar"** badge (`focus-badge`). Other decision screens do not render it.
2. The focus decision's outcome screen shows a collapsible **"Derinlemesine"** section (`outcome-deep`) with that decision's deep-dive items. Other outcome screens do not render it.
3. When the focus decision's outcome screen opens, the app calls the tutor once with `yansitmaIste: evet`, and the reply (a reflection question) is added to the tutor history. If the panel is closed, show a small dot on the `tutor-open` button; do not force the panel open.
4. On the ending, the focus decision is listed **first** in the summary and highlighted.

**"Yeniden oyna"** (`restart-button`): does **not** reload the page (never `location.reload()`). It resets the game state (k1–k3, every `zamanAsimi`, the timer), the profile (seviye, rol, hedef) **and the tutor message history**, then returns to Karsilama.

---

## 7. All game content

**Comes in Part 2** (my next message): the complete `src/content.ts` file, exporting one `CONTENT` object (keys such as `CONTENT.common.*`, `CONTENT.profile.*`, `CONTENT.decisions.K1.options.A.what`, `CONTENT.endings.badCrash`, `CONTENT.endings.closeCall.geriHemen`, `CONTENT.endings.roleLesson[rol].good`). For now, build the components so that they read every string from `CONTENT`. **Do not invent any Turkish text.** Part 2 will replace the file.

---

## 8. `data-testid`: mandatory and exact

**Every interactive element must have a `data-testid`, and these names must be used EXACTLY as listed. Do not rename, translate, prefix or omit any of them.** Cypress E2E tests depend on them. Elements marked *(display)* are non-interactive but tested, so they need the id too. Conditional elements must be **absent from the DOM** when their condition is false.

E1 Karşılama
| Element | data-testid |
|---|---|
| Start button ("Başla") | `start-button` |

E2 Profil
| Element | data-testid |
|---|---|
| Level: Yeni başladım | `level-beginner` |
| Level: Biraz deneyimim var | `level-intermediate` |
| Level: Deneyimliyim | `level-experienced` |
| Role: Backend geliştirici | `role-backend` |
| Role: Test / QA mühendisi | `role-qa` |
| Role: Proje yöneticisi | `role-pm` |
| Goal: Mimari / dağıtım | `goal-architecture` |
| Goal: Test stratejisi | `goal-testing` |
| Goal: KVKK ve veri güvenliği | `goal-kvkk` |
| "Nöbeti devral" button (disabled until all 3 questions are answered) | `profile-submit` |

E3 Brifing
| Element | data-testid |
|---|---|
| Briefing text *(display)* | `briefing-text` |
| Role message *(display)* | `briefing-role-message` |
| Continue | `briefing-continue` |
| Open tutor | `tutor-open` |

E4 Karar (shared template for K1, K2, K3)
| Element | data-testid |
|---|---|
| Decision title *(display)* | `decision-title` |
| K1 options | `k1-option-rollback`, `k1-option-hotfix` |
| K2 options | `k2-option-test`, `k2-option-ship` |
| K3 options | `k3-option-mask`, `k3-option-raw` |
| Role card *(display)* | `role-card` |
| Focus badge *(display, focus decision only)* | `focus-badge` |
| Hint box *(display; beginner always, intermediate after toggle)* | `hint-box` |
| "İpucu göster" button *(intermediate only)* | `hint-toggle` |
| Countdown *(display, experienced only)* | `timer` |
| Open tutor | `tutor-open` |

E5 Sonuç (S1, S2, S3)
| Element | data-testid |
|---|---|
| "Süre doldu" note *(display, timeout only)* | `outcome-timeout-note` |
| Ne oldu? *(display)* | `outcome-what` |
| Neden oldu? *(display)* | `outcome-why` |
| Derinlemesine section (collapsible, focus decision only) | `outcome-deep` |
| Continue / See result ("Devam" / "Sonucu gör") | `outcome-continue` |
| Open tutor | `tutor-open` |

E6 Son
| Element | data-testid |
|---|---|
| GOOD ending container *(display)* | `ending-good` |
| BAD ending container *(display)* | `ending-bad` |
| Reason: second crash *(display)* | `ending-reason-crash` |
| Reason: KVKK breach *(display)* | `ending-reason-kvkk` |
| Decision summary (3 rows, focus decision first) *(display)* | `ending-summary` |
| Role lesson *(display)* | `ending-role-lesson` |
| Restart ("Yeniden oyna") | `restart-button` |
| Open tutor | `tutor-open` |

E7 Tutor panel (overlay on E3–E6)
| Element | data-testid |
|---|---|
| Panel container | `tutor-panel` |
| Message list *(display)* | `tutor-messages` |
| Single message, with `data-author="player"` or `data-author="tutor"` *(display)* | `tutor-message` |
| Loading indicator *(display)* | `tutor-loading` |
| Message input | `tutor-input` |
| Send | `tutor-send` |
| Close panel | `tutor-close` |

Only one `tutor-open` and one `tutor-panel` may exist in the DOM at a time. `ending-good` and `ending-bad` are never rendered together.

---

## 9. Tutor (the only place Gemini is used)

**System instruction:** use the text between the markers below **verbatim** as the Gemini system instruction. Do not modify, translate or summarize it.

**Context:** before every player message, `askTutor` prepends the `[BAĞLAM] … [/BAĞLAM]` block described in the system instruction, filled from the current game state:
- `seviye`, `rol`, `hedef`: the Turkish option labels.
- `odakKarar`: K1/K2/K3 from the goal.
- `adim`: the current state (Brifing, K1, S1, …, SonIyi, SonKotu).
- `acikKarar`: the decision not yet taken that the player is facing (K1 on Brifing; on Sx it is the next decision; `yok` on endings).
- `verilenKararlar`: only the decisions already taken, with label, timeout flag and their "Ne oldu"/"Neden oldu" texts. **Never send outcome texts of decisions not yet taken.**
- `yansitmaIste`: `evet` only for the automatic reflection call (section 6, goal effect 3), otherwise `hayır`.

Send the conversation history (player and tutor messages) with each call. Keep the tutor's replies as plain text.

**Behavior:**
- While waiting for a reply, show `tutor-loading`. Disable `tutor-send` while a request is pending or the input is empty.
- **Errors must never break the game.** On any failure (network, quota, timeout of about 20 s, empty reply), remove the loading indicator and show `CONTENT.common.tutorError` as a tutor-styled system message; the game keeps working.
- The timer keeps running while the panel is open.
- The tutor history persists across screens during a session and is cleared by "Yeniden oyna".

**The verbatim system instruction comes in Part 2.** Create `src/prompts/tutorSystem.ts` exporting an empty `TUTOR_SYSTEM_INSTRUCTION` string for now.

---

## 10. Final checklist

- [ ] 390 px wide layout is clean; no horizontal scroll; tap targets ≥ 44 px.
- [ ] All Turkish strings come from `src/content.ts` and match this prompt exactly.
- [ ] Game logic and endings are deterministic; the 8 paths match section 5.
- [ ] Hint card and timer never appear together; conditional elements are absent from the DOM when not applicable.
- [ ] Timer: 60 s, experienced only, runs while the tutor is open, auto-applies the risky option at 0.
- [ ] "Yeniden oyna" resets game state, profile and tutor history without reloading the page.
- [ ] Gemini is called only from `src/services/tutor.ts`, with the verbatim system instruction; failures show a polite message.
- [ ] Every `data-testid` in section 8 exists with the exact name.
- [ ] No login, no persistent storage, no real patient data.
