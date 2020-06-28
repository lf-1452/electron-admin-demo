import path from 'path';
import { app } from 'electron';
export default {
    url: `file://${path.join(app.getAppPath(), 'src/main/static/largePictureWin/index.html')}`
}
