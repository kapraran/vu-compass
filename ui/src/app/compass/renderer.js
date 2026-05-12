var DEG_LABELS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

export function drawCompass(ctx, w, h, state) {
  ctx.clearRect(0, 0, w, h);

  var yaw = state.yaw;
  var bottom = state.bottom;
  var indicator = state.indicator;

  var vh = h / 10;
  var cx = w / 2;

  var stripHeight = 3 * vh;
  var stripTop = bottom ? h - stripHeight - 0.5 * vh : 0.5 * vh;
  var stripBottom = stripTop + stripHeight;
  var tickBaseY = bottom ? stripBottom : stripTop;

  var tickSpacing = 2.1 * vh;
  var pxPerDeg = tickSpacing / 5;

  var halfRangeDeg = (w / 2) / pxPerDeg + 10;
  var startDeg = Math.floor((yaw - halfRangeDeg) / 5) * 5;
  var endDeg = Math.ceil((yaw + halfRangeDeg) / 5) * 5;

  var fadeZone = 10 * vh;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  for (var deg = startDeg; deg <= endDeg; deg += 5) {
    var offsetDeg = deg - yaw;
    var x = cx + offsetDeg * pxPerDeg;

    if (x < -tickSpacing || x > w + tickSpacing) continue;

    var distFromEdge = Math.min(x, w - x);
    var alpha = Math.min(1, distFromEdge / fadeZone);
    if (alpha < 0.01) continue;

    ctx.globalAlpha = alpha;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.56)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    var tickYaw = ((deg % 360) + 360) % 360;
    var isFull = tickYaw % 45 === 0;
    var isSemi = !isFull && tickYaw % 15 === 0;

    if (isFull) {
      var tw = Math.max(3, 0.25 * vh);
      var th = 1 * vh;
      var tx = x - tw / 2;
      var ty = bottom ? tickBaseY - th : tickBaseY;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.64)';
      ctx.fillRect(tx, ty, tw, th);

      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(0, 13, 71, 0.92)';
      ctx.font = '500 ' + (1.7 * vh) + 'px Poppins';
      ctx.fillStyle = 'rgba(252, 255, 228, 0.84)';
      ctx.fillText(DEG_LABELS[tickYaw / 45], x, stripTop + (bottom ? -1.2 * vh : 1.2 * vh));
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.56)';
    } else if (isSemi) {
      var r = Math.max(2, 0.2 * vh);
      var cy = bottom ? tickBaseY - r : tickBaseY + r;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.56)';
      ctx.beginPath();
      ctx.arc(x, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(0, 13, 71, 0.92)';
      ctx.font = '400 ' + (1.3 * vh) + 'px Poppins';
      ctx.fillStyle = 'rgba(252, 255, 228, 0.76)';
      ctx.fillText(tickYaw.toString(), x, stripTop + (bottom ? -1.1 * vh : 1.1 * vh));
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.56)';
    } else {
      var r = Math.max(2, 0.2 * vh);
      var cy = bottom ? tickBaseY - r : tickBaseY + r;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.beginPath();
      ctx.arc(x, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  if (indicator === 'arrow') {
    var sz = 0.4 * vh;
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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.fill();
  } else {
    var nw = Math.max(3, 0.3 * vh);
    var nh = 2.8 * vh;
    var nx = cx - nw / 2;
    var ny = bottom ? stripBottom - nh : stripTop;
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    ctx.fillRect(nx, ny, nw, nh);
  }

  if (state.showDegrees) {
    var yawText = Math.round(yaw).toString();
    var yawY = bottom ? stripTop - 1.5 * vh : stripBottom + 1.5 * vh;
    ctx.font = '400 ' + (1.3 * vh) + 'px Poppins';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1;
    ctx.fillText(yawText, cx, yawY);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }
}
