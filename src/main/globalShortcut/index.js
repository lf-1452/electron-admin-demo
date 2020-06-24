import {
    globalShortcut
} from 'electron';
import utils from '../utils';
const key = process.platform === 'darwin' ? 'CommandOrControl' : 'alt';
export default {
    register(win) {
        this.devtool(win);
        this.closeDevtool(win);
    },
    // 打开开发者模式
    devtool(win) {
        globalShortcut.register(`${key}+l+shift`, () => win.webContents.openDevTools());
    },
    // 关闭开发者模式
    closeDevtool(win) {
        globalShortcut.register(`${key}+p+shift`, () => win.webContents.closeDevTools());
    }
}
