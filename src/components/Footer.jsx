import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 sm:py-12 border-t border-zinc-200 bg-white text-xs text-zinc-500 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
            AC
          </div>
          <div>
            <p className="font-semibold text-zinc-800">
              {personalInfo.name} © {new Date().getFullYear()}
            </p>
            <p className="text-[11px] text-zinc-400">
              Full-Stack & Generative AI Engineer
            </p>
          </div>
        </div>

        {/* Middle Socials */}
        <div className="flex items-center gap-4 text-zinc-600">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            title="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-sky-600 hover:bg-zinc-100 transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2 rounded-lg hover:text-rose-600 hover:bg-zinc-100 transition-colors"
            title="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Right Back to Top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 shadow-xs transition-all cursor-pointer font-medium"
        >
          <span>Back to top</span>
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
