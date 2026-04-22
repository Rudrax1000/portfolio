import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* --- COMPONENTS --- */

const Tape = ({ className }: { className?: string }) => (
  <div className={`absolute w-12 h-4 bg-[var(--color-tape-pink)] opacity-80 mix-blend-multiply shadow-sm ${className}`} />
);

const Bookmark = ({ label, color, top }: { label: string, color: string, top: string }) => (
  <div className="absolute -right-6 w-10 h-16 shadow-md rounded-r-sm flex items-center justify-center font-sans text-xs font-bold uppercase tracking-widest text-[#FFF8E7] z-[1] pointer-events-none" 
       style={{ backgroundColor: color, top }}>
     <span className="rotate-90 whitespace-nowrap drop-shadow-sm">{label}</span>
  </div>
);

const Highlight = ({ children, color = "var(--color-retro-yellow)" }: { children: React.ReactNode, color?: string }) => (
  <span className="relative inline-block px-1 z-10">
    <span className="absolute inset-0 -skew-x-12 opacity-40 -z-10" style={{ backgroundColor: color }} />
    {children}
  </span>
);

const CaseStudyLink = ({ title, onClick }: { title: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="mt-auto group flex items-center gap-2 font-sans text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] text-[var(--color-retro-dark)] hover:text-[var(--color-retro-slate)] transition-all pt-4 border-t border-black/5"
  >
    <span>Explore {title} Case Study</span>
    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
  </button>
);

/* -- UI OVERLAYS -- */
const IndexMenu = ({ onNavigate }: { onNavigate: (percent: number) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Use a ref array to store references to the list items
  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);
  linkRefs.current = [];

  const addToRefs = (el: HTMLLIElement | null) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  const toggleMenu = () => {
    if (isOpen) {
      // Close animation
      gsap.to(linkRefs.current, {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.in"
      });
      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
        onComplete: () => setIsOpen(false)
      });
    } else {
      // Open animation
      setIsOpen(true);
      gsap.fromTo(menuRef.current, 
        { y: "-100%" },
        { y: "0%", duration: 0.8, ease: "power4.out" }
      );
      gsap.fromTo(linkRefs.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.4 }
      );
    }
  };

  const handleNav = (percent: number) => {
    toggleMenu();
    setTimeout(() => onNavigate(percent), 800); // Wait for menu close
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-[130] flex flex-col items-end pointer-events-auto">
        {/* Tab Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#FFF8E7] text-[var(--color-retro-dark)] font-sans font-black flex items-center gap-3 px-5 py-3 shadow-[4px_4px_0_rgba(0,0,0,0.3)] border-2 border-[var(--color-retro-dark)] rounded-sm hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,0.3)] transition-all">
          <span className="uppercase tracking-widest text-sm">{isOpen ? 'Close' : 'Index'}</span>
          <div className="flex flex-col gap-1 w-5">
             <div className={`h-[3px] bg-[var(--color-retro-dark)] w-full transition-all ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
             <div className={`h-[3px] bg-[var(--color-retro-dark)] w-full transition-all ${isOpen ? 'opacity-0' : ''}`} />
             <div className={`h-[3px] bg-[var(--color-retro-dark)] w-full transition-all ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </div>

      <div className={`fixed inset-0 z-[120] bg-[var(--color-retro-slate)] text-[var(--color-retro-vanilla)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
         <div className="absolute inset-0 bg-[var(--backgroundImage-noise)] opacity-30 mix-blend-overlay pointer-events-none" />
         
         <div className="w-full h-full flex flex-col items-center justify-center">
            <h2 className={`font-sans tracking-widest uppercase text-sm mb-12 font-bold opacity-0 transition-opacity duration-700 delay-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
               Table of Contents
            </h2>
            
            <ul className="font-display font-black text-5xl md:text-7xl lg:text-8xl flex flex-col gap-6 text-center">
               <li ref={addToRefs} onClick={() => handleNav(0)} className={`cursor-pointer hover:text-[var(--color-retro-yellow)] transition-all duration-700 hover:scale-110 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} delay-[300ms]`}>01. Intro</li>
               <li ref={addToRefs} onClick={() => handleNav(0.25)} className={`cursor-pointer hover:text-[var(--color-retro-yellow)] transition-all duration-700 hover:scale-110 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} delay-[400ms]`}>02. Process</li>
               <li ref={addToRefs} onClick={() => handleNav(0.50)} className={`cursor-pointer hover:text-[var(--color-retro-yellow)] transition-all duration-700 hover:scale-110 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} delay-[500ms]`}>03. Work</li>
               <li ref={addToRefs} onClick={() => handleNav(1.0)} className={`cursor-pointer hover:text-[var(--color-retro-yellow)] transition-all duration-700 hover:scale-110 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} delay-[600ms]`}>04. Contact</li>
            </ul>
         </div>
      </div>
    </>
  );
};

/* -- SPREAD COMPONENTS -- */

const CoverDesign = () => (
    <div className="w-full h-full relative overflow-hidden">
       <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/leather-cover.png)' }} />
       <div className="absolute inset-0 bg-[var(--backgroundImage-noise)] opacity-[0.15] mix-blend-overlay pointer-events-none" />
       <div className="absolute inset-2 md:inset-3 lg:inset-4 border-2 border-dashed border-[#8b7355]/40 rounded-sm pointer-events-none" />
       <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 md:p-10 lg:p-12">
          <svg viewBox="0 0 100 100" className="w-16 h-16 lg:w-20 lg:h-20 mb-6 text-[#d4a84b] opacity-40" stroke="currentColor" fill="none" strokeWidth="0.6">
             <path d="M10,90 L50,10 L90,90 Z" />
             <path d="M30,50 L70,50" />
             <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
          </svg>
          <div className="font-display text-6xl lg:text-8xl xl:text-9xl text-[#e8ddd0] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] tracking-widest uppercase text-center">Portfolio</div>
          <div className="mt-4 font-handwriting text-2xl lg:text-3xl text-[#d4a84b]/70 tracking-wide">Rudra Madhab</div>
          <div className="mt-6 font-sans text-[#d4a84b]/50 uppercase tracking-[0.4em] text-[9px] lg:text-[10px] border border-[#d4a84b]/15 px-5 py-1.5">Design &middot; Code &middot; Archive</div>
       </div>
       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 md:w-8 h-20 md:h-28 flex flex-col items-center z-20">
          <div className="w-full h-full bg-gradient-to-b from-[#6b5540] via-[#8b7355] to-[#6b5540] rounded-l-sm shadow-[-2px_2px_6px_rgba(0,0,0,0.3)] border-l border-t border-b border-[#5c4033]/50" />
       </div>
    </div>
);

const S0L = () => (
    <div className="w-full h-full p-8 lg:p-12 pr-10 bg-[var(--color-retro-vanilla)] relative flex flex-col justify-center items-center shadow-[inset_-40px_0_50px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="absolute inset-0 bg-repeat bg-[length:1.95rem_1.95rem] opacity-30 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(39, 72, 82, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(39, 72, 82, 0.1) 1px, transparent 1px)' }} />
        <div className="relative z-10 w-full text-center">
            <h1 className="font-display text-7xl lg:text-9xl text-[var(--color-retro-dark)] font-black tracking-widest uppercase mb-2">Portfolio</h1>
            <p className="font-sans text-[var(--color-retro-auburn)] opacity-60 text-sm lg:text-base tracking-[0.4em] uppercase">Archive &middot; Vol 01</p>
        </div>
    </div>
);

const S0R = () => (
    <div className="w-full h-full p-8 lg:p-12 pl-10 bg-[var(--color-retro-vanilla)] relative flex flex-col justify-start shadow-[inset_40px_0_50px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="absolute inset-0 bg-repeat bg-[length:1.95rem_1.95rem] opacity-30 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(39, 72, 82, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(39, 72, 82, 0.1) 1px, transparent 1px)' }} />
        <div className="relative z-10 w-full pt-10">
            <h2 className="font-display text-5xl lg:text-6xl text-[var(--color-retro-dark)] font-bold mb-6">Hello,</h2>
            <div className="font-serif text-sm lg:text-base text-[var(--color-retro-auburn)] leading-loose space-y-4">
                <p>I am Rudra, a UI/UX designer and creative engineer focused on building high-impact digital experiences.</p>
                <p>This sketchbook documents my process, from raw architectural ideation to functional software ecosystems.</p>
            </div>
            <div className="mt-12 p-6 border-2 border-dashed border-[var(--color-retro-slate)]/20 rotate-1 relative">
                <Tape className="-top-3 -left-3 rotate-45 bg-[var(--color-retro-yellow)]" />
                <p className="font-handwriting text-2xl lg:text-3xl text-[var(--color-retro-slate)] font-bold">"Design is how it works."</p>
            </div>
        </div>
    </div>
);

const ProjectSpread = ({ id, title, subtitle, date, tools, bullets, onOpenCaseStudy }: any) => (
  <div className="w-full h-full p-6 lg:p-10 bg-[var(--color-retro-vanilla)] relative flex flex-col justify-start overflow-hidden">
    <div className="absolute inset-0 bg-repeat bg-[length:1.95rem_1.95rem] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(39, 72, 82, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(39, 72, 82, 0.1) 1px, transparent 1px)' }} />
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <div className="font-sans text-[var(--color-retro-dark)] uppercase font-bold text-[10px] lg:text-xs opacity-50 tracking-widest">{id}</div>
        <div className="font-sans text-[var(--color-retro-dark)] uppercase font-bold text-[10px] lg:text-xs opacity-30 tracking-widest">{date}</div>
      </div>
      <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter text-[var(--color-retro-dark)] mb-0">{title}</h2>
      <p className="font-serif text-[10px] lg:text-xs text-[var(--color-retro-slate)] mb-4 italic opacity-80">{subtitle}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tools.map((t: string) => (
          <span key={t} className="px-2 py-0.5 bg-[var(--color-retro-slate)]/5 border border-[var(--color-retro-slate)]/10 font-sans text-[8px] lg:text-[9px] uppercase tracking-widest text-[var(--color-retro-dark)]">{t}</span>
        ))}
      </div>

      <div className="flex-1 bg-white/40 p-4 lg:p-6 border border-black/5 shadow-sm relative grow mb-4 overflow-y-auto">
        <div className="font-serif text-[11px] lg:text-[13px] leading-relaxed text-[var(--color-retro-auburn)] space-y-4">
          {bullets.map((b: string, i: number) => (
             <div key={i} className="flex gap-2">
               <span className="text-[var(--color-retro-slate)] opacity-50 font-sans font-bold shrink-0">0{i+1}.</span>
               <p>{b}</p>
             </div>
          ))}
        </div>
      </div>
      
      <CaseStudyLink title={title} onClick={onOpenCaseStudy} />
    </div>
  </div>
);

