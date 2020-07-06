
// let app;
// let window;
import store from "../store";
import { images } from "../resource";
import tray from "../tray";
import db from "../db";
export default {
  app: null,
  window: null,
  register(appIns, win) {
    this.app = appIns;
    this.window = win;
  },
  // 闪烁
  logoTwinkle() {
    store.timer && clearInterval(store.timer);
    store.timer = setInterval(() => {
      store.curImage === images.logo
        ? tray.instance.setImage(images.blank)
        : tray.instance.setImage(images.falsh);
      store.curImage =
        store.curImage === images.logo ? images.blank : images.logo;
    }, 500);
  },
  // 获取唯一id uuid
  getUuid({ userId }) {
    return `${new Date().getTime()}${userId}${(Math.random() * 100000).toFixed()}`;
  },
};
