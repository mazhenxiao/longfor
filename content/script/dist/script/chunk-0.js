webpackJsonp([0],{

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(14);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(115);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _iss = __webpack_require__(243);

var _iss2 = _interopRequireDefault(_iss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//公共组件
//===============================数据层
var $$data = {
    list: [{ userid: 0, src: "content/images/s1.png", name: "扬成", date: "7月7日" }, { userid: 1, src: "content/images/s2.png", name: "扬成", date: "7月7日" }, { userid: 2, src: "content/images/s3.png", name: "扬成", date: "7月7日" }, { userid: 0, src: "content/images/s1.png", name: "扬成", date: "7月7日" }, { userid: 1, src: "content/images/s2.png", name: "扬成", date: "7月7日" }, { userid: 2, src: "content/images/s3.png", name: "扬成", date: "7月7日" }, { userid: 0, src: "content/images/s1.png", name: "扬成", date: "7月7日" }, { userid: 1, src: "content/images/s2.png", name: "扬成", date: "7月7日" }, { userid: 2, src: "content/images/s3.png", name: "扬成", date: "7月7日" }, { userid: 0, src: "content/images/s1.png", name: "扬成", date: "7月7日" }, { userid: 1, src: "content/images/s2.png", name: "扬成", date: "7月7日" }, { userid: 2, src: "content/images/s3.png", name: "扬成", date: "7月7日" }]
};

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

            this.getFatch(); //异步获取数据
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.Event_addEventScroll();
        }
        //事件

    }, {
        key: 'Event_click_postBithday',
        value: function Event_click_postBithday(ev) {
            //送上生日祝福
            _iss2.default.hashHistory.push("/info");
        }
    }, {
        key: 'Event_click_postLongCoin',
        value: function Event_click_postLongCoin(ev) {
            //发龙币表示一下
            console.log(ev);
        }
    }, {
        key: 'Event_getCheckedData',
        value: function Event_getCheckedData() {//获取选中数据

        }
    }, {
        key: 'Event_addEventScroll',
        value: function Event_addEventScroll() {
            //绑定滚动
            var myScroll = new iScroll('wrapper', {
                hScrollbar: false,
                vScrollbar: false
            });
        }
    }, {
        key: 'getFatch',
        value: function getFatch() {
            var th = this;
        }
    }, {
        key: 'render',
        value: function render() {
            var list = this.state.list.map(function (da, ind) {
                return _react2.default.createElement(
                    'li',
                    { key: ind },
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement(
                            'span',
                            { className: 'clip' },
                            _react2.default.createElement('img', { src: da.src })
                        ),
                        _react2.default.createElement('input', { type: 'checkbox', className: 'radio', name: 'postcardListImage' })
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'postcard-ul-txt', 'data-guid': da.userid },
                        da.name
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'postcard-ul-txtDate' },
                        da.date
                    )
                );
            });
            return _react2.default.createElement(
                'div',
                { className: 'postcard' },
                _react2.default.createElement(
                    'article',
                    { id: 'wrapper', className: 'postcard-scrollbox' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'postcard-ul' },
                        list
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'text-center footer' },
                    _react2.default.createElement(
                        'button',
                        { id: 'Event_postBithday', onClick: this.Event_click_postBithday, className: 'btn btn-primary' },
                        '\u9001\u4E0A\u751F\u65E5\u795D\u798F'
                    ),
                    _react2.default.createElement(
                        'button',
                        { id: 'Event_postLongCoin', onClick: this.Event_click_postLongCoin, className: 'btn tn btn-warning mgL70' },
                        '\u53D1\u9F99\u5E01\u8868\u793A\u4E00\u4E0B'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'text-center color-gay' },
                        '\u5373\u5C06\u751F\u65E5\u7684\u540C\u4E8B\u4F1A\u5728\u5F53\u5929\u6536\u5230\u795D\u798F'
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