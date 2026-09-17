import React, { useState } from 'react';
import { faqs } from '../data/portfolioData';
import { HelpCircle, ChevronDown, Bot } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Ask AI Assistant about this FAQ
  const handleAskAi = (question) => {
    window.dispatchEvent(new CustomEvent('open-ai-chat', {
      detail: { query: question }
    }));
  };

  return (
    <section id="faq" className="py-20 border-t border-zinc-200 bg-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle size={12} /> Technical Insights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Engineering FAQ & Design Philosophy
          </h2>
          <p className="text-sm text-zinc-500 mt-2 max-w-lg mx-auto leading-relaxed">
            Deep dive into architectural choices, failover mechanics, and real-time state synchronization.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-zinc-50/50 border-zinc-200/60'
                    : 'bg-zinc-50/20 hover:bg-zinc-50/50 border-zinc-200/40 hover:border-zinc-200/60'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-zinc-50/40 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-zinc-900">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full bg-zinc-100/70 text-zinc-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-indigo-50 text-indigo-600' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/40 animate-fade-in space-y-4">
                    <p>{faq.answer}</p>

                    <div>
                      <button
                        onClick={() => handleAskAi(faq.question)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                      >
                        <Bot size={13} className="text-sky-400" />
                        <span>Dive Deeper with AI</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

