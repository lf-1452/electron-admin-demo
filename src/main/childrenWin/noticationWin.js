import {images, notication} from "../resource";
import store from "../store"
import {
  ipcMain,
  screen,
  BrowserWindow,
} from 'electron';
import diff from "../diff";
import utils from "../utils";
export default {
  win: null,
  iconHight: 40, //托盘icon的高度
  width: 230,  //弹窗的宽度，多加30是窗口默认的边框宽度
  height: 30,  //弹窗的高度，多加30是窗口默认的边框高度
  notifyMsgList: [], //托盘通知栏
  mainWin: null, // 主窗口
  // 注册事件
  register(win, app) {
    this.mainWin = win;
    this.notifyWinClick(win);
    this.notifyWinShow();
    this.notifyWinHide();
    this.trayClick(win);
    this.notifyWinShow();
  },
  trayClick(win) {
    //托盘icon点击事件
    ipcMain.on('trayClick', (event,data) => {
      if (!store.isShow) {
        this.mainWin.show();
        this.mainWin.setSkipTaskbar(false);
      }
      this.hideWin();
    })
  },
  notifyWinShow() {
    //显示托盘
    ipcMain.on('notifyWinShow', (event,data) => {
      this.setWinAutoShow();
    })
  },
  notifyWinHide() {
    //托盘隐藏
    ipcMain.on('notifyWinHide', (event,data) => {
      this.hideWin();
    })
  },
  notifyWinClick(win){
    //托盘点击事件
    ipcMain.on('notifyWinClick', (event,data) => {
      //event是子窗口的事件
      /* data{
           type: close（取消闪动）,more: 查看消息列表，msg：消息
           msgs: []
       }*/

      if (!store.isShow && data.type != 'close') {
        this.mainWin.show();
        this.mainWin.setSkipTaskbar(false);
      }

      if (data.type  == 'close') {
        for(let key in store.notifyMsg){
          store.notifyMsg[key].isTray = true;

          if (store.notifyMsg[key].copyCount) {
            store.notifyMsg[key].count = store.notifyMsg[key].copyCount;
            delete store.notifyMsg[key].copyCount;
          }
        }
        this.notifyMsgList = [];
      } else if (data.type  == 'more') {
        this.notifyMsgList = [];
        this.mainWin.webContents.send('sendNotifyMsg', data);
      } else {
        delete store.notifyMsg[data.msg.sid];
        this.notifyMsgList = this.notifyMsgList.filter( item => item.sid != data.msg.sid);
        this.mainWin.webContents.send('sendNotifyMsg', data);
      }

      if (data.type  != 'msg' ||  this.notifyMsgList.length == 0) {
        // 关闭闪烁
        diff.wins.clostwinkleEvent();
      }
      //关门托盘通知
      this.hideWin();
    })
  },
  init(args,type) {
    this.notifyMsgList = [];
    if (args.length == 0) {
      //全部已读
      store.notifyMsg = {};
      // 关闭闪烁
      diff.wins.clostwinkleEvent();
      return;
    }
    this.createWin(args,type);
  },
  //创建窗口
  createWin(args,type) {
    let notifyMsg = {};
    for (let i = 0; i < args.length; i++) {
      //取消闪动 群聊单聊： 未读数不叠加
      if (store.notifyMsg[args[i].sid] && store.notifyMsg[args[i].sid].isTray) {
        notifyMsg[args[i].sid] = store.notifyMsg[args[i].sid];
        notifyMsg[args[i].sid].copyCount = args[i].count;
        if (args[i].count <= store.notifyMsg[args[i].sid].count) {
          continue;
        }
      } else {
        notifyMsg[args[i].sid] = args[i];
      }

      this.notifyMsgList.push(args[i]);
    }

    store.notifyMsg = notifyMsg;

    if (this.notifyMsgList.length == 0) {
      // 关闭闪烁
      diff.wins.clostwinkleEvent();
      return;
    }

    if (type == 'twinkle') {
      utils.logoTwinkle();
    }

    if (this.notifyMsgList.length <= 4) {
      this.height = 35 + 30 + this.notifyMsgList.length * 30;
    } else {
      this.height = 215;
    }

    if (process.platform == 'darwin') {
      this.iconHight = 0;
    }

    if (!this.isWin()) {
      this.win = new BrowserWindow({
        width: this.width,  //窗口的宽度
        height: this.height + this.iconHight,//窗口的高度
        maxWidth: this.width, //窗口的最大宽度
        maxHeight: this.height + this.iconHight,//窗口的最大高度
        movable: true, // 窗口是否可以拖动. 在 Linux 上无效
        closable: false, //窗口是否可以关闭. 在 Linux 上无效
        show: false,  // 窗口创建的时候是否显示. 默认为 true.
        titleBarStyle: "hidden", // 窗口标题栏样式
        frame: false, //指定 false 来创建一个
        icon: images.logo,
        fullscreenable: false,  // 在 OS X 上，全屏化按钮是否可用，默认为 true.
        resizable: false, // 是否可以改变窗口size
        useContentSize: true,  //width 和 height 使用web网页size, 这意味着实际窗口的size应该包括窗口框架的size，稍微会大一点，默认为 false.
        transparent: true, //窗口 透明
        alwaysOnTop: true,  //窗口是否总是显示在其他窗口之前. 在 Linux 上无效. 默认为 false.
        webPreferences: {
          nodeIntegration: true,  //Boolean - 是否完整支持node. 默认为 false.
          backgroundThrottling: false
        }
      });
      this.win.loadURL(notication.url);
    }
  },
  //显示窗口
  showWin(instance) {
    //没有未读消息，不建立窗口
    if (this.notifyMsgList.length == 0 || !this.isWin() ||  !store.timer) {
      return ;
    }

    let {x,y,height,width} = this.calculateWindowPosition(this.width, this.height,instance);

    this.win.setBounds({
      width: this.width,
      height: this.height + height,
      x: x,
      y: y,
    });

   /* this.win.openDevTools();*/
    //渲染页面
    this.win.webContents.send('noticationSend',{
      notifyMsg: store.notifyMsg, //取消闪动的数据
      msgs:this.notifyMsgList,
      platform: process.platform,
      height,
      width,
    });
  },
  //自动显示窗口
  setWinAutoShow() {
    this.isWin() && this.win.show();
  },
  //隐藏窗口
  hideWin() {
    this.isWin() && this.win.hide();
  },
  //判断win是否有效
  isWin() {
    if (!this.win || this.win.isDestroyed()) {
      return false;
    }
    return true;
  },
  //摧毁
  destroy() {
    if (this.isWin()) {
      this.win.destroy();
      this.win = null;
    }
  },
  calculateWindowPosition(width,height,instance) {
    const screenBounds = screen.getPrimaryDisplay().size;
    const trayBounds = instance.getBounds();

    let x = 0,
      y = 0,
      margin_x =24,  //托盘icon左右间距
      margin_y = 0;

    //where is the icon on the screen?
    let trayPos = 4; // 1:top-left 2:top-right 3:bottom-left 4.bottom-right
    trayPos = trayBounds.y > screenBounds.height / 2 ? trayPos : trayPos / 2;
    trayPos = trayBounds.x > screenBounds.width / 2 ? trayPos : trayPos - 1;

    let DEFAULT_MARGIN = { x: margin_x, y: margin_y };

    //calculate the new window position
    switch (trayPos) {
      case 1: // for TOP - LEFT
        x = Math.floor(trayBounds.x + DEFAULT_MARGIN.x + trayBounds.width);
        y = Math.floor(trayBounds.y + DEFAULT_MARGIN.y + trayBounds.height / 2);
        break;

      case 2: // for TOP - RIGHT
        x = Math.floor(
          trayBounds.x - width - DEFAULT_MARGIN.x + trayBounds.width
        );
        y = Math.floor(trayBounds.y + DEFAULT_MARGIN.y + trayBounds.height / 2);
        break;

      case 3: // for BOTTOM - LEFT
        x = Math.floor(trayBounds.x + DEFAULT_MARGIN.x + trayBounds.width);
        y = Math.floor(
          trayBounds.y - height - DEFAULT_MARGIN.y + trayBounds.height / 2
        );
        break;

      case 4: // for BOTTOM - RIGHT
        x = Math.floor(trayBounds.x - width + DEFAULT_MARGIN.x + trayBounds.width);
        y = Math.floor(
          trayBounds.y - height - DEFAULT_MARGIN.y + trayBounds.height / 2
        );
        break;
    }
    return {
      x: x,
      y: y,
      width:trayBounds.width,
      height:trayBounds.height,
      platform: process.platform
    };
  },
}
