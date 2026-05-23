import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Download, FileText, ChevronDown, Home, Code2, BookOpen } from 'lucide-react';

// New component for PDF Resume with responsive design
const ResumeViewer = () => {
  const resumePdfUrl = "/resume.pdf";

  return (
    <div className="content-column h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h2 className="section-title text-[42px] md:text-[58px]">Resume</h2>
        <div className="flex gap-3 md:gap-4 flex-wrap">
          <a
            href={resumePdfUrl}
            target="_blank"
            className="quiet-button flex items-center gap-2 px-4 py-2 text-sm md:text-base"
            rel="noopener noreferrer"
          >
            <FileText size={18} strokeWidth={2} />
            <span>View</span>
          </a>
          <a
            href={resumePdfUrl}
            download="Hong_Yuan_Cao_Resume.pdf"
            className="quiet-button quiet-button-primary flex items-center gap-2 px-4 py-2 text-sm md:text-base"
          >
            <Download size={18} strokeWidth={2} />
            <span>Download</span>
          </a>
        </div>
      </div>

      <div className="resume-frame">
        <img src="/resume-page-1.png" alt="Resume preview" />
      </div>
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
  const aboutParagraphs = [
    "Recent BU graduate in Computer Science and Economics. Previously worked on autonomous-driving perception systems, including low-power perception architecture, radar/lidar drivers, and point-cloud processing.",
    "I like to redesign this site from time to time, knowing full well that probably no one will ever see the changes."
  ];

  // Shared content components to avoid duplication
  const renderHomeContent = (isDesktop = false, isLinearDesktop = false) => (
    <div className={`content-column text-center relative z-10 ${
      isDesktop ? 'home-content-desktop' : isLinearDesktop ? 'home-content-linear-desktop' : 'home-content-linear'
    }`}>
      <div className="px-2 md:px-6">
        <h1 className={`section-title home-name ${isDesktop ? 'text-[58px] md:text-[72px]' : isLinearDesktop ? 'text-[58px] md:text-[64px]' : 'text-[42px]'}`}>
          Hong Yuan Cao
        </h1>
        <div className="home-divider mx-auto w-20" style={{ height: '0.5px', background: 'var(--border-strong)' }}></div>
        <p className={`section-title home-tagline ${isDesktop || isLinearDesktop ? 'text-[28px]' : 'text-[24px]'}`}>
          Incoming MEng CS @ Cornell Tech
        </p>
        <div className={`about-copy hero-copy mx-auto ${isDesktop || isLinearDesktop ? 'about-copy-desktop' : 'about-copy-linear'}`}>
          {aboutParagraphs.map((paragraph, index) => (
            <p key={paragraph} className={index === 1 ? 'about-aside' : undefined}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="home-socials flex justify-center gap-4">
        <a
          href="mailto:hc2343@cornell.edu"
          className="icon-button p-3.5"
          aria-label="Email"
        >
          <Mail size={22} strokeWidth={1.8} />
        </a>
        <a
          href="https://github.com/hongyuanc"
          target="_blank"
          className="icon-button p-3.5"
          aria-label="GitHub"
        >
          <Github size={22} strokeWidth={1.8} />
        </a>
        <a
          href="https://www.linkedin.com/in/hong-yuan-cao/"
          target="_blank"
          className="icon-button p-3.5"
          aria-label="LinkedIn"
        >
          <Linkedin size={22} strokeWidth={1.8} />
        </a>
      </div>
    </div>
  );

  const renderProjectsContent = (compact = false) => (
    <div className={`content-column ${compact ? 'mt-6' : 'mt-20 md:mt-24'}`}>
      <div className="section-heading">
        <h2 className="section-title text-[42px] md:text-[58px]">Projects</h2>
      </div>
      <div className="space-y-5">
        {[
          {
            title: "Work-Stealing Task Runtime",
            tech: "C++20, Multithreading, Lock-Free, Linux",
            desc: "A C++20 work-stealing scheduler.",
            link: "https://github.com/hongyuanc?tab=repositories",
            label: "View Project →"
          },
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
            link: "https://athenslabs.ai",
            label: "View Project →"
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
          <div key={i} className="project-card group p-6 md:p-7">
            <h3 className="project-title text-[30px] mb-3">{project.title}</h3>
            <p className="metadata mb-3 text-xs md:text-sm">{project.tech}</p>
            <p className="hero-copy mb-5">{project.desc}</p>
            <a href={project.link} target="_blank" className="project-link inline-block text-sm">
              {project.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourseworkContent = (compact = false) => (
    <div className={`content-column ${compact ? 'mt-6' : 'mt-20 md:mt-24'}`}>
      <div className="section-heading">
        <h2 className="section-title text-[42px] md:text-[58px]">Coursework</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="course-card p-5">
          <h3 className="course-title text-[24px] mb-4 pb-2">Spring 2026</h3>
          <ul className="course-list space-y-2 text-sm">
            <li className="font-medium">• CS585 Image and Video Computing</li>
            <li className="font-medium">• CS528 Cloud Computing</li>
            <li>• EC406 Applied Econometrics</li>
            <li>• WR415 Public Writing</li>
          </ul>
        </div>
        <div className="course-card p-5">
          <h3 className="course-title text-[24px] mb-4 pb-2">Fall 2025</h3>
          <ul className="course-list space-y-2 text-sm">
            <li className="font-medium">• CS542 Machine Learning</li>
            <li className="font-medium">• CS440 Artificial Intelligence</li>
            <li className="font-medium">• CS320 Programming Languages</li>
            <li>• EC371 Environmental Economics</li>
          </ul>
        </div>
        <div className="course-card p-5">
          <h3 className="course-title text-[24px] mb-4 pb-2">Spring 2025</h3>
          <ul className="course-list space-y-2 text-sm">
            <li className="font-medium">• CS351 Distributed Systems</li>
            <li className="font-medium">• CS460 Databases</li>
            <li className="font-medium">• CS365 Foundation of Data Science</li>
            <li>• WR152 Writing Research & Inquiry</li>
          </ul>
        </div>
        <div className="course-card p-5">
          <h3 className="course-title text-[24px] mb-2 pb-2">Fall 2024</h3>
          <p className="metadata mb-4 text-xs">BU London</p>
          <ul className="course-list space-y-2 text-sm">
            <li className="font-medium">• CS411 Software Engineering</li>
            <li className="font-medium">• CS330 Algorithms</li>
            <li>• EC364 British Economics</li>
            <li>• AH381 London Architecture</li>
          </ul>
        </div>
        <div className="course-card p-5">
          <h3 className="course-title text-[24px] mb-4 pb-2">Spring 2024</h3>
          <ul className="course-list space-y-2 text-sm">
            <li className="font-medium">• CS131 Combinatoric Structures</li>
            <li className="font-medium">• MA581 Probability</li>
            <li>• EC328 Urban Economics</li>
            <li>• CL101 The World of Greece</li>
          </ul>
        </div>
        <div className="course-card p-5">
          <h3 className="course-title text-[24px] mb-4 pb-2">Fall 2023</h3>
          <ul className="course-list space-y-2 text-sm">
            <li className="font-medium">• CS132 Geometric Algorithms</li>
            <li className="font-medium">• CS210 Computer Systems</li>
            <li>• EC332 Market Structure</li>
            <li>• LJ112 Japanese 2</li>
          </ul>
        </div>
        <div className="course-card p-5">
          <h3 className="course-title text-[24px] mb-4 pb-2">Spring 2023</h3>
          <ul className="course-list space-y-2 text-sm">
            <li>• EC202 Intermed Macro</li>
            <li>• EC204 Empirical Economics II</li>
            <li className="font-medium">• CS112 Intro to CS II</li>
            <li>• CG101 Modern Greek</li>
          </ul>
        </div>
        <div className="course-card p-5">
          <h3 className="course-title text-[24px] mb-4 pb-2">Fall 2022</h3>
          <ul className="course-list space-y-2 text-sm">
            <li>• EC201 Intermed Micro</li>
            <li>• EC203 Empirical Economics I</li>
            <li className="font-medium">• CS111 Intro to CS I</li>
            <li>• WR120 Writing Seminar</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 text-center">
        <p className="metadata text-xs">© {new Date().getFullYear()} Hong Yuan Cao</p>
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

  const handleTouchMove = () => {
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
      <div className="portfolio-shell flex items-center justify-center h-screen">
        <div className="section-title text-[42px]">Loading...</div>
      </div>
    );
  }

  // Tab bar layout used for mobile and Safari desktop fallback
  if (useLinearLayout) {
    const tabs = [
      { label: 'Home',     icon: Home,     id: 0 },
      { label: 'Resume',   icon: FileText,  id: 1 },
      { label: 'Projects', icon: Code2,     id: 2 },
      { label: 'Courses',  icon: BookOpen,  id: 3 },
    ];

    return (
      <div className="portfolio-shell flex flex-col" style={{ height: '100dvh' }}>
        {/* Active section — scrollable area above the tab bar */}
        <div key={currentSection} className="section-fade-in flex-1 overflow-y-auto overscroll-contain">
          {currentSection === 0 && (
            <div className={`${isMobile ? 'min-h-full px-6 py-12' : 'min-h-full px-10 py-16'} flex items-center justify-center`}>
              {renderHomeContent(false, !isMobile)}
            </div>
          )}
          {currentSection === 1 && (
            <div className="px-4 py-8">
              <ResumeViewer />
            </div>
          )}
          {currentSection === 2 && (
            <div className="px-4 pb-6">
              {renderProjectsContent(true)}
            </div>
          )}
          {currentSection === 3 && (
            <div className="px-4 pb-6">
              {renderCourseworkContent(true)}
            </div>
          )}
        </div>

        {/* Bottom tab bar */}
        <nav className="mobile-tab-bar">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setCurrentSection(tab.id)}
              className={`mobile-tab ${currentSection === tab.id ? 'mobile-tab-active' : ''}`}
              aria-label={tab.label}
            >
              <tab.icon size={20} strokeWidth={1.8} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  // Desktop cube layout
  return (
      <div
        ref={containerRef}
        className="portfolio-shell h-screen overflow-hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y'
        }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Minimal Navigation - Expandable on Hover */}
      <nav className="fixed top-8 left-8 z-50 group">
        {/* Current Page Indicator - Always Visible */}
        <div className="nav-current px-3 py-1.5 cursor-default">
          <span className="metadata mr-3 text-[11px]">{String(currentSection + 1).padStart(2, '0')}</span>
          <span>{sections[currentSection]}</span>
        </div>

        {/* Expanded Navigation - Shows on Hover */}
        <div className="hidden group-hover:block absolute top-full left-0 pt-2 w-max">
          <div className="nav-menu">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => goToSection(index)}
                className={`nav-menu-item block w-full text-left px-4 py-2.5 ${
                  currentSection === index
                    ? 'nav-menu-item-active'
                    : ''
                }`}
                style={{ minWidth: '180px' }}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{section}</span>
                  {currentSection === index && <span>•</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Simplified Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-10 hidden md:block">
        {/* Status Text - Simple & Clean */}
        <div className="metadata absolute bottom-8 right-8 text-xs opacity-70">
           {currentSection + 1} / {sections.length} · {sections[currentSection]}
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
            return (
              <div
                key={section}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="portfolio-panel absolute inset-0"
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
                  <div className={`p-6 md:p-10 lg:p-16 mx-auto ${section === 'HOME' ? 'h-full flex flex-col justify-center relative' : ''}`}>
                    {/* HOME Section */}
                    {section === 'HOME' && (
                      <>
                        {renderHomeContent(true)}
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce" style={{ color: 'var(--text-muted)' }}>
                          <ChevronDown size={28} strokeWidth={1.8} />
                        </div>
                      </>
                    )}

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
