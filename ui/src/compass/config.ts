export const CONFIG = {
  CANVAS_HEIGHT_VH: 10,
  STRIP_HEIGHT_VH: 3,
  STRIP_MARGIN_VH: 0.5,

  DEGREES_PER_TICK: 5,
  TICK_SPACING_VH: 2.1,
  EDGE_BUFFER_DEG: 10,

  FADE_ZONE_VH: 10,
  MIN_ALPHA: 0.01,

  MINOR_TICK_RADIUS_VH: 0.2,

  SEMI_LABEL_SIZE_VH: 1.3,
  SEMI_LABEL_OFFSET_VH: 1.1,

  FULL_TICK_WIDTH_VH: 0.25,
  FULL_TICK_HEIGHT_VH: 1,
  FULL_LABEL_SIZE_VH: 1.7,
  FULL_LABEL_OFFSET_VH: 1.2,

  ARROW_SIZE_VH: 0.4,
  NEEDLE_WIDTH_VH: 0.3,
  NEEDLE_HEIGHT_VH: 2.8,

  YAW_FONT_SIZE_VH: 1.3,
  YAW_OFFSET_VH: 1.5,

  LERP_FACTOR: 0.15,

  COLORS: {
    minorTick: "rgba(255, 255, 255, 0.28)",
    semiTick: "rgba(255, 255, 255, 0.56)",
    fullTick: "rgba(255, 255, 255, 0.64)",
    semiLabel: "rgba(252, 255, 228, 0.76)",
    fullLabel: "rgba(252, 255, 228, 0.84)",
    yawText: "rgba(255, 255, 255, 0.68)",
    arrow: "rgba(255, 255, 255, 0.72)",
    needle: "rgba(255, 0, 0, 0.2)",
    shadow: "rgba(0, 0, 0, 0.56)",
    labelShadow: "rgba(0, 13, 71, 0.92)",
    yawShadow: "rgba(0, 0, 0, 0.8)",
  },
} as const;
