<template>
  <div :class="['compass-widget', indicator, { bottom }]" v-if="enabled">
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
      const classes = ["tick-container"];

      if (deg % 45 === 0) {
        classes.push("full");
      } else if (deg % 15 === 0) {
        classes.push("semi");
      }

      return classes;
    },

    label(deg) {
      return deg % 45 === 0 ? degLabels[deg / 45] : deg;
    },
  },

  computed: {
    ticksList() {
      const initAngle =
        Math.floor(
          (this.yaw - Math.floor(this.visibleTicks / 2) * this.step) / 5
        ) * 5;
      return new Array(this.visibleTicks)
        .fill(0)
        .map((v, i) => initAngle + i * this.step)
        .map((v) => (v > 360 ? v - 360 : v < 0 ? 360 - -v : v));
    },

    ticksTranslateX() {
      const left = this.yaw % this.step;
      const offset = (left / this.step) * 1.8;
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
  top: 0;
  left: 0;
  right: 0;

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
      border-top: $arrow-sz solid #fff;
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
        margin-right: 1.8vh;

        &:last-child {
          margin-right: 0;
        }

        .tick {
          width: 0.1vh;
          min-width: 2px;
          height: 0.3vh;
          background-color: rgba(255, 255, 255, 0.64);
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.24);
        }

        &.full .tick {
          height: 0.6vh;
          min-width: 3px;
          width: 0.15vh;
          background-color: #fff;
        }

        span {
          display: none;
          position: absolute;
          font-size: 1.4vh;
          text-align: center;
          transform: translateY(1.2vh);
          font-weight: 400;
          color: #fff;
          letter-spacing: 0.2vh;
          text-shadow: 0 0 4px rgba(0, 0, 0, 0.32);
          z-index: 999;
        }

        &.semi span,
        &.full span {
          display: block;
        }

        &.full span {
          font-size: 1.7vh;
          color: rgb(252, 255, 228);
          font-weight: 700;
        }
      }
    }
  }
}
</style>
