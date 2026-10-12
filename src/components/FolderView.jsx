import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { NodeIcon } from "./Icons.jsx";
import { COLUMNS } from "../model/viewModel.js";
import { isCoarse } from "./pointer.js";

// marks links that leave the site, e.g. link.url
function ExternalMark({ node }) {
  if (!node.external) return null;
  return (
    <FontAwesomeIcon
      icon={faArrowUpRightFromSquare}
      className="external-mark"
      title="Opens in a new tab"
    />
  );
}

function GroupHeading({ group }) {
  return (
    <div className="group-heading">
      <span>{group.label}</span>
      <span className="group-count">{group.rows.length}</span>
    </div>
  );
}

// groups is null, or [{ label, rows }] when the folder is grouped
export default function FolderView({
  rows,
  groups,
  view,
  columns,
  selected,
  sort,
  onSelect,
  onOpen,
  onSort,
}) {
  if (rows.length === 0) {
    return <p className="view-empty">This folder is empty.</p>;
  }

  const sections = groups ?? [{ label: null, rows }];

  const itemProps = (node) => ({
    role: view === "details" ? "row" : "option",
    tabIndex: 0,
    "aria-selected": selected === node,
    onClick: () => {
      onSelect(node);
      if (isCoarse()) onOpen(node);
    },
    onDoubleClick: () => onOpen(node),
    onKeyDown: (e) => {
      if (e.key === "Enter") onOpen(node);
    },
  });

  const cls = (node, extra) =>
    `explorer-item ${extra} ${selected === node ? "selected" : ""}`;

  const tile = (node) => (
    <div
      key={node.name}
      {...itemProps(node)}
      className={cls(node, "icon-tile")}
    >
      <NodeIcon node={node} size={48} />
      <span className="icon-tile-name">
        {node.name}
        <ExternalMark node={node} />
      </span>
    </div>
  );

  const listRow = (node) => (
    <div key={node.name} {...itemProps(node)} className={cls(node, "list-row")}>
      <NodeIcon node={node} size={16} />
      <span className="list-row-name">{node.name}</span>
      <ExternalMark node={node} />
    </div>
  );

  if (view === "icons" || view === "list") {
    const isIcons = view === "icons";
    return (
      <div className="view-pad" role="listbox">
        {sections.map((s) => (
          <div
            key={s.label ?? "all"}
            role="group"
            aria-label={s.label ?? undefined}
          >
            {s.label && <GroupHeading group={s} />}
            <div className={isIcons ? "view-icons" : "view-list"}>
              {s.rows.map(isIcons ? tile : listRow)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const template = columns
    .map((_, i) => (i === 0 ? "minmax(170px, 2.4fr)" : "minmax(90px, 1fr)"))
    .join(" ");

  return (
    <div className="view-details" role="table" style={{ "--cols": template }}>
      <div className="details-head" role="row">
        {columns.map((key) => {
          const active = sort?.key === key;
          return (
            <button
              key={key}
              className="details-head-cell"
              role="columnheader"
              aria-sort={
                active
                  ? sort.dir === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              onClick={() => onSort(key)}
            >
              <span>{COLUMNS[key].label}</span>
              {active && (
                <FontAwesomeIcon
                  icon={sort.dir === "asc" ? faCaretUp : faCaretDown}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="details-body">
        {sections.map((s) => (
          <div key={s.label ?? "all"} role="rowgroup">
            {s.label && <GroupHeading group={s} />}
            {s.rows.map((node) => (
              <div
                key={node.name}
                {...itemProps(node)}
                className={cls(node, "details-row")}
              >
                {columns.map((key, i) => (
                  <div key={key} className="details-cell" role="cell">
                    {i === 0 && <NodeIcon node={node} size={16} />}
                    <span>{COLUMNS[key].value(node)}</span>
                    {i === 0 && <ExternalMark node={node} />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
