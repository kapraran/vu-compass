import { Compass } from './compass';
import { vext } from './vext';

new Compass(document.getElementById('root'));

window.vext = vext;

// debug
setInterval(function () {
  if (typeof WebUI === 'undefined') {
    document.body.style.backgroundColor = 'green';
    vext.enable(true);
    vext.showDegrees(true);
    vext.setIndicator('arrow');
    vext.setYaw(315);
  }
}, 1000);
