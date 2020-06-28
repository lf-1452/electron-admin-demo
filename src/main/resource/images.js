import path from 'path';
import {
    app
} from 'electron';
export default {
    tray: path.join(app.getAppPath(), 'src/main/static/tray.png'),
    logo: path.join(app.getAppPath(), 'src/main/static/logo1.png'),
    blank: path.join(app.getAppPath(), 'src/main/static/frame.png'),
    icon: path.join(app.getAppPath(), 'favicon.ico'),
    falsh: path.join(app.getAppPath(), 'src/main/static/falsh.png')
}
