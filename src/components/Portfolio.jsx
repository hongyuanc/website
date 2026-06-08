import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Download, FileText, ChevronDown, Home, Code2, BookOpen } from 'lucide-react';

const SECTION_META = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'coursework', label: 'Coursework', icon: BookOpen },
];

const PROJECTS = [
  {
    title: 'Athens',
    category: 'AI learning environment',
    tech: 'FastAPI, React, TypeScript, OpenAI, Supabase, ChromaDB',
    desc: 'Built a retrieval-backed study environment for turning course material into guided learning workflows.',
    proof: ['retrieval workflows', 'full-stack product', 'LLM integration'],
    link: 'https://athenslabs.ai',
    label: 'Visit Athens',
    featured: true,
  },
  {
    title: 'Work-Stealing Task Runtime',
    category: 'Systems runtime',
    tech: 'C++20, Linux threads, lock-free queues',
    desc: 'Built a scheduler around per-worker deques and work stealing to study throughput under uneven task graphs.',
    proof: ['Concurrency primitives', 'scheduler design', 'performance-oriented C++'],
    link: 'https://github.com/hongyuanc?tab=repositories',
    label: 'Open runtime repository',
    featured: true,
  },
  {
    title: 'VectorDB',
    category: 'Search infrastructure',
    tech: 'Cython, FastAPI, Docker',
    desc: 'Implemented vector search with HNSW indexing from scratch, then wrapped it in a FastAPI service.',
    proof: ['graph indexing', 'service API', 'containerized runtime'],
    link: 'https://github.com/hongyuanc/vector-db',
    label: 'Open VectorDB repository',
    featured: true,
  },
  {
    title: 'Athens',
    category: 'AI learning environment',
    tech: 'FastAPI, React, TypeScript, OpenAI, Supabase, ChromaDB',
    desc: 'Built a retrieval-backed study environment for turning course material into guided learning workflows.',
    proof: ['retrieval workflows', 'full-stack product', 'LLM integration'],
    link: 'https://athenslabs.ai',
    label: 'Visit Athens 2.0',
  },
  {
    title: 'Edge Detection Demo',
    category: 'Computer vision',
    tech: 'Python, OpenCV, TypeScript, Electron',
    desc: 'Built a live-video demo for edge detection and object identification in camera feeds.',
    link: 'https://github.com/hongyuanc?tab=repositories',
    label: 'Open project repository',
  },
  {
    title: 'Serverless Image Processing',
    category: 'Cloud systems',
    tech: 'AWS S3, Lambda, CloudFront, DynamoDB, Terraform, React',
    desc: 'Created an upload pipeline that receives images, resizes them, and stores processing state across AWS services.',
    link: 'https://github.com/hongyuanc?tab=repositories',
    label: 'Open project repository',
  },
  {
    title: 'WeTrack',
    category: 'Mobile product',
    tech: 'Django, React Native, PostgreSQL, Android Studio',
    desc: 'Built a travel expense tracker for international students managing spending across currencies.',
    link: 'https://github.com/k4teseo/wetrack',
    label: 'Open WeTrack repository',
  },
  {
    title: 'FilmHive',
    category: 'Recommendation system',
    tech: 'Flask, Vue.js, Python, JavaScript, PostgreSQL',
    desc: 'Built a movie discovery app that suggests films from a viewer’s watched history and preferences.',
    link: 'https://github.com/hongyuanc/movie-recommendation',
    label: 'Open FilmHive repository',
  },
  {
    title: 'Large Language Model',
    category: 'Learning project',
    tech: 'Python, PyTorch',
    desc: 'Worked through transformer internals by implementing the core pieces of a small language model.',
    link: 'https://github.com/hongyuanc/building-a-llm',
    label: 'Open LLM repository',
  },
];

const COURSE_GROUPS = [
  {
    title: 'Systems and Software',
    courses: ['Distributed Systems', 'Cloud Computing', 'Software Engineering', 'Computer Systems'],
  },
  {
    title: 'AI, Vision, and Data',
    courses: ['Machine Learning', 'Artificial Intelligence', 'Image and Video Computing', 'Foundation of Data Science'],
  },
  {
    title: 'Theory and Algorithms',
    courses: ['Analysis of Algorithms', 'Geometric Algorithms', 'Combinatoric Structures', 'Probability'],
  },
  {
    title: 'Economics and Writing',
    courses: ['Applied Econometrics', 'Environmental Economics', 'Urban Economics', 'Public Writing'],
  },
];

