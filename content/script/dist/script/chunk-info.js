webpackJsonp([0],{

/***/ 244:
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

var _iss = __webpack_require__(116);

var _iss2 = _interopRequireDefault(_iss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//公共组件
//===============================数据层
var $$data = {
    textarea: "生日快乐~", //编辑内容默认
    activeList: [], //默认点中图片
    list: [{ id: 0, src: "content/images/Page 1.png", bigsrc: "content/images/Page5B2.png" }, { id: 1, src: "content/images/Page 2.png", bigsrc: "content/images/Page5B3.png" }, { id: 2, src: "content/images/Page 3.png", bigsrc: "content/images/Page5B4.png" }, { id: 3, src: "content/images/Page 4.png", bigsrc: "content/images/Page5B5.png" }, { id: 4, src: "content/images/Page 5.png", bigsrc: "content/images/Page 5B.png" }, { id: 5, src: "content/images/Page 1.png", bigsrc: "content/images/Page5B2.png" }, { id: 6, src: "content/images/Page 2.png", bigsrc: "content/images/Page5B3.png" }, { id: 7, src: "content/images/Page 3.png", bigsrc: "content/images/Page5B4.png" }, { id: 8, src: "content/images/Page 4.png", bigsrc: "content/images/Page5B5.png" }, { id: 9, src: "content/images/Page 5.png", bigsrc: "content/images/Page 5B.png" }]
};

var INFO = function (_React$Component) {
    _inherits(INFO, _React$Component);

    function INFO(arg) {
        _classCallCheck(this, INFO);

        var _this = _possibleConstructorReturn(this, (INFO.__proto__ || Object.getPrototypeOf(INFO)).call(this, arg));

        _this.state = $$data; //初始化数据

        return _this;
    }

    _createClass(INFO, [{
        key: 'componentWillMount',
        value: function componentWillMount() {

            this.getFatch(); //异步获取数据
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.documentElement.style.background = "#fff";
            document.body.style.background = "#fff";
            this.addEvent_scroll();
        }
        //事件

    }, {
        key: 'addEvent_scroll',
        value: function addEvent_scroll() {
            //绑定滚动
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 5
            });
        }
    }, {
        key: 'Event_blur_Textarea',
        value: function Event_blur_Textarea(ev) {
            //失去焦点
            var v = ev.target.value;
            this.setState({ "textarea": v });
        }
    }, {
        key: 'Event_click_Edit',
        value: function Event_click_Edit(ev) {
            //点击编辑
            this.refs.textarea.removeAttribute("readonly");
            this.refs.textarea.focus();
            this.refs.giftReadonly.add("hide");
        }
    }, {
        key: 'Event_click_Slid',
        value: function Event_click_Slid(ev) {
            //点击图片
            var th = this,
                ele = ev.currentTarget,
                id = ele.getAttribute("data-guid");
            var list = this.state.list.filter(function (da, ind) {
                if (da["id"] == id) {
                    return true;
                }
            });
            th.setState({ "activeList": list[0] });
            this.refs.giftImge.src = list[0]["bigsrc"];
            ele.parentNode.childNodes.forEach(function (eles, index) {
                eles.remove("active");
            });
            ele.add("active");
        }
    }, {
        key: 'Event_click_Submit',
        value: function Event_click_Submit(ev) {
            //表单提交
            var th = this;
            console.log(this.state.activeList);
            console.log(this.state.textarea);
        }
    }, {
        key: 'getFatch',
        value: function getFatch() {
            var th = this;
            th.setState({ "activeList": this.state.list[0] }); //初始化默认点中数据
        }
    }, {
        key: 'render',
        value: function render() {
            var th = this;
            var list = this.state.list.map(function (da, ind) {
                if (ind == 0) {
                    return _react2.default.createElement(
                        'li',
                        { key: ind, className: 'swiper-slide active', 'data-guid': da.id, onClick: th.Event_click_Slid.bind(th) },
                        _react2.default.createElement(
                            'a',
                            { href: 'javascript:;' },
                            _react2.default.createElement('img', { src: da.src })
                        )
                    );
                } else {
                    return _react2.default.createElement(
                        'li',
                        { key: ind, className: 'swiper-slide', 'data-guid': da.id, onClick: th.Event_click_Slid.bind(th) },
                        _react2.default.createElement(
                            'a',
                            { href: 'javascript:;' },
                            _react2.default.createElement('img', { src: da.src })
                        )
                    );
                }
            });
            return _react2.default.createElement(
                'article',
                { className: 'gift' },
                _react2.default.createElement(
                    'div',
                    { className: 'gift-content' },
                    _react2.default.createElement(
                        'p',
                        { className: 'gift-img' },
                        _react2.default.createElement('img', { ref: 'giftImge', src: this.state.list[0]["bigsrc"] })
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
                            'span',
                            { className: 'gift-btn-spanEdit', ref: 'giftReadonly', onClick: this.Event_click_Edit.bind(this) },
                            '(\u70B9\u51FB\u53EF\u7F16\u8F91)'
                        ),
                        _react2.default.createElement('textarea', { defaultValue: this.state.textarea, onBlur: this.Event_blur_Textarea.bind(this), placeholder: '\u751F\u65E5\u5FEB\u4E50~', readOnly: true, ref: 'textarea', className: 'gift-txt-edit' })
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'gift-footer' },
                    _react2.default.createElement(
                        'div',
                        { className: 'swiper-container gift-scrollBox' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'swiper-wrapper' },
                            list
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'padV50 text-center' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-primary', onClick: this.Event_click_Submit.bind(this) },
                            '\u9001\u51FA\u795D\u798F'
                        )
                    )
                )
            );
        }
    }]);

    return INFO;
}(_react2.default.Component);

exports.default = INFO;

/***/ })

});