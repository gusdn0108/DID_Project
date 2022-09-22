"use strict";
(() => {
var exports = {};
exports.id = 54;
exports.ids = [54];
exports.modules = {

/***/ 8505:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_manageApp),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
// EXTERNAL MODULE: ./utils/axios.js
var axios = __webpack_require__(1826);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/appModal.jsx







const AppModal = ({
  isOpen,
  onClose,
  email
}) => {
  const {
    0: appName,
    1: setAppName
  } = (0,external_react_.useState)(undefined);

  const getRestApi = async () => {
    if (!appName) {
      alert('어플리케이션 이름을 설정해주세요');
      return;
    }

    try {
      const response = await axios/* request.post */.W.post(`/oauth/app/apiDistribution`, {
        appName,
        email
      });

      if (response.data.status == true) {
        alert(response.data.msg);
        onClose();
      } else {
        alert(response.data.msg);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Modal, {
      isOpen: isOpen,
      onClose: onClose,
      children: [/*#__PURE__*/jsx_runtime_.jsx(react_.ModalOverlay, {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.ModalContent, {
        children: [/*#__PURE__*/jsx_runtime_.jsx(react_.ModalCloseButton, {
          px: "5%",
          py: "7%"
        }), /*#__PURE__*/jsx_runtime_.jsx(react_.ModalBody, {
          px: "8%",
          pt: "10%",
          pb: "2%",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.FormControl, {
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.FormLabel, {
              fontSize: "150%",
              mb: "3%",
              textAlign: 'center',
              children: "\uC5B4\uD50C\uB9AC\uCF00\uC774\uC158 \uC0DD\uC131"
            }), /*#__PURE__*/jsx_runtime_.jsx(react_.Input, {
              type: "text",
              placeholder: "\uC5B4\uD50C\uB9AC\uCF00\uC774\uC158 \uC774\uB984\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694",
              size: "md",
              id: "Email",
              mb: "1%",
              onChange: e => setAppName(e.target.value)
            })]
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(react_.ModalFooter, {
          mb: "8",
          px: "20",
          justifyContent: "center",
          children: /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
            onClick: getRestApi,
            children: "\uC5B4\uD50C\uB9AC\uCF00\uC774\uC158 \uC0DD\uC131"
          })
        })]
      })]
    })
  });
};

/* harmony default export */ const appModal = (AppModal);
// EXTERNAL MODULE: ./components/Header.jsx + 1 modules
var Header = __webpack_require__(1750);
;// CONCATENATED MODULE: ./pages/manageApp.jsx










const manageApp = ({
  appList,
  email,
  user
}) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = (0,react_.useDisclosure)();
  const {
    0: myAppList,
    1: setmyAppList
  } = (0,external_react_.useState)(appList);
  const {
    0: whichApp,
    1: setWhichApp
  } = (0,external_react_.useState)(null);
  const {
    0: showInfo,
    1: setShowInfo
  } = (0,external_react_.useState)(false);
  const {
    0: isModifying,
    1: setIsModifying
  } = (0,external_react_.useState)(null);
  const {
    0: appRestAPI,
    1: setappRestAPI
  } = (0,external_react_.useState)(undefined);
  const {
    0: appSecret,
    1: setAppSecret
  } = (0,external_react_.useState)(undefined);
  const {
    0: uri,
    1: seturi
  } = (0,external_react_.useState)(undefined);
  const {
    0: getUserInfo,
    1: setGetUserInfo
  } = (0,external_react_.useState)(undefined);
  const {
    0: impact,
    1: setImpact
  } = (0,external_react_.useState)(false);

  const getAppinfo = async restAPI => {
    const response = await axios/* request.post */.W.post(`/oauth/app/appinfo`, {
      restAPI
    });
    setWhichApp(response.data.result.appName);
    setappRestAPI(response.data.result.restAPI);
    setAppSecret(response.data.result.client_secret);
    seturi(response.data.result.redirectURI);
    setGetUserInfo(response.data.result.neededInfo);
    setShowInfo(true);
  };

  const setUri = k => e => {
    uri[k] = e.target.value;
  };

  const confirmURI = k => e => {
    if (e.key !== 'Enter') return;
    setIsModifying(null);
  };

  const modifyRed = async () => {
    if (isModifying !== null) {
      alert(`uri 설정을 완료한 후 계속 진행해주세요.`);
      return;
    }

    const response = await axios/* request.post */.W.post(`/oauth/app/updateRedirect`, {
      restAPI: appRestAPI,
      uris: uri
    });
    alert(response.data.msg);
  };

  const changeReq = async k => {
    getUserInfo[k].get = !getUserInfo[k].get;
    const response = await axios/* request.post */.W.post(`/oauth/app/getInfoUpdate`, {
      getUserInfo: getUserInfo,
      restAPI: appRestAPI
    });

    if (response.data.status == true) {
      alert(response.data.msg);
      setImpact(!impact);
      return;
    }

    alert(response.data.msg);
  };

  const uris = uri?.map((v, k) => {
    return /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
      h: "2rem",
      justifyContent: 'center',
      children: isModifying == k ? /*#__PURE__*/jsx_runtime_.jsx(react_.Input, {
        placeholder: "redirect url\uC744 \uB4F1\uB85D\uD574\uC8FC\uC138\uC694.",
        w: "70%",
        mb: "1%",
        size: "sm",
        px: "3%",
        defaultValue: uri[k],
        onChange: setUri(k),
        onKeyDown: confirmURI(k),
        borderColor: 'gray.400',
        id: "redirect"
      }) : uri[k] == null ? /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
        onClick: () => setIsModifying(k),
        mb: "1%",
        textColor: 'gray.500',
        id: "redirect1",
        children: "redirect uri\uB97C \uB4F1\uB85D\uD574\uC8FC\uC138\uC694"
      }) : uri[k] == '' ? /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
        onClick: () => setIsModifying(k),
        mb: "1%",
        textColor: 'gray.500',
        id: "redirect2",
        children: "redirect uri\uB97C \uB4F1\uB85D\uD574\uC8FC\uC138\uC694"
      }) : /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
        onClick: () => setIsModifying(k),
        mb: "1%",
        id: "redirect3",
        children: uri[k]
      })
    }, k);
  });
  const getUserInfos = getUserInfo?.map((v, k) => {
    return /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Tr, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Td, {
        textAlign: 'center',
        children: v.att
      }), /*#__PURE__*/jsx_runtime_.jsx(react_.Td, {
        textAlign: 'center',
        children: v.get.toString() == 'true' ? /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
          children: "\uC694\uCCAD"
        }) : /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
          children: "\uC694\uCCAD\uD558\uC9C0 \uC54A\uC74C"
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(react_.Td, {
        textAlign: 'center',
        children: /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
          onClick: () => changeReq(k),
          id: v.att,
          disabled: v.att === 'name' || v.att === 'email' ? true : false,
          children: v.get.toString() == 'true' ? /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
            color: "black",
            children: "\uC694\uCCAD \uBC1B\uC9C0 \uC54A\uAE30"
          }) : /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
            color: "black",
            children: " \uC694\uCCAD\uD558\uAE30"
          })
        })
      })]
    }, k);
  });
  const showAppList = myAppList?.map((v, k) => {
    return /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
      p: "5%",
      fontSize: "120%",
      children: /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
        justifyContent: 'space-around',
        children: /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
          px: "5%",
          onClick: () => getAppinfo(v.restAPI),
          children: v.appName
        })
      })
    }, k);
  });

  const getMyApp = async () => {
    const response = await axios/* request.post */.W.post(`/oauth/app/getMyApp`, {
      email: email
    });
    setmyAppList(response.data.myapp);
  };

  const deleteApp = async () => {
    const returnValue = confirm(`어플리케이션을 삭제하면 복구가 불가능 합니다. 정말 삭제하시겠습니까?`);

    if (returnValue == true) {
      const response = await axios/* request.post */.W.post(`/oauth/app/deleteApp`, {
        restAPI: appRestAPI,
        client_secret: appSecret
      });
      alert(response.data.msg);
      setWhichApp(null);
      setShowInfo(false);
      getMyApp();
    }
  };

  (0,external_react_.useEffect)(() => {}, [isOpen, whichApp]);

  const closeAndUpdate = () => {
    onClose();
    getMyApp();
    setWhichApp(null);
    setShowInfo(false);
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(Header/* default */.Z, {
      user: user
    }), /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
      bg: "#160627",
      h: showInfo ? '100%' : '60rem',
      pt: "10%",
      children: /*#__PURE__*/jsx_runtime_.jsx(react_.Center, {
        w: "100%",
        py: "5%",
        px: "5%",
        h: "100%",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
          w: "70%",
          h: "100%",
          mx: "auto",
          p: "3%",
          children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
            mx: "auto",
            my: "0",
            justifyContent: 'center',
            mb: "3%",
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
              w: "40%",
              mx: "auto",
              my: "0",
              children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                textAlign: 'center',
                fontSize: '175%',
                mb: "0.5rem",
                color: 'white',
                children: "\uC5B4\uD50C\uB9AC\uCF00\uC774\uC158 \uB4F1\uB85D"
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
                justifyContent: 'center',
                children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                  onClick: onOpen,
                  color: "white",
                  variant: "outline",
                  m: "2%",
                  children: "\uC5B4\uD50C\uB9AC\uCF00\uC774\uC158 \uC0DD\uC131"
                }), /*#__PURE__*/jsx_runtime_.jsx(appModal, {
                  isOpen: isOpen,
                  onClose: closeAndUpdate,
                  email: email,
                  display: "block"
                })]
              })]
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
              mx: "auto",
              my: "3%",
              justifyContent: 'center',
              children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                fontSize: '200%',
                color: 'white',
                children: "\uB0B4 \uC5B4\uD50C\uB9AC\uCF00\uC774\uC158"
              }), /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
                color: 'white',
                cursor: "pointer",
                children: showAppList
              })]
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(react_.Divider, {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
            pt: "5%",
            w: "70%",
            mx: "auto",
            my: "2%",
            bg: whichApp == null ? '' : 'white',
            borderRadius: "4rem",
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
              flexDirection: 'column',
              alignItems: "center",
              mb: "3%",
              children: /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
                fontSize: '180%',
                children: whichApp == null ? '' : /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Text, {
                  children: ["Application : ", whichApp]
                })
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
              flexDirection: 'column',
              alignItems: 'center',
              w: "80%",
              mx: "auto",
              children: showInfo == false ? '' : /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
                children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Table, {
                  mb: "3%",
                  children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Thead, {
                    children: /*#__PURE__*/jsx_runtime_.jsx(react_.Tr, {
                      children: /*#__PURE__*/jsx_runtime_.jsx(react_.Th, {
                        textAlign: 'center',
                        fontSize: "80%",
                        children: "Rest API"
                      })
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Tbody, {
                    children: /*#__PURE__*/jsx_runtime_.jsx(react_.Tr, {
                      children: /*#__PURE__*/jsx_runtime_.jsx(react_.Td, {
                        textAlign: 'center',
                        children: appRestAPI
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Table, {
                  mb: "3%",
                  children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Thead, {
                    children: /*#__PURE__*/jsx_runtime_.jsx(react_.Tr, {
                      children: /*#__PURE__*/jsx_runtime_.jsx(react_.Th, {
                        textAlign: 'center',
                        fontSize: "80%",
                        children: "Client Secret"
                      })
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Tbody, {
                    children: /*#__PURE__*/jsx_runtime_.jsx(react_.Tr, {
                      children: /*#__PURE__*/jsx_runtime_.jsx(react_.Td, {
                        textAlign: 'center',
                        children: appSecret
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
                  textAlign: 'center',
                  borderColor: "white",
                  border: '3px',
                  w: "100%",
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
                    fontSize: '175%',
                    mt: "2%",
                    children: [' ', "\uC0AC\uC6A9\uC790 \uC815\uBCF4 \uC694\uCCAD", ' ']
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    mb: "3%",
                    children: "\uC0AC\uC6A9\uC790\uC5D0\uAC8C \uC81C\uACF5\uC744 \uC694\uCCAD\uD560 \uC815\uBCF4\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694"
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
                    mx: "auto",
                    mb: "2%",
                    w: "100%",
                    children: /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
                      justifyContent: 'space-around',
                      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Table, {
                        children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Thead, {
                          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Tr, {
                            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Th, {
                              textAlign: 'center',
                              children: " \uD56D\uBAA9 \uC774\uB984 "
                            }), /*#__PURE__*/jsx_runtime_.jsx(react_.Th, {
                              textAlign: 'center',
                              children: " \uC0C1\uD0DC "
                            }), /*#__PURE__*/jsx_runtime_.jsx(react_.Th, {
                              textAlign: 'center',
                              children: " \uC218\uC815 "
                            })]
                          })
                        }), /*#__PURE__*/jsx_runtime_.jsx(react_.Tbody, {
                          children: getUserInfos
                        })]
                      })
                    })
                  })]
                }), /*#__PURE__*/jsx_runtime_.jsx(react_.Divider, {
                  orientation: "horizontal",
                  my: "3%"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
                  textAlign: 'center',
                  w: "100%",
                  children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
                    fontSize: '175%',
                    mt: "3%",
                    children: "Redirect URI \uAD00\uB9AC"
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    mb: "2%",
                    children: "\uB9AC\uB2E4\uC774\uB809\uD2B8 url\uC740 \uCD5C\uB300 5\uAC1C\uAE4C\uC9C0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
                    mb: "2%",
                    children: uris
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
                    mb: "1%",
                    children: /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                      children: "uri \uC218\uC815 \uD6C4, \uC218\uC815 \uC644\uB8CC \uBC84\uD2BC\uC744 \uB20C\uB824\uC8FC\uC138\uC694."
                    })
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Box, {
                    mx: "5%",
                    my: "10%",
                    children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                      onClick: modifyRed,
                      mx: "1%",
                      children: "\uC218\uC815 \uC644\uB8CC"
                    }), /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                      mx: "1%",
                      onClick: deleteApp,
                      colorScheme: "red",
                      variant: 'outline',
                      children: "\uC5B4\uD50C\uB9AC\uCF00\uC774\uC158 \uC0AD\uC81C"
                    })]
                  })]
                })]
              })
            })]
          })]
        })
      })
    })]
  });
};

const getServerSideProps = async ctx => {
  const cookie = ctx.req ? ctx.req.headers.cookie : '';
  const encodedCookie = cookie.split(';');
  let cookieNeeded;

  for (let i = 0; i < encodedCookie.length; i++) {
    const tokenName = encodedCookie[i].split('=');

    if (tokenName[0].trim() == 'user') {
      cookieNeeded = tokenName;
    }
  }

  const email = JSON.parse(Buffer.from(cookieNeeded[1], 'base64').toString('utf-8')).email;
  const response = await axios/* request.post */.W.post(`/oauth/app/getMyApp`, {
    email: email
  });
  return {
    props: {
      appList: response.data?.myapp
    }
  };
};
/* harmony default export */ const pages_manageApp = (manageApp);

/***/ }),

/***/ 8930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

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
var __webpack_exports__ = __webpack_require__.X(0, [121,675,750,826], () => (__webpack_exec__(8505)));
module.exports = __webpack_exports__;

})();