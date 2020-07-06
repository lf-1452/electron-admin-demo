import path from 'path';
import { app } from 'electron';
export default {
  url: path.join(app.getAppPath(), 'src/main/static/notication/index.html')
}