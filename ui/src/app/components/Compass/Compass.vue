<template>
  <div :class="['compass-widget', indicator, { bottom }]" v-if="enabled">
    <div class="compass-overflow-container">
      <span class="current-yaw" v-if="showDegrees">{{ yawNum }}</span>
      <div class="compass-container">
        <ul class="tick-strip" :style="{ transform: ticksTranslateX }">
          <li
            :class="tickClasses(tick)"
            :style="{
              opacity: tickOpacity(i),
            }"
            v-for="(tick, i) in ticksList"
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
  export {default} from './Compass.script';
</script>

<style lang="scss" scoped>
  @import './Compass.styles';
</style>
