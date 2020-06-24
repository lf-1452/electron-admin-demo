import {
    app,
    Menu,
    BrowserWindow,
} from 'electron'
import {images} from '../resource';
export default {
    register() {
        app.dock.setIcon(images.logo);
    }
}