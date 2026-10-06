import "./styles/index.css";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faLocationPin,
  faArrowUpRightFromSquare,
  faCaretRight,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import { experience } from "./data/experience";
import {
  QuickExplorerIcon,
  QuickIEIcon,
  QuickWMPIcon,
  PaintIcon,
  StartLogo,
  TrayNetworkIcon,
  TrayVolumeIcon,
} from "./components/Win7TaskbarIcons";

const FAVORITE_LINKS = [
  {
    name: "Desktop",
    icon: "/assets/icons/desktop.png",
  },
  {
    name: "Downloads",
    icon: "/assets/icons/downloads.png",
  },
  {
    name: "Recent Places",
    icon: "/assets/icons/recent.png",
  },
];

const LIBRARY_LINKS = [
  {
    name: "This User",
    icon: "/assets/icons/user.png",
  },
  {
    name: "Drivers",
    icon: "/assets/icons/drivers.png",
  },
  {
    name: "Program Files",
    icon: "/assets/icons/program_files.png",
  },
  {
    name: "Event Logs",
    icon: "/assets/icons/xp.png",
  },
];

const SIDEBAR_COMPUTER = [
  {
    name: "Local Disk (C:)",
    icon: "/assets/icons/c_drive.png",
  },
  {
    name: "DVD Drive (D:)",
    icon: "/assets/icons/dvd_drive.png",
  },
];

function ComputerIcon() {
  return (
    <img 
      src="/assets/icons/computa.png" 
      alt="" 
    className="sidebar-link-icon" />
  );
}

const breadcrumb = (pane) => (
  <>
    <ComputerIcon/>
    <FontAwesomeIcon icon={faCaretRight} />
    <span>Loago Moremi</span>
    <FontAwesomeIcon icon={faCaretRight} />
    <span>{pane}</span>
  </>
);

function FolderIcon() {
  return (
    <img
      src="/assets/icons/Fe.webp"
      alt=""
      className="sidebar-link-icon" 
    />
  );
}

