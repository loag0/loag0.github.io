import "./styles/index.css";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { buildTree, getNode, pickSelection } from "./model/tree.js";
import {
  FOLDERS,
  FOLDER_ICONS,
  getFolderConfig,
  getGroup,
  getView,
  saveGroup,
  saveView,
  viewKey,
} from "./model/folderConfig.js";
import {
  COLUMNS,
  GROUPABLE,
  getStatusInfo,
  groupRows,
  sortChildren,
} from "./model/viewModel.js";
import { DEFAULT_PREVIEW } from "./model/layout.js";
import { buildSearchIndex, searchIndex } from "./model/search.js";
import { isCoarse } from "./components/pointer.js";
import FolderView from "./components/FolderView.jsx";
import Preview from "./components/Preview.jsx";
import SearchResults from "./components/SearchResults.jsx";
import SplitPane from "./components/SplitPane.jsx";
import NotFoundDialog from "./components/NotFoundDialog.jsx";
import Taskbar from "./components/Taskbar.jsx";
import { NodeIcon } from "./components/Icons.jsx";

const TREE = buildTree();
const SEARCH_INDEX = buildSearchIndex(TREE);
const START_PATH = [FOLDERS.user];

const VIEW_OPTIONS = [
  ["icons", "Large icons"],
  ["list", "List"],
  ["details", "Details"],
];

const FAVORITE_LINKS = [
  { name: "Desktop", icon: "/assets/icons/desktop.png" },
  { name: "Downloads", icon: "/assets/icons/downloads.png" },
  { name: "Recent Places", icon: "/assets/icons/recent.png" },
];

const LIBRARY_LINKS = Object.values(FOLDERS).map((name) => ({
  name,
  icon: FOLDER_ICONS[name],
}));

const SIDEBAR_COMPUTER = [
  { name: "Local Disk (C:)", icon: "/assets/icons/c_drive.png" },
  { name: "DVD Drive (D:)", icon: "/assets/icons/dvd_drive.png" },
];

const isMac = () => /Macintosh|Mac OS X/i.test(navigator.userAgent);

function ComputerIcon() {
  return (
    <img src="/assets/icons/computa.png" alt="" className="sidebar-link-icon" />
  );
}

function FolderIcon() {
  return (
    <img src="/assets/icons/Fe.webp" alt="" className="sidebar-link-icon" />
  );
}

function Win7Btns() {
  if (isMac()) {
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

// every segment but the last one is a link back up the path
function Breadcrumb({ path, onNavigate }) {
  return (
    <>
      <ComputerIcon />
      <FontAwesomeIcon icon={faCaretRight} />
      <button className="crumb" onClick={() => onNavigate([FOLDERS.user])}>
        Loago Moremi
      </button>
      {path.map((name, i) => {
        const last = i === path.length - 1;
        return (
          <span key={path.slice(0, i + 1).join("/")} className="crumb-wrap">
            <FontAwesomeIcon icon={faCaretRight} />{" "}
            {last ? (
              <span className="crumb-current">{name}</span>
            ) : (
              <button
                className="crumb"
                onClick={() => onNavigate(path.slice(0, i + 1))}
              >
                {name}
              </button>
            )}
          </span>
        );
      })}
    </>
  );
}

// address bar while the search results are showing
function SearchCrumb({ onExit }) {
  return (
    <>
      <ComputerIcon />
      <FontAwesomeIcon icon={faCaretRight} />
      <button className="crumb" onClick={onExit}>
        Loago Moremi
      </button>
      <FontAwesomeIcon icon={faCaretRight} />
      <span className="crumb-current">Search Results</span>
    </>
  );
}

// a folder's auto-selected file, only when its preview pane is open
const autoSelect = (path) => {
  const cfg = getFolderConfig(path);
  return cfg.preview.open
    ? pickSelection(getNode(TREE, path), cfg.preview.select)
    : null;
};

// GitHub Pages serves the app for any unknown path (404.html), so anything
// other than the root gets the "Windows can't find" dialog
const KNOWN_PATHS = ["/", "/index.html"];
const missingPath = () =>
  KNOWN_PATHS.includes(window.location.pathname)
    ? null
    : `${window.location.host}${window.location.pathname}`;

const clockNow = () => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: now.toLocaleDateString("en-GB"),
  };
};

