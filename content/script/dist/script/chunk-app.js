webpackJsonp([4],{

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(71);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _iss = __webpack_require__(72);

var _iss2 = _interopRequireDefault(_iss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//公共组件
//===============================数据层
var $$data = {
    list: [] //"0822"
},
    myScroll,
    loadingTxt;

var APP = function (_React$Component) {
    _inherits(APP, _React$Component);

    function APP(arg) {
        _classCallCheck(this, APP);

        var _this = _possibleConstructorReturn(this, (APP.__proto__ || Object.getPrototypeOf(APP)).call(this, arg));

        _this.state = $$data; //初始化数据

        return _this;
    }

    _createClass(APP, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var th = this;
            document.addEventListener("$$EVENT_menuList", function (ev) {
                th.getFatch(ev.data); //异步获取数据
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.Event_addEventScroll();
            this.loadinit();
        }

        //事件

    }, {
        key: 'loadinit',
        value: function loadinit() {
            var th = this;
            var url = _iss2.default.getAPI("getUser.do");
            console.log(url);
            $.post(url, { username: paraJson.usercode }).done(function (da) {
                var $da = typeof da == "string" ? JSON.parse(da) : da;
                reginarg = $da.data.regionAll;
                th.getFatch({ name: $da.data.regionAll });
            });
        }
    }, {
        key: 'setULWidth',
        value: function setULWidth() {
            //每次刷新视图调用
            setTimeout(function () {
                myScroll.refresh();
            });
        }
    }, {
        key: 'Event_click_labelBar',
        value: function Event_click_labelBar(ev) {
            var $el = ev.currentTarget,
                $$el = $($el),
                input = $$el.find("input:checkbox");
            input.click();
            input.prop("checked") ? $$el.addClass("active") : $$el.removeClass("active");
            ev.stopPropagation();
        }
    }, {
        key: 'Event_click_postBithday',
        value: function Event_click_postBithday(ev) {
            //送上生日祝福
            // iss.hashHistory.push("/gift")
            //  console.log(this);
            var th = this;
            var list = this.Event_getCheckedData();
            th.Event_postJAJA(list, 1);
        }
    }, {
        key: 'Event_postJAJA',
        value: function Event_postJAJA(list, num) {
            //提交数据

            if (list.length <= 0) {
                _iss2.default.alert({
                    content: "请选择过生日人员！",
                    ok: function ok() {
                        console.log("关闭");
                    }
                });
                return;
            }
            _iss2.default.hashHistory.push({
                pathname: num == 1 ? "gift" : "postCoin",
                state: { "list": list, type: num }
            });
        }
    }, {
        key: 'Event_click_postLongCoin',
        value: function Event_click_postLongCoin(ev) {
            //发龙币表示一下
            var th = this;
            var list = this.Event_getCheckedData();
            th.Event_postJAJA(list, 2);
        }
    }, {
        key: 'Event_getCheckedData',
        value: function Event_getCheckedData() {
            //获取选中数据
            var list = document.querySelectorAll("input:checked");
            var da = [];
            for (var i = 0; i < list.length; i++) {
                var id = list[i].getAttribute("data-id");
                da.push(this.state.list.filter(function (da, ind) {
                    if (da.id == id) {
                        return da;
                    }
                })[0]);
            }

            return da;
        }
    }, {
        key: 'Event_addEventScroll',
        value: function Event_addEventScroll() {
            //绑定滚动
            myScroll = new iScroll('wrapper', {
                snap: true,
                momentum: false,
                vScroll: false,
                hScroll: true,
                hScrollbar: false,
                checkDOMChanges: true
            });
        }
    }, {
        key: 'getFatch',
        value: function getFatch(da) {
            var th = this;
            $.post(_iss2.default.getAPI("getBirthdayList.do"), { "region": da.name, "account": $.cookie("account"), "usercode": $.cookie("usercode") }).done(function (da) {
                var $da = typeof da == "string" ? JSON.parse(da) : da;
                if ($da.length <= 0) {
                    loadingTxt = "暂无人过生日，请选择其他区域！";
                }
                if ($da.code == 0 && $da["data"] && $da["data"].length) {
                    reginarg = $da.data[0].region;
                    lxHandle();
                    th.setState({
                        "list": $da.data
                    });
                    th.setULWidth();
                }

                th.refs.appFootbtn.classList.remove("hide");
            }).fail(function () {});
        }
    }, {
        key: 'render',
        value: function render() {

            var list,
                plist = [],
                num = 0,
                th = this;
            if (this.state.list.length <= 0) {
                list = _react2.default.createElement(
                    'li',
                    { className: 'tootip' },
                    loadingTxt || "数据加载中请稍后。。。"
                );
            } else {

                this.state.list.forEach(function ($d, $i) {
                    plist[num] = plist[num] || [];
                    plist[num].push($d);
                    if (($i + 1) % 6 == 0) {
                        num += 1;
                    }
                });
                // console.log(plist)
                this.refs.postcardUl.style.width = plist.length * 6.9 + "rem";
                list = plist.map(function (da, ind) {
                    var _this2 = this;

                    return _react2.default.createElement(
                        'li',
                        { key: ind },
                        _react2.default.createElement(
                            'ul',
                            { className: 'childUL' },
                            da.map(function ($d, $i) {
                                return _react2.default.createElement(
                                    'li',
                                    { key: $i, onClick: th.Event_click_labelBar.bind(_this2) },
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'label' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'clip' },
                                            _react2.default.createElement('img', { onLoad: _iss2.default.loadImag.bind(_this2), 'data-src': _iss2.default.imgsrc + $d.headIcon + ".jpg", src: _iss2.default.imgicon })
                                        ),
                                        _react2.default.createElement('input', { type: 'checkbox', 'data-id': $d.id, defaultChecked: $d.status == 0 ? false : true, className: 'radio', name: 'postcardListImage' })
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'postcard-ul-txt', 'data-guid': $d.identityCard },
                                        $d.truename
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'postcard-ul-txtDate' },
                                        _iss2.default.formatTime($d.birthayTime)
                                    )
                                );
                            })
                        )
                    );
                    /*   <li key={ind} onClick={th.Event_click_labelBar.bind(this)}>
                      <p className="label">
                          <span className="clip"><img onLoad={iss.loadImag.bind(this)}  data-src={iss.imgsrc+da.headIcon+".jpg"} src={iss.imgicon} /></span>
                          <input type="checkbox" data-id={da.id}  defaultChecked={da.status==0? false:true} className="radio" name="postcardListImage" />
                      </p>
                      <p className="postcard-ul-txt" data-guid={da.identityCard}>{da.truename}</p>
                      <p className="postcard-ul-txtDate">{iss.formatTime(da.birthayTime)}</p>
                      </li> */
                });
            }
            return _react2.default.createElement(
                'div',
                { className: 'postcard' },
                _react2.default.createElement(
                    'article',
                    { id: 'wrapper', className: 'postcard-scrollbox' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'postcard-ul', ref: 'postcardUl' },
                        list
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'text-center footer hide', ref: 'appFootbtn' },
                    _react2.default.createElement(
                        'button',
                        { id: 'Event_postBithday', onClick: this.Event_click_postBithday.bind(this), className: 'btn btn-primary' },
                        '\u9001\u4E0A\u751F\u65E5\u795D\u798F'
                    ),
                    _react2.default.createElement(
                        'button',
                        { id: 'Event_postLongCoin', onClick: this.Event_click_postLongCoin.bind(this), className: 'btn tn btn-warning mgL70' },
                        '\u53D1\u9F99\u5E01\u8868\u793A\u4E00\u4E0B'
                    )
                )
            );
        }
    }]);

    return APP;
}(_react2.default.Component);

exports.default = APP;

/***/ })

});