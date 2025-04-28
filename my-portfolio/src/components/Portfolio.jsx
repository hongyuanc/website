import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Download, FileText, ChevronUp, ChevronDown } from 'lucide-react';

// Navigation Button Component for Mobile - simplified to just an arrow
const NavigationButton = ({ direction, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
      aria-label={`Navigate ${direction}`}
    >
      {direction === 'up' ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
    </div>
  );
};

const CubeLogo = ({ rotation }) => {
  // Simpler logo with better mobile detection
  const isMobile = useRef(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth <= 768;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-10 h-10 flex items-center justify-center" style={{ perspective: '1000px' }}>
      <div
        className="relative w-8 h-8 transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          // Fixed mobile rotation to match the page transition direction
          transform: isMobile.current
            ? `rotateX(${rotation}deg)` // Changed to rotateX to match section transitions
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
  const resumePdfUrl = "/resume.pdf"; // Path to your resume PDF in public directory
  const isMobile = useRef(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth <= 768;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* PDF actions bar - added extra margin-top for mobile */}
      <div className={`flex justify-between items-center mb-4 ${isMobile.current ? 'mt-16' : ''}`}>
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
      {!isMobile.current ? (
        <div className="flex-grow overflow-visible">
          <object
            data={resumePdfUrl}
            type="application/pdf"
            className="w-full"
            style={{ 
              height: "calc(100vh - 180px)", // Adjusted height calculation
              display: "block"
            }}
          >
            <p>It appears your browser doesn't support embedded PDFs. You can <a href={resumePdfUrl}>download the PDF</a> instead.</p>
          </object>
        </div>
      ) : (
        // Mobile alternative message
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
  const sections = ['HOME', 'PROJECTS', 'RESUME', 'COURSEWORK'];
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const isTransitioningRef = useRef(false);
  const lockScrollRef = useRef(false);
  const touchStartY = useRef(null);
  const touchStartTime = useRef(null);
  const isMobile = useRef(window.innerWidth <= 768);

  useEffect(() => {
    // Simplified loading
    document.body.style.overflow = 'hidden';
    setTimeout(() => setIsLoading(false), 600);
    
    // Apply the custom font to the entire document
    document.body.classList.add('font-poppins');
    
    // Check for mobile
    const handleResize = () => {
      isMobile.current = window.innerWidth <= 768;
    };
    
    window.addEventListener('resize', handleResize);
    
    // For mobile devices, completely disable scrolling between sections
    if (isMobile.current) {
      document.body.style.overscrollBehavior = 'none';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.overscrollBehavior = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Smoother animation with better performance
  const smoothRotate = (targetRotation, onComplete) => {
    const startRotation = rotationDegree;
    const startTime = performance.now();
    // Faster animation on mobile for better responsiveness
    const duration = isMobile.current ? 450 : 600;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Improved easing for smoother animation
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

  // Completely disable wheel event for mobile to prevent section scrolling
  const handleWheel = (e) => {
    if (isMobile.current) {
      // On mobile, completely prevent wheel events from navigating between sections
      return;
    }
    
    // Keep desktop wheel behavior
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

  // Completely disable section swiping - touch only affects content scrolling
  const handleTouchStart = (e) => {
    // Only track touches for within-section scrolling
    // Do not track for section navigation via swipes
    if (e.target.closest('.nav-button')) {
      return; // Don't track touch events on navigation buttons
    }
  };

  const handleTouchMove = (e) => {
    // Only handle content scrolling, no section navigation
  };

  const handleTouchEnd = (e) => {
    // No section navigation via swipes
    // All section navigation is now through the arrow buttons
  };

  // Cleaner section navigation with improved mobile handling
  const goToSection = (index) => {
    if (isTransitioningRef.current || lockScrollRef.current || index === currentSection || index < 0 || index >= sections.length) return;

    lockScrollRef.current = true;
    isTransitioningRef.current = true;
    
    const targetRotation = index * 90;
    setCurrentSection(index);
    
    smoothRotate(targetRotation);
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-2xl font-light animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden bg-white font-tech"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
            transition: isTransitioningRef.current ? 'none' : 'transform 0.1s ease-out', // Avoid transition during animations
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
                  // Better mobile performance by improving paint layer handling
                  willChange: isActive ? 'transform, scroll-position' : 'transform',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Mobile Section Navigation Buttons - Only visible on mobile */}
                {isActive && isMobile.current && (
                  <>
                    {/* Up button - not shown on first section */}
                    {isPrevSectionAvailable && index !== 0 && (
                      <div className="fixed top-20 inset-x-0 flex justify-center z-40 md:hidden nav-button animate-bounce">
                        <NavigationButton 
                          direction="up" 
                          onClick={() => goToSection(index - 1)}
                        />
                      </div>
                    )}
                    
                    {/* Down button - not shown on first or last section */}
                    {isNextSectionAvailable && index !== 0 && (
                      <div className="fixed bottom-8 inset-x-0 flex justify-center z-40 md:hidden nav-button animate-bounce">
                        <NavigationButton 
                          direction="down" 
                          onClick={() => goToSection(index + 1)}
                        />
                      </div>
                    )}
                  </>
                )}

                <div
                  className="absolute inset-0 overflow-auto scroll-container"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth',
                    // Prevent scroll chaining and overscroll effects on mobile
                    overscrollBehavior: 'contain',
                    // Prevent scrolling to next/previous sections on mobile
                    ...(isMobile.current && {
                      overscrollBehaviorY: 'none'
                    })
                  }}
                >
                  {/* Simplified content containers with better spacing */}
                  <div className="p-4 md:p-8 lg:p-16 max-w-4xl mx-auto">
                    {/* HOME Section - Centered for all devices */}
                    {section === 'HOME' && (
                      <div className="max-w-2xl mx-auto space-y-6 text-center" style={{ marginTop: isMobile.current ? '35vh' : '17.5rem' }}>
                      <h1 className="text-3xl md:text-6xl font-light mb-6">Hong Yuan Cao</h1>
                        <p className="text-lg md:text-xl text-neutral-600 mb-4">
                          CS, Econ Student at Boston University
                        </p>
                        <p className="text-base md:text-lg text-neutral-500 mb-8">
                          Interested in Software Engineering and Game Development
                        </p>
                        <div className="flex justify-center gap-6">
                          <a
                            href="mailto:hongyc@bu.edu"
                            className="text-neutral-600 hover:text-black transition-colors"
                            aria-label="Email"
                          >
                            <Mail size={24} />
                          </a>
                          <a
                            href="https://github.com/hongyuanc"
                            target="_blank"
                            className="text-neutral-600 hover:text-black transition-colors"
                            aria-label="GitHub"
                          >
                            <Github size={24} />
                          </a>
                          <a
                            href="https://www.linkedin.com/in/hong-yuan-cao/"
                            target="_blank"
                            className="text-neutral-600 hover:text-black transition-colors"
                            aria-label="LinkedIn"
                          >
                            <Linkedin size={24} />
                          </a>
                        </div>
                        
                        {/* Visual indicator to scroll down */}
                        <div className="flex justify-center mt-12 animate-bounce">
                          <button 
                            onClick={() => goToSection(1)} 
                            className="text-neutral-300 hover:text-neutral-600 transition-colors nav-button"
                            aria-label="Scroll to Projects section"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* PROJECTS Section - Cleaner cards with hover effects */}
                    {section === 'PROJECTS' && (
                      <div className="max-w-3xl mx-auto mt-16 md:mt-20">
                        <h2 className="text-3xl font-light mb-12">Projects</h2>
                        <div className="space-y-10 md:space-y-16">
                          {/* Project cards with hover effects */}
                          <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
                            <h3 className="text-xl md:text-2xl font-light mb-2">Serverless Image Processing Pipeline</h3>
                            <p className="text-neutral-500 mb-3 text-sm">AWS S3, Lambda, CloudFront, DynamoDB, Terraform, React</p>
                            <p className="text-neutral-600 mb-3">
                              A platform that utilizes cloud services to receive and process/resize uploaded images.
                            </p>
                            <a href="https://github.com/hongyuanc?tab=repositories" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>
                          
                          <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
                            <h3 className="text-xl md:text-2xl font-light mb-2">WeTrack</h3>
                            <p className="text-neutral-500 mb-3 text-sm">Django, React Native, PostgreSQL, Android Studio</p>
                            <p className="text-neutral-600 mb-3">
                              A mobile app that helps travelers and international students track expenses across multiple currencies.
                            </p>
                            <a href="https://github.com/k4teseo/wetrack" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>

                          <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
                            <h3 className="text-xl md:text-2xl font-light mb-2">FilmHive</h3>
                            <p className="text-neutral-500 mb-3 text-sm">Flask, Vue.js, Python, Javascript, PostgreSQL</p>
                            <p className="text-neutral-600 mb-3">
                              A movie discovery platform that suggests films based on what you've already watched and enjoyed.
                            </p>
                            <a href="https://github.com/hongyuanc/movie-recommendation" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>

                          <div className="group hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
                            <h3 className="text-xl md:text-2xl font-light mb-2">Large Language Model Development</h3>
                            <p className="text-neutral-500 mb-3 text-sm">Python, PyTorch</p>
                            <p className="text-neutral-600 mb-3">
                              My attempt at understanding how language models like GPT actually work under the hood. 
                            </p>
                            <a href="https://github.com/hongyuanc/building-a-llm" target="_blank" className="inline-block text-neutral-400 group-hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {section === 'RESUME' && (
                      <div className="w-full h-full mt-16 md:mt-20">
                        <ResumeViewer />
                        
                        {/* Add extra space at bottom to ensure scrollability */}
                        <div className="h-20"></div>
                      </div>
                    )}

                    {/* COURSEWORK Section - Clean grid layout */}
                    {section === 'COURSEWORK' && (
                      <div className="max-w-3xl mx-auto mt-16 md:mt-20">
                        <h2 className="text-3xl font-light mb-12">Coursework</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Spring 2025 */}
                          <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
                            <h3 className="text-xl font-light mb-3">Spring 2025</h3>
                            <ul className="space-y-1 text-neutral-600">
                              <li>CS351 Distributed Systems</li>
                              <li>CS460 Databases</li>
                              <li>CS365 Foundation of Data Science</li>
                              <li>WR152 Writing Research & Inquiry</li>
                            </ul>
                          </div>

                          {/* Fall 2024 */}
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

                          {/* Spring 2024 */}
                          <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
                            <h3 className="text-xl font-light mb-3">Spring 2024</h3>
                            <ul className="space-y-1 text-neutral-600">
                              <li>CS131 Combinatoric Structures</li>
                              <li>MA581 Probability</li>
                              <li>EC328 Urban and Regional Economics</li>
                              <li>CL101 The World of Greece</li>
                            </ul>
                          </div>

                          {/* Fall 2023 */}
                          <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
                            <h3 className="text-xl font-light mb-3">Fall 2023</h3>
                            <ul className="space-y-1 text-neutral-600">
                              <li>CS132 Geometric Algorithms</li>
                              <li>CS210 Computer Systems</li>
                              <li>EC332 Market Structure and Economic Performance</li>
                              <li>LJ112 Japanese 2</li>
                            </ul>
                          </div>

                          {/* Spring 2023 */}
                          <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
                            <h3 className="text-xl font-light mb-3">Spring 2024</h3>
                            <ul className="space-y-1 text-neutral-600">
                              <li>EC202 Intermed Macro Economics</li>
                              <li>EC204 Empirical Economics II</li>
                              <li>CS112 Intro to CS II</li>
                              <li>CG101 Modern Greek Lang Lit Culture</li>
                            </ul>
                          </div>

                          {/* Fall 2022 */}
                          <div className="hover:bg-neutral-50 transition-all duration-300 p-4 rounded-lg -mx-4">
                            <h3 className="text-xl font-light mb-3">Fall 2023</h3>
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
                    )}
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