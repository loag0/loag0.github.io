import "./styles/index.css";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationPin,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel, CarouselItem } from "./components/Carousel";
import MobileMenu from "./components/MobileMenu";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import { experience } from "./data/experience";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const pageRef = useRef(null);

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
              Computer science student who learns by building, debugging, and
              shipping. I'm focused on front-end systems that are fast,
              intentional, and actually usable.
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
                  I’m a computer science student who learns the hard way on
                  purpose. One of my favorite pastimes (maybe not so favorite)
                  is building something, breaking it, staring at the error for
                  20 minutes, then fixing it. Most of what I know came from
                  debugging stuff that had no business working in the first
                  place (including my hackintosh era). I like front-end because
                  I'm obsessed with the way software looks and feels. It's
                  something that I care deeply about in any product I use so
                  that made me want to prioritize front end development so I can
                  actually make things that I would want to use.
                </p>
                <p>
                  Lately I've been trying to extend my knowledge of development
                  by learning python and utilizing it for backend capability.
                  I've also been exploring the intersection of AI and everyday
                  productivity. My current project is an AI-powered study
                  planner that actually understands how students procrastinate.
                  I also made an audio converter because I like customizing the
                  notification sounds on my phone.
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

            {experience.map((job) => (
              <div key={job.id} className="experience-card">
                <img
                  src={job.logo}
                  alt={job.title}
                  className="experience-logo"
                  loading="lazy"
                />
                <div className="experience-content">
                  <h3>{job.title}</h3>
                  <p className="experience-date">{job.date}</p>
                  <ul>
                    {job.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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
              <p className="footer-tagline">Building cool stuff</p>
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
