export interface Theme {
  type: "classic" | "warzone";
  CANVAS_HEIGHT_VH: number;
  STRIP_HEIGHT_VH: number;
  STRIP_MARGIN_VH: number;
  STEP: number;
  TICK_SPACING_VH: number;
  EDGE_BUFFER_DEG: number;
  FADE_ZONE_VH: number;
  MIN_ALPHA: number;
  MINOR_TICK_RADIUS_VH: number;
  SEMI_LABEL_SIZE_VH: number;
  SEMI_LABEL_OFFSET_VH: number;
  FULL_TICK_WIDTH_VH: number;
  FULL_TICK_HEIGHT_VH: number;
  FULL_LABEL_SIZE_VH: number;
  FULL_LABEL_OFFSET_VH: number;
  ARROW_SIZE_VH: number;
  NEEDLE_WIDTH_VH: number;
  NEEDLE_HEIGHT_VH: number;
  YAW_FONT_SIZE_VH: number;
  YAW_OFFSET_VH: number;
  LERP_FACTOR: number;
  WARZONE_TICK_HEIGHT_VH: number;
  PANEL_WIDTH_VH: number;
  PANEL_BORDER_VH: number;
  PANEL_PADDING_VH: number;
  PANEL_FONT_SIZE_VH: number;
  PANEL_SNAP_DEG: number;
  COLORS: {
    minorTick: string;
    semiTick: string;
    fullTick: string;
    semiLabel: string;
    fullLabel: string;
    yawText: string;
    arrow: string;
    needle: string;
    shadow: string;
    labelShadow: string;
    yawShadow: string;
    panelText: string;
    panelBorder: string;
    panelShadow: string;
  };
  FONT_FAMILY: string;
}

export const CLASSIC: Theme = {
  type: "classic",
  CANVAS_HEIGHT_VH: 10,
  STRIP_HEIGHT_VH: 3,
  STRIP_MARGIN_VH: 0.5,
  STEP: 5,
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
  WARZONE_TICK_HEIGHT_VH: 0,
  PANEL_WIDTH_VH: 0,
  PANEL_BORDER_VH: 0,
  PANEL_PADDING_VH: 0,
  PANEL_FONT_SIZE_VH: 0,
  PANEL_SNAP_DEG: 0,
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
    panelText: "rgba(0,0,0,0)",
    panelBorder: "rgba(0,0,0,0)",
    panelShadow: "rgba(0,0,0,0)",
  },
  FONT_FAMILY: "Poppins",
};

export const WARZONE: Theme = {
  type: "warzone",
  CANVAS_HEIGHT_VH: 6,
  STRIP_HEIGHT_VH: 2.5,
  STRIP_MARGIN_VH: 1,
  STEP: 15,
  TICK_SPACING_VH: 5,
  EDGE_BUFFER_DEG: 15,
  FADE_ZONE_VH: 5,
  MIN_ALPHA: 0.01,
  MINOR_TICK_RADIUS_VH: 0,
  SEMI_LABEL_SIZE_VH: 1.2,
  SEMI_LABEL_OFFSET_VH: 1.2,
  FULL_TICK_WIDTH_VH: 0,
  FULL_TICK_HEIGHT_VH: 0,
  FULL_LABEL_SIZE_VH: 1.5,
  FULL_LABEL_OFFSET_VH: 1.2,
  ARROW_SIZE_VH: 0,
  NEEDLE_WIDTH_VH: 0,
  NEEDLE_HEIGHT_VH: 0,
  YAW_FONT_SIZE_VH: 0,
  YAW_OFFSET_VH: 0,
  LERP_FACTOR: 0.15,
  WARZONE_TICK_HEIGHT_VH: 0.6,
  PANEL_WIDTH_VH: 5,
  PANEL_BORDER_VH: 0.2,
  PANEL_PADDING_VH: 0.25,
  PANEL_FONT_SIZE_VH: 2.2,
  PANEL_SNAP_DEG: 5,
  COLORS: {
    minorTick: "rgba(0,0,0,0)",
    semiTick: "rgba(255, 255, 255, 0.64)",
    fullTick: "#fff",
    semiLabel: "rgba(255, 255, 255, 0.75)",
    fullLabel: "rgb(252, 255, 228)",
    yawText: "rgba(0,0,0,0)",
    arrow: "rgba(0,0,0,0)",
    needle: "rgba(0,0,0,0)",
    shadow: "rgba(0, 0, 0, 0.24)",
    labelShadow: "rgba(0, 0, 0, 0.32)",
    yawShadow: "rgba(0,0,0,0)",
    panelText: "#fca94b",
    panelBorder: "#e7e7dd",
    panelShadow: "rgba(0, 0, 0, 0.75)",
  },
  FONT_FAMILY: "Unica One",
};

export const THEMES = { classic: CLASSIC, warzone: WARZONE } as const;
