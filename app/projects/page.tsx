"use client";

import { useState } from "react";
import Link from "next/link";

const allProjects = [
  {
    id: "01",
    title: "CONFCERT",
    category: "BLOCKCHAIN / CREDENTIALING",
    desc: "A production-ready certificate issuance and verification platform on Ethereum, issuing tamper-proof credentials via smart contracts with public, login-free verification.",
    tech: ["NEXT.JS", "SOLIDITY", "ETHERS.JS", "IPFS"],
    image: "https://res.cloudinary.com/dbxgv4bwx/image/upload/v1785740718/Untitled_design_ox9pgm.png",
    liveUrl: "https://public.confcert.in",
    githubUrl: "https://github.com/Shubhamk0174/confcert-blockchain",
    accent: "text-amber",
  },
  {
    id: "02",
    title: "RAKSHA",
    category: "WOMEN SAFETY / MOBILE",
    desc: "A women safety mobile app with one-tap SOS alerts, live GPS location sharing, and trusted-contact emergency notifications.",
    tech: ["REACT NATIVE", "NODE.JS", "SUPABASE"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    liveUrl: "",
    githubUrl: "https://github.com/Shubhamk0174/RAKSHA",
    accent: "text-rose-500",
  },
  {
    id: "03",
    title: "PORTABLE ECG UNIT",
    category: "IOT / HEALTH TECH",
    desc: "An IoT-enabled portable ECG monitoring system for real-time heart abnormality detection, published as a research paper.",
    tech: ["ARDUINO", "ESP-32", "MATLAB"],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop",
    liveUrl: "",
    githubUrl: "https://github.com/Shubhamk0174/Heart-Abnormality-Detector",
    accent: "text-teal-400",
  },
];

export default function ProjectsPage() {
  const [activeId, setActiveId] = useState(allProjects[0].id);

  const activeIndex = allProjects.findIndex(p => p.id === activeId);
  
  // Pagination logic (4 projects per view)
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allProjects.length / itemsPerPage);
  
  const currentPage = Math.floor(activeIndex / itemsPerPage);
  
  const currentProjects = allProjects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % allProjects.length;
    setActiveId(allProjects[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + allProjects.length) % allProjects.length;
    setActiveId(allProjects[prevIndex].id);
  };

  return (
    <div className="h-screen w-full bg-ink overflow-hidden relative flex flex-col font-sans">
      <div className="grid-bg opacity-30 z-0"></div>
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center pt-[clamp(16px,4vh,32px)] px-[clamp(16px,4vw,64px)] font-mono text-xs tracking-widest text-fog pointer-events-none">
        <Link href="/" className="hover:text-paper transition-colors pointer-events-auto flex items-center gap-2 group">
          <span className="text-amber group-hover:-translate-x-1 transition-transform">&lt;</span> BACK
        </Link>
      </header>

      {/* Main Accordion Container */}
      <div className="flex flex-col md:flex-row h-full w-full pt-[clamp(72px,12vh,100px)] pb-[clamp(80px,12vh,120px)] px-[clamp(16px,4vw,64px)] gap-[clamp(8px,1vw,16px)] z-10">
        {currentProjects.map((project) => {
          const isActive = activeId === project.id;
          
          return (
            <div
              key={project.id}
              onClick={() => setActiveId(project.id)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.3,1)] flex flex-col
                ${isActive ? "flex-[6] md:flex-[10]" : "flex-[1] hover:flex-[1.5] md:hover:flex-[1.5]"}
              `}
            >
               {/* Background Image */}
               <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-[1200ms] ease-out ${
                      isActive ? "scale-100" : "scale-[1.15] group-hover:scale-110"
                    } ${isActive ? "opacity-40" : "opacity-30 group-hover:opacity-50"}`}
                  />
                  {/* Overlay for inactive */}
                  <div className={`absolute inset-0 bg-ink transition-opacity duration-700 ${isActive ? 'opacity-10' : 'opacity-70 group-hover:opacity-40'}`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-70'}`}></div>
               </div>

               {/* Content Container */}
               <div className="absolute inset-0 flex flex-col justify-end p-[clamp(16px,3vw,32px)]">
                  {/* Top identifier */}
                  <div className="flex items-center gap-4 mb-2 md:mb-4">
                     <span className={`font-mono text-[10px] md:text-xs tracking-widest transition-colors duration-500 ${isActive ? project.accent : 'text-fog group-hover:text-paper'}`}>
                       {project.id}
                     </span>
                     {isActive && (
                       <span className="h-[1px] w-8 md:w-12 bg-line hidden md:block animate-pulse-green"></span>
                     )}
                     <span className={`font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0 text-paper/80' : 'opacity-0 translate-y-4'}`}>
                       {project.category}
                     </span>
                  </div>

                  {/* Title */}
                  <div className="relative h-[40px] md:h-[auto]">
                    <h2 className={`font-bold uppercase transition-all duration-700 md:delay-100 whitespace-nowrap 
                      ${isActive 
                        ? 'text-[clamp(1.5rem,3vw,3.5rem)] leading-none text-paper relative z-10 translate-y-0' 
                        : 'text-sm md:text-xl text-fog group-hover:text-paper md:-rotate-90 md:origin-bottom-left md:absolute md:bottom-0 md:left-0 translate-y-2 md:translate-y-0'
                      }`}>
                      {project.title}
                    </h2>
                  </div>

                  {/* Expanded Only Content */}
                  <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isActive ? 'max-h-[400px] opacity-100 mt-2 md:mt-4 delay-200' : 'max-h-0 opacity-0 mt-0'}`}>
                    <p className="text-fog max-w-xl font-mono text-[10px] md:text-sm leading-relaxed mb-4 md:mb-6">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[8px] md:text-[10px] font-mono tracking-widest text-paper border border-line px-2 py-1 md:px-3 rounded-full bg-panel/30 backdrop-blur-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-ink bg-amber px-6 py-3 rounded-full hover:bg-paper transition-colors duration-300"
                    >
                      VIEW DETAILS <span className="font-bold">&rarr;</span>
                    </Link>
                  </div>
               </div>
            </div>
          );
        })}
      </div>

      {/* Floating Pagination Bar */}
      {allProjects.length > 1 && (
        <div className="absolute bottom-[clamp(16px,4vh,32px)] left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-line bg-panel/60 backdrop-blur-md shadow-2xl">
          <button 
            onClick={handlePrev}
            className="text-xs font-mono tracking-widest text-fog hover:text-amber transition-colors flex items-center gap-2 group"
            aria-label="Previous Projects"
          >
            <span className="text-amber group-hover:-translate-x-1 transition-transform">&larr;</span> PREV
          </button>
          
          <div className="flex items-center gap-2 px-4 border-x border-line">
            {allProjects.map((project, idx) => (
              <button 
                key={project.id}
                onClick={() => {
                  setActiveId(project.id);
                }}
                className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === idx ? 'w-8 bg-amber' : 'w-2 bg-line hover:bg-fog'}`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="text-xs font-mono tracking-widest text-fog hover:text-amber transition-colors flex items-center gap-2 group"
            aria-label="Next Projects"
          >
            NEXT <span className="text-amber group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>
      )}
    </div>
  );
}
