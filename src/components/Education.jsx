import React from 'react';
import { education } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-20 border-t border-zinc-200 bg-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <GraduationCap size={12} /> Academic Foundations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Education & Academics
            </h2>
          </div>
          <p className="text-sm text-zinc-500 mt-2 md:mt-0 max-w-md">
            Rigorous foundations in computer science theory, algorithms, and core engineering principles.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {education.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-4 sm:p-7 border border-zinc-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-zinc-500 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={13} className="text-zinc-400" />
                    {item.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} className="text-zinc-400" />
                    {item.location}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-1">
                  {item.degree}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-sky-600 mb-4">
                  {item.institution}
                </p>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-zinc-100 flex items-center gap-2 text-xs text-zinc-500 font-medium">
                <Award size={14} className="text-emerald-500" />
                <span>Verified Academic Credential</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
