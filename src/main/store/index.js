import {
  images
} from '../resource';
export default {
  isShow: false,
  timer: null,
  curImage: images.logo,
  forceQuit: false,
  notifyMsg: {},
  username: '' // 当前登录的用户名，仅存在内存 登录时记录
};
