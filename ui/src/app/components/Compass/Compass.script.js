const degLabels = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

export default {
  props: {
    enabled: Boolean,
    bottom: Boolean,
    yaw: Number,
    indicator: String,
    showDegrees: Boolean,
  },

  data() {
    return {
      step: 5,
      visibleTicks: 25,
    };
  },

  methods: {
    tickClasses(deg) {
      return [
        "tick-container",
        deg % 45 === 0 ? "full" : deg % 15 === 0 ? "semi" : null,
      ].filter((name) => name !== null);
    },

    label(deg) {
      return deg % 45 === 0 ? degLabels[deg / 45] : deg;
    },

    tickOpacity(i) {
      const j = Math.min(i, this.visibleTicks - i - 1);
      return Math.min(1, j * 0.22);
    },
  },

  computed: {
    ticksList() {
      const initAngle =
        Math.floor(
          (this.yaw - Math.floor(this.visibleTicks / 2) * this.step) / this.step
        ) * this.step;
      return new Array(this.visibleTicks)
        .fill(0)
        .map((v, i) => initAngle + i * this.step)
        .map((v) => (v > 360 ? v - 360 : v < 0 ? 360 - -v : v));
    },

    ticksTranslateX() {
      const left = this.yaw % this.step;
      const offset = (left / this.step) * 2.2;
      return `TranslateX(-${offset}vh)`;
    },

    yawNum() {
      return this.yaw <= 359 ? this.yaw : 0;
    },
  },
};
