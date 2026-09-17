export const personalInfo = {
  name: "Ansh Chauhan",
  role: "Full-Stack & Generative AI Engineer",
  tagline: "Architecting resilient multi-agent RAG pipelines, low-latency AI backends, and high-concurrency web platforms.",
  email: "iamansh86@gmail.com",
  phone: "+91 9899609856",
  location: "Delhi, India",
  github: "https://github.com/Ansh0864",
  linkedin: "https://www.linkedin.com/in/ansh-chauhan-7848b7314",
  resumeUrl: "#resume",
  status: "Available for Software Engineering & AI Roles",
  about: `I'm a B.Tech Computer Science student (2023–2027) with a strong foundation in Computer Science fundamentals and extensive practical experience building full-stack web applications and autonomous AI agents.

From developing multi-tenant Next.js systems and real-time GPS streaming at Sharnex to architecting stateful LangGraph multi-agent simulators and in-page Agentic RAG extensions (PageSense Pro / WebPageCB), I love solving complex distributed problems and delivering high-performance, production-ready software.`,
  stats: [
    { label: "Production Projects", value: "8+" },
    { label: "Work Experiences", value: "2" },
    { label: "AI Latency Benchmark", value: "<80ms" },
    { label: "System Reliability", value: "99.9%" },
  ]
};

export const education = [
  {
    institution: "Guru Gobind Singh Indraprastha University",
    degree: "Bachelor of Technology in Computer Science",
    period: "2023 – 2027",
    location: "Delhi, India",
    details: "Coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Operating Systems. Active developer and open-source contributor."
  },
  {
    institution: "Vidya Jain Public School",
    degree: "Senior Secondary (12th Science - PCM)",
    period: "2022 – 2023",
    location: "Delhi, India",
    details: "Graduated with Physics, Chemistry, and Mathematics specialization with honors in computer science."
  }
];

export const experience = [
  {
    company: "Sharnex",
    role: "Full-Stack Developer",
    period: "07/2026 – Present",
    type: "Full-Time / Production",
    location: "Remote / Hybrid",
    description: "Architected enterprise full-stack modules for Sharnex's multi-tenant school ecosystem across Institution, Teacher, and Student portals—spanning payments, learning management, real-time vehicle telemetry, and academic grading.",
    bullets: [
      "Fees & Online Payments Engine: Integrated Razorpay payment gateway with automated IFSC bank validation, instant GST-compliant digital invoice generation, and double-entry ledger bookkeeping.",
      "Learning Management System (LMS): Built the core curriculum engine for teachers to map syllabus topics, record daily lecture logs, and track student lesson progress across all grade levels.",
      "Live GPS Bus Tracking & Fleet Management: Engineered real-time vehicle location streaming via Redis and interactive maps, enabling parents and administrators to track school buses live with sub-second accuracy.",
      "Marks Management & Academic Audit Trail: Developed a secure grading portal with automated score revision history, student quiz evaluations, and printable report cards."
    ],
    tech: ["Next.js 14", "React.js", "Node.js", "Redis & SSE", "PostgreSQL / SQL", "Razorpay API", "Leaflet & MapLibre", "Tailwind CSS"]
  },
  {
    company: "Mobineers Info Systems Pvt Ltd",
    role: "Software Development Intern",
    period: "05/2025 – 07/2025",
    type: "Internship",
    location: "New Delhi, India",
    description: "Engineered conversational AI chatbots and task automation software within the core software engineering division.",
    bullets: [
      "Conversational AI & NLP Assistant: Engineered an interactive enterprise chatbot leveraging Natural Language Processing (NLP) intent recognition to handle common workplace inquiries and automated query resolution.",
      "Multi-Threaded Desktop GUI: Built a responsive Python Tkinter desktop interface with asynchronous background threads, ensuring 100% smooth UI performance with zero freezing during heavy data lookups.",
      "In-Memory Response Caching: Designed a fast query caching layer that eliminated redundant database lookups, slashing conversational latency and accelerating data retrieval for repeated queries.",
      "SQLite Database & API Automation: Structured internal SQLite relational schemas with indexing and integrated enterprise REST APIs to automate administrative verification workflows and daily engineering logs."
    ],
    tech: ["Python", "NLP Intent Classification", "Tkinter GUI", "SQLite Database", "In-Memory Caching", "REST APIs", "Desktop Automation", "Multi-Threading"]
  }
];

