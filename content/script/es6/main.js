import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from "react-router";
import iss from "./iss.js"; //公共组件
import menu from "./menuList.js"; //列表组件

iss.use({ Router, Route, hashHistory });//绑定到公共方法

/* import APP from "./app.js"; */
iss.diverWidth();//设置页面定宽750
//导入公共组件
var rootRout = {
  path: '/',   //首页生日祝福,
  childRoutes: [
    {
      path: "/index",
      getComponent: function (next, callback) {
        require.ensure([], function (require) {
          var app = require('./app.js');//============================生日祝福
          callback(null, app.default);
        }, "app");
      },
    },
    {
      path: "/gift", //礼物
      getComponent: function (next, callback) {
      
        require.ensure([], function (require) {
          var gift = require('./gift.js');//========================礼物
          callback(null, gift.default);
        }, "gift");
      }
    },
    {
      path:"/giftInfo",//礼物详情
      getComponent:function(next, callback){
        require.ensure([],function(require){
          var giftInfo = require('./giftInfo.js');
          callback(null,giftInfo.default);
        },"giftInfo")
      }
    },
    {
       path:"/longCoin",//龙币详情
      getComponent:function(next, callback){
        require.ensure([],function(require){
          var giftInfo = require('./longCoin.js');
          callback(null,giftInfo.default);
        },"longCoin")
      }

    },
    {
      path:"/postCoin",//龙币详情
     getComponent:function(next, callback){
       require.ensure([],function(require){
         var postCoin = require('./postCoin.js');
         callback(null,postCoin.default);
       },"postCoin")
     }

   }
  ]
}

  ReactDOM.render((
  <Router history={hashHistory} routes={rootRout}>
  </Router>
), document.querySelector("#FloatMenu")); 

function CLASS_routerWillLeave() {
  //console.log(ev)
}
function Class_onEnter(nextState, replaceState, callback) {  //拦截路由跳转，如果跳转非指定则不允许跳转

  switch (nextState.location.pathname) {
    case "/info": replaceState(null, nextState.location.pathname); break;
  }
  return false
}






