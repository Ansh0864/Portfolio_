import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Network, Sparkles, ArrowUpRight, AlertCircle } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/70 backdrop-blur-md animate-fade-in cursor-pointer"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-zinc-200 p-6 sm:p-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Image Banner */}
        {project.image && (
          <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-6 border border-zinc-200 dark:border-zinc-800 relative bg-zinc-100 dark:bg-[#141418]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/95 dark:bg-[#121215]/95 text-zinc-800 dark:text-zinc-200 backdrop-blur-md border border-white/20 dark:border-zinc-700">
                {project.category}
              </span>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <Sparkles size={12} />
            <span>{project.badge || project.category}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            {project.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {project.subtitle}
          </p>
        </div>

        {/* Architecture / Flow Box */}
        <div className="mb-6 p-4 rounded-xl bg-zinc-50 dark:bg-[#18181e] border border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
            <Network size={14} className="text-sky-600 dark:text-indigo-400" />
            <span>System Architecture Flow</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#121215] p-3 rounded-lg border border-zinc-200 dark:border-zinc-700/80 shadow-sm leading-relaxed">
            {project.architecture}
          </p>
        </div>

        {/* Key Metrics Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 text-center">
              <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-300 block">{m}</span>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Overview
          </h4>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Technical Contributions */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Core Engineering Contributions
          </h4>
          <div className="space-y-2.5">
            {project.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-8">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-[#18181e] text-zinc-800 dark:text-zinc-200 font-mono border border-zinc-200 dark:border-zinc-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Render Free-Tier Cold Start Notice */}
        {project.demoLink && project.demoLink.includes('onrender.com') && (
          <div className="flex items-start gap-2.5 p-3 mb-6 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs leading-relaxed">
            <AlertCircle size={15} className="text-amber-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold">Note on Live Instance:</span> Hosted on Render free tier. If the backend service is in sleep mode, initial cold-start may take ~30–50 seconds to spin up.
            </div>
          </div>
        )}

        {/* Action Links (GitHub link removed as requested) */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 rounded-xl shadow-sm hover:shadow transition-all group"
          >
            <span>Open Live Deployment</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={onClose}
            className="ml-auto px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
