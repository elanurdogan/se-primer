import { TutorContext, TutorMessage } from '../types.ts';

/**
 * Formats the game state context block required by the Socratic tutor.
 */
function formatContextBlock(context: TutorContext): string {
  const decisionsText =
    context.verilenKararlar.length === 0
      ? 'Henüz karar verilmedi'
      : context.verilenKararlar
          .map(
            (d) =>
              `- ${d.karar}: ${d.secim}${d.zamanAsimi ? ' (süre doldu)' : ''}\n  Ne oldu: ${d.neOldu}\n  Neden oldu: ${d.nedenOldu}`
          )
          .join('\n');

  return `[BAĞLAM]
seviye: ${context.seviye}
rol: ${context.rol}
hedef: ${context.hedef}
odakKarar: ${context.odakKarar}
adim: ${context.adim}
acikKarar: ${context.acikKarar}
yansitmaIste: ${context.yansitmaIste}
verilenKararlar:
${decisionsText}
[/BAĞLAM]`;
}

/**
 * Sends a message to the Socratic AI tutor via the backend API endpoint.
 */
export async function askTutor(
  context: TutorContext,
  history: TutorMessage[],
  playerMessage: string
): Promise<string> {
  const contextBlock = formatContextBlock(context);
  const contextPrompt = `${contextBlock}\n\n${playerMessage}`;

  const response = await fetch('/api/tutor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contextPrompt,
      history,
      playerMessage,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error || `Tutor server responded with status ${response.status}`
    );
  }

  const data = await response.json();
  const reply = data?.reply?.trim();
  if (!reply) {
    throw new Error('Tutor returned an empty response.');
  }

  return reply;
}
