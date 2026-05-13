type EnableCallback = (enabled: boolean) => void;
let enableCallback: EnableCallback | null = null;

export function setEnableCallback(cb: EnableCallback): void {
  enableCallback = cb;
}

export interface CompassState {
  enabled: boolean;
  yaw: number;
  theme: "classic" | "warzone";
  scale: number;
  bottom: boolean;
  indicator: "arrow" | "needle";
  showDegrees: boolean;
}

function wrapYaw(yaw: number): number {
  return ((yaw % 360) + 360) % 360;
}

export const state: CompassState = {
  enabled: false,
  yaw: 0,
  theme: "warzone",
  scale: 1,
  bottom: false,
  indicator: "arrow",
  showDegrees: true,
};

export const vext = {
  enable(enabled: boolean): void {
    state.enabled = enabled;
    enableCallback?.(enabled);
  },
  setYaw(yaw: number): void {
    state.yaw = wrapYaw(yaw);
  },
  setTheme(theme: "classic" | "warzone"): void {
    state.theme = theme;
  },
  setScale(scale: number): void {
    state.scale = Math.max(0.5, Math.min(2, scale));
  },
  setBottom(bottom: boolean): void {
    state.bottom = bottom;
  },
  setIndicator(indicator: "arrow" | "needle"): void {
    state.indicator = indicator;
  },
  showDegrees(showDegrees: boolean): void {
    state.showDegrees = showDegrees;
  },
};
