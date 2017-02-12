/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var shadow_1 = __webpack_require__(5);
var api = __webpack_require__(1);
var log_1 = __webpack_require__(2);
var title, url, path, origin, startTime, endTime, duration = 0;
var sh;
window.addEventListener('load', function () {
    api.getData(null).then(function (val) {
        log_1.debug(val);
        // api.clear()
    });
    getPageInfo();
    sh = new shadow_1.shadow();
});
/**
 * 当页面可视性发生改变时会触发的事件
 */
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        sh.pause();
    }
    else {
        sh.start();
    }
});
// window.addEventListener("mousemove", stop)
window.addEventListener("beforeunload", stop);
function stop() {
    duration = sh.stop();
    endTime = new Date();
    api.saveRecord(title, origin, path, startTime, endTime, duration);
}
function getPageInfo() {
    title = window.document.title;
    url = window.location;
    origin = url.hostname;
    path = url.pathname;
    startTime = new Date();
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * www.baidu.com:{
 *  info: {
 *    title: '百度一下,你就知道'
 *  },
 *  timeTrack: [
 *    {path:'/path', title: 'contentTitle', startTime: 2017/2/1 19:55, endTime: 2017/2/1 18:00}
 *  ]
 * }
 */
var util_1 = __webpack_require__(6);
var log_1 = __webpack_require__(2);
var data = chrome.storage.local;
function saveRecord(title, origin, path, startTime, endTime, duration) {
    var today = util_1.formatDate(startTime);
    getData(today).then(function (val) {
        // debugger
        if (val == null) {
            log_1.debug(today + " is empty, set new");
            val = new Object();
        }
        var time = {
            duration: duration,
            startTime: startTime,
            endTime: endTime,
            path: path,
            title: title
        };
        var originData = val[today][origin];
        // 如果没有数据
        if (originData === undefined) {
            var website = {
                info: {
                    title: '',
                    duration: 0
                },
                timeTrack: []
            };
            path === '/' ? website.info.title = title : website.info.title = origin;
            originData = website;
        }
        else {
        }
        originData.info.duration += duration;
        originData.timeTrack.push(time);
        var temp = new Object();
        temp[today] = val;
        temp[today][origin] = originData;
        data.set(temp);
    });
}
exports.saveRecord = saveRecord;
/**
 *
 * @export
 * @param {any} key 要读的内容
 * @returns
 */
function getData(key) {
    return new Promise(function (resolve, reject) {
        data.get(key, function (item) {
            var length = Object.getOwnPropertyNames(item).length;
            if (length === 0) {
                log_1.debug(key + " is empty resolve 0");
                resolve(null);
            }
            else {
                resolve(item);
            }
        });
    });
}
exports.getData = getData;
function clear() {
    data.clear();
    log_1.debug("all data clear");
}
exports.clear = clear;
function remove(origin) {
    data.remove(origin);
}
exports.remove = remove;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var config_1 = __webpack_require__(3);
function debug(val) {
    if (config_1.DEBUG)
        console.log(val);
}
exports.debug = debug;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEBUG", function() { return DEBUG; });
let DEBUG = true

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var log_1 = __webpack_require__(2);
/**
 * 跟踪时间使用
 *
 * @class shadow
 */
var shadow = (function () {
    function shadow() {
        this.duration = 0;
        this.haveStop = true;
        this.start();
    }
    /**
     * 开始计时器,
     * 如果调用start后再次直接调用,不要重设计时器
     * @memberOf shadow
     */
    shadow.prototype.start = function () {
        log_1.debug("shadow start");
        if (this.haveStop) {
            this.startTime = new Date();
            this.haveStop = false;
        }
    };
    shadow.prototype.pause = function () {
        if (this.startTime === undefined) {
            throw new Error('please call start first');
        }
        this.haveStop = true;
        var currentDate = new Date();
        this.duration = this.duration + this.subtract(this.startTime, currentDate);
        // 防止多次记时
        this.startTime = currentDate;
        log_1.debug("shadow pause duration:" + this.duration);
    };
    shadow.prototype.stop = function () {
        this.pause();
        return this.duration;
    };
    /**
     * 返回经过的分钟
     * @private
     * @param {Date} pre
     * @param {Date} cur
     * @returns {number} minutes
     *
     * @memberOf shadow
     */
    shadow.prototype.subtract = function (pre, cur) {
        // TODO: month would be 30 31 28 or 29
        var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var monthDay;
        var month = pre.getMonth();
        if (month - 1 === 2 && this.isLeapYear(pre)) {
            monthDay = 29;
        }
        else {
            monthDay = months[month];
        }
        return (((cur.getFullYear() - pre.getFullYear()) * 12 +
            (cur.getMonth() - pre.getMonth())) * monthDay +
            (cur.getHours() - pre.getHours())) * 60 +
            (cur.getMinutes() - pre.getMinutes());
    };
    shadow.prototype.isLeapYear = function (val) {
        var year = val.getFullYear();
        if (year % 400 === 0 || (year % 4 === 0 && year % 100 != 0)) {
            return true;
        }
        else {
            return false;
        }
    };
    return shadow;
}());
exports.shadow = shadow;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function formatDate(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
exports.formatDate = formatDate;


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map