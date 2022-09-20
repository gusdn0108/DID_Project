"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9502:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
// EXTERNAL MODULE: external "cookies-next"
var external_cookies_next_ = __webpack_require__(8982);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./image/teamlogo.png
/* harmony default export */ const teamlogo = ({"src":"/_next/static/media/teamlogo.e08bfc49.png","height":100,"width":250,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAaElEQVR4nGN8M2eGP7OgkMXvD++n8ielff/z6eM/RlY2JgYGhs9A/Ivx3arlNzl09NS+njxWKpCQcub3588/GVlZZYCSx4H4CePbebNMmQQFDX9sXLX4f2jcdzYvHwZhBgZGoCQI/AcAPLYlyIERMOcAAAAASUVORK5CYII="});
// EXTERNAL MODULE: ./utils/ip.js
var ip = __webpack_require__(9997);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/Header.jsx











const Header = ({
  user
}) => {
  const {
    0: isLogin,
    1: setIsLogin
  } = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    if (user) {
      setIsLogin(true);
    }
  });
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
      children: /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
          justifyContent: "center",
          alignItems: "center",
          px: "2.5rem",
          pb: "1rem",
          w: "full",
          size: "sm",
          fontSize: "2xl",
          position: "fixed",
          zIndex: 10,
          mt: "6",
          children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
            w: 3000,
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              href: "/",
              children: /*#__PURE__*/jsx_runtime_.jsx((image_default()), {
                src: teamlogo,
                width: 250,
                height: 100
              })
            })
          }), isLogin ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
            w: 700,
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
              onClick: (req, res) => {
                (0,external_cookies_next_.deleteCookie)('user', {
                  req,
                  res,
                  maxAge: 60 * 60 * 24 * 1000
                });
                setIsLogin(false);
                window.location.replace('/');
              },
              children: "Logout"
            }), /*#__PURE__*/jsx_runtime_.jsx("a", {
              href: `http://${ip/* frontend */.tQ}/mypage`,
              children: /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                ml: "3",
                children: "Profile"
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("a", {
              href: `http://${ip/* frontend */.tQ}/manageApp`,
              children: /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                ml: "3",
                children: "MyApp"
              })
            })]
          }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
            w: 450,
            children: [/*#__PURE__*/jsx_runtime_.jsx("a", {
              href: `http://${ip/* frontend */.tQ}/localLogin`,
              children: /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                children: "Login"
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("a", {
              href: `http://${ip/* frontend */.tQ}/register`,
              children: /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                ml: "3",
                children: "Sign up"
              })
            })]
          })]
        })
      })
    })
  });
};

/* harmony default export */ const components_Header = (Header);
;// CONCATENATED MODULE: ./pages/_app.jsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









function MyApp({
  Component,
  pageProps
}) {
  const {
    0: cemail,
    1: setEmail
  } = (0,external_react_.useState)(undefined);
  const {
    0: chashId,
    1: setHashId
  } = (0,external_react_.useState)(undefined);
  let userEmail = '';
  let userHash = '';
  let userInfo;
  const user = (0,external_cookies_next_.getCookie)('user');

  if (user) {
    userEmail = JSON.parse(Buffer.from(user, 'base64').toString('utf-8')).email;
    userHash = JSON.parse(Buffer.from(user, 'base64').toString('utf-8')).hashId;
    userInfo = JSON.parse(Buffer.from(user, 'base64').toString('utf-8'));
  }

  (0,external_react_.useEffect)(() => {
    setEmail(userEmail);
    setHashId(userHash);
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.ChakraProvider, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(components_Header, {
      user: userInfo
    }), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread(_objectSpread({}, pageProps), {}, {
      email: cemail,
      hashId: chashId
    }))]
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 9997:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tQ": () => (/* binding */ frontend),
/* harmony export */   "y3": () => (/* binding */ backend)
/* harmony export */ });
/* unused harmony export cookieDomain */
const backend = 'localhost:8000';
const frontend = '3.35.86.127:80';
const cookieDomain = 'localhost';

/***/ }),

/***/ 8930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 8982:
/***/ ((module) => {

module.exports = require("cookies-next");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [121,675], () => (__webpack_exec__(9502)));
module.exports = __webpack_exports__;

})();