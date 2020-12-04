<template>
  <div class="compass-widget" v-if="enabled">
    <div class="compass-container">
      <ul class="tick-strip">
        <li
          :class="tickClasses(tick)"
          :style="{
            transform: ticksTranslateX
          }"
          v-for="tick in ticksList"
          :key="tick"
        >
          <div class="tick"></div>
          <span>{{ tick }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    enabled: Boolean,
    yaw: Number,
  },

  data() {
    return {
      step: 5,
      visibleTicks: 24,
    };
  },

  methods: {
    tickClasses(deg) {
      const classes = ['tick-container']

      if (deg % 15 === 0) {
        classes.push('full')
      } else if (deg % 5 === 0) {
        // classes.push('semi')
      }

      return classes
    }
  },

  computed: {
    ticksList() {
      const initAngle =
        Math.floor((this.yaw - (this.visibleTicks / 2) * this.step) / 5) * 5;
      return new Array(this.visibleTicks)
        .fill(0)
        .map((v, i) => initAngle + i * this.step)
        .map((v) => (v > 360 ? v - 360 : v < 0 ? 360 - -v : v));
    },

    ticksTranslateX() {
      const left = this.yaw % this.step
      const offset = (left/this.step) * 2
      return `TranslateX(-${offset}vh)`
    }
  },
};
</script>

<style lang="scss" scoped>
.compass-widget {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  .compass-container {

    ul.tick-strip {
      padding: 0;
      margin: 0;
      display: flex;

      li.tick-container {
        position: relative;
        display: flex;
        justify-content: center;
        width: 0.4vh;
        height: 2vh;
        margin-right: 2vh;

        &:last-child {
          margin-right: 0;
        }

        .tick {
          width: 0.1vh;
          min-width: 2px;
          height: 0.4vh;
          background-color: #fff;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.48);
        }

        &.full .tick {
          height: 0.8vh;
        }

        span {
          display: none;
          position: absolute;
          font-size: 1.4vh;
          text-align: center;
          transform: translateY(1.5vh);
          font-weight: 600;
          color: #fff;
          text-shadow: 0 0 4px rgba(0, 0, 0, 0.48);
        }

        &.semi span,
        &.full span {
          display: block;
        }
      }
    }
  }
}
</style>
