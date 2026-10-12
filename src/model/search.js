// whole-site search over the file tree

const collapse = (s) => s.replace(/\s+/g, " ").trim();

const stripMarkdown = (s) =>
  s
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/^\s*[-*]\s+/gm, "");

// words a node can be found by that are not worth showing as a snippet
const metaOf = (n) =>
  [n.type, n.label, n.category, n.status, n.title].filter(Boolean).join(" ");

// text shown as the snippet under a result
const contentOf = (n) => {
  if (n.category) return ""; // skill rows only repeat their own name
  const p = n.preview;
  if (!p) return "";
  if (typeof p.data === "string") {
    return collapse(p.kind === "markdown" ? stripMarkdown(p.data) : p.data);
  }
  if (Array.isArray(p.data)) return collapse(p.data.join(", "));
  return "";
};

export const buildSearchIndex = (root) => {
  const entries = [];
  const walk = (node, path) => {
    for (const child of node.children ?? []) {
      entries.push({
        id: [...path, child.name].join("/"),
        node: child,
        path, // folder names from the root down to the folder holding this node
        name: child.name,
        meta: metaOf(child),
        content: contentOf(child),
      });
      if (child.kind === "folder") walk(child, [...path, child.name]);
    }
  };
  walk(root, []);
  return entries;
};

export const searchTokens = (query) =>
  query.toLowerCase().split(/\s+/).filter(Boolean);

const SNIPPET_BEFORE = 35;
const SNIPPET_AFTER = 95;

const makeSnippet = (content, tokens) => {
  const lower = content.toLowerCase();
  let at = -1;
  for (const t of tokens) {
    const i = lower.indexOf(t);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return "";

  let start = Math.max(0, at - SNIPPET_BEFORE);
  let end = Math.min(content.length, at + SNIPPET_AFTER);

  // snap to word edges so a word isn't cut in half
  if (start > 0) {
    const space = content.indexOf(" ", start);
    if (space !== -1 && space < at) start = space + 1;
  }
  if (end < content.length) {
    const space = content.lastIndexOf(" ", end);
    if (space > at) end = space;
  }

  return `${start > 0 ? "…" : ""}${content.slice(start, end).trim()}${
    end < content.length ? "…" : ""
  }`;
};

const MAX_RESULTS = 100;

// every word must appear somewhere (name, meta or content). name hits rank first.
export const searchIndex = (index, query) => {
  const tokens = searchTokens(query);
  if (tokens.length === 0) return [];

  const results = [];
  for (const entry of index) {
    const name = entry.name.toLowerCase();
    const haystack = `${name}\n${entry.meta.toLowerCase()}\n${entry.content.toLowerCase()}`;
    if (!tokens.every((t) => haystack.includes(t))) continue;

    const nameHits = tokens.filter((t) => name.includes(t)).length;
    const score =
      nameHits * 10 +
      (name.startsWith(tokens[0]) ? 5 : 0) +
      (entry.node.kind === "folder" ? 1 : 0);

    results.push({
      ...entry,
      score,
      snippet: makeSnippet(entry.content, tokens),
    });
  }

  return results
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.name.localeCompare(b.name, undefined, { numeric: true }) ||
        a.path.length - b.path.length,
    )
    .slice(0, MAX_RESULTS);
};
