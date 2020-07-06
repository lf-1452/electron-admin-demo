import { app } from "electron";
import path from "path";
const DOCUMENT_PATH = app.getPath("documents");
const date = new Date();
const year = date.getFullYear();
const month =
  date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;

export default {
  DOCUMENT_PATH,
  FILES: process.platform === 'darwin' ? path.join(app.getPath("userData"), "XinYou Files") : path.join(DOCUMENT_PATH, "XinYou Files"),
  MONTH: `${year}-${month}`,
  DOWNLOAD_SUCCESS: "success",
  DOWNLOAD_FAIL: "fail",
  DOWNLOAD_ING: "pedding",
  SEND_ING: "sending",
  SEND_FAIL: "sendingFail",
  SEND_SUCCESS: "success"
};
