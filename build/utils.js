const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  runEnv: process.env.VUE_APP_TITLE,
  resolveUnderRootDir: p => {
    return path.join(__dirname, `../${p}`);
  }
};
