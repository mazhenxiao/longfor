# 龙信生日祝福
#### 使用react+react-router+es6
    npm install -g react
    npm install -g babel
    npm install
*   package.json环境配置详情
~~~json
{
  "name": "longhu",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server.js&webpack --display-error-details -w",
    "dev": "webpack --display-error-details -w"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.4",
    "imagemin-webpack-plugin": "^1.5.0-beta.0",
    "jsx-loader": "^0.13.2",
    "less-loader": "^4.0.5",
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-hot-loader": "^1.3.1",
    "react-router": "^3.0.5",
    "url-loader": "^0.5.9",
    "webpack": "^3.4.1",
    "webpack-dev-server": "^2.7.1"
  }
}

~~~
* webpack.config.js 配置
~~~ javascript
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
          new compress({
            output: {
                comments: false,  // remove all comments
              },
              compress: {
                warnings: false
              }
        }),
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
~~~
* 转码，在根目录新建.babelrc文件
~~~
{
  "presets": [
    "es2015",
    "react"
  ],
  "plugins": []
}
~~~