const CaseStudyOverlay = ({ project, onClose }: { project: any, onClose: () => void }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md bg-[var(--color-retro-dark)]/80 animate-in fade-in duration-300">
    <div className="w-full max-w-[70rem] aspect-[16/10.5] bg-[var(--color-retro-vanilla)] shadow-2xl relative rounded-md overflow-hidden flex transform transition-all animate-in zoom-in-95 duration-500 delay-100">
      <div className="absolute top-4 right-4 z-50 cursor-pointer p-2 hover:bg-black/5 rounded-full transition-colors" onClick={onClose}>
        <svg className="w-8 h-8 text-[var(--color-retro-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </div>
      
      <div className="w-[50%] h-full p-12 lg:p-16 border-r border-[#c4b69a]/30 flex flex-col overflow-y-auto">
        <h2 className="font-display text-7xl lg:text-8xl font-black text-[var(--color-retro-dark)] uppercase leading-none mb-4">{project.title}</h2>
        <p className="font-serif text-lg lg:text-xl text-[var(--color-retro-slate)] mb-12 italic border-b-2 border-dashed border-[var(--color-retro-slate)]/20 pb-4">Full Case Study & Design Review</p>
        
        <div className="space-y-8 font-serif text-sm lg:text-base text-[var(--color-retro-auburn)] leading-loose">
          <section>
            <h3 className="font-sans font-black uppercase text-xs tracking-[0.3em] mb-4 text-[var(--color-retro-dark)]">The Problem</h3>
            <p>Users were struggling with fragmented workflows and high cognitive overhead when dealing with complex datasets. The existing system lacked visual hierarchy and intuition.</p>
          </section>
          <section>
            <h3 className="font-sans font-black uppercase text-xs tracking-[0.3em] mb-4 text-[var(--color-retro-dark)]">My Process</h3>
            <p>Started with deep user research and competitive audits. Moved into wireframing high-stress interaction points where data density was highest.</p>
          </section>
        </div>
      </div>
      
      <div className="w-[50%] h-full p-12 lg:p-16 flex flex-col bg-[#FFFBF0]/50 overflow-y-auto">
        <div className="aspect-video bg-[var(--color-retro-dark)]/5 border-2 border-dashed border-[var(--color-retro-dark)]/10 mb-8 flex items-center justify-center relative shadow-inner">
           <span className="font-display text-4xl text-[var(--color-retro-dark)] opacity-20 italic">Visual_Assets.png</span>
           <Tape className="-top-3 -right-3 rotate-12 bg-[var(--color-retro-yellow)]" />
        </div>
        
        <div className="space-y-8 font-serif text-sm lg:text-base text-[var(--color-retro-auburn)] leading-loose">
           <section>
             <h3 className="font-sans font-black uppercase text-xs tracking-[0.3em] mb-4 text-[var(--color-retro-dark)]">Solution & Results</h3>
             <p>Implemented a unified design system and AI-assisted workflows that reduced manual input by up to 70%. The new dashboard improved cross-team efficiency by 45% in internal testing.</p>
           </section>
           <a href="#" className="inline-block mt-8 bg-[var(--color-retro-dark)] text-[var(--color-retro-vanilla)] px-8 py-3 font-sans font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-retro-slate)] transition-colors">Launch Live Website</a>
        </div>
      </div>

      <div className="absolute top-0 bottom-0 left-[calc(50%-0.5px)] w-[1px] bg-[rgba(139,115,85,0.15)] z-[10]" />
    </div>
  </div>
);

