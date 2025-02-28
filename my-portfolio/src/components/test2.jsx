import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const CubeLogo = ({ rotation }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="w-12 h-12 flex items-center justify-center" style={{ perspective: '1000px' }}>
      <div
        className="relative w-8 h-8"
        style={{
          transformStyle: 'preserve-3d',
          transform: isMobile
            ? `rotateY(${rotation}deg)` // Simplified rotation for mobile
            : `rotateX(${rotation}deg) rotateY(45deg) rotateX(35deg)`,
          transition: 'none',
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'translateZ(16px)',
            background: 'white',
            border: '2px solid black',
            backfaceVisibility: 'hidden',
          }}
        />
        {/* Back face */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'translateZ(-16px) rotateY(180deg)',
            background: 'white',
            border: '2px solid black',
            backfaceVisibility: 'hidden',
          }}
        />
        {/* Right face */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateY(90deg) translateZ(16px)',
            background: 'white',
            border: '2px solid black',
            backfaceVisibility: 'hidden',
          }}
        />
        {/* Left face */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateY(-90deg) translateZ(16px)',
            background: 'white',
            border: '2px solid black',
            backfaceVisibility: 'hidden',
          }}
        />
        {/* Top face */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(90deg) translateZ(16px)',
            background: 'white',
            border: '2px solid black',
            backfaceVisibility: 'hidden',
          }}
        />
        {/* Bottom face */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(-90deg) translateZ(16px)',
            background: 'white',
            border: '2px solid black',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>
    </div>
  );
};

const CubePortfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
  const [touchStartY, setTouchStartY] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => setIsLoading(false), 1000); // Simulate loading
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

    if (
      (e.deltaY > 0 && isScrolledToBottom && currentSection < sections.length - 1) ||
      (e.deltaY < 0 && isScrolledToTop && currentSection > 0)
    ) {
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

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartY) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentSection > 0) {
        goToSection(currentSection - 1);
      } else if (deltaY < 0 && currentSection < sections.length - 1) {
        goToSection(currentSection + 1);
      }
    }

    setTouchStartY(null);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
                className={`text-sm tracking-wider transition-colors hover:text-black ${
                  currentSection === index ? 'text-black' : 'text-neutral-400'
                }`}
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
          perspectiveOrigin: '50% 50%',
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
                ref={(el) => (sectionRefs.current[index] = el)}
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
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <div className="p-24 max-w-7xl mx-auto">
                    {/* Section content remains the same */}
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
                      </div>
                    )}

                    {/* Projects Section */}
                    {section === 'PROJECTS' && (
                      <div className="max-w-4xl mx-auto">
                        <div className='h-8'></div>
                        <h2 className="text-4xl font-light mb-12">Projects</h2>
                        <div className="space-y-12">
                        <div className="bg-white">
                            <h3 className="text-2xl font-light mb-3">Serverless Image Processing Pipeline</h3>
                            <p className="text-neutral-500 mb-4 text-sm">AWS S3, Lambda, CloudFront, DynamoDB, Terraform, React</p>
                            <p className="text-neutral-600 mb-4">
                              A platform that utilizes cloud services to recieve and process/resize uploaded images.
                            </p>
                            <a href="https://github.com/hongyuanc?tab=repositories" target="_blank" className="text-neutral-400 hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>
                          
                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-3">WeTrack</h3>
                            <p className="text-neutral-500 mb-4 text-sm">Django, React Native, PostgreSQL, Android Studio</p>
                            <p className="text-neutral-600 mb-4">
                              A mobile app that helps travelers and international students track expenses across multiple currencies.
                            </p>
                            <a href="https://github.com/k4teseo/wetrack" target="_blank" className="text-neutral-400 hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>

                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-3">FilmHive</h3>
                            <p className="text-neutral-500 mb-4 text-sm">Flask, Vue.js, Python, Javascript, PostgreSQL</p>
                            <p className="text-neutral-600 mb-4">
                              A movie discovery platform that suggests films based on what you've already watched and enjoyed.
                            </p>
                            <a href="https://github.com/hongyuanc/movie-recommendation" target="_blank" className="text-neutral-400 hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>

                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-3">Large Language Model Development</h3>
                            <p className="text-neutral-500 mb-4 text-sm">Python, PyTorch</p>
                            <p className="text-neutral-600 mb-4">
                              My attempt at understanding how language models like GPT actually work under the hood. 
                            </p>
                            <a href="https://github.com/hongyuanc/building-a-llm" target="_blank" className="text-neutral-400 hover:text-black transition-colors">
                              View Project →
                            </a>
                          </div>

                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-3">Game Development Portfolio</h3>
                            <p className="text-neutral-500 mb-4 text-sm">Unity, C#, Godot, Python, Pygame</p>
                            <p className="text-neutral-600 mb-4">
                              Built games such as: Plants VS Zombies Clone, Flappy Bird Clone, Mario Clone, Pong, Snake etc.
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
                              <p className="text-neutral-600">Distributed Systems, Databases, Software Engineering, Analysis of Algorithms, Computer Systems, Probability in Computing, Combinatoric Structures, Geometric Algorithms, Discrete Mathematics, Data Structures</p>
                            </div>
                          </div>

                          {/* Technical Skills Section */}
                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-6">Technical Skills</h3>
                            <div className="space-y-3">
                              <div>
                                <p className="text-neutral-600 font-medium">Programming Languages:</p>
                                <p className="text-neutral-600">Python, JavaScript, TypeScript, Java, C#, Go, SQL, HTML/CSS, LaTeX, Assembly</p>
                              </div>
                              <div>
                                <p className="text-neutral-600 font-medium">Databases & Cloud:</p>
                                <p className="text-neutral-600">MySQL, PostgreSQL, Redis, AWS (Lambda, S3, CloudFront, DynamoDB), Alibaba Cloud RDS</p>
                              </div>
                              <div>
                                <p className="text-neutral-600 font-medium">Frameworks & Libraries:</p>
                                <p className="text-neutral-600">Django, React.js, Vue.js, React Native, Flask, Node.js, Spring Boot, JUnit, pytest, PyTorch, NumPy, Pandas, Scikit-learn, NLTK, Matplotlib, Seaborn, BeautifulSoup, Axios, Terraform, Docker, Git</p>
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
                                    <h4 className="text-xl font-medium mb-1">Software Engineering Intern</h4>
                                    <p className="text-neutral-600">Tospur Real Estate Consulting Co., Ltd</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-neutral-500">Shanghai, China</p>
                                    <p className="text-neutral-500">June 2024 – August 2024</p>
                                  </div>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Implemented a centralized data warehouse with Django and Alibaba Cloud RDS, creating a scalable backend system that integrated 4 internal MySQL databases and reduced manual data aggregation time by 45%</li>
                                  <li>Implemented RESTful APIs with Django REST Framework that connected the database to frontend client applications, enabling 200+ consultants to access and update project records in real-time</li>
                                  <li>Optimized database performance on Alibaba Cloud RDS by implementing B-tree indexing on high-traffic query columns and configuring connection pooling with optimal timeout settings, reducing query latency by 23%</li>
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
                                    <p className="text-neutral-500">May 2024 - June 2024</p>
                                  </div>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Preprocessed and managed multi-modal data for a LLM designed for automated test code generation, leveraging Pandas and regex to clean, tokenize, and structure raw code</li>
                                  <li>Curated a 2.2GB training dataset of JUnit 5 test cases from MIT/Apache-licensed repositories, using Git API for extraction and storing in JSON format with proper attribution metadata</li>
                                  <li>Developed validation scripts in Python with senior engineers to identify and standardize code formatting inconsistencies across the dataset, successfully normalizing 95% of test cases for improved model training</li>
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
                                    <p className="text-neutral-500">San Francisco, CA</p>
                                    <p className="text-neutral-500">June 2023 – October 2023</p>
                                  </div>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Implemented responsive UI components and animations using React.js, increasing landing page engagement by 24%</li>
                                  <li>Built a social media crawler using Python (BeautifulSoup4) that identified 200+ qualified influencers to target</li>
                                  <li>Processed 3,000+ media contacts using Python (Pandas) and Excel, improving outreach response rates by 25%</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          {/* Projects Section */}
                          <div className="bg-white">
                            <h3 className="text-2xl font-light mb-6">Projects</h3>
                            <div className="space-y-8">
                              {/* Serverless Image Processing Pipeline */}
                              <div>
                                <div className="mb-2">
                                  <h4 className="text-xl font-medium">Serverless Image Processing Pipeline</h4>
                                  <p className="text-neutral-500 italic">AWS S3, Lambda, CloudFront, DynamoDB, Terraform, React</p>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Provisioned serverless image processing infrastructure with Terraform, utilizing S3, Lambda, and CloudFront to reduce image delivery latency by 38%</li>
                                  <li>Implemented Python-based Lambda functions triggered by S3 events to automatically resize uploaded images</li>
                                  <li>Built React.js frontend connecting to AWS services through API Gateway, storing metadata in DynamoDB</li>
                                </ul>
                              </div>
                              
                              {/* Multi-Currency Budget Tracking Mobile App */}
                              <div>
                                <div className="mb-2">
                                  <h4 className="text-xl font-medium">Multi-Currency Budget Tracking Mobile App</h4>
                                  <p className="text-neutral-500 italic">Django, React Native, PostgreSQL, Android Studio</p>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Developed a expense tracking app with React Native, featuring currency conversion via third-party API integration</li>
                                  <li>Built RESTful APIs with Django REST Framework and PostgreSQL, implementing composite indexing on user-specific data fields and optimizing ORM queries to reduce data retrieval time by 65%</li>
                                  <li>Engineered offline data persistence using AsyncStorage local caching with JWT authentication, reducing API requests by 57% and improving average user interaction response time from 1.2s to 400ms</li>
                                </ul>
                              </div>
                              
                              {/* Movie Recommendation Platform */}
                              <div>
                                <div className="mb-2">
                                  <h4 className="text-xl font-medium">Movie Recommendation Platform</h4>
                                  <p className="text-neutral-500 italic">Flask, Vue.js, Python, Javascript, PostgreSQL</p>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Integrated movie database API with Flask to create an interactive dashboard using Vue.js components</li>
                                  <li>Built content-based recommendation algorithm using CountVectorizer and cosine similarity to analyze metadata</li>
                                  <li>Created secure user authentication with Flask-Login and bcrypt, storing user data in PostgreSQL</li>
                                </ul>
                              </div>
                              
                              {/* Neural Language Model Implementation */}
                              <div>
                                <div className="mb-2">
                                  <h4 className="text-xl font-medium">Neural Language Model Implementation</h4>
                                  <p className="text-neutral-500 italic">Python, PyTorch</p>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                  <li>Implemented transformer architecture in PyTorch with token and positional embeddings for sequential prediction</li>
                                  <li>Designed custom attention mechanisms for next-token prediction, enabling model to generate coherent text</li>
                                  <li>Implemented training pipeline with AdamW optimizer and batch processing, reducing model perplexity by 30%</li>
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
                        {/* Spring 2025 */}
                        <div className="bg-white">
                          <h3 className="text-2xl font-light mb-3">Spring 2025</h3>
                          <ul className="space-y-2 text-neutral-600">
                            <li>CS351 Distributed Systems</li>
                            <li>CS460 Databases</li>
                            <li>CS365 Foundation of Data Science</li>
                            <li>WR152 Writing Research & Inquiry</li>
                          </ul>
                        </div>

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