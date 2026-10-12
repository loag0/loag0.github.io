import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_PREVIEW,
  MIN_LIST,
  MIN_PREVIEW,
  clampPreviewWidth,
} from "../model/layout.js";

const STEP = 16;

// list on the left, optional preview on the right, with a draggable splitter.
// the width is owned by the parent so it survives moving between folders.
export default function SplitPane({ list, preview, width, onResize }) {
  const ref = useRef(null);
  const [box, setBox] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox(el.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shown = clampPreviewWidth(width, box);
  const set = (next) => onResize(clampPreviewWidth(next, box));

  const onPointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  const stopDrag = () => setDragging(false);

  const onPointerMove = (e) => {
    if (!e.currentTarget.hasPointerCapture?.(e.pointerId)) return;
    const rect = ref.current.getBoundingClientRect();
    set(rect.right - e.clientX - 2);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") set(shown + STEP);
    else if (e.key === "ArrowRight") set(shown - STEP);
    else if (e.key === "Home") onResize(DEFAULT_PREVIEW);
    else return;
    e.preventDefault();
  };

  return (
    <div className="folder-split" ref={ref}>
      <div className="folder-list">{list}</div>

      {preview && (
        <>
          <div
            className={`splitter ${dragging ? "splitter--dragging" : ""}`}
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize preview pane"
            aria-valuenow={shown}
            aria-valuemin={MIN_PREVIEW}
            aria-valuemax={box ? box - MIN_LIST : undefined}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            onLostPointerCapture={stopDrag}
            onDoubleClick={() => onResize(DEFAULT_PREVIEW)}
            onKeyDown={onKeyDown}
          />
          <div className="preview-slot" style={{ "--preview-w": `${shown}px` }}>
            {preview}
          </div>
        </>
      )}
    </div>
  );
}
