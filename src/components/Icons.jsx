// icons for different file types

function FolderGlyph({ size }) {
  return (
    <img 
      src="/assets/icons/subfolder.png"
      alt=""
      width={size}
      height={size}
      className="node-icon"
    />
  );
}

function ImageGlyph({ size }) {
  return (
    <img 
      src="/assets/icons/img.png"
      alt=""
      width={size}
      height={size}
      className="node-icon"
    />
  );
}

function DocGlyph({ size }) {
  return (
    <img
      src="/assets/icons/md.png"
      alt=""
      width={size}
      height={size}
      className="node-icon"
    />
  );
}

// a node's own icon (company logo, top level folder icon) wins over the generated one
export function NodeIcon({ node, size = 16 }) {
  if (node?.icon) {
    return (
      <img
        src={node.icon}
        alt=""
        width={size}
        height={size}
        className="node-icon"
      />
    );
  }
  if (!node || node.kind === "folder") return <FolderGlyph size={size} />;
  if (node.type === "JPG File") return <ImageGlyph size={size} />;
  return <DocGlyph size={size} type={node.type} />;
}
