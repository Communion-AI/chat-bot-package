"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _FirstMessage = _interopRequireDefault(require("../../components/FirstMessage"));

var _OpenView = _interopRequireDefault(require("../../components/OpenView"));

var _utils = require("../../utils");

var _axios = _interopRequireDefault(require("axios"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const Container = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  margin-bottom: 20px;\n  margin-right: 20px;\n"])));

const Button = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 5px 10px 15px 5px rgba(0, 0, 0, 0.1);\n"])));

const OpenSvg = _ref => {
  let {
    onClick,
    primaryColor
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(Button, {
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "60",
    height: "60",
    viewBox: "0 0 60 60",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M60 30C60 37.8763 60 60 60 60C60 60 38.6922 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30Z",
    fill: primaryColor
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M13 29L31.5 40L48 29",
    stroke: "white",
    "stroke-width": "1.5"
  })));
};

const ClosedSvg = _ref2 => {
  let {
    onClick,
    primaryColor
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(Button, {
    onClick: onClick,
    style: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react.default.createElement("svg", {
    width: "60",
    height: "60",
    viewBox: "0 0 30 30",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M30 15C30 18.9382 30 30 30 30C30 30 19.3461 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z",
    fill: primaryColor
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 18C14.0047 28.8666 23.4186 22.5277 27 18",
    stroke: "white",
    "stroke-width": "0.75"
  })));
};

const ChatBox = props => {
  const authed = (0, _utils.verifyToken)(props.token);
  const [open, setOpen] = (0, _react.useState)(false);
  const [showFirst, setShowFirst] = (0, _react.useState)(false);
  const [responding, setResponding] = (0, _react.useState)(false);
  const {
    firstMessage,
    primaryColor,
    secondaryColor,
    organisation,
    url
  } = props;
  const [messages, setMessages] = (0, _react.useState)([{
    text: firstMessage,
    isBot: true
  }]);

  const handleAddMessage = async text => {
    setMessages([...messages, {
      text,
      isBot: false
    }]);
    setResponding(true);

    const _messages = messages.map(m => {
      if (m.isBot) {
        return {
          AI: m.text
        };
      } else {
        return {
          Human: m.text
        };
      }
    });

    const resp = await _axios.default.post(url, {
      question: text,
      messages: _messages,
      organisation: organisation
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    setResponding(false);
    setMessages([...messages, {
      text,
      isBot: false
    }, {
      isBot: true,
      text: resp.data
    }]);
  };

  setTimeout(() => {
    setShowFirst(true);
  }, 1500);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  if (authed) {
    return /*#__PURE__*/_react.default.createElement(Container, null, showFirst && /*#__PURE__*/_react.default.createElement(_FirstMessage.default, {
      chatOpen: open
    }), open && /*#__PURE__*/_react.default.createElement(_OpenView.default, {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      handleAdd: handleAddMessage,
      messages: messages,
      responding: responding
    }), open ? /*#__PURE__*/_react.default.createElement(OpenSvg, {
      primaryColor: primaryColor,
      onClick: handleButtonClick
    }) : /*#__PURE__*/_react.default.createElement(ClosedSvg, {
      primaryColor: primaryColor,
      onClick: handleButtonClick
    }));
  }
};

var _default = ChatBox;
exports.default = _default;