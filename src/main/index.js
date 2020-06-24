import {
    app,
    BrowserWindow,
    Menu,
    shell,
} from 'electron';
import hook from './hook';
import bridge from './bridge';
import diff from './diff';
import globalShortcut from './globalShortcut';
import system from './system';
import utils from './utils';
import path from 'path';
import tray from './tray';
import store from './store';
import db from './db';
import pkg from '../../package.json';
import {
    images
} from './resource';

let URL = process.env.NODE_ENV === 'development' ?
    'http://localhost:8080' :
    `file://${path.join(
        __dirname,
        '../renderer/bonade-im-part/index.html'
    )}`
let win;

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: process.platform === 'darwin' ? 1200 : 1204,
        height: process.platform === 'darwin' ? 700 : 704,
        minWidth: 960,
        minHeight: 640,
        icon: images.logo,
        zoomToPageWidth: true,
        titleBarStyle: "hidden",
        frame: false,
        resizable: true,
        transparent: true,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    if ( process.platform != 'darwin') {   // 禁止Windows下双击最大化和调用maximize行为不一致导致的窗口尺寸变化
      win.maximizable = false
    }
    // 设置用户id
    app.setAppUserModelId(pkg.build.appId);
    // 注册桥梁/快捷键事件
    db.register();
    hook.register(win);
    utils.register(app, win);
    bridge.register(win, app);
    system.register(app);
    diff.register(win);
    globalShortcut.register(win);
    // 加载index.html文件
    win.loadURL(URL);
    // 打开窗口的调试工具
    win.setMenu(null)
    //系统托盘图标闪烁
    Menu.setApplicationMenu(null);
}
// 禁止多开代码
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
}
// 当运行第二个实例时,将会聚焦到myWindow这个窗口
app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
        win.show();
        win.focus();
    }
})
app.on('ready', function () {
    createWindow()
})
// 监听app退出前
if (process.platform === 'darwin') {
    app.on('before-quit', () => {
        store.forceQuit = true;
    })
}
// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        tray.destroy();
        app.quit();
    }
})
// mac独有的程序坞点击
app.on('activate', () => {
    if (win === null || win.isDestroyed()) {
        createWindow()
    } else {
        win.show();
    }
})

// 监听新窗口打开
app.on('web-contents-created', (e, webContents) => {
    webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });
});
