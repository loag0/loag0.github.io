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

const StartLogo = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    {/* Wavy flag — perspective converges upper-right, outer edges curve outward */}
    <path
      d="M0.8 2.2 C2 0.8, 5.2 0.8, 6.8 1.4 C7 2, 7 4.8, 6.8 7 C5 6.8, 1.8 7.2, 0.6 7.5 Z"
      fill="#e83820"
    />
    <path
      d="M7.5 1.1 C9.8 0.3, 12.8 0.2, 14.8 0.7 L14.5 6.8 L7.5 7 Z"
      fill="#7ab800"
    />
    <path
      d="M0.6 7.8 C1.8 7.5, 5 7.8, 6.8 7.8 C7 10, 6.8 13.5, 6.8 14.6 C5 14.2, 1.8 14.4, 0.8 13.2 Z"
      fill="#00a0ee"
    />
    <path
      d="M7.5 7.8 L14.5 7.5 L14.5 14.2 C12.5 15, 9.8 15.2, 7.5 14.8 Z"
      fill="#f8b000"
    />
  </svg>
);

/* IE8: blue globe + white latitude/longitude lines + orange orbital ring + "e" */
const QuickIEIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8.5" fill="#1565c8" />
    <circle cx="10" cy="10" r="8.5" fill="url(#ieSphere)" opacity="0.4" />
    {/* globe lines */}
    <ellipse
      cx="10"
      cy="10"
      rx="8.5"
      ry="4.2"
      fill="none"
      stroke="rgba(160,210,255,0.55)"
      strokeWidth="0.7"
    />
    <ellipse
      cx="10"
      cy="10"
      rx="3.8"
      ry="8.5"
      fill="none"
      stroke="rgba(160,210,255,0.55)"
      strokeWidth="0.7"
    />
    <line
      x1="1.5"
      y1="10"
      x2="18.5"
      y2="10"
      stroke="rgba(160,210,255,0.55)"
      strokeWidth="0.7"
    />
    {/* orange orbital ring */}
    <path
      d="M 3 5 A 9 9 0 0 1 18 12"
      stroke="#f09030"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    {/* e letter — three bars */}
    <path
      d="M7.5 10.8 Q7.5 8, 10 8 Q12.5 8, 12.5 10.8 L7.5 10.8"
      stroke="white"
      strokeWidth="1.1"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M7.5 10.8 Q7.5 14, 10.5 14 Q12.5 14, 13.2 12.8"
      stroke="white"
      strokeWidth="1.1"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

/* WMP: dark navy disc + orange concentric halo arcs + white play triangle */
const QuickWMPIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" fill="#0a1a3a" />
    <circle
      cx="10"
      cy="10"
      r="9"
      fill="none"
      stroke="#1a3060"
      strokeWidth="0.5"
    />
    {/* outer orange halo arcs */}
    <path
      d="M3.5 10 A6.5 6.5 0 0 1 10 3.5"
      stroke="#f06810"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M10 16.5 A6.5 6.5 0 0 1 3.5 10"
      stroke="#f06810"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M16.5 10 A6.5 6.5 0 0 1 10 16.5"
      stroke="#e0a020"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M10 3.5 A6.5 6.5 0 0 1 16.5 10"
      stroke="#e0a020"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    {/* inner dark disc */}
    <circle cx="10" cy="10" r="4.5" fill="#0d2040" />
    {/* play triangle */}
    <path d="M8.2 7.8 L13.8 10 L8.2 12.2 Z" fill="white" />
  </svg>
);

/* Windows Explorer: yellow folder + blue orbital swoop underneath */
const QuickExplorerIcon = () => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    {/* blue orbital band behind folder */}
    <ellipse
      cx="10"
      cy="14"
      rx="9"
      ry="2.5"
      fill="none"
      stroke="#3a80d0"
      strokeWidth="1.8"
      opacity="0.7"
    />
    {/* folder body */}
    <rect x="1" y="5" width="18" height="11" rx="1.5" fill="#e8a820" />
    <rect x="1" y="7.5" width="18" height="8.5" rx="1.5" fill="#f8c030" />
    <rect x="1" y="5" width="7.5" height="3.5" rx="1.5" fill="#e8a820" />
    {/* folder highlight */}
    <rect
      x="3"
      y="9.5"
      width="14"
      height="1"
      rx="0.5"
      fill="rgba(255,255,255,0.3)"
    />
  </svg>
);

