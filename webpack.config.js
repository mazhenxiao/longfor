var path = require("path");
var webapck = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); //thunk
var compress = require("webpack/lib/optimize/UglifyJsPlugin"); //压缩
var DedupePlugin = require("webpack/lib/optimize/DedupePlugin"); //多文件
var ImageminPlugin = require('imagemin-webpack-plugin').default;//图片压缩
var config = {
    entry: {
        main: path.join(__dirname, '/content/script/es6/main.js'),
    },
    output: {
        path: path.join(__dirname, '/content/script/dist/script/'),
        filename: "[name].js",
        publicPath:'./content/script/dist/script/',////此处决定了chunkFilename要加载的路径，此处为坑
        chunkFilename: 'chunk-[name].js'//文件拆分chunk
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                  }
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=react'],
                exclude: /node_modules/
              
            }
        ]
    },
     plugins: [
        new CommonsChunkPlugin({
            name: "chunk"
        }),
        /*  new compress({
            output: {
                comments: false,  // remove all comments
              },
              compress: {
                warnings: false
              }
        }), */
        new DedupePlugin({
            'process.env': {NODE_ENV: '"production"'}
        }),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production', // Disable during development 
            pngquant: {
              quality: '95-100'
            }
          })
    ] 
}
module.exports = config;