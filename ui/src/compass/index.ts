import { state, setEnableCallback } from "../vext";
import { drawCompass } from "./renderer";
import { THEMES } from "./themes";

export class Compass {
  private widget: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private currentYaw: number;
  private width = 0;
  private height = 0;
  private fontsReady = false;
  private currentFontFamily = "";
  private wasEnabled = false;
  private loopHandle: number | null = null;
  private lastScale = state.scale;
  private lastTheme = state.theme;

  constructor(container: HTMLElement) {
    this.widget = document.createElement("div");
    this.widget.className = "compass-widget";
    container.appendChild(this.widget);

    this.canvas = document.createElement("canvas");
    this.canvas.className = "compass-canvas";
    this.widget.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;

    this.currentYaw = state.yaw;

    requestAnimationFrame(() => this.resize());
    window.addEventListener("resize", () => this.resize());

    setEnableCallback((enabled) => {
      if (enabled) this.scheduleTick();
    });

      this.loadFonts().then(() => {
      this.fontsReady = true;
      this.scheduleTick();
    });
  }

  private async loadFonts(): Promise<void> {
    if (typeof FontFace !== "undefined") {
      try {
        const faces = [
          new FontFace("Poppins", "url(/fonts/poppins-v15-latin-regular.ttf)", { weight: "400" }),
          new FontFace("Poppins", "url(/fonts/poppins-v15-latin-500.ttf)", { weight: "500" }),
          new FontFace("Poppins", "url(/fonts/poppins-v15-latin-700.ttf)", { weight: "700" }),
          new FontFace("Unica One", "url(/fonts/unica-one-regular.ttf)", { weight: "400" }),
          new FontFace("Unica One", "url(/fonts/unica-one-regular.ttf)", { weight: "700" }),
        ];

        await Promise.all(faces.map(async (face) => {
          const loaded = await face.load();
          document.fonts.add(loaded);
        }));
      } catch {
        // FontFace API failed, fall through
      }
    }

    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    } else {
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Force Gameface render thread to rasterize glyphs via a hidden
    // DOM element, then toggle widget visibility to re-init the
    // canvas backing store with the populated glyph atlas
    const probe = document.createElement("div");
    probe.style.cssText = "position:absolute;visibility:hidden;";
    probe.style.fontFamily = "Unica One";
    probe.textContent = "NESW0123456789";
    document.body.appendChild(probe);
    void probe.offsetHeight;
    await new Promise((r) => requestAnimationFrame(r));
    probe.remove();

    this.widget.style.display = "none";
    await new Promise((r) => requestAnimationFrame(r));
    this.widget.style.display = "";

    this.ctx = this.canvas.getContext("2d")!;
    this.resize();
  }

  private applyScale(): void {
    const theme = THEMES[state.theme];
    const h = theme.CANVAS_HEIGHT_VH * state.scale;
    this.widget.style.height = `${h}vh`;
  }

  private resize(): void {
    this.applyScale();

    const rect = this.widget.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height;
    if (this.width === 0 || this.height === 0) return;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private scheduleTick(): void {
    if (this.loopHandle !== null) return;
    this.loopHandle = requestAnimationFrame(() => {
      this.loopHandle = null;
      if (!this.canvas.parentNode) return;
      this.tick();
      if (state.enabled || this.wasEnabled) {
        this.scheduleTick();
      }
    });
  }

  private tick(): void {
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

    if (state.scale !== this.lastScale || state.theme !== this.lastTheme) {
      this.resize();
      this.lastScale = state.scale;
      this.lastTheme = state.theme;
    }

    const theme = THEMES[state.theme];

    if (theme.FONT_FAMILY !== this.currentFontFamily) {
      this.currentFontFamily = theme.FONT_FAMILY;
      this.fontsReady = false;
    this.loadFonts().then(() => {
        this.fontsReady = true;
      });
      return;
    }

    if (!this.fontsReady) return;

    let diff = state.yaw - this.currentYaw;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    this.currentYaw += diff * theme.LERP_FACTOR;
    this.currentYaw = ((this.currentYaw % 360) + 360) % 360;

    this.widget.classList.toggle("bottom", state.bottom);

    drawCompass(this.ctx, this.width, this.height, {
      yaw: this.currentYaw,
      theme,
      bottom: state.bottom,
      indicator: state.indicator,
      showDegrees: state.showDegrees,
    });
  }
}
