import React, { useState, useEffect } from 'react';
import { projects } from '../data/portfolioData';
import { 
  ExternalLink, 
  Search, 
  Sparkles, 
  Eye, 
  ArrowUpRight, 
  X,
  Minimize2,
  Maximize2,
  LayoutGrid,
  List
} from 'lucide-react';

// Mapping for skills to relevant project implementations
const skillAliasMap = {
  'java': ['codearena', 'ai-interview-coach'],
  'c & c++': ['codearena', 'ai-interview-coach'],
  'c++': ['codearena', 'ai-interview-coach'],
  'sql': ['memeconomy', 'codearena', 'marketagent', 'pagesense-pro'],
  'php': ['codearena', 'marketagent', 'herbtrace'],
  'data structures & algorithms': ['codearena', 'ai-interview-coach', 'memeconomy'],
  'system design & oop': ['pagesense-pro', 'ai-interview-coach', 'memeconomy', 'codearena', 'marketagent', 'herbtrace'],
  'javascript (es6+)': ['pagesense-pro', 'ai-interview-coach', 'aurasync', 'codearena', 'herbtrace', 'marketagent'],
  'git & github': ['pagesense-pro', 'ai-interview-coach', 'aurasync', 'memeconomy', 'codearena', 'herbtrace', 'marketagent', 'ai-real-estate'],
  'postman': ['pagesense-pro', 'ai-interview-coach', 'memeconomy', 'marketagent', 'aurasync'],
  'vs code & linux': ['pagesense-pro', 'ai-interview-coach', 'aurasync', 'memeconomy', 'codearena', 'herbtrace', 'marketagent', 'ai-real-estate'],
  'next.js (app router)': ['codearena', 'pagesense-pro', 'marketagent'],
  'supabase': ['memeconomy', 'codearena', 'marketagent'],
  'postgresql': ['memeconomy', 'codearena'],
  'redis': ['codearena', 'memeconomy', 'ai-interview-coach'],
  'redis & sse streaming': ['codearena', 'memeconomy', 'ai-interview-coach'],
  'web3.py & solidity': ['herbtrace'],
  'solidity': ['herbtrace'],
  'faiss & chromadb': ['pagesense-pro', 'ai-interview-coach'],
  'tensorflow & keras': ['aurasync', 'herbtrace', 'ai-real-estate'],
  'scikit-learn & pandas': ['ai-real-estate', 'memeconomy'],
  'whisper & elevenlabs': ['ai-interview-coach'],
  'google gemini api': ['pagesense-pro', 'ai-interview-coach', 'marketagent'],
  'groq (llama 3.3-70b)': ['pagesense-pro', 'ai-interview-coach', 'marketagent'],
  'node.js & express': ['codearena', 'marketagent'],
  'fastapi (python)': ['pagesense-pro', 'ai-interview-coach', 'aurasync', 'memeconomy', 'herbtrace'],
};

