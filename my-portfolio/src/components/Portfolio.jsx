import React, { useState, useEffect, useRef } from 'react';

const CubePortfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sections = ['HOME', 'PROJECTS', 'RESUME', 'COURSEWORK'];
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeout = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scroll behavior

    // Return if already transitioning
    if (isTransitioning) return;

    // Implement scroll throttling
    const now = Date.now();
    if (now - lastScrollTime.current < 100) { // 100ms throttle
      return;
    }
    lastScrollTime.current = now;

    const activeSection = sectionRefs.current[currentSection];
    if (!activeSection) return;

    const scrollContainer = activeSection.querySelector('.scroll-container');
    if (!scrollContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    const isScrolledToTop = scrollTop === 0;
    const isScrolledToBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set up new timeout for scroll handling
    scrollTimeout.current = setTimeout(() => {
      if (e.deltaY > 0 && isScrolledToBottom && currentSection < sections.length - 1) {
        setIsTransitioning(true);
        setCurrentSection(prev => prev + 1);
        setRotationDegree(prev => prev + 90);
        
        // Reset transition state after animation
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      } else if (e.deltaY < 0 && isScrolledToTop && currentSection > 0) {
        setIsTransitioning(true);
        setCurrentSection(prev => prev - 1);
        setRotationDegree(prev => prev - 90);
        
        // Reset transition state after animation
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      } else {
        // Handle normal scrolling within section
        scrollContainer.scrollTop += e.deltaY;
      }
    }, 10); // Small delay to batch rapid scroll events
  };

  const goToSection = (index) => {
    if (isTransitioning || currentSection === index) return;
    
    setIsTransitioning(true);
    
    // Calculate rotation as before
    const currentTurns = rotationDegree / 360;
    const currentOffset = rotationDegree % 360;
    const targetRotation = index * 90;
    let newRotation = targetRotation;
    newRotation += Math.floor(currentTurns) * 360;
    const currentNormalized = ((currentOffset % 360) + 360) % 360;
    const targetNormalized = ((targetRotation % 360) + 360) % 360;
    let clockwiseDist = ((targetNormalized - currentNormalized + 360) % 360);
    let counterClockwiseDist = ((currentNormalized - targetNormalized + 360) % 360);
    
    if (clockwiseDist > counterClockwiseDist) {
      newRotation = rotationDegree - counterClockwiseDist;
    } else {
      newRotation = rotationDegree + clockwiseDist;
    }
    
    // Scroll current section to top before transitioning
    const currentScrollContainer = sectionRefs.current[currentSection]?.querySelector('.scroll-container');
    if (currentScrollContainer) {
      currentScrollContainer.scrollTop = 0;
    }
    
    setCurrentSection(index);
    setRotationDegree(newRotation);
    
    // After transition, ensure new section is scrolled to top
    setTimeout(() => {
      const newScrollContainer = sectionRefs.current[index]?.querySelector('.scroll-container');
      if (newScrollContainer) {
        newScrollContainer.scrollTop = 0;
      }
      setIsTransitioning(false);
    }, 500);
  };


  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-hidden"
      onWheel={handleWheel}
    >
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-screen-xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="font-medium text-xl">PORTFOLIO</div>
          <div className="flex gap-8">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => goToSection(index)}
                className={`text-sm tracking-wider transition-colors hover:text-black
                  ${currentSection === index ? 'text-black' : 'text-neutral-400'}`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* 3D Scene */}
      <div 
        className="fixed inset-0"
        style={{
          perspective: '150vh',
          perspectiveOrigin: '50% 50%'
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-50vh) rotateX(${rotationDegree}deg)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        >
          {sections.map((section, index) => {
            const isActive = currentSection === index;
            
            return (
              <div
                key={section}
                ref={el => sectionRefs.current[index] = el}
                className="absolute inset-0 bg-white"
                style={{
                  transform: `rotateX(${-index * 90}deg) translateZ(50vh)`,
                  transformStyle: 'preserve-3d',
                  // Show all faces during transitions
                  visibility: isTransitioning || Math.abs(currentSection - index) <= 1 ? 'visible' : 'hidden',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Scrollable Content Container */}
                <div 
                  className="absolute inset-0 overflow-auto scroll-container"
                  style={{
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  <div className="p-24 max-w-7xl mx-auto">
                    {/* Home Section */}
                    {section === 'HOME' && (
                      <div className="max-w-2xl mx-auto text-center mt-20">
                        <h1 className="text-6xl font-light mb-6">Your Name</h1>
                        <p className="text-xl text-neutral-600 mb-4">
                          Full Stack Developer & UI/UX Designer
                        </p>
                        <p className="text-lg text-neutral-500 mb-8">
                          Building beautiful and functional web experiences
                        </p>
                        <div className="flex gap-6 justify-center">
                          <a href="mailto:example@email.com" className="text-neutral-600 hover:text-black transition-colors">
                            <i className="fas fa-envelope text-2xl" />
                          </a>
                          <a href="#" className="text-neutral-600 hover:text-black transition-colors">
                            <i className="fab fa-github text-2xl" />
                          </a>
                          <a href="#" className="text-neutral-600 hover:text-black transition-colors">
                            <i className="fab fa-linkedin text-2xl" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Projects Section */}
                    {section === 'PROJECTS' && (
                      <div className="max-w-4xl mx-auto">
                        <div className='h-12'></div>
                        <h2 className="text-4xl font-light mb-12">Projects</h2>
                        <div className="space-y-12">
                          {[1, 2, 3, 4, 5].map((project) => (
                            <div key={project} className="bg-white">
                              <h3 className="text-2xl font-light mb-3">Project {project}</h3>
                              <p className="text-neutral-500 mb-4 text-sm">Technologies Used</p>
                              <p className="text-neutral-600 mb-4">
                                Project description goes here. This is a longer description to ensure
                                we have enough content to test scrolling within the section.
                              </p>
                              <a href="#" className="text-neutral-400 hover:text-black transition-colors">
                                View Project →
                              </a>
                            </div>
                          ))}
                        </div>
                        <div className='h-48'></div>
                      </div>
                    )}

                    {/* Resume Section */}
                    {section === 'RESUME' && (
                      <div className="max-w-4xl mx-auto">
                        <div className='h-12'></div>
                        <h2 className="text-4xl font-light mb-12">Resume</h2>
                        <div className="space-y-12">
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-white">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h4 className="text-2xl font-light mb-3">Position {item}</h4>
                                  <p className="text-neutral-500">Company Name</p>
                                </div>
                                <p className="text-neutral-500">Year - Present</p>
                              </div>
                              <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                <li>Achievement one</li>
                                <li>Achievement two</li>
                                <li>Achievement three</li>
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className='h-48'></div>
                      </div>
                    )}

                    {/* Coursework Section */}
                    {section === 'COURSEWORK' && (
                      <div className="max-w-4xl mx-auto">
                        <div className='h-12'></div>
                        <h2 className="text-4xl font-light mb-12">Coursework</h2>
                        <div className="space-y-8">
                          {[1, 2, 3, 4].map((course) => (
                            <div key={course} className="bg-white">
                              <h3 className="text-2xl font-light mb-4">Course Category {course}</h3>
                              <ul className="space-y-2 text-neutral-600">
                                <li>Course One</li>
                                <li>Course Two</li>
                                <li>Course Three</li>
                                <li>Course Four</li>
                              </ul>
                            </div>
                          ))}
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