export const projects = [
  {
    id: "pagesense-pro",
    title: "PageSense Pro (WebPageCB)",
    subtitle: "Agentic RAG Chrome Extension & In-Page DOM Citation Grounding",
    category: "Generative AI & RAG",
    categories: ["Generative AI & RAG"],
    featured: true,
    badge: "WebPageCB Project",
    image: "/images/pagesense.jpg",
    tech: ["FastAPI (Python)", "Python", "LangChain", "FAISS & ChromaDB", "Chrome Extensions MV3", "Groq (Llama 3.3-70B)", "Google Gemini API", "DuckDuckGo API", "JavaScript (ES6+)", "RAG Architectures", "Postman", "System Design & OOP"],
    metrics: ["In-Memory FAISS Index", "Interactive [Source X] Chips", "Sub-1s Fallback"],
    overview: "An AI-powered Chrome Extension (Manifest V3) paired with an Agentic RAG FastAPI backend. Extracts clean DOM text, builds an in-memory vector index with FAISS, and allows users to converse with any live webpage with interactive source citation chips and real-time DuckDuckGo web search fallback.",
    bullets: [
      "Architected an Agentic RAG Chrome Extension (MV3) with dual-mode UI (Persistent Side Panel & Quick Action Popup) communicating via message passing.",
      "Integrated FAISS in-memory vector index with 600-character semantic chunking for low-latency similarity retrieval over active webpage DOMs.",
      "Engineered an autonomous fallback agent that queries live web search via DuckDuckGo whenever page context is insufficient or outdated.",
      "Implemented interactive in-page citations: clicking source chips automatically scrolls the host viewport and flash-highlights the cited text passage."
    ],
    architecture: "Active Webpage DOM -> Content Script Extraction -> FastAPI Backend -> FAISS Vector Store -> LangChain Agent -> LLM with Citations -> In-Page Highlighting",
    demoLink: "https://web-page-extension.vercel.app/",
    color: "from-sky-500 to-emerald-500"
  },
  {
    id: "ai-interview-coach",
    title: "AIInterview Coach",
    subtitle: "AI-Powered Mock Interview Simulator with Dynamic Voice & Code Validation",
    category: "Generative AI & RAG",
    categories: ["Generative AI & RAG"],
    featured: true,
    badge: "LangGraph State Machine",
    image: "/images/ai-interview.jpg",
    tech: ["FastAPI (Python)", "LangGraph", "LangChain", "Groq (Llama 3.3-70B)", "Google Gemini API", "FAISS & ChromaDB", "React.js", "Whisper & ElevenLabs", "CodeMirror", "Java", "C & C++", "Python", "Data Structures & Algorithms", "System Design & OOP"],
    metrics: ["Multi-Round Graph", "0% Downtime Failover", "Sub-500ms Audio Pipeline"],
    overview: "Stateful multi-round technical and behavioral interview platform featuring RAG-grounded resume/JD question generation, multi-provider LLM failover, voice synthesis, and real-time code editor validation.",
    bullets: [
      "Architected a stateful multi-round interview engine using LangGraph, orchestrating Behavioral, HR, and Technical/Coding rounds with RAG-grounded question generation (ChromaDB + Google embeddings) sourced from parsed resume and JD context.",
      "Engineered a resilient multi-provider LLM pipeline with automatic Groq-to-Gemini failover and per-key rate-limit cooldown tracking, keeping the interview flow uninterrupted under free-tier API rate limits.",
      "Built an end-to-end voice pipeline combining local Whisper transcription with ElevenLabs TTS (plus a browser-native fallback), and a live CodeMirror-based code editor with strict per-language answer validation for the technical round."
    ],
    architecture: "Resume & JD Upload -> ChromaDB Vector Embeddings -> LangGraph State Engine -> Groq-Gemini Failover LLM -> Whisper Audio Ingestion + ElevenLabs Voice Synth",
    demoLink: "https://ai-interview-steel-psi.vercel.app/",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "aurasync",
    title: "AuraSync",
    subtitle: "AI-Powered Real-Time Emotion Recognition System & Soundscape Sync",
    category: "Computer Vision & ML",
    categories: ["Computer Vision & ML"],
    featured: true,
    badge: "Sub-80ms Inference",
    image: "/images/aurasync.jpg",
    tech: ["Python", "TensorFlow & Keras", "FastAPI (Python)", "React.js", "WebRTC", "Spotify API", "FER-2013", "JavaScript (ES6+)"],
    metrics: ["Sub-80ms CPU Latency", "7 Micro-Expressions", "WebRTC Live Stream"],
    overview: "Real-time emotion classification system streaming webcam frames via WebRTC, inferring micro-expressions using a custom CNN, and synchronizing user moods to dynamic Spotify acoustic environments.",
    bullets: [
      "Architected a custom Convolutional Neural Network (CNN) using TensorFlow/Keras, trained on the FER-2013 dataset to classify 7 human micro-expressions (Joy, Sadness, Anger, etc.) with high accuracy.",
      "Optimized model architecture for low-latency inference by streamlining dense layers and reducing filter sizes, enabling sub-80ms real-time processing speeds on CPU via a FastAPI backend.",
      "Engineered an end-to-end AI pipeline that processes secure, on-device WebRTC webcam captures, performs grayscale normalization, and maps the inferred emotional state to dynamic acoustic environments using the Spotify API."
    ],
    architecture: "WebRTC Video Capture -> OpenCV Grayscale Normalization -> Custom TensorFlow CNN -> FastAPI Inference Worker -> Spotify API Acoustic Playback",
    demoLink: "https://aura-sync-1.onrender.com/",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "memeconomy",
    title: "Memeconomy",
    subtitle: "Synthetic Social Propagation Simulator Powered by 50 Multi-Agents",
    category: "Generative AI & RAG",
    categories: ["Generative AI & RAG"],
    featured: true,
    badge: "50 Synthetic Agents",
    image: "/images/memeconomy.jpg",
    tech: ["Python", "FastAPI (Python)", "LangGraph", "MongoDB", "SQL", "PostgreSQL", "NetworkX", "LLM Personas", "Multi-Agent Simulation", "Data Structures & Algorithms", "System Design & OOP"],
    metrics: ["50 Stateful Agents", "3 Gated LLM Calls", "Full Lineage Tracing"],
    overview: "Dual-layer multi-agent simulation platform modeling content spread, viral mutation, and decay across a directed social graph with 50 persona-driven synthetic agents.",
    bullets: [
      "Architected a dual-layer multi-agent simulation system using LangGraph to orchestrate a population of 50 stateful synthetic agents, modeling how content spreads, mutates, and dies across a directed social graph with persona-driven decision policies.",
      "Designed a two-stage deterministic pre-filter (weighted relevance, quality, and attention scoring) to gate agent reactions, restricting LLM calls to three well-justified touchpoints and cutting unnecessary API usage before it reaches the agent layer.",
      "Built a FastAPI backend with MongoDB persistence (in-memory fallback) exposing REST endpoints for simulation orchestration, network graph inspection, content lineage tracking, and side-by-side comparison of propagation experiments."
    ],
    architecture: "Directed Network Graph -> Weighted Deterministic Pre-Filter -> LangGraph Agent Population -> Mutation Engine -> MongoDB Experiment Tracking",
    demoLink: "https://memeconomy-three.vercel.app/",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: "codearena",
    title: "CodeArena",
    subtitle: "Real-Time 1v1 Competitive Programming Platform with ELO Matching",
    category: "Full-Stack & Real-Time",
    categories: ["Full-Stack & Real-Time"],
    featured: false,
    badge: "Socket.io Concurrency",
    image: "/images/codearena.jpg",
    tech: ["React.js", "Node.js & Express", "Node.js", "Tailwind CSS", "MongoDB", "SQL", "Socket.io", "Monaco Editor", "Java", "C & C++", "JavaScript (ES6+)", "Data Structures & Algorithms", "System Design & OOP", "PHP"],
    metrics: ["4 Duel Modes", "Real-Time ELO", "<30ms State Sync"],
    overview: "Competitive coding platform featuring live 1v1 duels, automated matchmaking, real-time code progress syncing, and an ELO rating ladder across multiple challenge formats.",
    bullets: [
      "Engineered a high-concurrency matchmaking system using Socket.io and an ELO rating algorithm to pair users based on skill levels for live 1v1 coding duels.",
      "Architected four distinct competitive modes — Rapid Duel, Bug Hunter, Code Duel, and Complexity Duel — each with specialized scoring logic and real-time progress syncing.",
      "Implemented room-based architecture for managing two different users joining, leaving, reconnecting, and competing across live sessions with sandboxed test evaluations for Java, C++, and Python."
    ],
    architecture: "React + Monaco Client -> Socket.io Event Bus -> Node.js ELO Queue -> Sandboxed Execution Evaluator -> MongoDB Leaderboard",
    demoLink: "https://codearena-murex.vercel.app/",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "herbtrace",
    title: "HerbTrace",
    subtitle: "AI & Blockchain-Powered Ayurvedic Herb Traceability Platform",
    category: "Blockchain",
    categories: ["Blockchain", "Full-Stack & Real-Time"],
    featured: false,
    badge: "Solidity + CNN",
    image: "/images/herbtrace.jpg",
    tech: ["FastAPI (Python)", "Python", "TensorFlow & Keras", "Solidity", "Web3.py & Solidity", "React.js", "Tailwind CSS", "JavaScript (ES6+)", "System Design & OOP"],
    metrics: ["Immutable Ledgers", "Deep Learning Classification", "Farm-to-Consumer"],
    overview: "End-to-end supply chain provenance platform combining computer vision herb classification with tamper-proof Ethereum smart contracts from farmer to consumer.",
    bullets: [
      "Developed a full stack system to ensure the authenticity and transparency of Ayurvedic herbs from farmer to consumer using AI and Blockchain.",
      "Integrated a machine learning model (CNN) using TensorFlow and Keras to automatically classify herb species from uploaded images with high accuracy.",
      "Deployed Ethereum-based Solidity smart contracts via Web3.py to maintain permanent, tamper-proof sourcing and processing records on the blockchain."
    ],
    architecture: "Herb Image Ingestion -> TensorFlow CNN Classification -> Web3.py RPC Bridge -> Ethereum Solidity Contract -> Decentralized Verification Portal",
    demoLink: "https://herbtrace-1-0vsq.onrender.com/",
    color: "from-emerald-600 to-green-700"
  },
  {
    id: "marketagent",
    title: "MarketAgent (QUANT_ARENA)",
    subtitle: "Autonomous Financial Intelligence RAG System & Real-Time Research",
    category: "Generative AI & RAG",
    categories: ["Generative AI & RAG", "Full-Stack & Real-Time"],
    featured: false,
    badge: "Agentic Tool Calling",
    image: "/images/marketagent.jpg",
    tech: ["React.js", "Node.js & Express", "Node.js", "Express", "LangChain.js", "Groq (Llama 3.3-70B)", "Google Gemini API", "Polygon.io", "Tavily AI", "JavaScript (ES6+)", "RAG Architectures", "Postman", "System Design & OOP"],
    metrics: ["Live Stock Feeds", "Zero-Hallucination Reports", "Graceful Fallbacks"],
    overview: "Autonomous financial intelligence platform utilizing Agentic RAG and LangChain.js to integrate Google Gemini with live market data feeds and web research tools without hallucination.",
    bullets: [
      "Architected an autonomous financial intelligence platform utilizing an Agentic Retrieval-Augmented Generation (RAG) architecture to synthesize structured research reports.",
      "Engineered dynamic tool-calling pipelines using LangChain.js to integrate Google Gemini with external data sources (Polygon.io, Tavily AI), grounding the model in real-time facts to eliminate hallucinations.",
      "Built robust backend fallback mechanisms in Node.js/Express to handle third-party API rate limits, ensuring continuous system availability during autonomous data retrieval."
    ],
    architecture: "Financial Query Input -> LangChain Agentic Loop -> Polygon.io Tool + Tavily Web Search -> Gemini / Llama Synthesis -> Structured Report Output",
    demoLink: "https://market-agent-1-jp5a.onrender.com/",
    color: "from-cyan-600 to-blue-700"
  },
  {
    id: "ai-real-estate",
    title: "AI Real Estate Valuation Engine",
    subtitle: "Deep Learning Housing Valuation Pipeline & Interactive SaaS Dashboard",
    category: "Computer Vision & ML",
    categories: ["Computer Vision & ML"],
    featured: false,
    badge: "Deep Learning SaaS",
    image: "/images/realestate.jpg",
    tech: ["Python", "TensorFlow & Keras", "Scikit-Learn & Pandas", "Pandas", "Streamlit"],
    metrics: ["Instant Neural Valuation", "5-Year ROI Forecaster", "Interactive State Engine"],
    overview: "End-to-end deep learning property valuation engine predicting housing prices and driving an interactive mortgage calculator and 5-year investment forecast SaaS.",
    bullets: [
      "Architected an end-to-end Deep Learning pipeline using TensorFlow/Keras to predict housing prices, processing structured data with Pandas and Scikit-Learn.",
      "Implemented complex state management (st.session_state) to pass AI-generated predictions into an interactive mortgage calculator and 5-year investment forecaster.",
      "Bridged the gap between data science and product by translating raw TensorFlow .keras model outputs into a clean, responsive, user-friendly SaaS dashboard."
    ],
    architecture: "Structured Real-Estate Data -> Scikit-Learn Feature Transformation -> TensorFlow Deep Regressor -> Streamlit State Engine -> Financial Calculator",
    demoLink: "https://houseprice-uvfqtmyueyznh8ktadx9ng.streamlit.app/",
    color: "from-indigo-500 to-sky-600"
  }
];