/* Show Desktop: tiny desktop/screen icon */
const ShowDesktopIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="1"
      y="1.5"
      width="14"
      height="10"
      rx="1"
      fill="none"
      stroke="rgba(255,255,255,0.7)"
      strokeWidth="1.2"
    />
    <rect
      x="1"
      y="1.5"
      width="14"
      height="2"
      rx="1"
      fill="rgba(255,255,255,0.3)"
    />
    <rect
      x="5"
      y="12"
      width="6"
      height="1.5"
      rx="0.5"
      fill="rgba(255,255,255,0.6)"
    />
    <rect
      x="2.5"
      y="13.5"
      width="11"
      height="1"
      rx="0.5"
      fill="rgba(255,255,255,0.5)"
    />
  </svg>
);

const SIDEBAR_COMPUTER = [
  {
    name: "My Computer",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="13"
          height="9"
          rx="1"
          fill="#6898d0"
          stroke="#4a78b8"
          strokeWidth="0.7"
        />
        <rect x="1.5" y="1.5" width="11" height="7" rx="0.5" fill="#a8c8f0" />
        <rect x="3.5" y="10" width="7" height="1.5" rx="0.5" fill="#5a88c0" />
        <rect x="2" y="11.5" width="10" height="1" rx="0.5" fill="#4a78b8" />
      </svg>
    ),
  },
  {
    name: "Network",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle
          cx="7"
          cy="3"
          r="2"
          fill="#5a88c0"
          stroke="#3a68a8"
          strokeWidth="0.6"
        />
        <circle
          cx="2.5"
          cy="11"
          r="1.8"
          fill="#5a88c0"
          stroke="#3a68a8"
          strokeWidth="0.6"
        />
        <circle
          cx="11.5"
          cy="11"
          r="1.8"
          fill="#5a88c0"
          stroke="#3a68a8"
          strokeWidth="0.6"
        />
        <line
          x1="7"
          y1="5"
          x2="2.5"
          y2="9.2"
          stroke="#3a68a8"
          strokeWidth="0.9"
        />
        <line
          x1="7"
          y1="5"
          x2="11.5"
          y2="9.2"
          stroke="#3a68a8"
          strokeWidth="0.9"
        />
      </svg>
    ),
  },
  {
    name: "Local Disk (C:)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="1"
          y="3"
          width="12"
          height="8"
          rx="1"
          fill="#c8d8e8"
          stroke="#8a9ab8"
          strokeWidth="0.7"
        />
        <rect x="1" y="3" width="12" height="3" rx="1" fill="#a8b8d0" />
        <circle cx="11" cy="4.5" r="0.8" fill="#d0e8f8" />
        <rect x="3" y="8" width="5" height="1" rx="0.5" fill="#6888aa" />
      </svg>
    ),
  },
  {
    name: "DVD Drive (D:)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle
          cx="7"
          cy="7"
          r="6"
          fill="#d8d8d8"
          stroke="#a0a0a8"
          strokeWidth="0.7"
        />
        <circle
          cx="7"
          cy="7"
          r="3.5"
          fill="none"
          stroke="#b0b8c8"
          strokeWidth="0.5"
        />
        <circle cx="7" cy="7" r="1.2" fill="#8898b0" />
        <path
          d="M3 4.5Q7 2 11 4.5"
          stroke="rgba(100,130,180,0.4)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Removable (E:)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="4"
          y="1"
          width="6"
          height="10"
          rx="1"
          fill="#c8c8d8"
          stroke="#8888a0"
          strokeWidth="0.7"
        />
        <rect x="5.5" y="2.5" width="3" height="1.5" rx="0.5" fill="#8888a0" />
        <rect
          x="3"
          y="11"
          width="8"
          height="2"
          rx="0.5"
          fill="#a0a0b8"
          stroke="#7878a0"
          strokeWidth="0.5"
        />
      </svg>
    ),
  },
];

const TrayVolumeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 5h2l3-3v10l-3-3H2V5z" fill="rgba(255,255,255,0.8)" />
    <path
      d="M9 4.5c1.1.8 1.8 2 1.8 3.5s-.7 2.7-1.8 3.5"
      stroke="rgba(255,255,255,0.8)"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const TrayNetworkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect
      x="1"
      y="10"
      width="2"
      height="3"
      rx="0.5"
      fill="rgba(255,255,255,0.8)"
    />
    <rect
      x="4"
      y="7.5"
      width="2"
      height="5.5"
      rx="0.5"
      fill="rgba(255,255,255,0.8)"
    />
    <rect
      x="7"
      y="5"
      width="2"
      height="8"
      rx="0.5"
      fill="rgba(255,255,255,0.8)"
    />
    <rect
      x="10"
      y="2"
      width="2"
      height="11"
      rx="0.5"
      fill="rgba(255,255,255,0.8)"
    />
  </svg>
);