const S4L = () => (
  <div className="w-full h-full p-8 lg:p-12 pr-10 border-r border-[#D9C4A9]/30 bg-[var(--color-retro-vanilla)] relative flex flex-col justify-center items-center shadow-[inset_-40px_0_50px_rgba(0,0,0,0.2)]">
     <div className="absolute inset-0 bg-repeat bg-[length:1.95rem_1.95rem] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(39, 72, 82, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(39, 72, 82, 0.1) 1px, transparent 1px)' }} />
     <Bookmark label="Connect" color="var(--color-tape-pink)" top="80%" />
     
     <div className="relative z-10 w-full flex flex-col items-center parallax max-w-[85%]">
       <div className="relative p-6 w-full rotate-[-1deg] mb-6 xl:mb-10 text-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
             <path d="M5,5 L295,5 L295,195 L5,195 Z" fill="none" stroke="var(--color-retro-dark)" strokeWidth="2" strokeDasharray="8 8" vectorEffect="non-scaling-stroke" />
          </svg>
          <h2 className="font-display font-bold text-[var(--color-retro-dark)] text-5xl lg:text-6xl xl:text-7xl uppercase tracking-widest leading-none">
            Get in <br/> Touch
          </h2>
       </div>

       <div className="w-full relative p-5 bg-white border border-black/10 rotate-1 shadow-sm">
          <Tape className="-bottom-2 -right-2 rotate-[-25deg] bg-[var(--color-tape-pink)]" />
          <h3 className="font-sans font-black tracking-widest uppercase text-xs text-[var(--color-retro-slate)] mb-3">Links & Direct</h3>
          <ul className="space-y-4 font-serif text-[10px] lg:text-xs">
             <li><a href="#" className="font-bold text-[var(--color-retro-dark)] hover:text-[var(--color-retro-yellow)] transition-colors border-b border-[var(--color-retro-dark)] flex justify-between"><span>Email</span> <span>hello@rudra.dev</span></a></li>
             <li><a href="#" className="font-bold text-[var(--color-retro-dark)] hover:text-[var(--color-retro-yellow)] transition-colors border-b border-[var(--color-retro-dark)] flex justify-between"><span>LinkedIn</span> <span>in/rudra</span></a></li>
             <li><a href="#" className="font-bold text-[var(--color-retro-dark)] hover:text-[var(--color-retro-yellow)] transition-colors border-b border-[var(--color-retro-dark)] flex justify-between"><span>Portfolio</span> <span>design.rudra.com</span></a></li>
          </ul>
       </div>
     </div>
  </div>
);

