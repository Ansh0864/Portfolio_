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
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-zinc-950/70 backdrop-blur-md animate-fade-in cursor-pointer"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-zinc-200 p-4 sm:p-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Image Banner */}
        {project.image && (
          <div className="w-full h-40 sm:h-56 rounded-xl overflow-hidden mb-5 sm:mb-6 border border-zinc-200 relative bg-zinc-100">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/95 text-zinc-800 backdrop-blur-md border border-white/20">
                {project.category}
              </span>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="mb-5 sm:mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Sparkles size={12} />
            <span>{project.badge || project.category}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-zinc-900 mb-1">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            {project.subtitle}
          </p>
        </div>

        {/* Architecture / Flow Box */}
        <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
            <Network size={14} className="text-sky-600" />
            <span>System Architecture Flow</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-800 bg-white p-3 rounded-lg border border-zinc-200 shadow-sm leading-relaxed">
            {project.architecture}
          </p>
        </div>

        {/* Key Metrics Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-5 sm:mb-6">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-2 sm:p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-center">
              <span className="text-xs font-semibold text-indigo-900 block">{m}</span>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="mb-5 sm:mb-6">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Overview
          </h4>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Technical Contributions */}
        <div className="mb-5 sm:mb-6">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Core Engineering Contributions
          </h4>
          <div className="space-y-2.5">
            {project.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-6 sm:mb-8">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 font-mono border border-zinc-200"
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

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-4 border-t border-zinc-200">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl shadow-sm hover:shadow transition-all group"
          >
            <span>Open Live Deployment</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto sm:ml-auto px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
