// used for sorting days
// must always be in the format YYYY-MM-DD, no matter what.

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

// newest first
export const projectsOrder = (a, b) =>
    key(b, "0000-00-00").localeCompare(key(a, "0000-00-00")) || (b.start ?? "").localeCompare(a.start ?? "");

// current job first
export const experienceOrder = (a, b) =>
    key(b, "9999-12-31").localeCompare(key(a, "9999-12-31")) || (b.start ?? "").localeCompare(a.start ?? "");

export const getStatus = (e) => (e.finished ? "Completed" : "In progress");

export const formatFinished = (iso, fallback = "In progress") => {
    if (!iso) return fallback;
    const [year, month] = iso.split("-");
    const name = MONTHS[Number(month) - 1];
    return name ? `${name} ${year}` : fallback;
};
