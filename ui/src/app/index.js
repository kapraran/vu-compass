import Vue from "vue";
import App from "./components/App.vue";
import { vext } from "./vext";

new Vue({ render: (createElement) => createElement(App) }).$mount("#root");

window.vext = vext;

// debug
// setInterval(() => {
//   if (typeof WebUI === "undefined") {
//     document.body.style.backgroundColor = "green";
//     vext.enable(true);
//     vext.setBottom(true);
//     vext.showDegrees(true);
//     vext.setIndicator("arrow");
//   }
// }, 1000)
