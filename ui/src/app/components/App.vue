<template>
  <div id="app">
    <Compass
      :enabled="enabled"
      :yaw="yaw"
      :bottom="bottom"
      :indicator="indicator"
      :showDegrees="showDegrees"
    ></Compass>
  </div>
</template>

<script>
import { state } from "../vext";
import Compass from "./Compass/Compass";

export default {
  components: {
    Compass,
  },
  data() {
    return state;
  },
};
</script>
