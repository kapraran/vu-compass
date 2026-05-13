import { THEMES } from "./themes";
import type { Theme } from "./themes";
import { state } from "../vext";

export type { Theme };

export function getTheme(): Theme {
  return THEMES[state.theme];
}

export { THEMES };
