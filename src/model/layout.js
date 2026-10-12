// preview pane sizing. the splitter can't push either side below its minimum.
export const MIN_LIST = 280;
export const MIN_PREVIEW = 240;
export const DEFAULT_PREVIEW = 460;

// containerWidth 0 means "not measured yet", so the width passes through.
// if the container is too narrow for both minimums, the preview keeps its minimum.
export const clampPreviewWidth = (width, containerWidth) => {
  if (!containerWidth) return width;
  return Math.max(MIN_PREVIEW, Math.min(width, containerWidth - MIN_LIST));
};
