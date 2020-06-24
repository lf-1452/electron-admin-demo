import tray from '../tray';
export default {
    // 闪烁
    twinkleEvent(win) {
        win.flashFrame(true);
    },
    // 取消闪烁
    clostwinkleEvent(){
        tray.clearTimer();
    }
}