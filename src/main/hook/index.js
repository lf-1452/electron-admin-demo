import {
  BrowserWindow,
  app
} from 'electron';
import store from '../store';
import diff from '../diff';
import log from 'electron-log';
export default {
  register(win) {
    this.close(win);
    this.closed(win);
    this.focus(win);
    this.blur(win);
    // this.crashed(win);
    // this.newWindow(win);
  },
  // 当 window 被关闭，这个事件会被触发。
  closed(win) {
    win.on('closed', () => {
      log.warn('关闭后');
      // 所有窗口清除
      BrowserWindow.getAllWindows().forEach((winItem, idx) => {
        winItem.destroy();
      });
      process.platform === 'darwin' && app.quit();
    });
  },
  // 关闭前的生命周期
  close(win) {
    win.on('close', (event) => {
      log.warn('关闭',store.forceQuit);
      // forceQuit主要用于区分mac版交通灯x 与 mac版dock(程序坞)退出的差别
      // 点击交通灯 不会触发before-quit的生命周期 而dock会
      if (!store.forceQuit) {
        // 隐藏
        store.isShow = false;
        //通知前端，窗口关闭
        win.webContents.send('sendWinShow',false);
        win.hide();
        // 隐藏到托盘
        win.setSkipTaskbar(true);
        event.preventDefault();
      }
    });
  },
  // 聚焦
  focus(win) {
    win.on('focus', () => {
      // 取消高亮
      win.flashFrame(false);
      // 设置任务栏显示
      win.setSkipTaskbar(false);
      store.isShow = true;
      //通知前端，窗口打开
      win.webContents.send('sendWinShow',true);
      // 关闭闪烁
      process.platform === 'darwin' && diff.mac.clostwinkleEvent();
    });
  },
  // 失焦
  blur(win) {
    win.on('blur', () => {
      store.isShow = false;
      //通知前端，窗口关闭
      win.webContents.send('sendWinShow',false);
    });
  }
  // crashed(win) {
  //     win.webContents.on('crashed', () => {
  //         reloadWindow(win)
  //     })
  // }
  // 新窗口打开
  // newWindow(win) {
  //     win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  //         event.preventDefault();
  //         const win = new BrowserWindow({
  //             webContents: options.webContents, // use existing webContents if provided
  //             show: false
  //         })
  //         win.once('ready-to-show', () => win.show())
  //         if (!options.webContents) {
  //             win.loadURL(url) // existing webContents will be navigated automatically
  //         }
  //         event.newGuest = win
  //     })
  // }
};

// function reloadWindow(mainWin) {
//     if (mainWin.isDestroyed()) {
//         app.relaunch();
//         app.exit(0);
//     } else {
//         BrowserWindow.getAllWindows().forEach((w) => {
//             if (w.id !== mainWin.id) w.destroy();
//         });
//         mainWin.reload();
//     }
// }