export default function Projects({ onSelectProject, activeSkillFilter, onClearSkillFilter }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (activeSkillFilter) {
      setSearchQuery(activeSkillFilter);
      setActiveCategory('All');
      setIsExpanded(true);
    }
  }, [activeSkillFilter]);

  const categories = [
    'All',
    'Generative AI & RAG',
    'Full-Stack & Real-Time',
    'Computer Vision & ML',
    'Blockchain'
  ];

  const cleanQuery = searchQuery.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = 
      activeCategory === 'All' || 
      project.category === activeCategory ||
      (project.categories && project.categories.includes(activeCategory));

    if (!cleanQuery) return matchesCategory;

    // 1. Direct text search across title, subtitle, overview
    const directTextMatch = 
      project.title.toLowerCase().includes(cleanQuery) ||
      project.subtitle.toLowerCase().includes(cleanQuery) ||
      project.overview.toLowerCase().includes(cleanQuery);

    // 2. Direct match on tech array (exact or partial)
    const techMatch = project.tech.some(t => {
      const tLower = t.toLowerCase();
      return tLower.includes(cleanQuery) || cleanQuery.includes(tLower);
    });

    // 3. Token-based match (e.g. "JavaScript (ES6+)" -> "javascript", "es6")
    const queryTokens = cleanQuery.replace(/[^a-z0-9+#]/g, ' ').split(/\s+/).filter(w => w.length > 1);
    const tokenMatch = queryTokens.length > 0 && queryTokens.some(token => 
      project.tech.some(t => t.toLowerCase().includes(token)) ||
      project.title.toLowerCase().includes(token)
    );

    // 4. Alias / implementation mapping match
    const aliasMatchedIds = skillAliasMap[cleanQuery] || [];
    const aliasMatch = aliasMatchedIds.includes(project.id);

    const matchesSearch = directTextMatch || techMatch || tokenMatch || aliasMatch;
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-14 sm:py-24 border-t border-zinc-200 bg-white transition-colors duration-300 relative z-10 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Sparkles size={12} /> Verified Deployments
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Featured Systems & Deployments
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-md">
              All 8 production applications with live deployments, custom UI mockups, and architectural blueprints.
            </p>
          </div>
        </div>

        {/* Active Skill Filter Banner */}
        {searchQuery && (
          <div className="mb-6 p-3 rounded-2xl bg-indigo-50/90 border border-indigo-200 text-xs text-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-600 shrink-0" />
              <span>
                Filtered by: <strong>"{searchQuery}"</strong> • Showing <strong>{filteredProjects.length}</strong> matching project{filteredProjects.length === 1 ? '' : 's'}
              </span>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                if (onClearSkillFilter) onClearSkillFilter();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100/70 font-semibold cursor-pointer transition-colors w-fit"
            >
              <X size={13} />
              <span>Clear Filter</span>
            </button>
          </div>
        )}

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-zinc-200">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? projects.length 
                : projects.filter(p => p.category === cat || (p.categories && p.categories.includes(cat))).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-zinc-700 text-white' : 'bg-zinc-200 text-zinc-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tech, stack, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-800 placeholder-zinc-400 shadow-xs"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {(isExpanded || searchQuery ? filteredProjects : filteredProjects.slice(0, 4)).map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className={`h-1 w-full bg-gradient-to-r ${project.color || 'from-sky-500 to-indigo-500'}`} />

              {/* Project Image Banner */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-100 border-b border-zinc-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-white/95 text-zinc-800 backdrop-blur-md shadow-sm border border-white/20">
                    {project.category}
                  </span>
                </div>

                {project.badge && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-900 text-white backdrop-blur-md shadow-sm">
                      {project.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-sky-600 transition-colors mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mb-4 font-medium">
                    {project.subtitle}
                  </p>

                  {/* Metrics Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.metrics.map((metric, mIdx) => (
                      <span
                        key={mIdx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50/70 text-indigo-800 border border-indigo-100 font-medium"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Overview Text */}
                  <p className="text-xs sm:text-sm text-zinc-600 line-clamp-3 mb-5 leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* Bottom Details & Actions */}
                <div>
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-zinc-100">
                    {project.tech.slice(0, 5).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-50 text-zinc-400 font-mono">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 sm:px-3 text-[11px] sm:text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-all border border-zinc-200 cursor-pointer"
                    >
                      <Eye size={13} className="text-sky-600 shrink-0" />
                      <span className="truncate">Architecture</span>
                    </button>

                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-all shadow-sm hover:shadow group/btn shrink-0"
                      title="Open Live Deployment"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Expand / Show Less Projects Button */}
        {!searchQuery && filteredProjects.length > 4 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-102"
            >
              <span>{isExpanded ? "Show Less Projects" : `Expand All ${filteredProjects.length} Projects`}</span>
              <ArrowUpRight size={15} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200 shadow-sm">
            <p className="text-zinc-500 text-sm mb-3">
              No projects found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                if (onClearSkillFilter) onClearSkillFilter();
              }}
              className="px-4 py-2 text-xs font-semibold text-sky-600 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
