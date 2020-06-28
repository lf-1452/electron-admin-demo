const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const main = require('./main/webpack.config');
const { devServer, ...renderer } = require('./renderer/webpack.config');

// 主线程打包
webpack(main, (err, stats) => {
  if (err) throw err;
});
// 渲染线程服务器
const server = new WebpackDevServer(webpack(renderer), devServer);
server.listen(8080);
