"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAvatar = exports.createNav = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _senseJumpLogin = require("sense-jump-login");

var _senseJumpLogin2 = _interopRequireDefault(_senseJumpLogin);

var _defalt_avatar = require("../image/defalt_avatar.png");

var _defalt_avatar2 = _interopRequireDefault(_defalt_avatar);

var _open = require("../image/open.svg");

var _open2 = _interopRequireDefault(_open);

var _datacenter = require("../image/datacenter.svg");

var _datacenter2 = _interopRequireDefault(_datacenter);

var _evalution = require("../image/evalution.svg");

var _evalution2 = _interopRequireDefault(_evalution);

var _inference = require("../image/inference.svg");

var _inference2 = _interopRequireDefault(_inference);

var _mark = require("../image/mark.svg");

var _mark2 = _interopRequireDefault(_mark);

var _panorama = require("../image/panorama.svg");

var _panorama2 = _interopRequireDefault(_panorama);

var _resource = require("../image/resource.svg");

var _resource2 = _interopRequireDefault(_resource);

var _train = require("../image/train.svg");

var _train2 = _interopRequireDefault(_train);

var _user = require("../image/user.svg");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// get请求，失败401跳登录
function fetchGet(url) {
  return new Promise(function (resolve, reject) {
    _axios2.default.get(url).then(function (res) {
      // resolve(res.data);
      if (code === 200) {
        resolve(res.data.data);
      } else {
        resolve(res);
      }
    }).catch(function (err) {
      (0, _senseJumpLogin2.default)(err);
      reject(err);
    });
  });
}

var createNav = function () {
  function createNav(DOM) {
    _classCallCheck(this, createNav);

    this.navList = null;
    this.DOM = DOM;
  }

  _createClass(createNav, [{
    key: "getNavList",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetchGet("/uums/navbars");

              case 2:
                this.navList = _context.sent;
                return _context.abrupt("return", this.navList);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getNavList() {
        return _ref.apply(this, arguments);
      }

      return getNavList;
    }()
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.getNavList().then(function (res) {
        _this.addStyle();
        var html = "\n      <div class=\"nav-content\">\n        <div id=\"dropBtn\" class=\"drop-btn\">\n          <img src=\"" + _open2.default + "\"/>\n          <span>\u7CFB\u7EDF\u5BFC\u822A</span>\n        </div>\n        <ol id=\"navDropMenu\" class=\"nav-drop-menu\">";
        res.forEach(function (item) {
          html += "\n          <li>\n            <a href=\"" + (item.url ? item.url : "#") + "\" target=\"_blank\">\n              <img src=\"" + (item.key ? item.key : "#") + "\"/>\n              <span>" + (item.name ? item.name : "-") + "</span>\n            </a>\n          </li>\n          ";
        });

        html += "</ol></div>";
        _this.DOM.innerHTML = html;
        var dropBtn = document.getElementById("dropBtn");
        var navDropMenu = document.getElementById("navDropMenu");
        dropBtn.onclick = function () {
          if (navDropMenu.style.visibility === "visible") {
            navDropMenu.style.visibility = "hidden";
            navDropMenu.style.opacity = 0;
          } else {
            navDropMenu.style.opacity = 1;
            navDropMenu.style.visibility = "visible";
          }
        };
      });
    }
  }, {
    key: "addStyle",
    value: function addStyle() {
      var styleNode = document.createElement("style");
      styleNode.type = "text/css";
      styleNode.innerHTML += "\n    .nav-content{ position: relative; color: #fff; }\n    .nav-content>.drop-btn{\n      cursor: pointer;\n      padding: 18px 20px;\n    }\n    .nav-content>.nav-drop-menu{\n      background: #16223B;\n      margin: 0;\n      padding: 10px 0 0 10px;\n      max-width: 600px;\n      border-top: 1px solid #fff;\n      list-style: none;\n      visibility: hidden;\n      opacity: 0;\n      transition: all .5s ease-out;\n    }\n    .nav-content>.nav-drop-menu::after {\n      content: \"\";\n      display: block;\n      height: 0;\n      clear: both;\n      visibility: hidden;\n      overflow: hidden;\n    }\n    .nav-content>.nav-drop-menu>li{\n      width: 140px;\n      height: 45px;\n      background: rgba(255, 255, 255, 0.04);\n      border-radius: 2px;\n      margin-right: 10px;\n      margin-bottom: 10px;\n      float: left;\n    }\n    .nav-content>.nav-drop-menu>li:hover,\n    .nav-content>.nav-drop-menu>li.active{\n      border-left: 3px solid #0FD0F2;\n    }\n    .nav-content>.nav-drop-menu>li>a>img{\n      vertical-align: sub;\n    }\n    .nav-content a {\n      text-decoration:none;\n      color: #fff;\n      display: inline-block;\n      width: 100%;\n      height: 100%;\n      text-align: center;\n      line-height: 3;\n    }\n    ";
      document.getElementsByTagName("head")[0].appendChild(styleNode);
    }
  }]);

  return createNav;
}();

