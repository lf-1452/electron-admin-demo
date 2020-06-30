import {
  BrowserWindow
} from 'electron';
import {
  images
} from '../resource';
import noticationWin from './noticationWin';
import largePictureWin from './largePictureWin';
export default {
  'wordWin': null,
  'outLinkWin': null,
  noticationWin,
  // 注册事件
  register(win, app) {
    process.platform !== 'darwin' && noticationWin.register(win, app);
    largePictureWin.register(win,app);
  },
  //隐藏子窗口
  hideWin() {
    //初始化托盘,取消闪烁
    process.platform !== 'darwin' && noticationWin.init([], '');
    //销毁子窗口
    process.platform !== 'darwin' && noticationWin.destroy();
    largePictureWin.destroy();
  },
  // word文档显示
  wordShow(url) {
    if (!this.wordWin || this.wordWin.isDestroyed()) {
      this.wordWin = new BrowserWindow({
        'icon': images.icon,
        'zoomToPageWidth': true,
        'resizable': true,
        'titleBarStyle': 'hidden',
        'maximizable': true, // 是否能最大化
        'show': false,
        'webPreferences': {
          'nodeIntegration': true
        }
      });
    }
    this.wordWin.loadURL(url);
    this.wordWin.show();
  }

};
