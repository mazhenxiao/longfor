webpackJsonp([2],{

/***/ 246:
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
    me: {
        headIcon: "",
        true_name: ""
    },
    user: {
        id: "",
        giftType: "",
        username: "",
        content: "" //默认点中图片
    } };

var giftInfo = function (_React$Component) {
    _inherits(giftInfo, _React$Component);

    function giftInfo(arg) {
        _classCallCheck(this, giftInfo);

        var _this = _possibleConstructorReturn(this, (giftInfo.__proto__ || Object.getPrototypeOf(giftInfo)).call(this, arg));

        _this.state = $$data; //初始化数据

        return _this;
    }

    _createClass(giftInfo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {

            this.getFatch(); //异步获取数据
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.documentElement.style.background = "#fff";
            document.body.style.background = "#fff";
        }
        //事件

    }, {
        key: 'getFatch',
        value: function getFatch() {
            var _this2 = this;

            var th = this;
            var pm = new Promise(function (resolve, reject) {
                $.post(_iss2.default.getAPI("getDetail.do"), {
                    "id": _iss2.default.getParam("id")
                }).done(function (da) {
                    var $da = typeof da == "string" ? JSON.parse(da) : da;
                    if ($da.code == "-1") {
                        _iss2.default.alert({
                            content: "请求失败，请重试！"
                        });
                        return;
                    }
                    th.setState({
                        user: $da.data
                    });
                    resolve(_this2.state.user);
                }).fail(function (er) {});
            }); // prom end

            Promise.all([pm]).then(function (da) {
                var $da = da["length"] ? da[0] : da;
                $.post(_iss2.default.getAPI("getUser.do"), { "username": $da.username }).done(function (da) {
                    var $da = typeof da == "string" ? JSON.parse(da) : da;
                    if ($da.code == 0) {
                        th.setState({
                            me: $da.data.headIcon
                        });
                        console.log($da.data);
                    }
                }).fail(function (da) {});
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'article',
                { className: 'giftInfo' },
                _react2.default.createElement(
                    'div',
                    { className: 'gift-content' },
                    _react2.default.createElement(
                        'p',
                        { className: 'gift-img' },
                        _react2.default.createElement('img', { src: this.state.user.giftType })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'gift-txt' },
                        _react2.default.createElement(
                            'p',
                            { className: 'text-left' },
                            '\u795D\u60A8\uFF1A'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'gift-txt-edit' },
                            this.state.user.content
                        )
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'giftInfo-footer' },
                    _react2.default.createElement(
                        'p',
                        { className: 'giftInfo-user' },
                        _react2.default.createElement('img', { src: _iss2.default.imgsrc + this.state.me + ".jpg" })
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'giftInfo-name' },
                        this.state.me.true_name
                    )
                )
            );
        }
    }]);

    return giftInfo;
}(_react2.default.Component);

exports.default = giftInfo;

/***/ })

});