var createAvatar = function () {
  function createAvatar(DOM) {
    _classCallCheck(this, createAvatar);

    this.userinfo = null;
    this.DOM = DOM;
  }

  _createClass(createAvatar, [{
    key: "getUserInfo",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetchGet("/uums/user_info");

              case 2:
                this.userinfo = _context2.sent;
                return _context2.abrupt("return", this.userinfo);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUserInfo() {
        return _ref2.apply(this, arguments);
      }

      return getUserInfo;
    }()
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.getUserInfo().then(function (res) {
        _this2.addStyle();
        var html = "\n      <div class=\"user-info\">\n        <div id=\"avatarContent\" class=\"avatar\">\n          <img src=\"" + _defalt_avatar2.default + "\" alt=\"\u9ED8\u8BA4\u5934\u50CF\" />\n          <span class=\"detail\">\n            <div class=\"name\">" + (res.name ? res.name : "-") + "</div>\n            <div class=\"role\">" + (res.role && res.role.name ? res.role.name : "-") + "</div>\n          </span>\n        </div>\n        <ol id=\"dropMenu\" class=\"drop-menu\">\n          <li><a href=\"" + res.profileUrl + "\" target=\"_blank\">\u4E2A\u4EBA\u4E3B\u9875</a></li>\n          <li><a href=\"" + res.logoutUrl + "\">\u9000\u51FA</a></li>\n        </ol>\n      </div>";
        _this2.DOM.innerHTML = html;
        var avatarContent = document.getElementById("avatarContent");
        var dropMenu = document.getElementById("dropMenu");
        dropMenu.onmouseover = avatarContent.onmouseover = function () {
          dropMenu.style.visibility = "visible";
          dropMenu.style.opacity = 1;
        };
        dropMenu.onmouseout = avatarContent.onmouseout = function () {
          dropMenu.style.visibility = "hidden";
          dropMenu.style.opacity = 0;
        };
      });
    }
  }, {
    key: "addStyle",
    value: function addStyle() {
      var styleNode = document.createElement("style");
      styleNode.type = "text/css";
      styleNode.innerHTML += "\n    .user-info{ position: relative; }\n    .user-info>.avatar {\n      cursor: pointer;\n      width: 110px;\n      display: flex;\n      justify-content: space-between;\n      color: #fff;\n    }\n    .user-info>.avatar>img{ width:35px; }\n    .user-info>.drop-menu {\n      list-style: none;\n      background: #16223B;\n      position: absolute;\n      top: 36px;\n      left: 10px;\n      margin: 0;\n      padding: 0;\n      border-radius: 3px;\n      visibility: hidden;\n      opacity: 0;\n      transition: all .5s ease-out;\n    }\n    .user-info>.drop-menu>li{\n      padding: 5px 10px;\n    }\n    .user-info a {\n      text-decoration:none;\n      color: hsla(0,0%,100%,.6);\n    }\n    .user-info a:hover {\n      color: hsla(0,0%,100%,1);\n    }\n    ";
      document.getElementsByTagName("head")[0].appendChild(styleNode);
    }
  }]);

  return createAvatar;
}();

exports.createNav = createNav;
exports.createAvatar = createAvatar;
