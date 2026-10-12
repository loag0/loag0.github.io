import { projectsOrder, experienceOrder } from "./entries.js";

export const FOLDERS = {
  user: "This User",
  skills: "Drivers",
  projects: "Program Files",
  experience: "Event Logs",
};

// change an icon here and the sidebar, the folder and its files all follow.
// the skill files in Drivers use the Drivers icon.
export const FOLDER_ICONS = {
  [FOLDERS.user]: "/assets/icons/user.png",
  [FOLDERS.skills]: "/assets/icons/drivers.png",
  [FOLDERS.projects]: "/assets/icons/program_files.png",
  [FOLDERS.experience]: "/assets/icons/xp.png",
};

// views: "icons" | "list" | "details"
// preview.select: a file name, "first", or null
const FALLBACK = {
  view: "list",
  columns: ["name", "type"],
  sort: "source",
  group: null,
  preview: { open: false, select: null },
};

const TOP = {
  [FOLDERS.user]: {
    view: "list",
    columns: ["name", "modified", "type", "size"],
    sort: "source",
    preview: { open: true, select: "about.txt" },
  },
  [FOLDERS.skills]: {
    view: "details",
    columns: ["name", "category", "type"],
    sort: "source",
    group: "category", // 39 flat skills is too much to scan, so Drivers opens grouped
    preview: { open: false, select: null },
  },
  [FOLDERS.projects]: {
    view: "icons",
    columns: ["name", "finished", "status"],
    sort: "projects",
    preview: { open: false, select: null },
  },
  [FOLDERS.experience]: {
    view: "icons",
    columns: ["name", "finished", "status"],
    sort: "experience",
    preview: { open: false, select: null },
  },
};

const INSIDE = {
  [FOLDERS.projects]: {
    view: "list",
    columns: ["name", "type"],
    sort: "source",
    preview: { open: true, select: "README.md" },
  },
  [FOLDERS.experience]: {
    view: "list",
    columns: ["name", "type"],
    sort: "source",
    preview: { open: true, select: "first" },
  },
};

// path = folder names from the root, e.g. ["Program Files", "copus"]
export const getFolderConfig = (path) => {
  const [top] = path;
  if (path.length === 1) return TOP[top] ?? FALLBACK;
  if (path.length === 2) return INSIDE[top] ?? FALLBACK;
  return FALLBACK;
};

export const SORTERS = {
  projects: projectsOrder,
  experience: experienceOrder,
  source: null,
};

// per-folder memory, e.g. { "Program Files": "list" }
const VIEW_KEY = "explorer-views";
const GROUP_KEY = "explorer-groups";
export const viewKey = (path) => path.join("/");

const load = (storeKey) => {
  try {
    return JSON.parse(localStorage.getItem(storeKey)) ?? {};
  } catch {
    return {};
  }
};

const save = (storeKey, path, value) => {
  try {
    localStorage.setItem(
      storeKey,
      JSON.stringify({ ...load(storeKey), [viewKey(path)]: value }),
    );
  } catch {
    // storage blocked or full: the choice just won't persist
  }
};

export const getView = (path) =>
  load(VIEW_KEY)[viewKey(path)] ?? getFolderConfig(path).view;

export const saveView = (path, view) => save(VIEW_KEY, path, view);

// null means "not grouped"; it is stored as "none" so it differs from "never chosen"
export const getGroup = (path) => {
  const saved = load(GROUP_KEY)[viewKey(path)];
  if (saved === undefined) return getFolderConfig(path).group;
  return saved === "none" ? null : saved;
};

export const saveGroup = (path, key) => save(GROUP_KEY, path, key ?? "none");
