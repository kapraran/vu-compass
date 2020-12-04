import Vue from "vue";
import App from "./components/App.vue";
import { vext } from "./vext";

new Vue({ render: (createElement) => createElement(App) }).$mount("#root");

window.vext = vext;
