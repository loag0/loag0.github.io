// finished / start must always be YYYY-MM-DD.

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const key = (e, nullValue) => e.finished ?? nullValue;

// projects: newest first, in-progress at the bottom
export const projectsOrder = (a, b) =>
  key(b, "0000-00-00").localeCompare(key(a, "0000-00-00")) ||
  (b.start ?? "").localeCompare(a.start ?? "");

// experience: current job first, then newest
export const experienceOrder = (a, b) =>
  key(b, "9999-12-31").localeCompare(key(a, "9999-12-31")) ||
  (b.start ?? "").localeCompare(a.start ?? "");

export const getStatus = (e) => (e.finished ? "Completed" : "In progress");

// shows the finished date, or "In progress" if not finished. Used in the status bar.
export const formatFinished = (iso, fallback = "In progress") => {
  if (!iso) return fallback;
  const [year, month] = iso.split("-");
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : fallback;
};

// preview: shows the start and finished dates, or "Present" if not finished. Used in the preview pane.
export const formatRange = (start, finished) =>
  start
    ? `${formatFinished(start)} to ${finished ? formatFinished(finished) : "Present"}`
    : "";
