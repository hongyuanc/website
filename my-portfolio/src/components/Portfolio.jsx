import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Download, FileText, ChevronUp, ChevronDown } from 'lucide-react';

// Navigation Button Component for Mobile - Minimal design with iOS fixes
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
      className="flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        background: 'none',
        border: 'none',
        padding: '8px'
      }}
      aria-label={`Navigate ${direction}`}
    >
      {direction === 'up' ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
    </button>
  );
};

const CubeLogo = ({ rotation }) => {
  // Better mobile detection using useState instead of useRef
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
    <div className="w-10 h-10 flex items-center justify-center" style={{ perspective: '1000px' }}>
      <div
        className="relative w-8 h-8 transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isMobile
            ? `rotateX(${rotation}deg)`
            : `rotateX(${rotation}deg) rotateY(45deg) rotateX(35deg)`,
        }}
      >
        {/* All six faces with cleaner styling */}
        {[
          { transform: 'translateZ(16px)', label: 'front' },
          { transform: 'translateZ(-16px) rotateY(180deg)', label: 'back' },
          { transform: 'rotateY(90deg) translateZ(16px)', label: 'right' },
          { transform: 'rotateY(-90deg) translateZ(16px)', label: 'left' },
          { transform: 'rotateX(90deg) translateZ(16px)', label: 'top' },
          { transform: 'rotateX(-90deg) translateZ(16px)', label: 'bottom' }
        ].map((face, index) => (
          <div
            key={face.label}
            className="absolute inset-0 bg-white border-2 border-black"
            style={{
              transform: face.transform,
              backfaceVisibility: 'hidden',
            }}
          />
        ))}
      </div>
    </div>
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
      <div className={`flex justify-between items-center mb-4 ${isMobile ? 'mt-16' : ''}`}>
        <h2 className="text-3xl font-light">Resume</h2>
        <div className="flex gap-3">
          <a 
            href={resumePdfUrl} 
            target="_blank" 
            className="flex items-center gap-1 px-3 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors"
            rel="noopener noreferrer"
          >
            <FileText size={16} />
            <span>View</span>
          </a>
          <a 
            href={resumePdfUrl} 
            download="Hong_Yuan_Cao_Resume.pdf" 
            className="flex items-center gap-1 px-3 py-2 rounded-md bg-neutral-800 text-white hover:bg-black transition-colors"
          >
            <Download size={16} />
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
        <div className="mt-8 text-center text-neutral-600 px-4 py-16 pb-32">
          <p>For the best experience viewing the resume, please use the View or Download buttons above.</p>
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
  const sections = ['HOME', 'RESUME', 'PROJECTS', 'COURSEWORK'];

  // Shared content components to avoid duplication
  const renderHomeContent = (isDesktop = false) => (
    <div className={`max-w-2xl mx-auto space-y-6 text-center ${isDesktop ? '' : ''}`} style={{ marginTop: isDesktop ? (isMobile ? '35vh' : '17.5rem') : '0' }}>
      <h1 className={`font-light mb-6 ${isDesktop ? 'text-3xl md:text-6xl' : 'text-4xl'}`}>Hong Yuan Cao</h1>
      <p className={`text-neutral-600 mb-4 ${isDesktop ? 'text-lg md:text-xl' : 'text-lg'}`}>
        CS, Econ Student at Boston University
      </p>
      <p className={`text-neutral-500 mb-8 ${isDesktop ? 'text-base md:text-lg' : 'text-base'}`}>
        Interested in Software Engineering and Game Development
      </p>
      <div className="flex justify-center gap-6">
        <a href="mailto:hongyc@bu.edu" className="text-neutral-600 hover:text-black transition-colors" aria-label="Email">
          <Mail size={24} />
        </a>
        <a href="https://github.com/hongyuanc" target="_blank" className="text-neutral-600 hover:text-black transition-colors" aria-label="GitHub">
          <Github size={24} />
        </a>
        <a href="https://www.linkedin.com/in/hong-yuan-cao/" target="_blank" className="text-neutral-600 hover:text-black transition-colors" aria-label="LinkedIn">
          <Linkedin size={24} />
        </a>
      </div>
      {isDesktop && (
        <div className="flex justify-center mt-12 animate-bounce">
          <NavigationButton direction="down" onClick={() => goToSection(1)} />
        </div>
      )}
    </div>
  );

  const renderProjectsContent = () => (
    <div className="max-w-3xl mx-auto mt-16 md:mt-20">
      <h2 className="text-3xl font-light mb-12">Projects</h2>
      <div className="space-y-10 md:space-y-16">
        <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl md:text-2xl font-light mb-2">Athens</h3>
          <p className="text-neutral-500 mb-3 text-sm">FastAPI, React, TypeScript, OpenAI, Supabase, ChromaDB</p>
          <p className="text-neutral-600 mb-3">An AI-powered learning environment.</p>
          <a href="https://waitlist.athens-ai.tech" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
            Join the waitlist →
          </a>
        </div>
        <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl md:text-2xl font-light mb-2">Edge Detection Demo</h3>
          <p className="text-neutral-500 mb-3 text-sm">Python, OpenCV, Typescript, Electron</p>
          <p className="text-neutral-600 mb-3">Utilizes OpenCV to detect edges and idenitifies objects in live video feed. Demo for how cameras in AD operate.</p>
          <a href="https://github.com/hongyuanc?tab=repositories" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
            View Project →
          </a>
        </div>
        <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl md:text-2xl font-light mb-2">Serverless Image Processing Pipeline</h3>
          <p className="text-neutral-500 mb-3 text-sm">AWS S3, Lambda, CloudFront, DynamoDB, Terraform, React</p>
          <p className="text-neutral-600 mb-3">A platform that utilizes cloud services to receive and process/resize uploaded images.</p>
          <a href="https://github.com/hongyuanc?tab=repositories" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
            View Project →
          </a>
        </div>
        <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl md:text-2xl font-light mb-2">WeTrack</h3>
          <p className="text-neutral-500 mb-3 text-sm">Django, React Native, PostgreSQL, Android Studio</p>
          <p className="text-neutral-600 mb-3">A mobile app that helps travelers and international students track expenses across multiple currencies.</p>
          <a href="https://github.com/k4teseo/wetrack" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
            View Project →
          </a>
        </div>
        <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl md:text-2xl font-light mb-2">FilmHive</h3>
          <p className="text-neutral-500 mb-3 text-sm">Flask, Vue.js, Python, Javascript, PostgreSQL</p>
          <p className="text-neutral-600 mb-3">A movie discovery platform that suggests films based on what you've already watched and enjoyed.</p>
          <a href="https://github.com/hongyuanc/movie-recommendation" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
            View Project →
          </a>
        </div>
        <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl md:text-2xl font-light mb-2">Large Language Model Development</h3>
          <p className="text-neutral-500 mb-3 text-sm">Python, PyTorch</p>
          <p className="text-neutral-600 mb-3">My attempt at understanding how language models like GPT actually work under the hood.</p>
          <a href="https://github.com/hongyuanc/building-a-llm" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
            View Project →
          </a>
        </div>
      </div>
    </div>
  );

  const renderCourseworkContent = () => (
    <div className="max-w-3xl mx-auto mt-16 md:mt-20">
      <h2 className="text-3xl font-light mb-12">Coursework</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl font-light mb-3">Fall 2025</h3>
          <ul className="space-y-1 text-neutral-600">
            <li>CS542 Machine Learning</li>
            <li>CS440 Artificial Intelligence</li>
            <li>CS320 Programming Languages</li>
            <li>EC371 Environmental Economics</li>
          </ul>
        </div>
        <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl font-light mb-3">Spring 2025</h3>
          <ul className="space-y-1 text-neutral-600">
            <li>CS351 Distributed Systems</li>
            <li>CS460 Databases</li>
            <li>CS365 Foundation of Data Science</li>
            <li>WR152 Writing Research & Inquiry</li>
          </ul>
        </div>
        <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl font-light mb-2">Fall 2024</h3>
          <p className="text-neutral-500 mb-2 text-sm italic">Study abroad @ BU London</p>
          <ul className="space-y-1 text-neutral-600">
            <li>CS411 Software Engineering</li>
            <li>CS330 Intro to Analysis of Algorithms</li>
            <li>EC364 British Economic Performance</li>
            <li>AH381 London Architecture & Urbanism</li>
          </ul>
        </div>
        <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl font-light mb-3">Spring 2024</h3>
          <ul className="space-y-1 text-neutral-600">
            <li>CS131 Combinatoric Structures</li>
            <li>MA581 Probability</li>
            <li>EC328 Urban and Regional Economics</li>
            <li>CL101 The World of Greece</li>
          </ul>
        </div>
        <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl font-light mb-3">Fall 2023</h3>
          <ul className="space-y-1 text-neutral-600">
            <li>CS132 Geometric Algorithms</li>
            <li>CS210 Computer Systems</li>
            <li>EC332 Market Structure and Economic Performance</li>
            <li>LJ112 Japanese 2</li>
          </ul>
        </div>
        <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl font-light mb-3">Spring 2023</h3>
          <ul className="space-y-1 text-neutral-600">
            <li>EC202 Intermed Macro Economics</li>
            <li>EC204 Empirical Economics II</li>
            <li>CS112 Intro to CS II</li>
            <li>CG101 Modern Greek Lang Lit Culture</li>
          </ul>
        </div>
        <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
          <h3 className="text-xl font-light mb-3">Fall 2022</h3>
          <ul className="space-y-1 text-neutral-600">
            <li>EC201 Intermed Micro Economics</li>
            <li>EC203 Empirical Economics I</li>
            <li>CS111 Intro to CS I</li>
            <li>WR120 Writing Seminar</li>
          </ul>
        </div>
      </div>
      <div className="mt-24 text-center text-neutral-500 text-sm">
        © {new Date().getFullYear()} Hong Yuan Cao
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
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Only apply fixed body styles for desktop cube view
    if (!checkMobile()) {
      document.body.style.overflow = 'hidden';
    }
    
    setTimeout(() => setIsLoading(false), 600);
    document.body.classList.add('font-poppins');
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      // Reset body styles on cleanup
      document.body.style.overflow = 'unset';
    };
  }, []);

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
    if (isMobile) {
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
    if (!isMobile) return;
    
    // Don't handle if touching a navigation button
    if (e.target.closest('.nav-button') || e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    // Allow normal scrolling within sections
  };

  const handleTouchEnd = (e) => {
    if (!isMobile || !touchStartY.current) return;
    
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
        <div className="text-2xl font-light animate-pulse">Loading...</div>
      </div>
    );
  }

  // Mobile scrollable layout - completely different from desktop
  if (isMobile) {
    return (
      <div className="min-h-screen bg-white font-tech" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {/* Mobile Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
          <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
            </div>
            
            <button 
              className="text-neutral-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
          
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white border-b border-neutral-100 py-4 px-6 shadow-sm">
              <div className="flex flex-col space-y-4">
                {sections.map((section, index) => (
                  <a
                    key={section}
                    href={`#${section.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className="text-sm tracking-wider transition-colors text-left hover:text-black py-2 text-neutral-400"
                  >
                    {section}
                  </a>
                ))}
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

  // Desktop cube layout (unchanged)
  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden bg-white font-tech"
      style={{ 
        fontFamily: "'JetBrains Mono', monospace",
        WebkitOverflowScrolling: 'touch'
      }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Minimalist Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => goToSection(0)}
          >
            <CubeLogo rotation={rotationDegree} />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => goToSection(index)}
                className={`text-sm tracking-wider transition-colors hover:text-black ${
                  currentSection === index ? 'text-black' : 'text-neutral-400'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 py-4 px-6 animate-fadeIn shadow-sm">
            <div className="flex flex-col space-y-4">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => goToSection(index)}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  className={`text-sm tracking-wider transition-colors text-left hover:text-black py-2 ${
                    currentSection === index ? 'text-black' : 'text-neutral-400'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

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
                    ...(isMobile && {
                      overscrollBehaviorY: 'contain'
                    })
                  }}
                >
                  {/* Content containers */}
                  <div className="p-4 md:p-8 lg:p-16 max-w-4xl mx-auto">
                    {/* HOME Section */}
                    {section === 'HOME' && renderHomeContent(true)}

                    {section === 'RESUME' && (
                      <div className="w-full h-full mt-16 md:mt-20">
                        <ResumeViewer />
                        
                        {/* Add extra space at bottom to ensure scrollability */}
                        <div className="h-20"></div>
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