export const state = {
  enabled: false,
  yaw: 0,
  bottom: false,
};

export const vext = {
  setEnabled: (enabled) => (state.enabled = enabled),
  setYaw: (yaw) => (state.yaw = yaw),
  setBottom: (bottom) => (state.bottom = bottom),
};
