import path from 'path';
const exeName = path.basename(process.execPath)
export default {
    register(app) {
        this.autoOpen(app)
    },
    autoOpen(app) {
        app.setLoginItemSettings({
            openAtLogin: true,
            openAsHidden: false,
            path: process.execPath,
            args: [
                '--processStart', `"${exeName}"`,
            ]
        })
    }
}