export default function Index() {
  const [history, setHistory] = useState([START_PATH]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [clock, setClock] = useState(clockNow);
  const [burning, setBurning] = useState(false);
  const [selected, setSelected] = useState(() => autoSelect(START_PATH));
  const [sorts, setSorts] = useState({});
  const [commandMenu, setCommandMenu] = useState(null);
  const [, setViewTick] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(
    () => getFolderConfig(START_PATH).preview.open,
  );
  const [previewWidth, setPreviewWidth] = useState(DEFAULT_PREVIEW);
  const [lostPath, setLostPath] = useState(missingPath);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState({
    status: "idle",
    term: "",
    results: [],
  });

  const sidebarRef = useRef(null);
  const searchRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const clickSoundRef = useRef(null);
  const fireSoundRef = useRef(null);

  const activePath = history[historyIndex];
  const folderNode = getNode(TREE, activePath);
  const cfg = getFolderConfig(activePath);
  const view = getView(activePath);
  const sortOverride = sorts[viewKey(activePath)] ?? null;
  const rows = sortChildren(folderNode.children, cfg.sort, sortOverride);
  const groupOptions = cfg.columns.filter((c) => GROUPABLE.includes(c));
  const groupKey = getGroup(activePath);
  const groups =
    groupKey && groupOptions.includes(groupKey)
      ? groupRows(rows, folderNode.children, groupKey)
      : null;
  const searching = query.trim() !== "";
  const searchDone = search.status === "done" && search.term === query.trim();
  const status =
    searching && !selected
      ? {
          node: { kind: "folder" },
          name: "Search Results",
          type: "Search",
          fields: [
            [
              "Items",
              searchDone
                ? `${search.results.length} ${search.results.length === 1 ? "item" : "items"}`
                : "Searching...",
            ],
          ],
        }
      : getStatusInfo(selected, folderNode);

  useEffect(() => {
    const id = setInterval(() => setClock(clockNow()), 1000);
    return () => clearInterval(id);
  }, []);

  // the wait is deliberate: the data is tiny, so the skeleton and the green address bar
  // are what make it feel like a real search
  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setSearch({ status: "idle", term: "", results: [] });
      return;
    }
    setSearch((s) => ({ ...s, status: "searching", term }));
    const id = window.setTimeout(
      () =>
        setSearch({
          status: "done",
          term,
          results: searchIndex(SEARCH_INDEX, term),
        }),
      500,
    );
    return () => window.clearTimeout(id);
  }, [query]);

  useEffect(() => {
    clickSoundRef.current = new Audio("/assets/audio/mouse-click.mp3");
    clickSoundRef.current.volume = 0.6;
    fireSoundRef.current = new Audio("/assets/audio/fire.mp3");
    fireSoundRef.current.volume = 0.7;
  }, []);

  const playClick = () => {
    try {
      if (!clickSoundRef.current) return;
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
      //eslint-disable-next-line no-empty , no-unused-vars
    } catch (_) {}
  };

  const playFireSound = () => {
    if (!fireSoundRef.current) return;

    fireSoundRef.current.currentTime = 0;
    fireSoundRef.current.play().catch(() => {});

    window.setTimeout(() => {
      fireSoundRef.current?.pause();
      if (fireSoundRef.current) fireSoundRef.current.currentTime = 0;
    }, 3500);
  };

  // everything that has to reset when the open folder changes
  const arrive = (path) => {
    setQuery("");
    setSelected(autoSelect(path));
    setPreviewOpen(getFolderConfig(path).preview.open);
    setCommandMenu(null);
    setIsNavigating(true);
    window.setTimeout(() => setIsNavigating(false), 280);
  };

  const exitSearch = () => {
    setQuery("");
    setSelected(autoSelect(activePath));
  };

  const navigateTo = (path) => {
    if (query) exitSearch();
    if (viewKey(path) === viewKey(activePath)) return;

    playClick();
    const next = [...history.slice(0, historyIndex + 1), path];
    setHistory(next);
    setHistoryIndex(next.length - 1);
    arrive(path);
  };

  const goBack = () => {
    if (searching) {
      exitSearch();
      return;
    }
    if (historyIndex <= 0) return;
    playClick();
    const index = historyIndex - 1;
    setHistoryIndex(index);
    arrive(history[index]);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    playClick();
    const index = historyIndex + 1;
    setHistoryIndex(index);
    arrive(history[index]);
  };

  const canBack = historyIndex > 0 || searching;
  const canForward = historyIndex < history.length - 1;

  const selectNode = (node) => {
    playClick();
    setSelected(node);
    // in project and company folders, picking a file shows it even if the pane was closed.
    // folders like Drivers keep the pane off: their previews would just repeat the row.
    if (cfg.preview.open && node.kind === "file" && node.preview)
      setPreviewOpen(true);
  };

  const onSearchInput = (value) => {
    if (!query.trim() && value.trim()) setSelected(null);
    setQuery(value);
  };

  // a result opens the folder that holds it, with the file selected
  const openResult = (r) => {
    const target = r.node.kind === "folder" ? [...r.path, r.node.name] : r.path;
    navigateTo(target);
    if (r.node.kind === "file") {
      setSelected(r.node);
      if (getFolderConfig(target).preview.open && r.node.preview)
        setPreviewOpen(true);
    }
  };

  const pickResult = (r) => {
    playClick();
    setSelected(r.node);
    if (isCoarse()) openResult(r);
  };

  const dismissNotFound = () => {
    window.history.replaceState(null, "", "/");
    setLostPath(null);
  };

  // folders open in place, files with an href open in a new tab
  const openNode = (node) => {
    if (node.kind === "folder") {
      navigateTo([...activePath, node.name]);
    } else if (node.href) {
      window.open(node.href, "_blank", "noopener,noreferrer");
    }
  };

  // sort choices are remembered per folder for the session
  const setSort = (override) =>
    setSorts((cur) => ({ ...cur, [viewKey(activePath)]: override }));

  const sortBy = (key) =>
    setSort(
      sortOverride?.key === key
        ? { key, dir: sortOverride.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );

  const chooseSort = (override) => {
    setSort(override);
    setCommandMenu(null);
  };

  const chooseGroup = (key) => {
    saveGroup(activePath, key);
    setViewTick((t) => t + 1);
    setCommandMenu(null);
  };

  const chooseView = (id) => {
    saveView(activePath, id);
    setViewTick((t) => t + 1);
    setCommandMenu(null);
  };

  const handleCommand = (command) => {
    switch (command) {
      case "organize":
      case "view":
        // menus toggle and stay open, so they return before the close below
        setCommandMenu((cur) => (cur === command ? null : command));
        return;

      case "open":
        if (selected) openNode(selected);
        break;

      case "preview":
        setPreviewOpen((open) => !open);
        break;

      case "properties":
        break;

      case "github":
        window.open("https://github.com/loag0", "_blank");
        break;

      case "print":
        window.print();
        break;

      case "help":
        break;

      case "burn":
        playFireSound();
        setBurning(false);
        requestAnimationFrame(() => setBurning(true));
        window.setTimeout(() => setBurning(false), 3500);
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

  useEffect(() => {
    if (!commandMenu) return;
    const handler = (e) => {
      if (!e.target.closest(".command-dropdown")) setCommandMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [commandMenu]);

  const rootPane = activePath[0];

  return (
    <>
      <div className="desktop">
        <h1 className="sr-only">Loago Moremi</h1>
        <div className="explorer-window">
          <div className="titlebar">
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
              <div
                className={`addrbar-path ${searching && !searchDone ? "is-loading" : ""}`}
              >
                {searching ? (
                  <SearchCrumb onExit={exitSearch} />
                ) : (
                  <Breadcrumb path={activePath} onNavigate={navigateTo} />
                )}
              </div>

              <div className="addrbar-search" role="search">
                <input
                  ref={searchRef}
                  className="addrbar-search-input"
                  type="text"
                  value={query}
                  placeholder="Search Loago Moremi..."
                  aria-label="Search Loago Moremi"
                  spellCheck={false}
                  autoComplete="off"
                  onChange={(e) => onSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") exitSearch();
                  }}
                />
                {query ? (
                  <button
                    className="addrbar-search-clear"
                    aria-label="Clear search"
                    onClick={() => {
                      exitSearch();
                      searchRef.current?.focus();
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                ) : (
                  <img
                    src="/assets/icons/search.png"
                    alt=""
                    className="addrbar-search-icon"
                  />
                )}
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
                  <p className="command-menu-label">Sort by</p>
                  <button
                    className={!sortOverride ? "is-active" : ""}
                    onClick={() => chooseSort(null)}
                  >
                    Default order
                  </button>
                  <button
                    className={
                      sortOverride?.key === "name" && sortOverride.dir === "asc"
                        ? "is-active"
                        : ""
                    }
                    onClick={() => chooseSort({ key: "name", dir: "asc" })}
                  >
                    Name (A to Z)
                  </button>
                  <button
                    className={
                      sortOverride?.key === "name" &&
                      sortOverride.dir === "desc"
                        ? "is-active"
                        : ""
                    }
                    onClick={() => chooseSort({ key: "name", dir: "desc" })}
                  >
                    Name (Z to A)
                  </button>

                  {groupOptions.length > 0 && (
                    <>
                      <hr className="command-menu-sep" />
                      <p className="command-menu-label">Group by</p>
                      <button
                        className={!groups ? "is-active" : ""}
                        onClick={() => chooseGroup(null)}
                      >
                        None
                      </button>
                      {groupOptions.map((key) => (
                        <button
                          key={key}
                          className={
                            groups && groupKey === key ? "is-active" : ""
                          }
                          onClick={() => chooseGroup(key)}
                        >
                          {COLUMNS[key].label}
                        </button>
                      ))}
                    </>
                  )}

                  <hr className="command-menu-sep" />
                  <button onClick={() => window.location.reload()}>
                    Refresh
                  </button>
                  <button
                    onClick={() => {
                      setSelected(null);
                      setCommandMenu(null);
                    }}
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </div>

            <div className="command-dropdown">
              <button
                className="command-button"
                onClick={() => handleCommand("view")}
              >
                View <FontAwesomeIcon icon={faCaretDown} />
              </button>

              {commandMenu === "view" && (
                <div className="command-menu">
                  {VIEW_OPTIONS.map(([id, label]) => (
                    <button
                      key={id}
                      className={view === id ? "is-active" : ""}
                      onClick={() => chooseView(id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="command-button"
              onClick={() => handleCommand("open")}
              disabled={
                !selected || (selected.kind !== "folder" && !selected.href)
              }
            >
              Open
            </button>

            <button
              className={`command-button ${previewOpen ? "is-pressed" : ""}`}
              aria-pressed={previewOpen}
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

            {rootPane === FOLDERS.projects && (
              <button
                className="command-button"
                onClick={() => handleCommand("github")}
              >
                GitHub
              </button>
            )}

            {rootPane === FOLDERS.experience && (
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
              <div className="sidebar-section-title">
                <span className="sidebar-section-icon">
                  <img src="/assets/icons/favorites.ico" alt="" />
                </span>
                <span>Favorites</span>
              </div>

              <div className="sidebar-group sidebar-group--indented">
                {FAVORITE_LINKS.map((link) => (
                  <div
                    key={link.name}
                    className="sidebar-link-item"
                    onClick={() => {
                      if (link.name === "Desktop") navigateTo([FOLDERS.user]);
                    }}
                  >
                    <img src={link.icon} alt="" className="sidebar-link-icon" />
                    <span>{link.name}</span>
                  </div>
                ))}
              </div>

              <div className="sidebar-section-title sidebar-section-title--libraries">
                <span className="sidebar-section-icon">
                  <FolderIcon />
                </span>
                <span>Libraries</span>
              </div>

              <div className="sidebar-group sidebar-group--indented">
                {LIBRARY_LINKS.map((lib) => (
                  <div key={lib.name}>
                    <div
                      className={`sidebar-item ${rootPane === lib.name ? "active" : ""}`}
                      onClick={() => navigateTo([lib.name])}
                    >
                      <img
                        src={lib.icon}
                        alt=""
                        className="sidebar-link-icon"
                      />
                      <span>{lib.name}</span>
                    </div>
                  </div>
                ))}
              </div>

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
                    className="sidebar-item"
                    onClick={() => navigateTo([FOLDERS.user])}
                  >
                    <span className="sidebar-chevron sidebar-chevron--empty" />
                    <img src={item.icon} alt="" className="sidebar-link-icon" />
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
              {searching ? (
                <div key="search" className="pane-shell">
                  <div className="pane-header">
                    <span className="pane-title">Search Results</span>
                    <span className="pane-count">
                      {searchDone
                        ? `${search.results.length} ${search.results.length === 1 ? "item" : "items"}`
                        : "Searching..."}
                    </span>
                  </div>
                  <div className="folder-split">
                    <div className="folder-list">
                      <SearchResults
                        term={query.trim()}
                        loading={!searchDone}
                        results={search.results}
                        selected={selected}
                        onSelect={pickResult}
                        onOpen={openResult}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div key={viewKey(activePath)} className="pane-shell">
                  <div className="pane-header">
                    <span className="pane-title">{folderNode.name}</span>
                    <span className="pane-count">
                      {rows.length} {rows.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <SplitPane
                    width={previewWidth}
                    onResize={setPreviewWidth}
                    list={
                      <FolderView
                        rows={rows}
                        groups={groups}
                        view={view}
                        columns={cfg.columns}
                        selected={selected}
                        sort={sortOverride}
                        onSelect={selectNode}
                        onOpen={openNode}
                        onSort={sortBy}
                      />
                    }
                    preview={
                      previewOpen ? (
                        <Preview node={selected} folder={folderNode} />
                      ) : null
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <div className="statusbar">
            <div className="statusbar-icon">
              <NodeIcon node={status.node} size={48} />
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://icons8.com"
          >
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

      {lostPath && <NotFoundDialog path={lostPath} onClose={dismissNotFound} />}
    </>
  );
}