const getInitialSection = () => {
  if (typeof window === 'undefined') return 0;
  const hash = window.location.hash.replace('#', '');
  const index = SECTION_META.findIndex((section) => section.id === hash);
  return index >= 0 ? index : 0;
};

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
  const [currentSection, setCurrentSection] = useState(getInitialSection);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSafariDesktop, setIsSafariDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const useLinearLayout = isMobile || isSafariDesktop || prefersReducedMotion;
  const aboutParagraphs = [
    "Recent BU graduate in Computer Science and Economics. Previously worked on autonomous-driving perception systems, including low-power perception architecture, radar/lidar drivers, and point-cloud processing."
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
          rel="noopener noreferrer"
          className="icon-button p-3.5"
          aria-label="GitHub"
        >
          <Github size={22} strokeWidth={1.8} />
        </a>
        <a
          href="https://www.linkedin.com/in/hong-yuan-cao/"
          target="_blank"
          rel="noopener noreferrer"
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
        <p className="section-kicker">Selected Work</p>
        <h2 className="section-title text-[42px] md:text-[58px]">Projects</h2>
        <p className="section-intro">
          A tighter set of projects that show systems judgment, product sense, and interest in ML-adjacent tooling.
        </p>
      </div>
      <div className="selected-work-list">
        {PROJECTS.map((project) => (
          <article key={project.title} className={`project-card group p-6 md:p-7 ${project.featured ? 'project-card-featured' : ''}`}>
            <div className="project-card-top">
              <p className="metadata project-category">{project.category}</p>
              {project.featured && <span className="project-mark">Featured</span>}
            </div>
            <h3 className="project-title text-[30px] mb-3">{project.title}</h3>
            <p className="metadata mb-3 text-xs md:text-sm">{project.tech}</p>
            <p className="hero-copy mb-5">{project.desc}</p>
            {project.proof && (
              <ul className="proof-list" aria-label={`${project.title} proof points`}>
                {project.proof.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link inline-block text-sm">
              {project.label}
            </a>
          </article>
        ))}
      </div>
    </div>
  );

  const renderCourseworkContent = (compact = false) => (
    <div className={`content-column ${compact ? 'mt-6' : 'mt-20 md:mt-24'}`}>
      <div className="section-heading">
        <h2 className="section-title text-[42px] md:text-[58px]">Coursework</h2>
        <p className="section-intro">
          The relevant academic thread behind the systems, ML, and economics work.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {COURSE_GROUPS.map((group) => (
          <article key={group.title} className="course-card p-5">
            <h3 className="course-title text-[24px] mb-4 pb-2">{group.title}</h3>
            <ul className="course-list space-y-2 text-sm">
              {group.courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </article>
        ))}
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
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(userAgent) || window.innerWidth <= 768;
      const isWebKit = /AppleWebKit/i.test(userAgent);
      const isSafari = /Safari/i.test(userAgent);
      const isChromeFamily = /Chrome|CriOS|Edg|OPR|Brave/i.test(userAgent);
      const isDesktopSafari = isWebKit && isSafari && !isChromeFamily && !isMobileDevice;

      setIsMobile(isMobileDevice);
      setIsSafariDesktop(isDesktopSafari);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);

    return () => mediaQuery.removeEventListener('change', syncMotionPreference);
  }, []);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace('#', '');
      const nextSection = SECTION_META.findIndex((section) => section.id === hash);

      if (nextSection >= 0) {
        setCurrentSection(nextSection);
        setRotationDegree(nextSection * 90);
      }
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);

    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = useLinearLayout ? 'auto' : 'hidden';
  }, [useLinearLayout]);

  const smoothRotate = (targetRotation, onComplete) => {
    const startRotation = rotationDegree;
    const startTime = performance.now();
    const duration = isMobile ? 450 : 600;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = prefersReducedMotion ? 1 : Math.min(elapsed / duration, 1);
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

  const handleWheel = (e) => {
    if (useLinearLayout) {
      return;
    }
    
    if (lockScrollRef.current || isTransitioningRef.current) {
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
      (e.deltaY > 0 && isScrolledToBottom && currentSection < SECTION_META.length - 1) ||
      (e.deltaY < 0 && isScrolledToTop && currentSection > 0)
    ) {
      const direction = e.deltaY > 0 ? 1 : -1;
      goToSection(currentSection + direction);
    }
  };

  const handleTouchStart = (e) => {
    if (!useLinearLayout) return;
    
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = () => {
    if (!useLinearLayout) return;
  };

  const handleTouchEnd = (e) => {
    if (!useLinearLayout || !touchStartY.current) return;
    
    if (e.target.closest('button') || e.target.closest('a')) {
      touchStartY.current = null;
      return;
    }
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;
    const timeDelta = Date.now() - touchStartTime.current;
    
    if (Math.abs(deltaY) > 80 && timeDelta < 300) {
      const activeSection = sectionRefs.current[currentSection];
      if (activeSection) {
        const scrollContainer = activeSection.querySelector('.scroll-container');
        if (scrollContainer) {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
          const isScrolledToTop = scrollTop <= 10;
          const isScrolledToBottom = scrollHeight - clientHeight - scrollTop <= 10;
          
          if (deltaY > 0 && isScrolledToTop && currentSection > 0) {
            goToSection(currentSection - 1);
          } else if (deltaY < 0 && isScrolledToBottom && currentSection < SECTION_META.length - 1) {
            goToSection(currentSection + 1);
          }
        }
      }
    }
    
    touchStartY.current = null;
  };

  const goToSection = (index) => {
    if (index < 0 || index >= SECTION_META.length || index === currentSection) return;

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${SECTION_META[index].id}`);
    }

    if (useLinearLayout || prefersReducedMotion) {
      setCurrentSection(index);
      setRotationDegree(index * 90);
      return;
    }

    if (isTransitioningRef.current || lockScrollRef.current) return;

    lockScrollRef.current = true;
    isTransitioningRef.current = true;
    
    const targetRotation = index * 90;
    setCurrentSection(index);
    
    smoothRotate(targetRotation);
  };

  const handleNavKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      goToSection(Math.min(currentSection + 1, SECTION_META.length - 1));
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      goToSection(Math.max(currentSection - 1, 0));
    }
  };

  if (useLinearLayout) {
    return (
      <div className="portfolio-shell flex flex-col" style={{ height: '100dvh' }}>
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

        <nav className="mobile-tab-bar" aria-label="Section navigation">
          {SECTION_META.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => goToSection(index)}
              className={`mobile-tab ${currentSection === index ? 'mobile-tab-active' : ''}`}
              aria-label={tab.label}
              aria-current={currentSection === index ? 'page' : undefined}
            >
              <tab.icon size={20} strokeWidth={1.8} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

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
      <nav className="section-nav fixed top-8 left-8 z-50" aria-label="Section navigation" onKeyDown={handleNavKeyDown}>
        <div className="nav-current px-3 py-1.5 cursor-default">
          <span className="metadata mr-3 text-[11px]">{String(currentSection + 1).padStart(2, '0')}</span>
          <span>{SECTION_META[currentSection].label}</span>
        </div>
        <div className="nav-menu" role="list">
          {SECTION_META.map((section, index) => (
            <button
              key={section.id}
              type="button"
              onClick={() => goToSection(index)}
              className={`nav-menu-item block w-full text-left px-4 py-2.5 ${
                currentSection === index
                  ? 'nav-menu-item-active'
                  : ''
              }`}
              aria-current={currentSection === index ? 'page' : undefined}
            >
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="fixed inset-0 pointer-events-none z-10 hidden md:block">
        <div className="metadata absolute bottom-8 right-8 text-xs opacity-70">
           {currentSection + 1} / {SECTION_META.length} · {SECTION_META[currentSection].label}
        </div>
      </div>

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
          {SECTION_META.map((section, index) => {
            const isActive = currentSection === index;
            const inactivePanelProps = isActive ? {} : { inert: '', 'aria-hidden': true };

            return (
              <div
                key={section.id}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="portfolio-panel absolute inset-0"
                aria-label={section.label}
                {...inactivePanelProps}
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
                  <div className={`p-6 md:p-10 lg:p-16 mx-auto ${section.id === 'home' ? 'h-full flex flex-col justify-center relative' : ''}`}>
                    {section.id === 'home' && (
                      <>
                        {renderHomeContent(true)}
                        <div className="scroll-cue absolute bottom-8 left-0 right-0 flex justify-center" aria-hidden="true">
                          <ChevronDown size={28} strokeWidth={1.8} />
                        </div>
                      </>
                    )}

                    {section.id === 'resume' && (
                      <div className="w-full h-full flex flex-col">
                        <div className="h-24 shrink-0"></div>
                        <ResumeViewer />
                        <div className="h-20 shrink-0"></div>
                      </div>
                    )}

                    {section.id === 'projects' && renderProjectsContent()}

                    {section.id === 'coursework' && renderCourseworkContent()}
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
