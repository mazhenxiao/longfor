webpackJsonp([0],{

/***/ 248:
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
    list: [//默认列表
    { guid: 0, number: "2.2", text: "好事成双" }, { guid: 1, number: "6.6", text: "万事顺利" }, { guid: 2, number: "16.8", text: "一路发" }, { guid: 3, number: "99.9", text: "幸福长远" }],
    actionList: { guid: 0, number: "2.2", text: "好事成双" }, //默认选中列表
    actionName: [],
    actionText: "祝您：生日快乐，好事成双",
    hotnumber: 0
};

var postCoin = function (_React$Component) {
    _inherits(postCoin, _React$Component);

    function postCoin(arg) {
        _classCallCheck(this, postCoin);

        var _this = _possibleConstructorReturn(this, (postCoin.__proto__ || Object.getPrototypeOf(postCoin)).call(this, arg));

        _this.state = $$data; //初始化数据
        return _this;
    }

    _createClass(postCoin, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ "actionName": this.props.location.state.list });
            this.getFatch(); //异步获取数据
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.addEventScroll();
            document.querySelector(".J_list").click();
        }
        //事件

    }, {
        key: 'Event_keyup_input',
        value: function Event_keyup_input(ev) {
            var el = ev.currentTarget,
                vl = el.value || this.state.hotnumber.number;
            this.setState({
                actionList: {
                    number: vl
                }
            });
            this.Event_Count();
        }
    }, {
        key: 'addEventScroll',
        value: function addEventScroll() {
            //绑定滚动事件
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 4
            });
        }
    }, {
        key: 'Event_click_list',
        value: function Event_click_list(da, ev) {
            //绑定列表点击
            var ele = ev.currentTarget,
                th = this;
            $(".J_list").each(function (ind, ele) {
                ele.remove("action");
            });
            /*     document.querySelectorAll(".J_list").forEach(function(ele,ind){
                    ele.remove("action");
                }); */
            ele.add("action");
            th.setState({ "actionList": da });
            th.setState({ "hotnumber": da });
            this.setState({
                "actionText": da.text
            });
            this.refs.postcoininput.value = da.number;
            this.refs.textarea.value = da.text;
            //th.hotnumber = da;
        }
    }, {
        key: 'Event_keyup_textarea',
        value: function Event_keyup_textarea(ev) {
            // 输入表述内容
            var el = ev.currentTarget;
            if (el.value.length > 25) {
                var t = ev.currentTarget.value.substr(0, 24);
                el.value = t;
                this.setState({ "actionText": t });
            } else {
                this.setState({ "actionText": ev.currentTarget.value });
            }
        }
    }, {
        key: 'Event_click_postCoin',
        value: function Event_click_postCoin(ev) {

            var me = ev.currentTarget;
            me.classList.add("disabled");
            var th = this;
            var src = this.state.actionList.number,
                txt = this.state.actionText,
                da = this.props.location.state; //传入数据
            var username = [];
            da.list.forEach(function (d, i) {
                username.push(d["username"]);
            });

            $.post(_iss2.default.getAPI("addBirthdayPerson.do"), { "usernames": username.join(","), "type": da.type, "content": txt, "giftType": src }).done(function (da) {
                // console.log(da);

                var $da = typeof da == "string" ? JSON.parse(da) : da; /* {"code":"0","msg":"success","data":[{"username":"lucl","giftId":"82","type":"2"}],"longbiData":[{"username":"lucl","issueId":1138}]} */
                if ($da.code == 0) {
                    th.toApp($da);
                } else if ($da.code == "-1" && $da.msg.indexOf("fail") < 0) {
                    _iss2.default.alert({
                        content: $da.msg,
                        ok: function ok() {
                            console.log("关闭");
                        }
                    });
                } else if ($da.code == "-1" && $da.indexOf("fail") >= 0) {
                    _iss2.default.alert({ content: "发送信息失败！" });
                }
            }).fail(function (er) {
                console.log(er);
            });
        }
    }, {
        key: 'toApp',
        value: function toApp(da) {

            var th = this;
            var name = [];
            this.props.location.state.list.forEach(function (d, i) {
                da.longbiData.forEach(function (dd, ii) {
                    if (d.username == dd.username) {
                        name.push({
                            "usercode": d.username,
                            "message": {
                                "type": "de4bfdf2-5623-11e7-907b-a6006ad3dba0", //四数据
                                "content": th.state.actionText,
                                "id": dd.issueId
                            }
                        });
                    }
                });
            });

            lxbridge.callHandler('sendBirthdayLongCoin', name, function (response) {
                var plan = _iss2.default.getPlan();
                if (response == "-1") {
                    lxbridge.callHandler('back2history', {}, function (response) {});
                } else {
                    if (plan == "Android") {
                        lxbridge.callHandler('backToChat', response, function (response) {});
                    }
                }
            });
        }
    }, {
        key: 'Event_Count',
        value: function Event_Count() {
            //统计
            return (this.state.actionList.number * this.state.actionName.length).toFixed(1);
        }
    }, {
        key: 'getFatch',
        value: function getFatch() {
            var th = this;
        }
    }, {
        key: 'render',
        value: function render() {
            var th = this;
            var list = this.state.list.map(function (da, ind) {
                //获取列表
                return _react2.default.createElement(
                    'li',
                    { key: ind, className: 'swiper-slide J_list', onClick: th.Event_click_list.bind(th, da) },
                    _react2.default.createElement(
                        'div',
                        { className: 'postCoinBox' },
                        _react2.default.createElement(
                            'p',
                            { className: 'postCoinNumber' },
                            da.number
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'postCointext' },
                            da.text
                        )
                    )
                );
            });
            var pepo = this.state.actionName.map(function (da, ind) {
                return da.truename;
            });
            var pepoTxt = pepo.join("、");
            return _react2.default.createElement(
                'article',
                { className: 'postCoin' },
                _react2.default.createElement(
                    'section',
                    { className: 'swiper-container postCoinContainer', id: 'postCoinContainer' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'swiper-wrapper' },
                        list
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'postCoinList' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'postCoinListKey' },
                                '\u5355\u4EBA\u9F99\u5E01'
                            ),
                            _react2.default.createElement('input', { ref: 'postcoininput', type: 'number', className: 'postCoinListValue postCoinListValueInput', onKeyUp: this.Event_keyup_input.bind(this), defaultValue: this.state.actionList.number }),
                            '\u4E2A'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'postCoinListKey' },
                                '\u53D1\u653E\u4EBA\u6570'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'postCoinListValue' },
                                pepoTxt,
                                ' ',
                                pepo.length,
                                '\u4EBA'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'postCoinTxt' },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement('textarea', { ref: 'textarea', defaultValue: this.state.actionText, onBlur: this.Event_keyup_textarea.bind(this), onKeyUp: this.Event_keyup_textarea.bind(this) })
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'postCoinBuy' },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u5408\u8BA1'
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            this.Event_Count()
                        )
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'text-center postCoinFoot' },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-warning', onClick: this.Event_click_postCoin.bind(this) },
                        '\u585E\u8FDB\u9F99\u5E01'
                    )
                )
            );
        }
    }]);

    return postCoin;
}(_react2.default.Component);

exports.default = postCoin;

/***/ })

});