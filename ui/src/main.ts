import "./style.css";
import { Compass } from "./compass";
import { vext } from "./vext";

new Compass(document.getElementById("root")!);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).vext = vext;

// debug
setInterval(() => {
  if (typeof (window as any).WebUI === "undefined") {
    document.body.style.backgroundColor = "green";
    vext.enable(true);
    vext.showDegrees(true);
    vext.setIndicator("arrow");
    vext.setYaw(315);
  }
}, 1000);