export const skillCategories = [
  {
    title: "AI & Generative Systems",
    description: "Architecting autonomous agents, RAG pipelines, and deep learning models.",
    icon: "Cpu",
    skills: [
      { name: "LangGraph", level: "Advanced" },
      { name: "LangChain", level: "Advanced" },
      { name: "RAG Architectures", level: "Advanced" },
      { name: "FAISS & ChromaDB", level: "Advanced" },
      { name: "Multi-Agent Simulation", level: "Proficient" },
      { name: "Groq (Llama 3.3-70B)", level: "Advanced" },
      { name: "Google Gemini API", level: "Advanced" },
      { name: "TensorFlow & Keras", level: "Proficient" },
      { name: "Scikit-Learn & Pandas", level: "Proficient" },
      { name: "Whisper & ElevenLabs", level: "Proficient" }
    ]
  },
  {
    title: "Full-Stack & Web Engineering",
    description: "Building responsive web platforms with real-time streaming and modern frameworks.",
    icon: "Layout",
    skills: [
      { name: "React.js", level: "Advanced" },
      { name: "Next.js (App Router)", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Node.js & Express", level: "Advanced" },
      { name: "FastAPI (Python)", level: "Advanced" },
      { name: "Socket.io", level: "Proficient" },
      { name: "Redis & SSE Streaming", level: "Proficient" },
      { name: "WebRTC", level: "Proficient" },
      { name: "Chrome Extensions MV3", level: "Advanced" }
    ]
  },
  {
    title: "Languages & Computer Science Core",
    description: "Algorithmic thinking, object-oriented principles, and low-level understanding.",
    icon: "Code2",
    skills: [
      { name: "Java", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "JavaScript (ES6+)", level: "Advanced" },
      { name: "C & C++", level: "Proficient" },
      { name: "SQL", level: "Proficient" },
      { name: "PHP", level: "Intermediate" },
      { name: "Data Structures & Algorithms", level: "Advanced" },
      { name: "System Design & OOP", level: "Advanced" }
    ]
  },
  {
    title: "Databases, Cloud & Dev Tools",
    description: "Reliable storage layers, version control, API testing, and tooling.",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", level: "Proficient" },
      { name: "MongoDB", level: "Advanced" },
      { name: "Supabase", level: "Proficient" },
      { name: "Redis", level: "Proficient" },
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Postman", level: "Advanced" },
      { name: "VS Code & Linux", level: "Advanced" },
      { name: "Web3.py & Solidity", level: "Intermediate" }
    ]
  }
];

