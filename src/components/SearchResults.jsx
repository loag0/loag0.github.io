import { NodeIcon } from "./Icons.jsx";
import { searchTokens } from "../model/search.js";

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// wraps every match in <mark>. split() with one capture group puts the matches at odd indexes.
function Highlight({ text, tokens }) {
  if (tokens.length === 0) return text;
  const pattern = new RegExp(`(${tokens.map(escapeRegex).join("|")})`, "gi");
  return text
    .split(pattern)
    .map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part));
}

function Skeleton() {
  return (
    <div className="result-skeleton" aria-hidden="true">
      <div className="skeleton-icon" />
      <div className="skeleton-text">
        <div className="skeleton-line" style={{ width: "34%" }} />
        <div className="skeleton-line" style={{ width: "52%" }} />
        <div className="skeleton-line" style={{ width: "78%" }} />
      </div>
    </div>
  );
}

// the "Search Results" pane: loading skeleton, rows with highlighted matches, or empty state
export default function SearchResults({
  term,
  loading,
  results,
  selected,
  onSelect,
  onOpen,
}) {
  if (loading) {
    return (
      <div role="status" aria-label="Searching">
        <div className="search-marquee" />
        <div className="view-pad">
          <p className="search-status">Searching Loago Moremi...</p>
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="view-pad">
        <p className="view-empty">No items match your search.</p>
        <p className="search-hint">
          Try different keywords, or check the spelling.
        </p>
      </div>
    );
  }

  const tokens = searchTokens(term);

  return (
    <div className="view-pad" role="listbox">
      {results.map((r) => (
        <div
          key={r.id}
          role="option"
          tabIndex={0}
          aria-selected={selected === r.node}
          className={`explorer-item result-row ${selected === r.node ? "selected" : ""}`}
          onClick={() => onSelect(r)}
          onDoubleClick={() => onOpen(r)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onOpen(r);
          }}
        >
          <NodeIcon node={r.node} size={32} />
          <div className="result-main">
            <div className="result-name">
              <Highlight text={r.name} tokens={tokens} />
            </div>
            <div className="result-path">
              {["Loago Moremi", ...r.path].join(" › ")}
            </div>
            {r.snippet && (
              <div className="result-snippet">
                <Highlight text={r.snippet} tokens={tokens} />
              </div>
            )}
          </div>
          <span className="result-type">{r.node.type}</span>
        </div>
      ))}
    </div>
  );
}
