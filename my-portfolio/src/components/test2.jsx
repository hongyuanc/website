import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const CubeLogo = ({ rotation }) => { 
  return ( 
    <div className="w-12 h-12 flex items-center justify-center" style={{ perspective: '1000px' }}> 
      <div className="relative w-8 h-8" style={{ 
        transformStyle: 'preserve-3d', 
        transform: `rotateX(${rotation}deg) rotateY(45deg) rotateX(35deg)`, 
        transition: 'none',
      }} > 
        {/* Front face */}
        <div className="absolute inset-0" style={{ 
          transform: 'translateZ(16px)', 
          background: 'white', 
          border: '2px solid black', 
          backfaceVisibility: 'hidden' 
        }} /> 
        
        {/* Back face */}
        <div className="absolute inset-0" style={{ 
          transform: 'translateZ(-16px) rotateY(180deg)', 
          background: 'white', 
          border: '2px solid black', 
          backfaceVisibility: 'hidden' 
        }} /> 
        
        {/* Right face */}
        <div className="absolute inset-0" style={{ 
          transform: 'rotateY(90deg) translateZ(16px)', 
          background: 'white', 
          border: '2px solid black', 
          backfaceVisibility: 'hidden' 
        }} /> 
        
        {/* Left face */}
        <div className="absolute inset-0" style={{ 
          transform: 'rotateY(-90deg) translateZ(16px)', 
          background: 'white', 
          border: '2px solid black', 
          backfaceVisibility: 'hidden' 
        }} /> 
        
        {/* Top face */}
        <div className="absolute inset-0" style={{ 
          transform: 'rotateX(90deg) translateZ(16px)', 
          background: 'white', 
          border: '2px solid black', 
          backfaceVisibility: 'hidden' 
        }} /> 
        
        {/* Bottom face */}
        <div className="absolute inset-0" style={{ 
          transform: 'rotateX(-90deg) translateZ(16px)', 
          background: 'white', 
          border: '2px solid black', 
          backfaceVisibility: 'hidden' 
        }} /> 
      </div> 
    </div> 
  ); 
};

const CubePortfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [rotationDegree, setRotationDegree] = useState(0);
  const sections = ['HOME', 'PROJECTS', 'RESUME', 'COURSEWORK'];
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const transitionProgressRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const lastWheelTimestamp = useRef(0);
  const accumulatedDelta = useRef(0);
  const animationFrameRef = useRef(null);
  const targetRotationRef = useRef(0);
  const lockScrollRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const smoothRotate = (targetRotation, onComplete) => {
    const startRotation = rotationDegree;
    const startTime = performance.now();
    const duration = 500; // Animation duration in ms

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const newRotation = startRotation + (targetRotation - startRotation) * eased;
      setRotationDegree(newRotation);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        lockScrollRef.current = false;
        if (onComplete) onComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleWheel = (e) => {
    if (lockScrollRef.current) {
      e.preventDefault();
      return;
    }

    const now = Date.now();
    if (now - lastWheelTimestamp.current > 50) {
      accumulatedDelta.current = 0;
    }
    lastWheelTimestamp.current = now;

    const activeSection = sectionRefs.current[currentSection];
    if (!activeSection) return;

    const scrollContainer = activeSection.querySelector('.scroll-container');
    if (!scrollContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    const isScrolledToTop = scrollTop === 0;
    const isScrolledToBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

    if ((e.deltaY > 0 && isScrolledToBottom && currentSection < sections.length - 1) ||
        (e.deltaY < 0 && isScrolledToTop && currentSection > 0)) {
      
      e.preventDefault();
      accumulatedDelta.current += e.deltaY;

      if (Math.abs(accumulatedDelta.current) > 100 && !isTransitioningRef.current) {
        isTransitioningRef.current = true;
        lockScrollRef.current = true;

        const direction = e.deltaY > 0 ? 1 : -1;
        const nextSection = currentSection + direction;
        targetRotationRef.current = nextSection * 90;

        setCurrentSection(nextSection);
        smoothRotate(targetRotationRef.current, () => {
          isTransitioningRef.current = false;
          accumulatedDelta.current = 0;
        });
      }
    }
  };

  const goToSection = (index) => {
    if (lockScrollRef.current || index === currentSection) return;
    
    lockScrollRef.current = true;
    const targetRotation = index * 90;
    setCurrentSection(index);
    
    smoothRotate(targetRotation, () => {
      lockScrollRef.current = false;
    });
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
        <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => goToSection(0)}
          >
            <CubeLogo rotation={rotationDegree} />
          </div>
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
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <div 
                  className="absolute inset-0 overflow-auto scroll-container"
                  style={{
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {/* Section content remains the same */}
                  <div className="p-24 max-w-7xl mx-auto">
                    {/* Home Section */}
                    {section === 'HOME' && (
                      <div className="max-w-2xl mx-auto text-center mt-40">
                        <h1 className="text-6xl font-light mb-6">Hong Yuan Cao</h1>
                          <p className="text-xl text-neutral-600 mb-4">
                            CS, Econ Student at Boston University
                          </p>
                          <p className="text-lg text-neutral-500 mb-8">
                            Interested in Software Engineering and Game Development
                          </p>
                          <div className="flex gap-6 justify-center">
                            <a 
                              href="mailto:hongyc@bu.edu" 
                              className="text-neutral-600 hover:text-black transition-colors"
                              aria-label="Email"
                            >
                              <Mail size={24} />
                            </a>
                            <a 
                              href="https://github.com/hongyuanc" 
                              target='_blank'
                              className="text-neutral-600 hover:text-black transition-colors"
                              aria-label="GitHub"
                            >
                              <Github size={24} />
                            </a>
                            <a 
                              href="https://www.linkedin.com/in/hong-yuan-cao/" 
                              target='_blank'
                              className="text-neutral-600 hover:text-black transition-colors"
                              aria-label="LinkedIn"
                            >
                              <Linkedin size={24} />
                            </a>
                        </div>
                      </div>
                    )}

                    {/* Projects Section */}
                    {section === 'PROJECTS' && (
                      <div className="max-w-4xl mx-auto">
                        <div className='h-8'></div>
                        <h2 className="text-4xl font-light mb-12">Projects</h2>
                        <div className="space-y-12">
                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-3">WeTrack</h3>
                            <p className="text-neutral-500 mb-4 text-sm">Django, React Native, PostgreSQL, Android Studio</p>
                            <p className="text-neutral-600 mb-4">
                              Led the development a React Native mobile app for real-time currency conversion and multi-currency expense
                              tracking, utilizing Django backend and integrating third-party APIs for live exchange rates.
                              Implemented JWT authentication and PostgreSQL optimization to securely manage over 1000 concurrent users.
                              Used Redis caching to reduce API calls by 51% and improving average response time from 2.5s to 500ms.
                            </p>
                            <a href="https://github.com/k4teseo/wetrack" target="_blank" className="text-neutral-400 hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>

                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-3">FilmHive</h3>
                            <p className="text-neutral-500 mb-4 text-sm">Flask, Vue.js, Python, Javascript, PostgreSQL</p>
                            <p className="text-neutral-600 mb-4">
                              Developed a movie dashboard and recommendation app with Vue.js and Flask, using PostgreSQL as database.
                              Implemented user authentication, bcrypt password hashing, and Flask-Login for personalized user experiences.
                              Designed RESTful API endpoints for recommendations and user dashboard analytics, enhancing content discovery.
                            </p>
                            <a href="https://github.com/hongyuanc/movie-recommendation" target="_blank" className="text-neutral-400 hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>

                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-3">Large Language Model Development</h3>
                            <p className="text-neutral-500 mb-4 text-sm">Python, PyTorch</p>
                            <p className="text-neutral-600 mb-4">
                              Implemented a transformer-based language model using PyTorch, focusing on token and position embeddings.
                              Developed custom attention mechanisms, including self-attention and masked attention for sequence generation.
                              Created a training loop with AdamW optimizer, achieving progressive loss reduction over 50,000 iterations.
                            </p>
                            <a href="https://github.com/hongyuanc/building-a-llm" target="_blank" className="text-neutral-400 hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>

                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-3">Game Development Portfolio</h3>
                            <p className="text-neutral-500 mb-4 text-sm">Unity, C#, Godot, Python, Pygame</p>
                            <p className="text-neutral-600 mb-4">
                              Engineered a tower defense game in Unity, implementing grid-based resource management, diverse enemy AI
                              behaviors, and a dynamic wave spawning system; utilized object pooling for optimized performance.
                              Developed physics-based games focusing on collision detection algorithms and frame-rate independent movement.
                              Implemented classic games in Python with emphasis on data structures for game state management, event-driven
                              programming for user inputs, and algorithmic approach to growth mechanics and collision checks.
                            </p>
                            <a href="https://github.com/hongyuanc?tab=repositories" target="_blank" className="text-neutral-400 hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>
                        </div>
                        <div className='h-12'></div>
                      </div>
                    )}

                    {/* Resume Section */}
                    {section === 'RESUME' && (
                      <div className="max-w-4xl mx-auto">
                        <div className="h-8"></div>
                        <h2 className="text-4xl font-light mb-12">Resume</h2>
                        
                        {/* Education Section */}
                        <div className="space-y-12">
                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-6">Education</h3>
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-xl font-light mb-2">Boston University</h4>
                                <p className="text-neutral-600">Double Major: Bachelor of Arts in Computer Science and Economics</p>
                                <p className="text-neutral-500">GPA: 3.77/4.0</p>
                              </div>
                              <div className="text-right">
                                <p className="text-neutral-500">Boston, MA</p>
                                <p className="text-neutral-500">Expected Graduation: May 2026</p>
                              </div>
                            </div>
                            <div className="mt-4">
                              <p className="text-neutral-600 font-medium mb-2">Relevant Courses:</p>
                              <p className="text-neutral-600">Software Engineering, Analysis of Algorithms, Computer Systems, Probability in Computing, Combinatoric Structures, Geometric Algorithms, Discrete Mathematics, Data Structures</p>
                            </div>
                          </div>

                          {/* Technical Skills Section */}
                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-6">Technical Skills</h3>
                            <div className="space-y-3">
                              <div>
                                <p className="text-neutral-600 font-medium">Programming:</p>
                                <p className="text-neutral-600">Python, Java, JavaScript, C#, Bash, Assembly, MySQL, PostgreSQL, TypeScript, LaTeX, HTML/CSS</p>
                              </div>
                              <div>
                                <p className="text-neutral-600 font-medium">Technologies:</p>
                                <p className="text-neutral-600">UNIX, VS Code, IntelliJ, Android Studio, Git, Godot, Unity, Docker, Postman</p>
                              </div>
                              <div>
                                <p className="text-neutral-600 font-medium">Libraries:</p>
                                <p className="text-neutral-600">NumPy, Pandas, Matplotlib, Scikit-learn, NLTK, Tkinter, Pygame, PyTorch</p>
                              </div>
                              <div>
                                <p className="text-neutral-600 font-medium">Frameworks:</p>
                                <p className="text-neutral-600">Django, Flask, React.js, React Native, Vue.js, Node.js</p>
                              </div>
                            </div>
                          </div>

                          {/* Experience Section */}
                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-6">Experience</h3>
                            <div className="space-y-8">
                              {/* Tospur */}
                              <div>
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h4 className="text-xl font-medium mb-1">Technology Summer Analyst</h4>
                                    <p className="text-neutral-600">Tospur Real Estate Consulting Co., Ltd</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-neutral-500">Shanghai, China</p>
                                    <p className="text-neutral-500">June 2024 – August 2024</p>
                                  </div>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Assisted in planning real estate projects for building acquisitions, each projecting NOI exceeding 10 million RMB</li>
                                  <li>Developed financial models for non-mortgage renovation loan projects, optimizing loan amounts and interest rates</li>
                                  <li>Led the development of a centralized tracking system using Django to monitor project progress across databases</li>
                                  <li>Designed and implemented RESTful APIs using Django REST Framework to integrate data from 4 internal systems, improving data accessibility and reporting efficiency</li>
                                </ul>
                              </div>

                              {/* Anban Tech */}
                              <div>
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h4 className="text-xl font-medium mb-1">Machine Learning Intern</h4>
                                    <p className="text-neutral-600">Anban Tech</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-neutral-500">Shanghai, China</p>
                                    <p className="text-neutral-500">May 2024</p>
                                  </div>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Gained hands-on experience in data preprocessing and management for an LLM used in test code generation</li>
                                  <li>Prepared a 2.2GB training dataset for LLM in JUnit 5 using open-source GitHub repositories and ChatGPT</li>
                                  <li>Collaborated with senior engineers to improve preprocessing methods, correcting 95.13% of data inconsistencies</li>
                                </ul>
                              </div>

                              {/* Tonic */}
                              <div>
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h4 className="text-xl font-medium mb-1">Software Engineering Intern</h4>
                                    <p className="text-neutral-600">Tonic – Sprout Technologies INC</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-neutral-500">Remote - San Francisco, CA</p>
                                    <p className="text-neutral-500">June 2023 – October 2023</p>
                                  </div>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Designed frontend website features such as graphic animations and formatting with JavaScript and HTML/CSS</li>
                                  <li>Developed a Python-based web crawler to identify potential influencers on Instagram and TikTok for promotion</li>
                                  <li>Utilized Python and Excel to process a database of over 3000 journalists and influencers for targeted outreach</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Coursework Section */}
                    {section === 'COURSEWORK' && (
                    <div className="max-w-4xl mx-auto">
                      <div className="h-8"></div>
                      <h2 className="text-4xl font-light mb-12">Coursework</h2>
                      <div className="space-y-8">
                        {/* Fall 2024 */}
                        <div className="bg-white">
                          <h3 className="text-2xl font-light mb-3">Fall 2024</h3>
                          <p className="text-neutral-500 mb-4 italic">Study abroad @ BU London</p>
                          <ul className="space-y-2 text-neutral-600">
                            <li>CS411 Software Engineering</li>
                            <li>CS330 Intro to Analysis of Algorithms</li>
                            <li>EC364 British Economic Performance: A Comparative Perspective</li>
                            <li>AH381 London Architecture & Urbanism</li>
                          </ul>
                        </div>

                        {/* Spring 2024 */}
                        <div className="bg-white">
                          <h3 className="text-2xl font-light mb-4">Spring 2024</h3>
                          <ul className="space-y-2 text-neutral-600">
                            <li>CS131 Combinatoric Structures</li>
                            <li>MA581 Probability</li>
                            <li>EC328 Urban and Regional Economics</li>
                            <li>CL101 The World of Greece</li>
                          </ul>
                        </div>

                        {/* Fall 2023 */}
                        <div className="bg-white">
                          <h3 className="text-2xl font-light mb-4">Fall 2023</h3>
                          <ul className="space-y-2 text-neutral-600">
                            <li>CS132 Geometric Algorithms</li>
                            <li>CS210 Computer Systems</li>
                            <li>EC332 Market Structure and Economic Performance</li>
                            <li>LJ112 Japanese 2</li>
                          </ul>
                        </div>

                        {/* Spring 2023 */}
                        <div className="bg-white">
                          <h3 className="text-2xl font-light mb-4">Spring 2023</h3>
                          <ul className="space-y-2 text-neutral-600">
                            <li>EC202 Intermed Macro Economics</li>
                            <li>EC204 Empirical Economics II</li>
                            <li>CS112 Intro to CS II</li>
                            <li>CG101 Modern Greek Lang Lit Culture</li>
                          </ul>
                        </div>

                        {/* Fall 2022 */}
                        <div className="bg-white">
                          <h3 className="text-2xl font-light mb-4">Fall 2022</h3>
                          <ul className="space-y-2 text-neutral-600">
                            <li>EC201 Intermed Micro Economics</li>
                            <li>EC203 Empirical Economics I</li>
                            <li>CS111 Intro to CS I</li>
                            <li>WR120 Writing Seminar</li>
                          </ul>
                        </div>
                        <div className="pt-24 text-center text-neutral-500 text-sm">
                        © {new Date().getFullYear()} Hong Yuan Cao.
                      </div>
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