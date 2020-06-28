import {images, largePictureWin} from '../resource';
import {
    app,
    ipcMain,
    BrowserWindow,
    screen
} from 'electron';
const key = process.platform === 'darwin' ? 'CommandOrControl' : 'alt';
import {
    globalShortcut
} from 'electron';
export default {
    isMac: process.platform == 'darwin',
    isMaximized: false, //窗口最大化
    win: null,
    readyToShow:false,
    timer: null,
    mainWin: null, // 主窗口
    // 注册事件
    register(win, app) {
        this.mainWin = win;
        this.initWinShow(win,app);
        this.sendLargeImgArrPre(win,app);
        this.sendLargeImgArrNext(win,app);
        this.sendLargeWin(win,app);
        this.largeWinMinimize(win,app);
        this.largeWinMaximization(win,app);
        this.largeWinCloseWindow();
        this.devtool();
    },
    //初始化页面信息,显示窗口
    initWinShow() {
    //显示图片
        ipcMain.on('largeImgInit', (event,data) => {
            this.showWin(data);
        })
    },
    sendLargeImgArrNext(win,app) {
    //获取图像数组
        ipcMain.on('sendLargeImgArrNext', (event,data) => {
            console.log(this.win.id,'---')
            if (!this.readyToShow) {
                let time = setInterval( () => {
                    if (this.readyToShow && this.isWin()) {
                        this.win.webContents.send('senArr', data);
                        clearInterval(time);
                        time = null;
                    }
                },200)
            } else {
                this.isWin() && this.win.webContents.send('senArr', data);
            }
        })
    },
    sendLargeImgArrPre(win,app) {
    //获取图像数组
        ipcMain.on('sendLargeImgArrPre', (event,data) => {
            console.log(this.win.id,'---')
            if (!this.readyToShow) {
                let time = setInterval( () => {
                    if (this.readyToShow && this.isWin()) {
                        this.win.webContents.send('senArr', data);
                        clearInterval(time);
                        time = null;
                    }
                },200)
            } else {
                this.isWin() && this.win.webContents.send('senArr', data);
            }
        })
    },
    sendLargeWin() {
    //左右箭头获取数组
        ipcMain.on('sendLargeWin', (event,data) => {
            this.mainWin.webContents.send('largeWinArrow', data);
        })
    },
    largeWinMinimize(win) {
    //宿小窗口
        ipcMain.on('largeWinMinimize', (event, data) => {
            this.win.minimize();
        })
    },
    largeWinCloseWindow() {
    //关门窗口
        ipcMain.on('largeWinCloseWindow', (event, data) => {
            this.destroy();
            this.mainWin.webContents.send('largeWinClose', data);
        })
    },
    largeWinMaximization() {
    //窗口最大化
        ipcMain.on('largeWinMaximization', (event, data) => {
            if (this.isMaximized) {
                this.win.unmaximize()
            } else {
                this.win.maximize();
            }
            this.isMaximized = !this.isMaximized;
        })
    },
    //创建窗口
    createWin(data) {
    //初始化
        this.isMaximized = false;

        //设置屏幕的宽高
        let screenW = screen.getPrimaryDisplay().workAreaSize.width * 0.9,  //屏幕最大的宽度
            screenH = screen.getPrimaryDisplay().workAreaSize.height * 0.9,//屏幕最大的高度
            width = 640,  //初始化宽度
            height = 640;  //初始化高度

        if (data.body.width && data.body.height) {
            height = data.body.height + 68 >= screenH ? screenH : data.body.height + 68;
            width = ((height - 68) / data.body.height)  *  data.body.width + 20;

            if (width > screenW) {
                width = screenW;
                height = ((screenW - 20) / data.body.width)  *  data.body.height + 68;
            }
        }

        if (width > screenW ||  height > screenH)  {
            width = screenW;
            height = screenH;
        }

        this.win = new BrowserWindow({
            show: false,  // 窗口创建的时候是否显示. 默认为 true.
            titleBarStyle: 'hidden', // 窗口标题栏样式
            frame: false, //指定 false 来创建一个
            resizable: true, // 是否可以改变窗口size
            width: width < 640 ? 640 : width,
            height:  height < 640 ? 640 : height,
            icon: images.logo,
            transparent: true, //窗口 透明
            webPreferences: {
                nodeIntegration: true,  //Boolean - 是否完整支持node. 默认为 false.
                backgroundThrottling: false
            }
        });

        if (!this.isMac) {   // 禁止Windows下双击最大化和调用maximize行为不一致导致的窗口尺寸变化
            this.win.maximizable = false
        }

        //渲染页面
        this.win.loadURL(largePictureWin.url);
        this.win.once('ready-to-show', () => {
            //渲染页面
            this.win.show();
            data.isMac = this.isMac;
            this.win.webContents.send('imgSend',data);
            this.readyToShow = true;
        })
    //this.win.webContents.openDevTools();
    },
    //显示窗口
    showWin(data) {
        this.readyToShow = false;
        //每次打开都要销毁,重新建立
        if (this.isWin()) {
            data.isMac = this.isMac;
            this.win.webContents.send('imgSend',data);
            this.win.show();
            this.readyToShow = true;
        } else {
            this.createWin(data);
        }
    },
    //摧毁
    destroy() {
        if (this.isWin()) {
            this.win.destroy();
            this.win = null;
        }
    },
    //判断win是否有效
    isWin() {
        if (!this.win ||this.win.isDestroyed()) {
            return false;
        }
        return true;
    },
    // 打开开发者模式
    devtool() {
        globalShortcut.register(`${key}+t+shift`, () => {
            this.win && this.win.webContents.openDevTools();
        });
    },
}
