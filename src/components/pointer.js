// touch screens have no double click, so a tap selects and opens in one go
export const isCoarse = () =>
  typeof window !== "undefined" &&
  Boolean(window.matchMedia?.("(pointer: coarse)").matches);
