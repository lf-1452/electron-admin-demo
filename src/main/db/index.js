import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import path from "path";
import {
  app
} from "electron";
export default {
  db: null,
  register() {
    this.init();
  },
  init() {
    const STORE_PATH = app.getPath("userData");

    console.log(path.join(STORE_PATH, "/db.json"), "----");
    const adapters = new FileSync(path.join(STORE_PATH, "/db.json"));

    this.db = low(adapters);
    // 写入默认数据
    this.db
      .defaults({
        user: {},
        account: {
          username: "",
          uppassword: ""
        },
        files: {
          1: {
            mid: "",
            uuid: "",
            filePath: "",
            state: "fail",
            fileName: '',
            createTime: "",
            compeleteTime: ""
          }
        },
        isRemember: false, //记住账号密码
        isChecked: false, //记住手机号
        phoneNumber: "", //电话号码
        winCtrol: {
          isCutShow: false
        }
      })
      .write();
  },
  // 创建数据
  create(key, value) {
    console.log(key, value, '创建');
    // 设置数据
    this.db.set(key, value).write();
  },
  // 读取数据
  retrieve(collumn) {
    return this.db.get(collumn).value();
  },
  // 查找数据
  find(collumn, key = {}) {
    return this.db
      .get(collumn)
      .find(key)
      .value();
  },
  // 更新数据
  update(key, cb) {
    console.log(key, '更新');
    this.db.update(key, (val) => cb(val)).write();
  },
  // 删除属性
  unset(key) {
    this.db.unset(key).write();
  }
};
