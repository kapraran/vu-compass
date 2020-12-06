<template>
  <div class="compass-widget" v-if="enabled">
    <div class="compass-container">
      <ul class="tick-strip">
        <li
          :class="tickClasses(tick)"
          v-for="(tick, i) in ticksList"
          :key="tick"
          :style="{
            transform: ticksTranslateX,
            opacity: tickOpacity(i),
          }"
        >
          <div class="tick"></div>
          <span>{{ label(tick) }}</span>
        </li>
      </ul>

      <div class="indicator">
        {{ bigLabel(yaw) }}
      </div>
    </div>
  </div>
</template>

<script>
const degLabels = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

export default {
  props: {
    enabled: Boolean,
    yaw: Number,
  },

  data() {
    return {
      step: 15,
      visibleTicks: 11,
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

    bigLabel(deg) {
      const mod = deg % 45
      console.log(deg, mod)
      if (mod >= 40 || mod <= 5) {
        deg -= mod <= 5 ? mod: mod - 45
      }

      return this.label(deg)
    },

    // tickScale(i) {
    //   const diff = Math.floor(Math.abs(i - this.visibleTicks/2))
    //   return `scale(${1 + (((Math.floor(this.visibleTicks/2) + 1) - diff) * 0.12)})`
    // },

    tickOpacity(i) {
      const center = Math.floor(this.visibleTicks / 2);
      const next = center + 1;
      const left = this.yaw % this.step;
      const prc = left / this.step;

      if (i === 0 && left > 0) return 0;
      if (i === center) return prc < 0.75 ? 0 : (prc - 0.75) / 0.25;
      if (i === next) return prc > 0.25 ? 0 : (0.25 - prc) / 0.25;

      return 1;
    },
  },

  computed: {
    ticksList() {
      const initAngle =
        Math.floor(
          (this.yaw - Math.floor(this.visibleTicks / 2) * this.step) / this.step
        ) *
          this.step;
      return new Array(this.visibleTicks)
        .fill(0)
        .map((v, i) => initAngle + i * this.step)
        .map((v) => (v > 360 ? v - 360 : v < 0 ? 360 - -v : v));
    },

    ticksTranslateX() {
      const left = this.yaw % this.step;
      const offset = (left / this.step) * 5;
      return `TranslateX(-${offset}vh)`;
    },
  },
};
</script>

<style lang="scss" scoped>
$arrow-sz: 0.6vh;

.compass-widget {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 1vh;
  left: 0;
  right: 0;

  .compass-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    ul.tick-strip {
      position: relative;
      padding: 0;
      margin: 0;
      display: flex;

      li.tick-container {
        position: relative;
        display: flex;
        justify-content: center;
        width: 0.4vh;
        height: 2vh;
        margin-right: 5vh;

        &:last-child {
          margin-right: 0;
        }

        .tick {
          width: 0.1vh;
          min-width: 3px;
          height: 0.6vh;
          background-color: rgba(255, 255, 255, 0.64);
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.24);
        }

        &.full .tick {
          // height: 0.6vh;
          // min-width: 3px;
          // width: 0.15vh;
          background-color: #fff;
        }

        span {
          display: none;
          position: absolute;
          font-size: 1.2vh;
          font-weight: 700;
          text-align: center;
          transform: translateY(1.2vh);
          font-weight: 400;
          color: #fff;
          letter-spacing: 0.2vh;
          text-shadow: 0 0 1px rgba(0, 0, 0, 0.32);
          z-index: 999;
        }

        &.semi span,
        &.full span {
          display: block;
        }

        &.semi span {
          opacity: 0.75;
        }

        &.full span {
          font-size: 1.5vh;
          color: rgb(252, 255, 228);
          font-weight: 700;
        }
      }
    }

    .indicator {
      z-index: 9999;
      width: 5vh;
      padding: 0.25vh 0;
      text-align: center;
      border-left: 0.2vh solid #e7e7dd;
      border-right: 0.2vh solid #e7e7dd;
      color: #fca94b;
      font-size: 2.2vh;
      font-weight: 700;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.75);
      transform: translateY(-2vh);
    }
  }
}
</style>
