import React, { useState, useMemo, useRef } from 'react';
import { skillCategories, projects } from '../data/portfolioData';
import { 
  Cpu, 
  Layout, 
  Code2, 
  Database, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Zap, 
  ExternalLink,
  Layers,
  Terminal,
  Filter,
  Eye
} from 'lucide-react';

// Detailed production implementation metadata for skills
const skillDetailsMap = {
  'LangGraph': {
    category: 'AI & GenAI',
    proficiency: 95,
    summary: 'Orchestrating stateful cyclic multi-agent graphs, state reducers, checkpointing, and agent decision loops.',
    projects: ['Memeconomy', 'AIInterview Coach'],
    highlight: '50-agent simulation with conditional branch routing'
  },
  'LangChain': {
    category: 'AI & GenAI',
    proficiency: 92,
    summary: 'Tool-calling chains, prompt templates, structured output parsing, and dynamic RAG document loaders.',
    projects: ['MarketAgent', 'PageSense Pro'],
    highlight: 'LangChain.js + Tavily live web retrieval'
  },
  'RAG Architectures': {
    category: 'AI & GenAI',
    proficiency: 96,
    summary: 'In-memory semantic vector chunking, top-k retrieval, re-ranking, and interactive DOM citation attribution.',
    projects: ['PageSense Pro', 'AIInterview Coach', 'MarketAgent'],
    highlight: 'Sub-second in-memory DOM RAG inside Chrome MV3'
  },
  'FAISS & ChromaDB': {
    category: 'AI & GenAI',
    proficiency: 94,
    summary: 'High-speed approximate nearest neighbor vector similarity search in RAM with metadata filtering.',
    projects: ['PageSense Pro', 'AIInterview Coach'],
    highlight: 'RAM vector indexing with exact paragraph mapping'
  },
  'Multi-Agent Simulation': {
    category: 'AI & GenAI',
    proficiency: 92,
    summary: 'Simulating synthetic populations with weighted relevance gates and distinct persona behavioral policies.',
    projects: ['Memeconomy'],
    highlight: '50 autonomous synthetic agents in directed graph'
  },
  'Groq (Llama 3.3-70B)': {
    category: 'AI & GenAI',
    proficiency: 95,
    summary: 'Ultra-low latency Llama-3.3-70B inference via Groq LPU with multi-provider failover fallback.',
    projects: ['AIInterview Coach', 'PageSense Pro'],
    highlight: 'Sub-400ms time-to-first-token responses'
  },
  'Google Gemini API': {
    category: 'AI & GenAI',
    proficiency: 93,
    summary: 'Multimodal analysis, secondary failover LLM provider, and structured financial intelligence synthesis.',
    projects: ['MarketAgent', 'AIInterview Coach', 'PageSense Pro'],
    highlight: 'Zero-hallucination grounded financial synthesis'
  },
  'TensorFlow & Keras': {
    category: 'AI & GenAI',
    proficiency: 90,
    summary: 'Custom Convolutional Neural Networks (CNNs), transfer learning, and sub-80ms CPU inference optimization.',
    projects: ['AuraSync', 'HerbTrace', 'AI Real Estate'],
    highlight: 'FER-2013 7-emotion classification on CPU'
  },
  'Scikit-Learn & Pandas': {
    category: 'AI & GenAI',
    proficiency: 89,
    summary: 'Feature engineering, data normalization, gradient-boosted regressors, and 5-year trend forecasting.',
    projects: ['AI Real Estate', 'Memeconomy'],
    highlight: 'Real estate valuation model with mortgage projections'
  },
  'Whisper & ElevenLabs': {
    category: 'AI & GenAI',
    proficiency: 88,
    summary: 'Real-time speech-to-text audio ingestion and realistic human voice synthesis for mock interview rounds.',
    projects: ['AIInterview Coach'],
    highlight: 'End-to-end voice interview with streaming TTS'
  },
  'React.js': {
    category: 'Full-Stack',
    proficiency: 96,
    summary: 'Component state architecture, custom hooks, performance profiling, and interactive UI micro-animations.',
    projects: ['CodeArena', 'HerbTrace', 'AuraSync', 'AI Real Estate'],
    highlight: 'Production frontend for 1v1 battle arena'
  },
  'Next.js (App Router)': {
    category: 'Full-Stack',
    proficiency: 94,
    summary: 'Multi-tenant ERP architecture at Sharnex, Server Components, Route Handlers, and SEO optimization.',
    projects: ['Sharnex Work', 'CodeArena', 'PageSense Pro'],
    highlight: 'Multi-tenant school management ERP at Sharnex'
  },
  'Tailwind CSS': {
    category: 'Full-Stack',
    proficiency: 98,
    summary: 'Responsive utility systems, modern clean light aesthetic, glassmorphism, and responsive breakpoints.',
    projects: ['CodeArena', 'HerbTrace', 'AuraSync', 'PageSense Pro'],
    highlight: '100% responsive, high-fidelity UI systems'
  },
  'Node.js & Express': {
    category: 'Full-Stack',
    proficiency: 93,
    summary: 'RESTful API backends, middleware pipelines, rate limiting, and microservice orchestrators.',
    projects: ['CodeArena', 'MarketAgent'],
    highlight: 'Sub-30ms matchmaking and WebSocket services'
  },
  'FastAPI (Python)': {
    category: 'Full-Stack',
    proficiency: 96,
    summary: 'Asynchronous Python backends, Pydantic data schemas, WebRTC frame handlers, and streaming endpoints.',
    projects: ['PageSense Pro', 'AIInterview Coach', 'AuraSync', 'Memeconomy'],
    highlight: 'High-throughput async endpoints for AI inference'
  },
  'Socket.io': {
    category: 'Full-Stack',
    proficiency: 91,
    summary: 'Real-time duplex communication, room-based state sync, latency compensation, and user disconnect recovery.',
    projects: ['CodeArena'],
    highlight: '1v1 live competitive programming room sync'
  },
  'Redis & SSE Streaming': {
    category: 'Full-Stack',
    proficiency: 92,
    summary: 'Pub/Sub telemetry broker and Server-Sent Events streaming continuous GPS coordinates to maps.',
    projects: ['Sharnex Work', 'CodeArena'],
    highlight: 'Continuous live bus tracking telemetry at Sharnex'
  },
  'WebRTC': {
    category: 'Full-Stack',
    proficiency: 88,
    summary: 'Direct peer video frame capture, low-latency streaming pipeline from client camera to AI worker.',
    projects: ['AuraSync'],
    highlight: 'Encrypted webcam frame capture for emotion CNN'
  },
  'Chrome Extensions MV3': {
    category: 'Full-Stack',
    proficiency: 95,
    summary: 'Service workers, content script DOM injection, background message passing, and in-page highlighter.',
    projects: ['PageSense Pro'],
    highlight: 'Full Manifest V3 extension with Side Panel RAG'
  },
  'Java': {
    category: 'Core CS',
    proficiency: 94,
    summary: 'OOP design patterns, robust software engineering, concurrency, and advanced Data Structures & Algorithms.',
    projects: ['CodeArena', 'AIInterview Coach'],
    highlight: 'Competitive problem solving & clean OOP systems'
  },
  'Python': {
    category: 'Core CS',
    proficiency: 97,
    summary: 'Primary engineering language for autonomous agents, low-latency backends, ML models, and data pipelines.',
    projects: ['PageSense Pro', 'AIInterview Coach', 'Memeconomy', 'AuraSync', 'HerbTrace'],
    highlight: 'Powers AI agents, RAG engines, and CNN workers'
  },
  'JavaScript (ES6+)': {
    category: 'Core CS',
    proficiency: 95,
    summary: 'Modern asynchronous JavaScript, closures, DOM manipulation, promises, and modular component architecture.',
    projects: ['CodeArena', 'HerbTrace', 'PageSense Pro', 'MarketAgent'],
    highlight: 'Interactive frontend and Chrome Extension scripting'
  },
  'C & C++': {
    category: 'Core CS',
    proficiency: 89,
    summary: 'Low-level memory management, pointers, algorithmic efficiency, and competitive problem solving.',
    projects: ['CodeArena', 'AIInterview Coach'],
    highlight: 'Rigorous time/space complexity optimization'
  },
  'SQL': {
    category: 'Core CS',
    proficiency: 91,
    summary: 'Relational data modeling, ACID transactions, complex JOINs, indexing strategies, and query optimization.',
    projects: ['Memeconomy', 'CodeArena', 'MarketAgent'],
    highlight: 'Production relational schema design and indexing'
  },
  'PHP': {
    category: 'Core CS',
    proficiency: 82,
    summary: 'Server-side MVC scripting, form validation, and relational database integrations.',
    projects: ['CodeArena', 'MarketAgent'],
    highlight: 'Backend web engineering & database handling'
  },
  'Data Structures & Algorithms': {
    category: 'Core CS',
    proficiency: 95,
    summary: 'Dynamic programming, graph algorithms (BFS/DFS), trees, hashing, binary search, and Big-O efficiency.',
    projects: ['CodeArena', 'Memeconomy', 'AIInterview Coach'],
    highlight: 'Competitive coding & sandbox test evaluation'
  },
  'System Design & OOP': {
    category: 'Core CS',
    proficiency: 93,
    summary: 'Scalable microservices, fault tolerance, multi-provider failover, pub/sub queuing, and design patterns.',
    projects: ['Sharnex Work', 'AIInterview Coach', 'PageSense Pro'],
    highlight: 'Architecting 0% downtime multi-provider pipelines'
  },
  'PostgreSQL': {
    category: 'Databases & Cloud',
    proficiency: 90,
    summary: 'Enterprise relational database with structured schemas, ACID integrity, and relational integrity.',
    projects: ['Memeconomy', 'CodeArena'],
    highlight: 'Transactional storage and relational modeling'
  },
  'MongoDB': {
    category: 'Databases & Cloud',
    proficiency: 93,
    summary: 'Document database for dynamic social propagation experiments, agent state trees, and schema flexibility.',
    projects: ['Memeconomy', 'CodeArena'],
    highlight: 'Simulation run history and agent graph storage'
  },
  'Supabase': {
    category: 'Databases & Cloud',
    proficiency: 89,
    summary: 'PostgreSQL-backed BaaS with realtime subscriptions, automated auth policies, and row-level security.',
    projects: ['CodeArena', 'MarketAgent'],
    highlight: 'Real-time database sync and fast prototyping'
  },
  'Redis': {
    category: 'Databases & Cloud',
    proficiency: 92,
    summary: 'High-speed in-memory key-value cache and pub/sub message broker for live real-time streams.',
    projects: ['Sharnex Work', 'CodeArena'],
    highlight: 'Pub/Sub telemetry streaming at Sharnex'
  },
  'Git & GitHub': {
    category: 'Databases & Cloud',
    proficiency: 96,
    summary: 'Version control, branch management, collaborative pull requests, release tagging, and CI workflows.',
    projects: ['PageSense Pro', 'CodeArena', 'AIInterview Coach'],
    highlight: 'Production source code hygiene and branching'
  },
  'Postman': {
    category: 'Databases & Cloud',
    proficiency: 94,
    summary: 'API contract testing, mock servers, automated test suites, and environment variable synchronization.',
    projects: ['Sharnex Work', 'PageSense Pro'],
    highlight: 'RESTful API endpoint validation & documentation'
  },
  'VS Code & Linux': {
    category: 'Databases & Cloud',
    proficiency: 95,
    summary: 'Unix shell scripting, process management, remote SSH debugging, containerization, and dev environment setup.',
    projects: ['PageSense Pro', 'CodeArena'],
    highlight: 'Full command-line fluency and server deployment'
  },
  'Web3.py & Solidity': {
    category: 'Databases & Cloud',
    proficiency: 84,
    summary: 'Ethereum smart contract deployment, cryptographic event verification, and immutable provenance logging.',
    projects: ['HerbTrace'],
    highlight: 'Ayurvedic herb supply chain verification'
  }
};

