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

  const vh = h / 10;
  const cx = w / 2;

  const stripHeight = 3 * vh;
  const stripTop = bottom ? h - stripHeight - 0.5 * vh : 0.5 * vh;
  const stripBottom = stripTop + stripHeight;
  const tickBaseY = bottom ? stripBottom : stripTop;

  const tickSpacing = 2.1 * vh;
  const pxPerDeg = tickSpacing / 5;

  const halfRangeDeg = w / 2 / pxPerDeg + 10;
  const startDeg = Math.floor((yaw - halfRangeDeg) / 5) * 5;
  const endDeg = Math.ceil((yaw + halfRangeDeg) / 5) * 5;

  const fadeZone = 10 * vh;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  for (let deg = startDeg; deg <= endDeg; deg += 5) {
    const offsetDeg = deg - yaw;
    const x = cx + offsetDeg * pxPerDeg;

    if (x < -tickSpacing || x > w + tickSpacing) continue;

    const distFromEdge = Math.min(x, w - x);
    const alpha = Math.min(1, distFromEdge / fadeZone);
    if (alpha < 0.01) continue;

    ctx.globalAlpha = alpha;
    ctx.shadowColor = "rgba(0, 0, 0, 0.56)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const tickYaw = ((deg % 360) + 360) % 360;
    const isFull = tickYaw % 45 === 0;
    const isSemi = !isFull && tickYaw % 15 === 0;

    if (isFull) {
      const tw = Math.max(3, 0.25 * vh);
      const th = 1 * vh;
      const tx = x - tw / 2;
      const ty = bottom ? tickBaseY - th : tickBaseY;
      ctx.fillStyle = "rgba(255, 255, 255, 0.64)";
      ctx.fillRect(tx, ty, tw, th);

      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0, 13, 71, 0.92)";
      ctx.font = `500 ${1.7 * vh}px Poppins`;
      ctx.fillStyle = "rgba(252, 255, 228, 0.84)";
      ctx.fillText(DEG_LABELS[tickYaw / 45], x, stripTop + (bottom ? -1.2 * vh : 1.2 * vh));
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(0, 0, 0, 0.56)";
    } else if (isSemi) {
      const r = Math.max(2, 0.2 * vh);
      const cy = bottom ? tickBaseY - r : tickBaseY + r;
      ctx.fillStyle = "rgba(255, 255, 255, 0.56)";
      ctx.beginPath();
      ctx.arc(x, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0, 13, 71, 0.92)";
      ctx.font = `400 ${1.3 * vh}px Poppins`;
      ctx.fillStyle = "rgba(252, 255, 228, 0.76)";
      ctx.fillText(tickYaw.toString(), x, stripTop + (bottom ? -1.1 * vh : 1.1 * vh));
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(0, 0, 0, 0.56)";
    } else {
      const r = Math.max(2, 0.2 * vh);
      const cy = bottom ? tickBaseY - r : tickBaseY + r;
      ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
      ctx.beginPath();
      ctx.arc(x, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";

  if (indicator === "arrow") {
    const sz = 0.4 * vh;
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
    ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
    ctx.fill();
  } else {
    const nw = Math.max(3, 0.3 * vh);
    const nh = 2.8 * vh;
    const nx = cx - nw / 2;
    const ny = bottom ? stripBottom - nh : stripTop;
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fillRect(nx, ny, nw, nh);
  }

  if (state.showDegrees) {
    const yawText = Math.round(yaw).toString();
    const yawY = bottom ? stripTop - 1.5 * vh : stripBottom + 1.5 * vh;
    ctx.font = `400 ${1.3 * vh}px Poppins`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.68)";
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1;
    ctx.fillText(yawText, cx, yawY);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }
}
