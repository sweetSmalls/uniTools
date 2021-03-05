(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"funlist","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"funlist","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"funlist","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"funlist","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"funlist","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!****************************************!*\
  !*** D:/uniProject/funlist/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!***********************************************!*\
  !*** D:/uniProject/funlist/uview-ui/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 12));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 13));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 17));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 18));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 22));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 23));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 24));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 25));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 26));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 27));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 28));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 15));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 14));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 29));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 16));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 30));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 31));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 32));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 33));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 34));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 35);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 36));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 37));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 38));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 12 */
/*!**********************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/mixin/mixin.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */
/*!************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/request/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 14));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 14 */
/*!*****************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/deepMerge.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),
/* 15 */
/*!*****************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/deepClone.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),
/* 16 */
/*!************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/test.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),
/* 17 */
/*!*******************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/queryParams.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),
/* 18 */
/*!*************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/route.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 19 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),
/* 20 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 21 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 22 */
/*!******************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/timeFormat.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),
/* 23 */
/*!****************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/timeFrom.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),
/* 24 */
/*!*********************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/colorGradient.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),
/* 25 */
/*!************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/guid.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),
/* 26 */
/*!*************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/color.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),
/* 27 */
/*!*****************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/type2icon.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),
/* 28 */
/*!*******************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/randomArray.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),
/* 29 */
/*!***************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/addUnit.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),
/* 30 */
/*!**************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/random.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),
/* 31 */
/*!************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/trim.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),
/* 32 */
/*!*************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/toast.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 33 */
/*!*****************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/getParent.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),
/* 34 */
/*!***************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/$parent.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),
/* 35 */
/*!***********************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/sys.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 36 */
/*!****************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/debounce.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),
/* 37 */
/*!****************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/function/throttle.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),
/* 38 */
/*!************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/config/config.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),
/* 39 */
/*!************************************************************!*\
  !*** D:/uniProject/funlist/uview-ui/libs/config/zIndex.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),
/* 40 */
/*!*********************************************!*\
  !*** D:/uniProject/funlist/util/httpSvc.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.httpSvc = httpSvc;



var _index = _interopRequireDefault(__webpack_require__(/*! ../store/index.js */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 封装HTTP请求公共部分
// url 请求地址
// 请求方式
// 参数信息
function httpSvc(url, method, data) {console.log('路径', url);console.log('方法', method);console.log('数据', data);
  _index.default.commit('loadShow', true);
  return new Promise(function (resolve, reject) {
    uni.request({
      url: url,
      method: method,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Token": 't4XZGxhkehZqQ58y' },

      // 成功使用
      success: function success(data) {
        _index.default.commit('loadHide', false);
        resolve(data);
      },
      // 失败调用
      fail: function fail(err) {
        reject(err);
      } });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 41 */
/*!********************************************!*\
  !*** D:/uniProject/funlist/store/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //引入vue
// 引入vuex
_vue.default.use(_vuex.default); // 让vue使用vuex
// 通过vuex构造函数创建store对象
var store = new _vuex.default.Store({ state: {
    loadingStaus: false // 加载动画状态
  },

  mutations: {
    loadShow: function loadShow(state, params) {
      state.loadingStaus = params;
    },
    loadHide: function loadHide(state, params) {
      state.loadingStaus = params;
    } },

  actions: {} });var _default =




store; // 导出store对象
exports.default = _default;

/***/ }),
/* 42 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/*!**************************************************!*\
  !*** D:/uniProject/funlist/pages/index/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.tableList = void 0;var _httpSvc = __webpack_require__(/*! ../../util/httpSvc.js */ 40);

var tableList = function tableList(params) {return (0, _httpSvc.httpSvc)('https://v2.alapi.cn/api/joke', 'POST', params);};exports.tableList = tableList;

/***/ }),
/* 50 */
/*!***************************************************!*\
  !*** D:/uniProject/funlist/static/assest/ji1.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 51 */
/*!*******************************************************!*\
  !*** D:/uniProject/funlist/static/assest/tianqi1.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 52 */