export const faqs = [
  {
    question: "How do you engineer resilient multi-provider LLM pipelines?",
    answer: "In production AI systems like AIInterview Coach and MarketAgent, depending on a single API provider creates single-point-of-failure risks due to rate limits (especially on free/tier-1 quotas) or transient outages. I build automated multi-provider failover pipelines—such as primary Groq (Llama 3.3 70B) failover to Google Gemini—with in-memory per-key cooldown timers, exponential backoff, and state preservation so interviews and user sessions proceed without interruption."
  },
  {
    question: "How does PageSense Pro (WebPageCB) extract and ground questions on live web pages?",
    answer: "PageSense Pro injects a lightweight content script into active Chrome tabs to extract clean semantic DOM text, chunks it into 600-character segments, and generates an in-memory FAISS vector index in RAM. When a user asks a question via the Side Panel or Popup, the FastAPI backend retrieves top-k matching chunks and prompts the LLM with strict [Source X] attribution. Users can click citation chips to dynamically scroll to and flash-highlight the exact source paragraph on the active page. If the webpage lacks sufficient context, an autonomous agent fallback queries DuckDuckGo live search seamlessly."
  },
  {
    question: "What is your architecture strategy for real-time applications?",
    answer: "At Sharnex, I built an end-to-end bus tracking system handling continuous GPS pings via Redis pub/sub and Server-Sent Events (SSE) streaming directly to Leaflet/MapLibre maps for teachers and parents. For CodeArena, I used Socket.io room-based state sync to handle 1v1 coding duels, ELO matchmaking, and live code progress with sub-30ms latency, coupled with reconnect recovery and state persistence."
  },
  {
    question: "What is your primary programming language and engineering stack?",
    answer: "Python is my primary language for AI engineering, agentic workflows (LangGraph/LangChain), and low-latency backends (FastAPI), while JavaScript/TypeScript powers my full-stack web applications with React.js, Next.js, Node.js, and Tailwind CSS. I also actively use Java for Data Structures, Object-Oriented Design, and core software engineering."
  }
];

