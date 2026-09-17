import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import InteractiveTerminal from './components/InteractiveTerminal';
import FAQ from './components/FAQ';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';
import CustomCursor from './components/CustomCursor';

// Clear all dark theme settings so portfolio is strictly 100% pure white light theme
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('portfolio-theme');
    localStorage.removeItem('portfolio-theme-v2');
    localStorage.removeItem('portfolio-theme-v3');
    localStorage.removeItem('portfolio-theme-v4');
    localStorage.removeItem('portfolio-user-theme');
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  } catch (e) {}
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSkillFilter, setActiveSkillFilter] = useState('');

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans selection:bg-sky-100 selection:text-sky-900 transition-colors duration-300 relative">
      {/* Custom Circular Cursor (matching Mobineers) */}
      <CustomCursor />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Stage 1: Hero stays pinned until Experience overcomes it */}
        <div className="relative">
          <Hero />
          <Experience />
        </div>

        {/* Stage 2: Projects, Skills, and all subsequent sections are strictly static */}
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
          activeSkillFilter={activeSkillFilter}
          onClearSkillFilter={() => setActiveSkillFilter('')}
        />
        <Skills 
          onSkillClick={(skillName) => setActiveSkillFilter(skillName)}
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <InteractiveTerminal />
        <FAQ />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Assistant Copilot on bottom-left */}
      <AiAssistant />

      {/* Interactive Deep-Dive Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
