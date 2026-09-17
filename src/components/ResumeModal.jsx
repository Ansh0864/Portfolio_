import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { personalInfo, education, experience, projects, skillCategories } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-900/60 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white cursor-pointer"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-zinc-200 p-6 sm:p-10 print:max-w-none print:max-h-none print:shadow-none print:border-none print:p-0 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Action Bar */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-zinc-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-zinc-800">Curriculum Vitae Preview</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
              title="Print or Save as PDF"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="space-y-6 text-zinc-900 font-sans text-xs sm:text-sm">
          {/* Header */}
          <div className="border-b border-zinc-300 pb-4 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-1.5">
              {personalInfo.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-zinc-600">
              <span className="inline-flex items-center gap-1 font-medium">{personalInfo.email}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-medium">{personalInfo.phone}</span>
              <span>•</span>
              <span>{personalInfo.location}</span>
              <span>•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">LinkedIn</a>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">GitHub</a>
            </div>
          </div>

          {/* Profile */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
              Profile
            </h2>
            <p className="text-xs text-zinc-700 leading-relaxed text-justify">
              Motivated B.Tech Computer Science student (2027) with strong foundations in Data Structures and Algorithms using Java and hands-on experience in full-stack web development with React.js, Node.js, Express.js, and Tailwind CSS. Skilled in building scalable, API-driven web applications and integrating third-party services for real-world functionality. Experienced in Generative AI, RAG systems, LangGraph multi-agent orchestration, and machine learning using Python (NumPy, Pandas, TensorFlow, Scikit-learn). Passionate about building AI-augmented solutions, solving complex analytical problems, and making data-driven technical decisions.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <strong className="text-zinc-900">Bachelor of Technology in Computer Science</strong> — Guru Gobind Singh Indraprastha University
                </div>
                <span className="text-zinc-500 font-mono shrink-0">2023 – 2027</span>
              </div>
              <div className="flex justify-between items-start text-xs">
                <div>
                  <strong className="text-zinc-900">12th Science (PCM)</strong> — Vidya Jain Public School
                </div>
                <span className="text-zinc-500 font-mono shrink-0">2022 – 2023</span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="text-xs space-y-1 text-zinc-700">
              <p><strong>Languages:</strong> Java, Python, JavaScript, TypeScript, C, C++, SQL, PHP</p>
              <p><strong>Core CS Concepts:</strong> Data Structures & Algorithms, Object-Oriented Programming (OOP), DBMS, Operating Systems</p>
              <p><strong>Web & Backend:</strong> React.js, Next.js, Node.js, Express.js, Tailwind CSS, FastAPI, MongoDB, PostgreSQL, Supabase, Redis, REST APIs, Socket.io, WebRTC</p>
              <p><strong>AI / ML / GenAI:</strong> LangGraph, LangChain, RAG, FAISS, ChromaDB, Autonomous AI Agents, TensorFlow, Keras, Scikit-learn, Pandas, NumPy, NLP, Whisper, ElevenLabs</p>
              <p><strong>Tools:</strong> Git, GitHub, Postman, VS Code, Linux</p>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <strong className="text-zinc-900">{exp.role}</strong> | <span className="text-zinc-700 font-medium">{exp.company}</span>
                    </div>
                    <span className="text-zinc-500 font-mono shrink-0">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1 pl-1">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
              Featured Projects
            </h2>
            <div className="space-y-4">
              {projects.slice(0, 5).map((proj, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-zinc-900">{proj.title}</strong> | <span className="text-zinc-600">{proj.subtitle}</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono">
                    {proj.tech.join(', ')}
                  </div>
                  <ul className="list-disc list-inside text-zinc-700 space-y-0.5 pl-1">
                    {proj.bullets.slice(0, 2).map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
