<template>
  <div class="compass-widget" v-if="enabled">
    <div class="compass-container">
      <div class="tick-strip"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    enabled: Boolean,
    yaw: Number,
  },

  computed: {
    ticksList() {
      const totalSteps = 360 / this.step;
      const totalTicks = totalSteps + this.visibleTicks;
      return Array.from(Array(totalTicks).keys()).map(
        (i) =>
          (360 - parseInt(this.visibleTicks / 2) * this.step + i * this.step) %
          360
      );
    },
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
    width: 60vh;
  }
}
</style>
