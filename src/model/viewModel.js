import { formatFinished } from "./entries.js";
import { SORTERS } from "./folderConfig.js";

const text = (get) => (a, b) =>
  get(a).localeCompare(get(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });

const hasFinished = (n) => "finished" in n;

// every column the config can ask for: header label, cell text, sort compare
export const COLUMNS = {
  name: { label: "Name", value: (n) => n.name, compare: text((n) => n.name) },
  modified: {
    label: "Date modified",
    value: (n) => formatFinished(n.modified, "-"),
    compare: (a, b) => (a.modified ?? "").localeCompare(b.modified ?? ""),
  },
  type: { label: "Type", value: (n) => n.type, compare: text((n) => n.type) },
  size: {
    label: "Size",
    value: (n) => n.size ?? "",
    compare: (a, b) => (a.bytes ?? -1) - (b.bytes ?? -1),
  },
  category: {
    label: "Category",
    value: (n) => n.category ?? "-",
    compare: text((n) => n.category ?? ""),
  },
  finished: {
    label: "Date finished",
    value: (n) => (hasFinished(n) ? formatFinished(n.finished) : "-"),
    compare: (a, b) =>
      (a.finished ?? "9999-99-99").localeCompare(b.finished ?? "9999-99-99"),
  },
  status: {
    label: "Status",
    value: (n) => n.status ?? "-",
    compare: text((n) => n.status ?? ""),
  },
};

// override = { key, dir } from a header click, otherwise the folder's default sort
export const sortChildren = (children, sortKey, override) => {
  const list = [...children];
  if (override) {
    const dir = override.dir === "desc" ? -1 : 1;
    return list.sort((a, b) => dir * COLUMNS[override.key].compare(a, b));
  }
  const fn = SORTERS[sortKey];
  return fn ? list.sort(fn) : list;
};

const count = (n) => n.children?.length ?? 0;
const items = (n) => `${count(n)} ${count(n) === 1 ? "item" : "items"}`;

// everything the status bar shows, from the selected node (or the open folder)
export const getStatusInfo = (selected, folder) => {
  if (!selected) {
    return {
      node: folder,
      name: folder.name,
      type: "Folder",
      fields: [["Items", items(folder)]],
    };
  }

  if (selected.kind === "folder") {
    const fields = hasFinished(selected)
      ? [
          ["Date finished", formatFinished(selected.finished)],
          ["Status", selected.status],
        ]
      : [["Items", items(selected)]];
    return {
      node: selected,
      name: selected.name,
      type: selected.label ?? selected.type,
      fields,
    };
  }

  const fields = [];
  if (selected.category) fields.push(["Category", selected.category]);
  if (selected.modified)
    fields.push(["Date modified", formatFinished(selected.modified)]);
  if (selected.bytes != null) fields.push(["Size", selected.size]);
  return { node: selected, name: selected.name, type: selected.type, fields };
};

// columns a folder can be grouped by
export const GROUPABLE = ["category", "status"];

// groups rows by a column's value. group order follows the folder's source order,
// rows inside each group keep the current sort.
export const groupRows = (rows, sourceChildren, key) => {
  const value = COLUMNS[key].value;
  const order = [];
  for (const node of sourceChildren) {
    const label = value(node);
    if (!order.includes(label)) order.push(label);
  }
  return order
    .map((label) => ({ label, rows: rows.filter((n) => value(n) === label) }))
    .filter((g) => g.rows.length > 0);
};
