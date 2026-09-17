import React, { useState, useRef, useEffect } from 'react';
import { terminalCommands } from '../data/portfolioData';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Trash2, ArrowUpRight } from 'lucide-react';

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      command: 'welcome',
      output: 'Welcome to Ansh\'s interactive portfolio console! Type "help" or click any shortcut badge below to explore.'
    }
  ]);

  const terminalEndRef = useRef(null);
  const logContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Extended command aliases so users can type natural questions or variations
  const commandMap = {
    ...terminalCommands,
    'cls': terminalCommands.clear || 'CLEAR',
    'ls': terminalCommands.projects,
    'dir': terminalCommands.projects,
    'project': terminalCommands.projects,
    'work': terminalCommands.experience,
    'exp': terminalCommands.experience,
    'job': terminalCommands.experience,
    'sharnex': 'Sharnex (07/2026 - Present):\nFull-Stack Developer building real-time GPS vehicle tracking with Redis SSE, Leaflet maps, and multi-tenant Next.js ERP portals.',
    'mobineers': 'Mobineers Info Systems (05/2025 - 07/2025):\nSoftware Development Intern building conversational NLP chatbots and Python Tkinter automation GUIs.',
    'skill': terminalCommands.skills,
    'stack': terminalCommands.skills,
    'tech': terminalCommands.skills,
    'email': 'iamansh86@gmail.com (Phone: +91 9899609856)',
    'whoami': terminalCommands.about,
    'bio': terminalCommands.about,
    'github': 'GitHub: https://github.com/Ansh0864',
    'linkedin': 'LinkedIn: https://www.linkedin.com/in/ansh-chauhan-7848b7314',
    'status': 'Available for Software Engineering & AI Engineer roles (Delhi / Remote).'
  };

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInput('');
      return;
    }

    let output = commandMap[lower];
    if (!output) {
      // Fuzzy check
      const matchedKey = Object.keys(commandMap).find(k => lower.includes(k));
      if (matchedKey) {
        output = commandMap[matchedKey];
      } else {
        output = `Command not recognized: "${trimmed}". Available commands: help, about, projects, skills, experience, contact, hire, clear.`;
      }
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  // Scroll ONLY the inner terminal log container - NEVER scroll the window (prevents jump to FAQ)
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [history]);

  const quickPills = [
    { label: 'help', desc: 'show commands' },
    { label: 'about', desc: 'about Ansh' },
    { label: 'projects', desc: 'all 8 projects' },
    { label: 'skills', desc: 'tech stack' },
    { label: 'experience', desc: 'Sharnex & work' },
    { label: 'contact', desc: 'email & handles' },
    { label: 'hire', desc: 'collaborate' },
    { label: 'clear', desc: 'clear log' }
  ];

  return (
    <section id="terminal" className="py-20 border-t border-zinc-200 bg-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-zinc-200 text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
            <TerminalIcon size={12} className="text-emerald-400" /> Interactive CLI Playground
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Developer Console
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Query Ansh's background, system designs, and production records in an authentic terminal environment.
          </p>
        </div>

        {/* Console Container - High-Tech Black Box */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="bg-[#090c15] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm cursor-text relative"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/10 blur-3xl rounded-full pointer-events-none" />

          {/* Window Header */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-[#0d121f] border-b border-zinc-800/80 relative z-10">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 border border-rose-600/30 shrink-0 inline-block"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 border border-amber-600/30 shrink-0 inline-block"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border border-emerald-600/30 shrink-0 inline-block"></span>
              <span className="text-[11px] sm:text-xs text-zinc-300 font-sans ml-1 sm:ml-2 font-semibold truncate max-w-[140px] sm:max-w-none">
                ansh@workstation: ~/portfolio
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-sans shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] bg-zinc-900/90 border border-zinc-800 text-emerald-400 px-2 sm:px-2.5 py-0.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                live console
              </span>
            </div>
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="px-3 sm:px-4 py-2 bg-[#0b0f19] border-b border-zinc-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none relative z-10">
            <span className="text-[11px] text-zinc-400 font-sans mr-1 font-medium whitespace-nowrap">Quick clicks:</span>
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(pill.label);
                }}
                className="px-2 sm:px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-indigo-950 text-zinc-300 hover:text-indigo-300 border border-zinc-800 hover:border-indigo-600/70 text-xs transition-all shrink-0 font-medium cursor-pointer shadow-xs"
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Output log */}
          <div 
            ref={logContainerRef}
            className="p-3.5 sm:p-5 max-h-80 overflow-y-auto space-y-4 bg-[#07090e] select-text relative z-10 scroll-smooth"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-emerald-400 font-bold">➜</span>
                  <span className="text-indigo-400 font-semibold">~</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
                <div className="text-zinc-300 whitespace-pre-wrap pl-3 sm:pl-4 font-mono leading-relaxed text-xs sm:text-sm bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/70">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Command Prompt Input */}
          <form 
            onSubmit={handleSubmit} 
            className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0d121f] border-t border-zinc-800/80 relative z-10"
          >
            <span className="text-emerald-400 font-bold text-sm">➜</span>
            <span className="text-indigo-400 font-semibold text-sm">~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command ('help', 'projects', 'skills')..."
              className="flex-1 bg-transparent border-none text-emerald-300 focus:outline-none placeholder:text-zinc-600 text-xs sm:text-sm font-mono min-w-0"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Execute command"
            >
              <CornerDownLeft size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
