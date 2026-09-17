import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, X, RotateCcw, Key, Check, AlertCircle } from 'lucide-react';

const SYSTEM_PROMPT = `You are the official AI Portfolio Copilot for Ansh Chauhan, an exceptional Full-Stack & Generative AI Engineer.
Your role is to provide deep, rigorous, technical, and accurate answers about Ansh's projects, architecture decisions, production experience at Sharnex, and technical skill set.

KEY INFORMATION ABOUT ANSH CHAUHAN:
- Title: Full-Stack & Generative AI Engineer
- Education: Bachelor of Technology (B.Tech) in Computer Science & Engineering (2023 - 2027) at Guru Gobind Singh Indraprastha University (GGSIPU), Delhi.
- Contact: Email: iamansh86@gmail.com | Phone: +91 9899609856 | Location: Delhi, India
- Links: GitHub: https://github.com/Ansh0864 | LinkedIn: https://www.linkedin.com/in/ansh-chauhan-7848b7314

WORK EXPERIENCE:
1. Sharnex (07/2026 – Present) — Full-Stack Developer:
   - Enterprise multi-tenant Next.js platform across Institution, Teacher, and Student portals.
   - Fees & Online Payments Engine: Razorpay integration, automated IFSC bank account validation, instant GST-compliant digital tax invoice generation, and double-entry ledger bookkeeping.
   - Core LMS Blueprint: ~7,500 lines of code module enabling teachers to map syllabus blueprints, record lecture logs, and track curriculum coverage.
   - Live Bus Tracking & Fleet Telemetry: Real-time GPS location streaming via Redis Pub/Sub and Server-Sent Events (SSE) direct to interactive Leaflet/MapLibre maps with sub-second accuracy.
   - RMS Marks Audit Trail: Secure grading portal with immutable score revision histories and printable student report cards.

2. Mobineers Info Systems (05/2025 – 07/2025) — Software Development Intern:
   - Built conversational NLP chatbots for workplace administrative query resolution.
   - Engineered responsive Python Tkinter multi-threaded desktop GUI with async background workers.
   - Implemented in-memory query caching layers and structured indexed SQLite schemas.

8 LIVE PRODUCTION PROJECTS (ALL DEPLOYED):
1. CodeArena (https://codearena-murex.vercel.app/): Real-time 1v1 competitive coding platform. Socket.io ELO matchmaking queue, 4 battle modes (Rapid Duel, Bug Hunter, Code Duel, Complexity Duel), Monaco Editor, sandboxed evaluation testbeds supporting Java, C++, and Python with <30ms sync latency.
2. PageSense Pro / WebPageCB (https://web-page-extension.vercel.app/): AI Chrome Extension (Manifest V3) + FastAPI Agentic RAG. Chunks DOM into 600-char segments, builds in-memory FAISS vector index in RAM, and enables in-page citation highlighting where clicking [Source X] chips scrolls and flash-highlights the cited text on the live page. Includes autonomous DuckDuckGo fallback.
3. AIInterview Coach (https://ai-interview-steel-psi.vercel.app/): Multi-round mock interview simulator with LangGraph state machine. Zero-downtime multi-provider LLM failover (Groq Llama 3.3-70B primary -> Google Gemini fallback) with per-key cooldown timers, CodeMirror editor with live code validation, Whisper speech transcription, and ElevenLabs voice.
4. AuraSync (https://aura-sync-1.onrender.com/): Real-time WebRTC emotion recognition system using a custom CNN (FER-2013, sub-80ms CPU latency) classifying 7 micro-expressions and dynamically mapping emotional valence to Spotify ambient soundscapes.
5. Memeconomy (https://memeconomy-three.vercel.app/): Synthetic social propagation simulator coordinating 50 stateful multi-agents across a directed graph with 2-stage deterministic pre-filtering (70%+ token cost savings) and full content mutation lineage tracking.
6. HerbTrace (https://herbtrace-1-0vsq.onrender.com/): Ayurvedic herb classification CNN combined with Ethereum Solidity smart contracts via Web3.py for tamper-proof farm-to-consumer traceability.
7. MarketAgent / QUANT_ARENA (https://market-agent-1-jp5a.onrender.com/): Autonomous financial intelligence RAG with LangChain.js, Polygon.io stock feeds, and Tavily AI web intelligence with zero hallucination.
8. AI Real Estate Valuation (https://houseprice-uvfqtmyueyznh8ktadx9ng.streamlit.app/): Deep learning housing price regressor (TensorFlow/Keras) with 5-year ROI forecasting and interactive mortgage amortization calculator.

TECHNICAL PHILOSOPHY & ARCHITECTURE:
- Multi-Provider LLM Failover: Solves single-provider rate limits (Tier-1 TPM/RPM) and outages using primary Groq (Llama 3.3-70B, ~300 tok/s) and secondary Gemini, with in-memory circuit breaker, exponential backoff, and LangGraph state preservation.
- SSE vs WebSockets: Uses SSE + Redis Pub/Sub for unidirectional high-throughput telemetry (GPS tracking) because it is HTTP-native, passes corporate firewalls, auto-reconnects, and has low memory overhead. Uses Socket.io WebSockets for low-latency bidirectional duels (CodeArena) for keystroke sync and state negotiation.
- Languages: Python for AI/Agents/RAG, TypeScript/React/Next.js for scalable web interfaces, Java & C++ for core algorithms and systems design.

Tone: Confident, professional, highly technical, articulate, and welcoming. Format with clean markdown, bold terms, bullet points, and include links when referencing projects.`;

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [groqKey, setGroqKey] = useState(() => {
    return localStorage.getItem('groq_api_key') || import.meta.env.VITE_GROQ_API_KEY || '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const [keySavedMessage, setKeySavedMessage] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Hi! I'm Ansh's Portfolio Copilot. Ask me anything about his **8 live projects**, **Sharnex production engineering**, **multi-LLM failover**, or **real-time architectures**!",
      timestamp: 'Just now',
      suggestions: ["🚀 All 8 Projects", "🔄 Multi-LLM Failover", "⚡ PageSense Citations", "💼 Sharnex Experience"]
    }
  ]);

  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);

  // External trigger (e.g. from FAQ buttons)
  useEffect(() => {
    const handleOpenAi = (e) => {
      setIsOpen(true);
      if (e.detail?.query) {
        setTimeout(() => {
          handleSend(e.detail.query);
        }, 300);
      }
    };
    window.addEventListener('open-ai-chat', handleOpenAi);
    return () => window.removeEventListener('open-ai-chat', handleOpenAi);
  }, [groqKey]);

  const saveGroqKey = (keyToSave) => {
    const clean = (keyToSave || '').trim();
    if (clean) {
      localStorage.setItem('groq_api_key', clean);
      setGroqKey(clean);
    } else {
      localStorage.removeItem('groq_api_key');
      setGroqKey('');
    }
    setKeySavedMessage(true);
    setTimeout(() => {
      setKeySavedMessage(false);
      setShowKeyModal(false);
    }, 1200);
  };

  // Markdown-like text formatter
  const renderFormattedText = (rawText, isUser) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');

    return lines.map((line, lineIdx) => {
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      const cleanLine = isBullet ? line.trim().replace(/^[•\-]\s*/, '') : line;

      const parts = [];
      const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, match.index));
        }

        const matchText = match[0];
        if (matchText.startsWith('**') && matchText.endsWith('**')) {
          parts.push(
            <strong
              key={`b-${lineIdx}-${match.index}`}
              className={isUser ? 'font-bold text-white' : 'font-bold text-zinc-900'}
            >
              {matchText.slice(2, -2)}
            </strong>
          );
        } else if (matchText.startsWith('[') && matchText.includes('](')) {
          const linkLabel = matchText.substring(1, matchText.indexOf(']('));
          const linkUrl = matchText.substring(matchText.indexOf('](') + 2, matchText.length - 1);
          parts.push(
            <a
              key={`l-${lineIdx}-${match.index}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-semibold underline hover:text-indigo-800"
            >
              {linkLabel}
            </a>
          );
        }

        lastIndex = match.index + matchText.length;
      }

      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 my-1 pl-1">
            <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
            <span className="flex-1 leading-relaxed">{parts}</span>
          </div>
        );
      }

      return (
        <div key={lineIdx} className="leading-relaxed my-0.5">
          {parts}
        </div>
      );
    });
  };

  const predefinedQueries = [
    { label: "🎯 Best Fit Domains", query: "Which domain and engineering roles are good for Ansh?" },
    { label: "🛠️ Core Tech Stack", query: "What is the core tech stack and skills of Ansh?" },
    { label: "⏱️ Architectural Timeline", query: "Give me Ansh's architectural timeline and engineering evolution" },
    { label: "⭐ Top 3 Projects", query: "What are Ansh's top flagship projects and why?" },
    { label: "🔄 Multi-LLM Failover", query: "How do you engineer resilient multi-provider LLM pipelines?" },
    { label: "⚡ PageSense Citations", query: "How does PageSense Pro extract and ground questions on live web pages?" },
    { label: "📡 Real-Time Architecture", query: "What is your architecture strategy for real-time applications?" },
    { label: "🎯 Why Hire Ansh?", query: "Why should we hire Ansh Chauhan?" },
    { label: "💼 Sharnex Work", query: "What did Ansh build at Sharnex?" },
    { label: "🚀 All 8 Projects", query: "What are all the 8 projects Ansh has built?" }
  ];

  // Deep-dive offline knowledge engine with typo tolerance & semantic routing
  const getKnowledgeResponse = (userQuery) => {
    const raw = (userQuery || '').trim();

    // 1. Normalize punctuation & multi-spaces
    let clean = raw.toLowerCase()
      .replace(/[?!.,;:'"()\[\]{}]/g, ' ')
      .replace(/\s+/g, ' ');

    // 2. Normalize common typos and variations
    clean = clean
      .replace(/\b(ansg|ans|anash|ansh's|anshs|anshch)\b/g, 'ansh')
      .replace(/\b(stak|techstack|tectstack|steck|skak)\b/g, 'stack')
      .replace(/\b(skils|skil|skilset|skilsset)\b/g, 'skills')
      .replace(/\b(architechture|architecure|archeticture|archetecture)\b/g, 'architecture')
      .replace(/\b(timline|time-line)\b/g, 'timeline')
      .replace(/\b(experiance|expereince|experence)\b/g, 'experience')
      .replace(/\b(porfolio|portfoli)\b/g, 'portfolio')
      .replace(/\b(projct|projcts|projet|projets)\b/g, 'projects')
      .replace(/\b(certif|certificats)\b/g, 'certifications')
      .replace(/\b(languges|laguages)\b/g, 'languages')
      .replace(/\b(doman|domian|domians|domans)\b/g, 'domain');

    const q = clean.trim();

    // ==========================================
    // 0. CONVERSATIONAL GREETINGS & SOCIAL CHIT-CHAT
    // ==========================================
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo', 'howdy'];
    if (greetings.some(g => q === g || q.startsWith(g + ' ') || q.endsWith(' ' + g) || q === `${g}!` || q === `${g}?`)) {
      return {
        text: "👋 **Hello! I am Ansh Chauhan's AI Portfolio Copilot & Architecture Assistant.**\n\nI'm here to give you in-depth, technical answers about Ansh's engineering work:\n• **🎯 Best Fit Domains**: Generative AI & Agentic Systems, High-Concurrency Full-Stack, and Real-Time Architectures.\n• **🛠️ Core Tech Stack**: Polyglot proficiency across Python, Next.js, FastAPI, LangGraph, Java, and Redis.\n• **⏱️ Architectural Timeline**: His journey from core CS & algorithms to distributed systems and agentic AI.\n• **🚀 8 Deployed Production Projects**: Live apps spanning real-time WebSockets, in-memory FAISS RAG, and LangGraph multi-agents.\n• **💼 Enterprise Engineering @ Sharnex**: Scaled multi-tenant portals, automated Razorpay invoicing, and live Redis SSE bus tracking.\n\nWhat would you like to explore first?",
        suggestions: ["🎯 Best Fit Domains", "🛠️ Core Tech Stack", "⏱️ Architectural Timeline", "⭐ Top 3 Projects"]
      };
    }

    if (q.includes('thank') || q.includes('thanks') || q.includes('awesome') || q.includes('great job') || q.includes('cool') || q.includes('impressive') || q.includes('nice work')) {
      return {
        text: "⚡ **Glad that was helpful!**\n\nAnsh builds every system with this level of architectural depth and attention to detail. Would you like to inspect another component, check out his **work at Sharnex**, or review his **contact details**?",
        suggestions: ["🎯 Best Fit Domains", "🛠️ Core Tech Stack", "💼 Sharnex Work", "📫 Contact Ansh"]
      };
    }

    // ==========================================
    // 1. COPILOT IDENTITY ("Who are you?", "What are you?", "What can you do?")
    // ==========================================
    if (
      q.includes('who are you') ||
      q.includes('who r u') ||
      q.includes('what are you') ||
      q.includes('what r u') ||
      q.includes('what is this') ||
      q.includes('what can you do') ||
      q.includes('your purpose') ||
      q.includes('who made you') ||
      q.includes('who created you') ||
      q.includes('tell me about yourself') ||
      q.includes('introduce yourself') ||
      q.includes('what do you do') ||
      q === 'who?'
    ) {
      return {
        text: "🤖 **I am Ansh Chauhan's Autonomous Portfolio Copilot & Architecture Intelligence Assistant.**\n\nI am engineered to serve as an interactive technical companion for recruiters, engineering managers, and fellow developers exploring Ansh's portfolio.\n\n**Here is what I can do for you:**\n• **🎯 Domain & Role Recommendations**: Explain exactly which engineering domains and job roles Ansh excels in.\n• **🛠️ Inspect Tech Stack**: Full breakdown of his languages, AI frameworks, frontend/backend tools, and databases.\n• **⏱️ Architectural Timeline**: Walk you through Ansh's evolution across 5 distinct engineering phases (2023–2026+).\n• **🔬 System Design Deep-Dives**: Break down how he engineered resilient multi-LLM failover (Groq LPUs + Gemini), in-memory FAISS DOM RAG, and Redis Pub/Sub + SSE telemetry.\n• **🚀 8 Deployed Applications**: Provide live URLs, tech stacks, and architecture blueprints for all 8 production projects.\n• **💼 Industry Impact**: Detail the enterprise payment pipelines, LMS blueprints, and GPS fleet tracking he deployed at Sharnex.\n• **🎯 Recruiter Pitch**: Explain his core strengths, algorithmic foundation (Java/C++), and why he stands out as an engineer.\n\nTry asking: *\"Which domain is good for Ansh?\"* or *\"What is core tech stack of Ansh?\"*!",
        suggestions: ["🎯 Best Fit Domains", "🛠️ Core Tech Stack", "⏱️ Architectural Timeline", "⭐ Top 3 Projects"]
      };
    }

    // ==========================================
    // 1.2 QUALIFICATIONS & BACKGROUND OVERVIEW
    // ==========================================
    if (
      q.includes('resume') ||
      q.includes('cv') ||
      q.includes('curriculum vitae') ||
      q.includes('biodata') ||
      (q.includes('download') && (q.includes('profile') || q.includes('pdf')))
    ) {
      return {
        text: "📋 **Ansh Chauhan's Professional Summary & Credentials:**\n\n• **Current Role**: Full-Stack Developer @ Sharnex (Next.js, Razorpay automated financial engine, LMS Blueprint, Redis SSE telemetry)\n• **Previous Experience**: Software Development Intern @ Mobineers Info Systems (Python/Tkinter, SQLite NLP assistant)\n• **Education**: B.Tech in Computer Science & Engineering (2023–2027) at Guru Gobind Singh Indraprastha University (GGSIPU), Delhi\n• **Core Specializations**: LangGraph Multi-Agents, Agentic RAG (FAISS/ChromaDB), FastAPI, Next.js, and Java/C++\n• **8 Live Projects**: Full production deployments spanning real-time WebSockets duels (CodeArena), Chrome MV3 AI extensions (PageSense Pro), and multi-LLM failover (AI Interview Coach)\n• **Direct Contact**: iamansh86@gmail.com | +91 9899609856\n\nWould you like to explore his **work at Sharnex**, **tech stack**, or **live projects**?",
        suggestions: ["💼 Sharnex Work", "🛠️ Core Tech Stack", "🚀 All 8 Projects", "📫 Contact Ansh"]
      };
    }

    // ==========================================
    // 1.5 DOMAIN & BEST FIT ROLES ("Which domain is good for Ansh?", "What roles suit him?")
    // ==========================================
    if (
      q.includes('domain') ||
      q.includes('which domain') ||
      q.includes('what domain') ||
      q.includes('best domain') ||
      q.includes('good domain') ||
      (q.includes('good for') && q.includes('ansh')) ||
      (q.includes('fit for') && q.includes('ansh')) ||
      q.includes('best role') ||
      q.includes('suitable role') ||
      q.includes('which role') ||
      q.includes('what role') ||
      q.includes('specialization') ||
      q.includes('specialise') ||
      q.includes('specialize') ||
      q.includes('expertise') ||
      (q.includes('hire') && (q.includes('for what') || q.includes('as what') || q.includes('position')))
    ) {
      return {
        text: "🎯 **Which Domains & Roles are the Best Fit for Ansh Chauhan?**\n\nBased on his deployed production architectures and industry engineering at Sharnex, Ansh is uniquely positioned to excel across **3 high-impact domains**:\n\n• **1. Generative AI & Agentic Systems Engineering (Primary & Standout Domain)** 🤖\n  - **Why he shines**: Ansh moves far beyond shallow API wrappers. He architects **cyclic multi-agent state machines** with [LangGraph](https://ai-interview-steel-psi.vercel.app/), in-memory RAM vector indexing with **FAISS** (<10ms retrieval), 50-agent autonomous social simulations in [Memeconomy](https://memeconomy-three.vercel.app/), and resilient **multi-provider LLM failover pipelines** (Groq LPUs + Gemini with in-memory circuit breakers).\n  - **Best-fit Roles**: **AI Engineer**, **Generative AI Developer**, **LLM / Agent Systems Engineer**.\n\n• **2. High-Concurrency Full-Stack & Real-Time Engineering** ⚡\n  - **Why he shines**: Proven track record building enterprise multi-tenant cloud platforms at **Sharnex**, real-time GPS fleet tracking streaming via **Redis Pub/Sub & Server-Sent Events (SSE)**, and low-latency (<30ms) bidirectional competitive coding duels in [CodeArena](https://codearena-murex.vercel.app/) using **Socket.io & Monaco Editor**.\n  - **Best-fit Roles**: **Full-Stack Developer**, **Software Engineer (Product & Real-Time)**, **Frontend Systems Engineer**.\n\n• **3. Scalable Backend & Systems Architecture** ⚙️\n  - **Why he shines**: Strong mastery of asynchronous non-blocking Python (**FastAPI**), **Node.js**, automated financial pipelines (**Razorpay** gateway with digital GST tax invoices), and sandboxed multi-language test execution for **Java, C++, and Python**.\n  - **Best-fit Roles**: **Backend Engineer**, **Platform / Systems Engineer**.\n\nWhether stepping into an early-stage startup looking for a high-velocity 0-to-1 builder, or an established engineering team scaling agentic AI pipelines, Ansh delivers immediate production impact!",
        suggestions: ["🛠️ Core Tech Stack", "⭐ Top 3 Projects", "⏱️ Architectural Timeline", "📫 Contact Ansh"]
      };
    }

    // ==========================================
    // 1.6 FRONTEND VS BACKEND BALANCE
    // ==========================================
    if (
      (q.includes('frontend') && q.includes('backend') && (q.includes('or') || q.includes('vs') || q.includes('better') || q.includes('prefer'))) ||
      q.includes('fullstack or')
    ) {
      return {
        text: "⚖️ **Frontend vs Backend: How Ansh Balances Both**\n\nAnsh is a true **Full-Stack Engineer** with production-proven depth across both disciplines:\n\n• **Backend Depth (~55%)**: High-concurrency asynchronous **FastAPI**, **LangGraph state machines**, in-memory **FAISS vector indices**, **Redis Pub/Sub SSE**, **Razorpay webhook payment engines**, and sandboxed multi-language code executors in **Java & C++**.\n• **Frontend Depth (~45%)**: Enterprise multi-tenant **Next.js** platforms at Sharnex, interactive **Monaco Editor** integrations in CodeArena, **Leaflet/MapLibre** sub-second telemetry mapping, and Chrome Manifest V3 extension interfaces.\n\nHe bridges the gap seamlessly: designing the backend API contract and building the responsive, high-performance UI that consumes it!",
        suggestions: ["🎯 Best Fit Domains", "🛠️ Core Tech Stack", "⚙️ Backend Stack", "🎨 Frontend Stack"]
      };
    }

    // ==========================================
    // 1.7 YEARS OF EXPERIENCE / SENIORITY / BACKGROUND
    // ==========================================
    if (
      q.includes('years of experience') ||
      q.includes('how much experience') ||
      q.includes('how many years') ||
      q.includes('experience level') ||
      q.includes('fresher') ||
      q.includes('seniority')
    ) {
      return {
        text: "💼 **Ansh Chauhan's Experience Level & Industry Background**:\n\n• **Current Role**: **Full-Stack Developer @ Sharnex** (07/2026 – Present) — leading multi-tenant Next.js modules, Redis SSE live bus telemetry, and Razorpay billing engines.\n• **Previous Industry Role**: **Software Development Intern @ Mobineers Info Systems** (05/2025 – 07/2025) — conversational NLP assistants, multi-threaded Tkinter desktop applications, and SQLite database automation.\n• **Production Output**: **8 deployed live applications** with verifiable uptime across Agentic AI, real-time WebSockets, computer vision, and fintech.\n• **Academic Cadence**: Class of 2027 (B.Tech in CSE at GGSIPU), offering a blend of modern production engineering velocity with strong classical CS theory (DSA, OOP in Java/C++).",
        suggestions: ["🎯 Best Fit Domains", "💼 Sharnex Work", "⏱️ Architectural Timeline", "🎯 Why Hire Ansh?"]
      };
    }

    // ==========================================
    // 2. CORE TECH STACK & ENGINEERING ECOSYSTEM
    // ==========================================
    // Specific Frontend Stack Query
    if (
      q.includes('frontend stack') ||
      q.includes('front end stack') ||
      q.includes('ui stack') ||
      (q.includes('frontend') && (q.includes('tech') || q.includes('tool') || q.includes('framework')))
    ) {
      return {
        text: "🎨 **Ansh Chauhan's Frontend & UI Engineering Stack**:\n\n• **Core Frameworks**: **Next.js** (App Router, Server Components, multi-tenant portals at Sharnex) & **React.js** (SPAs, dynamic state hydration).\n• **Styling & Layout**: **Tailwind CSS**, Responsive Mobile-First grids, Glassmorphism & custom dark/light theme systems.\n• **Specialized UI Interfaces**:\n  - **Monaco Editor & CodeMirror**: Interactive multi-language IDE environments with live syntax highlighting in [CodeArena](https://codearena-murex.vercel.app/) and [AIInterview Coach](https://ai-interview-steel-psi.vercel.app/).\n  - **Leaflet & MapLibre**: Sub-second GPS marker interpolation for fleet tracking at Sharnex.\n  - **Chrome MV3 Extensions**: Content script DOM manipulation, background service workers, and side panels in [PageSense Pro](https://web-page-extension.vercel.app/).\n• **Component Architecture**: Modular component trees with Lucide icons, Framer Motion transitions, and accessible UI semantics.",
        suggestions: ["🛠️ Core Tech Stack", "⚙️ Backend Stack", "🤖 AI & GenAI Stack", "🏆 CodeArena 1v1"]
      };
    }

    // Specific Backend Stack Query
    if (
      q.includes('backend stack') ||
      q.includes('back end stack') ||
      q.includes('server stack') ||
      q.includes('api stack') ||
      (q.includes('backend') && (q.includes('tech') || q.includes('tool') || q.includes('framework')))
    ) {
      return {
        text: "⚙️ **Ansh Chauhan's Backend & Systems Engineering Stack**:\n\n• **Core Frameworks**: **FastAPI** (asynchronous Python with Starlette ASGI) for high-throughput AI microservices & **Node.js / Express** for event-driven real-time coordination.\n• **Real-Time Protocols**:\n  - **Redis Pub/Sub + Server-Sent Events (SSE)**: High-throughput unidirectional telemetry streaming over HTTP/2 at Sharnex.\n  - **Socket.io (Binary WebSockets)**: Low-latency bidirectional state synchronization (<30ms) for 1v1 duels in CodeArena.\n• **Security & Payments**: Automated **Razorpay** webhook signature validation, IFSC banking verification, and GST tax invoice generation.\n• **Sandboxed Evaluators**: Multi-language test runner microservices validating Java, C++, and Python submissions against strict time and space complexity constraints.",
        suggestions: ["🛠️ Core Tech Stack", "🎨 Frontend Stack", "📡 Real-Time Architecture", "💼 Sharnex Work"]
      };
    }

    // Specific AI / GenAI / ML Stack Query
    if (
      q.includes('ai stack') ||
      q.includes('ml stack') ||
      q.includes('genai stack') ||
      q.includes('generative ai stack') ||
      q.includes('machine learning stack') ||
      q.includes('llm stack') ||
      q.includes('agent stack')
    ) {
      return {
        text: "🤖 **Ansh Chauhan's Generative AI, Agentic & Machine Learning Stack**:\n\n• **Agentic Orchestration**: **LangGraph** (cyclic state graphs, checkpointing, multi-agent networks) & **LangChain** (agentic tool-calling loops).\n• **High-Speed Inference**: **Groq LPU (Llama 3.3-70B on LPUs)** delivering ~300 tokens/sec, coupled with **Google Gemini 1.5 Flash/Pro** multi-provider failover.\n• **In-Memory & Cloud Vector Search**: **FAISS** in-memory vector store (sub-10ms DOM RAG directly in RAM) & **ChromaDB** for persistent document embeddings.\n• **Speech & Audio AI**: **faster-whisper** for speech-to-text transcription & **ElevenLabs API** for low-latency neural speech synthesis.\n• **Computer Vision & Neural Networks**: Custom **TensorFlow/Keras CNNs** (FER-2013 facial micro-expression classifier with sub-80ms CPU inference), **OpenCV**, and **WebRTC** camera streaming.\n• **Predictive ML**: **Scikit-Learn** regressors and feature pipelines in the AI Real Estate Valuation SaaS.",
        suggestions: ["🔄 Multi-LLM Failover", "⚡ PageSense Citations", "🤖 Memeconomy 50 Agents", "🛠️ Core Tech Stack"]
      };
    }

    // Specific Database Stack Query
    if (
      q.includes('database stack') ||
      q.includes('databases') ||
      q.includes('database') ||
      q.includes('db stack') ||
      q.includes('vector database') ||
      q.includes('vector store') ||
      q.includes('mongodb') ||
      q.includes('sqlite') ||
      q.includes('faiss') ||
      q.includes('chromadb')
    ) {
      return {
        text: "🗄️ **Ansh Chauhan's Database & Vector Storage Architecture**:\n\n• **In-Memory Vector Search (FAISS)**: Implemented directly in RAM within FastAPI backends for [PageSense Pro](https://web-page-extension.vercel.app/). Eliminates cloud vector database network round-trips to achieve sub-10ms chunk retrieval.\n• **Persistent Document Embeddings (ChromaDB)**: Stores structured resume vectors and job description embeddings for [AIInterview Coach](https://ai-interview-steel-psi.vercel.app/).\n• **NoSQL Document Store (MongoDB)**: Stores room duel state, player ratings, and match history in [CodeArena](https://codearena-murex.vercel.app/) and agent run traces in [Memeconomy](https://memeconomy-three.vercel.app/).\n• **High-Performance Caching & Messaging (Redis)**: Redis Pub/Sub drives real-time GPS coordinates for 1000s of bus subscribers at Sharnex; in-memory cache keys enforce LLM rate-limit cooldowns.\n• **Relational Databases (SQLite & PostgreSQL)**: Indexed schemas for enterprise administrative query automation at Mobineers.",
        suggestions: ["🛠️ Core Tech Stack", "⚙️ Backend Stack", "📡 Real-Time Architecture", "🚀 All 8 Projects"]
      };
    }

    // General Tech Stack Query (Catches "core tech stack", "tech stack of ansh", "what is his stack", "skills", "technologies", "tools", "languages")
    if (
      q.includes('stack') ||
      q.includes('skill') ||
      q.includes('technolog') ||
      q.includes('tool') ||
      q.includes('what does he use') ||
      q.includes('what he use') ||
      q.includes('what can he code') ||
      q.includes('languages and frameworks') ||
      (q.includes('what') && q.includes('know'))
    ) {
      return {
        text: "🛠️ **Ansh Chauhan's Core Tech Stack & Engineering Ecosystem**:\n\nAnsh operates as a versatile Full-Stack & Generative AI Engineer, structuring his architecture across production-proven layers:\n\n• **🧠 AI, GenAI & Agentic Systems**:\n  - **Frameworks**: LangGraph (cyclic state machines), LangChain, FAISS (in-memory RAM vector store), ChromaDB.\n  - **LLM Pipelines**: Groq LPU (Llama 3.3-70B at ~300 tok/s), Google Gemini 1.5 Flash/Pro, OpenAI Whisper, ElevenLabs Voice.\n  - **Computer Vision & ML**: Custom TensorFlow/Keras CNNs (sub-80ms CPU inference), Scikit-Learn regressors, OpenCV, WebRTC.\n\n• **🎨 Frontend & Interactive UI**:\n  - **Frameworks**: Next.js (App Router, Server Components), React.js, Tailwind CSS.\n  - **Specialized Interfaces**: Monaco Editor & CodeMirror (live code execution), Leaflet & MapLibre (GPS fleet maps), Lucide Icons, Framer Motion.\n  - **Browser Platforms**: Chrome Extensions (Manifest V3 service workers, DOM RAG content scripts).\n\n• **⚙️ Backend, Systems & Real-Time**:\n  - **Engines**: FastAPI (asynchronous non-blocking Python), Node.js, Express.\n  - **Real-Time Protocols**: Redis Pub/Sub + Server-Sent Events (SSE) for telemetry, Socket.io (Binary WebSockets) for 1v1 duels.\n  - **Web3**: Ethereum Solidity smart contracts, Web3.py RPC provider integration.\n\n• **💻 Core Programming Languages**:\n  - **Python**: Generative AI, LangGraph, async microservices, machine learning.\n  - **JavaScript / TypeScript**: Scalable web architectures, Chrome MV3 extensions, real-time node engines.\n  - **Java & C++**: Algorithmic problem-solving, OOP design patterns, and sandboxed competitive coding execution.\n  - **SQL & Solidity**: Relational indexing and decentralized smart contracts.",
        suggestions: ["⏱️ Architectural Timeline", "⭐ Top 3 Projects", "🔄 Multi-LLM Failover", "💼 Sharnex Work"]
      };
    }

    // ==========================================
    // 3. ARCHITECTURAL TIMELINE & CAREER EVOLUTION
    // ==========================================
    if (
      q.includes('timeline') ||
      q.includes('journey') ||
      q.includes('evolution') ||
      q.includes('career progression') ||
      q.includes('career path') ||
      q.includes('roadmap') ||
      (q.includes('architect') && (q.includes('time') || q.includes('history') || q.includes('evolve'))) ||
      q.includes('history of projects') ||
      q.includes('how did he start') ||
      q.includes('progression')
    ) {
      return {
        text: "⏱️ **Ansh Chauhan's Architectural Timeline & Engineering Evolution**\n\nAnsh's engineering journey is defined by a deliberate transition from core computer science fundamentals to production distributed architectures and agentic AI systems:\n\n• **Phase 1: Algorithmic Foundations & Systems Rigor (2023 – 2024)**\n  - Enrolled in B.Tech Computer Science & Engineering at GGSIPU, Delhi.\n  - Built deep foundations in Data Structures & Algorithms, memory management, and OOP principles in **C++, Java, and Python**.\n  - Solved competitive programming problems focusing on Big-O computational complexity, dynamic programming, and graphs.\n\n• **Phase 2: Conversational NLP & Workplace Automation (05/2025 – 07/2025)**\n  - **Software Development Intern @ Mobineers Info Systems**.\n  - Engineered conversational NLP chatbots with intent recognition for automated administrative query resolution.\n  - Built multi-threaded Python Tkinter desktop applications with async background worker threads, in-memory query caching, and indexed SQLite relational schemas.\n\n• **Phase 3: Computer Vision, Deep Learning & Web3 Provenance (Late 2025)**\n  - **[AuraSync](https://aura-sync-1.onrender.com/)**: Custom FER-2013 Convolutional Neural Network (sub-80ms CPU inference) streaming webcam frames over WebRTC to map valence onto dynamic Spotify soundscapes.\n  - **[HerbTrace](https://herbtrace-1-0vsq.onrender.com/)**: Deployed Ethereum Solidity smart contracts via Web3.py paired with a TensorFlow botanical classification CNN for tamper-proof Ayurvedic supply chain provenance.\n  - **[AI Real Estate](https://houseprice-uvfqtmyueyznh8ktadx9ng.streamlit.app/)**: End-to-end deep learning property price regressor with 5-year investment and mortgage amortization forecasting.\n\n• **Phase 4: Scaled Multi-Tenant Cloud Architecture (07/2026 – Present)**\n  - **Full-Stack Developer @ Sharnex**.\n  - Architected enterprise school platform modules across 3 portals: automated Razorpay payment engine with GST tax invoicing, a ~7,500 LOC LMS curriculum blueprint, and real-time GPS fleet tracking streaming via **Redis Pub/Sub & Server-Sent Events (SSE)**.\n\n• **Phase 5: Agentic AI, Multi-LLM Failover & Real-Time Duels (2026)**\n  - **[CodeArena](https://codearena-murex.vercel.app/)**: Real-time 1v1 competitive coding platform with Socket.io sub-30ms syncing, ELO matchmaking, and sandboxed testbed evaluation in Java, C++, Python.\n  - **[PageSense Pro](https://web-page-extension.vercel.app/)**: Chrome MV3 extension with in-memory FAISS DOM RAG and interactive in-page citation flash-highlighting.\n  - **[AIInterview Coach](https://ai-interview-steel-psi.vercel.app/)**: LangGraph state machine interview simulator with zero-downtime Groq-to-Gemini failover and Whisper/ElevenLabs voice.\n  - **[Memeconomy](https://memeconomy-three.vercel.app/) & [MarketAgent](https://market-agent-1-jp5a.onrender.com/)**: 50-agent synthetic social network simulation and autonomous financial agentic RAG.",
        suggestions: ["🛠️ Core Tech Stack", "⭐ Top 3 Projects", "🔄 Multi-LLM Failover", "💼 Sharnex Work"]
      };
    }

    // ==========================================
    // 4. TOP / FLAGSHIP PROJECTS
    // ==========================================
    if (
      q.includes('top project') ||
      q.includes('best project') ||
      q.includes('flagship') ||
      q.includes('highlighted project') ||
      q.includes('favorite project') ||
      q.includes('standout project') ||
      q.includes('main project') ||
      ((q.includes('top') || q.includes('best') || q.includes('flagship')) && (q.includes('project') || q.includes('work') || q.includes('build')))
    ) {
      return {
        text: "⭐ **Ansh Chauhan's Top 3 Flagship Projects**\n\nWhile Ansh has built and deployed **8 production applications**, these three stand out for their technical complexity, real-time synchronization, and agentic AI engineering:\n\n1. 🏆 **[CodeArena](https://codearena-murex.vercel.app/) — 1v1 Competitive Programming Battleground**\n• **Why it's a flagship**: Low-latency bidirectional WebSockets (<30ms) synchronized across dual Monaco code editors. Features automated ELO skill matchmaking, 4 battle modes (Rapid, Bug Hunter, Code Duel, Complexity Duel), and sandboxed multi-language test validation for **Java, C++, and Python**.\n\n2. ⚡ **[PageSense Pro](https://web-page-extension.vercel.app/) — In-Memory DOM RAG & In-Page Citations**\n• **Why it's a flagship**: Chrome MV3 Extension + FastAPI backend. Eliminates external vector DB latency by chunking active webpage text and building an in-memory **FAISS vector store directly in RAM** (sub-10ms retrieval). Features interactive citation scrolling where clicking `[Source X]` chips smoothly scrolls the live page and flash-highlights the cited text.\n\n3. 🔄 **[AIInterview Coach](https://ai-interview-steel-psi.vercel.app/) — Stateful Mock Interview Simulator**\n• **Why it's a flagship**: Stateful LangGraph graph coordinating behavioral, HR, and technical coding interview rounds. Features an in-memory circuit-breaker achieving **zero downtime** by failing over from primary Groq (Llama 3.3-70B) to Google Gemini during rate limits, combined with Whisper STT and ElevenLabs voice synthesis.\n\nAll three are live and deployed with verified uptime!",
        suggestions: ["🏆 CodeArena 1v1", "⚡ PageSense Citations", "🔄 Multi-LLM Failover", "🚀 All 8 Projects"]
      };
    }

    // ==========================================
    // 5. WHY HIRE ANSH / RECRUITER PITCH & STRENGTHS
    // ==========================================
    if (
      q.includes('why hire') ||
      q.includes('why should we hire') ||
      q.includes('why should i hire') ||
      q.includes('why choose') ||
      q.includes('strengths') ||
      q.includes('what makes him unique') ||
      q.includes('why ansh') ||
      q.includes('pitch') ||
      q.includes('hire him') ||
      q.includes('stand out') ||
      q.includes('what sets him apart')
    ) {
      return {
        text: "🎯 **Why Hire Ansh Chauhan? (Recruiter & Engineering Pitch)**\n\nAnsh brings a rare combination of **enterprise-grade production execution**, **agentic AI architectural depth**, and **rigorous computer science fundamentals**:\n\n• **1. Proven Production Ownership at Scale (Sharnex & Mobineers)**\n  - Built multi-tenant platforms powering schools: processed payments via Razorpay with automated GST tax invoices, engineered ~7,500 LOC LMS curriculum blueprints, and architected live GPS vehicle telemetry over Redis Pub/Sub & SSE.\n\n• **2. Agentic AI & RAG Mastery Beyond Toy Wrappers**\n  - Designs resilient systems: zero-downtime multi-provider LLM failover (Groq LPU -> Gemini with circuit breakers), in-memory FAISS DOM RAG, and LangGraph state machines coordinating 50 synthetic agents.\n\n• **3. 8 Live Deployed Projects with 100% Verifiable Uptime**\n  - Not just local repositories—every project has an active production deployment with live demos, responsive UI, and robust backend APIs.\n\n• **4. Strong Core CS & Polyglot Fluency**\n  - Deep algorithmic and OOP mastery in **Java, C++, Python, TypeScript, and React/Next.js**, allowing him to move seamlessly between systems-level optimization and frontend user experience.\n\n• **Status**: Actively looking for Software Engineering, Full-Stack, and AI Engineer roles!",
        suggestions: ["🛠️ Core Tech Stack", "⏱️ Architectural Timeline", "💼 Sharnex Work", "📫 Contact Ansh"]
      };
    }

    // ==========================================
    // 6. AVAILABILITY, JOB SEARCH, LOCATION & WORK PREFERENCES
    // ==========================================
    if (
      q.includes('available') ||
      q.includes('availability') ||
      q.includes('open to work') ||
      q.includes('looking for work') ||
      q.includes('hiring') ||
      q.includes('job status') ||
      q.includes('current role') ||
      q.includes('location') ||
      q.includes('delhi') ||
      q.includes('remote') ||
      q.includes('relocate') ||
      q.includes('full time') ||
      q.includes('internship') ||
      q.includes('join') ||
      q.includes('notice period')
    ) {
      return {
        text: "💼 **Ansh Chauhan's Current Availability & Work Preferences**:\n\n• **Current Status**: **Actively exploring Software Engineering, Full-Stack, and AI Engineer opportunities!**\n• **Roles Interested In**: Software Engineer (SWE), Full-Stack Developer, AI/ML Engineer, Backend Engineer.\n• **Location**: Delhi, India.\n• **Work Mode Preferences**: Flexible — Open to **Remote**, **Hybrid**, or **On-site** (Delhi-NCR or open to relocation for compelling roles).\n• **Notice Period / Availability**: Immediate / Minimal transition requirements.\n• **Reach Out Directly**: Email at [iamansh86@gmail.com](mailto:iamansh86@gmail.com) or call **+91 9899609856**.",
        suggestions: ["🎯 Why Hire Ansh?", "🛠️ Core Tech Stack", "📫 Contact Ansh", "🚀 All 8 Projects"]
      };
    }

    // ==========================================
    // 7. HARDEST PROBLEMS SOLVED & ENGINEERING CHALLENGES
    // ==========================================
    if (
      q.includes('hardest') ||
      q.includes('most complex') ||
      q.includes('biggest challenge') ||
      q.includes('challenging') ||
      q.includes('most difficult') ||
      q.includes('complex problem') ||
      q.includes('hurdles')
    ) {
      return {
        text: "🧗 **Most Complex Engineering Challenges Ansh Has Solved**:\n\n1. **Zero-Downtime Multi-Provider LLM Failover with State Preservation**:\n   - *Challenge*: Commercial LLM APIs suffer sudden HTTP 429 quota throttles or 503 gateway timeouts mid-interview in [AIInterview Coach](https://ai-interview-steel-psi.vercel.app/). Dropping sessions ruins candidate trust.\n   - *Solution*: Built an asynchronous in-memory circuit breaker that detects throttles on Groq (Llama 3.3-70B), marks the provider cooling down for 60s, and re-dispatches the LangGraph state context to Google Gemini with zero dropped turns.\n\n2. **Sub-10ms DOM RAG without Cloud Vector Latency**:\n   - *Challenge*: Calling remote cloud vector databases (Pinecone/Weaviate) from a Chrome extension takes 200-400ms network round-trip overhead per question.\n   - *Solution*: Designed [PageSense Pro](https://web-page-extension.vercel.app/) to chunk the DOM into 600-char segments and build an in-memory **FAISS vector store directly in RAM** on the FastAPI backend, achieving sub-10ms similarity retrieval.\n\n3. **GPS Marker Jitter & Cellular Drops in Live Fleet Telemetry**:\n   - *Challenge*: Vehicle GPS updates at Sharnex stream over flaky cellular connections, causing jumpy map markers and dropped WebSockets.\n   - *Solution*: Shifted from WebSockets to **Server-Sent Events (SSE) + Redis Pub/Sub**, cutting server RAM by ~60% and enabling automatic HTTP reconnection with Leaflet smooth vector interpolation.",
        suggestions: ["🔄 Multi-LLM Failover", "⚡ PageSense Citations", "📡 Real-Time Architecture", "🏆 CodeArena 1v1"]
      };
    }

    // ==========================================
    // 8. SCALABILITY, PERFORMANCE & BENCHMARKS
    // ==========================================
    if (
      q.includes('scale') ||
      q.includes('scalability') ||
      q.includes('latency') ||
      q.includes('throughput') ||
      q.includes('high concurrency') ||
      q.includes('performance') ||
      q.includes('optimization') ||
      q.includes('benchmarks')
    ) {
      return {
        text: "⚡ **Architectural Performance Benchmarks & Scalability Strategy**:\n\n• **Ultra-Fast LLM Generation**: Pairing **Groq LPU hardware** with Llama 3.3-70B delivers ~300 tokens/second, reducing user wait time to sub-second responses.\n• **Token Optimization (70%+ Cost Reduction)**: In [Memeconomy](https://memeconomy-three.vercel.app/), a 2-stage deterministic pre-filter gates 50 synthetic agents, restricting expensive LLM calls to only 3 critical virality decision points.\n• **RAM-Resident Retrieval**: [PageSense Pro](https://web-page-extension.vercel.app/) builds instant FAISS indices directly in memory for sub-10ms chunk lookup.\n• **Sub-30ms Real-Time WebSockets**: [CodeArena](https://codearena-murex.vercel.app/) coordinates live 1v1 Monaco editor diffs using room-scoped Socket.io clusters with disconnect recovery tokens.\n• **Sub-80ms CPU Inference**: Custom FER-2013 facial CNN in [AuraSync](https://aura-sync-1.onrender.com/) executes emotion inference directly on CPU without needing dedicated GPU hardware.",
        suggestions: ["🔄 Multi-LLM Failover", "🏆 CodeArena 1v1", "⚡ PageSense Citations", "🛠️ Core Tech Stack"]
      };
    }

    // ==========================================
    // 9. CODING PROFILES, LEETCODE & COMPETITIVE PROGRAMMING
    // ==========================================
    if (
      q.includes('leetcode') ||
      q.includes('codeforces') ||
      q.includes('competitive programming') ||
      q.includes('problem solving') ||
      q.includes('hackathon') ||
      q.includes('dsa') ||
      q.includes('algorithm') ||
      q.includes('data structure') ||
      q.includes('rating') ||
      q.includes('ranking')
    ) {
      return {
        text: "🧠 **Competitive Programming, DSA & Problem Solving Foundation**:\n\n• **Core Languages for Problem Solving**: Solves complex algorithmic challenges in **Java and C++**, emphasizing Big-O time and space optimization.\n• **Key Algorithmic Strengths**: Dynamic Programming (memoization & tabulation), Graph Traversals (BFS, DFS, Dijkstra), Trees, Sliding Window, Monotonic Stacks, and Bit Manipulation.\n• **Creator of [CodeArena](https://codearena-murex.vercel.app/)**: Turned competitive programming passion into a production platform featuring 4 duel modes (Rapid, Bug Hunter, Code Duel, Complexity Duel) with sandboxed Java/C++/Python test execution.\n• **GitHub Repositories**: Publicly accessible open-source codebases demonstrating production clean architecture across all 8 deployed applications at [github.com/Ansh0864](https://github.com/Ansh0864).",
        suggestions: ["🏆 CodeArena 1v1", "☕ Java & Core CS", "🛠️ Core Tech Stack", "🚀 All 8 Projects"]
      };
    }

    // ==========================================
    // 10. GITHUB & SOURCE CODE
    // ==========================================
    if (
      q.includes('github') ||
      q.includes('repo') ||
      q.includes('source code') ||
      q.includes('repository') ||
      q.includes('repositories') ||
      q.includes('git')
    ) {
      return {
        text: "🐙 **GitHub Repositories & Open Source Work**:\n\n• **GitHub Profile**: [github.com/Ansh0864](https://github.com/Ansh0864)\n• **Open Source Codebases**:\n  - 🏆 **CodeArena**: Real-time 1v1 competitive coding battleground.\n  - ⚡ **PageSense Pro**: Manifest V3 Chrome Extension + FastAPI DOM RAG.\n  - 🔄 **AIInterview Coach**: LangGraph multi-round mock interview simulator.\n  - 🎭 **AuraSync**: WebRTC emotion recognition CNN + Spotify sync.\n  - 🤖 **Memeconomy**: 50-agent synthetic social propagation simulator.\n  - 🌿 **HerbTrace**: Ayurvedic CNN classification + Ethereum smart contracts.\n  - 📈 **MarketAgent**: Agentic financial intelligence RAG with Polygon.io.\n  - 🏠 **AI Real Estate Engine**: Deep learning housing valuation regressor.",
        suggestions: ["🚀 All 8 Projects", "🛠️ Core Tech Stack", "📫 Contact Ansh"]
      };
    }

    // ==========================================
    // 11. EDUCATION & ACADEMICS
    // ==========================================
    if (
      q.includes('education') ||
      q.includes('college') ||
      q.includes('degree') ||
      q.includes('university') ||
      q.includes('ggsipu') ||
      q.includes('btech') ||
      q.includes('b.tech') ||
      q.includes('academics') ||
      q.includes('study') ||
      q.includes('graduation')
    ) {
      return {
        text: "🎓 **Ansh Chauhan's Education & Academic Background**:\n\n• **Degree**: Bachelor of Technology (B.Tech) in Computer Science & Engineering (CSE)\n• **Institution**: Guru Gobind Singh Indraprastha University (GGSIPU), Delhi, India\n• **Graduation Timeline**: 2023 – 2027\n• **Core Coursework**: Data Structures & Algorithms, Object-Oriented Programming (Java/C++), Operating Systems, Database Management Systems (DBMS), Computer Networks, System Design, and Artificial Intelligence.\n• **Academic Approach**: Complements formal CS theory with real-world production engineering at Sharnex and 8 deployed full-stack & AI applications.",
        suggestions: ["⏱️ Architectural Timeline", "☕ Java & Core CS", "💼 Sharnex Work", "🚀 All 8 Projects"]
      };
    }

    // ==========================================
    // A. ARCHITECTURE FAQ DEEP-DIVES (Exact & Semantic Matches)
    // ==========================================

    // 1. Multi-Provider LLM Failover
    if (
      q.includes('resilient multi-provider') ||
      q.includes('multi-provider llm') ||
      q.includes('multi provider') ||
      (q.includes('failover') && (q.includes('llm') || q.includes('groq') || q.includes('gemini') || q.includes('pipeline'))) ||
      q.includes('rate limit downtime') ||
      q.includes('circuit breaker')
    ) {
      return {
        text: "🔄 **Architectural Deep-Dive: Resilient Multi-Provider LLM Pipelines**\n\nIn production AI applications like [AIInterview Coach](https://ai-interview-steel-psi.vercel.app/) and [MarketAgent](https://market-agent-1-jp5a.onrender.com/), relying on a single LLM API is a dangerous single-point-of-failure due to Tier-1 TPM/RPM quota throttles, 503 gateway timeouts, and provider incidents.\n\n• **Dual-Provider Topology**: Ansh implements an asynchronous pipeline pairing **Groq (Llama 3.3-70B on LPUs)** as the primary engine for ultra-fast generation (~300 tokens/sec) with **Google Gemini 1.5 Flash/Pro** as the secondary fallback.\n• **In-Memory Circuit Breaker & Cooldowns**: When Groq emits HTTP 429 (Rate Limit) or 5xx errors, an in-memory circuit-breaker marks that provider key cooling down for 60 seconds with exponential backoff and jitter to avoid thundering herds.\n• **LangGraph State Preservation**: State machines serialize candidate dialogue history and interview checkpoints into memory before dispatching requests. If a provider fails mid-turn, the request is seamlessly retried against Gemini with identical conversation context—meaning candidates never experience dropped sessions.\n• **Token Optimization**: Pre-filters and structured JSON schema outputs restrict token consumption to only critical decision nodes.",
        suggestions: ["⚡ PageSense Citations", "📡 Real-Time Architecture", "🔄 AIInterview Coach", "🚀 All 8 Projects"]
      };
    }

    // 2. PageSense Pro DOM RAG & In-Page Citations
    if (
      q.includes('pagesense') ||
      q.includes('webpagecb') ||
      (q.includes('extract') && q.includes('web page')) ||
      (q.includes('ground') && q.includes('live')) ||
      q.includes('in-page citation') ||
      q.includes('citation highlight') ||
      q.includes('dom chunking') ||
      q.includes('dom rag')
    ) {
      return {
        text: "⚡ **Architectural Deep-Dive: PageSense Pro In-Memory DOM RAG & Citations**\n\n[🚀 Live Application: web-page-extension.vercel.app](https://web-page-extension.vercel.app/)\n\n• **Content Script Extraction**: When active on any webpage, a lightweight Chrome MV3 content script traverses the DOM, strips boilerplate tags (`<script>`, `<style>`, `<nav>`, `<aside>`), and extracts clean semantic text.\n• **In-Memory FAISS Vector Store**: Chunks text into 600-character segments with 100-character sliding overlaps. Rather than incurring network latency with an external cloud vector database, the FastAPI backend builds an instant **FAISS index directly in RAM**, achieving sub-10ms retrieval latency.\n• **Strict Source Attribution**: The LLM prompt enforces grounding citations (`[Source 1]`, `[Source 2]`). Each citation stores metadata containing the exact DOM element identifier and character offset.\n• **Flash-Highlight & Viewport Scroll**: Clicking any `[Source X]` chip inside the extension side panel emits a postMessage event to the host webpage tab, executing `element.scrollIntoView({ behavior: 'smooth' })` and applying a CSS flash-highlight pulse on the exact cited paragraph!\n• **Autonomous Search Fallback**: If retrieved cosine similarity falls below threshold, an agentic loop triggers live DuckDuckGo web search to fulfill the query with verified internet facts.",
        suggestions: ["🔄 Multi-LLM Failover", "🏆 CodeArena 1v1", "📈 MarketAgent RAG", "🚀 All 8 Projects"]
      };
    }

    // 3. Real-Time Architectures (SSE vs Socket.io)
    if (
      q.includes('real-time applications') ||
      q.includes('real time applications') ||
      q.includes('architecture strategy for real-time') ||
      q.includes('real-time strategy') ||
      q.includes('websockets vs sse') ||
      q.includes('sse vs websockets') ||
      (q.includes('real-time') && q.includes('architecture'))
    ) {
      return {
        text: "📡 **Architectural Deep-Dive: Real-Time Engineering Strategy**\n\nAnsh selects real-time protocols based strictly on data flow directionality, connection scale, and network resilience:\n\n1. **High-Frequency Unidirectional Feeds (Sharnex Bus Telemetry)**:\n• **Protocol**: **Server-Sent Events (SSE) + Redis Pub/Sub** over HTTP/2.\n• **Why SSE over WebSockets**: GPS coordinates stream only from vehicle telemetry to thousands of parent/teacher viewers. SSE is HTTP-native, seamlessly bypasses corporate/school proxies, natively reconnects upon cellular drops, and consumes ~60% less server RAM than bidirectional WebSocket connections.\n• **Frontend**: Leaflet / MapLibre smooth marker interpolation renders vehicle movement continuously with sub-second accuracy.\n\n2. **Low-Latency Bidirectional Duels (CodeArena 1v1 Battleground)**:\n• **Protocol**: **Socket.io with Binary WebSockets**.\n• **Why WebSockets**: Competitive coding duels require simultaneous client-server events (keystroke diffs, live Monaco editor sync, duel forfeits, test case pass/fail ticks).\n• **Performance**: Room-scoped clusters achieve sub-30ms latency with disconnect/reconnect recovery tokens and MongoDB ELO persistence.",
        suggestions: ["🏆 CodeArena 1v1", "💼 Sharnex Bus Tracking", "🔄 Multi-LLM Failover", "🚀 All 8 Projects"]
      };
    }

    // ==========================================
    // B. SPECIFIC PROJECTS (All 8 Deployed Applications)
    // ==========================================

    // CodeArena
    if (q.includes('codearena') || q.includes('code arena') || q.includes('1v1') || q.includes('duel') || q.includes('elo')) {
      return {
        text: "🏆 **CodeArena — Real-Time 1v1 Competitive Programming Battleground**\n\n[🚀 Launch Live Application: codearena-murex.vercel.app](https://codearena-murex.vercel.app/)\n\n• **Overview**: High-concurrency competitive coding platform featuring live 1v1 duels, automated skill-based matchmaking, real-time code progress syncing, and a competitive ELO rating ladder.\n• **Architecture**: React + Monaco Editor -> Socket.io Event Bus -> Node.js ELO Matchmaking Queue -> Sandboxed Execution Evaluator -> MongoDB Leaderboard.\n• **4 Duel Modes**: Rapid Duel (speed sprint), Bug Hunter (spot and fix bugs), Code Duel (classic algorithmic contest), and Complexity Duel (evaluated against strict Big-O time and space benchmarks).\n• **Sub-30ms Sync**: Room-based Socket.io cluster synchronizes editor states with zero perceptible lag and automatic state recovery.\n• **Sandboxed Test Evaluation**: Evaluates competitive programming code submissions in **Java, C++, and Python**.",
        suggestions: ["⚡ PageSense Pro", "🔄 AIInterview Coach", "🚀 All 8 Projects", "📡 Real-Time Architecture"]
      };
    }

    // AIInterview Coach
    if (q.includes('interview') || q.includes('coach') || q.includes('aiinterview') || q.includes('mock interview')) {
      return {
        text: "🔄 **AIInterview Coach — Stateful Mock Interview Simulator**\n\n[🚀 Launch Live Application: ai-interview-steel-psi.vercel.app](https://ai-interview-steel-psi.vercel.app/)\n\n• **Overview**: Stateful multi-round technical and behavioral interview platform featuring RAG-grounded resume/JD question generation, zero-downtime multi-provider LLM failover, voice synthesis, and real-time code editor validation.\n• **Architecture**: Resume & JD Upload -> ChromaDB Vector Embeddings -> LangGraph State Engine -> Groq-Gemini Failover LLM -> Whisper Audio Ingestion + ElevenLabs Voice Synth -> CodeMirror Editor.\n• **LangGraph State Machine**: Orchestrates multi-round interview transitions across Behavioral, HR, and Technical Coding rounds with full state checkpointing and memory.\n• **0% Downtime Failover**: Seamlessly fails over from primary Groq (Llama 3.3-70B) to Google Gemini with in-memory per-key cooldown timers.\n• **Voice & Code Pipeline**: Integrates faster-whisper transcription, ElevenLabs TTS, and a live CodeMirror editor with strict syntax validation for Java, C++, and Python.",
        suggestions: ["⚡ PageSense Pro", "🏆 CodeArena 1v1", "🤖 Memeconomy 50 Agents", "🚀 All 8 Projects"]
      };
    }

    // AuraSync
    if (q.includes('aurasync') || q.includes('aura sync') || q.includes('emotion') || q.includes('spotify') || q.includes('micro-expression') || q.includes('fer-2013')) {
      return {
        text: "🎭 **AuraSync — Real-Time Emotion Recognition & Soundscape Sync**\n\n[🚀 Launch Live Application: aura-sync-1.onrender.com](https://aura-sync-1.onrender.com/)\n\n• **Overview**: Real-time computer vision emotion classification system that streams webcam frames via WebRTC, infers 7 human micro-expressions using a custom CNN, and dynamically synchronizes moods to Spotify soundscapes.\n• **Architecture**: WebRTC Video Capture -> OpenCV Grayscale Normalization -> Custom TensorFlow CNN -> FastAPI Inference Worker -> Spotify API Acoustic Playback.\n• **Sub-80ms CPU Inference**: Custom Convolutional Neural Network (CNN) trained on the FER-2013 dataset in TensorFlow/Keras to classify 7 micro-expressions (Joy, Sadness, Anger, Surprise, Fear, Disgust, Neutral).\n• **Low-Latency WebRTC Stream**: Secure on-device browser webcam video capture transmitted directly to an asynchronous FastAPI backend for real-time frame processing.",
        suggestions: ["🌿 HerbTrace Blockchain", "🏠 AI Real Estate", "🏆 CodeArena 1v1", "🚀 All 8 Projects"]
      };
    }

    // Memeconomy
    if (q.includes('memeconomy') || q.includes('meme economy') || q.includes('50 agent') || q.includes('synthetic social') || q.includes('propagation')) {
      return {
        text: "🤖 **Memeconomy — Synthetic Social Propagation Simulator**\n\n[🚀 Launch Live Application: memeconomy-three.vercel.app](https://memeconomy-three.vercel.app/)\n\n• **Overview**: Dual-layer multi-agent simulation platform modeling content spread, viral mutation, and decay across a directed social network graph populated by 50 persona-driven synthetic agents.\n• **Architecture**: Directed Network Graph -> Weighted Deterministic Pre-Filter -> LangGraph Agent Population (50 Agents) -> Mutation Engine -> MongoDB Experiment Tracking.\n• **50 Stateful Synthetic Agents**: Orchestrated via LangGraph with individual persona parameters (credulity, influence, contrarianism, emotional bias) making autonomous decisions to share, ignore, or remix content.\n• **2-Stage Deterministic Pre-Filter**: Weighted relevance, quality, and attention scoring gates agent reactions, restricting LLM invocations to only 3 critical touchpoints and slashing API token overhead by 70%+.",
        suggestions: ["🔄 AIInterview Coach", "⚡ PageSense Pro", "📈 MarketAgent RAG", "🚀 All 8 Projects"]
      };
    }

    // HerbTrace
    if (q.includes('herbtrace') || q.includes('herb trace') || q.includes('ayurvedic') || q.includes('blockchain') || q.includes('solidity')) {
      return {
        text: "🌿 **HerbTrace — AI & Blockchain Ayurvedic Traceability Platform**\n\n[🚀 Launch Live Application: herbtrace-1-0vsq.onrender.com](https://herbtrace-1-0vsq.onrender.com/)\n\n• **Overview**: End-to-end supply chain provenance platform combining computer vision herb classification with tamper-proof Ethereum smart contracts to ensure authenticity from farmer to consumer.\n• **Architecture**: Herb Image Ingestion -> TensorFlow CNN Classification -> Web3.py RPC Bridge -> Ethereum Solidity Contract -> Decentralized Verification Portal.\n• **Deep Learning CNN Classifier**: Custom TensorFlow/Keras convolutional neural network identifying authentic Ayurvedic botanical species from raw leaf photos with high accuracy.\n• **Ethereum Solidity Smart Contracts**: Deployed contracts via Web3.py maintaining immutable sourcing, batch processing, and laboratory test verifications on-chain.",
        suggestions: ["🎭 AuraSync Emotion CNN", "🏠 AI Real Estate", "🏆 CodeArena 1v1", "🚀 All 8 Projects"]
      };
    }

    // MarketAgent
    if (q.includes('marketagent') || q.includes('market agent') || q.includes('quant') || q.includes('polygon') || q.includes('tavily') || q.includes('stock')) {
      return {
        text: "📈 **MarketAgent (QUANT_ARENA) — Autonomous Financial Intelligence RAG**\n\n[🚀 Launch Live Application: market-agent-1-jp5a.onrender.com](https://market-agent-1-jp5a.onrender.com/)\n\n• **Overview**: Autonomous financial research and equity analysis platform utilizing Agentic RAG and LangChain.js to integrate Google Gemini with live market data feeds and real-time financial web search without hallucination.\n• **Architecture**: Financial Query Input -> LangChain Agentic Loop -> Polygon.io Tool + Tavily Web Search -> Gemini / Llama Synthesis -> Structured Report Output.\n• **Autonomous Agentic Loop**: Dynamic multi-tool calling orchestrated via LangChain.js, querying Polygon.io real-time stock feeds and Tavily AI web intelligence with zero hallucination.",
        suggestions: ["⚡ PageSense Pro", "🔄 AIInterview Coach", "🤖 Memeconomy 50 Agents", "🚀 All 8 Projects"]
      };
    }

    // Real Estate
    if (q.includes('real estate') || q.includes('realestate') || q.includes('house price') || q.includes('property valuation') || q.includes('mortgage')) {
      return {
        text: "🏠 **AI Real Estate Valuation Engine — Deep Learning Housing Valuation SaaS**\n\n[🚀 Launch Live Application: houseprice-uvfqtmyueyznh8ktadx9ng.streamlit.app](https://houseprice-uvfqtmyueyznh8ktadx9ng.streamlit.app/)\n\n• **Overview**: End-to-end deep learning property valuation engine predicting housing prices and driving an interactive mortgage calculator and 5-year investment forecast SaaS dashboard.\n• **Architecture**: Structured Real-Estate Data -> Scikit-Learn Feature Transformation -> TensorFlow Deep Regressor -> Streamlit State Engine -> Financial Calculator.\n• **Interactive SaaS Dashboard**: Implemented Streamlit state management (`st.session_state`) passing neural predictions into a dynamic 5-year ROI forecaster and mortgage amortization schedule.",
        suggestions: ["🎭 AuraSync Emotion CNN", "🌿 HerbTrace Blockchain", "🏆 CodeArena 1v1", "🚀 All 8 Projects"]
      };
    }

    // All 8 Projects
    if (q.includes('project') || q.includes('portfolio') || q.includes('what have you built') || q.includes('all projects')) {
      return {
        text: "🚀 **Ansh Chauhan's 8 Live Deployed Projects**:\n\n1. **🏆 [CodeArena](https://codearena-murex.vercel.app/)** — Real-time 1v1 competitive coding with Socket.io ELO matchmaking and sandbox evaluation.\n2. **⚡ [PageSense Pro (WebPageCB)](https://web-page-extension.vercel.app/)** — Agentic RAG Chrome MV3 extension with in-memory FAISS and interactive in-page citation highlighting.\n3. **🔄 [AIInterview Coach](https://ai-interview-steel-psi.vercel.app/)** — Stateful mock interview simulator powered by LangGraph, 0% downtime Groq-to-Gemini failover, and live code validation.\n4. **🎭 [AuraSync](https://aura-sync-1.onrender.com/)** — Real-time WebRTC emotion recognition CNN (<80ms CPU latency) synced to dynamic Spotify playlists.\n5. **🤖 [Memeconomy](https://memeconomy-three.vercel.app/)** — Synthetic social propagation simulator coordinating 50 stateful multi-agents across a directed graph.\n6. **🌿 [HerbTrace](https://herbtrace-1-0vsq.onrender.com/)** — Ayurvedic herb classification CNN combined with Ethereum Solidity smart contracts for supply chain provenance.\n7. **📈 [MarketAgent (QUANT_ARENA)](https://market-agent-1-jp5a.onrender.com/)** — Autonomous financial intelligence RAG with LangChain.js, Polygon.io stock feeds, and Tavily AI search.\n8. **🏠 [AI Real Estate Valuation Engine](https://houseprice-uvfqtmyueyznh8ktadx9ng.streamlit.app/)** — Deep learning housing price regressor with 5-year ROI forecasting and interactive mortgage calculator.\n\nAsk me about any specific project to inspect its architecture in detail!",
        suggestions: ["🏆 CodeArena 1v1", "⚡ PageSense Citations", "🔄 AIInterview Coach", "💼 Sharnex Work"]
      };
    }

    // ==========================================
    // C. WORK EXPERIENCE
    // ==========================================
    if (q.includes('sharnex') || q.includes('bus') || q.includes('gps') || q.includes('sse') || q.includes('lms') || q.includes('payment') || q.includes('gst')) {
      return {
        text: "💼 **Full-Stack Developer @ Sharnex (07/2026 – Present)**:\nAnsh architects enterprise modules for Sharnex's multi-tenant school platform across Institution, Teacher, and Student portals:\n\n• **💳 Fees & Online Payments Engine**: Razorpay gateway integration with automated IFSC bank validation, instant GST-compliant digital invoice generation, and double-entry ledger bookkeeping.\n• **📚 Learning Management System (LMS)**: Core curriculum engine (~7,500 LOC) enabling teachers to map syllabus blueprints, record daily lecture logs, and track lesson progress across grade levels.\n• **🚌 Live GPS Bus Tracking & Fleet Management**: Real-time vehicle location streaming via Redis Pub/Sub & Server-Sent Events (SSE) direct to interactive Leaflet/MapLibre maps with sub-second accuracy.\n• **📊 Marks Management & Academic Audit Trail**: Secure grading portal with immutable score revision history, student quiz evaluations, and printable report cards.",
        suggestions: ["📡 Real-Time Architecture", "🏆 CodeArena 1v1", "⚡ PageSense Pro", "📫 Contact Ansh"]
      };
    }

    if (q.includes('mobineers') || q.includes('intern') || q.includes('tkinter')) {
      return {
        text: "💼 **Software Development Intern @ Mobineers Info Systems (05/2025 – 07/2025)**:\nAnsh engineered conversational AI chatbots and task automation software within the core software engineering division:\n\n• **🤖 Conversational AI & NLP Assistant**: Engineered an interactive chatbot leveraging NLP intent recognition to handle workplace inquiries and automated query resolution.\n• **🖥️ Multi-Threaded Desktop GUI**: Built a responsive Python Tkinter desktop interface with asynchronous background threads to eliminate freezing during heavy data lookups.\n• **⚡ In-Memory Response Caching**: Designed a query caching layer that eliminated redundant database calls, accelerating conversational response speeds.\n• **🗄️ SQLite Database & API Automation**: Structured internal SQLite relational schemas with indexing and integrated enterprise REST APIs to automate administrative verification workflows.",
        suggestions: ["💼 Sharnex Work", "🚀 All 8 Projects", "☕ Java & Core CS"]
      };
    }

    if (q.includes('experience') || q.includes('work history') || q.includes('career') || q.includes('employment')) {
      return {
        text: "💼 **Ansh's Work History & Experience**:\n\n1. **Sharnex** (07/2026 – Present) — *Full-Stack Developer*\n• Architected multi-tenant Next.js platforms, real-time GPS telemetry with Redis SSE streaming, Razorpay payment engines with GST invoices, and ~7,500 LOC LMS syllabus blueprints.\n\n2. **Mobineers Info Systems** (05/2025 – 07/2025) — *Software Development Intern*\n• Engineered conversational AI chatbots with NLP intent recognition, multi-threaded Tkinter desktop GUIs, in-memory query caching, and SQLite data architectures.",
        suggestions: ["💼 Sharnex Work", "🚀 All 8 Projects", "📫 Contact Ansh"]
      };
    }

    // ==========================================
    // D. CORE CS & SKILLS
    // ==========================================
    if (q.includes('java') && !q.includes('javascript')) {
      return {
        text: "☕ **Java Experience & Software Engineering**:\nAnsh has strong expertise in **Java** for Object-Oriented Programming (OOP), Data Structures & Algorithms, and robust backend system design.\n\n• **CodeArena**: Sandbox test evaluation and time/space complexity tracking supporting Java competitive coding submissions.\n• **AIInterview Coach**: Strict Java syntax validation and OOP architecture interview challenges in the live CodeMirror editor.\n• **Core OOP Design Patterns**: Applied Factory, Strategy, Observer, and State patterns across scalable distributed systems.",
        suggestions: ["🏆 CodeArena 1v1", "🔄 AIInterview Coach", "🛠️ Core Tech Stack"]
      };
    }

    if (q.includes('c++') || q === 'c' || q.includes('c language') || q.includes('c and c++') || q.includes('c/c++')) {
      return {
        text: "⚡ **C & C++ Proficiency**:\nAnsh utilizes **C and C++** for core computer science fundamentals, low-latency algorithm implementation, and competitive programming.\n\n• **CodeArena**: Evaluates live C++ code submissions with real-time compilation checks and time/space complexity analysis during 1v1 duels.\n• **AIInterview Coach**: Validates low-level algorithmic solutions in technical coding interview rounds.\n• Deep mastery of pointers, memory management, and Big-O computational complexity.",
        suggestions: ["🏆 CodeArena 1v1", "☕ Java & Core CS", "🚀 All 8 Projects"]
      };
    }

    // ==========================================
    // E. CONTACT & BIO
    // ==========================================
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('resume') || q.includes('reach') || q.includes('hire')) {
      return {
        text: "📫 **Get in Touch with Ansh Chauhan**:\n\n• **Email**: [iamansh86@gmail.com](mailto:iamansh86@gmail.com)\n• **Phone**: +91 9899609856\n• **Location**: Delhi, India\n• **LinkedIn**: [linkedin.com/in/ansh-chauhan-7848b7314](https://www.linkedin.com/in/ansh-chauhan-7848b7314)\n• **GitHub**: [github.com/Ansh0864](https://github.com/Ansh0864)\n• **Status**: Actively available for Software Engineering & AI Engineer opportunities!",
        suggestions: ["🛠️ Core Tech Stack", "🚀 All 8 Projects", "💼 Sharnex Work"]
      };
    }

    if (
      q.includes('who is ansh') ||
      q.includes('about ansh') ||
      q.includes('bio') ||
      q.includes('who is he') ||
      q.includes('tell me about him') ||
      q.includes('tell me about ansh') ||
      q.includes('profile') ||
      q.includes('summary') ||
      q.includes('introduce')
    ) {
      return {
        text: "👨‍💻 **Ansh Chauhan** is a Full-Stack & Generative AI Engineer and Computer Science undergraduate (2023–2027 at GGSIPU, Delhi) with high-impact production experience at **Sharnex** and **Mobineers**.\n\n**Core Technical Pillars:**\n• **Agentic AI & RAG**: Multi-agent state machines with LangGraph, in-memory FAISS retrieval, and zero-downtime multi-LLM failover (Groq + Gemini).\n• **High-Concurrency Full-Stack**: Production multi-tenant Next.js platforms, Redis Pub/Sub Server-Sent Events (SSE) telemetry, and Socket.io room synchronization.\n• **Core CS Foundations**: Strong algorithmic problem solving, OOP system design, and competitive coding in Java, C++, and Python.\n\nHe has built and deployed **8 production projects** live with verified uptime.",
        suggestions: ["🛠️ Core Tech Stack", "⏱️ Architectural Timeline", "⭐ Top 3 Projects", "💼 Sharnex Work"]
      };
    }

    // ==========================================
    // F. SMART SEMANTIC TOKEN ROUTING (Fallback before generic)
    // ==========================================
    if (q.includes('llm') || q.includes('rag') || q.includes('langgraph') || q.includes('groq') || q.includes('gemini') || q.includes('agent')) {
      return {
        text: "🤖 **Ansh's Generative AI & Agentic Systems Architecture**:\n\nAnsh specializes in production-ready AI systems that avoid brittle single-LLM dependencies:\n• **Zero-Downtime Multi-LLM Failover**: Async pipeline pairing Groq LPUs (~300 tok/s) with Gemini fallbacks and in-memory circuit breakers.\n• **In-Memory DOM RAG (PageSense Pro)**: FAISS vector indexing directly in RAM with interactive in-page citation scrolling.\n• **Multi-Agent Simulation (Memeconomy)**: 50 stateful persona agents coordinated via LangGraph with a 2-stage deterministic filter saving 70%+ token costs.",
        suggestions: ["🔄 Multi-LLM Failover", "⚡ PageSense Citations", "🤖 Memeconomy 50 Agents", "🚀 All 8 Projects"]
      };
    }

    if (q.includes('realtime') || q.includes('real-time') || q.includes('websocket') || q.includes('socket') || q.includes('telemetry')) {
      return {
        text: "📡 **Ansh's Real-Time Engineering Systems**:\n\n• **CodeArena**: Sub-30ms bidirectional code sync and ELO matchmaking using Socket.io and Monaco Editor.\n• **Sharnex Fleet Telemetry**: Real-time GPS bus tracking streaming over Redis Pub/Sub and Server-Sent Events (SSE) to Leaflet maps.\n• **AuraSync**: Real-time webcam micro-expression inference streaming over WebRTC.",
        suggestions: ["📡 Real-Time Architecture", "🏆 CodeArena 1v1", "💼 Sharnex Work"]
      };
    }

    // Default Fallback
    return {
      text: "I am ready to help you explore Ansh's work! You can ask about his **core tech stack**, his **8 live deployed projects**, his **architectural timeline**, his **real-time engineering at Sharnex**, or his **multi-LLM failover design**.\n\nSelect a topic below or type your question:",
      suggestions: ["🛠️ Core Tech Stack", "⏱️ Architectural Timeline", "⭐ Top 3 Projects", "🚀 All 8 Projects"]
    };
  };

  // Main message sender with Groq LPU support + Fallback
  const handleSend = async (userText) => {
    const query = (userText || input).trim();
    if (!query || isTyping) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const aiMessageId = Date.now() + 1;
    setMessages(prev => [
      ...prev,
      {
        id: aiMessageId,
        sender: 'ai',
        text: '...',
        timestamp: 'Thinking...',
        suggestions: []
      }
    ]);

    // Check if Groq API key is available
    if (groqKey) {
      try {
        const historyForGroq = messages.slice(-4).map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }));

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...historyForGroq,
              { role: 'user', content: query }
            ],
            temperature: 0.6,
            max_tokens: 1024
          })
        });

        if (!response.ok) {
          throw new Error(`Groq API returned ${response.status}`);
        }

        const data = await response.json();
        const groqText = data.choices?.[0]?.message?.content;

        if (groqText) {
          // Stream Groq response smoothly
          let charIndex = 0;
          const streamStep = () => {
            charIndex += 14;
            if (charIndex >= groqText.length) {
              setMessages(prev =>
                prev.map(m =>
                  m.id === aiMessageId
                    ? {
                        ...m,
                        text: groqText,
                        suggestions: ["🚀 All 8 Projects", "🔄 Multi-LLM Failover", "💼 Sharnex Work", "📫 Contact Ansh"],
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    : m
                )
              );
              setIsTyping(false);
            } else {
              setMessages(prev =>
                prev.map(m =>
                  m.id === aiMessageId
                    ? { ...m, text: groqText.slice(0, charIndex) }
                    : m
                )
              );
              timerRef.current = setTimeout(streamStep, 10);
            }
          };
          timerRef.current = setTimeout(streamStep, 50);
          return;
        }
      } catch (err) {
        console.warn('Groq API call failed, falling back to enhanced local knowledge base:', err);
      }
    }

    // High-Efficiency Local Knowledge Engine Fallback
    const { text: fullResponse, suggestions } = getKnowledgeResponse(query);

    let charIndex = 0;
    const streamStep = () => {
      charIndex += 12;
      if (charIndex >= fullResponse.length) {
        setMessages(prev =>
          prev.map(m =>
            m.id === aiMessageId
              ? {
                  ...m,
                  text: fullResponse,
                  suggestions: suggestions || [],
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              : m
          )
        );
        setIsTyping(false);
      } else {
        setMessages(prev =>
          prev.map(m =>
            m.id === aiMessageId
              ? { ...m, text: fullResponse.slice(0, charIndex) }
              : m
          )
        );
        timerRef.current = setTimeout(streamStep, 10);
      }
    };

    timerRef.current = setTimeout(streamStep, 80);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsTyping(false);
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: "👋 Chat reset! Ask me anything about Ansh's projects, experience, or engineering architecture.",
        timestamp: 'Just now',
        suggestions: ["🚀 All 8 Projects", "🔄 Multi-LLM Failover", "⚡ PageSense Citations", "💼 Sharnex Work"]
      }
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-2rem)]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group cursor-pointer border border-zinc-700"
          title="Open AI Portfolio Copilot"
        >
          <div className="relative">
            <Bot size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <span className="text-xs font-bold tracking-wide">Ask Ansh's AI</span>
        </button>
      ) : (
        <div className="w-[calc(100vw-2rem)] sm:w-[410px] h-[540px] max-h-[85vh] rounded-2xl bg-white border border-zinc-200 shadow-2xl flex flex-col overflow-hidden animate-fade-in relative">
          
          {/* Header */}
          <div className="p-3.5 bg-white border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-sm">
                <Bot size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  Ansh's Portfolio Copilot
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${
                    groqKey ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {groqKey ? 'Groq LPU' : 'Online'}
                  </span>
                </h4>
                <p className="text-[10px] text-zinc-500">
                  {groqKey ? 'Powered by Groq (Llama 3.3-70B)' : 'High-Efficiency Architecture Copilot'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {/* Optional Groq API Key Setup */}
              <button
                onClick={() => {
                  setTempKey(groqKey);
                  setShowKeyModal(!showKeyModal);
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  groqKey ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'
                }`}
                title="Groq API Key (Optional)"
              >
                <Key size={14} />
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw size={14} />
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Key Settings Modal / Popover */}
          {showKeyModal && (
            <div className="p-3.5 bg-zinc-50 border-b border-zinc-200 text-xs animate-fade-in">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  <Key size={12} className="text-indigo-600" /> Groq API Key (Optional)
                </span>
                <span className="text-[10px] text-zinc-400">Stored locally</span>
              </div>
              <p className="text-[11px] text-zinc-500 mb-2">
                Connect your Groq key for live Llama 3.3-70B inference, or leave blank to use the built-in offline intelligence engine.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="gsk_..."
                  className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono"
                />
                <button
                  onClick={() => saveGroqKey(tempKey)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-lg text-xs cursor-pointer shadow-xs"
                >
                  Save
                </button>
              </div>
              {keySavedMessage && (
                <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Check size={12} /> Key updated successfully!
                </div>
              )}
            </div>
          )}

          {/* Quick Query Pills */}
          <div className="p-2 bg-zinc-50 border-b border-zinc-200 overflow-x-auto flex gap-1.5 scrollbar-none">
            {predefinedQueries.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(pq.query)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-lg bg-white text-zinc-700 hover:bg-indigo-50 hover:text-indigo-700 text-[11px] font-medium border border-zinc-200 whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {pq.label}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-white text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] p-3.5 rounded-2xl leading-relaxed text-xs ${
                    m.sender === 'user'
                      ? 'bg-zinc-900 text-white rounded-br-none shadow-sm'
                      : 'bg-zinc-50 text-zinc-800 border border-zinc-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {renderFormattedText(m.text, m.sender === 'user')}
                </div>

                {/* Interactive Suggestion Pills inside AI Response */}
                {m.sender === 'ai' && m.suggestions && m.suggestions.length > 0 && !isTyping && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pl-1 max-w-[95%]">
                    {m.suggestions.map((sugg, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sugg)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 text-[10px] font-medium transition-colors cursor-pointer"
                      >
                        <Sparkles size={10} />
                        <span>{sugg}</span>
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-zinc-400 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-zinc-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={groqKey ? "Ask with Groq Llama 3.3-70B..." : "Ask about projects, failover, Sharnex, Java..."}
              className="flex-1 px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-900 placeholder-zinc-400"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}


