"use strict";
exports.id = 750;
exports.ids = [750];
exports.modules = {

/***/ 1750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Header)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./image/teamlogo.png
/* harmony default export */ const teamlogo = ({"src":"/_next/static/media/teamlogo.e08bfc49.png","height":100,"width":250,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAaElEQVR4nGN8M2eGP7OgkMXvD++n8ielff/z6eM/RlY2JgYGhs9A/Ivx3arlNzl09NS+njxWKpCQcub3588/GVlZZYCSx4H4CePbebNMmQQFDX9sXLX4f2jcdzYvHwZhBgZGoCQI/AcAPLYlyIERMOcAAAAASUVORK5CYII="});
// EXTERNAL MODULE: external "cookies-next"
var external_cookies_next_ = __webpack_require__(8982);
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
          }), isLogin ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
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
              href: `${ip/* frontend */.tQ}/mypage`,
              children: /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                ml: "3",
                children: "Profile"
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("a", {
              href: `${ip/* frontend */.tQ}/manageApp`,
              children: /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                ml: "3",
                children: "MyApp"
              })
            })]
          }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
            w: 450,
            children: [/*#__PURE__*/jsx_runtime_.jsx("a", {
              href: `${ip/* frontend */.tQ}/localLogin`,
              children: /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                children: "Login"
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("a", {
              href: `${ip/* frontend */.tQ}/register`,
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

/***/ }),

/***/ 9997:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tQ": () => (/* binding */ frontend),
/* harmony export */   "y3": () => (/* binding */ backend)
/* harmony export */ });
/* unused harmony export cookieDomain */
const backend = 'http://localhost:8000';
const frontend = '3.35.86.127:80';
const cookieDomain = 'localhost';

/***/ })

};
;