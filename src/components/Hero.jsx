import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Mail, 
  MapPin, 
  ArrowRight, 
  Check, 
  Copy, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Zap,
  Activity,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const roles = [
    "Full-Stack & Generative AI Engineer",
    "LangGraph Multi-Agent Architect",
    "Agentic RAG & Chrome MV3 Specialist",
    "Real-Time Systems & Concurrency Engineer",
    "Production Full-Stack Engineer @ Sharnex"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentFullRole = roles[roleIndex];
    const speed = isDeleting ? 25 : 55;

    if (!isDeleting && displayedText === currentFullRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentFullRole.substring(0, prev.length - 1)
          : currentFullRole.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const techMarquee = [
    "LangGraph Multi-Agent",
    "Agentic RAG",
    "FastAPI (Python)",
    "React.js",
    "Next.js",
    "Java",
    "C & C++",
    "Redis Pub/Sub SSE",
    "Socket.io",
    "FAISS & ChromaDB",
    "MongoDB",
    "PostgreSQL",
    "Chrome Extensions MV3",
    "TensorFlow / Keras",
    "Docker & Linux"
  ];

  return (
    <section id="hero" className="sticky top-0 z-0 min-h-screen flex flex-col justify-center pt-24 pb-16 md:pt-28 md:pb-20 bg-white transition-colors duration-300 overflow-hidden">
      {/* Soft Ambient Glowing Lights (Clean Pastel Tones, No moving dots) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-b from-indigo-100/60 via-sky-100/35 to-transparent blur-3xl rounded-full animate-float-slow" />
        <div className="absolute top-64 left-10 w-96 h-96 bg-sky-100/40 blur-3xl rounded-full animate-float-reverse" />
        <div className="absolute top-64 right-10 w-96 h-96 bg-purple-100/40 blur-3xl rounded-full animate-float-slow" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-xs text-xs font-medium text-zinc-700 mb-5 hover:scale-105 transition-transform duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{personalInfo.status}</span>
            <span className="text-zinc-300">|</span>
            <span className="text-sky-600 font-semibold flex items-center gap-1">
              <Sparkles size={12} /> B.Tech CS '27
            </span>
          </div>

          {/* Animated Cycling Sub-heading with Shimmering Gradient */}
          <div className="h-8 mb-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-100 text-xs font-mono font-medium text-indigo-700 shadow-xs">
              <span className="text-indigo-400 font-bold">&gt;</span>
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold animate-text-shine">
                {displayedText}
              </span>
              <span className="inline-block w-1.5 h-3.5 bg-indigo-600 animate-cursor-blink" />
            </div>
          </div>

          {/* Main Headline with Animated Shimmer Flow */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-[1.12]">
            Engineering Intelligent <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-text-shine">
              AI Agents & Scalable Systems
            </span>
          </h1>

          {/* Bio */}
          <p className="text-base sm:text-lg text-zinc-600 mb-8 max-w-2xl leading-relaxed">
            I'm <strong className="text-zinc-900 font-semibold">{personalInfo.name}</strong>, a developer specialized in{' '}
            <span className="text-indigo-700 font-medium">LangGraph multi-agent systems</span>,{' '}
            <span className="text-indigo-700 font-medium">Agentic RAG pipelines</span>, and{' '}
            <span className="text-indigo-700 font-medium">high-concurrency Next.js & FastAPI applications</span>. Building production systems at Sharnex.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 w-full sm:w-auto">
            {/* Explore Projects */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
              <span>Explore 8 Live Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Copy Email */}
            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail size={16} className="text-zinc-500" />
                  <span>{personalInfo.email}</span>
                  <Copy size={13} className="text-zinc-400" />
                </>
              )}
            </button>

            {/* CLI Terminal */}
            <a
              href="#terminal"
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-xl border border-zinc-200 transition-all"
            >
              <Terminal size={16} className="text-sky-600" />
              <span>Interactive CLI</span>
            </a>
          </div>

          {/* Social Badges & Location */}
          <div className="flex items-center justify-center flex-wrap gap-4 text-xs text-zinc-500 mb-10">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/90 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900 transition-all shadow-xs"
            >
              <GithubIcon size={15} />
              <span>github.com/Ansh0864</span>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/90 border border-zinc-200 hover:border-sky-300 hover:text-sky-700 transition-all shadow-xs"
            >
              <LinkedinIcon size={15} />
              <span>ansh-chauhan-7848b7314</span>
            </a>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/90 border border-zinc-200 text-zinc-600">
              <MapPin size={14} className="text-rose-500" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Smooth Infinite Marquee Scrolling Tech Stack Banner */}
        <div className="mb-12 overflow-hidden py-4 border-y border-zinc-200/80 bg-zinc-50/70 relative">
          {/* Subtle gradient masks on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-3 items-center">
            {[...techMarquee, ...techMarquee, ...techMarquee].map((tech, tIdx) => (
              <span
                key={tIdx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 shadow-2xs whitespace-nowrap hover:border-indigo-400 hover:text-indigo-600 transition-colors shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {personalInfo.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-4 sm:p-5 text-center border border-zinc-200 shadow-xs hover:border-sky-400 hover:shadow-md transition-all group cursor-default"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-1 tracking-tight group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

