/* eslint-disable react/prop-types */
import {
  ArrowUpRight,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';

const CASE_STUDIES = [
  {
    title: 'Athens',
    type: 'AI learning environment',
    signal: 'Guided study paths with inspectable sources.',
    summary:
      'A retrieval-backed study workspace for turning course documents into guided review flows. The useful bit is keeping source material, retrieval results, and generated guidance close enough to inspect while studying.',
    stack: 'FastAPI / React / TypeScript / OpenAI / Supabase / ChromaDB',
    href: 'https://athenslabs.ai',
    linkLabel: 'Visit Athens',
  },
  {
    title: 'Loom',
    type: 'AI game asset pipeline',
    signal: 'Consistent animated sprites with inspectable eval reports.',
    summary:
      'A tool for turning character prompts into animation-ready sprite packages for games. It focuses on preserving character identity across frames, checking output quality automatically, and exporting assets in a format developers can actually use.',
    stack: 'Go / Next.js / TypeScript / Python / OpenAI / Postgres / Redis / LocalStack',
    href: '/projects/loom',
    linkLabel: 'View Loom',
  },
  {
    title: 'Work-Stealing Task Runtime',
    type: 'Systems runtime',
    signal: 'Irregular task graphs under visible scheduler pressure.',
    summary:
      'A C++ scheduler built with per-worker deques and work stealing to study uneven task graphs. I used it to watch when locality, contention, and idle workers start to shape throughput.',
    stack: 'C++20 / Linux threads / lock-free queues',
    href: 'https://github.com/hongyuanc?tab=repositories',
    linkLabel: 'Open repository',
  },
  {
    title: 'VectorDB',
    type: 'Search infrastructure',
    signal: 'A hand-built graph index wrapped as a service.',
    summary:
      'A vector search service with HNSW indexing implemented from scratch, then exposed through FastAPI. The project keeps the graph behavior understandable before the API makes search feel simple.',
    stack: 'Cython / FastAPI / Docker',
    href: 'https://github.com/hongyuanc/vector-db',
    linkLabel: 'Open VectorDB',
  },
];

const PROJECT_ARCHIVE = [
  {
    title: 'Edge Detection Demo',
    detail: 'Live-video edge detection and object identification using Python, OpenCV, TypeScript, and Electron.',
    href: 'https://github.com/hongyuanc?tab=repositories',
  },
  {
    title: 'Serverless Image Processing',
    detail: 'AWS image upload and resize pipeline across S3, Lambda, CloudFront, DynamoDB, Terraform, and React.',
    href: 'https://github.com/hongyuanc?tab=repositories',
  },
  {
    title: 'WeTrack',
    detail: 'Travel expense tracker for international students managing spending across currencies.',
    href: 'https://github.com/k4teseo/wetrack',
  },
  {
    title: 'FilmHive',
    detail: 'Movie discovery app that suggests films from watched history and preferences.',
    href: 'https://github.com/hongyuanc/movie-recommendation',
  },
  {
    title: 'Small Language Model',
    detail: 'A learning project for working through transformer internals in PyTorch.',
    href: 'https://github.com/hongyuanc/building-a-llm',
  },
];

const COURSE_GROUPS = [
  {
    title: 'Systems and Software',
    courses: ['Distributed Systems', 'Cloud Computing', 'Software Engineering', 'Computer Systems', 'Databases', 'Programming Languages'],
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
    title: 'Economics',
    courses: ['Applied Econometrics', 'Environmental Economics', 'Urban Economics', 'Market Structure'],
  },
];

const CONTACT_LINKS = [
  {
    label: 'Email',
    href: 'mailto:hc2343@cornell.edu',
    icon: Mail,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/hongyuanc',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hong-yuan-cao/',
    icon: Linkedin,
  },
];

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

const resumePdfUrl = '/resume.pdf';

function ExternalLink({ href, children, className = '' }) {
  return (
    <a className={className} href={href} rel="noopener noreferrer" target="_blank" data-external="true">
      {children}
    </a>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Hong Yuan Cao home">
        Hong Yuan Cao
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} className={item.href === '#home' ? 'nav-home' : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section surface-field surface-field-hero section-anchor" aria-labelledby="home-title">
      <div className="hero-intro">
        <p className="current-focus"></p>
        <h1 id="home-title" aria-label="Hong Yuan Cao">
          <span>Hong Yuan</span>
          <span>Cao</span>
        </h1>
        <p className="hero-copy">
          Recent BU CS and Economics graduate heading to Cornell Tech.
        </p>
        <p className="working-note">
          Interested in systems, ML, and game devlopement.
        </p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="text-action" href="#projects">
            Selected work
            <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <a className="text-action text-action-muted" href="#resume">
            Resume
            <FileText size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <a className="text-action text-action-muted" href="#contact">
            Contact
            <Mail size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>

      <aside className="intro-panel" aria-label="Personal notes">
        <span className="panel-note"></span>
        <div>
          <span className="panel-label">Now</span>
          <p>Incoming MEng CS @ Cornell Tech.</p>
        </div>
        <div>
          <span className="panel-label">Thread</span>
          <p>Previously worked on autonomous-driving perception systems: low-power perception architecture, radar and lidar drivers, and point-cloud processing.</p>
        </div>
      </aside>
    </section>
  );
}

function CaseStudy({ project }) {
  return (
    <article className="case-study">
      <div className="case-study-title">
        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-signal">{project.signal}</p>
      </div>
      <div className="case-study-detail">
        <p className="project-summary">{project.summary}</p>
        <div className="project-meta">
          <p className="stack-line" aria-label={`${project.title} technology stack`}>{project.stack}</p>
          <ExternalLink href={project.href} className="project-link">
            {project.linkLabel}
            <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
          </ExternalLink>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="portfolio-section projects-section section-anchor" aria-labelledby="projects-title">
      <div className="section-heading">
        <h2 id="projects-title">Selected Work</h2>
        <p>
          Some interesting projects I&apos;ve built.
        </p>
      </div>

      <div className="case-study-list">
        {CASE_STUDIES.map((project) => (
          <CaseStudy key={project.title} project={project} />
        ))}
      </div>

      <div className="archive-block" aria-labelledby="archive-title">
        <h3 id="archive-title">Project archive</h3>
        <p className="archive-intro">
          Some less interesting projects I&apos;ve built.
        </p>
        <div className="archive-list">
          {PROJECT_ARCHIVE.map((project) => (
            <ExternalLink key={project.title} href={project.href} className="archive-item">
              <span>{project.title}</span>
              <span>{project.detail}</span>
              <ArrowUpRight className="archive-arrow" size={15} strokeWidth={1.7} aria-hidden="true" />
            </ExternalLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function Background() {
  return (
    <section className="portfolio-section background-section background-ledger" aria-labelledby="background-title">
      <div className="section-heading compact-heading">
        <h2 id="background-title">Background</h2>
        <p>
          Some relevant courses I took at BU.
        </p>
      </div>

      <div className="course-grid">
        {COURSE_GROUPS.map((group) => (
          <article key={group.title} className="course-group">
            <h3>{group.title}</h3>
            <ul>
              {group.courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section id="resume" className="portfolio-section resume-section surface-field surface-field-resume section-anchor" aria-labelledby="resume-title">
      <div className="resume-copy">
        <h2 id="resume-title">Resume</h2>
        <p>
          My resume.
        </p>
        <div className="resume-actions">
          <ExternalLink href={resumePdfUrl} className="text-action">
            View resume
            <FileText size={17} strokeWidth={1.7} aria-hidden="true" />
          </ExternalLink>
          <a className="text-action text-action-muted" href={resumePdfUrl} download="Hong_Yuan_Cao_Resume.pdf">
            Download resume
            <Download size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="resume-preview" aria-label="Resume preview">
        <img src="/resume-page-1.png" alt="Preview of Hong Yuan Cao's resume" />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section surface-field surface-field-contact section-anchor" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">Contact</h2>
        <p>
          Email is best for anything direct; GitHub is best for code.
        </p>
      </div>
      <div className="contact-links" aria-label="Contact links">
        {CONTACT_LINKS.map((link) => {
          const Icon = link.icon;
          const isEmail = link.href.startsWith('mailto:');

          if (isEmail) {
            return (
              <a key={link.label} href={link.href} className="contact-link">
                <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                {link.label}
              </a>
            );
          }

          return (
            <ExternalLink key={link.label} href={link.href} className="contact-link">
              <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              {link.label}
            </ExternalLink>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; 2026 Hong Yuan Cao</p>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="portfolio-shell">
      <Header />
      <main className="portfolio-main">
        <Hero />
        <Projects />
        <Background />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default Portfolio;