const FAVORITE_LINKS = [
  {
    name: "Desktop",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="12"
          height="9"
          rx="1"
          fill="#7aaac8"
          stroke="#4a8ab8"
          strokeWidth="0.8"
        />
        <rect x="3" y="10" width="7" height="2" rx="0.5" fill="#7aaac8" />
        <rect x="1" y="12" width="11" height="0.8" rx="0.4" fill="#4a8ab8" />
      </svg>
    ),
  },
  {
    name: "Recent Places",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle
          cx="6.5"
          cy="6.5"
          r="5.5"
          stroke="#7aaac8"
          strokeWidth="0.9"
          fill="none"
        />
        <path
          d="M6.5 3.5V6.5L8.5 8"
          stroke="#7aaac8"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Downloads",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M6.5 1v8M3.5 6.5l3 3 3-3"
          stroke="#7aaac8"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M1 11h11"
          stroke="#7aaac8"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Public",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle
          cx="6.5"
          cy="4"
          r="2.5"
          stroke="#7aaac8"
          strokeWidth="0.9"
          fill="none"
        />
        <path
          d="M1.5 12c0-2.8 2.2-5 5-5s5 2.2 5 5"
          stroke="#7aaac8"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
];

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

function Win7Btns() {
  return (
    <div className="win7-btns">
      <button className="win7-btn win7-btn--min" title="Minimize">
        &#8211;
      </button>
      <button className="win7-btn win7-btn--max" title="Maximize">
        &#9633;
      </button>
      <button className="win7-btn win7-btn--close" title="Close">
        &#10005;
      </button>
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
            <img src="/assets/profile.jpg" alt="Loago Moremi" loading="lazy" />
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

function Taskbar({ clockTime, clockDate }) {
  return (
    <div className="taskbar">
      <div className="taskbar-start-orb">
        <StartLogo />
      </div>
      <div className="taskbar-sep-v" />
      <div className="taskbar-quicklaunch">
        <button
          className="taskbar-ql-btn"
          tabIndex={-1}
          title="Internet Explorer"
        >
          <QuickIEIcon />
        </button>
        <button
          className="taskbar-ql-btn"
          tabIndex={-1}
          title="Windows Media Player"
        >
          <QuickWMPIcon />
        </button>
        <button
          className="taskbar-ql-btn"
          tabIndex={-1}
          title="Windows Explorer"
        >
          <QuickExplorerIcon />
        </button>
        <button
          className="taskbar-ql-btn taskbar-ql-btn--show-desktop"
          tabIndex={-1}
          title="Show Desktop"
        >
          <ShowDesktopIcon />
        </button>
      </div>
      <div className="taskbar-sep-v" />
      <button
        className="taskbar-window-chip taskbar-window-chip--active"
        tabIndex={-1}
        title="Loago Moremi - File Explorer"
      >
        <QuickExplorerIcon />
      </button>
      <div style={{ flex: 1 }} />
      <div className="taskbar-sep-v" />
      <div className="taskbar-tray">
        <span className="taskbar-tray-text">ENG</span>
        <TrayVolumeIcon />
        <TrayNetworkIcon />
        <div className="taskbar-sep-v" />
        <div className="taskbar-clock">
          <span>{clockTime}</span>
          <span>{clockDate}</span>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activePane, setActivePane] = useState("This User");
  const [history, setHistory] = useState(["This User"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({ "This User": true });
  const [clock, setClock] = useState(() => {
    const now = new Date();
    return {
      time: now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: now.toLocaleDateString("en-GB"),
    };
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setClock({
        time: now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: now.toLocaleDateString("en-GB"),
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

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
    <>
      <div className="desktop">
        <div className="explorer-window">
          <div className="titlebar">
            <Win7Btns />
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
            <button
              className="toolbar-btn"
              onClick={() => navigateTo("This User")}
            >
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
              <div className="sidebar-section-head">Favorite Links</div>
              {FAVORITE_LINKS.map((link) => (
                <div
                  key={link.name}
                  className="sidebar-link-item"
                  onClick={() => navigateTo("This User")}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </div>
              ))}
              <div className="sidebar-divider" />
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
              <div className="sidebar-divider" />
              <div className="sidebar-section-head">My Computer</div>
              {SIDEBAR_COMPUTER.map((item) => (
                <div key={item.name} className="sidebar-link-item">
                  {item.icon}
                  <span>{item.name}</span>
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
      </div>
      <Taskbar clockTime={clock.time} clockDate={clock.date} />
    </>
  );
}
