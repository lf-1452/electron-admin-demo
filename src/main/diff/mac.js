import {
    app
} from 'electron';
export default {
    id: null,
    // 闪烁
    twinkleEvent() {
        this.id = app.dock.bounce('critical')
    },
    // 取消闪烁
    clostwinkleEvent() {
        this.id && app.dock.cancelBounce(this.id);
    },
    // 设置未读数
    setBadge(msgs) {
        // 总未读数
        const totalUnReadNum = msgs.reduce((total, msg) => total += msg.count, 0)
        app.badgeCount = totalUnReadNum;
    }
}
