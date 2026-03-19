import "./styles/index.css";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationPin,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import { experience } from "./data/experience";

const PANES = [
  "This User",
  "Drivers",
  "Program Files",
  "Event Logs",
  "Network",
];

const PANE_FILES = {
  "This User": [
    { name: "profile", ext: ".jpg" },
    { name: "bio", ext: ".txt" },
    { name: "cv", ext: ".pdf" },
  ],
  Drivers: [
    { name: "frontend", ext: ".dll" },
    { name: "backend", ext: ".dll" },
    { name: "tools", ext: ".dll" },
  ],
  "Program Files": [
    { name: "copus", ext: ".exe" },
    { name: "brAInwave", ext: ".exe" },
  ],
  "Event Logs": [{ name: "debswana-2025", ext: ".log" }],
  Network: [
    { name: "email", ext: ".lnk" },
    { name: "github", ext: ".lnk" },
    { name: "linkedin", ext: ".lnk" },
  ],
};

const EXT_COLORS = {
  ".exe": { bg: "#e8f0d8", border: "#88b040", fill: "#4a8020" },
  ".dll": { bg: "#e8eaf8", border: "#7080c0", fill: "#3a4aaa" },
  ".log": { bg: "#fef8e8", border: "#d4aa40", fill: "#8a6000" },
  ".lnk": { bg: "#e8f4fe", border: "#60a8d8", fill: "#1a6aaa" },
  ".jpg": { bg: "#fce8f4", border: "#d080b0", fill: "#a03080" },
  ".txt": { bg: "#f0f0f0", border: "#a0a0a0", fill: "#505050" },
  ".pdf": { bg: "#fce8e8", border: "#e08080", fill: "#c03030" },
};

function FileIcon({ ext, size = 13 }) {
  const c = EXT_COLORS[ext] || EXT_COLORS[".txt"];
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none">
      <rect
        x="1"
        y="1"
        width="11"
        height="11"
        rx="1"
        fill={c.bg}
        stroke={c.border}
        strokeWidth="0.8"
      />
      <rect
        x="3"
        y="4"
        width="7"
        height="1"
        rx="0.5"
        fill={c.fill}
        fillOpacity="0.8"
      />
      <rect
        x="3"
        y="6.5"
        width="5"
        height="1"
        rx="0.5"
        fill={c.fill}
        fillOpacity="0.8"
      />
      <rect
        x="3"
        y="9"
        width="6"
        height="1"
        rx="0.5"
        fill={c.fill}
        fillOpacity="0.8"
      />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      style={{
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 150ms ease",
        flexShrink: 0,
      }}
    >
      <path
        d="M3 2l4 3-4 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const breadcrumb = (pane) => `Computer › Loago Moremi › ${pane}`;

function FolderIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 14" fill="none">
      <rect x="0" y="3" width="16" height="11" rx="1.5" fill="#f0b429" />
      <rect x="0" y="5" width="16" height="9" rx="1.5" fill="#fac740" />
      <rect x="0" y="3" width="6" height="3" rx="1.5" fill="#f0b429" />
    </svg>
  );
}

function WinBtns() {
  return (
    <div
      className="win-btns"
      style={{ display: "flex", alignItems: "center", gap: 6 }}
    >
      <div className="mac-btn mac-btn--close" title="Close" />
      <div className="mac-btn mac-btn--min" title="Minimize" />
      <div className="mac-btn mac-btn--max" title="Maximize" />
    </div>
  );
}

