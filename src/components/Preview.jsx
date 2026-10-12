import { NodeIcon } from "./Icons.jsx";
import Markdown from "./Markdown.jsx";
import { formatRange } from "../model/entries.js";

function Body({ preview }) {
  const { kind, data } = preview;

  switch (kind) {
    case "markdown":
      return <Markdown source={data} />;

    case "text":
      return (
        <div className="md-body">
          {data.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      );

    case "image":
      return <img className="preview-image" src={data.src} alt={data.alt} />;

    case "chips":
      return (
        <div className="project-tech-row">
          {data.map((c) => (
            <span key={c} className="tech-chip">
              {c}
            </span>
          ))}
        </div>
      );

    case "pdf":
      // the fallback only shows where the browser can't render PDFs inline (most phones)
      return (
        <object
          className="preview-pdf"
          data={`${data.href}#toolbar=0&navpanes=0&view=FitH`}
          type="application/pdf"
          aria-label="PDF preview"
        >
          <p className="preview-empty">
            This browser can&apos;t show the PDF here.{" "}
            <a href={data.href} target="_blank" rel="noopener noreferrer">
              Open it in a new tab
            </a>
            .
          </p>
        </object>
      );

    default:
      return null;
  }
}

// folder is the folder being browsed: project and company folders carry the start date
export default function Preview({ node, folder }) {
  if (!node || node.kind === "folder" || !node.preview) {
    return (
      <aside className="preview-pane" aria-label="Preview">
        <p className="preview-empty">Select a file to preview.</p>
      </aside>
    );
  }

  const range = formatRange(folder?.start, folder?.finished);
  const isPdf = node.preview.kind === "pdf";

  return (
    <aside
      className={`preview-pane ${isPdf ? "preview-pane--pdf" : ""}`}
      aria-label="Preview"
    >
      <div className="preview-head">
        <NodeIcon node={node} size={20} />
        <span>{node.name}</span>
      </div>
      {range && <p className="preview-range">{range}</p>}
      <Body preview={node.preview} />
    </aside>
  );
}
