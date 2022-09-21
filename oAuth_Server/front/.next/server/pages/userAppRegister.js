"use strict";
(() => {
var exports = {};
exports.id = 932;
exports.ids = [932];
exports.modules = {

/***/ 3553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_ip_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);







const userAppRegister = ({
  getUserInfo,
  appName,
  restAPI,
  redirectUri,
  hash,
  giveUserInfo
}) => {
  const attributes = getUserInfo.map((v, k) => {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Box, {
      mb: "5%",
      fontSize: '105%',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Flex, {
        children: ["- ", v.att]
      })
    }, k);
  });

  const didRegister = async () => {
    const codeUrl = location.href;
    const email = codeUrl.split('?')[1].split('&')[0].split('=')[1];
    const response = await axios__WEBPACK_IMPORTED_MODULE_1___default().post(`${_utils_ip_js__WEBPACK_IMPORTED_MODULE_3__/* .backend */ .y3}/oauth/app/userdidregister`, {
      restAPI,
      email,
      point: 50000,
      hash,
      giveUserInfo
    });

    if (response.data.status == true) {
      alert(response.data.msg);
      location.href = `${_utils_ip_js__WEBPACK_IMPORTED_MODULE_3__/* .frontend */ .tQ}/login?clientId=${restAPI}&redirectUri=${redirectUri}`;
    }
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Box, {
      border: "1px",
      borderColor: 'gray.200',
      w: "35%",
      mx: "auto",
      my: "10%",
      h: "40%",
      px: "5%",
      py: "6%",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Flex, {
        h: "10%",
        alignItems: 'center',
        pb: "12%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Img, {
          src: "https://k.kakaocdn.net/14/dn/btqmdPkHR5M/DrrBuObYWlfrBaNkokh3J0/o.jpg",
          w: "15%"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Box, {
          w: "20%",
          mx: "5%",
          textAlign: 'center',
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Text, {
            fontSize: '100%',
            pr: "15%",
            children: appName
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Text, {
            fontSize: '75%',
            color: "gray.500",
            textAlign: 'left',
            px: "7%",
            children: "sila"
          })]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Box, {
          w: "80%",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Text, {
            textAlign: 'left',
            fontSize: "5%",
            mt: "2%",
            children: "\uC11C\uBE44\uC2A4 \uC81C\uACF5\uC744 \uC704\uD574, \uB2E4\uC74C \uC0AC\uC6A9\uC790 \uC815\uBCF4 \uC81C\uACF5\uC5D0 \uB3D9\uC758\uD574\uC8FC\uC138\uC694!"
          })
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Divider, {
        orientation: "horizontal",
        my: "4%"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Flex, {
        h: "20%",
        fontWeight: '800',
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Checkbox, {
          children: "\uC57D\uAD00 \uB3D9\uC758\uD558\uAE30"
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Divider, {
        orientation: "horizontal",
        my: "4%"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Box, {
        py: "2%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Flex, {
          justifyContent: 'space-around',
          py: "2%",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Text, {
            fontSize: '80%',
            children: "\uC57D\uAD00 \uB3D9\uC758\uB294 \uB2E4\uC74C \uC815\uBCF4\uB4E4\uC758 \uC81C\uACF5\uACFC \uC81C\uACF5 \uBAA9\uC801\uC5D0 \uB300\uD55C \uB3D9\uC758\uB97C \uD3EC\uD568\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4."
          })
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Flex, {
          py: "2%",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Box, {
            children: attributes
          })
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Flex, {
          justifyContent: 'center',
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.Button, {
            onClick: didRegister,
            mt: "5%",
            children: "\uB3D9\uC758\uD558\uACE0 \uACC4\uC18D\uD558\uAE30"
          })
        })]
      })]
    })
  });
};

const getServerSideProps = async ctx => {
  //oauthDB에 요청을 보내서 요청 유저 정보 데이터를 가져온다.
  const restAPI = ctx.query.restAPI;
  const email = ctx.query.email;
  const redirectUri = ctx.query.redirectUri;
  const hash = ctx.query.hash;
  const giveUserInfo = ctx.query.giveUserInfo;
  const response = await axios__WEBPACK_IMPORTED_MODULE_1___default().get(`${_utils_ip_js__WEBPACK_IMPORTED_MODULE_3__/* .backend */ .y3}/oauth/app/giveUserInfo?restAPI=${restAPI}`);
  return {
    props: {
      getUserInfo: response.data.infos?.filter(Boolean),
      appName: response.data.appName,
      restAPI,
      email,
      redirectUri,
      hash,
      giveUserInfo
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userAppRegister);

/***/ }),

/***/ 9997:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tQ": () => (/* binding */ frontend),
/* harmony export */   "y3": () => (/* binding */ backend)
/* harmony export */ });
/* unused harmony export cookieDomain */
const backend = 'http://3.39.202.148';
const frontend = 'http://3.35.86.127:80';
const cookieDomain = 'localhost';

/***/ }),

/***/ 8930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

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
var __webpack_exports__ = (__webpack_exec__(3553));
module.exports = __webpack_exports__;

})();