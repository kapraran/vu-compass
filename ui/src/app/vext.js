function wrapYaw(yaw) {
  return ((yaw % 360) + 360) % 360;
}

export var state = {
  enabled: false,
  yaw: 0,
  bottom: false,
  indicator: "arrow",
  showDegrees: true,
};

export var vext = {
  enable: function (enabled) {
    state.enabled = enabled;
  },
  setYaw: function (yaw) {
    state.yaw = wrapYaw(yaw);
  },
  setBottom: function (bottom) {
    state.bottom = bottom;
  },
  setIndicator: function (indicator) {
    state.indicator = indicator;
  },
  showDegrees: function (showDegrees) {
    state.showDegrees = showDegrees;
  },
};