function Win7Btns() {
  const isMac = /Macintosh|Mac OS X/i.test(navigator.userAgent);

  if (isMac) {
    return (
      <div className="mac-btns">
        <button className="mac-btn mac-btn--close" title="Close" />
        <button className="mac-btn mac-btn--min" title="Minimize" />
        <button className="mac-btn mac-btn--max" title="Zoom" />
      </div>
    );
  }

  return (
    <div className="win7-btns">
      <button className="win7-btn win7-btn--min" title="Minimize" />
      <button className="win7-btn win7-btn--max" title="Maximize" />
      <button className="win7-btn win7-btn--close" title="Close" />
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
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/images/profile-360.webp 360w, /assets/images/profile-720.webp 720w"
                sizes="(max-width: 768px) 140px, 180px"
              />
              <img
                src="/assets/images/profile-360.webp"
                alt="Loago Moremi"
                width="180"
                height="240"
                fetchPriority="high"
              />
            </picture>
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
              <h1 className="about-name" style={{ marginBottom: 0 }}>
                Loago Moremi
              </h1>
            </div>
            <p className="about-role">
              Computer Science Graduate · Software Developer & UI Enthusiast
            </p>
            <div className="about-body">
              <p>
                I'm a computer science graduate who learns the hard way on
                purpose. One of my favorite pastimes (maybe not so favorite) is
                building something, breaking it, staring at the error for 20
                minutes, then figuring out why it broke. Most of what I know
                came from debugging stuff that had no business working in the
                first place - including my hackintosh era.
              </p>
              <p>
                I gravitated toward frontend development because I'm obsessed
                with the way software looks, feels, and behaves. I care a lot
                about the details that make a product enjoyable to use, and I
                want to build software that I'd actually want to use myself. At
                the same time, I've been expanding beyond the frontend into
                backend development, working with Python, APIs, databases, and
                the systems that make applications actually work.
              </p>
              <p>
                I also like building things around problems I encounter in
                everyday life, which has led me to explore everything from
                AI-powered productivity tools to an audio converter for
                customizing the notification sounds on my phone. I’m less
                interested in sticking to one particular stack and more
                interested in learning whatever I need to turn an idea into
                something that works.
              </p>
            </div>
            <div className="about-meta">
              <span className="meta-chip">
                <FontAwesomeIcon
                  icon={faLocationPin}
                  style={{ marginRight: 5, fontSize: 10 }}
                />
                Tati Siding, BW
              </span>
              <span className="meta-chip">BIUST Alumnus</span>
              <a
                href="/assets/documents/Loago_Moremi_CV.pdf"
                onClick={(e) => {
                  e.preventDefault();
                  window.open("/assets/documents/Loago_Moremi_CV.pdf", "_blank", "noopener,noreferrer");
                }}
                className="toolbar-btn toolbar-btn--primary"
                style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                
              >
                
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                View my CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SkillsPane({ onSelect, selectedItem, playClick }) {
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
                  <span
                    key={skill}
                    className={`skill-tag ${
                      selectedItem?.name === skill ? "selected" : ""
                    }`}
                    onClick={() => {
                      playClick();
                      onSelect({
                        name: skill,
                        itemType: "skill",
                        category,
                      })
                    }}
                  >
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

function ProjectsPane({ onSelect, selectedItem, playClick }) {
  const completedProjects = projects.filter(
    (project) => project.status === "completed",
  );

  const exploringProjects = projects.filter(
    (project) => project.status === "exploring",
  );

  const renderProject = (project) => (
    <div
      key={project.id}
      className={`project-row ${
        selectedItem?.id === project.id ? "selected" : ""
      }`}
      onClick={() => {
        playClick();
        onSelect({
          ...project,
          itemType: "project",
        });
      }}
    >
      <div>
        <div className="project-label-row">
          <span
            className={`project-badge ${
              project.label === "In Progress" ? "coming" : ""
            }`}
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

      {project.link && project.visibility !== "private" && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link-btn"
        >
          <FontAwesomeIcon icon={faGithub} style={{ width: 12, height: 12 }} />
          View on GitHub
        </a>
      )}
    </div>
  );

  return (
    <>
      <div className="pane-header">
        <span className="pane-title">Program Files</span>
        <span className="pane-count">{completedProjects.length} items</span>
      </div>

      <div className="pane-content">
        <div className="projects-list">
          {completedProjects.map(renderProject)}

          {exploringProjects.length > 0 && (
            <div className="projects-section-divider">
              <span>Currently Exploring</span>
            </div>
          )}

          {exploringProjects.map(renderProject)}
        </div>
      </div>
    </>
  );
}
function ExperiencePane({ onSelect, selectedItem, playClick }) {
  return (
    <>
      <div className="pane-header">
        <span className="pane-title">Event Logs</span>
        <span className="pane-count">{experience.length} items</span>
      </div>
      <div className="pane-content">
        <div className="experience-list">
          {experience.map((job) => (
            <div
              key={job.id}
              className={`exp-row ${
                selectedItem?.id === job.id ? "selected" : ""
              }`}
              onClick={() => {
                playClick();
                onSelect({
                  ...job,
                  itemType: "experience",
                });
              }}
            >
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

function Taskbar({ clockTime, clockDate }) {
  return (
    <div className="taskbar">
      <div className="taskbar-start-tooltip" data-tooltip="Start">
        <div className="taskbar-start-orb">
          <StartLogo />
        </div>
      </div>
      <div className="taskbar-sep-v" />
      <div className="taskbar-quicklaunch">
        <button
          className="taskbar-ql-btn"
          tabIndex={-1}
          data-tooltip="Internet Explorer"
        >
          <QuickIEIcon />
        </button>
        <button
          className="taskbar-ql-btn"
          tabIndex={-1}
          data-tooltip="Windows Media Player"
        >
          <QuickWMPIcon />
        </button>
        <button
          className="taskbar-window-chip taskbar-window-chip--active"
          tabIndex={-1}
          data-tooltip="Loago Moremi - File Explorer"
        >
          <QuickExplorerIcon />
        </button>
        <button
          className="taskbar-ql-btn taskbar-ql-btn--show-desktop"
          tabIndex={-1}
          data-tooltip="Microsoft Paint"
        >
          <PaintIcon />
        </button>
      </div>
      <div className="taskbar-sep-v" />
      <div style={{ flex: 1 }} />
      <div className="taskbar-sep-v" />
      <div className="taskbar-tray">
        <span className="taskbar-tray-text">ENG</span>
        <span data-tooltip="Volume">
          <TrayVolumeIcon />
        </span>
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
  const [isNavigating, setIsNavigating] = useState(false);
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

  const [burning, setBurning] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [commandMenu, setCommandMenu] = useState(null);

  const getStatus = () => {
    if (selectedItem) {
      switch (selectedItem.itemType) {
        case "project":
          return {
            name: selectedItem.title,
            type: selectedItem.label,
            icon: "/assets/icons/program_files.png",
            fields: [
              ["Date", selectedItem.date || "-"],
              [
                "Status",
                selectedItem.status === "completed"
                  ? "Completed"
                  : "Currently Exploring",
              ],
            ],
          };

        case "experience":
          return {
            name: selectedItem.title,
            type: "Experience",
            icon: selectedItem.logo || "/assets/icons/xp.png",
            fields: [["Date", selectedItem.date || "-"]],
          };

        case "skill":
          return {
            name: selectedItem.name,
            type: "Skill",
            icon: "/assets/icons/drivers.png",
            fields: [["Category", selectedItem.category || "-"]],
          };

        default:
          return {
            name: "Unknown Item",
            type: "File",
            details: [],
            tags: [],
          };
      }
    }

    const folderInfo = {
      "This User": {
        count: 4,
        icon: "/assets/icons/user.png",
      },
      Drivers: {
        count: Object.values(skills).flat().length,
        icon: "/assets/icons/drivers.png",
      },
      "Program Files": {
        count: projects.length,
        icon: "/assets/icons/program_files.png",
      },
      "Event Logs": {
        count: experience.length,
        icon: "/assets/icons/xp.png",
      },
      Network: {
        count: 4,
        icon: "/assets/icons/network.png",
      },
    };

    const info = folderInfo[activePane];

    return {
      name: activePane,
      type: "Folder",
      icon: info?.icon || "/assets/icons/folder.png",
      fields: [["Items", `${info?.count ?? 0} items`]],
    };
  };

  const status = getStatus();

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

  const sidebarRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const clickSoundRef = useRef(null);
  const fireSoundRef = useRef(null);

  useEffect(() => {
    clickSoundRef.current = new Audio("/assets/audio/mouse-click.mp3");
    clickSoundRef.current.volume = 0.6;
  }, []);

  const playClick = () => {
    try {
      if (!clickSoundRef.current) return;
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
      //eslint-disable-next-line no-empty , no-unused-vars
    } catch (_) {}
  };

  useEffect(() => {
    fireSoundRef.current = new Audio("/assets/audio/fire.mp3");
    fireSoundRef.current.volume = 0.7;
  }, []);

  const playFireSound = () => {
    if (!fireSoundRef.current) return;

    fireSoundRef.current.currentTime = 0;
    fireSoundRef.current.play().catch(() => {});

    window.setTimeout(() => {
      fireSoundRef.current?.pause();
      if (fireSoundRef.current) {
        fireSoundRef.current.currentTime = 0;
      }
    }, 3500);
  };

  const navigateTo = (pane) => {
    if (pane === activePane) return;

    playClick();
    setSelectedItem(null);
    setCommandMenu(null);

    setIsNavigating(true);

    const newHistory = [...history.slice(0, historyIndex + 1), pane];

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActivePane(pane);

    window.setTimeout(() => setIsNavigating(false), 280);
  };

  const goBack = () => {
    if (historyIndex <= 0) return;

    playClick();
    setSelectedItem(null);
    setCommandMenu(null);

    const newIndex = historyIndex - 1;

    setIsNavigating(true);
    setHistoryIndex(newIndex);
    setActivePane(history[newIndex]);

    window.setTimeout(() => setIsNavigating(false), 280);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;

    playClick();
    setSelectedItem(null);
    setCommandMenu(null);

    const newIndex = historyIndex + 1;

    setIsNavigating(true);
    setHistoryIndex(newIndex);
    setActivePane(history[newIndex]);
    
    window.setTimeout(() => setIsNavigating(false), 280);
  };

  const canBack = historyIndex > 0;
  const canForward = historyIndex < history.length - 1;

  const handleCommand = (command) => {
    switch (command) {
      case "organize":
        setCommandMenu((current) =>
          current === "organize" ? null : "organize",
        );
        break;

      case "view":
        //setViewMode((current) => (current === "icons" ? "details" : "icons"));
        setCommandMenu(null);
        break;

      case "open":
        if (selectedItem?.link) {
          window.open(selectedItem.link, "_blank", "noopener,noreferrer");
        }
        break;

      case "preview":
        //setPreviewOpen((current) => !current);
        break;

      case "properties":
        //setPropertiesOpen(true);
        break;

      case "github":
        window.open("https://github.com/loag0", "_blank");
        break;

      case "print":
        window.print();
        break;

      case "help":
        //setHelpOpen(true);
        break;

      case "burn":
        playFireSound();

        setBurning(false);

        requestAnimationFrame(() => {
          setBurning(true);
        });

        window.setTimeout(() => {
          setBurning(false);
        }, 3500);

        break;

      default:
        break;
    }

    setCommandMenu(null);
  };

  useEffect(() => {
    const handler = (e) => {
      const clickedSidebar = sidebarRef.current?.contains(e.target);
      const clickedMenuButton = mobileMenuButtonRef.current?.contains(e.target);

      if (!clickedSidebar && !clickedMenuButton) {
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
          {/*<div className="titlebar">*/}
          <div
            className={`titlebar ${/Macintosh|Mac OS X/i.test(navigator.userAgent) ? "titlebar--mac" : ""}`}
          >
            <Win7Btns />
            <button
              ref={mobileMenuButtonRef}
              className={`mobile-menu-btn ${sidebarOpen ? "mobile-menu-btn--open" : ""}`}
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              data-tooltip="Toggle sidebar"
            >
              <span className="mobile-menu-bar" />
              <span className="mobile-menu-bar" />
              <span className="mobile-menu-bar" />
            </button>
          </div>

          <div className="toolbar">
            <div className="toolbar-nav-group">
              <button
                className="toolbar-nav toolbar-nav--back"
                onClick={goBack}
                disabled={!canBack}
                aria-label="Back"
              />
              <button
                className="toolbar-nav toolbar-nav--fwd"
                onClick={goForward}
                disabled={!canForward}
                aria-label="Forward"
              />
            </div>

            <div className="addrbar">
              <div className="addrbar-path">{breadcrumb(activePane)}</div>

              <div className="addrbar-search">
                <span>Search Loago Moremi...</span>

                <img
                  src="/assets/icons/search.png"
                  alt=""
                  className="addrbar-search-icon"
                />
              </div>
            </div>
          </div>

          <div className="command-bar">
            <div className="command-dropdown">
              <button
                className="command-button"
                onClick={() => handleCommand("organize")}
              >
                Organize <FontAwesomeIcon icon={faCaretDown} />
              </button>

              {commandMenu === "organize" && (
                <div className="command-menu">
                  <button onClick={() => window.location.reload()}>
                    Refresh
                  </button>

                  <button onClick={() => setSelectedItem(null)}>
                    Clear Selection
                  </button>
                </div>
              )}
            </div>

            <button
              className="command-button"
              onClick={() => handleCommand("view")}
            >
              View <FontAwesomeIcon icon={faCaretDown} />
            </button>

            <button
              className="command-button"
              onClick={() => handleCommand("open")}
              disabled={!selectedItem?.link}
            >
              Open
            </button>

            <button
              className="command-button"
              onClick={() => handleCommand("preview")}
            >
              Preview
            </button>

            <button
              className="command-button"
              onClick={() => handleCommand("properties")}
            >
              Properties
            </button>

            {activePane === "Program Files" && (
              <button
                className="command-button"
                onClick={() => handleCommand("github")}
              >
                GitHub
              </button>
            )}

            {activePane === "Event Logs" && (
              <button
                className="command-button"
                onClick={() => handleCommand("print")}
              >
                Print
              </button>
            )}

            <button
              className="command-button"
              onClick={() => handleCommand("help")}
            >
              Help
            </button>

            <button
              className="command-button command-button--burn"
              onClick={() => handleCommand("burn")}
            >
              Burn
            </button>
          </div>

          <div
            className={`loading-bar ${isNavigating ? "loading-bar--active" : ""}`}
          >
            <div className="loading-bar-fill" />
          </div>

          <div className="explorer-body">
            <div
              className={`sidebar ${sidebarOpen ? "mobile-open" : ""}`}
              ref={sidebarRef}
            >
              {/* Favorites */}
              <div className="sidebar-section-title">
                <span className="sidebar-section-icon">
                  <img src="/assets/icons/favorites.ico" />
                </span>
                <span>Favorites</span>
              </div>

              <div className="sidebar-group sidebar-group--indented">
                {FAVORITE_LINKS.map((link) => (
                  <div
                    key={link.name}
                    className="sidebar-link-item"
                    onClick={() => {
                      if (link.name === "Desktop") {
                        navigateTo("This User");
                      }
                    }}
                  >
                    <img src={link.icon} alt="" className="sidebar-link-icon" />
                    <span>{link.name}</span>
                  </div>
                ))}
              </div>

              {/* Libraries */}
              <div className="sidebar-section-title sidebar-section-title--libraries">
                <span className="sidebar-section-icon">
                  <FolderIcon size={14} />
                </span>
                <span>Libraries</span>
              </div>

              <div className="sidebar-group sidebar-group--indented">
                {LIBRARY_LINKS.map((pane) => (
                  <div key={pane.name}>
                    <div
                      className={`sidebar-item ${
                        activePane === pane.name ? "active" : ""
                      }`}
                      onClick={() => {
                        navigateTo(pane.name);
                      }}
                    >
                      <img
                        src={pane.icon}
                        alt=""
                        className="sidebar-link-icon sidebar-library-icon"
                      />
                      <span>{pane.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Computer */}
              <div className="sidebar-section-title sidebar-section-title--computer">
                <span className="sidebar-section-icon">
                  <img
                    src="/assets/icons/computa.png"
                    alt=""
                    className="sidebar-link-icon"
                  />
                </span>
                <span>Computer</span>
              </div>

              <div className="sidebar-group sidebar-group--indented">
                {SIDEBAR_COMPUTER.map((item) => (
                  <div
                    key={item.name}
                    className={`sidebar-item ${
                      activePane === item.name ? "active" : ""
                    }`}
                    onClick={() => navigateTo("This User")}
                  >
                    <span className="sidebar-chevron sidebar-chevron--empty" />

                    <img
                      src={item.icon}
                      alt=""
                      className="sidebar-link-icon sidebar-library-icon"
                    />

                    <span className="sidebar-item-label">{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="sidebar-section-title sidebar-section-title--network">
                <span className="sidebar-section-icon">
                  <img
                    src="/assets/icons/network.png"
                    alt=""
                    className="sidebar-link-icon"
                  />
                </span>
                <span>Network</span>
              </div>
            </div>

            <div className="main-pane">
              <div key={activePane} className="pane-shell">
                {activePane === "This User" && <AboutPane />}

                {activePane === "Drivers" && (
                  <SkillsPane
                    onSelect={setSelectedItem}
                    selectedItem={selectedItem}
                    playClick={playClick}
                  />
                )}

                {activePane === "Program Files" && (
                  <ProjectsPane
                    onSelect={setSelectedItem}
                    selectedItem={selectedItem}
                    playClick={playClick}
                  />
                )}

                {activePane === "Event Logs" && (
                  <ExperiencePane
                    onSelect={setSelectedItem}
                    selectedItem={selectedItem}
                    playClick={playClick}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="statusbar">
            <div className="statusbar-icon">
              <img src={status.icon} alt="" />
            </div>

            <div className="statusbar-info">
              <div className="statusbar-row">
                <span className="statusbar-key">Name</span>
                <strong className="statusbar-value">{status.name}</strong>
              </div>

              <div className="statusbar-row">
                <span className="statusbar-key">Type</span>
                <span className="statusbar-value">{status.type}</span>
              </div>

              {status.fields.map(([key, value]) => (
                <div className="statusbar-row" key={key}>
                  <span className="statusbar-key">{key}</span>
                  <span className="statusbar-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="icons8-credit">
          <a
            href="https://icons8.com/icon/17854/windows-xp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Windows XP
          </a>{" "}
          icon by{" "}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
        </div>
      </div>
      {burning && (
        <div className="burn-overlay">
          <img src="/assets/burn-elmo.gif" alt="" />
        </div>
      )}
      <Taskbar clockTime={clock.time} clockDate={clock.date} />
    </>
  );
}
