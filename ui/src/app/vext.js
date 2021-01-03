export const state = {
  enabled: false,
  yaw: 0,
  bottom: false,
  indicator: "arrow",
  showDegrees: true
};

export const vext = {
  enable: (enabled) => (state.enabled = enabled),
  setYaw: (yaw) => (state.yaw = yaw),
  setBottom: (bottom) => (state.bottom = bottom),
  setIndicator: (indicator) => (state.indicator = indicator),
  showDegrees: (showDegrees) => (state.showDegrees = showDegrees)
};
