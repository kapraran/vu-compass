<template>
  <div :class="['compass-widget', indicator, { bottom }]" v-if="enabled">
    <div class="compass-overflow-container">
      <div class="compass-container">
        <ul class="tick-strip">
          <li
            :class="tickClasses(tick)"
            :style="{
              transform: ticksTranslateX,
            }"
            v-for="tick in ticksList"
            :key="tick"
          >
            <div class="tick"></div>
            <span>{{ label(tick) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const degLabels = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

export default {
  props: {
    enabled: Boolean,
    bottom: Boolean,
    yaw: Number,
    indicator: String,
  },

  data() {
    return {
      step: 5,
      visibleTicks: 23,
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
      const offset = (left / this.step) * 1.6;
      return `TranslateX(-${offset}vh)`;
    },
  },
};
</script>

<style lang="scss" scoped>
$arrow-sz: 0.4vh;
$overflow-container-width: 39vh;

@keyframes weird-chromium-glitch {
  0%   { max-width: $overflow-container-width; }
  96%  { max-width: $overflow-container-width; }
  100%  { max-width: $overflow-container-width + 1vh; }
}

.compass-widget {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  .compass-overflow-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 10vh;
    overflow: hidden;
    max-width: $overflow-container-width; // make it dynamic
    animation: weird-chromium-glitch 4s infinite;
  }

  &.bottom {
    bottom: 0;
    top: auto;

    li.tick-container {
      align-items: flex-end;

      span {
        transform: translateY(-1.2vh) !important;
      }
    }

    &.arrow .compass-container ul.tick-strip:before {
      border-top: $arrow-sz solid rgba(255, 255, 255, 0.72);
      border-bottom: none;
      transform: translate(-$arrow-sz, -2vh);
    }
  }

  &.arrow .compass-container ul.tick-strip:before {
    border-left: $arrow-sz solid transparent;
    border-right: $arrow-sz solid transparent;
    border-bottom: $arrow-sz solid #fff;
    background-color: transparent;
    transform: translate(-$arrow-sz, 0.6vh);
    width: 0;
    min-width: auto;
    margin-left: 0;
  }

  .compass-container {
    ul.tick-strip {
      position: relative;
      padding: 0;
      margin: 0;
      display: flex;

      &:before {
        content: "";
        position: absolute;
        z-index: 0;
        left: 50%;
        top: 0;
        width: 0.3vh;
        height: 2.8vh;
        min-width: 3px;
        margin-left: -0.15vh;
        background-color: rgba(255, 0, 0, 0.2);
      }

      li.tick-container {
        position: relative;
        display: flex;
        justify-content: center;
        width: 0.4vh;
        height: 2vh;
        margin-right: 1.6vh;

        &:last-child {
          margin-right: 0;
        }

        .tick {
          width: 0.1vh;
          min-width: 2px;
          height: 0.3vh;
          background-color: rgba(255, 255, 255, 0.32);
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.24);
        }

        &.full .tick {
          height: 0.6vh;
          min-width: 3px;
          width: 0.15vh;
          background-color: rgba(255, 255, 255, 0.64);
        }

        span {
          display: none;
          position: absolute;
          font-size: 1.4vh;
          text-align: center;
          transform: translateY(1.2vh);
          font-weight: 400;
          color: #fff;
          letter-spacing: 0;
          text-shadow: 0 0 4px rgba(0, 0, 0, 0.32);
          z-index: 999;
        }

        &.semi span,
        &.full span {
          display: block;
        }

        &.semi span {
          color: rgba(252, 255, 228, 0.72);
          letter-spacing: 0.1vh;
        }

        &.full span {
          font-size: 1.6vh;
          color: rgba(252, 255, 228, 0.84);
          font-weight: 700;
        }
      }
    }
  }
}
</style>