export default function Skills({ onSkillClick, onSelectProject }) {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillName, setActiveSkillName] = useState('LangGraph');
  const [actionFeedback, setActionFeedback] = useState('');
  const inspectorRef = useRef(null);

  const getCategoryIcon = (categoryTitle) => {
    switch (categoryTitle) {
      case 'AI & Generative Systems':
      case 'AI & GenAI':
        return <Cpu size={16} className="text-sky-600" />;
      case 'Full-Stack & Web Engineering':
      case 'Full-Stack':
        return <Layout size={16} className="text-indigo-600" />;
      case 'Languages & Computer Science Core':
      case 'Core CS':
        return <Code2 size={16} className="text-emerald-600" />;
      case 'Databases, Cloud & Dev Tools':
      case 'Databases & Cloud':
        return <Database size={16} className="text-amber-600" />;
      default:
        return <Layers size={16} className="text-indigo-600" />;
    }
  };

  // Flattened skills with metadata
  const allSkillsList = useMemo(() => {
    const list = [];
    skillCategories.forEach(cat => {
      cat.skills.forEach(skill => {
        const details = skillDetailsMap[skill.name] || {
          category: cat.title,
          proficiency: 90,
          summary: `Core competence in ${skill.name} applied across production engineering workflows.`,
          projects: ['PageSense Pro', 'AIInterview Coach'],
          highlight: 'Production verified implementation'
        };
        list.push({
          name: skill.name,
          level: skill.level,
          categoryTitle: cat.title,
          ...details
        });
      });
    });
    return list;
  }, []);

  // Filtered skills based on category tab and search query
  const filteredSkills = useMemo(() => {
    return allSkillsList.filter(s => {
      const matchesCategory = 
        selectedCategoryTab === 'All' ||
        (selectedCategoryTab === 'AI & GenAI' && s.categoryTitle.includes('AI')) ||
        (selectedCategoryTab === 'Full-Stack' && s.categoryTitle.includes('Full-Stack')) ||
        (selectedCategoryTab === 'Core CS' && s.categoryTitle.includes('Languages')) ||
        (selectedCategoryTab === 'Databases & Cloud' && s.categoryTitle.includes('Databases'));

      const matchesSearch = 
        !searchQuery.trim() || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        s.summary.toLowerCase().includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [allSkillsList, selectedCategoryTab, searchQuery]);

  // Selected skill details
  const activeSkill = useMemo(() => {
    return allSkillsList.find(s => s.name === activeSkillName) || allSkillsList[0];
  }, [allSkillsList, activeSkillName]);

  const handleCategoryTabClick = (tabId) => {
    setSelectedCategoryTab(tabId);
    // Find first skill in this category and set active
    const firstSkill = allSkillsList.find(s => {
      if (tabId === 'All') return true;
      if (tabId === 'AI & GenAI') return s.categoryTitle.includes('AI');
      if (tabId === 'Full-Stack') return s.categoryTitle.includes('Full-Stack');
      if (tabId === 'Core CS') return s.categoryTitle.includes('Languages');
      if (tabId === 'Databases & Cloud') return s.categoryTitle.includes('Databases');
      return true;
    });
    if (firstSkill) {
      setActiveSkillName(firstSkill.name);
    }
  };

  const handleSkillChipClick = (skillName) => {
    setActiveSkillName(skillName);
    setActionFeedback(`Inspecting ${skillName}`);
    setTimeout(() => setActionFeedback(''), 2500);

    // If on mobile/small screen, scroll inspector into view smoothly
    if (window.innerWidth < 1024 && inspectorRef.current) {
      inspectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleCrossFilterProjects = (skillName) => {
    if (onSkillClick) {
      onSkillClick(skillName);
      setActionFeedback(`Filtered projects by "${skillName}"`);
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleProjectClick = (projName) => {
    if (projName.toLowerCase().includes('sharnex')) {
      const el = document.getElementById('experience');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Try finding exact project object to open in modal
    const clean = projName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const matchedProject = projects.find(p => {
      const pClean = p.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      const idClean = p.id.replace(/[^a-z0-9]/g, '');
      return pClean.includes(clean) || clean.includes(idClean);
    });

    if (matchedProject && onSelectProject) {
      onSelectProject(matchedProject);
    } else {
      handleCrossFilterProjects(projName);
    }
  };

  const categoryTabs = [
    { id: 'All', label: 'All Stack', count: 35 },
    { id: 'AI & GenAI', label: 'AI & GenAI', count: 10 },
    { id: 'Full-Stack', label: 'Full-Stack', count: 9 },
    { id: 'Core CS', label: 'Core CS & Languages', count: 8 },
    { id: 'Databases & Cloud', label: 'Databases & Cloud', count: 8 },
  ];

  return (
    <section id="skills" className="py-20 md:py-24 border-t border-zinc-200 bg-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles size={12} /> Interactive Tech Matrix & Live Inspector
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Skills & Stack Matrix
            </h2>
            <p className="text-sm text-zinc-500 mt-2 max-w-xl">
              Click any technology chip below to inspect architecture implementations, production metrics, or immediately open the live matching projects.
            </p>
          </div>

          {/* Search bar inside Skills section */}
          <div className="w-full md:w-72 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // If search matches skills, activate first match
                const match = allSkillsList.find(s => s.name.toLowerCase().includes(e.target.value.toLowerCase().trim()));
                if (match) setActiveSkillName(match.name);
              }}
              placeholder="Search 35 technologies..."
              className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-zinc-900 placeholder-zinc-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 hover:text-zinc-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-2 border-b border-zinc-100">
          {categoryTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleCategoryTabClick(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                selectedCategoryTab === tab.id
                  ? 'bg-zinc-900 text-white shadow-sm scale-102'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border border-zinc-200/80'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategoryTab === tab.id
                  ? 'bg-zinc-700 text-zinc-200 font-mono'
                  : 'bg-zinc-200/70 text-zinc-600 font-mono'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Main Grid: Interactive Skill Matrix + Dynamic Live Inspector HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Skill Pills Grid (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap size={13} className="text-amber-500" />
                  Showing {filteredSkills.length} Verified Technologies
                </span>
                <span className="text-[11px] text-zinc-400">
                  Click any chip to inspect
                </span>
              </div>

              {filteredSkills.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-xs text-zinc-400 mb-2">No technologies match "{searchQuery}"</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategoryTab('All'); }}
                    className="text-xs text-sky-600 font-medium hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {filteredSkills.map((skill, idx) => {
                    const isSelected = activeSkillName === skill.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSkillChipClick(skill.name)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 text-left cursor-pointer border ${
                          isSelected
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-md scale-105 ring-2 ring-indigo-500/30'
                            : 'bg-zinc-50/90 hover:bg-zinc-100 border-zinc-200/90 text-zinc-800 hover:border-zinc-300 shadow-2xs hover:scale-102'
                        }`}
                      >
                        <CheckCircle2 
                          size={14} 
                          className={isSelected ? "text-emerald-400" : "text-zinc-400"} 
                        />
                        <span>{skill.name}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200/70 text-zinc-600'
                        }`}>
                          {skill.level}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Helper Banner with quick filter action */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-indigo-100/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-indigo-950 font-medium">
                <Sparkles size={16} className="text-indigo-600 shrink-0" />
                <span>Want to see projects engineered with <strong>{activeSkill.name}</strong>?</span>
              </div>
              <button
                onClick={() => handleCrossFilterProjects(activeSkill.name)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <span>Filter Projects</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Right: Dynamic Live Inspector HUD Panel (5 Cols, Static) */}
          <div ref={inspectorRef} className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-zinc-200 shadow-md relative overflow-hidden bg-white">
              
              {/* Header Badge & Level */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-semibold">
                  {getCategoryIcon(activeSkill.category)}
                  <span>{activeSkill.category || activeSkill.categoryTitle}</span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  {activeSkill.level} • {activeSkill.proficiency}%
                </span>
              </div>

              {/* Title & Highlight */}
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight mb-1">
                {activeSkill.name}
              </h3>
              <p className="text-xs text-sky-600 font-semibold mb-5 flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>{activeSkill.highlight}</span>
              </p>

              {/* Production Architecture Use Case */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Architecture & Implementation
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-200/80">
                  {activeSkill.summary}
                </p>
              </div>

              {/* Linked Projects (Clickable -> Opens project modal directly!) */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  Implemented In Production Projects:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(activeSkill.projects || ['PageSense Pro', 'AIInterview Coach']).map((projName, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleProjectClick(projName)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 hover:border-indigo-400 hover:bg-indigo-50 text-zinc-800 hover:text-indigo-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer group"
                      title={`Open ${projName}`}
                    >
                      <Eye size={12} className="text-zinc-400 group-hover:text-indigo-600" />
                      <span>{projName}</span>
                      <ArrowRight size={11} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 border-t border-zinc-100 flex flex-col gap-2">
                <button
                  onClick={() => handleCrossFilterProjects(activeSkill.name)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Filter Projects by {activeSkill.name}</span>
                  <ExternalLink size={14} />
                </button>

                {actionFeedback && (
                  <p className="text-center text-xs text-emerald-600 font-semibold animate-pulse mt-1">
                    ✓ {actionFeedback}
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
