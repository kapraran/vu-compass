<template>
  <div id="app">
    <Compass
      :enabled="enabled"
      :yaw="yaw"
      :bottom="bottom"
      :indicator="indicator"
    ></Compass>
    <!-- <WarzoneCompass :enabled="enabled" :yaw="yaw"></WarzoneCompass> -->
  </div>
</template>

<script>
import { state } from "../vext";
import Compass from "./Compass";
import WarzoneCompass from "./WarzoneCompass";

export default {
  components: {
    Compass,
    WarzoneCompass,
  },
  data() {
    return state;
  },
};
</script>
