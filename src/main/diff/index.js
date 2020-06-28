import wins from './windows';
import mac from './mac';
import dock from '../dock';
import tray from '../tray';

export default {
    register(win){
        process.platform === 'darwin' ? dock.register(win) : tray.register(win);
    },
    wins,
    mac
}
