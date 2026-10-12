import { useEffect, useRef } from "react";

// the red circle X from the Windows 7 error dialogs
function ErrorGlyph() {
  return (
    <img
        src="/assets/icons/error.png"
        alt=""
        width={32}
        height={32}

    />
  );
}

// shown over the explorer when the url isn't the site root, which is
// what GitHub Pages serves 404.html for. same message Explorer gives for a bad path.
export default function NotFoundDialog({ path, onClose }) {
  const okRef = useRef(null);

  useEffect(() => {
    okRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="dialog-scrim">
      <div
        className="dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="nf-title"
        aria-describedby="nf-text"
      >
        <div className="titlebar">
          <span id="nf-title" className="dialog-title">
            Loago Moremi
          </span>
          <div className="win7-btns">
            <button
              className="win7-btn win7-btn--close"
              title="Close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
        </div>

        <div className="dialog-body">
          <ErrorGlyph />
          <p id="nf-text">
            Windows can&apos;t find &apos;<strong>{path}</strong>&apos;. Check
            the spelling and try again, or try searching for the item.
          </p>
        </div>

        <div className="dialog-footer">
          <button ref={okRef} className="dialog-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
