import React from 'react';
import { experience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section 
      id="experience" 
      className="relative z-10 bg-white rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-30px_70px_rgba(0,0,0,0.12)] border-t border-zinc-200/80 py-20 md:py-28 transition-colors duration-300 overflow-hidden"
    >
      {/* Giant Hollow Outline Watermark Heading Text (matching reference) */}
      <div 
        aria-hidden="true"
        className="absolute top-6 sm:top-8 md:top-10 left-1/2 -translate-x-1/2 w-full select-none text-center font-black tracking-widest text-transparent uppercase pointer-events-none text-6xl sm:text-8xl md:text-9xl lg:text-[145px] leading-none opacity-20 z-0"
        style={{ 
          WebkitTextStroke: '1.5px rgba(212, 212, 216, 0.9)',
          letterSpacing: '0.14em'
        }}
      >
        EXPERIENCE
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            Work History
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight uppercase">
            Work History & Experience
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-500 mt-2 max-w-xl leading-relaxed">
            Hands-on production contributions in multi-tenant architectures, real-time streaming, and conversational AI chatbots.
          </p>
        </div>

        {/* Both Boxes Fixed In Place — Unchanged Deliverables & Stacks */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 md:before:-translate-x-1/2 before:w-0.5 before:bg-zinc-200 before:hidden sm:before:block">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="relative glass-card glass-card-hover rounded-2xl p-6 sm:p-8 md:p-9 border border-zinc-200/80 shadow-card bg-white"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-zinc-100">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="text-zinc-400 font-normal">@</span>
                    <span className="text-lg sm:text-xl font-bold text-sky-600">
                      {exp.company}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-medium border border-zinc-200">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-50 border border-zinc-200 font-mono text-zinc-700">
                    {exp.period}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-zinc-600">
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-zinc-700 mb-5 font-normal leading-relaxed">
                {exp.description}
              </p>

              {/* 4 Equal Deliverable Bullets (Zero Icons/Emojis) */}
              <div className="space-y-3 mb-6">
                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    <span className="text-sky-500 font-bold select-none shrink-0 mt-0.5 text-base leading-none">•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills (8 Items Each) */}
              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-1.5">Stack:</span>
                {exp.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 font-mono font-medium border border-zinc-200/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