const S4R = () => (
  <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/leather-cover.png)' }} />
      <div className="absolute inset-0 bg-[var(--backgroundImage-noise)] opacity-[0.2] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-2 md:inset-3 border-2 border-dashed border-[#8b7355]/30 rounded-sm pointer-events-none" />
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center parallax p-6">
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#d4a84b] mb-4 opacity-40" stroke="currentColor" fill="none" strokeWidth="0.6">
             <path d="M20,80 L80,20" />
             <path d="M20,20 L80,80" />
             <circle cx="50" cy="50" r="45" strokeDasharray="5 5" />
        </svg>
        <p className="font-display text-4xl lg:text-5xl text-[#e8ddd0] uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] mb-2">Fin.</p>
        <p className="font-sans text-[#d4a84b]/50 uppercase tracking-[0.4em] text-[8px] lg:text-[10px]">Thank you for reading</p>
      </div>
  </div>
);

/* -- APP COMPONENT -- */
export default function App() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<any | null>(null);

  const projects = [
    {
      id: "PROJECT // 01",
      title: "Ecozy",
      subtitle: "AI Platform for Sustainable Commerce",
      date: "Mar 2026 – Apr 2026",
      tools: ["Figma", "FigJam", "Tailwind CSS", "AI design"],
      bullets: [
        "Designed an intuitive product management interface that streamlined product categorization workflows, reducing user effort by ~70% through AI-assisted UI patterns.",
        "Conceptualized and prototyped a B2B proposal generation experience, enabling users to create structured purchasing plans within seconds.",
        "Developed user flows and interaction systems for an AI conversational assistant ('Lumi'), ensuring clarity across dynamic AI-generated responses.",
        "Created scalable design components to maintain consistency across product listings, filters, and sustainability indicators."
      ],
      link: "#"
    },
    {
      id: "PROJECT // 02",
      title: "VentureLens",
      subtitle: "Startup Intelligence SaaS Platform",
      date: "Jan 2026 – Feb 2026",
      tools: ["Figma", "Notion", "Wireframing", "Design Systems"],
      bullets: [
        "Designed a structured dashboard for startup discovery, enabling navigation and filtering of large datasets with clarity and ease.",
        "Built user-centric flows for exploration, focusing on reducing cognitive load while presenting complex data insights.",
        "Developed high-fidelity prototypes for authentication, lead capture, and dashboard interactions, ensuring seamless user journeys.",
        "Established a scalable design system to maintain visual hierarchy across multiple data-driven screens."
      ],
      link: "#"
    },
    {
      id: "PROJECT // 03",
      title: "Bolo Academy",
      subtitle: "Freelance: Student Onboarding Platform",
      date: "Nov 2025 – Dec 2025",
      tools: ["Figma", "Wireframing", "Prototyping"],
      bullets: [
        "Led end-to-end UI/UX design for a student onboarding platform, prioritizing ease of use and reducing friction in registration.",
        "Designed interactive prototypes for trial booking and student assessment flows.",
        "Focused on conversion-driven design by optimizing layout, CTAs, and user engagement points.",
        "Built a cohesive visual design system for marketing and functional pages."
      ],
      link: "#"
    },
    {
      id: "PROJECT // 04",
      title: "Myannita",
      subtitle: "Freelance: Influencer Marketing Platform",
      date: "Dec 2025 – Jan 2026",
      tools: ["Visual Identity", "UI Design", "Visual Storytelling"],
      bullets: [
        "Redesigned the visual identity using a bold, high-contrast color system to reflect a modern creator-focused ecosystem.",
        "Designed dual-onboarding experiences tailored for brands and creators separately for improved clarity.",
        "Structured the homepage to highlight social proof, influencer profiles, and community metrics for trust-building.",
        "Focused on layout hierarchy and engagement-driven UI elements to improve user retention."
      ],
      link: "#"
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set('.book-container', { xPercent: -25, scale: 0.8, rotateX: 0, rotateY: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1.8, 
          start: "top top",
          end: "+=9000" // More scroll space for more pages
        }
      });

      const flipDuration = 1.4;
      const pauseDuration = 0.6;
      
      tl.add("intro", 0)
        .add("turn1", flipDuration + pauseDuration)
        .add("turn2", (flipDuration + pauseDuration) * 2)
        .add("turn3", (flipDuration + pauseDuration) * 3)
        .add("turn4", (flipDuration + pauseDuration) * 4)
        .add("turn5", (flipDuration + pauseDuration) * 5)
        .add("turn6", (flipDuration + pauseDuration) * 6);

      const applyParallax = (pageClass: string, turnLabel: string) => {
         tl.fromTo(`${pageClass} .front .parallax`, 
            { y: 0, opacity: 1 }, 
            { y: 20, opacity: 0, stagger: 0.04, duration: 0.5 }, 
            turnLabel
         )
         .fromTo(`${pageClass} .back .parallax`, 
            { y: -20, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.04, duration: 0.5 }, 
            `${turnLabel}+=${flipDuration / 2}`
         );
      }

      const secureFlip = (pageClass: string, turnLabel: string, flipZ: number) => {
         tl.to(pageClass, { rotateY: -180, duration: flipDuration, ease: "power2.inOut" }, turnLabel);
         tl.set(pageClass, { zIndex: flipZ }, `${turnLabel}+=${flipDuration/2}`);
         applyParallax(pageClass, turnLabel);
      }

      // 1. Zoom & Open Cover
      tl.to('.book-container', { xPercent: 0, scale: 1, duration: flipDuration, ease: "power2.inOut" }, "intro");
      secureFlip('.cover-turn', 'intro', 5);

      // Flips
      secureFlip('.page-turn-1', 'turn1', 10);
      secureFlip('.page-turn-2', 'turn2', 20);
      secureFlip('.page-turn-3', 'turn3', 30);
      secureFlip('.page-turn-4', 'turn4', 40);
      secureFlip('.page-turn-5', 'turn5', 50);
      secureFlip('.page-turn-6', 'turn6', 60);

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const scrollToStage = (percent: number) => {
    if(!triggerRef.current) return;
    const scrollTarget = triggerRef.current.offsetTop + (9000 * percent);
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  };

  return (
    <div className="bg-[var(--color-retro-dark)] min-h-screen font-sans text-black selection:bg-[var(--color-tape-pink)] selection:text-[var(--color-retro-vanilla)] bg-[image:var(--backgroundImage-table)] bg-cover bg-center bg-fixed w-full" ref={animationContainerRef}>
      
      <div className="noise-overlay" />
      <IndexMenu onNavigate={scrollToStage} />
      
      <nav className="fixed top-0 left-0 p-6 lg:p-8 z-[110] pointer-events-none drop-shadow-md">
        <div className="font-display font-black text-2xl lg:text-3xl text-[var(--color-retro-yellow)] tracking-widest uppercase pointer-events-auto cursor-pointer flex gap-1 items-center">
          <span className="w-2 h-2 rounded-full bg-[var(--color-retro-yellow)]" />
          Rudra
        </div>
      </nav>

      <div ref={triggerRef} className="flex items-center justify-center h-screen w-full overflow-hidden bg-transparent">
        <div className="book-container relative w-[95vw] md:w-[85vw] xl:w-full xl:max-w-[65rem] aspect-[16/10.5] max-h-[85vh] transform-gpu" style={{ perspective: '3000px', transformStyle: 'preserve-3d' }}>
           
           {/* BACK COVER */}
           <div className="absolute top-0 bottom-0 left-1/2 w-[50%] bg-[#2b1810] shadow-[0_8px_30px_rgba(0,0,0,0.3)] z-0 rounded-r-lg overflow-hidden border-l border-black/20">
               <div className="w-full h-full overflow-hidden relative">
                   <S4R />
               </div>
           </div>

           {/* FRONT COVER TURN */}
           <div className="cover-turn absolute top-0 bottom-0 left-1/2 w-[50%] z-[70] rounded-r-lg" style={{ transformOrigin: 'left', transformStyle: 'preserve-3d' }}>
               <div className="front absolute inset-0 rounded-r-lg shadow-[0_8px_25px_rgba(0,0,0,0.5)] overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                   <CoverDesign />
               </div>
               <div className="back absolute inset-0 bg-[#2b1810] rounded-l-lg border-r border-black/20 shadow-inner" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                   <div className="absolute inset-0 overflow-hidden"><S0L /></div>
               </div>
           </div>

           {/* PAGES */}
           <div className="page-turn-1 absolute top-1.5 bottom-1.5 left-1/2 w-[calc(50%-6px)] z-[60]" style={{ transformOrigin: 'left', transformStyle: 'preserve-3d' }}>
               <div className="front absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden border-r border-[#c4b69a]/30 rounded-r-md shadow-sm" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}><S0R /></div>
               <div className="back absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden rounded-l-md shadow-inner" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                   <div className="w-full h-full p-10 bg-[#FFF8E7] flex flex-col justify-center">
                       <h3 className="font-display text-6xl text-[var(--color-retro-dark)] font-bold mb-4">Methodology</h3>
                       <p className="font-serif text-sm leading-loose text-[var(--color-retro-auburn)]">Focusing on high-fidelity component libraries and rigorous UX audits. Every project follows a strict structural mapping approach.</p>
                   </div>
               </div>
           </div>

           <div className="page-turn-2 absolute top-1.5 bottom-1.5 left-1/2 w-[calc(50%-6px)] z-[50]" style={{ transformOrigin: 'left', transformStyle: 'preserve-3d' }}>
               <div className="front absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden border-r border-[#c4b69a]/30 rounded-r-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                   <div className="w-full h-full flex items-center justify-center p-12">
                      <div className="text-center">
                        <span className="font-display text-8xl text-[var(--color-retro-slate)] opacity-20 italic">Project Suite // 01</span>
                      </div>
                   </div>
               </div>
               <div className="back absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden rounded-l-md shadow-inner" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                   <ProjectSpread {...projects[0]} onOpenCaseStudy={() => setActiveCaseStudy(projects[0])} />
               </div>
           </div>

           <div className="page-turn-3 absolute top-1.5 bottom-1.5 left-1/2 w-[calc(50%-6px)] z-[40]" style={{ transformOrigin: 'left', transformStyle: 'preserve-3d' }}>
               <div className="front absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden border-r border-[#c4b69a]/30 rounded-r-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                   <div className="w-full h-full p-10 flex flex-col justify-center items-center text-center">
                       <div className="p-4 border-2 border-dashed border-[var(--color-retro-dark)]/10 rotate-2">
                           <p className="font-handwriting text-3xl text-[var(--color-retro-dark)] opacity-70">Next: Data Visualization</p>
                       </div>
                   </div>
               </div>
               <div className="back absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden rounded-l-md shadow-inner" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                   <ProjectSpread {...projects[1]} onOpenCaseStudy={() => setActiveCaseStudy(projects[1])} />
               </div>
           </div>

           <div className="page-turn-4 absolute top-1.5 bottom-1.5 left-1/2 w-[calc(50%-6px)] z-[30]" style={{ transformOrigin: 'left', transformStyle: 'preserve-3d' }}>
               <div className="front absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden border-r border-[#c4b69a]/30 rounded-r-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                    <div className="w-full h-full flex items-center justify-center"><span className="font-display text-7xl text-[var(--color-retro-dark)] opacity-10 uppercase tracking-widest rotate-90">Freelance Focus</span></div>
               </div>
               <div className="back absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden rounded-l-md shadow-inner" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                   <ProjectSpread {...projects[2]} onOpenCaseStudy={() => setActiveCaseStudy(projects[2])} />
               </div>
           </div>

           <div className="page-turn-5 absolute top-1.5 bottom-1.5 left-1/2 w-[calc(50%-6px)] z-[20]" style={{ transformOrigin: 'left', transformStyle: 'preserve-3d' }}>
               <div className="front absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden border-r border-[#c4b69a]/30 rounded-r-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                   <div className="w-full h-full p-10 flex flex-col justify-center gap-4">
                      <div className="h-1 lg:h-2 bg-[var(--color-retro-dark)] opacity-5 w-full" />
                      <div className="h-1 lg:h-2 bg-[var(--color-retro-dark)] opacity-5 w-3/4" />
                      <div className="h-1 lg:h-2 bg-[var(--color-retro-dark)] opacity-5 w-full" />
                   </div>
               </div>
               <div className="back absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden rounded-l-md shadow-inner" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                   <ProjectSpread {...projects[3]} onOpenCaseStudy={() => setActiveCaseStudy(projects[3])} />
               </div>
           </div>

           <div className="page-turn-6 absolute top-1.5 bottom-1.5 left-1/2 w-[calc(50%-6px)] z-[10]" style={{ transformOrigin: 'left', transformStyle: 'preserve-3d' }}>
               <div className="front absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden border-r border-[#c4b69a]/30 rounded-r-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                   <div className="w-full h-full flex flex-col items-center justify-center text-center p-10 font-handwriting text-3xl text-[var(--color-retro-dark)] opacity-40">Drafting the future...</div>
               </div>
               <div className="back absolute inset-0 bg-[var(--color-retro-vanilla)] overflow-hidden rounded-l-md shadow-inner" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}><S4L /></div>
           </div>

           {/* Center Binder Details */}
           <div className="absolute top-[2px] bottom-[2px] left-[calc(50%-0.75rem)] w-6 bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.15)] to-transparent pointer-events-none z-[100] mix-blend-multiply" />
           <div className="absolute top-[2px] bottom-[2px] left-1/2 w-[1px] bg-[rgba(0,0,0,0.1)] z-[100]" />

        </div>
      </div>

      {activeCaseStudy && <CaseStudyOverlay project={activeCaseStudy} onClose={() => setActiveCaseStudy(null)} />}
    </div>
  );
}
