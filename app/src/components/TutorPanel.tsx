import React, { useState, useRef, useEffect } from 'react';
import { TutorMessage, TutorContext } from '../types.ts';
import { CONTENT } from '../content.ts';
import { askTutor } from '../services/tutor.ts';

interface TutorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: TutorMessage[];
  onAddMessage: (msg: TutorMessage) => void;
  context: TutorContext;
}

export const TutorPanel: React.FC<TutorPanelProps> = ({
  isOpen,
  onClose,
  messages,
  onAddMessage,
  context,
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  if (!isOpen) {
    return null;
  }

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const playerMsg: TutorMessage = {
      id: `p-${Date.now()}`,
      author: 'player',
      text: trimmed,
      timestamp: Date.now(),
    };

    onAddMessage(playerMsg);
    setInput('');
    setIsLoading(true);

    try {
      const tutorReply = await askTutor(context, [...messages, playerMsg], trimmed);
      const tutorMsg: TutorMessage = {
        id: `t-${Date.now()}`,
        author: 'tutor',
        text: tutorReply,
        timestamp: Date.now(),
      };
      onAddMessage(tutorMsg);
    } catch {
      const errorMsg: TutorMessage = {
        id: `t-err-${Date.now()}`,
        author: 'tutor',
        text: CONTENT.common.tutorError,
        timestamp: Date.now(),
      };
      onAddMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      data-testid="tutor-panel"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[390px] w-full bg-[#1C3A66] rounded-t-[20px] shadow-2xl border-t border-[#2A4A7A] flex flex-col h-[52vh] max-h-[480px] transition-transform duration-200"
    >
      {/* Drag handle */}
      <div className="pt-2.5 pb-1 flex justify-center">
        <div className="w-10 h-1 bg-[#2A4A7A] rounded-full" />
      </div>

      {/* Header */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-[#2A4A7A]/50">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#F28C28] text-[#0B1B33] flex items-center justify-center font-bold text-sm">
            ?
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-[#F2F5FA]">
                Tutor
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FB67C]" />
            </div>
            <p className="text-[11px] text-[#9FB0C8]">
              Cevabı söylemez, düşünmeni sağlar.
            </p>
          </div>
        </div>

        <button
          type="button"
          data-testid="tutor-close"
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#9FB0C8] hover:text-[#F2F5FA] hover:bg-[#13294B] transition-colors"
          aria-label={CONTENT.common.tutorCloseAria}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Message List */}
      <div
        data-testid="tutor-messages"
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
      >
        {messages.length === 0 && (
          <div className="py-6 text-center text-xs text-[#9FB0C8]">
            Krizdeki kararlarınla ilgili sorularını buraya yazabilirsin.
          </div>
        )}

        {messages.map((msg) => {
          const isPlayer = msg.author === 'player';
          return (
            <div
              key={msg.id}
              data-testid="tutor-message"
              data-author={msg.author}
              className={`flex ${isPlayer ? 'justify-end' : 'justify-start'}`}
            >
              {!isPlayer && (
                <div className="w-5 h-5 rounded-full bg-[#F28C28]/20 border border-[#F28C28]/40 text-[#F28C28] flex items-center justify-center text-[10px] font-mono mr-2 mt-1 shrink-0">
                  T
                </div>
              )}
              <div
                className={`max-w-[85%] text-[13px] leading-relaxed p-3 rounded-2xl ${
                  isPlayer
                    ? 'bg-[#13294B] text-[#F2F5FA] rounded-br-[2px]'
                    : 'bg-[#13294B]/70 border border-[#F28C28]/40 text-[#F2F5FA] rounded-bl-[2px]'
                }`}
              >
                <div>{msg.text}</div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div
            data-testid="tutor-loading"
            className="flex items-center gap-2 text-xs text-[#F28C28] py-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-ping" />
            <span className="text-[#9FB0C8] text-xs">Tutor düşünüyor...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-[#13294B]/80 border-t border-[#2A4A7A]/60 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          data-testid="tutor-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sorunu veya düşünceni yaz..."
          aria-label={CONTENT.common.tutorInputAria}
          disabled={isLoading}
          className="flex-1 bg-[#0B1B33] border border-[#2A4A7A] focus:border-[#F28C28] rounded-xl px-3.5 py-2.5 text-xs text-[#F2F5FA] placeholder-[#9FB0C8]/60 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          data-testid="tutor-send"
          disabled={isLoading || !input.trim()}
          className="h-10 px-4 bg-[#F28C28] hover:bg-[#F28C28]/90 disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1B33] font-semibold text-xs rounded-xl transition-all shrink-0 flex items-center justify-center"
        >
          {CONTENT.common.tutorSend}
        </button>
      </form>
    </div>
  );
};
