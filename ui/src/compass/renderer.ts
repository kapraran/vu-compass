import { CONFIG } from "./config";

const DEG_LABELS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

export interface DrawState {
  yaw: number;
  bottom: boolean;
  indicator: "arrow" | "needle";
  showDegrees: boolean;
}

export function drawCompass(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: DrawState,
): void {
  ctx.clearRect(0, 0, w, h);

  const { yaw, bottom, indicator } = state;
  const C = CONFIG;

  const vh = h / C.CANVAS_HEIGHT_VH;
  const cx = w / 2;

  const stripHeight = C.STRIP_HEIGHT_VH * vh;
  const stripTop = bottom ? h - stripHeight - C.STRIP_MARGIN_VH * vh : C.STRIP_MARGIN_VH * vh;
  const stripBottom = stripTop + stripHeight;
  const tickBaseY = bottom ? stripBottom : stripTop;

  const tickSpacing = C.TICK_SPACING_VH * vh;
  const pxPerDeg = tickSpacing / C.DEGREES_PER_TICK;

  const halfRangeDeg = w / 2 / pxPerDeg + C.EDGE_BUFFER_DEG;
  const startDeg = Math.floor((yaw - halfRangeDeg) / C.DEGREES_PER_TICK) * C.DEGREES_PER_TICK;
  const endDeg = Math.ceil((yaw + halfRangeDeg) / C.DEGREES_PER_TICK) * C.DEGREES_PER_TICK;

  const fadeZone = C.FADE_ZONE_VH * vh;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  for (let deg = startDeg; deg <= endDeg; deg += C.DEGREES_PER_TICK) {
    const offsetDeg = deg - yaw;
    const x = cx + offsetDeg * pxPerDeg;

    if (x < -tickSpacing || x > w + tickSpacing) continue;

    const distFromEdge = Math.min(x, w - x);
    const alpha = Math.min(1, distFromEdge / fadeZone);
    if (alpha < C.MIN_ALPHA) continue;

    ctx.globalAlpha = alpha;
    ctx.shadowColor = C.COLORS.shadow;
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const tickYaw = ((deg % 360) + 360) % 360;
    const isFull = tickYaw % 45 === 0;
    const isSemi = !isFull && tickYaw % 15 === 0;

    if (isFull) {
      const tw = Math.max(3, C.FULL_TICK_WIDTH_VH * vh);
      const th = C.FULL_TICK_HEIGHT_VH * vh;
      const tx = x - tw / 2;
      const ty = bottom ? tickBaseY - th : tickBaseY;
      ctx.fillStyle = C.COLORS.fullTick;
      ctx.fillRect(tx, ty, tw, th);

      ctx.shadowBlur = 4;
      ctx.shadowColor = C.COLORS.labelShadow;
      ctx.font = `500 ${C.FULL_LABEL_SIZE_VH * vh}px Poppins`;
      ctx.fillStyle = C.COLORS.fullLabel;
      ctx.fillText(
        DEG_LABELS[tickYaw / 45],
        x,
        stripTop + (bottom ? -C.FULL_LABEL_OFFSET_VH * vh : C.FULL_LABEL_OFFSET_VH * vh),
      );
      ctx.shadowBlur = 6;
      ctx.shadowColor = C.COLORS.shadow;
    } else if (isSemi) {
      const r = Math.max(2, C.MINOR_TICK_RADIUS_VH * vh);
      const cy = bottom ? tickBaseY - r : tickBaseY + r;
      ctx.fillStyle = C.COLORS.semiTick;
      ctx.beginPath();
      ctx.arc(x, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 4;
      ctx.shadowColor = C.COLORS.labelShadow;
      ctx.font = `400 ${C.SEMI_LABEL_SIZE_VH * vh}px Poppins`;
      ctx.fillStyle = C.COLORS.semiLabel;
      ctx.fillText(
        tickYaw.toString(),
        x,
        stripTop + (bottom ? -C.SEMI_LABEL_OFFSET_VH * vh : C.SEMI_LABEL_OFFSET_VH * vh),
      );
      ctx.shadowBlur = 6;
      ctx.shadowColor = C.COLORS.shadow;
    } else {
      const r = Math.max(2, C.MINOR_TICK_RADIUS_VH * vh);
      const cy = bottom ? tickBaseY - r : tickBaseY + r;
      ctx.fillStyle = C.COLORS.minorTick;
      ctx.beginPath();
      ctx.arc(x, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";

  if (indicator === "arrow") {
    const sz = C.ARROW_SIZE_VH * vh;
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
    ctx.fillStyle = C.COLORS.arrow;
    ctx.fill();
  } else {
    const nw = Math.max(3, C.NEEDLE_WIDTH_VH * vh);
    const nh = C.NEEDLE_HEIGHT_VH * vh;
    const nx = cx - nw / 2;
    const ny = bottom ? stripBottom - nh : stripTop;
    ctx.fillStyle = C.COLORS.needle;
    ctx.fillRect(nx, ny, nw, nh);
  }

  if (state.showDegrees) {
    const yawText = Math.round(yaw).toString();
    const yawY = bottom ? stripTop - C.YAW_OFFSET_VH * vh : stripBottom + C.YAW_OFFSET_VH * vh;
    ctx.font = `400 ${C.YAW_FONT_SIZE_VH * vh}px Poppins`;
    ctx.fillStyle = C.COLORS.yawText;
    ctx.shadowColor = C.COLORS.yawShadow;
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1;
    ctx.fillText(yawText, cx, yawY);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }
}
