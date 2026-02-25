import "./styles/index.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationPin,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel, CarouselItem } from "./components/Carousel";
import MobileMenu from "./components/MobileMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const pageRef = useRef(null);

  /* ── ProjectCard with expand/collapse ── */
  function ProjectCard({ project }) {
    const cardRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      const el = cardRef.current;
      if (!el) return;
      // Check if content is clipped by max-height
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }, []);

    return (
      <div
        ref={cardRef}
        className={`project-card ${isExpanded ? "project-card--expanded" : ""}`}
      >
        {project.label && (
          <span className="project-card-label">
            {project.label}{" "}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
              >
                <FontAwesomeIcon icon={faGithub} />
                &nbsp; View on GitHub
              </a>
            )}
          </span>
        )}
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-tags">
          {project.tech.map((tech, index) => (
            <span key={index} className="project-tag">
              {tech}
            </span>
          ))}
        </div>
        {isOverflowing && (
          <button
            className="project-card-toggle"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    );
  }

  /* ── GSAP scroll-reveal ── */
  useEffect(() => {
    const sections = pageRef.current?.querySelectorAll(".section");
    if (!sections) return;

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  /* ── Data ── */
  const projects = [
    {
      id: 1,
      title: "copus",
      description:
        "A lightweight web app that converts mp3 files to opus and ogg file formats for android notification sound customization and to wav format for windows sound customization.",
      tech: ["HTML", "CSS", "JavaScript", "ffmpeg", "Multer", "Express"],
      link: "https://github.com/loag0/copus",
      label: "Web App",
    },
    {
      id: 2,
      title: "brAInwave",
      description:
        "An AI-powered study planner that helps students create personalized study plans based on their preferences in order to curb procrastination and poor time management.",
      tech: ["React", "Firebase", "Expo", "FastAPI", "SQLite"],
      //link: "https://github.com/loag0/brAInwave",
      label: "Coming soon",
    },
  ];

  const skills = {
    Frontend: ["React", "JavaScript", "Typescript", "HTML", "CSS", "Tailwind"],
    "Backend / Services": ["Firebase", "Node.js", "FastAPI"],
    Tools: ["Git", "VS Code", "Figma", "Expo"],
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="site-wrapper" ref={pageRef}>
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" onClick={scrollToTop} className="navbar-brand">
            Loago Moremi
          </a>

          <div className="navbar-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <a
              href="https://github.com/loag0"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/loago-moremi"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>

          <MobileMenu />
        </div>
      </nav>

      <div className="page-container">
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-inner">
            <div className="status-badge">
              <span className="status-dot" />
              Open to opportunities
            </div>

            <h1>
              Hello, I'm <span className="accent">Loago Moremi</span>
            </h1>
            <p className="subtitle">
              Computer Science student passionate about front-end dev and clean
              design.
            </p>

            <a
              href="/assets/Loago_Moremi - CV.pdf"
              download
              className="btn btn-filled"
            >
              <FontAwesomeIcon icon={faDownload} />
              &nbsp; Download CV
            </a>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="section about">
          <div className="section-inner">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="profile-image-wrapper">
                <img
                  src="/assets/profile-v2.jpg"
                  alt="Loago Moremi"
                  loading="lazy"
                />
              </div>
              <div className="about-text">
                <p>
                  I have a passion for software development and a curiosity that
                  keeps me exploring new tools, languages, and frameworks. I
                  enjoy solving problems through code and learning by building,
                  even if that means failing a few times before getting it
                  right.
                </p>
                <p>
                  I enjoy working on challenging projects that push my limits
                  and allow me to grow as a developer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="section skills">
          <div className="section-inner">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="skills-category">
                  <h3 className="skills-category-title">{category}</h3>
                  <div className="skills-tags">
                    {items.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="section projects">
          <div className="section-inner">
            <h2 className="section-title">Projects</h2>

            <Carousel threshold={3}>
              {projects.map((project) => (
                <CarouselItem key={project.id}>
                  <ProjectCard project={project} />
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="section experience">
          <div className="section-inner">
            <h2 className="section-title">Experience</h2>

            <div className="experience-card">
              <img
                src="/assets/debswana.jpg"
                alt="Debswana Logo"
                className="experience-logo"
                loading="lazy"
              />
              <div className="experience-content">
                <h3>IT Attaché – Debswana Mining Company</h3>
                <p className="experience-date">June 2025 – July 2025</p>
                <ul>
                  <li>
                    Provided end-user technical support and handled
                    troubleshooting tasks
                  </li>
                  <li>
                    Assisted in deploying and maintaining enterprise software
                    systems
                  </li>
                  <li>
                    Worked closely with the IT team to support domain/network
                    configurations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section contact">
          <div className="section-inner">
            <div className="contact-inner">
              <h2 className="section-title">Let's Work Together</h2>
              <p className="contact-subtitle">
                Got a project in mind? I'd love to hear about it. Reach out via
                email or find me on my socials.
              </p>

              <div className="contact-grid">
                <div className="contact-item">
                  <a href="mailto:loagomoremi@gmail.com" aria-label="Email">
                    <div className="contact-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </a>
                  <div>
                    <h3>Email</h3>
                    <a href="mailto:loagomoremi@gmail.com">
                      loagomoremi@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FontAwesomeIcon icon={faLocationPin} />
                  </div>
                  <div>
                    <h3>Location</h3>
                    <p>Francistown, BW</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <a href="/" onClick={scrollToTop} className="footer-brand">
                Loago Moremi
              </a>
              <p className="footer-tagline">Building cool stuff on the web</p>
            </div>

            <div className="footer-links">
              <a
                href="https://github.com/loag0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/loago-moremi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
              <a
                href="https://www.instagram.com/_m.loago"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a href="mailto:loagomoremi@gmail.com">Email</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Loago Moremi. Developer with Precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
