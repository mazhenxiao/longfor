var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: false,
    historyApiFallback: false
}).listen(8888
    , '192.168.0.8', function (err, result) {
    var c = require('child_process');
        c.exec('start http://localhost:5001');
        if (err) {
            console.log(err);
        }
       // console.log('Listening at localhost:5000');
    });