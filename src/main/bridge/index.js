import {
    ipcMain
} from 'electron'; //登录密码加密，解密
import updater from '../update';
import store from '../store';
import diff from '../diff';
import childrenWin from '../childrenWin';
import db from '../db';
const crypto = require('crypto');

export default {
    // 注册事件
    register(win, app) {
        this.checkForUpdate(win);
        this.isUpdateNow();
        this.maximization(win);
        this.minimize(win);
        this.closeWindow(win);
        this.flash(win);
        this.winShow(win);
        this.showWindowButton(win);
        this.hideWindowButton(win);
        this.allChildWindestroy(win);
        this.resetWindowSize(win);
        this.getCutShow();
        this.setCutShow();
        childrenWin.register(win, app);
    },
    //关闭所有的子窗口以及托盘
    allChildWindestroy(win) {
    // 所有子窗口清除
        ipcMain.on('allChildWindestroy', () => {
            childrenWin.hideWin();
        });
    },
    // 重置窗口宽高
    resetWindowSize(win) {
        ipcMain.on('resetWindowSize', () => {
            const width = process.platform === 'darwin' ? 1200 : 1204;
            const height = process.platform === 'darwin' ? 700 : 704;

            win.setSize(width, height);
        });
    },
    // 闪烁
    flash(win) {
        ipcMain.on('twinkleEvent', (event, data) => {
            // 未读通知数
            process.platform === 'darwin' && diff.mac.setBadge(data.msgs);
            //保存主窗口的ipcRenderer
            store.ipcRenderer = event;
            process.platform !== 'darwin' && childrenWin.noticationWin.init(data.msgs, data.type);
            // 正在聚焦即不执行
            if (store.isShow) {
                return;
            }
            if (data.type == 'twinkle' || data.type == 'focus') {
                //托盘闪动
                process.platform !== 'darwin' && diff.wins.twinkleEvent(win);
            }
        });
    },
    // 检查更新
    checkForUpdate(win) {
        ipcMain.on('checkForUpdate', () => updater.init(win));
    },
    // 是否退出更新
    isUpdateNow() {
        ipcMain.on('isUpdateNow', () => updater.quitAndInstall());
    },
    // 登陆公共动作
    commonLogin(win, username) {
    // 隐藏并开启缩放功能
        win.hide();
        win.resizable = true;
        //设置窗口最小宽高，可能是因为resizable重设置，导致创建时设置时没有效果
        win.setMinimumSize(960, 640);
        win.center();
        // 内存记录当前用户
        store.username = username;
        setTimeout(() => win.show(), 800);
    },
    // 最大化
    maximization(win) {
        let isMaximized = false;

        ipcMain.on('maximization', (event, data) => {
            if (isMaximized) {
                win.unmaximize();
            } else {
                win.maximize();
            }
            isMaximized = !isMaximized;
            event.sender.send('winIsMax', isMaximized);
        });
    },
    // 最小化
    minimize(win) {
        ipcMain.on('minimize', (event, data) => {
            win.minimize();
        });
    },
    // 打开交通灯
    showWindowButton(win) {
        ipcMain.on('showWindowButton', () => {
            if (process.platform !== 'darwin') {
                return;
            }
            win.setWindowButtonVisibility(true);
        });
    },
    // 关闭交通灯
    hideWindowButton(win) {
        ipcMain.on('hideWindowButton', () => {
            if (process.platform !== 'darwin') {
                return;
            }
            win.setWindowButtonVisibility(false);
        });
    },
    // 显示窗口
    winShow(win) {
        ipcMain.on('winShow', (event, data) => {
            win.show();
            win.focus();
            //系统通知，进入指定的聊天窗口
            if (data && data.type == 'notify') {
                event.sender.send('sendNotifyMsg', data);
            }
        });
    },
    // 隐藏窗口
    closeWindow(win) {
        ipcMain.on('closeWindow', () => {
            // 隐藏
            win.hide();
            // 隐藏到托盘
            win.setSkipTaskbar(true);
            //通知前端，隐藏
            win.webContents.send('sendWinShow', false);
        });
    },
    getCutShow(){
        ipcMain.on('getCutShow', (event) => {
            let data = db.retrieve('winCtrol');

            if (!data.isCutShow){
                data = {
                    'isCutShow': false
                };
            }
            event.sender.send('returnCutShow', data);
        });
    },
    setCutShow(){
        ipcMain.on('setCutShow', (event , {isCutShow}) => {
            db.update('winCtrol', () => ({
                'isCutShow': isCutShow
            }));
        });

    }
};