/*!*****************************************************!*\
  !*** D:/uniProject/funlist/static/assest/laji1.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAfpUlEQVR4Xu1dS3pTSbKOlEA1bGoFZVZQZnq/EpgVACvAnqDqEWYDraPeQJlRIyaYFZRYATKq707LrKDFCsqe3QKkvF8cHdl6ZOQz8jyk1IgP58lHZPwZj4yMEJB+iQKJAiQFRKJNokCiAE2BBJDEHYkCGgokgCT2SBRIAEk8kCjgR4EkQfzolr7aEwokgOzJRqdl+lEgAcSPbumrPaFAAsiebHRaph8FEkD86Ja+2hMKJIDsyUanZfpRIAHEj27pqz2hQAKIYqP/J3t72G7BP1b/1J7f/TzOTq72hC/Wltn999tHm+ue/OvFxT7QIgGk2OWHg+FzKeEpABwBwD1i86cAMGrD/PU4+yf+eyd/R9m7e3Px7TlIeSwBDqlFCoBLEOK8Je++39XDY+8B0s2GCIrfAODAjdvleRt+eLVrjPHLYNgXEk41h4SKTFdSwNkf/d7AjYb1b70TAEGV6I6AR3OQ+cnfAoEbdqlTA/CUnMHfvwGI44BtQpXrZJL1RlQf+Tji70cSxM1JLEBetqX8HEMK5eO1vv0spURJmP9aANPvUnz+3+zFJTXPnIYg3+kkholOKFG+gzgxjiPkz/OVA0kIMa6rCttYgKwwOEoASiW6ApCjNsjBKjPmKgR8/RjCDOvMIk4m2Yvz1f9DySQA+mYVBc4+9XvvTcxn+vsv2X+OBLReAuRqIvWbSgHnd2Tn9arky20ukB8dpQY1xtUMxONVkCC9v4uvL4UEPIx0knokYf76j+yfY9N6y/p7IwHSzd4eA0hUiyhgbNLvRgXgB8dyqAVIFsD99jvA7Qlu2kybk1croeBrHyBXi2x/aD+9QsnHDI7l+DcgKYD7zlGFPWtDZ1AH9bVxAOlmb975q0WyOOU1apWEaxBijGrQHOZjAe0DAfIgN+AF/KzjQCHgWEo4cwDuandbJ6+J20PBLoQ4NRniIOGLFHIkpJhKMb8UsnUohTwQUiA9ftJJKyHEmZQS6eH8w0OjBZ3HVYOkUQD5JXtzJkCgGhHlJwAGLeicUZtylP3nYAYtBNmW25NpQtYgCQWHcb4SvoAQ2abquPpdLsmlzAxAMQ5FNagDSBoDkMLb9Ls3tXUfSriWYv7UVvd9mA0zCYBqTYzftA2dB6aTM+phIeFzW3SOTHPAxecqpfw6NklXX0JJkK//yH51UR99h1J+1ySA/Fejx14AiHMJs+kc2ldtkAcLNUw+saGWhPljW3As++tmQ5Qkz4395+BD1U6OcG4tmN1DNQUA8ORdu4xc9oWS7FPWy6i+C7vhT83YaPSPZiCm+XjQPrA+6R3AsRzfCSQomQDOUF273avcsUDS0md/jPti2aARACmMcjT0tn8SXk0GPaWem0sdCecUI2JnISdUtz+catULDbMVxjwCRwXiq0nW+5Haw272dqT8TsL1TIgjys1qA2pfZiyMcfSE6X7vJ1lP6VbPQS8lSiLFoSE+TLIXOu+cJbu7N2sKQJQMYTppkRxacAFAGzo/2qgSKtIagHvdFp0DXd+Gk/cZdb/SzYZSNZ8ZiAe6O4iCHmpwLTq8mGS9m/sTV3bqZkN0zxL2mZnJdZIxZJ9c17HaviEAUTCEhC+TQc/q9pveOPOm6Yi7kAJf/1K32b4bUYMsv8nfsq0oyaY5qcnTeXVcjjlrJBuqtUpJ34b5fZuLUUrK+Uq2EHDgt7UHSOE5Qvtj82fFEPmp2R+egsjDSdZ+NhLIROBuf3ipMlBtGaKY35VCtVCe5tRaAICUOJtroA6MUCYkwSvh82TQI2O6VudH9cGxV6a9VP299gDhIFghuhV2ijjXuTFtCFp4k7Y230VVIRhWCRDKg+bC3AXItnR6lznTUiRXszYPorHO6bAu4XJX+taBmABCUJwDIDaMXmWbsgFS5VpNY1N2SAIIQTlKxaqKYKYN9vn7w2z4pyJmy0nFcpEgPnMs65u6HYi1V7FyHV3htQlxz5a12bbjqL1SagcCxUC7DpCq1tdYgIS6JG2ZN3Y7yqtESci6nbDc9KGcEAkgGkoTF3LayzTujYvVn8bzo7wApVTOXZGolBPC5o4nxh41RYIowzpcXKkxiMfRp8+J2e0Pt9zCGNj3Kes94JhTlX0o7TEJ15NBz/ZpA+v0mwEQ4h4DwO4yjpVizJ1RYSOTrEfuDfVNVbfNXCTRXGIG3fCHzK8RAAm9PQ4hUMxvC4ZAn//66Wi4WKOjiZt9YFAR21V6LBsBkNyTpVAr8P+bfGpSsVwme4KOWQoLnYl5GNj0TUnGqgx0nHNzAEKGlzf31Oxmbz+qnubaGKRUJHFT7TJSvXKIubMBoWubxgBEo2ZNJ1nvvuvCq25PSgFLhqAeTFWpjoTQlA6hSQ+mrOlKv79onhQh32Zo3resEkoTxHnVhs593xB+681gbEjaYrkKbRcFzDidta4aI0Fw1pqnrlbPVGMR0bVfzd3HdVvMD23CwnO7jHh/YbJhXOcbu73m+XBl3qvlmhsFkOKBEb7i23p11iTVgoi9QoNQ+9R2k1F1r/iqNGxdAKV7JFWHNTQKIIU3S/m2A/9mY9y6bF6MtuRpKcH4AlE1H0qK1CEjiIl+hswslUuPRnmxVomteQtea1VLl5nFVXos6aGxRfDF/fkk+/XExKhV/V2X46xq26ORKtZy0jrVoq4npzaDocOLOxUza1MAWRr9ZYNE956/TjZU41SsW5DoksjV6+Q0pffkUA2pp78LetXLy2dIdmH9PLcMUDcWIIU9onwPXjDFuA13n1Xt7jSBA5hOeH3anPqAxJQJRpe2qAxAbI7RaICYmGKhbs2f2bpNuTegsDkwywcViWqdeMJmbqYUR1XbJN1siIkzNFkS6yXpGmukrzKLCSQAYKzhYcN8rm3MzBCWg4qajwkkVRwa6EiYQ+t3fbmJ+oFjJwCCi7DM6oel017FliZW6f490nu6AFSTGmjZTWkVoWwqVvl68Fxo4tu20SrWmuvXIs1oIU3OY9QYXACj3beoC3LRhs7T2LaRZXLrqRCQcRTw2WTAouYj5hfWJverk8dKBaKdAQgurlC3Rnbp+CXm7B1N+r9+8D1dFsUuvz4BCaeW1apYbQ7TvIvyBGe63MRFHyzFSYs7mWWVK33Wy0UdltPQvGQmGoT+facAgsQoAt+wZqBtDQ+0UcZYJw/rGupq5S3LQ2P9PyHFkYW0WNmfanRst0Mjn+4UQBb0EFNdnce8PLSc34O8OjDSw7IQqoQvMyGemvIIhzI3x/c7B5AlUXI9XFNiwJJ4eLKiByrkPfTFDMRplcyQ1wiEv7Pw4kNi7HYobFMZVao78EMWW8W03F9js50FyEKaYBrL9pltnRAjtVwaoAoBkFGlGVy64mqb20myhSqXtpQc13hr/Uj4LMX81LUOS5S5OHS6swBZloY21uBzIJZj07zCLqpuLdn5UIcTc2EzfXvuWzfQcf1rzbEeYkvOPsT2IobMcT+MdJBYqQgTM1uVRuAmqKa/kRAwqgIs3cGbJyDzwqWVFKFZp4kYCyHPY3jOYuxl4yWIhycpBh0d+5TnM2i9jmmXrNQmR1ssxIZyXJt1c2XNduuvS2rYWIAs7AvRBxB4KsZigAuQcGDnNvbZMf7TNBowcrcsXIKEQwu3sQsx8kvLO7Lzug5q6ObEGweQFWAoa9257IyibV4MtA13R5ubhTZNC+bHFvXBfabAcmH3cPD2pcSyzHwHhpIeRX3FpyAlPl7jMvivhIDTuqlejQFIcb+BpZf5SwI7eljyt/ESkDmUVWp9EFJ8M5UwP3H19BTeunehLtibeS+kxTFVI3F1fUzu9JsuMVbsO4iTmOqny/40AiBF2AJWiLJXpSR8BoBzIeCerqa5b6hDzpSyhbf21AmaB0lKyC8Vn7qpaWI8A3hlwyROUmPB+COQgM8EtkrS5YxjqJSrYi5TwCjSWIBYXChaHipSQPZHvzdwYeYYbWsNkMVbCtxIaVd5tajB3RbzEboTjW8xGB4S6UorryaULuZy6sIkWE98kvVeqTbe8J57/ROkixDZUnWkkkb4gGM5kAEk+VNobDuDb6iaYY34n0wMXUXkcWNskCIKFPVpm99FwUwYYpL/zAzEF/qhA8mmhCoys6D9hCqaFZNsqhwF2LAyrineKQfGaryTLtI3NIuILtR+M2K3iBOzAUolzxWWfFQ7CeKoT19ImGcqnV2XECDGE1QdSKgKtA5MAkuVo2BCVI9odZO4xdclaOMKOddEEV+1Yf5g86LQ1p7Di8ZP/RevbU5Lzja1AojFC7zl2klgYAN9vqg4qSwLyTAmbBJtthXHqFvDBaj40IbZqerGmjzhJXxpi84hh5vVJ3dZ4RU7N4cElZ9roDYAsVKpLEOku9kQSwpsM1Jg9hDTyaTTw00ndHBAoYXniaQLgy225tnK3h4DSHxqvPnTVgXLD0gJ+AxB4x0sFyS1AIheHbqh8fs2dE5NpxypY+eJ2ezTeprAQP1dp+Pb5HryCijMXyjOn+rinHTSYzLosYfl+OZRtvAOlprvq1KAmA3phdtRivlTm7uBMnRsG+BQ2Q4BYDTJes9s+tDkId783O7gyN6O1CoMn7PCUooYs/EX+4hufYyrI37lSJLKAGIFDgCn56majOml5lriyjdbSBO8awlSOTS1N6LV/tPZIrZ5wExv633vsGwOqEq9WDbgMOnsm4vUSY9Q96ULQZdtaa+WWxUouxeS+tPUt5KVz7rXpchQWXzVZW9NWVpieCRX11C6BDGCw9IQ39w8jUpSSRJkXc5cG1tkc30GN7I2eyJV2sz2JPcFCiVJXSvymkAScx2lAsQGHL6Z9brZ8C/V3UAV0sMsRcAreYPZLtm2J6oubcZVKs4AkmhFg0oFSDcb4u2v+tGORwzQLSOSbsVKpMdyXnop0vnR5JFTndym03RT5aAyypehv+P8NeUeXrk+RzYcENYOEBeJWBpAtK7cAHDgYsnYImb/vgthjVIkICev6TSdgXi8DHSkGDSmWrJKJ+6KvJS6uBiT3yNXCkBiJiwmT2nLYpg+TO/yDXWr76qHb9skpNTEpjcqh/LwkBDNe6WUeuoS3tpLQ4rGhogFZTiLy35tto0OEJ3LMyR6dLmQJlR7pUoThJ7ihuDAyxZ0Hs/gK9pmGz83T1oIg+G33E4CLU+Bn31HrTEqQAoD8U8q6pTDgKbCJ3w8RaGMQH1P+fM57ABTuL0y42OAeudDI010g7MdshxfZ49w8NVynKgA0RrlDPqiptZ4qReDJqbRGOvGW2VT34sTejh2yCRZei1HzYnv5c1bse+IdYvxJHvx2IZ2pjbRAGIwJIMIY1KvYhhrJkKa/k4xcaiaheMa9PKtqU2yXrR9J6VoNpQK/f7yU9bLH1L5/LgiFnRjRyGU7lYbGCNqKe9VG/xcqD6bZPsNpWa43CrrxjLo5aufVuL6pg6IULBqIhZYpEgUgGhioq59LwI3mUPjvaqVerWct0bNYmNYU+wSzoXD7rE9FFbbUTwRKkF1MV8ctgg7QLTFbBiNQ0qF4zqRfZjA9A11qxx6im4wot4eYdwD03rX5oXJxNWJIp7ZZE/RjUUb7OHeOnaA0Jd2vCXHYp1ILpvu2pZySXOcdGuSSrYwa4kyAphzLJf1a+6DBp+ynm3uAeWQ3HFvq4OwAkRnmHO7XZXu3ZIvwFwYBNvGZJLVuehcoNz7YEsDMiYMwk95nAN1YIZqFMwAUT91DZ2ktf0BvFLKdvNt21FMEnqrrhqfUue498J27QUTb3mygGnPNE6KIFc6G0DKSAiw3AwqAK/KzbdlFOpWndMO0Umr1TAU2zlztYvlybrhi/4QVcutRH4hjgBGgBCJEhguBDc3iFIhqtKvXRiozOBBiiGrOkhKAIjaERDgmGABSOkJAYj31dynsAvj27al7TT+SFSNRzHa+wkfbxOXXUQZ6yEqLBdAPqrTg/JveqHLbqf1qUn0rgkoZRnqK+ooFY5xUnaF2TIkP6XC+l4eBwOkinDzriJsAZi8ISYG5/i7ev5xHAwaKRJkvPrQgbIdqcyTPmNwu9KDAVJ2uHnZJ7DPJpm+IU65aAxLebRCjFfTGlV/L2PvuB04wQCh3oJz6ZWbhNbctQTfyPpsus831PuIWDZUzHB7l/WXARD60tDvviUIILTI9JuMDbHL0GNt5hHSpuw10Jd04PWqL2TtKvWS26tGSEwvCR0EEE0m72inOTWmrxEWstm+39In+vyxTQZJn3E1D6ui7ZVqnmXYX5zu5CCAVBHuwbl4H0bj+IY2nON4/QrPH2aTwawya7+yo3vLAAh9iM7vu9Zp9wYId7YKW8ZTAoTxjYntPELaaRKqBQfuUfPSqFleqofv+gkHBVvIP86LU4X1BogmxDiqf72ME8h3812+K0MXVzg4lAmsYzlUCBVLdS/DChA6F5i7CusNEMoTE9sWaPodyJJpqgA6/aAqnmq3DVLl+3lWZwGpwnqEnAQARJHqM7KqowkliKaauEgFl7ZVACRW8gTHdStv9jld3JzuZC+AaB6osCRjoAjOuXCXTY3RlnA2sKoaShVHkcQtJFbJlTZlOFk4+cQLIGUG3K1uAOfCXTeWu31lACFSBHGe4Dpa7QVAKAM9duhCFe5RbmCs2CDRVQ3V3Dk9PD602QuAlLFIFfEpgDThHYilsQqxT3JN9ENU7+Ny/dQdBee6OTUNTxVL4YmIbKAjgRNAfM7s9W84mcdnNpQE2zWARHtbrCN6AogPS25/U6WrfG8BUkbIQuGmxOqna78ZiNNlPQweForfS+HoON4caZL1jmKPXoWL+db2yss2RF03p5R0VrE4B4/NCKl/NQWq8qCVtR+cPJoAUtau1WicqpwsZZGglgBpoieprA2r2zgJIPY7wiZBEkDsiV51ywQQ+x1IALGn1c60LMOTVCWxKlWxqngNVxWxu/9++0hKmXuVhIR7UsBV/m+Ql235w4VPGeeq1rI6bgKI/S44S5CqQxXsl+bXEh8WfRdfXwoJpwBwT9+LPJcg38d6Juu3AvNXCSBmGi1bJICs0KoIw3hnBsY6gaWA7I9+b2BP9mpbJoDY0z8BpKCVoaaiBUXl+ST79cSiYeVNEkDstyABZFFbQpnQwJ6My5bNAEkCiP3O7j1AisdfWMvdYG9YE7XUNDrWs1ppmABiT7W9B4i+ljtcAMBZGzrjpceqcCFiLNFzgsyVZE6333I66wdnRK3LfLjbVurm3TUvFnVpBgDa58Nl1IHnZpxlf0mC2FN27yUIkiq/2wHIbgtf2qVO1ZVdrnNkQQJIAog9BYqWhS1yDhIO22J+aJuBj6pHUWYiBNfFJoDYUyxJkA1a4ZsTl7clmlQ6AJo8TKgn49BVXDImgOwZQHImbanrgtuQYjaHaxdQbPapSeJNGuy3eY3FWMJsUCZQEkBsuGLRZickiMbQtqJEqDqU572VX6e3NszasFvGvtrALw8oCSBWbJEAskqm0JSpOq/WpsGuzIq/2I5SMoskgCSA2FPgtmXwBZ+m7PLlp6z3IPeYZfmbbIz3Wv+VWIQ0AcSePZKKVdCKI+mEjcFetfTA5SaAJIDYU6BoGWqHLAfUGewgYQACfqtSeiSA9DIX5tgJCYIndwtmZCxVC1q/SYBDE2FC7RDs32CwE1Mox/ZYDp4kiIkTbv++EwDRLZcu9KP8KtgO0doZqiFLtD0SQMC5TMZOA8Q1jJ3DDlkyob3ruVzpkVSsPVSxVAdzYTB/VIaxS7hW3VnY2iGOUokWcBVIjwSQBJDcDpjD14+03SFOivSXjza518YOYQNISfcem2tMNsie2yC6Nx5LNUrD5EY7hAUgFUmPJEH2XIIYmPemxBmdKV6+/iP7FcPfyR8LQCqSHgkgewwQugIVYGTtl7boHK7msiJKMd/celMICQZIhdIjAWRPAaJ9Wy7heibE0WbE7o2nKTfaxRikHM+EGJsie6nSBfaaLZxNst7Iob2xqSqimYpSTjaIkZw3DXbCzWs2ykFpVyBTISVMgLAnZ3UtXUoaJIDY79NOAKSbvXkHILaKsiAZBLhfDtmTL6zlwhUNv7Xh7rPQNKYJILd7kZI2rPCl1u4Au7flYWzu9/Uvg2FfSMjjgjhAnACSAKLkxG72dgQgn2z9UcLntugchZ7Mq/0+HAyff+r33vtBYvEVSo07IN9t3NFMJ1nvfki/CSAJIFv8kwcGwte/FOBQGuVhDLhU48KyJ1JJHtowv2+bKEK1jgSQBJAtvgi5y3ABy7aN4w+SWOUj0LMmQB6srkuCmE6yF+eba911I52Txo020qnXeZw5qWgHgB9IOA1IF5CvqYrZMJMA/c3vdyez4pszAeLl5vpmIB64eiybDRBM+KZ4gMQFEJ13DInvM04CiC+s7b97mA3/VMXh+RwAjQYI6cHS5KOyJbMJHL4JFjjFv+1a9knFKi6M/6ugzU2YkQvdGg0QDTGmbeg88PVgxQIHbgx1uoUa6S6bvss2CHUA+brSGw0QZIpuf4j5qH5SMMhUCMhasvPBBSixwNEdvHkCMr/MxFok67+SY7N2GiDZEKXHmrMCie1jf+B3zgChXun56OMupx7V1rUylO4kMYODY8bbffiebqs9ubh5qcQSPjp6HIr49RojpZIzQGjX6vxxmekz15ijP7wEAT/bkJVixqrAARKu26Jz4CLlVOt0Acgu1kkv7sSwENKW9NDlSDbxDBtAANQBgaYJcPw9j2mSckyk/lwbQgWQ4PD1gEVwSd59Bwi5h4EHEBtAONSEAD7LQzjaUo4Ie+Sma9U8/VL1hMw29xHju/hjrrD3YICUbAcFUm/tc108XihfOgOE8hxxZgTxJV4R9n4qsca5UGd7pwimD3r0nRH53fs2zLOQ0JLNnh0BguE5m3nEvNyg7JRx7NCQnGPrkZxj9+5GOg6geokHALUiMDJ8C1p5DQ4J4hBAFgwhzlXhF9hOq2otTvxLVwIX7acCYCoBLlfrHXr2pfysMLzXkuNJkJebz4fJ+LUaRz5TdPJ9B+RCd2cJUgBkDACbGUGCI1JdJh6rrS6fFZe9EGvuNv3W4SbfZp6mNlrJsfhYW2PS1P/y754AUYeYl3nZZbtA13YGe6T2FWxN69XUVTRmczH1XdbfC3cu5jhWp5tlfOrgBxAiBso3/KIswtqOY3iENZ5kLx7b9lW3dtT7mSYcbgv7t/0OQOaqs/KnSM4RsgdeANGk+WcRayEL4vpWZ4+Eeka45ujTTzcbbhvoNfdgLYAh+tSz6hs6EMk5fOgUpGLhx93+8ErhKdoJO2RJnF2zRzS5imt3sOUvLwU8AimPbTLzQ65WzZ9yegaRD7wkSA4Q6qlrhReGISeF6ttds0e62RAfTz1XrHUKIKbc9PPrL3/0tX0bru1MfGjD3ePQaATVECEAUZcSY/Ie+BGX/6uYl1D8s6V7LNy7GMhH1lEpcz4sY6HrHSCbDHpnLP0pOvEGiEbNApsE0LEWFKPfreC+RaK5U+o+JcYcQvt0DeoMHa+E7y/aMD/mVqk25x0GEEJkN9mIpTb2JtmChM8zIY5dn26WwDDaIejaiFXPzHn8CwnzrKzA2CCAaNSPxt8XbG4belK+gzi9Az9kMXRdZzZx+KDx0kPCFyHgvAXz89gSg1WC5GpWNlTdqrMkQ3PggdSUoIA2DLxuVFsJ5xEAY8zK0obZuGxQrJIlSIJgRzoj1vcVV932rcnziRUG3mSauMw9GCA6KQIgGn3r7ELIOrbVvNlHD/9Jk5wMVdGXBSCGuhyvYrrhqiJcE8alEkRgrZTJoOd419CEFfPPkQUgC1VLnawL/5ZULf6NM/Wo249diEo2rZ/r72wAMdw6B6Xh4VrsvvSj91rVN+N9HfeHDSCFLYIpbX5XLRRLLLeg87hpLtI6bppuTqby1xwJIppGk5D5sgLEpGoloz1kq8zfmh4RJdXKTMPNFuwAySWJNg2PGHNUVHJf6m5/YQLHLkY3lLGjUQCSuxdlC3NV/SOpW/G3sfAiompLBSLWLpw9PlV4RogCEJyaRa6q6QzEs6bFNPGQna+Xh4O3L6WUdDQr4/NTvlk3p6doALEECQghTj/1X7xuDsnqMdMihOSdMtfvcooJHMGbFRUgtiBB470Ns5MqY26CKVliB8XLQExaQF/2JXCw7Eh0gNiDBEAKyO7IzuvkClbvrVXSAvw0gYMFHNhJKQBZAcm5RZLpKyngLAHldo+tkxYsPkkGORs8SgQIzrnQm9GgVL2L3lzWFYAczaD1el8NeSw7LWVeT2S7psgmtRr4ypGRj6N1VZoEWV1BHgqBnhfCDaxYLSYUGEFLjCb/enERjRoVd4ySYi5aj6TEvE8CQWH3fryhrxwrJrfV8JUA5FaafDsHkE+sZrrWSIwB5lMpxFSAvATRunLvo/ovhJQHc4ADIcURLEo4u0XYSrgWAs4+Zb2s+tXs5gwqA8iSnPkll2yhbaIqo7abVOdZFXuGeJ5p7VYvlQNkSc5C7cKyBVaVonZrG5xWk4DhRK6wxrUByJpEgfapn+oVRozafi3hWgp5fgfkWborKneXageQ5fIXHq9vTwEkVobdLLVQLpWqGG2RwGCEzgmuKlRVLKPpY9YWIKuELdzDRxLkkcBiOBIOHTxgzdgjCV9AABbaGc9hPi4r71MziFPdLBsBEBV5EDTf4f/yikpCtg6FsHSJVkfrtZGlhCsp5nnFqgSGmmyKYhqNBUh9SZpmtksUSADZpd1Ma2GnQAIIO0lTh7tEgQSQXdrNtBZ2CiSAsJM0dbhLFEgA2aXdTGthp0ACCDtJU4e7RIEEkF3azbQWdgokgLCTNHW4SxRIANml3UxrYadAAgg7SVOHu0SBBJBd2s20FnYK/D+Iz9AE7ypm3wAAAABJRU5ErkJggg=="

/***/ }),
/* 53 */
/*!*******************************************************!*\
  !*** D:/uniProject/funlist/static/assest/kuaidi1.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 54 */
/*!******************************************************!*\
  !*** D:/uniProject/funlist/static/assest/music1.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */
/*!***************************************************!*\
  !*** D:/uniProject/funlist/static/assest/hot.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map