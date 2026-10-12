import { skills } from "../data/skills.js";
import { projects } from "../data/projects.js";
import { experience } from "../data/experience.js";
import { BIO, FILE_META } from "../data/about.js";
import { projectsOrder, experienceOrder, getStatus } from "./entries.js";
import { FOLDERS, FOLDER_ICONS } from "./folderConfig.js";

const encoder = new TextEncoder();
const byteLength = (s) => encoder.encode(s).length;

export const formatSize = (bytes) =>
  bytes == null
    ? "-"
    : bytes < 1024
      ? `${bytes} B`
      : `${Math.ceil(bytes / 1024).toLocaleString("en-GB")} KB`;

const file = ({ name, type, bytes = null, ...rest }) => ({
  kind: "file",
  name,
  type,
  bytes,
  size: formatSize(bytes),
  modified: null,
  ...rest,
});

const folder = ({ name, children, ...rest }) => ({
  kind: "folder",
  name,
  type: "Folder",
  children,
  ...rest,
});

/* This User */

const thisUser = () =>
  folder({
    name: FOLDERS.user,
    icon: FOLDER_ICONS[FOLDERS.user],
    children: [
      file({
        name: "about.txt",
        type: "Text",
        bytes: byteLength(BIO),
        modified: FILE_META.about.modified,
        preview: { kind: "text", data: BIO },
      }),
      file({
        name: "profile.jpg",
        type: "JPG File",
        bytes: FILE_META.profile.bytes,
        modified: FILE_META.profile.modified,
        preview: {
          kind: "image",
          data: {
            src: "/assets/images/profile-720.webp",
            alt: "Loago Moremi",
          },
        },
      }),
      file({
        name: "CV.pdf",
        type: "PDF",
        bytes: FILE_META.cv.bytes,
        modified: FILE_META.cv.modified,
        href: "/assets/documents/Loago_Moremi_CV.pdf",
        preview: {
          kind: "pdf",
          data: { href: "/assets/documents/Loago_Moremi_CV.pdf" },
        },
      }),
    ],
  });

/* Drivers */

export const flattenSkills = () =>
  Object.entries(skills).flatMap(([category, items]) =>
    items.map((name) => ({ name, category, type: "Skill File" })),
  );

const drivers = () =>
  folder({
    name: FOLDERS.skills,
    icon: FOLDER_ICONS[FOLDERS.skills],
    children: flattenSkills().map((s) =>
      file({
        name: `${s.name}.skill`,
        type: s.type,
        icon: FOLDER_ICONS[FOLDERS.skills],
        category: s.category,
        skill: s.name,
        preview: { kind: "text", data: `${s.name} (${s.category})` },
      }),
    ),
  });

/* Program Files */

const projectFolder = (p) => {
  const children = [
    file({
      name: "README.md",
      type: "Markdown",
      bytes: byteLength(md(p.title, p.description)),
      preview: { kind: "markdown", data: md(p.title, p.description) },
    }),
    file({
      name: "stack.txt",
      type: "Text",
      bytes: byteLength(p.tech.join("\n")),
      preview: { kind: "chips", data: p.tech },
    }),
  ];

  // private projects have no link.url
  if (p.link && p.visibility !== "private") {
    const content = `[InternetShortcut]\nURL=${p.link}\n`;
    children.push(
      file({
        name: "link.url",
        type: "Internet Shortcut",
        bytes: byteLength(content),
        href: p.link,
        external: true,
        preview: { kind: "text", data: p.link },
      }),
    );
  }

  return folder({
    name: p.title,
    slug: p.slug,
    label: p.label,
    finished: p.finished,
    start: p.start ?? null,
    status: getStatus(p),
    visibility: p.visibility ?? "public",
    children,
  });
};

const programFiles = () =>
  folder({
    name: FOLDERS.projects,
    icon: FOLDER_ICONS[FOLDERS.projects],
    children: [...projects].sort(projectsOrder).map(projectFolder),
  });

/* Event Logs */

const hasContent = (v) =>
  Array.isArray(v) ? v.length > 0 : typeof v === "string" && v.trim() !== "";

const md = (title, body) => `# ${title}\n\n${body}`;
const bullets = (items) => items.map((i) => `- ${i}`).join("\n");
const achievementLine = (a) =>
  a.metric ? `**${a.metric}** ${a.text}` : a.text;

// .md files are generated as real markdown, the preview renders it.
// tools.txt keeps its own preview (chips).
const SECTIONS = [
  {
    key: "overview",
    name: "overview.md",
    type: "Markdown",
    build: (v) => md("Overview", v),
  },
  {
    key: "responsibilities",
    name: "responsibilities.md",
    type: "Markdown",
    build: (v) => md("Responsibilities", bullets(v)),
  },
  {
    key: "achievements",
    name: "achievements.md",
    type: "Markdown",
    build: (v) => md("Achievements", bullets(v.map(achievementLine))),
  },
  {
    key: "tools",
    name: "tools.txt",
    type: "Text",
    build: (v) => v.join("\n"),
    preview: (v) => ({ kind: "chips", data: v }),
  },
  {
    key: "takeaways",
    name: "takeaways.md",
    type: "Markdown",
    build: (v) => md("Takeaways", bullets(v)),
  },
];

const companyFolder = (e) =>
  folder({
    name: e.company,
    slug: e.slug,
    icon: e.logo,
    title: e.title,
    label: e.type,
    location: e.location ?? null,
    finished: e.finished,
    start: e.start ?? null,
    status: getStatus(e),
    children: SECTIONS.filter((s) => hasContent(e[s.key])).map((s) => {
      const content = s.build(e[s.key]);
      return file({
        name: s.name,
        type: s.type,
        bytes: byteLength(content),
        preview: s.preview
          ? s.preview(e[s.key])
          : { kind: "markdown", data: content },
      });
    }),
  });

const eventLogs = () =>
  folder({
    name: FOLDERS.experience,
    icon: FOLDER_ICONS[FOLDERS.experience],
    children: [...experience].sort(experienceOrder).map(companyFolder),
  });

/* public api */

export const buildTree = () =>
  folder({
    name: "Loago Moremi",
    children: [thisUser(), drivers(), programFiles(), eventLogs()],
  });

export const getNode = (root, path) =>
  path.reduce(
    (node, name) => node?.children?.find((c) => c.name === name) ?? null,
    root,
  );

// the file a folder should auto-select when its preview pane opens
export const pickSelection = (node, select) => {
  if (!node?.children?.length || !select) return null;
  if (select === "first") return node.children[0];
  return node.children.find((c) => c.name === select) ?? node.children[0];
};
