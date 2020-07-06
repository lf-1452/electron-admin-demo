import {
  autoUpdater
} from 'electron-updater';
import pkg from '../../../package.json';
import { BrowserWindow, app } from 'electron';
const isDev = process.env.NODE_ENV === 'development';
const uploadUrl = pkg.build.publish[0].url + '/download';
const message = {
  error: '检查更新出错',
  checking: '正在检查更新……',
  updateAva: '检测到新版本，正在下载……',
  updateNotAva: '现在使用的就是最新版本，不用更新'
};
let window;
const updater = {
  init(win) {
    console.log('??');
    // 生产模式才执行
    if (isDev) {
      return;
    }
    // 主窗口
    window = win;
    // 设置更新路径
    autoUpdater.setFeedURL(uploadUrl);
    // 更新错误
    autoUpdater.on('error', this.updateError);
    // 检查更新
    autoUpdater.on('checking-for-update', this.checkingUpdate);
    // 应用需更新
    autoUpdater.on('update-available', this.updateAvailabel);
    // 应用不需更新
    autoUpdater.on('update-not-available', this.updateNotAvailable);
    // 应用更新进度
    autoUpdater.on('download-progress', this.downloadProgress);
    // 应用下载完成
    autoUpdater.on('update-downloaded', this.updateDownloaded);
    //执行自动更新检查
    try {
      autoUpdater.checkForUpdates();
    } catch (err) {
      console.log(err);
    }
  },
  // 检查更新出错
  updateError(error) {
    sendUpdateMessage(error);
  },
  // 检查更新中
  checkingUpdate() {
    sendUpdateMessage(message.checking);
  },
  // 应用需更新
  updateAvailabel(info) {
    sendUpdateMessage(message.updateNotAva);
  },
  // 应用已是最新
  updateNotAvailable(info) {
    sendUpdateMessage(message.updateNotAva);
  },
  // 更新进度
  downloadProgress(progressObj) {
    sendUpdateProgress(progressObj);
  },
  // 更新下载完成
  updateDownloaded(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    updateDownloaded();
  },
  // 退出并安装
  quitAndInstall() {
    setImmediate(() => {
      // 关闭所有监听
      ensureSafeQuitAndInstall();
      // 调用退出安装
      autoUpdater.quitAndInstall();
    });
  }
};
// 确保可以安全退出程序

function ensureSafeQuitAndInstall() {
  app.removeAllListeners('window-all-closed');
  BrowserWindow.getAllWindows().forEach(browserwindow => browserwindow.removeAllListeners('close'));
}

// 发送更新信息
function sendUpdateMessage(text) {
  window.webContents.send('message', text);
}
// 发送更新进度
function sendUpdateProgress(progressObj) {
  window.webContents.send('downloadProgress', progressObj);
}
// 下载完成
function updateDownloaded() {
  // 通知渲染进程下载完成 可更新
  window.webContents.send('isUpdateNow');
}

export default updater;
