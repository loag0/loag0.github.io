// tiny markdown renderer for the preview pane: headings, lists, paragraphs

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/;

function Inline({ text }) {
  return text.split(INLINE).map((part, i) => {
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(LINK);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

function parse(source) {
  const blocks = [];
  let para = [];
  let list = null;

  const flushPara = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ") });
    para = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };

  for (const raw of source.split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+\.\s+(.*)$/);

    if (heading) {
      flushPara();
      flushList();
      blocks.push({ type: "h", level: heading[1].length, text: heading[2] });
    } else if (bullet || numbered) {
      flushPara();
      const ordered = !bullet;
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { type: "list", ordered, items: [] };
      list.items.push((bullet || numbered)[1]);
    } else {
      flushList();
      para.push(line.trim());
    }
  }

  flushPara();
  flushList();
  return blocks;
}

export default function Markdown({ source }) {
  return (
    <div className="md-body">
      {parse(source).map((block, i) => {
        if (block.type === "h") {
          // the page already has its h1, so markdown headings start at h3
          const Tag = `h${block.level + 2}`;
          return (
            <Tag key={i}>
              <Inline text={block.text} />
            </Tag>
          );
        }
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={i}>
              {block.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={i}>
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
