export const state = {
  enabled: false,
  yaw: 0,
};

export const vext = {
  setEnabled: (enabled) => (state.enabled = enabled),
  setYaw: (yaw) => (state.yaw = yaw),
};
