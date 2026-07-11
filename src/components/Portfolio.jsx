/* eslint-disable react/prop-types */
const PROJECTS = [
  {
    title: 'athens',
    description: 'an inspectable study workspace built around retrieval and source material.',
    href: 'https://athenslabs.ai',
  },
  {
    title: 'loom',
    description: 'a pipeline for consistent, animation-ready game assets.',
    href: 'https://github.com/hongyuanc/loom',
  },
  {
    title: 'work-stealing task runtime',
    description: 'a c++ scheduler for exploring locality, contention, and irregular task graphs.',
    href: 'https://github.com/hongyuanc?tab=repositories',
  },
  {
    title: 'vectordb',
    description: 'graph-based vector search implemented from scratch and exposed as a service.',
    href: 'https://github.com/hongyuanc/vector-db',
  },
];

const ELSEWHERE_LINKS = [
  { label: 'resume', href: '/resume.pdf', external: true },
  { label: 'github', href: 'https://github.com/hongyuanc', external: true },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/hong-yuan-cao/', external: true },
  { label: 'email', href: 'mailto:hc2343@cornell.edu', external: false },
];

function ExternalLink({ href, children, className = '' }) {
  return (
    <a className={className} href={href} rel="noopener noreferrer" target="_blank">
      {children}
      <span className="sr-only"> opens in a new tab</span>
    </a>
  );
}

function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <h1 id="intro-title">hi, i’m hong.</h1>
      <p>i’m a software engineer working across systems, ml tooling, and game infrastructure.</p>
      <p className="intro-context">
        i recently finished computer science and economics at{' '}
        <ExternalLink href="https://www.bu.edu/">bu</ExternalLink>, and i’m heading to{' '}
        <ExternalLink href="https://tech.cornell.edu/">cornell tech</ExternalLink> for an meng in computer science.
      </p>
    </section>
  );
}

function ProjectLink({ project }) {
  return (
    <li className="project-item">
      <article>
        <h3>
          <ExternalLink className="project-link" href={project.href}>
            {project.title}
          </ExternalLink>
        </h3>
        <p>{project.description}</p>
      </article>
    </li>
  );
}

function Projects() {
  return (
    <section className="projects-section" aria-labelledby="projects-title">
      <h2 id="projects-title">some projects</h2>
      <ul className="project-list">
        {PROJECTS.map((project) => (
          <ProjectLink key={project.title} project={project} />
        ))}
      </ul>
    </section>
  );
}

function Elsewhere() {
  return (
    <section className="elsewhere-section" aria-labelledby="elsewhere-title">
      <h2 id="elsewhere-title">elsewhere</h2>
      <ul className="elsewhere-list">
        {ELSEWHERE_LINKS.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <ExternalLink href={link.href}>{link.label}</ExternalLink>
            ) : (
              <a href={link.href}>{link.label}</a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; 2026 hong yuan cao</p>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main-content">skip to content</a>
      <main id="main-content" className="portfolio-main" tabIndex="-1">
        <Intro />
        <Projects />
        <Elsewhere />
      </main>
      <Footer />
    </div>
  );
}

export default Portfolio;
