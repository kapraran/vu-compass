export const state = {
  enabled: false,
  yaw: 0,
  bottom: false,
  indicator: "needle",
};

export const vext = {
  setEnabled: (enabled) => (state.enabled = enabled),
  setYaw: (yaw) => (state.yaw = yaw),
  setBottom: (bottom) => (state.bottom = bottom),
  setIndicator: (indicator) => (state.indicator = indicator),
};
