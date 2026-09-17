import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function ThemeToggle({ theme, onToggleTheme, floating = false }) {
  const isDark = theme === 'dark';

  if (floating) {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
        <button
          onClick={onToggleTheme}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-xl border transition-all duration-300 group hover:scale-105 ${
            isDark
              ? 'bg-zinc-900/90 border-zinc-700 text-zinc-100 shadow-glow-cyan'
              : 'bg-white/95 border-zinc-300/80 text-zinc-800 shadow-xl hover:border-sky-300'
          }`}
          title={isDark ? "Switch to Light Mode" : "Switch to Black Theme"}
          aria-label="Toggle Theme"
        >
          {/* Animated Toggle Switch */}
          <div className="relative w-11 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 p-0.5 transition-colors duration-300 flex items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-white transition-all duration-300 transform ${
                isDark
                  ? 'translate-x-5 bg-sky-500 shadow-sm rotate-[360deg]'
                  : 'translate-x-0 bg-amber-400 shadow-sm rotate-0'
              }`}
            >
              {isDark ? <Moon size={11} className="text-white" /> : <Sun size={11} className="text-white" />}
            </div>
          </div>
          <span className="text-xs font-bold tracking-wide">
            {isDark ? 'Black Mode' : 'Light Mode'}
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onToggleTheme}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
        isDark
          ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:border-sky-400 shadow-glow-cyan'
          : 'bg-white border-zinc-200 text-zinc-700 hover:border-sky-400 shadow-subtle'
      }`}
      title={isDark ? "Switch to Light Theme" : "Switch to Black Theme"}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          size={16}
          className={`absolute text-amber-500 transition-all duration-300 transform ${
            isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        />
        <Moon
          size={16}
          className={`absolute text-sky-400 transition-all duration-300 transform ${
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
          }`}
        />
      </div>
      <span className="text-xs font-semibold">
        {isDark ? 'Black Theme' : 'Light Theme'}
      </span>
    </button>
  );
}