function AboutPane() {
  return (
    <>
      <div className="pane-header">
        <span className="pane-title">This User</span>
        <span className="pane-count">4 items</span>
      </div>
      <div className="pane-content">
        <div className="about-layout">
          <div className="about-photo-wrap">
            <img
              src="/assets/profile.jpg"
              alt="Loago Moremi"
              loading="lazy"
            />
            <p className="about-photo-caption">profile.jpg</p>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 4,
              }}
            >
              <h2 className="about-name" style={{ marginBottom: 0 }}>
                Loago Moremi
              </h2>
              <span className="meta-chip meta-chip--green">
                <span className="status-dot" style={{ marginRight: 6 }} />
                Open to opportunities
              </span>
            </div>
            <p className="about-role">
              Computer Science Student · Front-end Developer
            </p>
            <div className="about-body">
              <p>
                I'm a computer science student who learns the hard way on
                purpose. One of my favorite pastimes (maybe not so favorite) is
                building something, breaking it, staring at the error for 20
                minutes, then fixing it. Most of what I know came from debugging
                stuff that had no business working in the first place (including
                my hackintosh era). I like front-end because I'm obsessed with
                the way software looks and feels. It's something that I care
                deeply about in any product I use so that made me want to
                prioritize front-end development so I can actually make things
                that I would want to use.
              </p>
              <p>
                Lately I've been trying to extend my knowledge of development by
                learning Python and utilizing it for backend capability. I've
                also been exploring the intersection of AI and everyday
                productivity. My current project is an AI-powered study planner
                that actually understands how students procrastinate. I also
                made an audio converter because I like customizing the
                notification sounds on my phone.
              </p>
            </div>
            <div className="about-meta">
              <span className="meta-chip">
                <FontAwesomeIcon
                  icon={faLocationPin}
                  style={{ marginRight: 5, fontSize: 10 }}
                />
                Francistown, BW
              </span>
              <span className="meta-chip">BIUST · Final Year</span>
              <a
                href="/assets/Loago_Moremi - CV.pdf"
                download
                className="toolbar-btn toolbar-btn--primary"
                style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
              >
                <FontAwesomeIcon icon={faDownload} style={{ fontSize: 10 }} />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SkillsPane() {
  return (
    <>
      <div className="pane-header">
        <span className="pane-title">Drivers</span>
        <span className="pane-count">
          {Object.values(skills).flat().length} items
        </span>
      </div>
      <div className="pane-content">
        <div className="skills-layout">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="skills-group-title">{category}</p>
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
    </>
  );
}

