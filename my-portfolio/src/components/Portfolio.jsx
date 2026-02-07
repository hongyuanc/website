import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Download, FileText, ChevronUp, ChevronDown } from 'lucide-react';

// Navigation Button Component for Mobile - Brutalist design
const NavigationButton = ({ direction, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      className="flex items-center justify-center text-black hover:bg-black hover:text-white border-4 border-black cursor-pointer"
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        padding: '12px',
        transition: 'none'
      }}
      aria-label={`Navigate ${direction}`}
    >
      {direction === 'up' ? <ChevronUp size={32} strokeWidth={3} /> : <ChevronDown size={32} strokeWidth={3} />}
    </button>
  );
};


// New component for PDF Resume with responsive design
const ResumeViewer = () => {
  const resumePdfUrl = "/resume.pdf";
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* PDF actions bar */}
      <div className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 ${isMobile ? 'mt-16' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-black uppercase">Resume</h2>
        <div className="flex gap-3 md:gap-4 flex-wrap">
          <a
            href={resumePdfUrl}
            target="_blank"
            className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white hover:bg-black hover:text-white font-bold uppercase text-sm md:text-base"
            style={{ transition: 'none' }}
            rel="noopener noreferrer"
          >
            <FileText size={18} strokeWidth={3} />
            <span>View</span>
          </a>
          <a
            href={resumePdfUrl}
            download="Hong_Yuan_Cao_Resume.pdf"
            className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase shadow-brutalist text-sm md:text-base"
            style={{ transition: 'none' }}
          >
            <Download size={18} strokeWidth={3} />
            <span>Download</span>
          </a>
        </div>
      </div>
      
      {/* PDF Viewer - only show on desktop */}
      {!isMobile ? (
        <div className="flex-grow overflow-visible">
          <object
            data={resumePdfUrl}
            type="application/pdf"
            className="w-full"
            style={{ 
              height: "calc(100vh - 180px)",
              display: "block"
            }}
          >
            <p>It appears your browser doesn't support embedded PDFs. You can <a href={resumePdfUrl}>download the PDF</a> instead.</p>
          </object>
        </div>
      ) : (
        <div className="mt-8 border-4 border-black p-8 bg-white">
          <p className="font-bold text-black text-center">Use the View or Download buttons above to access the resume.</p>
          <div className="h-96 mb-32"></div>
        </div>
      )}
    </div>
  );
};

const CubePortfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSafariDesktop, setIsSafariDesktop] = useState(false);
  const sections = ['HOME', 'RESUME', 'PROJECTS', 'COURSEWORK'];
  const useLinearLayout = isMobile || isSafariDesktop;

  // Shared content components to avoid duplication
  const renderHomeContent = (isDesktop = false) => (
    <div className={`max-w-3xl mx-auto space-y-8 text-center relative z-10`}>
      <div className="border-4 border-black p-8 bg-white shadow-brutalist-lg transform transition-transform hover:-translate-y-1 hover:translate-x-1 duration-0">
        <h1 className={`font-black mb-6 uppercase tracking-tight ${isDesktop ? 'text-5xl md:text-7xl' : 'text-5xl'}`}>
          Hong Yuan Cao
        </h1>
        <div className="border-t-4 border-black my-6"></div>
        <p className={`text-black mb-4 font-bold ${isDesktop ? 'text-xl md:text-2xl' : 'text-xl'}`}>
          CS, ECON STUDENT @ BOSTON UNIVERSITY
        </p>
        <p className={`text-black mb-8 font-mono ${isDesktop ? 'text-base md:text-lg' : 'text-base'}`}>
          Interested in Software Engineering and Game Development
        </p>
      </div>
      <div className="flex justify-center gap-6">
        <a
          href="mailto:hongyc@bu.edu"
          className="border-4 border-black p-4 bg-white hover:bg-black hover:text-white group relative overflow-hidden"
          style={{ transition: 'none' }}
          aria-label="Email"
        >
          <div className="relative z-10"><Mail size={28} strokeWidth={2.5} /></div>
        </a>
        <a
          href="https://github.com/hongyuanc"
          target="_blank"
          className="border-4 border-black p-4 bg-white hover:bg-black hover:text-white"
          style={{ transition: 'none' }}
          aria-label="GitHub"
        >
          <Github size={28} strokeWidth={2.5} />
        </a>
        <a
          href="https://www.linkedin.com/in/hong-yuan-cao/"
          target="_blank"
          className="border-4 border-black p-4 bg-white hover:bg-black hover:text-white"
          style={{ transition: 'none' }}
          aria-label="LinkedIn"
        >
          <Linkedin size={28} strokeWidth={2.5} />
        </a>
      </div>
      {isDesktop && (
        <div className="flex justify-center mt-12 animate-bounce">
          <ChevronDown size={32} strokeWidth={3} className="text-black" />
        </div>
      )}
    </div>
  );

  const renderProjectsContent = () => (
    <div className="max-w-4xl mx-auto mt-16 md:mt-20">
      <div className="border-4 border-black p-6 mb-12 shadow-brutalist bg-white">
        <h2 className="text-4xl md:text-5xl font-black uppercase">Projects</h2>
      </div>
      <div className="space-y-8">
        {[
          {
            title: "VectorDB",
            tech: "Cython, FastAPI, Docker",
            desc: "VectorDB with HNSW indexing built from scratch.",
            link: "https://github.com/hongyuanc/vector-db",
            label: "View Project →"
          },
          {
            title: "Athens",
            tech: "FastAPI, React, TypeScript, OpenAI, Supabase, ChromaDB",
            desc: "An AI-powered learning environment.",
            link: "https://waitlist.athens-ai.tech",
            label: "Join Waitlist →"
          },
          {
            title: "Edge Detection Demo",
            tech: "Python, OpenCV, Typescript, Electron",
            desc: "Utilizes OpenCV to detect edges and identifies objects in live video feed. Demo for how cameras in AD operate.",
            link: "https://github.com/hongyuanc?tab=repositories",
            label: "View Project →"
          },
          {
            title: "Serverless Image Processing",
            tech: "AWS S3, Lambda, CloudFront, DynamoDB, Terraform, React",
            desc: "A platform that utilizes cloud services to receive and process/resize uploaded images.",
            link: "https://github.com/hongyuanc?tab=repositories",
            label: "View Project →"
          },
          {
            title: "WeTrack",
            tech: "Django, React Native, PostgreSQL, Android Studio",
            desc: "A mobile app that helps travelers and international students track expenses across multiple currencies.",
            link: "https://github.com/k4teseo/wetrack",
            label: "View Project →"
          },
          {
            title: "FilmHive",
            tech: "Flask, Vue.js, Python, Javascript, PostgreSQL",
            desc: "A movie discovery platform that suggests films based on what you've already watched and enjoyed.",
            link: "https://github.com/hongyuanc/movie-recommendation",
            label: "View Project →"
          },
          {
            title: "Large Language Model",
            tech: "Python, PyTorch",
            desc: "My attempt at understanding how language models like GPT actually work under the hood.",
            link: "https://github.com/hongyuanc/building-a-llm",
            label: "View Project →"
          }
        ].map((project, i) => (
          <div key={i} className="group border-4 border-black p-6 bg-white hover:bg-black hover:text-white shadow-brutalist" style={{ transition: 'none' }}>
            <h3 className="text-2xl md:text-3xl font-black mb-3 uppercase">{project.title}</h3>
            <p className="mb-3 text-sm font-mono opacity-80">{project.tech}</p>
            <p className="mb-4 font-bold">{project.desc}</p>
            <a href={project.link} target="_blank" className="inline-block border-2 border-current px-4 py-2 font-bold uppercase text-sm hover:bg-white hover:text-black group-hover:border-white" style={{ transition: 'none' }}>
              {project.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourseworkContent = () => (
    <div className="max-w-4xl mx-auto mt-16 md:mt-20">
      <div className="border-4 border-black p-6 mb-12 shadow-brutalist bg-white">
        <h2 className="text-4xl md:text-5xl font-black uppercase">Coursework</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white" style={{ transition: 'none' }}>
          <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-current pb-2">Spring 2026</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li className="font-black">• CS585 Image and Video Computing</li>
            <li className="font-black">• CS528 Cloud Computing</li>
            <li>• EC406 Applied Econometrics</li>
            <li>• WR415 Public Writing</li>
          </ul>
        </div>
        <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white" style={{ transition: 'none' }}>
          <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-current pb-2">Fall 2025</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li className="font-black">• CS542 Machine Learning</li>
            <li className="font-black">• CS440 Artificial Intelligence</li>
            <li className="font-black">• CS320 Programming Languages</li>
            <li>• EC371 Environmental Economics</li>
          </ul>
        </div>
        <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white" style={{ transition: 'none' }}>
          <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-current pb-2">Spring 2025</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li className="font-black">• CS351 Distributed Systems</li>
            <li className="font-black">• CS460 Databases</li>
            <li className="font-black">• CS365 Foundation of Data Science</li>
            <li>• WR152 Writing Research & Inquiry</li>
          </ul>
        </div>
        <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white" style={{ transition: 'none' }}>
          <h3 className="text-xl font-black mb-2 uppercase border-b-2 border-current pb-2">Fall 2024</h3>
          <p className="mb-4 text-xs font-bold uppercase tracking-wide opacity-80">@ BU London</p>
          <ul className="space-y-2 font-mono text-sm">
            <li className="font-black">• CS411 Software Engineering</li>
            <li className="font-black">• CS330 Algorithms</li>
            <li>• EC364 British Economics</li>
            <li>• AH381 London Architecture</li>
          </ul>
        </div>
        <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white" style={{ transition: 'none' }}>
          <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-current pb-2">Spring 2024</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li className="font-black">• CS131 Combinatoric Structures</li>
            <li className="font-black">• MA581 Probability</li>
            <li>• EC328 Urban Economics</li>
            <li>• CL101 The World of Greece</li>
          </ul>
        </div>
        <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white" style={{ transition: 'none' }}>
          <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-current pb-2">Fall 2023</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li className="font-black">• CS132 Geometric Algorithms</li>
            <li className="font-black">• CS210 Computer Systems</li>
            <li>• EC332 Market Structure</li>
            <li>• LJ112 Japanese 2</li>
          </ul>
        </div>
        <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white" style={{ transition: 'none' }}>
          <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-current pb-2">Spring 2023</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li>• EC202 Intermed Macro</li>
            <li>• EC204 Empirical Economics II</li>
            <li className="font-black">• CS112 Intro to CS II</li>
            <li>• CG101 Modern Greek</li>
          </ul>
        </div>
        <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white" style={{ transition: 'none' }}>
          <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-current pb-2">Fall 2022</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li>• EC201 Intermed Micro</li>
            <li>• EC203 Empirical Economics I</li>
            <li className="font-black">• CS111 Intro to CS I</li>
            <li>• WR120 Writing Seminar</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 text-center border-4 border-black p-4 bg-black text-white">
        <p className="font-mono text-sm uppercase tracking-wider">© {new Date().getFullYear()} Hong Yuan Cao</p>
      </div>
    </div>
  );
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const isTransitioningRef = useRef(false);
  const lockScrollRef = useRef(false);
  const touchStartY = useRef(null);
  const touchStartTime = useRef(null);

  useEffect(() => {
    // Better mobile detection
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(userAgent) || window.innerWidth <= 768;
      const isWebKit = /AppleWebKit/i.test(userAgent);
      const isSafari = /Safari/i.test(userAgent);
      const isChromeFamily = /Chrome|CriOS|Edg|OPR|Brave/i.test(userAgent);
      const isDesktopSafari = isWebKit && isSafari && !isChromeFamily && !isMobileDevice;

      setIsMobile(isMobileDevice);
      setIsSafariDesktop(isDesktopSafari);
      return { isMobileDevice, isDesktopSafari };
    };

    const { isMobileDevice: initialIsMobile, isDesktopSafari: initialIsSafariDesktop } = checkMobile();
    window.addEventListener('resize', checkMobile);

    // Only apply fixed body styles for desktop cube view
    if (!initialIsMobile && !initialIsSafariDesktop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    setTimeout(() => setIsLoading(false), 600);
    document.body.classList.add('font-poppins');

    return () => {
      window.removeEventListener('resize', checkMobile);
      // Reset body styles on cleanup
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = useLinearLayout ? 'auto' : 'hidden';
  }, [useLinearLayout]);

  // Smoother animation with better performance
  const smoothRotate = (targetRotation, onComplete) => {
    const startRotation = rotationDegree;
    const startTime = performance.now();
    const duration = isMobile ? 450 : 600;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const newRotation = startRotation + (targetRotation - startRotation) * eased;
      
      setRotationDegree(newRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        lockScrollRef.current = false;
        isTransitioningRef.current = false;
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(animate);
  };

  // Desktop wheel handling
  const handleWheel = (e) => {
    if (useLinearLayout) {
      return; // Completely disable wheel events on mobile
    }
    
    if (lockScrollRef.current || isTransitioningRef.current) {
      e.preventDefault();
      return;
    }

    const activeSection = sectionRefs.current[currentSection];
    if (!activeSection) return;

    const scrollContainer = activeSection.querySelector('.scroll-container');
    if (!scrollContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    const isScrolledToTop = scrollTop <= 10;
    const isScrolledToBottom = scrollHeight - clientHeight - scrollTop <= 10;

    if (
      (e.deltaY > 0 && isScrolledToBottom && currentSection < sections.length - 1) ||
      (e.deltaY < 0 && isScrolledToTop && currentSection > 0)
    ) {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      goToSection(currentSection + direction);
    }
  };

  // Improved touch handling for iOS
  const handleTouchStart = (e) => {
    if (!useLinearLayout) return;
    
    // Don't handle if touching a navigation button
    if (e.target.closest('.nav-button') || e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e) => {
    if (!useLinearLayout) return;
    // Allow normal scrolling within sections
  };

  const handleTouchEnd = (e) => {
    if (!useLinearLayout || !touchStartY.current) return;
    
    // Don't handle if touching a navigation button
    if (e.target.closest('.nav-button') || e.target.closest('button') || e.target.closest('a')) {
      touchStartY.current = null;
      return;
    }
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;
    const timeDelta = Date.now() - touchStartTime.current;
    
    // Require faster, more deliberate swipes
    if (Math.abs(deltaY) > 80 && timeDelta < 300) {
      const activeSection = sectionRefs.current[currentSection];
      if (activeSection) {
        const scrollContainer = activeSection.querySelector('.scroll-container');
        if (scrollContainer) {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
          const isScrolledToTop = scrollTop <= 10;
          const isScrolledToBottom = scrollHeight - clientHeight - scrollTop <= 10;
          
          if (deltaY > 0 && isScrolledToTop && currentSection > 0) {
            e.preventDefault();
            goToSection(currentSection - 1);
          } else if (deltaY < 0 && isScrolledToBottom && currentSection < sections.length - 1) {
            e.preventDefault();
            goToSection(currentSection + 1);
          }
        }
      }
    }
    
    touchStartY.current = null;
  };

  // Enhanced section navigation
  const goToSection = (index) => {
    if (isTransitioningRef.current || lockScrollRef.current || index === currentSection || index < 0 || index >= sections.length) return;

    lockScrollRef.current = true;
    isTransitioningRef.current = true;
    
    const targetRotation = index * 90;
    setCurrentSection(index);
    
    smoothRotate(targetRotation);
    setMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="border-4 border-black p-8 shadow-brutalist-lg">
          <div className="text-4xl font-black uppercase tracking-wider">Loading...</div>
        </div>
      </div>
    );
  }

  // Linear scroll layout used for mobile and Safari desktop fallback
  if (useLinearLayout) {
    return (
      <div className="min-h-screen bg-white font-tech" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {/* Mobile Navigation - Minimal Brutalist */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
          <div className="flex justify-end items-center px-4 py-3">
             <button
              onClick={() => setMobileMenuOpen(true)}
              className="font-black text-lg uppercase tracking-wider"
              aria-label="Open menu"
            >
              MENU
            </button>
          </div>

          {/* Full Screen Overlay Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col">
              {/* Header */}
              <div className="flex justify-end items-center px-4 py-3 border-b-4 border-black">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-black text-lg uppercase tracking-wider"
                  aria-label="Close menu"
                >
                  CLOSE ×
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex-grow flex flex-col justify-center px-6 space-y-6">
                {sections.map((section) => (
                  <a
                    key={section}
                    href={`#${section.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-black uppercase tracking-tight hover:text-gray-500 transition-colors"
                  >
                    {section}
                  </a>
                ))}
              </div>
              
              {/* Footer info in menu */}
              <div className="p-6 border-t-4 border-black">
                 <p className="font-mono text-sm">© {new Date().getFullYear()} Hong Yuan Cao</p>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Content - All sections in a single scrollable container */}
        <div className="pt-16">
          <section id="home" className="min-h-screen flex items-center justify-center">
            <div className="px-4">
              {renderHomeContent(false)}
            </div>
          </section>

          <section id="resume" className="min-h-screen py-8">
            <div className="max-w-3xl mx-auto px-4">
              <ResumeViewer />
            </div>
          </section>

          <section id="projects" className="min-h-screen py-8">
            <div className="px-4">
              {renderProjectsContent()}
            </div>
          </section>

          <section id="coursework" className="min-h-screen py-8">
            <div className="px-4">
              {renderCourseworkContent()}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Desktop cube layout
  return (
      <div
        ref={containerRef}
        className="h-screen overflow-hidden bg-white font-tech"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y'
        }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Minimal Brutalist Navigation - Expandable on Hover */}
      <nav className="fixed top-8 left-8 z-50 group">
        {/* Current Page Indicator - Always Visible */}
        <div className="border-4 border-black bg-black text-white px-6 py-3 font-black text-lg uppercase tracking-wider shadow-brutalist cursor-default">
          {sections[currentSection]}
        </div>

        {/* Expanded Navigation - Shows on Hover */}
        <div className="hidden group-hover:block absolute top-full left-0 pt-2 w-max">
          <div className="border-4 border-black bg-white shadow-brutalist-lg">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => goToSection(index)}
                className={`block w-full text-left px-6 py-3 font-black uppercase tracking-wider border-b-2 border-black last:border-b-0 ${
                  currentSection === index
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
                style={{ transition: 'none', minWidth: '200px' }}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{section}</span>
                  {currentSection === index && <span>&lt;</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Simplified Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-10 hidden md:block">
        {/* Status Text - Simple & Clean */}
        <div className="absolute bottom-8 right-8 font-mono text-xs font-bold text-black opacity-50">
           {currentSection + 1} / {sections.length} - {sections[currentSection]}
        </div>
      </div>

      {/* 3D Scene - Preserved but optimized */}
      <div
        className="fixed inset-0"
        style={{
          perspective: '150vh',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-50vh) rotateX(${rotationDegree}deg)`,
            transition: isTransitioningRef.current ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {sections.map((section, index) => {
            const isActive = currentSection === index;
            const isPrevSectionAvailable = index > 0;
            const isNextSectionAvailable = index < sections.length - 1;

            return (
              <div
                key={section}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="absolute inset-0 bg-white"
                style={{
                  transform: `rotateX(${-index * 90}deg) translateZ(50vh)`,
                  transformStyle: 'preserve-3d',
                  willChange: isActive ? 'transform, scroll-position' : 'transform',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >

                <div
                  className="absolute inset-0 overflow-auto scroll-container"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth',
                    overscrollBehavior: 'contain',
                    touchAction: 'pan-y',
                    ...(isMobile && {
                      overscrollBehaviorY: 'contain'
                    })
                  }}
                >
                  {/* Content containers */}
                  <div className={`p-4 md:p-8 lg:p-16 max-w-4xl mx-auto ${section === 'HOME' ? 'h-full flex flex-col justify-center' : ''}`}>
                    {/* HOME Section */}
                    {section === 'HOME' && renderHomeContent(true)}

                    {section === 'RESUME' && (
                      <div className="w-full h-full flex flex-col">
                        {/* Add padding at top to prevent accidental navigation */}
                        <div className="h-24 shrink-0"></div>
                        <ResumeViewer />

                        {/* Add extra space at bottom to ensure scrollability */}
                        <div className="h-20 shrink-0"></div>
                      </div>
                    )}

                    {/* PROJECTS Section */}
                    {section === 'PROJECTS' && renderProjectsContent()}

                    {/* COURSEWORK Section */}
                    {section === 'COURSEWORK' && renderCourseworkContent()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CubePortfolio;
