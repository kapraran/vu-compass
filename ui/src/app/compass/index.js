import { state } from "../vext";
import { drawCompass } from "./renderer";

export class Compass {
  constructor(container) {
    this.widget = document.createElement("div");
    this.widget.className = "compass-widget";
    container.appendChild(this.widget);

    this.canvas = document.createElement("canvas");
    this.canvas.className = "compass-canvas";
    this.widget.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.currentYaw = state.yaw;
    this.width = 0;
    this.height = 0;
    this.fontsReady = false;
    this.wasEnabled = false;

    requestAnimationFrame(() => this.resize());
    window.addEventListener("resize", () => this.resize());

    this.initFonts().then(() => {
      this.fontsReady = true;
      this.startLoop();
    });
  }

  initFonts() {
    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready;
    }
    return new Promise(function (r) {
      setTimeout(r, 500);
    });
  }

  resize() {
    var rect = this.widget.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height;
    if (this.width === 0 || this.height === 0) return;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  startLoop() {
    var self = this;
    function loop() {
      self.tick();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  tick() {
    if (!this.canvas.parentNode) return;
    if (!state.enabled) {
      if (this.wasEnabled) {
        this.resize();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.wasEnabled = false;
      }
      return;
    }

    this.wasEnabled = true;

    if (this.width === 0 || this.height === 0) {
      this.resize();
      if (this.width === 0 || this.height === 0) return;
    }

    var diff = state.yaw - this.currentYaw;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    this.currentYaw += diff * 0.15;
    this.currentYaw = ((this.currentYaw % 360) + 360) % 360;

    this.widget.classList.toggle("bottom", state.bottom);

    if (!this.fontsReady) return;

    drawCompass(this.ctx, this.width, this.height, {
      yaw: this.currentYaw,
      bottom: state.bottom,
      indicator: state.indicator,
      showDegrees: state.showDegrees,
    });
  }
}
