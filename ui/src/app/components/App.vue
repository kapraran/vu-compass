<template>
  <div id="app">
    <Compass
      :enabled="enabled"
      :yaw="yaw"
      :bottom="bottom"
      :indicator="indicator"
    ></Compass>
  </div>
</template>

<script>
import { state } from "../vext";
import Compass from "./Compass";

export default {
  components: {
    Compass,
  },

  data() {
    return state;
  },
};
</script>