export const terminalCommands = {
  help: "Available commands:\n- about       : Learn about Ansh Chauhan\n- projects    : List all 8 featured projects\n- skills      : Show key technical capabilities\n- experience  : Show work history at Sharnex & Mobineers\n- contact     : Get email, phone, and social handles\n- hire        : Direct link to hire / collaborate\n- clear       : Clear the terminal console",
  about: "Ansh Chauhan - Full-Stack & Generative AI Engineer.\nB.Tech Computer Science student (2023-2027) with deep expertise in LangGraph multi-agent systems, RAG architectures, real-time WebSockets/SSE, and high-performance full-stack web engineering.",
  projects: "Featured Projects (8 total with live deployments):\n1. PageSense Pro (WebPageCB) -> https://web-page-extension.vercel.app/\n2. AIInterview Coach -> https://ai-interview-steel-psi.vercel.app/\n3. AuraSync -> https://aura-sync-1.onrender.com/\n4. Memeconomy -> https://memeconomy-three.vercel.app/\n5. CodeArena -> https://codearena-murex.vercel.app/\n6. HerbTrace -> https://herbtrace-1-0vsq.onrender.com/\n7. MarketAgent -> https://market-agent-1-jp5a.onrender.com/\n8. AI Real Estate Valuation -> https://houseprice-uvfqtmyueyznh8ktadx9ng.streamlit.app/",
  skills: "Core Stack:\n- AI/GenAI   : LangGraph, LangChain, FAISS, ChromaDB, Groq, Gemini, TensorFlow\n- Frontend   : React.js, Next.js, Tailwind CSS, WebRTC, Leaflet\n- Backend    : FastAPI, Node.js, Express.js, Socket.io, Redis SSE\n- Databases  : PostgreSQL, MongoDB, Supabase, Vector DBs\n- Languages  : Java, Python, JavaScript, TypeScript, C, C++, SQL",
  experience: "Work Experience:\n1. Sharnex (07/2026 - Present) - Full-Stack Developer [Razorpay Payments & GST Engine, ~7,500 LOC LMS Blueprint, Redis GPS Bus Tracking, RMS Marks Audit]\n2. Mobineers Info Systems (05/2025 - 07/2025) - Software Development Intern [Conversational NLP Chatbot, Tkinter GUI, In-Memory Caching]",
  contact: "Get in touch:\n- Email   : iamansh86@gmail.com\n- Phone   : +91 9899609856\n- Location: Delhi, India\n- GitHub  : https://github.com/Ansh0864\n- LinkedIn: https://www.linkedin.com/in/ansh-chauhan-7848b7314",
  hire: "Looking for an energetic, high-impact engineer who can architect AI agents and build production full-stack systems?\nSend an email to iamansh86@gmail.com or connect on LinkedIn!"
};