function ProjectsPane() {
  return (
    <>
      <div className="pane-header">
        <span className="pane-title">Program Files</span>
        <span className="pane-count">{projects.length} items</span>
      </div>
      <div className="pane-content">
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-row">
              <div>
                <div className="project-label-row">
                  <span
                    className={`project-badge ${project.label === "Coming soon" ? "coming" : ""}`}
                  >
                    {project.label}
                  </span>
                </div>
                <h3 className="project-name">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech-row">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{ width: 12, height: 12 }}
                  />
                  View on GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ExperiencePane() {
  return (
    <>
      <div className="pane-header">
        <span className="pane-title">Event Logs</span>
        <span className="pane-count">{experience.length} items</span>
      </div>
      <div className="pane-content">
        <div className="experience-list">
          {experience.map((job) => (
            <div key={job.id} className="exp-row">
              <img
                src={job.logo}
                alt={job.title}
                className="exp-logo"
                loading="lazy"
              />
              <div>
                <h3 className="exp-title">{job.title}</h3>
                <p className="exp-date">{job.date}</p>
                <ul className="exp-bullets">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="exp-bullet">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ContactPane() {
  return (
    <>
      <div className="pane-header">
        <span className="pane-title">Network</span>
        <span className="pane-count">4 items</span>
      </div>
      <div className="pane-content">
        <div className="contact-layout">
          <p className="contact-intro">
            Got a project in mind? I'd love to hear about it. Reach out via
            email or find me on my socials.
          </p>
          <div className="contact-list">
            <div className="contact-row">
              <div className="contact-icon-wrap">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <p className="contact-label">Email</p>
                <a
                  href="mailto:loagomoremi@gmail.com"
                  className="contact-value"
                >
                  loagomoremi@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon-wrap">
                <FontAwesomeIcon icon={faGithub} />
              </div>
              <div>
                <p className="contact-label">GitHub</p>
                <a
                  href="https://github.com/loag0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value"
                >
                  github.com/loag0
                </a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon-wrap">
                <FontAwesomeIcon icon={faLinkedin} />
              </div>
              <div>
                <p className="contact-label">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/loago-moremi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value"
                >
                  linkedin.com/in/loago-moremi
                </a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon-wrap">
                <FontAwesomeIcon icon={faLocationPin} />
              </div>
              <div>
                <p className="contact-label">Location</p>
                <p className="contact-plain">Francistown, BW</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Index() {
  const [activePane, setActivePane] = useState("This User");
  const [history, setHistory] = useState(["This User"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({ "This User": true });

  const toggleFolder = (pane) => {
    setExpandedFolders((prev) => ({ ...prev, [pane]: !prev[pane] }));
  };
  const sidebarRef = useRef(null);
  const clickSoundRef = useRef(null);

  const paneCount = {
    "This User": "4 items",
    Drivers: `${Object.values(skills).flat().length} items`,
    "Program Files": `${projects.length} items`,
    "Event Logs": `${experience.length} items`,
    Network: "4 items",
  };

  useEffect(() => {
    clickSoundRef.current = new Audio("/assets/mouse-click.mp3");
    clickSoundRef.current.volume = 0.6;
  }, []);

  const playClick = () => {
    try {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play();
      //eslint-disable-next-line no-empty , no-unused-vars
    } catch (_) {}
  };

  const navigateTo = (pane) => {
    if (pane === activePane) return;
    playClick();
    const newHistory = [...history.slice(0, historyIndex + 1), pane];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActivePane(pane);
    setSidebarOpen(false);
  };

  const goBack = () => {
    if (historyIndex <= 0) return;
    playClick();
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setActivePane(history[newIndex]);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    playClick();
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    setActivePane(history[newIndex]);
  };

  const canBack = historyIndex > 0;
  const canForward = historyIndex < history.length - 1;

  useEffect(() => {
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sidebarOpen]);

  return (
    <div className="explorer-window">
      <div className="titlebar">
        <WinBtns />
        <div className="titlebar-left">
          <FolderIcon size={16} />
          {activePane} · Loago Moremi
        </div>
        <button
          className={`mobile-menu-btn ${sidebarOpen ? "mobile-menu-btn--open" : ""}`}
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <span className="mobile-menu-bar" />
          <span className="mobile-menu-bar" />
          <span className="mobile-menu-bar" />
        </button>
      </div>

      <div className="toolbar">
        <button
          className="toolbar-btn"
          onClick={goBack}
          disabled={!canBack}
          style={{
            opacity: canBack ? 1 : 0.4,
            cursor: canBack ? "pointer" : "default",
          }}
        >
          &#9664; Back
        </button>
        <button
          className="toolbar-btn"
          onClick={goForward}
          disabled={!canForward}
          style={{
            opacity: canForward ? 1 : 0.4,
            cursor: canForward ? "pointer" : "default",
          }}
        >
          Forward &#9654;
        </button>
        <div className="toolbar-sep" />
        <button className="toolbar-btn" onClick={() => navigateTo("This User")}>
          &#9650; Up
        </button>
        <div className="toolbar-sep" />
      </div>

      <div className="addrbar">
        <span className="addrbar-label">Address</span>
        <div className="addrbar-path">{breadcrumb(activePane)}</div>
        <div className="addrbar-search">Search Loago Moremi...</div>
      </div>

      <div className="explorer-body">
        <div
          className={`sidebar ${sidebarOpen ? "mobile-open" : ""}`}
          ref={sidebarRef}
        >
          <div className="sidebar-section-head">Folders</div>
          {PANES.map((pane) => (
            <div key={pane}>
              <div
                className={`sidebar-item ${activePane === pane ? "active" : ""}`}
                onClick={() => {
                  navigateTo(pane);
                  toggleFolder(pane);
                }}
              >
                <span
                  className="sidebar-chevron"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(pane);
                  }}
                >
                  <ChevronIcon open={!!expandedFolders[pane]} />
                </span>
                <FolderIcon size={15} />
                {pane}
              </div>
              {expandedFolders[pane] && (
                <div className="sidebar-file-list">
                  {PANE_FILES[pane].map((file) => (
                    <div
                      key={file.name}
                      className="sidebar-file-item"
                      onClick={() => navigateTo(pane)}
                    >
                      <FileIcon ext={file.ext} size={13} />
                      <span className="sidebar-file-name">
                        {file.name}
                        <span className="sidebar-file-ext">{file.ext}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="main-pane">
          {activePane === "This User" && <AboutPane />}
          {activePane === "Drivers" && <SkillsPane />}
          {activePane === "Program Files" && <ProjectsPane />}
          {activePane === "Event Logs" && <ExperiencePane />}
          {activePane === "Network" && <ContactPane />}
        </div>
      </div>

      <div className="statusbar">
        <span>{paneCount[activePane]}</span>
        <span>
          <span className="status-dot" />
          Open to opportunities · Francistown, BW
        </span>
      </div>
    </div>
  );
}
