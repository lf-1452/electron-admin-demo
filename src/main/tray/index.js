import {
    Tray,
    Menu,
    BrowserWindow
} from 'electron';
import {
    images
} from '../resource';
import childrenWin from '../childrenWin'
import store from '../store';
// 托盘
export default {
    instance: null,
    register(win) {
        this.instance = new Tray(images.tray);
        /* this.instance.setToolTip('薪友');*/
        this.setMenu();
        this.click(win);
        this.mouseMove(win);
        this.mouseLeave(win);
    },
    // set the tray template
    setMenu() {
        const contextMenu = Menu.buildFromTemplate([{
            label: '退出',
            click: () => {
                BrowserWindow.getAllWindows().forEach(window => window.destroy())
            }
        }, //我们需要在这里有一个真正的退出（这里直接强制退出）
        ])
        this.instance.setContextMenu(contextMenu);
    },
    // register click methods
    click(win) {
        this.instance.on('click', () => {
            if (store.isShow) {
                win.hide();
                win.setSkipTaskbar(true);
            } else {
                win.show();
                win.setSkipTaskbar(false);
            }
            childrenWin.noticationWin.hideWin();
            this.clearTimer();
        })
    },
    // register mouse-move methods
    mouseMove(win) {
        this.instance.on('mouse-move',event => {
            childrenWin.noticationWin.showWin(this.instance);
        })
    },
    mouseLeave(win) {
        this.instance.on('mouse-leave',event => {
            childrenWin.noticationWin.hideWin();
        })
    },
    // clear the timer;
    clearTimer() {
        store.timer && clearInterval(store.timer);
        store.timer = null;
        store.curImage = images.tray;
        this.instance.setImage(images.tray);
    },
    destroy() {
        this.instance.destroy();
    }
}
