import Vue from "vue";
import App from "./components/App.vue";
import { vext } from "./vext";

new Vue({ render: (createElement) => createElement(App) }).$mount("#root");

window.vext = vext;

// if (typeof WebUI === "undefined") {
//   document.body.style.backgroundColor = "green";
//   vext.setEnabled(true);
//   // vext.setBottom(true);
//   // vext.setIndicator("arrow");
// }
