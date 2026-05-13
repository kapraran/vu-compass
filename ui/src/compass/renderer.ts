import type { Theme } from "./themes";

const DEG_LABELS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

export interface DrawState {
  yaw: number;
  theme: Theme;
  bottom: boolean;
  indicator: "arrow" | "needle";
  showDegrees: boolean;
}

function label(deg: number): string {
  const norm = ((deg % 360) + 360) % 360;
  if (norm % 45 === 0) return DEG_LABELS[norm / 45];
  return Math.round(deg).toString();
}

function warzonePanelLabel(yaw: number, T: Theme): string {
  const mod = ((yaw % 45) + 45) % 45;
  let deg = yaw;
  if (mod >= 45 - T.PANEL_SNAP_DEG || mod <= T.PANEL_SNAP_DEG) {
    deg -= mod <= T.PANEL_SNAP_DEG ? mod : mod - 45;
  }
  return label(deg);
}

function drawClassic(
  ctx: CanvasRenderingContext2D,
  w: number,
  state: DrawState,
  T: Theme,
  vh: number,
  cx: number,
  stripTop: number,
  stripBottom: number,
  tickBaseY: number,
): void {
  const { yaw, bottom, indicator, showDegrees } = state;

  const tickSpacing = T.TICK_SPACING_VH * vh;
  const pxPerDeg = tickSpacing / T.STEP;

  const halfRangeDeg = w / 2 / pxPerDeg + T.EDGE_BUFFER_DEG;
  const startDeg = Math.floor((yaw - halfRangeDeg) / T.STEP) * T.STEP;
  const endDeg = Math.ceil((yaw + halfRangeDeg) / T.STEP) * T.STEP;

  const fadeZone = T.FADE_ZONE_VH * vh;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  for (let deg = startDeg; deg <= endDeg; deg += T.STEP) {
    const offsetDeg = deg - yaw;
    const x = cx + offsetDeg * pxPerDeg;

    if (x < -tickSpacing || x > w + tickSpacing) continue;

    const distFromEdge = Math.min(x, w - x);
    const alpha = Math.min(1, distFromEdge / fadeZone);
    if (alpha < T.MIN_ALPHA) continue;

    ctx.globalAlpha = alpha;
    ctx.shadowColor = T.COLORS.shadow;
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const tickYaw = ((deg % 360) + 360) % 360;
    const isFull = tickYaw % 45 === 0;
    const isSemi = !isFull && tickYaw % 15 === 0;

    if (isFull) {
      const tw = Math.max(3, T.FULL_TICK_WIDTH_VH * vh);
      const th = T.FULL_TICK_HEIGHT_VH * vh;
      const tx = x - tw / 2;
      const ty = bottom ? tickBaseY - th : tickBaseY;
      ctx.fillStyle = T.COLORS.fullTick;
      ctx.fillRect(tx, ty, tw, th);

      ctx.shadowBlur = 4;
      ctx.shadowColor = T.COLORS.labelShadow;
      ctx.font = `500 ${T.FULL_LABEL_SIZE_VH * vh}px ${T.FONT_FAMILY}`;
      ctx.fillStyle = T.COLORS.fullLabel;
      ctx.fillText(
        DEG_LABELS[tickYaw / 45],
        x,
        stripTop + (bottom ? -T.FULL_LABEL_OFFSET_VH * vh : T.FULL_LABEL_OFFSET_VH * vh),
      );
      ctx.shadowBlur = 6;
      ctx.shadowColor = T.COLORS.shadow;
    } else if (isSemi) {
      const r = Math.max(2, T.MINOR_TICK_RADIUS_VH * vh);
      const cy = bottom ? tickBaseY - r : tickBaseY + r;
      ctx.fillStyle = T.COLORS.semiTick;
      ctx.beginPath();
      ctx.arc(x, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 4;
      ctx.shadowColor = T.COLORS.labelShadow;
      ctx.font = `400 ${T.SEMI_LABEL_SIZE_VH * vh}px ${T.FONT_FAMILY}`;
      ctx.fillStyle = T.COLORS.semiLabel;
      ctx.fillText(
        tickYaw.toString(),
        x,
        stripTop + (bottom ? -T.SEMI_LABEL_OFFSET_VH * vh : T.SEMI_LABEL_OFFSET_VH * vh),
      );
      ctx.shadowBlur = 6;
      ctx.shadowColor = T.COLORS.shadow;
    } else {
      const r = Math.max(2, T.MINOR_TICK_RADIUS_VH * vh);
      const cy = bottom ? tickBaseY - r : tickBaseY + r;
      ctx.fillStyle = T.COLORS.minorTick;
      ctx.beginPath();
      ctx.arc(x, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";

  if (indicator === "arrow") {
    const sz = T.ARROW_SIZE_VH * vh;
    ctx.beginPath();
    if (bottom) {
      ctx.moveTo(cx, stripBottom + sz);
      ctx.lineTo(cx - sz, stripBottom);
      ctx.lineTo(cx + sz, stripBottom);
    } else {
      ctx.moveTo(cx, stripTop - sz);
      ctx.lineTo(cx - sz, stripTop);
      ctx.lineTo(cx + sz, stripTop);
    }
    ctx.closePath();
    ctx.fillStyle = T.COLORS.arrow;
    ctx.fill();
  } else {
    const nw = Math.max(3, T.NEEDLE_WIDTH_VH * vh);
    const nh = T.NEEDLE_HEIGHT_VH * vh;
    const nx = cx - nw / 2;
    const ny = bottom ? stripBottom - nh : stripTop;
    ctx.fillStyle = T.COLORS.needle;
    ctx.fillRect(nx, ny, nw, nh);
  }

  if (showDegrees) {
    const yawText = Math.round(yaw).toString();
    const yawY = bottom ? stripTop - T.YAW_OFFSET_VH * vh : stripBottom + T.YAW_OFFSET_VH * vh;
    ctx.font = `400 ${T.YAW_FONT_SIZE_VH * vh}px ${T.FONT_FAMILY}`;
    ctx.fillStyle = T.COLORS.yawText;
    ctx.shadowColor = T.COLORS.yawShadow;
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1;
    ctx.fillText(yawText, cx, yawY);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }
}

function drawWarzone(
  ctx: CanvasRenderingContext2D,
  w: number,
  yaw: number,
  T: Theme,
  vh: number,
  cx: number,
  stripTop: number,
  tickBaseY: number,
): void {
  const tickSpacing = T.TICK_SPACING_VH * vh;
  const pxPerDeg = tickSpacing / T.STEP;

  const halfRangeDeg = w / 2 / pxPerDeg + T.EDGE_BUFFER_DEG;
  const startDeg = Math.floor((yaw - halfRangeDeg) / T.STEP) * T.STEP;
  const endDeg = Math.ceil((yaw + halfRangeDeg) / T.STEP) * T.STEP;

  const fadeZone = T.FADE_ZONE_VH * vh;

  const centerDeg = Math.floor(yaw / T.STEP) * T.STEP;
  const nextDeg = centerDeg + T.STEP;
  const prc = (((yaw % T.STEP) + T.STEP) % T.STEP) / T.STEP;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  for (let deg = startDeg; deg <= endDeg; deg += T.STEP) {
    const offsetDeg = deg - yaw;
    const x = cx + offsetDeg * pxPerDeg;

    if (x < -tickSpacing || x > w + tickSpacing) continue;

    const distFromEdge = Math.min(x, w - x);
    let alpha = Math.min(1, distFromEdge / fadeZone);
    if (alpha < T.MIN_ALPHA) continue;

    if (deg === centerDeg) {
      alpha *= prc < 0.75 ? 0 : (prc - 0.75) / 0.25;
    } else if (deg === nextDeg) {
      alpha *= prc > 0.25 ? 0 : (0.25 - prc) / 0.25;
    }
    if (alpha < T.MIN_ALPHA) continue;

    ctx.globalAlpha = alpha;
    ctx.shadowColor = T.COLORS.shadow;
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const tickYaw = ((deg % 360) + 360) % 360;
    const isFull = tickYaw % 45 === 0;

    const tw = Math.max(3, 0.1 * vh);
    const th = T.WARZONE_TICK_HEIGHT_VH * vh;
    const tx = x - tw / 2;
    const ty = tickBaseY;
    ctx.fillStyle = isFull ? T.COLORS.fullTick : T.COLORS.semiTick;
    ctx.fillRect(tx, ty, tw, th);

    ctx.shadowColor = T.COLORS.labelShadow;
    ctx.shadowBlur = 1;
    if (isFull) {
      ctx.font = `400 ${T.FULL_LABEL_SIZE_VH * vh}px ${T.FONT_FAMILY}`;
      ctx.fillStyle = T.COLORS.fullLabel;
    } else {
      ctx.font = `400 ${T.SEMI_LABEL_SIZE_VH * vh}px ${T.FONT_FAMILY}`;
      ctx.fillStyle = T.COLORS.semiLabel;
    }
    ctx.fillText(
      label(deg),
      x,
      stripTop + T.SEMI_LABEL_OFFSET_VH * vh,
    );
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";

  const panelW = T.PANEL_WIDTH_VH * vh;
  const panelH = T.PANEL_FONT_SIZE_VH * vh + T.PANEL_PADDING_VH * vh * 2;
  const panelX = cx - panelW / 2;
  const panelY = stripTop;

  ctx.strokeStyle = T.COLORS.panelBorder;
  ctx.lineWidth = Math.max(3, T.PANEL_BORDER_VH * vh);
  ctx.beginPath();
  ctx.moveTo(panelX, panelY);
  ctx.lineTo(panelX, panelY + panelH);
  ctx.moveTo(panelX + panelW, panelY);
  ctx.lineTo(panelX + panelW, panelY + panelH);
  ctx.stroke();
  ctx.lineWidth = 1;

  const panelLabel = warzonePanelLabel(yaw, T);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = `700 ${T.PANEL_FONT_SIZE_VH * vh}px ${T.FONT_FAMILY}`;
  ctx.fillStyle = T.COLORS.panelText;
  ctx.shadowColor = T.COLORS.panelShadow;
  ctx.shadowBlur = 1;
  ctx.shadowOffsetY = 1;
  ctx.fillText(panelLabel, cx, panelY + panelH / 2);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
}

export function drawCompass(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: DrawState,
): void {
  ctx.clearRect(0, 0, w, h);

  const T = state.theme;
  const yaw = state.yaw;

  const vh = h / T.CANVAS_HEIGHT_VH;
  const cx = w / 2;

  const stripHeight = T.STRIP_HEIGHT_VH * vh;
  const stripTop = state.bottom ? h - stripHeight - T.STRIP_MARGIN_VH * vh : T.STRIP_MARGIN_VH * vh;
  const stripBottom = stripTop + stripHeight;
  const tickBaseY = state.bottom ? stripBottom : stripTop;

  if (T.type === "warzone") {
    drawWarzone(ctx, w, yaw, T, vh, cx, stripTop, tickBaseY);
  } else {
    drawClassic(ctx, w, state, T, vh, cx, stripTop, stripBottom, tickBaseY);
  }
}
