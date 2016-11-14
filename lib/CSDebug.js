(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CSDebug", [], factory);
	else if(typeof exports === 'object')
		exports["CSDebug"] = factory();
	else
		root["CSDebug"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _CSLogger = __webpack_require__(5);
	
	var _CSLogger2 = _interopRequireDefault(_CSLogger);
	
	var _Utils = __webpack_require__(7);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var root = void 0;
	if (typeof window === "undefined") {
	    if (typeof global !== "undefined") {
	        root = global;
	    } else {
	        root = {};
	    }
	} else {
	    root = window;
	}
	/**
	 * Default log function
	 */
	function log(e) {
	    return e || null;
	}
	/**
	 * Console polyfill
	 */
	(function (global) {
	    if (typeof global !== "undefined") {
	        if (!global.console) {
	            global.console = {};
	        }
	        var con = global.console;
	        var prop = void 0;
	        var method = void 0;
	        var dummy = function dummy() {
	            return null;
	        };
	        var properties = ["memory"];
	        var methods = ("assert,clear,count,debug,dir,dirxml,error,exception,group," + "groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd," + "show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn").split(",");
	        do {
	            prop = properties.pop();
	            if (prop) {
	                if (!con[prop]) {
	                    con[prop] = {};
	                }
	            }
	        } while (prop);
	        do {
	            method = methods.pop();
	            if (method) {
	                if (typeof con[method] !== "function") {
	                    con[method] = dummy;
	                }
	            }
	        } while (prop);
	    }
	})(typeof root === "undefined" ? undefined : root);
	/**
	 * Push this into console methods
	 */
	var that = void 0;
	
	var CSLogger = (0, _CSLogger2.default)({});
	
	/**
	 * Debug class
	 */
	var CSDebug = function () {
	    /**
	     * Clone object safely
	     * @param obj
	     * @param deep
	     * @return {{}}
	     */
	    CSDebug.cloneObjectSafely = function cloneObjectSafely(obj, deep) {
	        var newObj = {};
	        if (deep < 2) {
	            for (var i in obj) {
	                if (obj.hasOwnProperty(i)) {
	                    if (_typeof(obj[i]) === "object") {
	                        newObj[i] = CSDebug.cloneObjectSafely(obj[i], deep + 1);
	                    } else {
	                        newObj[i] = obj[i];
	                    }
	                }
	            }
	        }
	        return newObj;
	    };
	    /**
	     * Debug constructor
	     * @param localUse
	     */
	
	
	    function CSDebug(localUse) {
	        _classCallCheck(this, CSDebug);
	
	        that = this;
	        /**
	         * Debug console dom element
	         */
	        this.debugConsole = null;
	        this.initDebugConsole();
	        /**
	         * Usage flag
	         */
	        this.use = localUse || false;
	        this.arrLog = [];
	        if (typeof root !== "undefined") {
	            /**
	             * Save default window console methods
	             */
	            this.console = {
	                debug: root.console.debug || root.console.log || log(),
	                error: root.console.error || root.console.log || log(),
	                info: root.console.info || root.console.log || log(),
	                log: root.console.log || root.console.log || log(),
	                warn: root.console.warn || root.console.log || log()
	            };
	            /**
	             * Override window console methods
	             */
	            if (this.use && root.console) {
	                root.console.error = this._error;
	                root.console.warn = this._warn;
	                root.console.info = this._info;
	                root.console.log = this._log;
	                root.console.debug = this._debug;
	            }
	        }
	        _Utils2.default.implementationStaticMethods(this, "CSDebug");
	    }
	    /**
	     * Init debug console dom element
	     */
	
	
	    CSDebug.prototype.initDebugConsole = function initDebugConsole() {
	        /**
	         * If body exist
	         */
	        if (typeof window !== "undefined" && typeof window.document !== "undefined" && _typeof(window.document.body) !== "object") {
	            /**
	             * Get debug console element
	             */
	            that.debugConsole = window.document.getElementById("debug-console");
	            /**
	             * If debug console element doesn't exist, than create it
	             */
	            if (!that.debugConsole) {
	                that.debugConsole = window.document.createElement("div");
	                that.debugConsole.id = "debug-console";
	                that.debugConsole.style.width = "0px";
	                that.debugConsole.style.height = "0px";
	                that.debugConsole.style.left = "-10px";
	                that.debugConsole.style.top = "-10px";
	                that.debugConsole.style.backgroundColor = "#ff0000";
	                that.debugConsole.style.color = "#ffffff";
	                that.debugConsole.style.zIndex = "1000";
	                that.debugConsole.style.position = "absolute";
	                that.debugConsole.style.overflow = "hidden";
	                that.debugConsole.style.opacity = "0";
	                /**
	                 * Append debug console element on the page
	                 */
	                window.document.body.appendChild(that.debugConsole);
	            }
	            /**
	             * Set empty JSON array into debug console element
	             */
	            that.debugConsole.innerHTML = "[]";
	        }
	    };
	    /**
	     * Debug error method
	     * @param strMessage
	     * @param AdditionalMessage
	     */
	
	
	    CSDebug.prototype.error = function error(strMessage) {
	        /**
	         * Write debug message in error mode
	         */
	        that.write("error", strMessage);
	        /**
	         * Processing additional parameters
	         */
	
	        for (var _len = arguments.length, AdditionalMessage = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            AdditionalMessage[_key - 1] = arguments[_key];
	        }
	
	        if (AdditionalMessage.length > 0) {
	            for (var i = 0; i < AdditionalMessage.length; i++) {
	                that.error(AdditionalMessage[i]);
	            }
	        }
	    };
	    /**
	     * Debug warn method
	     * @param strMessage
	     * @param AdditionalMessage
	     */
	
	
	    CSDebug.prototype.warn = function warn(strMessage) {
	        /**
	         * Write debug message in warn mode
	         */
	        that.write("warn", strMessage);
	        /**
	         * Processing additional parameters
	         */
	
	        for (var _len2 = arguments.length, AdditionalMessage = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            AdditionalMessage[_key2 - 1] = arguments[_key2];
	        }
	
	        if (AdditionalMessage.length > 0) {
	            for (var i = 0; i < AdditionalMessage.length; i++) {
	                that.warn(AdditionalMessage[i]);
	            }
	        }
	    };
	    /**
	     * Debug info method
	     * @param strMessage
	     * @param AdditionalMessage
	     */
	
	
	    CSDebug.prototype.info = function info(strMessage) {
	        /**
	         * Write debug message in info mode
	         */
	        that.write("info", strMessage);
	        /**
	         * Processing additional parameters
	         */
	
	        for (var _len3 = arguments.length, AdditionalMessage = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	            AdditionalMessage[_key3 - 1] = arguments[_key3];
	        }
	
	        if (AdditionalMessage.length > 0) {
	            for (var i = 0; i < AdditionalMessage.length; i++) {
	                that.info(AdditionalMessage[i]);
	            }
	        }
	    };
	    /**
	     * Debug log method
	     * @param strMessage
	     * @param AdditionalMessage
	     */
	
	
	    CSDebug.prototype.log = function log(strMessage) {
	        /**
	         * Write debug message in log mode
	         */
	        that.write("log", strMessage);
	        /**
	         * Processing additional parameters
	         */
	
	        for (var _len4 = arguments.length, AdditionalMessage = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	            AdditionalMessage[_key4 - 1] = arguments[_key4];
	        }
	
	        if (AdditionalMessage.length > 0) {
	            for (var i = 0; i < AdditionalMessage.length; i++) {
	                that.log(AdditionalMessage[i]);
	            }
	        }
	    };
	    /**
	     * Debug debug method
	     * @param strMessage
	     * @param AdditionalMessage
	     */
	
	
	    CSDebug.prototype.debug = function debug(strMessage) {
	        /**
	         * Write debug message in debug mode
	         */
	        that.write("debug", strMessage);
	        /**
	         * Processing additional parameters
	         */
	
	        for (var _len5 = arguments.length, AdditionalMessage = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	            AdditionalMessage[_key5 - 1] = arguments[_key5];
	        }
	
	        if (AdditionalMessage.length > 0) {
	            for (var i = 0; i < AdditionalMessage.length; i++) {
	                that.debug(AdditionalMessage[i]);
	            }
	        }
	    };
	    /**
	     * Get records from log by filters
	     * @param strMode
	     * @param strMessage
	     * @param strStackMethod
	     * @param strStackFile
	     * @return {Array}
	     */
	
	
	    CSDebug.prototype.getLogRects = function getLogRects(strMode, strMessage, strStackMethod, strStackFile) {
	        /**
	         * Result log stack
	         */
	        var arrResultLog = [];
	        /**
	         * Loop all log records
	         */
	        for (var _iterator = that.arrLog, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	
	            var _log2 = _ref;
	
	            /**
	             * If mode or message filter set and it is not matched, than skip that row
	             */
	            if (typeof strMode === "string" && strMode && _log2.mode !== strMode || typeof strMessage === "string" && strMessage && typeof _log2.message === "string" && _log2.message.indexOf(strMessage) === -1) {
	                continue;
	            }
	            /**
	             * If method or file filter added
	             */
	            if (typeof strStackMethod === "string" && strStackMethod || typeof strStackFile === "string" && strStackFile) {
	                /**
	                 * If rom has not stack, than skip it
	                 */
	                if (!_log2.stack) {
	                    continue;
	                } else {
	                    /**
	                     * If method and file doesn't math to the filter, than skip it
	                     */
	                    var isContinue = false;
	                    for (var _iterator2 = _log2.stack, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                        var _ref2;
	
	                        if (_isArray2) {
	                            if (_i2 >= _iterator2.length) break;
	                            _ref2 = _iterator2[_i2++];
	                        } else {
	                            _i2 = _iterator2.next();
	                            if (_i2.done) break;
	                            _ref2 = _i2.value;
	                        }
	
	                        var stack = _ref2;
	
	                        if (typeof strStackMethod === "string" && strStackMethod && typeof stack.method === "string" && stack.method.indexOf(strStackMethod) === -1 || typeof strStackFile === "string" && strStackFile && typeof stack.file === "string" && stack.file.indexOf(strStackFile) === -1) {
	                            isContinue = true;
	                            break;
	                        }
	                    }
	                    /**
	                     * Skip filter if row doesn't math
	                     */
	                    if (isContinue) {
	                        continue;
	                    }
	                }
	            }
	            /**
	             * If row match all filters, than added it into the result log stack
	             */
	            arrResultLog.push(_log2);
	        }
	        /**
	         * Return result log stack
	         */
	        return arrResultLog;
	    };
	    /**
	     * Get log record by ID
	     * @param ID
	     * @return {{
	     *  mode: string,
	     *  message: string,
	     *  stack: Array<{method: string, file: string, line: string, column: string}>}
	     * }
	     */
	
	
	    CSDebug.prototype.getLogRectByID = function getLogRectByID(ID) {
	        return that.arrLog[ID];
	    };
	    /**
	     * Clean debug log
	     */
	
	
	    CSDebug.prototype.clearLog = function clearLog() {
	        that.arrLog = [];
	    };
	    /**
	     * Write message into the log stack and console
	     * @param mode
	     * @param strMessage
	     */
	
	
	    CSDebug.prototype.write = function write(mode, strMessage) {
	        if (mode && strMessage) {
	            if ((typeof strMessage === "undefined" ? "undefined" : _typeof(strMessage)) === "object") {
	                strMessage = CSDebug.cloneObjectSafely(strMessage, 0);
	            }
	            /**
	             * Create log object with mode, message and call stack parameters
	             */
	            var obj = {};
	            obj.mode = mode;
	            obj.message = strMessage;
	            obj.stack = _Utils2.default.stack();
	            /**
	             * Add log object into the log stack
	             */
	            that.arrLog.push(obj);
	            /**
	             * If Debug if enabled
	             */
	            if (that.use) {
	                /**
	                 * If debug console dom element exist, than write into it
	                 */
	                if (that.debugConsole) {
	                    that.debugConsole.innerHTML = JSON.stringify(that.arrLog);
	                } else {
	                    /**
	                     * If debug console dom element doesn't exist, try to create and write into it;
	                     */
	                    that.initDebugConsole();
	                    if (that.debugConsole) {
	                        that.debugConsole.innerHTML = JSON.stringify(that.arrLog);
	                    }
	                }
	                try {
	                    /**
	                     * Try to call default window console method or log method if it doesn't exist
	                     */
	                    if (typeof root !== "undefined" && typeof root.console !== "undefined" && typeof that !== "undefined" && typeof that.console !== "undefined") {
	                        if (typeof that.console[mode] === "function") {
	                            that.console[mode].apply(root.console, [obj]);
	                        } else if (typeof that.console.log === "function") {
	                            that.console.log.apply(root.console, [obj]);
	                        }
	                    }
	                } catch (e) {
	                    log(e);
	                }
	            }
	        }
	    };
	    /**
	     * Implementation of the console window error method
	     * @param strMessage
	     * @param AdditionalMessage
	     * @public
	     */
	
	
	    CSDebug.prototype._error = function _error(strMessage) {
	        for (var _len6 = arguments.length, AdditionalMessage = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	            AdditionalMessage[_key6 - 1] = arguments[_key6];
	        }
	
	        if (that) {
	            /**
	             * If use Debug, then call error method, or call default error console method
	             */
	            CSLogger.log(500, strMessage);
	            if (that.use) {
	                /**
	                 * Call Debug error method
	                 */
	                that.error(strMessage);
	                /**
	                 * Processing additional parameters
	                 */
	                if (AdditionalMessage.length > 0) {
	                    for (var i = 0; i < AdditionalMessage.length; i++) {
	                        that._error(AdditionalMessage[i]);
	                    }
	                }
	            } else {
	                try {
	                    /**
	                     * Call console error method, if it is not supported call log method
	                     */
	                    if (typeof root !== "undefined" && typeof root.console !== "undefined" && typeof that !== "undefined" && typeof that.console !== "undefined") {
	                        if (typeof that.console.error === "function") {
	                            that.console.error.apply(root.console, arguments);
	                        } else if (typeof that.console.log === "function") {
	                            that.console.log.apply(root.console, arguments);
	                        }
	                    }
	                } catch (e) {
	                    log(e);
	                }
	            }
	        }
	    };
	    /**
	     * Implementation of the console window warn method
	     * @param strMessage
	     * @param AdditionalMessage
	     * @public
	     */
	
	
	    CSDebug.prototype._warn = function _warn(strMessage) {
	        for (var _len7 = arguments.length, AdditionalMessage = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
	            AdditionalMessage[_key7 - 1] = arguments[_key7];
	        }
	
	        if (that) {
	            /**
	             * If use Debug, then call error method, or call default warn console method
	             */
	            CSLogger.log(400, strMessage);
	            if (that.use) {
	                /**
	                 * Call Debug warn method
	                 */
	                that.warn(strMessage);
	                /**
	                 * Processing additional parameters
	                 */
	                if (AdditionalMessage.length > 0) {
	                    for (var i = 0; i < AdditionalMessage.length; i++) {
	                        that._warn(AdditionalMessage[i]);
	                    }
	                }
	            } else {
	                try {
	                    /**
	                     * Call console warn method, if it is not supported call log method
	                     */
	                    if (typeof root !== "undefined" && typeof root.console !== "undefined" && typeof that !== "undefined" && typeof that.console !== "undefined") {
	                        if (typeof that.console.warn === "function") {
	                            that.console.warn.apply(root.console, arguments);
	                        } else if (typeof that.console.log === "function") {
	                            that.console.log.apply(root.console, arguments);
	                        }
	                    }
	                } catch (e) {
	                    log(e);
	                }
	            }
	        }
	    };
	    /**
	     * Implementation of the console window info method
	     * @param strMessage
	     * @param AdditionalMessage
	     * @public
	     */
	
	
	    CSDebug.prototype._info = function _info(strMessage) {
	        for (var _len8 = arguments.length, AdditionalMessage = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
	            AdditionalMessage[_key8 - 1] = arguments[_key8];
	        }
	
	        if (that) {
	            /**
	             * If use Debug, then call error method, or call default info console method
	             */
	            CSLogger.log(300, strMessage);
	            if (that.use) {
	                /**
	                 * Call Debug info method
	                 */
	                that.info(strMessage);
	                /**
	                 * Processing additional parameters
	                 */
	                if (AdditionalMessage.length > 0) {
	                    for (var i = 0; i < AdditionalMessage.length; i++) {
	                        that._info(AdditionalMessage[i]);
	                    }
	                }
	            } else {
	                try {
	                    /**
	                     * Call console info method, if it is not supported call log method
	                     */
	                    if (typeof root !== "undefined" && typeof root.console !== "undefined" && typeof that !== "undefined" && typeof that.console !== "undefined") {
	                        if (typeof that.console.info === "function") {
	                            that.console.info.apply(root.console, arguments);
	                        } else if (typeof that.console.log === "function") {
	                            that.console.log.apply(root.console, arguments);
	                        }
	                    }
	                } catch (e) {
	                    log(e);
	                }
	            }
	        }
	    };
	    /**
	     * Implementation of the console window log method
	     * @param strMessage
	     * @param AdditionalMessage
	     * @public
	     */
	
	
	    CSDebug.prototype._log = function _log(strMessage) {
	        for (var _len9 = arguments.length, AdditionalMessage = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	            AdditionalMessage[_key9 - 1] = arguments[_key9];
	        }
	
	        if (that) {
	            /**
	             * If use Debug, then call error method, or call default log console method
	             */
	            CSLogger.log(200, strMessage);
	            if (that.use) {
	                /**
	                 * Call Debug log method
	                 */
	                that.log(strMessage);
	                /**
	                 * Processing additional parameters
	                 */
	                if (AdditionalMessage.length > 0) {
	                    for (var i = 0; i < AdditionalMessage.length; i++) {
	                        that._log(AdditionalMessage[i]);
	                    }
	                }
	            } else {
	                try {
	                    /**
	                     * Call console log method
	                     */
	                    if (typeof root !== "undefined" && typeof root.console !== "undefined" && typeof that !== "undefined" && typeof that.console !== "undefined") {
	                        if (typeof that.console.log === "function") {
	                            that.console.log.apply(root.console, arguments);
	                        }
	                    }
	                } catch (e) {
	                    log(e);
	                }
	            }
	        }
	    };
	    /**
	     * Implementation of the console window debug method
	     * @param strMessage
	     * @param AdditionalMessage
	     * @public
	     */
	
	
	    CSDebug.prototype._debug = function _debug(strMessage) {
	        for (var _len10 = arguments.length, AdditionalMessage = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
	            AdditionalMessage[_key10 - 1] = arguments[_key10];
	        }
	
	        if (that) {
	            /**
	             * If use Debug, then call error method, or call default debug console method
	             */
	            CSLogger.log(100, strMessage);
	            if (that.use) {
	                /**
	                 * Call Debug debug method
	                 */
	                that.debug(strMessage);
	                /**
	                 * Processing additional parameters
	                 */
	                if (AdditionalMessage.length > 0) {
	                    for (var i = 0; i < AdditionalMessage.length; i++) {
	                        that._debug(AdditionalMessage[i]);
	                    }
	                }
	            } else {
	                try {
	                    /**
	                     * Call console debug method, if it is not supported call log method
	                     */
	                    if (typeof root !== "undefined" && typeof root.console !== "undefined" && typeof that !== "undefined" && typeof that.console !== "undefined") {
	                        if (typeof that.console.debug === "function") {
	                            that.console.debug.apply(root.console, arguments);
	                        } else if (typeof that.console.log === "function") {
	                            that.console.log.apply(root.console, arguments);
	                        }
	                    }
	                } catch (e) {
	                    log(e);
	                }
	            }
	        }
	    };
	
	    return CSDebug;
	}();
	
	exports.default = CSDebug;
	
	module.exports = CSDebug;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _AnimationFrame = __webpack_require__(6);
	
	var _AnimationFrame2 = _interopRequireDefault(_AnimationFrame);
	
	var _Utils = __webpack_require__(7);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MD5 = __webpack_require__(19);
	/**
	 * Import Animation frame
	 */
	
	var root = void 0;
	if (typeof window === "undefined") {
	    if (typeof global !== "undefined") {
	        root = global;
	    } else {
	        root = {};
	    }
	} else {
	    root = window;
	}
	var STATUSES = {
	    600: "Some uncaught error",
	    503: "Attempt reattach the scripts to the non-object",
	    502: "Block doesn't exist",
	    501: "Banner place doesn't exist",
	    500: "Some caught error",
	    401: "Deprecated call",
	    400: "Some warning",
	    300: "Some info",
	    200: "Some log",
	    101: "Entry point",
	    100: "Some debug",
	    0: "Something"
	};
	
	var CSLogger = function () {
	    function CSLogger() {
	        _classCallCheck(this, CSLogger);
	    }
	
	    CSLogger.init = function init(settings) {
	        if ((typeof settings === "undefined" ? "undefined" : _typeof(settings)) === "object") {
	            for (var prop in settings) {
	                if (settings.hasOwnProperty(prop)) {
	                    CSLogger.settings[prop] = settings[prop];
	                }
	            }
	        }
	        return CSLogger;
	    };
	    /**
	     * Log method
	     * @param status
	     * @param message
	     * @param properties
	     */
	
	
	    CSLogger.log = function log(status, message, properties) {
	        status = status || 101;
	        message = message || STATUSES[status] || "";
	        properties = properties || {};
	        if (status >= CSLogger.settings.minLoggerLevel) {
	            var logObj = {
	                date: new Date(),
	                location: location.href,
	                projectName: CSLogger.settings.projectName,
	                projectVersion: CSLogger.settings.projectVersion,
	                stack: _Utils2.default.stack(),
	                user: _Utils2.default.User.getInfo(),
	                message: message,
	                properties: properties,
	                status: status
	            };
	            CSLogger.arrLog.push(logObj);
	        }
	    };
	
	    CSLogger.showMessange = function showMessange() {
	        var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	        var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	
	        var messangeLavel = "debug";
	        if (status >= 200 && status < 300) {
	            messangeLavel = "log";
	        } else if (status >= 300 && status < 400) {
	            messangeLavel = "info";
	        } else if (status >= 400 && status < 500) {
	            messangeLavel = "warn";
	        } else if (status >= 500) {
	            messangeLavel = "error";
	        }
	        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && _typeof(window.Debug) === "object" && _typeof(window.Debug.console) === "object" && typeof window.Debug.console[messangeLavel] === "function") {
	            window.Debug.console[messangeLavel](message);
	        } else if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && _typeof(window.CSDebug) === "object" && _typeof(window.CSDebug.console) === "object" && typeof window.CSDebug.console[messangeLavel] === "function") {
	            window.CSDebug.console[messangeLavel](message);
	        } else if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object" && typeof console[messangeLavel] === "function") {
	            console[messangeLavel](message);
	        }
	    };
	    /**
	     * Log send watcher
	     */
	
	
	    CSLogger.watch = function watch() {
	        if (CSLogger.arrLog.length > 0 && CSLogger.arrLog.length < 100) {
	            for (var _iterator = CSLogger.arrLog, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                var _ref;
	
	                if (_isArray) {
	                    if (_i >= _iterator.length) break;
	                    _ref = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) break;
	                    _ref = _i.value;
	                }
	
	                var l = _ref;
	
	                var data = encodeURIComponent(JSON.stringify(l));
	                var uid = MD5(JSON.stringify({
	                    message: l.message,
	                    projectName: l.projectName,
	                    projectVersion: l.projectVersion,
	                    status: l.status
	                })).toString();
	                if (CSLogger.arrSended.indexOf(uid) === -1) {
	                    CSLogger.arrSended.push(uid);
	                    if (false) {
	                        var i = new Image();
	                        i.src = CSLogger.settings.loggerUrl + "?uid=" + uid + "&data=" + data;
	                    } else {
	                        CSLogger.showMessange(l.status, l);
	                    }
	                }
	            }
	            CSLogger.arrLog = [];
	        }
	    };
	
	    return CSLogger;
	}();
	
	CSLogger.eventListenerAdded = false;
	CSLogger.arrLog = [];
	CSLogger.arrSended = [];
	CSLogger.projectName = "CSDebug";
	CSLogger.projectVersion = "1.0.18";
	CSLogger.settings = {
	    loggerUrl: "",
	    minLoggerLevel: 500,
	    projectName: "",
	    projectVersion: ""
	};
	/**
	 * Add logger to global error event
	 */
	if (!root.eventListenerAdded) {
	    (function () {
	        var errorHandler = root.onerror;
	        root.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
	            if (typeof errorHandler === "function") {
	                errorHandler(errorMsg, url, lineNumber, column, errorObj);
	            }
	            CSLogger.log(600, errorMsg, {
	                column: column,
	                errorObj: errorObj,
	                lineNumber: lineNumber,
	                url: url
	            });
	        };
	        root.eventListenerAdded = true;
	    })();
	}
	/**
	 * Subscribe logger to watcher
	 */
	_AnimationFrame2.default.subscribe({}, CSLogger.watch, []);
	/**
	 * Return logger
	 */
	var _Init = CSLogger.init;
	exports.default = _Init;
	
	module.exports = _Init;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var root = void 0;
	if (typeof window === "undefined") {
	    if (typeof global !== "undefined") {
	        root = global;
	    } else {
	        root = {};
	    }
	} else {
	    root = window;
	}
	/**
	 * requestAnimationFrame polyfill
	 */
	root.requestAnimationFrame = function () {
	    return typeof root !== "undefined" && (root.requestAnimationFrame || root.webkitRequestAnimationFrame || root.mozRequestAnimationFrame || root.oRequestAnimationFrame || root.msRequestAnimationFrame) || function (callback) {
	        root.setTimeout(callback, 1000 / 60);
	    };
	}();
	/**
	 * Bind polyfill
	 */
	function bind(b) {
	    /**
	     * If try bind variable that not a function, then throw error
	     */
	    if (typeof this !== "function") {
	        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	    }
	    /**
	     * let Array slice function
	     */
	    var a = Array.prototype.slice;
	    var f = a.call(arguments, 1);
	    var e = this;
	    function c() {
	        /*
	         if (
	         typeof root !== "undefined" &&
	         typeof root.console === "object" &&
	         typeof root.console.log === "function"
	         ) {
	         root.console.log("Bind polyfill");
	         }
	         */
	    }
	    function d() {
	        return e.apply(this instanceof c ? this : b || root, f.concat(a.call(arguments)));
	    }
	    /**
	     * Registered this prototype as prototype to bind implementation functions
	     */
	    c.prototype = this.prototype;
	    d.prototype = new c();
	    /**
	     * Return bind polyfill
	     */
	    return d;
	}
	Function.prototype.bind = Function.prototype.bind || bind;
	/**
	 * Object.keys polyfill
	 */
	function keys() {
	    var hasDoNotEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
	    var doNotEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
	    var doNotEnumsLength = doNotEnums.length;
	    return function (obj) {
	        if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object" && (typeof obj !== "function" || obj === null)) {
	            throw new TypeError("Object.keys called on non-object");
	        }
	        var result = [];
	        for (var prop in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	                result.push(prop);
	            }
	        }
	        if (hasDoNotEnumBug) {
	            for (var i = 0; i < doNotEnumsLength; i++) {
	                if (Object.prototype.hasOwnProperty.call(obj, doNotEnums[i])) {
	                    result.push(doNotEnums[i]);
	                }
	            }
	        }
	        return result;
	    };
	}
	Object.keys = Object.keys || keys();
	/**
	 * Request animation frame call stack class
	 */
	
	var AnimationFrame = function () {
	    /**
	     * Create request animation frame
	     */
	    function AnimationFrame() {
	        _classCallCheck(this, AnimationFrame);
	
	        /**
	         * Subscribed methods
	         */
	        this.stack = {};
	        /**
	         * Start requestAnimationFrame watcher
	         */
	        this.watch();
	    }
	    /**
	     * Subscribe method to watch
	     * @param context
	     * @param callback
	     * @param params
	     * @param ID
	     * @return {boolean|string}
	     */
	
	
	    AnimationFrame.prototype.subscribe = function subscribe() {
	        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : root;
	        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
	            return null;
	        };
	        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	        var ID = arguments[3];
	
	        try {
	            /**
	             * If context and callback passed and they are object and function
	             */
	            if ((typeof context === "undefined" ? "undefined" : _typeof(context)) === "object" && typeof callback === "function") {
	                /**
	                 * Create UID
	                 */
	                var d = new Date();
	                var localID = ID || "x-" + d.getTime() + "-" + Math.round(Math.random() * 1e6);
	                /**
	                 * Add method to the stack
	                 */
	                this.stack[localID] = {
	                    context: context,
	                    callback: callback,
	                    params: params
	                };
	                /**
	                 * Write to console count of the subscribed methods
	                 */
	                /*
	                 if (
	                 typeof root !== "undefined" &&
	                 typeof root.console === "object" &&
	                 typeof root.console.info === "function"
	                 ) {
	                 root.console.info("AnimationFrame stack " + Object.keys(this.stack).length);
	                 }
	                 */
	                /**
	                 * Return UID
	                 */
	                return localID;
	            }
	        } catch (e) {}
	        /**
	         * If something goes wrong return false
	         */
	        return false;
	    };
	    /**
	     * Unsubscribe method by ID
	     * @param ID
	     */
	
	
	    AnimationFrame.prototype.unsubscribe = function unsubscribe(ID) {
	        /**
	         * If required method exist in the stack
	         */
	        if (this.stack[ID]) {
	            /**
	             * Nullify method in the stack and destroy it
	             */
	            this.stack[ID] = false;
	            delete this.stack[ID];
	        }
	    };
	    /**
	     * Watch and call methods
	     */
	
	
	    AnimationFrame.prototype.watch = function watch() {
	        try {
	            /**
	             * If stack exist, it is an object and it is contains methods
	             */
	            if (this.stack && _typeof(this.stack) === "object" && Object.keys(this.stack).length > 0) {
	                /**
	                 * Loop all methods in stack
	                 */
	                for (var ID in this.stack) {
	                    /**
	                     * Process only methods without extended properties
	                     */
	                    if (this.stack.hasOwnProperty(ID)) {
	                        try {
	                            /**
	                             * If ID exist and it is a string
	                             */
	                            if (ID && typeof ID === "string") {
	                                /**
	                                 * Get subscribed method params by ID
	                                 */
	                                var objCall = this.stack[ID];
	                                /**
	                                 * If params exist, it is an object, and it is contains call context,
	                                 * callback, and parameters which is array
	                                 */
	                                if (objCall && (typeof objCall === "undefined" ? "undefined" : _typeof(objCall)) === "object" && objCall.context && objCall.callback && objCall.params && _typeof(objCall.context) === "object" && typeof objCall.callback === "function" && Array.isArray(objCall.params)) {
	                                    /**
	                                     * Call subscribed method
	                                     */
	                                    objCall.callback.apply(objCall.context, objCall.params);
	                                }
	                            }
	                        } catch (e) {}
	                    }
	                }
	            }
	        } catch (e) {}
	        /**
	         * Recall watcher
	         */
	        root.requestAnimationFrame(this.watch.bind(this));
	    };
	
	    return AnimationFrame;
	}();
	/**
	 * Create single request animation frame object
	 * @type {AnimationFrame}
	 */
	
	
	root.AnimationFrame = root.AnimationFrame || new AnimationFrame();
	/**
	 * Export single AnimationFrame instance
	 */
	var _AnimationFrame = root.AnimationFrame;
	exports.default = _AnimationFrame;
	
	module.exports = _AnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import subclasses
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _UtilsAnimation = __webpack_require__(8);
	
	var _UtilsAnimation2 = _interopRequireDefault(_UtilsAnimation);
	
	var _UtilsBrowser = __webpack_require__(10);
	
	var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
	
	var _UtilsCookie = __webpack_require__(11);
	
	var _UtilsCookie2 = _interopRequireDefault(_UtilsCookie);
	
	var _UtilsDocument = __webpack_require__(12);
	
	var _UtilsDocument2 = _interopRequireDefault(_UtilsDocument);
	
	var _UtilsDOM = __webpack_require__(13);
	
	var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
	
	var _UtilsMouse = __webpack_require__(14);
	
	var _UtilsMouse2 = _interopRequireDefault(_UtilsMouse);
	
	var _UtilsScreen = __webpack_require__(16);
	
	var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
	
	var _UtilsSystem = __webpack_require__(17);
	
	var _UtilsSystem2 = _interopRequireDefault(_UtilsSystem);
	
	var _UtilsUser = __webpack_require__(18);
	
	var _UtilsUser2 = _interopRequireDefault(_UtilsUser);
	
	var _UtilsWindow = __webpack_require__(15);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Global Utils class
	 */
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    /**
	     * @deprecated Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.
	     */
	    Utils.getBoundingClientRect = function getBoundingClientRect(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object") {
	            if (typeof console.warn === "function") {
	                console.warn("Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.");
	            } else if (typeof console.log === "function") {
	                console.log("Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.");
	            }
	        }
	        return Utils.DOM.getBoundingClientRect(domNode, domDocument, showForce);
	    };
	
	    /**
	     * @deprecated Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.
	     */
	    Utils.findElementPosition = function findElementPosition(domNode) {
	        var showForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object") {
	            if (typeof console.warn === "function") {
	                console.warn("Utils.findElementPosition method was deprecated and soon will be removed. Please use" + " Utils.DOM.findElementPosition method.");
	            } else if (typeof console.log === "function") {
	                console.log("Utils.findElementPosition method was deprecated and soon will be removed. Please use" + " Utils.DOM.findElementPosition method.");
	            }
	        }
	        return Utils.DOM.findElementPosition(domNode, showForce);
	    };
	    /**
	     * Transfer static methods into the object
	     * @param realObject
	     * @param className
	     */
	
	
	    Utils.implementationStaticMethods = function implementationStaticMethods(realObject, className) {
	        var staticClass = realObject.constructor;
	        if (typeof staticClass !== "undefined") {
	            var methods = Object.keys(staticClass);
	            if (methods && methods.length > 0) {
	                var _loop = function _loop() {
	                    if (_isArray) {
	                        if (_i >= _iterator.length) return "break";
	                        _ref = _iterator[_i++];
	                    } else {
	                        _i = _iterator.next();
	                        if (_i.done) return "break";
	                        _ref = _i.value;
	                    }
	
	                    var method = _ref;
	
	                    if (typeof realObject[method] === "undefined") {
	                        realObject[method] = function () {
	                            if (typeof staticClass !== "undefined" && (typeof console === "undefined" ? "undefined" : _typeof(console)) === "object") {
	                                if (typeof console.warn === "function") {
	                                    console.warn("That method was deprecated and soon will be removed. Please use " + (className || staticClass && staticClass.name || "Unknown") + "." + method + " method.");
	                                } else if (typeof console.log === "function") {
	                                    console.log("That method was deprecated and soon will be removed. Please use " + (className || staticClass && staticClass.name || "Unknown") + "." + method + " method.");
	                                }
	                            }
	                            return staticClass[method].apply(staticClass, arguments);
	                        };
	                    }
	                };
	
	                for (var _iterator = methods, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                    var _ref;
	
	                    var _ret = _loop();
	
	                    if (_ret === "break") break;
	                }
	            }
	        }
	    };
	    /**
	     * Get call stack trace
	     * @return Array<Object>
	     */
	
	
	    Utils.stack = function stack() {
	        var e = new Error();
	        return e && e.stack && e.stack.split("\n").slice(5).map(function (s) {
	            if (!s) {
	                return {};
	            }
	            var match = /^(.*)@(.*)\.js:([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                if (match[1]) {
	                    match[1] = /([^\/<]+)/ig.exec(match[1]);
	                    if (match[1]) {
	                        match[1] = match[1][0];
	                    }
	                }
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^(.*)@(http|https):([^:]+):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[5] || "",
	                    file: match[3] || "",
	                    line: match[4] || "",
	                    method: match[1] + ":" + match[2] || ""
	                };
	            }
	            match = /^(.*)@(.*):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^\s+at\s([^(]+)\s\((.*):([0-9]+):([0-9]+)\)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^\s+at\s(.*):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[3] || "",
	                    file: match[1] || "",
	                    line: match[2] || "",
	                    method: ""
	                };
	            }
	            return s;
	        }) || [];
	    };
	    /**
	     * Get random ID
	     * @return {string}
	     */
	
	
	    Utils.getUID = function getUID() {
	        return Math.random().toString(36).substring(2);
	    };
	
	    return Utils;
	}();
	
	exports.default = Utils;
	
	Utils.Animation = _UtilsAnimation2.default;
	Utils.Browser = _UtilsBrowser2.default;
	Utils.Cookie = _UtilsCookie2.default;
	Utils.DOM = _UtilsDOM2.default;
	Utils.Document = _UtilsDocument2.default;
	Utils.Mouse = _UtilsMouse2.default;
	Utils.Screen = _UtilsScreen2.default;
	Utils.System = _UtilsSystem2.default;
	Utils.User = _UtilsUser2.default;
	Utils.Window = _UtilsWindow2.default;
	module.exports = Utils;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import subclasses
	 */
	
	exports.__esModule = true;
	
	var _UtilsAnimationEasing = __webpack_require__(9);
	
	var _UtilsAnimationEasing2 = _interopRequireDefault(_UtilsAnimationEasing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Animation = function Animation() {
	  _classCallCheck(this, Animation);
	};
	
	exports.default = Animation;
	
	Animation.Easing = _UtilsAnimationEasing2.default;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Different time animation functions
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Easing = function () {
	    function Easing() {
	        _classCallCheck(this, Easing);
	    }
	
	    Easing.swing = function swing(t, b, c, d) {
	        return Easing[Easing.def](t, b, c, d);
	    };
	
	    Easing.easeInQuad = function easeInQuad(t, b, c, d) {
	        return c * (t /= d) * t + b;
	    };
	
	    Easing.easeOutQuad = function easeOutQuad(t, b, c, d) {
	        return -c * (t /= d) * (t - 2) + b;
	    };
	
	    Easing.easeInOutQuad = function easeInOutQuad(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t + b;
	        }
	        return -c / 2 * (--t * (t - 2) - 1) + b;
	    };
	
	    Easing.easeInCubic = function easeInCubic(t, b, c, d) {
	        return c * (t /= d) * t * t + b;
	    };
	
	    Easing.easeOutCubic = function easeOutCubic(t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t + 1) + b;
	    };
	
	    Easing.easeInOutCubic = function easeInOutCubic(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t + b;
	        }
	        return c / 2 * ((t -= 2) * t * t + 2) + b;
	    };
	
	    Easing.easeInQuart = function easeInQuart(t, b, c, d) {
	        return c * (t /= d) * t * t * t + b;
	    };
	
	    Easing.easeOutQuart = function easeOutQuart(t, b, c, d) {
	        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	    };
	
	    Easing.easeInOutQuart = function easeInOutQuart(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t * t + b;
	        }
	        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	    };
	
	    Easing.easeInQuint = function easeInQuint(t, b, c, d) {
	        return c * (t /= d) * t * t * t * t + b;
	    };
	
	    Easing.easeOutQuint = function easeOutQuint(t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	    };
	
	    Easing.easeInOutQuint = function easeInOutQuint(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t * t * t + b;
	        }
	        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	    };
	
	    Easing.easeInSine = function easeInSine(t, b, c, d) {
	        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	    };
	
	    Easing.easeOutSine = function easeOutSine(t, b, c, d) {
	        return c * Math.sin(t / d * (Math.PI / 2)) + b;
	    };
	
	    Easing.easeInOutSine = function easeInOutSine(t, b, c, d) {
	        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	    };
	
	    Easing.easeInExpo = function easeInExpo(t, b, c, d) {
	        return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	    };
	
	    Easing.easeOutExpo = function easeOutExpo(t, b, c, d) {
	        return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	    };
	
	    Easing.easeInOutExpo = function easeInOutExpo(t, b, c, d) {
	        if (t === 0) {
	            return b;
	        }
	        if (t === d) {
	            return b + c;
	        }
	        if ((t /= d / 2) < 1) {
	            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	        }
	        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	    };
	
	    Easing.easeInCirc = function easeInCirc(t, b, c, d) {
	        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	    };
	
	    Easing.easeOutCirc = function easeOutCirc(t, b, c, d) {
	        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	    };
	
	    Easing.easeInOutCirc = function easeInOutCirc(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	        }
	        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	    };
	
	    Easing.easeInElastic = function easeInElastic(t, b, c, d) {
	        var s = 1.70158;
	        var p = 0;
	        var a = c;
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) === 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * .3;
	        }
	        if (a < Math.abs(c)) {
	            a = c;
	            s = p / 4;
	        } else {
	            s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    };
	
	    Easing.easeOutElastic = function easeOutElastic(t, b, c, d) {
	        var s = 1.70158;
	        var p = 0;
	        var a = c;
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) === 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * .3;
	        }
	        if (a < Math.abs(c)) {
	            a = c;
	            s = p / 4;
	        } else {
	            s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	    };
	
	    Easing.easeInOutElastic = function easeInOutElastic(t, b, c, d) {
	        var s = 1.70158;
	        var p = 0;
	        var a = c;
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d / 2) === 2) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * (.3 * 1.5);
	        }
	        if (a < Math.abs(c)) {
	            a = c;
	            s = p / 4;
	        } else {
	            s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        if (t < 1) {
	            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        }
	        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	    };
	
	    Easing.easeInBack = function easeInBack(t, b, c, d, s) {
	        if (s === undefined) {
	            s = 1.70158;
	        }
	        return c * (t /= d) * t * ((s + 1) * t - s) + b;
	    };
	
	    Easing.easeOutBack = function easeOutBack(t, b, c, d, s) {
	        if (s === undefined) {
	            s = 1.70158;
	        }
	        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	    };
	
	    Easing.easeInOutBack = function easeInOutBack(t, b, c, d, s) {
	        if (s === undefined) {
	            s = 1.70158;
	        }
	        if ((t /= d / 2) < 1) {
	            return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	        }
	        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	    };
	
	    Easing.easeInBounce = function easeInBounce(t, b, c, d) {
	        return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
	    };
	
	    Easing.easeOutBounce = function easeOutBounce(t, b, c, d) {
	        if ((t /= d) < 1 / 2.75) {
	            return c * (7.5625 * t * t) + b;
	        } else if (t < 2 / 2.75) {
	            return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
	        } else if (t < 2.5 / 2.75) {
	            return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
	        } else {
	            return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
	        }
	    };
	
	    Easing.easeInOutBounce = function easeInOutBounce(t, b, c, d) {
	        if (t < d / 2) {
	            return Easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
	        }
	        return Easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	    };
	
	    return Easing;
	}();
	
	exports.default = Easing;
	
	Easing.def = "easeOutQuad";

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with browser
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Browser = function () {
	    function Browser() {
	        _classCallCheck(this, Browser);
	    }
	
	    /**
	     * Get browser info
	     * @return {{browser: string, mobile: boolean, version: string}}
	     */
	    Browser.getInfo = function getInfo() {
	        return {
	            browser: Browser.getName(),
	            mobile: Browser.isMobile(),
	            version: Browser.getVersion()
	        };
	    };
	    /**
	     * Get browser name
	     * @return {string}
	     */
	
	
	    Browser.getName = function getName() {
	        var browser = void 0;
	        if (Browser.isOpera()) {
	            browser = "Opera";
	        } else if (Browser.isOperaNew()) {
	            browser = "Opera";
	        } else if (Browser.isMSIE()) {
	            browser = "Microsoft Internet Explorer";
	        } else if (Browser.isMSIENew()) {
	            browser = "Microsoft Internet Explorer";
	        } else if (Browser.isChrome()) {
	            browser = "Chrome";
	        } else if (Browser.isFirefox()) {
	            browser = "Firefox";
	        } else if (Browser.isSafari()) {
	            browser = "Safari";
	        } else if (Browser.isOther()) {
	            browser = Browser.getOtherName();
	        }
	        return browser;
	    };
	    /**
	     * Get browser version
	     * @return {string}
	     */
	
	
	    Browser.getVersion = function getVersion() {
	        var version = void 0;
	        if (Browser.isOpera()) {
	            version = Browser.getOperaVersion();
	        } else if (Browser.isOperaNew()) {
	            version = Browser.getOperaNewVersion();
	        } else if (Browser.isMSIE()) {
	            version = Browser.getMSIEVersion();
	        } else if (Browser.isMSIENew()) {
	            version = Browser.getMSIENewVersion();
	        } else if (Browser.isChrome()) {
	            version = Browser.getChromeVersion();
	        } else if (Browser.isFirefox()) {
	            version = Browser.getFirefoxVersion();
	        } else if (Browser.isSafari()) {
	            version = Browser.getSafariVersion();
	        } else if (Browser.isOther()) {
	            version = Browser.getOtherVersion();
	        }
	        return version;
	    };
	    /**
	     * Trim browser version
	     * @param version
	     * @return {string}
	     */
	
	
	    Browser.trimVersion = function trimVersion(version) {
	        var chars = [";", " ", ")"];
	        for (var _iterator = chars, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	
	            var char = _ref;
	
	            var ix = version.indexOf(char);
	            if (ix !== -1) {
	                version = version.substring(0, ix);
	            }
	        }
	        return version;
	    };
	    /**
	     * Check if it is mobile
	     * @return {boolean}
	     */
	
	
	    Browser.isMobile = function isMobile() {
	        return (/Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)
	        );
	    };
	    /**
	     * Check if it is opera browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOpera = function isOpera() {
	        return navigator.userAgent.indexOf("Opera") !== -1;
	    };
	    /**
	     * Get opera browser version
	     * @return {string}
	     */
	
	
	    Browser.getOperaVersion = function getOperaVersion() {
	        var verOffset = navigator.userAgent.indexOf("Opera");
	        var version = navigator.userAgent.substring(verOffset + 6);
	        verOffset = navigator.userAgent.indexOf("Version");
	        if (verOffset !== -1) {
	            version = navigator.userAgent.substring(verOffset + 8);
	        }
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is opera new browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOperaNew = function isOperaNew() {
	        return navigator.userAgent.indexOf("OPR") !== -1;
	    };
	    /**
	     * Get opera new browser version
	     * @return {string}
	     */
	
	
	    Browser.getOperaNewVersion = function getOperaNewVersion() {
	        var verOffset = navigator.userAgent.indexOf("OPR");
	        var version = navigator.userAgent.substring(verOffset + 4);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is msie browser
	     * @return {boolean}
	     */
	
	
	    Browser.isMSIE = function isMSIE() {
	        return navigator.userAgent.indexOf("MSIE") !== -1;
	    };
	    /**
	     * Get msie browser version
	     * @return {string}
	     */
	
	
	    Browser.getMSIEVersion = function getMSIEVersion() {
	        var verOffset = navigator.userAgent.indexOf("MSIE");
	        var version = navigator.userAgent.substring(verOffset + 5);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is msie new browser
	     * @return {boolean}
	     */
	
	
	    Browser.isMSIENew = function isMSIENew() {
	        return navigator.userAgent.indexOf("Trident/") !== -1;
	    };
	    /**
	     * Get msie new browser version
	     * @return {string}
	     */
	
	
	    Browser.getMSIENewVersion = function getMSIENewVersion() {
	        var version = navigator.userAgent.substring(navigator.userAgent.indexOf("rv:") + 3);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is chrome browser
	     * @return {boolean}
	     */
	
	
	    Browser.isChrome = function isChrome() {
	        return navigator.userAgent.indexOf("Chrome") !== -1;
	    };
	    /**
	     * Get chrome browser version
	     * @return {string}
	     */
	
	
	    Browser.getChromeVersion = function getChromeVersion() {
	        var verOffset = navigator.userAgent.indexOf("Chrome");
	        var version = navigator.userAgent.substring(verOffset + 7);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is safari browser
	     * @return {boolean}
	     */
	
	
	    Browser.isSafari = function isSafari() {
	        return navigator.userAgent.indexOf("Safari") !== -1;
	    };
	    /**
	     * Get safari browser version
	     * @return {string}
	     */
	
	
	    Browser.getSafariVersion = function getSafariVersion() {
	        var verOffset = navigator.userAgent.indexOf("Safari");
	        var version = navigator.userAgent.substring(verOffset + 7);
	        verOffset = navigator.userAgent.indexOf("Version");
	        if (verOffset !== -1) {
	            version = navigator.userAgent.substring(verOffset + 8);
	        }
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is firefox browser
	     * @return {boolean}
	     */
	
	
	    Browser.isFirefox = function isFirefox() {
	        return navigator.userAgent.indexOf("Firefox") !== -1;
	    };
	    /**
	     * Get firefox browser version
	     * @return {string}
	     */
	
	
	    Browser.getFirefoxVersion = function getFirefoxVersion() {
	        var verOffset = navigator.userAgent.indexOf("Firefox");
	        var version = navigator.userAgent.substring(verOffset + 8);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is other browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOther = function isOther() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        return nameOffset < verOffset;
	    };
	    /**
	     * Get other browser name
	     * @return {string}
	     */
	
	
	    Browser.getOtherName = function getOtherName() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        var browser = navigator.userAgent.substring(nameOffset, verOffset);
	        if (browser.toLowerCase() === browser.toUpperCase()) {
	            browser = navigator.appName;
	        }
	        return browser;
	    };
	    /**
	     * Get other browser version
	     * @return {string}
	     */
	
	
	    Browser.getOtherVersion = function getOtherVersion() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        var version = navigator.userAgent.substring(verOffset + 1);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check browser support
	     * @return {boolean}
	     */
	
	
	    Browser.isSupported = function isSupported() {
	        return !Browser.isMSIE() || parseInt(Browser.getMSIEVersion(), 10) > 8;
	    };
	    /**
	     * Check if it is WebKit browser
	     * @return {boolean}
	     */
	
	
	    Browser.isWebKit = function isWebKit() {
	        return navigator.userAgent.indexOf("AppleWebKit/") !== -1;
	    };
	    /**
	     * Check if it is Gecko browser
	     * @return {boolean}
	     */
	
	
	    Browser.isGecko = function isGecko() {
	        return navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") === -1;
	    };
	    /**
	     * Check if it is Android browser
	     * @return {boolean}
	     */
	
	
	    Browser.isAndroid = function isAndroid() {
	        return navigator.userAgent.indexOf("Android") > -1;
	    };
	    /**
	     * Check if it is Linux browser
	     * @return {boolean}
	     */
	
	
	    Browser.isLinux = function isLinux() {
	        return navigator.userAgent.indexOf("Linux") > -1;
	    };
	    /**
	     * Check if it is iPad browser
	     * @return {boolean}
	     */
	
	
	    Browser.isTabletPC = function isTabletPC() {
	        return navigator.userAgent.indexOf("iPad") > -1;
	    };
	
	    return Browser;
	}();
	
	exports.default = Browser;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with cookie
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cookie = function () {
	  function Cookie() {
	    _classCallCheck(this, Cookie);
	  }
	
	  /**
	   * The method returns the flag whether supported this storage type or not
	   * @returns {boolean}
	   */
	  Cookie.isSupported = function isSupported() {
	    return (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && typeof document.cookie === "string";
	  };
	  /**
	   * The method sets the value and returns true if it has been set
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @param value {string}
	   * @param expires {number}
	   * @param path {string}
	   * @param domain {string}
	   * @param secure {boolean}
	   * @return {boolean}
	   */
	
	
	  Cookie.setItem = function setItem(checkSupport, key, value) {
	    var expires = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
	    var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/";
	    var domain = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : location.hostname;
	    var secure = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : location.protocol === "https:";
	
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        /**
	         * Save cookies for 30 days
	         * @type {Date}
	         */
	        var date = new Date();
	        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
	        var exp = date.toUTCString();
	        /**
	         * Encode value for store
	         * @type {string}
	         */
	        value = encodeURIComponent(value);
	        /**
	         * Writing value to the document cookie storage
	         * @type {string}
	         */
	        document.cookie = key + "=" + value + (exp ? "; expires=" + exp : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
	        /**
	         * If all ok return true
	         */
	        return Cookie.getItem(checkSupport, key) === value;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method reads the value and returns it or returns false if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {string|boolean}
	   */
	
	
	  Cookie.getItem = function getItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        /**
	         * Get the array from document cookie split by ;
	         * @type {string[]}
	         */
	        var arrCookie = document.cookie.split(";");
	        /**
	         * Iterate through the cookies
	         */
	        for (var _iterator = arrCookie, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	          var _ref;
	
	          if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	          }
	
	          var i = _ref;
	
	          /**
	           * Trim and split each cookie by = for key value pare
	           * @type {string[]}
	           */
	          var v = i.trim().split("=", 2);
	          /**
	           * If it is correct cookie key return the value
	           */
	          if (v[0] === key) {
	            /**
	             * If the value was found return the value
	             */
	            return decodeURIComponent(v[1]);
	          }
	        }
	        /**
	         * If the value was not found return false
	         */
	        return false;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method removes the value and return true if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {boolean}
	   */
	
	
	  Cookie.removeItem = function removeItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        /**
	         * Set empty overdue value by key
	         */
	        Cookie.setItem(checkSupport, key, "", -1);
	        /**
	         * If all ok return true
	         */
	        return Cookie.getItem(checkSupport, key) === false;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method returns the array of string of available keys
	   * @param checkSupport {boolean}
	   * @returns {string[]}
	   */
	
	
	  Cookie.getKeys = function getKeys(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        /**
	         * The array of available keys
	         * @type {Array}
	         */
	        var arrKeys = [];
	        /**
	         * Get the array from document cookie split by ;
	         * @type {string[]}
	         */
	        var arrCookie = document.cookie.split(";");
	        /**
	         * Iterate through the cookies
	         */
	        for (var _iterator2 = arrCookie, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	          var _ref2;
	
	          if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	          } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	          }
	
	          var i = _ref2;
	
	          /**
	           * Trim and split each cookie by = for key value pare
	           * @type {string[]}
	           */
	          var v = i.trim().split("=", 2);
	          /**
	           * Add key to the list
	           */
	          arrKeys.push(v[0]);
	        }
	        return arrKeys;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return [];
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return [];
	    }
	  };
	  /**
	   * The method cleans the storage and return true if it is empty
	   * @param checkSupport {boolean}
	   * @returns {boolean}
	   */
	
	
	  Cookie.clear = function clear(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        var arrKeys = Cookie.getKeys(checkSupport);
	        if (arrKeys) {
	          for (var _iterator3 = arrKeys, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	            var _ref3;
	
	            if (_isArray3) {
	              if (_i3 >= _iterator3.length) break;
	              _ref3 = _iterator3[_i3++];
	            } else {
	              _i3 = _iterator3.next();
	              if (_i3.done) break;
	              _ref3 = _i3.value;
	            }
	
	            var i = _ref3;
	
	            Cookie.removeItem(checkSupport, i);
	          }
	        }
	        /**
	         * If all ok return true
	         */
	        return Cookie.getKeys(checkSupport).length === 0;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return true;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	
	  return Cookie;
	}();
	
	exports.default = Cookie;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with document
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Document = function () {
	    function Document() {
	        _classCallCheck(this, Document);
	    }
	
	    /**
	     * Get document height
	     * @returns {number}
	     */
	    Document.getHeight = function getHeight() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return Math.max(objWindow.document.body.scrollHeight, objWindow.document.documentElement.scrollHeight, objWindow.document.body.offsetHeight, objWindow.document.documentElement.offsetHeight, objWindow.document.body.clientHeight, objWindow.document.documentElement.clientHeight);
	    };
	    /**
	     * Get document width
	     * @returns {number}
	     */
	
	
	    Document.getWidth = function getWidth() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return Math.max(objWindow.document.body.scrollWidth, objWindow.document.documentElement.scrollWidth, objWindow.document.body.offsetWidth, objWindow.document.documentElement.offsetWidth, objWindow.document.body.clientWidth, objWindow.document.documentElement.clientWidth);
	    };
	    /**
	     * Get document top scroll
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Document.getScrollTop = function getScrollTop() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return objWindow.pageYOffset || objWindow.document.documentElement && objWindow.document.documentElement.scrollTop || objWindow.document.body && objWindow.document.body.scrollTop;
	    };
	    /**
	     * Get document left scroll
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Document.getScrollLeft = function getScrollLeft() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return objWindow.pageXOffset || objWindow.document.documentElement && objWindow.document.documentElement.scrollLeft || objWindow.document.body && objWindow.document.body.scrollLeft;
	    };
	    /**
	     * Get document scrolls
	     * @param objWindow
	     * @return {{left: number, top: number}}
	     */
	
	
	    Document.getScroll = function getScroll() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return {
	            left: Document.getScrollLeft(objWindow),
	            top: Document.getScrollTop(objWindow)
	        };
	    };
	
	    return Document;
	}();
	
	exports.default = Document;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with DOM
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DOM = function () {
	    function DOM() {
	        _classCallCheck(this, DOM);
	    }
	
	    /**
	     * Get element sizes and position
	     * @param domNode
	     * @param domDocument
	     * @param showForce
	     * @return {{bottom: number, height: number, left: number, right: number, top: number, width: number}}
	     */
	    DOM.getBoundingClientRect = function getBoundingClientRect(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        if (typeof domNode === "string") {
	            domNode = domDocument.getElementById(domNode);
	        }
	        var styles = void 0;
	        if (showForce) {
	            styles = getComputedStyle(domNode);
	            if (styles && styles.display === "none") {
	                domNode.style.display = "block";
	            }
	        }
	        var objRet = {
	            bottom: 0,
	            height: 0,
	            left: 0,
	            right: 0,
	            top: 0,
	            width: 0
	        };
	        if (domNode) {
	            /**
	             * If default method is supported than use it
	             */
	            if (domNode.getBoundingClientRect) {
	                objRet = domNode.getBoundingClientRect();
	                /**
	                 * IE hack
	                 */
	                objRet = {
	                    bottom: objRet.bottom,
	                    height: objRet.height || domNode.clientHeight,
	                    left: objRet.left,
	                    right: objRet.right,
	                    top: objRet.top,
	                    width: objRet.width || domNode.clientWidth
	                };
	            } else {
	                /**
	                 * Write the element in a temporary variable
	                 */
	                var domElement = domNode;
	                /**
	                 * Calculated basic parameters of the element
	                 * @type {Object}
	                 */
	                var objCoordinates = {
	                    height: domElement.offsetHeight,
	                    width: domElement.offsetWidth,
	                    x: 0,
	                    y: 0
	                };
	                /**
	                 * Are passed on to all parents and take into account their offsets
	                 */
	                while (domElement) {
	                    objCoordinates.x += domElement.offsetLeft;
	                    objCoordinates.y += domElement.offsetTop;
	                    domElement = domElement.offsetParent;
	                }
	                /**
	                 *
	                 * @type {Object}
	                 */
	                objRet = {
	                    bottom: objCoordinates.y + objCoordinates.height,
	                    height: objCoordinates.height,
	                    left: objCoordinates.x,
	                    right: objCoordinates.x + objCoordinates.width,
	                    top: objCoordinates.y,
	                    width: objCoordinates.width
	                };
	            }
	        }
	        if (showForce && domNode) {
	            domNode.style.display = "";
	        }
	        /**
	         * Return size and position of the element
	         */
	        return objRet;
	    };
	
	    /**
	     * Find element position
	     * @param domNode
	     * @param showForce
	     * @return {{top: number, left: number}}
	     */
	    DOM.findElementPosition = function findElementPosition(domNode) {
	        var showForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        var left = 0;
	        var top = 0;
	        while (domNode) {
	            var styles = void 0;
	            if (showForce) {
	                styles = getComputedStyle(domNode);
	                if (styles && styles.display === "none") {
	                    domNode.style.display = "block";
	                }
	            }
	            left += domNode.offsetLeft;
	            top += domNode.offsetTop;
	            domNode = domNode.offsetParent;
	            if (showForce && domNode) {
	                domNode.style.display = "";
	            }
	        }
	        return {
	            top: top,
	            left: left
	        };
	    };
	    /**
	     * Add event listener
	     * @param obj
	     * @param name
	     * @param func
	     */
	
	
	    DOM.addEvent = function addEvent(obj, name, func) {
	        if (obj.addEventListener) {
	            obj.addEventListener(name, func, false);
	        } else if (obj.attachEvent) {
	            obj.attachEvent("on" + name, func);
	        }
	    };
	    /**
	     * Remove event listener
	     * @param obj
	     * @param name
	     * @param func
	     */
	
	
	    DOM.removeEvent = function removeEvent(obj, name, func) {
	        if (obj.removeEventListener) {
	            obj.removeEventListener(name, func, false);
	        } else if (obj.detachEvent) {
	            obj.detachEvent("on" + name, func);
	        }
	    };
	    /**
	     * Check if element has class name
	     * @param element
	     * @param className
	     * @return {boolean}
	     */
	
	
	    DOM.hasClassName = function hasClassName(element, className) {
	        return (" " + element.className + " ").indexOf(" " + className + " ") !== -1;
	    };
	    /**
	     * Add class name
	     * @param element
	     * @param className
	     * @return {HTMLElement}
	     */
	
	
	    DOM.addClassName = function addClassName(element, className) {
	        if (!DOM.hasClassName(element, className)) {
	            var cl = element.className;
	            element.className = cl ? cl + " " + className : className;
	        }
	        return element;
	    };
	    /**
	     * Remove class name
	     * @param element
	     * @param className
	     * @return {HTMLElement}
	     */
	
	
	    DOM.removeClassName = function removeClassName(element, className) {
	        var classes = element.className.split(" ");
	        for (var i = classes.length - 1; i >= 0; i--) {
	            if (classes[i] === className) {
	                classes.splice(i, 1);
	            }
	        }
	        element.className = classes.join(" ");
	        return element;
	    };
	    /**
	     * Toggle class name
	     * @param element
	     * @param className
	     * @param toggle
	     * @return {HTMLElement}
	     */
	
	
	    DOM.toggleClassName = function toggleClassName(element, className, toggle) {
	        if (toggle) {
	            DOM.addClassName(element, className);
	        } else {
	            DOM.removeClassName(element, className);
	        }
	        return element;
	    };
	    /**
	     * Replace class name
	     * @param element
	     * @param oldClassName
	     * @param newClassName
	     * @return {HTMLElement}
	     */
	
	
	    DOM.replaceClass = function replaceClass(element, oldClassName, newClassName) {
	        DOM.removeClassName(element, oldClassName);
	        DOM.addClassName(element, newClassName);
	        return element;
	    };
	    /**
	     * Get element by tag name and index
	     * @param tn
	     * @param context
	     * @param index
	     * @return {Node}
	     */
	
	
	    DOM.getElementByTagName = function getElementByTagName(tn, context, index) {
	        var cont = context || document;
	        var els = cont.getElementsByTagName(tn);
	        if (null == index || isNaN(index)) {
	            return undefined;
	        } else {
	            return els[index];
	        }
	    };
	    /**
	     * Get line height
	     * @return {number}
	     */
	
	
	    DOM.getLineHeight = function getLineHeight() {
	        var styles = getComputedStyle(document.body);
	        var lineHeight = styles.lineHeight;
	        var lineHeightDig = parseInt(lineHeight, 10);
	        var fontSize = styles.fontSize;
	        var fontSizeDig = parseInt(fontSize, 10);
	        if (isFinite(lineHeightDig)) {
	            return lineHeightDig;
	        } else {
	            return fontSizeDig;
	        }
	    };
	
	    return DOM;
	}();
	
	exports.default = DOM;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import additional classes
	 */
	
	exports.__esModule = true;
	
	var _UtilsDOM = __webpack_require__(13);
	
	var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
	
	var _UtilsWindow = __webpack_require__(15);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mouse = function () {
	    function Mouse() {
	        _classCallCheck(this, Mouse);
	    }
	
	    /**
	     * Normalise mouse delta
	     * @param e
	     * @return {any}
	     */
	    Mouse.getWheelDelta = function getWheelDelta(e) {
	        var delta = void 0;
	        var deltaX = void 0;
	        var deltaY = void 0;
	        // Old school scrollwheel delta
	        if ("detail" in e) {
	            deltaY = e.detail * -1;
	        }
	        if ("wheelDelta" in e) {
	            deltaY = e.wheelDelta;
	        }
	        if ("wheelDeltaY" in e) {
	            deltaY = e.wheelDeltaY;
	        }
	        if ("wheelDeltaX" in e) {
	            deltaX = e.wheelDeltaX * -1;
	        }
	        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	        if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
	            deltaX = deltaY * -1;
	            deltaY = 0;
	        }
	        // New school wheel delta (wheel event)
	        if ("deltaY" in e) {
	            deltaY = e.deltaY * -1;
	        }
	        if ("deltaX" in e) {
	            deltaX = e.deltaX;
	        }
	        // Need to convert lines and pages to pixels if we aren"t already in pixels
	        // There are three delta modes:
	        //   * deltaMode 0 is by pixels, nothing to do
	        //   * deltaMode 1 is by lines
	        //   * deltaMode 2 is by pages
	        if (e.deltaMode === 1) {
	            var lineHeight = _UtilsDOM2.default.getLineHeight();
	            deltaY = deltaY * lineHeight;
	            deltaX = deltaX * lineHeight;
	        } else if (e.deltaMode === 2) {
	            var windowhegiht = _UtilsWindow2.default.getHeight();
	            deltaY = deltaY * windowhegiht;
	            deltaX = deltaX * windowhegiht;
	        }
	        delta = deltaY === 0 ? deltaX : deltaY;
	        return delta;
	    };
	
	    return Mouse;
	}();
	
	exports.default = Mouse;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with window
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Window = function () {
	    function Window() {
	        _classCallCheck(this, Window);
	    }
	
	    /**
	     * Get window height
	     * @returns {number}
	     */
	    Window.getHeight = function getHeight() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	    };
	    /**
	     * Get window width
	     * @returns {number}
	     */
	
	
	    Window.getWidth = function getWidth() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    };
	    /**
	     * Get window sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Window.getSizes = function getSizes() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return {
	            height: Window.getHeight(objWindow),
	            width: Window.getWidth(objWindow)
	        };
	    };
	
	    return Window;
	}();
	
	exports.default = Window;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with screen
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Screen = function () {
	    function Screen() {
	        _classCallCheck(this, Screen);
	    }
	
	    /**
	     * Get screen info
	     * @return {{availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}}
	     */
	    Screen.getInfo = function getInfo() {
	        return {
	            availableSize: Screen.getAvailableSizes(),
	            colorDepth: Screen.getColorDepth(),
	            pixelRatio: Screen.getPixelRatio(),
	            size: Screen.getSizes()
	        };
	    };
	    /**
	     * Get screen height
	     * @returns {number}
	     */
	
	
	    Screen.getHeight = function getHeight() {
	        return screen.height;
	    };
	    /**
	     * Get screen width
	     * @returns {number}
	     */
	
	
	    Screen.getWidth = function getWidth() {
	        return screen.width;
	    };
	    /**
	     * Get screen sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Screen.getSizes = function getSizes() {
	        return {
	            height: Screen.getHeight(),
	            width: Screen.getWidth()
	        };
	    };
	    /**
	     * Get screen height
	     * @returns {number}
	     */
	
	
	    Screen.getAvailableHeight = function getAvailableHeight() {
	        return screen.availHeight;
	    };
	    /**
	     * Get screen width
	     * @returns {number}
	     */
	
	
	    Screen.getAvailableWidth = function getAvailableWidth() {
	        return screen.availWidth;
	    };
	    /**
	     * Get screen sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Screen.getAvailableSizes = function getAvailableSizes() {
	        return {
	            height: Screen.getAvailableHeight(),
	            width: Screen.getAvailableWidth()
	        };
	    };
	    /**
	     * Get screen pixel ratio
	     * @return {number}
	     */
	
	
	    Screen.getPixelRatio = function getPixelRatio() {
	        var ratio = 1;
	        if (typeof window.screen.systemXDPI !== "undefined" && typeof window.screen.logicalXDPI !== "undefined" && window.screen.systemXDPI > window.screen.logicalXDPI) {
	            ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
	        } else if (typeof window.devicePixelRatio !== "undefined") {
	            ratio = window.devicePixelRatio;
	        }
	        return ratio;
	    };
	    /**
	     * Get screen color depth
	     * @return {number}
	     */
	
	
	    Screen.getColorDepth = function getColorDepth() {
	        return screen.colorDepth;
	    };
	
	    return Screen;
	}();
	
	exports.default = Screen;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with system
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var System = function () {
	    function System() {
	        _classCallCheck(this, System);
	    }
	
	    /**
	     * Get system info
	     * @return {{name: string, version: string}}
	     */
	    System.getInfo = function getInfo() {
	        return {
	            name: System.getName(),
	            version: System.getVersion()
	        };
	    };
	    /**
	     * Get OS name
	     * @return {string}
	     */
	
	
	    System.getName = function getName() {
	        var os = "";
	        var clientStrings = [{
	            r: /(Windows 10.0|Windows NT 10.0)/,
	            s: "Windows 10"
	        }, {
	            r: /(Windows 8.1|Windows NT 6.3)/,
	            s: "Windows 8.1"
	        }, {
	            r: /(Windows 8|Windows NT 6.2)/,
	            s: "Windows 8"
	        }, {
	            r: /(Windows 7|Windows NT 6.1)/,
	            s: "Windows 7"
	        }, {
	            r: /Windows NT 6.0/,
	            s: "Windows Vista"
	        }, {
	            r: /Windows NT 5.2/,
	            s: "Windows Server 2003"
	        }, {
	            r: /(Windows NT 5.1|Windows XP)/,
	            s: "Windows XP"
	        }, {
	            r: /(Windows NT 5.0|Windows 2000)/,
	            s: "Windows 2000"
	        }, {
	            r: /(Win 9x 4.90|Windows ME)/,
	            s: "Windows ME"
	        }, {
	            r: /(Windows 98|Win98)/,
	            s: "Windows 98"
	        }, {
	            r: /(Windows 95|Win95|Windows_95)/,
	            s: "Windows 95"
	        }, {
	            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
	            s: "Windows NT 4.0"
	        }, {
	            r: /Windows CE/,
	            s: "Windows CE"
	        }, {
	            r: /Win16/,
	            s: "Windows 3.11"
	        }, {
	            r: /Android/,
	            s: "Android"
	        }, {
	            r: /OpenBSD/,
	            s: "Open BSD"
	        }, {
	            r: /SunOS/,
	            s: "Sun OS"
	        }, {
	            r: /(Linux|X11)/,
	            s: "Linux"
	        }, {
	            r: /(iPhone|iPad|iPod)/,
	            s: "iOS"
	        }, {
	            r: /Mac OS X/,
	            s: "Mac OS X"
	        }, {
	            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
	            s: "Mac OS"
	        }, {
	            r: /QNX/,
	            s: "QNX"
	        }, {
	            r: /UNIX/,
	            s: "UNIX"
	        }, {
	            r: /BeOS/,
	            s: "BeOS"
	        }, {
	            r: /OS\/2/,
	            s: "OS/2"
	        }, {
	            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
	            s: "Search Bot"
	        }];
	        for (var _iterator = clientStrings, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	
	            var cs = _ref;
	
	            if (cs.r.test(navigator.userAgent)) {
	                os = cs.s;
	                break;
	            }
	        }
	        return os;
	    };
	    /**
	     * Get OS version
	     * @return {string}
	     */
	
	
	    System.getVersion = function getVersion() {
	        var os = System.getName();
	        var osVersion = "";
	        if (/Windows/.test(os)) {
	            osVersion = /Windows (.*)/.exec(os)[1];
	            os = "Windows";
	        }
	        switch (os) {
	            case "Mac OS X":
	                osVersion = /Mac OS X (10[._\d]+)/.exec(navigator.userAgent)[1];
	                break;
	            case "Android":
	                osVersion = /Android ([._\d]+)/.exec(navigator.userAgent)[1];
	                break;
	            case "iOS":
	                var reg = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
	                osVersion = reg[1] + "." + reg[2] + "." + (reg[3] || 0);
	                break;
	            default:
	        }
	        return osVersion;
	    };
	
	    return System;
	}();
	
	exports.default = System;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Class for working with user
	 */
	
	exports.__esModule = true;
	
	var _UtilsBrowser = __webpack_require__(10);
	
	var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
	
	var _UtilsScreen = __webpack_require__(16);
	
	var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
	
	var _UtilsSystem = __webpack_require__(17);
	
	var _UtilsSystem2 = _interopRequireDefault(_UtilsSystem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var User = function () {
	    function User() {
	        _classCallCheck(this, User);
	    }
	
	    /**
	     * Get user info
	     * @return {{browser: {browser: string, mobile: boolean, version: string}, screen: {availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}, system: {name: string, version: string}}}
	     */
	    User.getInfo = function getInfo() {
	        return {
	            browser: _UtilsBrowser2.default.getInfo(),
	            screen: _UtilsScreen2.default.getInfo(),
	            system: _UtilsSystem2.default.getInfo()
	        };
	    };
	
	    return User;
	}();
	
	exports.default = User;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(20));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {
	
		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;
	
		    // Constants table
		    var T = [];
	
		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());
	
		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },
	
		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];
	
		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }
	
		            // Shortcuts
		            var H = this._hash.words;
	
		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];
	
		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
	
		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
	
		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
	
		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);
	
		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);
	
		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },
	
		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
	
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
	
		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	
		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );
	
		            data.sigBytes = (dataWords.length + 1) * 4;
	
		            // Hash final blocks
		            this._process();
	
		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;
	
		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];
	
		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }
	
		            // Return final computed hash
		            return hash;
		        },
	
		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();
	
		            return clone;
		        }
		    });
	
		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }
	
		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);
	
		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));
	
	
		return CryptoJS.MD5;
	
	}));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory();
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define([], factory);
		}
		else {
			// Global (browser)
			root.CryptoJS = factory();
		}
	}(this, function () {
	
		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined) {
		    /*
		     * Local polyfil of Object.create
		     */
		    var create = Object.create || (function () {
		        function F() {};
	
		        return function (obj) {
		            var subtype;
	
		            F.prototype = obj;
	
		            subtype = new F();
	
		            F.prototype = null;
	
		            return subtype;
		        };
		    }())
	
		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};
	
		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};
	
		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {
	
	
		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);
	
		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }
	
		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }
	
		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;
	
		                // Reference supertype
		                subtype.$super = this;
	
		                return subtype;
		            },
	
		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);
	
		                return instance;
		            },
	
		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },
	
		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }
	
		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },
	
		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());
	
		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];
	
		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },
	
		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },
	
		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;
	
		            // Clamp excess bits
		            this.clamp();
	
		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;
	
		            // Chainable
		            return this;
		        },
	
		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;
	
		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },
	
		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);
	
		            return clone;
		        },
	
		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];
	
		            var r = (function (m_w) {
		                var m_w = m_w;
		                var m_z = 0x3ade68b1;
		                var mask = 0xffffffff;
	
		                return function () {
		                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
		                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
		                    var result = ((m_z << 0x10) + m_w) & mask;
		                    result /= 0x100000000;
		                    result += 0.5;
		                    return result * (Math.random() > .5 ? 1 : -1);
		                }
		            });
	
		            for (var i = 0, rcache; i < nBytes; i += 4) {
		                var _r = r((rcache || Math.random()) * 0x100000000);
	
		                rcache = _r() * 0x3ade67b7;
		                words.push((_r() * 0x100000000) | 0);
		            }
	
		            return new WordArray.init(words, nBytes);
		        }
		    });
	
		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};
	
		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
	
		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }
	
		            return hexChars.join('');
		        },
	
		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;
	
		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }
	
		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };
	
		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
	
		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }
	
		            return latin1Chars.join('');
		        },
	
		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;
	
		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }
	
		            return new WordArray.init(words, latin1StrLength);
		        }
		    };
	
		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },
	
		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };
	
		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },
	
		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }
	
		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },
	
		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;
	
		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }
	
		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;
	
		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
	
		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }
	
		                // Remove processed words
		                var processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }
	
		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },
	
		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();
	
		            return clone;
		        },
	
		        _minBufferSize: 0
		    });
	
		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),
	
		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);
	
		            // Set initial values
		            this.reset();
		        },
	
		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);
	
		            // Perform concrete-hasher logic
		            this._doReset();
		        },
	
		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);
	
		            // Update the hash
		            this._process();
	
		            // Chainable
		            return this;
		        },
	
		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }
	
		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();
	
		            return hash;
		        },
	
		        blockSize: 512/32,
	
		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },
	
		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });
	
		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};
	
		    return C;
		}(Math));
	
	
		return CryptoJS;
	
	}));

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5NDUzODAwZGUxYWQzNGRlMzcwMT8wOThjKiIsIndlYnBhY2s6Ly8vLi9saWIvQ1NEZWJ1Zy50cyIsIndlYnBhY2s6Ly8vLi9+L0NTTG9nZ2VyL2xpYi9DU0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9+L0FuaW1hdGlvbkZyYW1lL2xpYi9BbmltYXRpb25GcmFtZS50cyIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbkVhc2luZy50cyIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0Jyb3dzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNDb29raWUudHMiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNEb2N1bWVudC50cyIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0RPTS50cyIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc01vdXNlLnRzIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzV2luZG93LnRzIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzU2NyZWVuLnRzIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzU3lzdGVtLnRzIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzVXNlci50cyIsIndlYnBhY2s6Ly8vLi9+L2NyeXB0by1qcy9tZDUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jcnlwdG8tanMvY29yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQSw0Qjs7Ozs7O0FDdlBBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0Esd0JBQXVCO0FBQ3ZCLG1KQUFrSjtBQUNsSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQSx5Q0FBd0MsUUFBUTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNB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QUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNULDJKQUEwSjtBQUMxSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQsMEI7Ozs7OztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVD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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQixpQkFBaUI7QUFDckM7QUFDQSxzQkFBcUIsVUFBVTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFdBQVU7O0FBRVY7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQW9CLE9BQU87QUFDM0I7QUFDQSxzQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQSxxQkFBb0IsT0FBTztBQUMzQjtBQUNBLHNCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOzs7QUFHRjs7QUFFQSxFQUFDLEciLCJmaWxlIjoiLi9saWIvQ1NEZWJ1Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQ1NEZWJ1Z1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJDU0RlYnVnXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkNTRGVidWdcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTQ1MzgwMGRlMWFkMzRkZTM3MDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX0NTTG9nZ2VyID0gcmVxdWlyZShcIkNTTG9nZ2VyXCIpO1xuXG52YXIgX0NTTG9nZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NTTG9nZ2VyKTtcblxudmFyIF9VdGlscyA9IHJlcXVpcmUoXCJVdGlsc1wiKTtcblxudmFyIF9VdGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlscyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciByb290ID0gdm9pZCAwO1xuaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByb290ID0gZ2xvYmFsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QgPSB7fTtcbiAgICB9XG59IGVsc2Uge1xuICAgIHJvb3QgPSB3aW5kb3c7XG59XG4vKipcbiAqIERlZmF1bHQgbG9nIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGxvZyhlKSB7XG4gICAgcmV0dXJuIGUgfHwgbnVsbDtcbn1cbi8qKlxuICogQ29uc29sZSBwb2x5ZmlsbFxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICghZ2xvYmFsLmNvbnNvbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5jb25zb2xlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbiA9IGdsb2JhbC5jb25zb2xlO1xuICAgICAgICB2YXIgcHJvcCA9IHZvaWQgMDtcbiAgICAgICAgdmFyIG1ldGhvZCA9IHZvaWQgMDtcbiAgICAgICAgdmFyIGR1bW15ID0gZnVuY3Rpb24gZHVtbXkoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBbXCJtZW1vcnlcIl07XG4gICAgICAgIHZhciBtZXRob2RzID0gKFwiYXNzZXJ0LGNsZWFyLGNvdW50LGRlYnVnLGRpcixkaXJ4bWwsZXJyb3IsZXhjZXB0aW9uLGdyb3VwLFwiICsgXCJncm91cENvbGxhcHNlZCxncm91cEVuZCxpbmZvLGxvZyxtYXJrVGltZWxpbmUscHJvZmlsZSxwcm9maWxlcyxwcm9maWxlRW5kLFwiICsgXCJzaG93LHRhYmxlLHRpbWUsdGltZUVuZCx0aW1lbGluZSx0aW1lbGluZUVuZCx0aW1lU3RhbXAsdHJhY2Usd2FyblwiKS5zcGxpdChcIixcIik7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHByb3AgPSBwcm9wZXJ0aWVzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKHByb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbltwcm9wXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25bcHJvcF0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHByb3ApO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBtZXRob2QgPSBtZXRob2RzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uW21ldGhvZF0gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBjb25bbWV0aG9kXSA9IGR1bW15O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAocHJvcCk7XG4gICAgfVxufSkodHlwZW9mIHJvb3QgPT09IFwidW5kZWZpbmVkXCIgPyB1bmRlZmluZWQgOiByb290KTtcbi8qKlxuICogUHVzaCB0aGlzIGludG8gY29uc29sZSBtZXRob2RzXG4gKi9cbnZhciB0aGF0ID0gdm9pZCAwO1xuXG52YXIgQ1NMb2dnZXIgPSAoMCwgX0NTTG9nZ2VyMi5kZWZhdWx0KSh7fSk7XG5cbi8qKlxuICogRGVidWcgY2xhc3NcbiAqL1xudmFyIENTRGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ2xvbmUgb2JqZWN0IHNhZmVseVxuICAgICAqIEBwYXJhbSBvYmpcbiAgICAgKiBAcGFyYW0gZGVlcFxuICAgICAqIEByZXR1cm4ge3t9fVxuICAgICAqL1xuICAgIENTRGVidWcuY2xvbmVPYmplY3RTYWZlbHkgPSBmdW5jdGlvbiBjbG9uZU9iamVjdFNhZmVseShvYmosIGRlZXApIHtcbiAgICAgICAgdmFyIG5ld09iaiA9IHt9O1xuICAgICAgICBpZiAoZGVlcCA8IDIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3R5cGVvZihvYmpbaV0pID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmpbaV0gPSBDU0RlYnVnLmNsb25lT2JqZWN0U2FmZWx5KG9ialtpXSwgZGVlcCArIDEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqW2ldID0gb2JqW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdPYmo7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWJ1ZyBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSBsb2NhbFVzZVxuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBDU0RlYnVnKGxvY2FsVXNlKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDU0RlYnVnKTtcblxuICAgICAgICB0aGF0ID0gdGhpcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlYnVnIGNvbnNvbGUgZG9tIGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGVidWdDb25zb2xlID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0RGVidWdDb25zb2xlKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2FnZSBmbGFnXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnVzZSA9IGxvY2FsVXNlIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmFyckxvZyA9IFtdO1xuICAgICAgICBpZiAodHlwZW9mIHJvb3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2F2ZSBkZWZhdWx0IHdpbmRvdyBjb25zb2xlIG1ldGhvZHNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jb25zb2xlID0ge1xuICAgICAgICAgICAgICAgIGRlYnVnOiByb290LmNvbnNvbGUuZGVidWcgfHwgcm9vdC5jb25zb2xlLmxvZyB8fCBsb2coKSxcbiAgICAgICAgICAgICAgICBlcnJvcjogcm9vdC5jb25zb2xlLmVycm9yIHx8IHJvb3QuY29uc29sZS5sb2cgfHwgbG9nKCksXG4gICAgICAgICAgICAgICAgaW5mbzogcm9vdC5jb25zb2xlLmluZm8gfHwgcm9vdC5jb25zb2xlLmxvZyB8fCBsb2coKSxcbiAgICAgICAgICAgICAgICBsb2c6IHJvb3QuY29uc29sZS5sb2cgfHwgcm9vdC5jb25zb2xlLmxvZyB8fCBsb2coKSxcbiAgICAgICAgICAgICAgICB3YXJuOiByb290LmNvbnNvbGUud2FybiB8fCByb290LmNvbnNvbGUubG9nIHx8IGxvZygpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBPdmVycmlkZSB3aW5kb3cgY29uc29sZSBtZXRob2RzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnVzZSAmJiByb290LmNvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICByb290LmNvbnNvbGUuZXJyb3IgPSB0aGlzLl9lcnJvcjtcbiAgICAgICAgICAgICAgICByb290LmNvbnNvbGUud2FybiA9IHRoaXMuX3dhcm47XG4gICAgICAgICAgICAgICAgcm9vdC5jb25zb2xlLmluZm8gPSB0aGlzLl9pbmZvO1xuICAgICAgICAgICAgICAgIHJvb3QuY29uc29sZS5sb2cgPSB0aGlzLl9sb2c7XG4gICAgICAgICAgICAgICAgcm9vdC5jb25zb2xlLmRlYnVnID0gdGhpcy5fZGVidWc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX1V0aWxzMi5kZWZhdWx0LmltcGxlbWVudGF0aW9uU3RhdGljTWV0aG9kcyh0aGlzLCBcIkNTRGVidWdcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXQgZGVidWcgY29uc29sZSBkb20gZWxlbWVudFxuICAgICAqL1xuXG5cbiAgICBDU0RlYnVnLnByb3RvdHlwZS5pbml0RGVidWdDb25zb2xlID0gZnVuY3Rpb24gaW5pdERlYnVnQ29uc29sZSgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGJvZHkgZXhpc3RcbiAgICAgICAgICovXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgX3R5cGVvZih3aW5kb3cuZG9jdW1lbnQuYm9keSkgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogR2V0IGRlYnVnIGNvbnNvbGUgZWxlbWVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGF0LmRlYnVnQ29uc29sZSA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlYnVnLWNvbnNvbGVcIik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIGRlYnVnIGNvbnNvbGUgZWxlbWVudCBkb2Vzbid0IGV4aXN0LCB0aGFuIGNyZWF0ZSBpdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoIXRoYXQuZGVidWdDb25zb2xlKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWJ1Z0NvbnNvbGUgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0aGF0LmRlYnVnQ29uc29sZS5pZCA9IFwiZGVidWctY29uc29sZVwiO1xuICAgICAgICAgICAgICAgIHRoYXQuZGVidWdDb25zb2xlLnN0eWxlLndpZHRoID0gXCIwcHhcIjtcbiAgICAgICAgICAgICAgICB0aGF0LmRlYnVnQ29uc29sZS5zdHlsZS5oZWlnaHQgPSBcIjBweFwiO1xuICAgICAgICAgICAgICAgIHRoYXQuZGVidWdDb25zb2xlLnN0eWxlLmxlZnQgPSBcIi0xMHB4XCI7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWJ1Z0NvbnNvbGUuc3R5bGUudG9wID0gXCItMTBweFwiO1xuICAgICAgICAgICAgICAgIHRoYXQuZGVidWdDb25zb2xlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmMDAwMFwiO1xuICAgICAgICAgICAgICAgIHRoYXQuZGVidWdDb25zb2xlLnN0eWxlLmNvbG9yID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWJ1Z0NvbnNvbGUuc3R5bGUuekluZGV4ID0gXCIxMDAwXCI7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWJ1Z0NvbnNvbGUuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWJ1Z0NvbnNvbGUuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgICAgIHRoYXQuZGVidWdDb25zb2xlLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBcHBlbmQgZGVidWcgY29uc29sZSBlbGVtZW50IG9uIHRoZSBwYWdlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhhdC5kZWJ1Z0NvbnNvbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTZXQgZW1wdHkgSlNPTiBhcnJheSBpbnRvIGRlYnVnIGNvbnNvbGUgZWxlbWVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGF0LmRlYnVnQ29uc29sZS5pbm5lckhUTUwgPSBcIltdXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERlYnVnIGVycm9yIG1ldGhvZFxuICAgICAqIEBwYXJhbSBzdHJNZXNzYWdlXG4gICAgICogQHBhcmFtIEFkZGl0aW9uYWxNZXNzYWdlXG4gICAgICovXG5cblxuICAgIENTRGVidWcucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gZXJyb3Ioc3RyTWVzc2FnZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogV3JpdGUgZGVidWcgbWVzc2FnZSBpbiBlcnJvciBtb2RlXG4gICAgICAgICAqL1xuICAgICAgICB0aGF0LndyaXRlKFwiZXJyb3JcIiwgc3RyTWVzc2FnZSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm9jZXNzaW5nIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAgICAgKi9cblxuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgQWRkaXRpb25hbE1lc3NhZ2UgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgICBBZGRpdGlvbmFsTWVzc2FnZVtfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQWRkaXRpb25hbE1lc3NhZ2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBBZGRpdGlvbmFsTWVzc2FnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoYXQuZXJyb3IoQWRkaXRpb25hbE1lc3NhZ2VbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWJ1ZyB3YXJuIG1ldGhvZFxuICAgICAqIEBwYXJhbSBzdHJNZXNzYWdlXG4gICAgICogQHBhcmFtIEFkZGl0aW9uYWxNZXNzYWdlXG4gICAgICovXG5cblxuICAgIENTRGVidWcucHJvdG90eXBlLndhcm4gPSBmdW5jdGlvbiB3YXJuKHN0ck1lc3NhZ2UpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyaXRlIGRlYnVnIG1lc3NhZ2UgaW4gd2FybiBtb2RlXG4gICAgICAgICAqL1xuICAgICAgICB0aGF0LndyaXRlKFwid2FyblwiLCBzdHJNZXNzYWdlKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb2Nlc3NpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgQWRkaXRpb25hbE1lc3NhZ2UgPSBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgICBBZGRpdGlvbmFsTWVzc2FnZVtfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBZGRpdGlvbmFsTWVzc2FnZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEFkZGl0aW9uYWxNZXNzYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhhdC53YXJuKEFkZGl0aW9uYWxNZXNzYWdlW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogRGVidWcgaW5mbyBtZXRob2RcbiAgICAgKiBAcGFyYW0gc3RyTWVzc2FnZVxuICAgICAqIEBwYXJhbSBBZGRpdGlvbmFsTWVzc2FnZVxuICAgICAqL1xuXG5cbiAgICBDU0RlYnVnLnByb3RvdHlwZS5pbmZvID0gZnVuY3Rpb24gaW5mbyhzdHJNZXNzYWdlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcml0ZSBkZWJ1ZyBtZXNzYWdlIGluIGluZm8gbW9kZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhhdC53cml0ZShcImluZm9cIiwgc3RyTWVzc2FnZSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm9jZXNzaW5nIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAgICAgKi9cblxuICAgICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIEFkZGl0aW9uYWxNZXNzYWdlID0gQXJyYXkoX2xlbjMgPiAxID8gX2xlbjMgLSAxIDogMCksIF9rZXkzID0gMTsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICAgICAgQWRkaXRpb25hbE1lc3NhZ2VbX2tleTMgLSAxXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQWRkaXRpb25hbE1lc3NhZ2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBBZGRpdGlvbmFsTWVzc2FnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoYXQuaW5mbyhBZGRpdGlvbmFsTWVzc2FnZVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERlYnVnIGxvZyBtZXRob2RcbiAgICAgKiBAcGFyYW0gc3RyTWVzc2FnZVxuICAgICAqIEBwYXJhbSBBZGRpdGlvbmFsTWVzc2FnZVxuICAgICAqL1xuXG5cbiAgICBDU0RlYnVnLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiBsb2coc3RyTWVzc2FnZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogV3JpdGUgZGVidWcgbWVzc2FnZSBpbiBsb2cgbW9kZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhhdC53cml0ZShcImxvZ1wiLCBzdHJNZXNzYWdlKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb2Nlc3NpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgQWRkaXRpb25hbE1lc3NhZ2UgPSBBcnJheShfbGVuNCA+IDEgPyBfbGVuNCAtIDEgOiAwKSwgX2tleTQgPSAxOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgICAgICBBZGRpdGlvbmFsTWVzc2FnZVtfa2V5NCAtIDFdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBZGRpdGlvbmFsTWVzc2FnZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEFkZGl0aW9uYWxNZXNzYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5sb2coQWRkaXRpb25hbE1lc3NhZ2VbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWJ1ZyBkZWJ1ZyBtZXRob2RcbiAgICAgKiBAcGFyYW0gc3RyTWVzc2FnZVxuICAgICAqIEBwYXJhbSBBZGRpdGlvbmFsTWVzc2FnZVxuICAgICAqL1xuXG5cbiAgICBDU0RlYnVnLnByb3RvdHlwZS5kZWJ1ZyA9IGZ1bmN0aW9uIGRlYnVnKHN0ck1lc3NhZ2UpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyaXRlIGRlYnVnIG1lc3NhZ2UgaW4gZGVidWcgbW9kZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhhdC53cml0ZShcImRlYnVnXCIsIHN0ck1lc3NhZ2UpO1xuICAgICAgICAvKipcbiAgICAgICAgICogUHJvY2Vzc2luZyBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgICAgICovXG5cbiAgICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBBZGRpdGlvbmFsTWVzc2FnZSA9IEFycmF5KF9sZW41ID4gMSA/IF9sZW41IC0gMSA6IDApLCBfa2V5NSA9IDE7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgICAgIEFkZGl0aW9uYWxNZXNzYWdlW19rZXk1IC0gMV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFkZGl0aW9uYWxNZXNzYWdlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQWRkaXRpb25hbE1lc3NhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRlYnVnKEFkZGl0aW9uYWxNZXNzYWdlW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHJlY29yZHMgZnJvbSBsb2cgYnkgZmlsdGVyc1xuICAgICAqIEBwYXJhbSBzdHJNb2RlXG4gICAgICogQHBhcmFtIHN0ck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0gc3RyU3RhY2tNZXRob2RcbiAgICAgKiBAcGFyYW0gc3RyU3RhY2tGaWxlXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG5cblxuICAgIENTRGVidWcucHJvdG90eXBlLmdldExvZ1JlY3RzID0gZnVuY3Rpb24gZ2V0TG9nUmVjdHMoc3RyTW9kZSwgc3RyTWVzc2FnZSwgc3RyU3RhY2tNZXRob2QsIHN0clN0YWNrRmlsZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVzdWx0IGxvZyBzdGFja1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGFyclJlc3VsdExvZyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogTG9vcCBhbGwgbG9nIHJlY29yZHNcbiAgICAgICAgICovXG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoYXQuYXJyTG9nLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmID0gX2l0ZXJhdG9yW19pKytdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9sb2cyID0gX3JlZjtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBtb2RlIG9yIG1lc3NhZ2UgZmlsdGVyIHNldCBhbmQgaXQgaXMgbm90IG1hdGNoZWQsIHRoYW4gc2tpcCB0aGF0IHJvd1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0ck1vZGUgPT09IFwic3RyaW5nXCIgJiYgc3RyTW9kZSAmJiBfbG9nMi5tb2RlICE9PSBzdHJNb2RlIHx8IHR5cGVvZiBzdHJNZXNzYWdlID09PSBcInN0cmluZ1wiICYmIHN0ck1lc3NhZ2UgJiYgdHlwZW9mIF9sb2cyLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIgJiYgX2xvZzIubWVzc2FnZS5pbmRleE9mKHN0ck1lc3NhZ2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBtZXRob2Qgb3IgZmlsZSBmaWx0ZXIgYWRkZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHJTdGFja01ldGhvZCA9PT0gXCJzdHJpbmdcIiAmJiBzdHJTdGFja01ldGhvZCB8fCB0eXBlb2Ygc3RyU3RhY2tGaWxlID09PSBcInN0cmluZ1wiICYmIHN0clN0YWNrRmlsZSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIHJvbSBoYXMgbm90IHN0YWNrLCB0aGFuIHNraXAgaXRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIV9sb2cyLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBtZXRob2QgYW5kIGZpbGUgZG9lc24ndCBtYXRoIHRvIHRoZSBmaWx0ZXIsIHRoYW4gc2tpcCBpdFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29udGludWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IF9sb2cyLnN0YWNrLCBfaXNBcnJheTIgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvcjIpLCBfaTIgPSAwLCBfaXRlcmF0b3IyID0gX2lzQXJyYXkyID8gX2l0ZXJhdG9yMiA6IF9pdGVyYXRvcjJbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmMjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5Mikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaTIgPj0gX2l0ZXJhdG9yMi5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYyID0gX2l0ZXJhdG9yMltfaTIrK107XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pMiA9IF9pdGVyYXRvcjIubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaTIuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZjIgPSBfaTIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFjayA9IF9yZWYyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0clN0YWNrTWV0aG9kID09PSBcInN0cmluZ1wiICYmIHN0clN0YWNrTWV0aG9kICYmIHR5cGVvZiBzdGFjay5tZXRob2QgPT09IFwic3RyaW5nXCIgJiYgc3RhY2subWV0aG9kLmluZGV4T2Yoc3RyU3RhY2tNZXRob2QpID09PSAtMSB8fCB0eXBlb2Ygc3RyU3RhY2tGaWxlID09PSBcInN0cmluZ1wiICYmIHN0clN0YWNrRmlsZSAmJiB0eXBlb2Ygc3RhY2suZmlsZSA9PT0gXCJzdHJpbmdcIiAmJiBzdGFjay5maWxlLmluZGV4T2Yoc3RyU3RhY2tGaWxlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogU2tpcCBmaWx0ZXIgaWYgcm93IGRvZXNuJ3QgbWF0aFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29udGludWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiByb3cgbWF0Y2ggYWxsIGZpbHRlcnMsIHRoYW4gYWRkZWQgaXQgaW50byB0aGUgcmVzdWx0IGxvZyBzdGFja1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBhcnJSZXN1bHRMb2cucHVzaChfbG9nMik7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiByZXN1bHQgbG9nIHN0YWNrXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gYXJyUmVzdWx0TG9nO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGxvZyByZWNvcmQgYnkgSURcbiAgICAgKiBAcGFyYW0gSURcbiAgICAgKiBAcmV0dXJuIHt7XG4gICAgICogIG1vZGU6IHN0cmluZyxcbiAgICAgKiAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAqICBzdGFjazogQXJyYXk8e21ldGhvZDogc3RyaW5nLCBmaWxlOiBzdHJpbmcsIGxpbmU6IHN0cmluZywgY29sdW1uOiBzdHJpbmd9Pn1cbiAgICAgKiB9XG4gICAgICovXG5cblxuICAgIENTRGVidWcucHJvdG90eXBlLmdldExvZ1JlY3RCeUlEID0gZnVuY3Rpb24gZ2V0TG9nUmVjdEJ5SUQoSUQpIHtcbiAgICAgICAgcmV0dXJuIHRoYXQuYXJyTG9nW0lEXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENsZWFuIGRlYnVnIGxvZ1xuICAgICAqL1xuXG5cbiAgICBDU0RlYnVnLnByb3RvdHlwZS5jbGVhckxvZyA9IGZ1bmN0aW9uIGNsZWFyTG9nKCkge1xuICAgICAgICB0aGF0LmFyckxvZyA9IFtdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogV3JpdGUgbWVzc2FnZSBpbnRvIHRoZSBsb2cgc3RhY2sgYW5kIGNvbnNvbGVcbiAgICAgKiBAcGFyYW0gbW9kZVxuICAgICAqIEBwYXJhbSBzdHJNZXNzYWdlXG4gICAgICovXG5cblxuICAgIENTRGVidWcucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUobW9kZSwgc3RyTWVzc2FnZSkge1xuICAgICAgICBpZiAobW9kZSAmJiBzdHJNZXNzYWdlKSB7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBzdHJNZXNzYWdlID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yoc3RyTWVzc2FnZSkpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgc3RyTWVzc2FnZSA9IENTRGVidWcuY2xvbmVPYmplY3RTYWZlbHkoc3RyTWVzc2FnZSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENyZWF0ZSBsb2cgb2JqZWN0IHdpdGggbW9kZSwgbWVzc2FnZSBhbmQgY2FsbCBzdGFjayBwYXJhbWV0ZXJzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgICAgIG9iai5tb2RlID0gbW9kZTtcbiAgICAgICAgICAgIG9iai5tZXNzYWdlID0gc3RyTWVzc2FnZTtcbiAgICAgICAgICAgIG9iai5zdGFjayA9IF9VdGlsczIuZGVmYXVsdC5zdGFjaygpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgbG9nIG9iamVjdCBpbnRvIHRoZSBsb2cgc3RhY2tcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhhdC5hcnJMb2cucHVzaChvYmopO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBEZWJ1ZyBpZiBlbmFibGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGF0LnVzZSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIGRlYnVnIGNvbnNvbGUgZG9tIGVsZW1lbnQgZXhpc3QsIHRoYW4gd3JpdGUgaW50byBpdFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICh0aGF0LmRlYnVnQ29uc29sZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmRlYnVnQ29uc29sZS5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeSh0aGF0LmFyckxvZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGRlYnVnIGNvbnNvbGUgZG9tIGVsZW1lbnQgZG9lc24ndCBleGlzdCwgdHJ5IHRvIGNyZWF0ZSBhbmQgd3JpdGUgaW50byBpdDtcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdERlYnVnQ29uc29sZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5kZWJ1Z0NvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGVidWdDb25zb2xlLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KHRoYXQuYXJyTG9nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVHJ5IHRvIGNhbGwgZGVmYXVsdCB3aW5kb3cgY29uc29sZSBtZXRob2Qgb3IgbG9nIG1ldGhvZCBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJvb3QgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHJvb3QuY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhhdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhhdC5jb25zb2xlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuY29uc29sZVttb2RlXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb25zb2xlW21vZGVdLmFwcGx5KHJvb3QuY29uc29sZSwgW29ial0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhhdC5jb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb25zb2xlLmxvZy5hcHBseShyb290LmNvbnNvbGUsIFtvYmpdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50YXRpb24gb2YgdGhlIGNvbnNvbGUgd2luZG93IGVycm9yIG1ldGhvZFxuICAgICAqIEBwYXJhbSBzdHJNZXNzYWdlXG4gICAgICogQHBhcmFtIEFkZGl0aW9uYWxNZXNzYWdlXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuXG5cbiAgICBDU0RlYnVnLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiBfZXJyb3Ioc3RyTWVzc2FnZSkge1xuICAgICAgICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIEFkZGl0aW9uYWxNZXNzYWdlID0gQXJyYXkoX2xlbjYgPiAxID8gX2xlbjYgLSAxIDogMCksIF9rZXk2ID0gMTsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgICAgICAgICAgQWRkaXRpb25hbE1lc3NhZ2VbX2tleTYgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhhdCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiB1c2UgRGVidWcsIHRoZW4gY2FsbCBlcnJvciBtZXRob2QsIG9yIGNhbGwgZGVmYXVsdCBlcnJvciBjb25zb2xlIG1ldGhvZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBDU0xvZ2dlci5sb2coNTAwLCBzdHJNZXNzYWdlKTtcbiAgICAgICAgICAgIGlmICh0aGF0LnVzZSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENhbGwgRGVidWcgZXJyb3IgbWV0aG9kXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhhdC5lcnJvcihzdHJNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBQcm9jZXNzaW5nIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmIChBZGRpdGlvbmFsTWVzc2FnZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQWRkaXRpb25hbE1lc3NhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2Vycm9yKEFkZGl0aW9uYWxNZXNzYWdlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIENhbGwgY29uc29sZSBlcnJvciBtZXRob2QsIGlmIGl0IGlzIG5vdCBzdXBwb3J0ZWQgY2FsbCBsb2cgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJvb3QgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHJvb3QuY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhhdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhhdC5jb25zb2xlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb25zb2xlLmVycm9yLmFwcGx5KHJvb3QuY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoYXQuY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY29uc29sZS5sb2cuYXBwbHkocm9vdC5jb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBsb2coZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgY29uc29sZSB3aW5kb3cgd2FybiBtZXRob2RcbiAgICAgKiBAcGFyYW0gc3RyTWVzc2FnZVxuICAgICAqIEBwYXJhbSBBZGRpdGlvbmFsTWVzc2FnZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cblxuXG4gICAgQ1NEZWJ1Zy5wcm90b3R5cGUuX3dhcm4gPSBmdW5jdGlvbiBfd2FybihzdHJNZXNzYWdlKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgQWRkaXRpb25hbE1lc3NhZ2UgPSBBcnJheShfbGVuNyA+IDEgPyBfbGVuNyAtIDEgOiAwKSwgX2tleTcgPSAxOyBfa2V5NyA8IF9sZW43OyBfa2V5NysrKSB7XG4gICAgICAgICAgICBBZGRpdGlvbmFsTWVzc2FnZVtfa2V5NyAtIDFdID0gYXJndW1lbnRzW19rZXk3XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0KSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHVzZSBEZWJ1ZywgdGhlbiBjYWxsIGVycm9yIG1ldGhvZCwgb3IgY2FsbCBkZWZhdWx0IHdhcm4gY29uc29sZSBtZXRob2RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgQ1NMb2dnZXIubG9nKDQwMCwgc3RyTWVzc2FnZSk7XG4gICAgICAgICAgICBpZiAodGhhdC51c2UpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDYWxsIERlYnVnIHdhcm4gbWV0aG9kXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhhdC53YXJuKHN0ck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFByb2Nlc3NpbmcgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKEFkZGl0aW9uYWxNZXNzYWdlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBBZGRpdGlvbmFsTWVzc2FnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fd2FybihBZGRpdGlvbmFsTWVzc2FnZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBDYWxsIGNvbnNvbGUgd2FybiBtZXRob2QsIGlmIGl0IGlzIG5vdCBzdXBwb3J0ZWQgY2FsbCBsb2cgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJvb3QgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHJvb3QuY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhhdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhhdC5jb25zb2xlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbnNvbGUud2Fybi5hcHBseShyb290LmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGF0LmNvbnNvbGUubG9nID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbnNvbGUubG9nLmFwcGx5KHJvb3QuY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50YXRpb24gb2YgdGhlIGNvbnNvbGUgd2luZG93IGluZm8gbWV0aG9kXG4gICAgICogQHBhcmFtIHN0ck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0gQWRkaXRpb25hbE1lc3NhZ2VcbiAgICAgKiBAcHVibGljXG4gICAgICovXG5cblxuICAgIENTRGVidWcucHJvdG90eXBlLl9pbmZvID0gZnVuY3Rpb24gX2luZm8oc3RyTWVzc2FnZSkge1xuICAgICAgICBmb3IgKHZhciBfbGVuOCA9IGFyZ3VtZW50cy5sZW5ndGgsIEFkZGl0aW9uYWxNZXNzYWdlID0gQXJyYXkoX2xlbjggPiAxID8gX2xlbjggLSAxIDogMCksIF9rZXk4ID0gMTsgX2tleTggPCBfbGVuODsgX2tleTgrKykge1xuICAgICAgICAgICAgQWRkaXRpb25hbE1lc3NhZ2VbX2tleTggLSAxXSA9IGFyZ3VtZW50c1tfa2V5OF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhhdCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiB1c2UgRGVidWcsIHRoZW4gY2FsbCBlcnJvciBtZXRob2QsIG9yIGNhbGwgZGVmYXVsdCBpbmZvIGNvbnNvbGUgbWV0aG9kXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIENTTG9nZ2VyLmxvZygzMDAsIHN0ck1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKHRoYXQudXNlKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQ2FsbCBEZWJ1ZyBpbmZvIG1ldGhvZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoYXQuaW5mbyhzdHJNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBQcm9jZXNzaW5nIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmIChBZGRpdGlvbmFsTWVzc2FnZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQWRkaXRpb25hbE1lc3NhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2luZm8oQWRkaXRpb25hbE1lc3NhZ2VbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQ2FsbCBjb25zb2xlIGluZm8gbWV0aG9kLCBpZiBpdCBpcyBub3Qgc3VwcG9ydGVkIGNhbGwgbG9nIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiByb290LmNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoYXQgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoYXQuY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LmNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb25zb2xlLmluZm8uYXBwbHkocm9vdC5jb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhhdC5jb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb25zb2xlLmxvZy5hcHBseShyb290LmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBjb25zb2xlIHdpbmRvdyBsb2cgbWV0aG9kXG4gICAgICogQHBhcmFtIHN0ck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0gQWRkaXRpb25hbE1lc3NhZ2VcbiAgICAgKiBAcHVibGljXG4gICAgICovXG5cblxuICAgIENTRGVidWcucHJvdG90eXBlLl9sb2cgPSBmdW5jdGlvbiBfbG9nKHN0ck1lc3NhZ2UpIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjkgPSBhcmd1bWVudHMubGVuZ3RoLCBBZGRpdGlvbmFsTWVzc2FnZSA9IEFycmF5KF9sZW45ID4gMSA/IF9sZW45IC0gMSA6IDApLCBfa2V5OSA9IDE7IF9rZXk5IDwgX2xlbjk7IF9rZXk5KyspIHtcbiAgICAgICAgICAgIEFkZGl0aW9uYWxNZXNzYWdlW19rZXk5IC0gMV0gPSBhcmd1bWVudHNbX2tleTldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoYXQpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgdXNlIERlYnVnLCB0aGVuIGNhbGwgZXJyb3IgbWV0aG9kLCBvciBjYWxsIGRlZmF1bHQgbG9nIGNvbnNvbGUgbWV0aG9kXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIENTTG9nZ2VyLmxvZygyMDAsIHN0ck1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKHRoYXQudXNlKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQ2FsbCBEZWJ1ZyBsb2cgbWV0aG9kXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhhdC5sb2coc3RyTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUHJvY2Vzc2luZyBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoQWRkaXRpb25hbE1lc3NhZ2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEFkZGl0aW9uYWxNZXNzYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9sb2coQWRkaXRpb25hbE1lc3NhZ2VbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQ2FsbCBjb25zb2xlIGxvZyBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygcm9vdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygcm9vdC5jb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0aGF0ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0aGF0LmNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5jb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb25zb2xlLmxvZy5hcHBseShyb290LmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBjb25zb2xlIHdpbmRvdyBkZWJ1ZyBtZXRob2RcbiAgICAgKiBAcGFyYW0gc3RyTWVzc2FnZVxuICAgICAqIEBwYXJhbSBBZGRpdGlvbmFsTWVzc2FnZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cblxuXG4gICAgQ1NEZWJ1Zy5wcm90b3R5cGUuX2RlYnVnID0gZnVuY3Rpb24gX2RlYnVnKHN0ck1lc3NhZ2UpIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjEwID0gYXJndW1lbnRzLmxlbmd0aCwgQWRkaXRpb25hbE1lc3NhZ2UgPSBBcnJheShfbGVuMTAgPiAxID8gX2xlbjEwIC0gMSA6IDApLCBfa2V5MTAgPSAxOyBfa2V5MTAgPCBfbGVuMTA7IF9rZXkxMCsrKSB7XG4gICAgICAgICAgICBBZGRpdGlvbmFsTWVzc2FnZVtfa2V5MTAgLSAxXSA9IGFyZ3VtZW50c1tfa2V5MTBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoYXQpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgdXNlIERlYnVnLCB0aGVuIGNhbGwgZXJyb3IgbWV0aG9kLCBvciBjYWxsIGRlZmF1bHQgZGVidWcgY29uc29sZSBtZXRob2RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgQ1NMb2dnZXIubG9nKDEwMCwgc3RyTWVzc2FnZSk7XG4gICAgICAgICAgICBpZiAodGhhdC51c2UpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDYWxsIERlYnVnIGRlYnVnIG1ldGhvZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoYXQuZGVidWcoc3RyTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUHJvY2Vzc2luZyBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoQWRkaXRpb25hbE1lc3NhZ2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEFkZGl0aW9uYWxNZXNzYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9kZWJ1ZyhBZGRpdGlvbmFsTWVzc2FnZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBDYWxsIGNvbnNvbGUgZGVidWcgbWV0aG9kLCBpZiBpdCBpcyBub3Qgc3VwcG9ydGVkIGNhbGwgbG9nIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiByb290LmNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoYXQgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoYXQuY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LmNvbnNvbGUuZGVidWcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY29uc29sZS5kZWJ1Zy5hcHBseShyb290LmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGF0LmNvbnNvbGUubG9nID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbnNvbGUubG9nLmFwcGx5KHJvb3QuY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gQ1NEZWJ1Zztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ1NEZWJ1ZztcblxubW9kdWxlLmV4cG9ydHMgPSBDU0RlYnVnO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL0NTRGVidWcudHNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9BbmltYXRpb25GcmFtZSA9IHJlcXVpcmUoXCJBbmltYXRpb25GcmFtZVwiKTtcblxudmFyIF9BbmltYXRpb25GcmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BbmltYXRpb25GcmFtZSk7XG5cbnZhciBfVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIik7XG5cbnZhciBfVXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgTUQ1ID0gcmVxdWlyZShcImNyeXB0by1qcy9tZDVcIik7XG4vKipcbiAqIEltcG9ydCBBbmltYXRpb24gZnJhbWVcbiAqL1xuXG52YXIgcm9vdCA9IHZvaWQgMDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcm9vdCA9IGdsb2JhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290ID0ge307XG4gICAgfVxufSBlbHNlIHtcbiAgICByb290ID0gd2luZG93O1xufVxudmFyIFNUQVRVU0VTID0ge1xuICAgIDYwMDogXCJTb21lIHVuY2F1Z2h0IGVycm9yXCIsXG4gICAgNTAzOiBcIkF0dGVtcHQgcmVhdHRhY2ggdGhlIHNjcmlwdHMgdG8gdGhlIG5vbi1vYmplY3RcIixcbiAgICA1MDI6IFwiQmxvY2sgZG9lc24ndCBleGlzdFwiLFxuICAgIDUwMTogXCJCYW5uZXIgcGxhY2UgZG9lc24ndCBleGlzdFwiLFxuICAgIDUwMDogXCJTb21lIGNhdWdodCBlcnJvclwiLFxuICAgIDQwMTogXCJEZXByZWNhdGVkIGNhbGxcIixcbiAgICA0MDA6IFwiU29tZSB3YXJuaW5nXCIsXG4gICAgMzAwOiBcIlNvbWUgaW5mb1wiLFxuICAgIDIwMDogXCJTb21lIGxvZ1wiLFxuICAgIDEwMTogXCJFbnRyeSBwb2ludFwiLFxuICAgIDEwMDogXCJTb21lIGRlYnVnXCIsXG4gICAgMDogXCJTb21ldGhpbmdcIlxufTtcblxudmFyIENTTG9nZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENTTG9nZ2VyKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ1NMb2dnZXIpO1xuICAgIH1cblxuICAgIENTTG9nZ2VyLmluaXQgPSBmdW5jdGlvbiBpbml0KHNldHRpbmdzKSB7XG4gICAgICAgIGlmICgodHlwZW9mIHNldHRpbmdzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yoc2V0dGluZ3MpKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICBDU0xvZ2dlci5zZXR0aW5nc1twcm9wXSA9IHNldHRpbmdzW3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ1NMb2dnZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBMb2cgbWV0aG9kXG4gICAgICogQHBhcmFtIHN0YXR1c1xuICAgICAqIEBwYXJhbSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXNcbiAgICAgKi9cblxuXG4gICAgQ1NMb2dnZXIubG9nID0gZnVuY3Rpb24gbG9nKHN0YXR1cywgbWVzc2FnZSwgcHJvcGVydGllcykge1xuICAgICAgICBzdGF0dXMgPSBzdGF0dXMgfHwgMTAxO1xuICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCBTVEFUVVNFU1tzdGF0dXNdIHx8IFwiXCI7XG4gICAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgICBpZiAoc3RhdHVzID49IENTTG9nZ2VyLnNldHRpbmdzLm1pbkxvZ2dlckxldmVsKSB7XG4gICAgICAgICAgICB2YXIgbG9nT2JqID0ge1xuICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAgICAgcHJvamVjdE5hbWU6IENTTG9nZ2VyLnNldHRpbmdzLnByb2plY3ROYW1lLFxuICAgICAgICAgICAgICAgIHByb2plY3RWZXJzaW9uOiBDU0xvZ2dlci5zZXR0aW5ncy5wcm9qZWN0VmVyc2lvbixcbiAgICAgICAgICAgICAgICBzdGFjazogX1V0aWxzMi5kZWZhdWx0LnN0YWNrKCksXG4gICAgICAgICAgICAgICAgdXNlcjogX1V0aWxzMi5kZWZhdWx0LlVzZXIuZ2V0SW5mbygpLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIENTTG9nZ2VyLmFyckxvZy5wdXNoKGxvZ09iaik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgQ1NMb2dnZXIuc2hvd01lc3NhbmdlID0gZnVuY3Rpb24gc2hvd01lc3NhbmdlKCkge1xuICAgICAgICB2YXIgc3RhdHVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAwO1xuICAgICAgICB2YXIgbWVzc2FnZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogXCJcIjtcblxuICAgICAgICB2YXIgbWVzc2FuZ2VMYXZlbCA9IFwiZGVidWdcIjtcbiAgICAgICAgaWYgKHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICBtZXNzYW5nZUxhdmVsID0gXCJsb2dcIjtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPj0gMzAwICYmIHN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgbWVzc2FuZ2VMYXZlbCA9IFwiaW5mb1wiO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA+PSA0MDAgJiYgc3RhdHVzIDwgNTAwKSB7XG4gICAgICAgICAgICBtZXNzYW5nZUxhdmVsID0gXCJ3YXJuXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID49IDUwMCkge1xuICAgICAgICAgICAgbWVzc2FuZ2VMYXZlbCA9IFwiZXJyb3JcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZih3aW5kb3cpKSA9PT0gXCJvYmplY3RcIiAmJiBfdHlwZW9mKHdpbmRvdy5EZWJ1ZykgPT09IFwib2JqZWN0XCIgJiYgX3R5cGVvZih3aW5kb3cuRGVidWcuY29uc29sZSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHdpbmRvdy5EZWJ1Zy5jb25zb2xlW21lc3NhbmdlTGF2ZWxdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5EZWJ1Zy5jb25zb2xlW21lc3NhbmdlTGF2ZWxdKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2UgaWYgKCh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yod2luZG93KSkgPT09IFwib2JqZWN0XCIgJiYgX3R5cGVvZih3aW5kb3cuQ1NEZWJ1ZykgPT09IFwib2JqZWN0XCIgJiYgX3R5cGVvZih3aW5kb3cuQ1NEZWJ1Zy5jb25zb2xlKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygd2luZG93LkNTRGVidWcuY29uc29sZVttZXNzYW5nZUxhdmVsXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB3aW5kb3cuQ1NEZWJ1Zy5jb25zb2xlW21lc3NhbmdlTGF2ZWxdKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2UgaWYgKCh0eXBlb2YgY29uc29sZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGNvbnNvbGUpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY29uc29sZVttZXNzYW5nZUxhdmVsXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlW21lc3NhbmdlTGF2ZWxdKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBMb2cgc2VuZCB3YXRjaGVyXG4gICAgICovXG5cblxuICAgIENTTG9nZ2VyLndhdGNoID0gZnVuY3Rpb24gd2F0Y2goKSB7XG4gICAgICAgIGlmIChDU0xvZ2dlci5hcnJMb2cubGVuZ3RoID4gMCAmJiBDU0xvZ2dlci5hcnJMb2cubGVuZ3RoIDwgMTAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBDU0xvZ2dlci5hcnJMb2csIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2l0ZXJhdG9yW19pKytdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGwgPSBfcmVmO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkobCkpO1xuICAgICAgICAgICAgICAgIHZhciB1aWQgPSBNRDUoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBsLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3ROYW1lOiBsLnByb2plY3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0VmVyc2lvbjogbC5wcm9qZWN0VmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBsLnN0YXR1c1xuICAgICAgICAgICAgICAgIH0pKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmIChDU0xvZ2dlci5hcnJTZW5kZWQuaW5kZXhPZih1aWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBDU0xvZ2dlci5hcnJTZW5kZWQucHVzaCh1aWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiICYmIENTTG9nZ2VyLnNldHRpbmdzLmxvZ2dlclVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkuc3JjID0gQ1NMb2dnZXIuc2V0dGluZ3MubG9nZ2VyVXJsICsgXCI/dWlkPVwiICsgdWlkICsgXCImZGF0YT1cIiArIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDU0xvZ2dlci5zaG93TWVzc2FuZ2UobC5zdGF0dXMsIGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ1NMb2dnZXIuYXJyTG9nID0gW107XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIENTTG9nZ2VyO1xufSgpO1xuXG5DU0xvZ2dlci5ldmVudExpc3RlbmVyQWRkZWQgPSBmYWxzZTtcbkNTTG9nZ2VyLmFyckxvZyA9IFtdO1xuQ1NMb2dnZXIuYXJyU2VuZGVkID0gW107XG5DU0xvZ2dlci5wcm9qZWN0TmFtZSA9IFwiQ1NEZWJ1Z1wiO1xuQ1NMb2dnZXIucHJvamVjdFZlcnNpb24gPSBcIjEuMC4xOFwiO1xuQ1NMb2dnZXIuc2V0dGluZ3MgPSB7XG4gICAgbG9nZ2VyVXJsOiBcIlwiLFxuICAgIG1pbkxvZ2dlckxldmVsOiA1MDAsXG4gICAgcHJvamVjdE5hbWU6IFwiXCIsXG4gICAgcHJvamVjdFZlcnNpb246IFwiXCJcbn07XG4vKipcbiAqIEFkZCBsb2dnZXIgdG8gZ2xvYmFsIGVycm9yIGV2ZW50XG4gKi9cbmlmICghcm9vdC5ldmVudExpc3RlbmVyQWRkZWQpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXJyb3JIYW5kbGVyID0gcm9vdC5vbmVycm9yO1xuICAgICAgICByb290Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JNc2csIHVybCwgbGluZU51bWJlciwgY29sdW1uLCBlcnJvck9iaikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlcihlcnJvck1zZywgdXJsLCBsaW5lTnVtYmVyLCBjb2x1bW4sIGVycm9yT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIENTTG9nZ2VyLmxvZyg2MDAsIGVycm9yTXNnLCB7XG4gICAgICAgICAgICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICAgICAgICAgICAgZXJyb3JPYmo6IGVycm9yT2JqLFxuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IGxpbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByb290LmV2ZW50TGlzdGVuZXJBZGRlZCA9IHRydWU7XG4gICAgfSkoKTtcbn1cbi8qKlxuICogU3Vic2NyaWJlIGxvZ2dlciB0byB3YXRjaGVyXG4gKi9cbl9BbmltYXRpb25GcmFtZTIuZGVmYXVsdC5zdWJzY3JpYmUoe30sIENTTG9nZ2VyLndhdGNoLCBbXSk7XG4vKipcbiAqIFJldHVybiBsb2dnZXJcbiAqL1xudmFyIF9Jbml0ID0gQ1NMb2dnZXIuaW5pdDtcbmV4cG9ydHMuZGVmYXVsdCA9IF9Jbml0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9Jbml0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9DU0xvZ2dlci9saWIvQ1NMb2dnZXIudHNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHJvb3QgPSB2b2lkIDA7XG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJvb3QgPSBnbG9iYWw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdCA9IHt9O1xuICAgIH1cbn0gZWxzZSB7XG4gICAgcm9vdCA9IHdpbmRvdztcbn1cbi8qKlxuICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHBvbHlmaWxsXG4gKi9cbnJvb3QucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0eXBlb2Ygcm9vdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAocm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHJvb3QubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICByb290LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgfTtcbn0oKTtcbi8qKlxuICogQmluZCBwb2x5ZmlsbFxuICovXG5mdW5jdGlvbiBiaW5kKGIpIHtcbiAgICAvKipcbiAgICAgKiBJZiB0cnkgYmluZCB2YXJpYWJsZSB0aGF0IG5vdCBhIGZ1bmN0aW9uLCB0aGVuIHRocm93IGVycm9yXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBsZXQgQXJyYXkgc2xpY2UgZnVuY3Rpb25cbiAgICAgKi9cbiAgICB2YXIgYSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgZiA9IGEuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBlID0gdGhpcztcbiAgICBmdW5jdGlvbiBjKCkge1xuICAgICAgICAvKlxuICAgICAgICAgaWYgKFxuICAgICAgICAgdHlwZW9mIHJvb3QgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgIHR5cGVvZiByb290LmNvbnNvbGUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgIHR5cGVvZiByb290LmNvbnNvbGUubG9nID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICkge1xuICAgICAgICAgcm9vdC5jb25zb2xlLmxvZyhcIkJpbmQgcG9seWZpbGxcIik7XG4gICAgICAgICB9XG4gICAgICAgICAqL1xuICAgIH1cbiAgICBmdW5jdGlvbiBkKCkge1xuICAgICAgICByZXR1cm4gZS5hcHBseSh0aGlzIGluc3RhbmNlb2YgYyA/IHRoaXMgOiBiIHx8IHJvb3QsIGYuY29uY2F0KGEuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyZWQgdGhpcyBwcm90b3R5cGUgYXMgcHJvdG90eXBlIHRvIGJpbmQgaW1wbGVtZW50YXRpb24gZnVuY3Rpb25zXG4gICAgICovXG4gICAgYy5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBjKCk7XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGJpbmQgcG9seWZpbGxcbiAgICAgKi9cbiAgICByZXR1cm4gZDtcbn1cbkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgYmluZDtcbi8qKlxuICogT2JqZWN0LmtleXMgcG9seWZpbGxcbiAqL1xuZnVuY3Rpb24ga2V5cygpIHtcbiAgICB2YXIgaGFzRG9Ob3RFbnVtQnVnID0gIXsgdG9TdHJpbmc6IG51bGwgfS5wcm9wZXJ0eUlzRW51bWVyYWJsZShcInRvU3RyaW5nXCIpO1xuICAgIHZhciBkb05vdEVudW1zID0gW1widG9TdHJpbmdcIiwgXCJ0b0xvY2FsZVN0cmluZ1wiLCBcInZhbHVlT2ZcIiwgXCJoYXNPd25Qcm9wZXJ0eVwiLCBcImlzUHJvdG90eXBlT2ZcIiwgXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLCBcImNvbnN0cnVjdG9yXCJdO1xuICAgIHZhciBkb05vdEVudW1zTGVuZ3RoID0gZG9Ob3RFbnVtcy5sZW5ndGg7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKSkgIT09IFwib2JqZWN0XCIgJiYgKHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIiB8fCBvYmogPT09IG51bGwpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0LmtleXMgY2FsbGVkIG9uIG5vbi1vYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocHJvcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0RvTm90RW51bUJ1Zykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb05vdEVudW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgZG9Ob3RFbnVtc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZG9Ob3RFbnVtc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbk9iamVjdC5rZXlzID0gT2JqZWN0LmtleXMgfHwga2V5cygpO1xuLyoqXG4gKiBSZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSBjYWxsIHN0YWNrIGNsYXNzXG4gKi9cblxudmFyIEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFuaW1hdGlvbkZyYW1lKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQW5pbWF0aW9uRnJhbWUpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdWJzY3JpYmVkIG1ldGhvZHNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3RhY2sgPSB7fTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0YXJ0IHJlcXVlc3RBbmltYXRpb25GcmFtZSB3YXRjaGVyXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndhdGNoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSBtZXRob2QgdG8gd2F0Y2hcbiAgICAgKiBAcGFyYW0gY29udGV4dFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKiBAcGFyYW0gSURcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufHN0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQW5pbWF0aW9uRnJhbWUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZSgpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHJvb3Q7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBwYXJhbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IFtdO1xuICAgICAgICB2YXIgSUQgPSBhcmd1bWVudHNbM107XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgY29udGV4dCBhbmQgY2FsbGJhY2sgcGFzc2VkIGFuZCB0aGV5IGFyZSBvYmplY3QgYW5kIGZ1bmN0aW9uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICgodHlwZW9mIGNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihjb250ZXh0KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDcmVhdGUgVUlEXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBsb2NhbElEID0gSUQgfHwgXCJ4LVwiICsgZC5nZXRUaW1lKCkgKyBcIi1cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDFlNik7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQWRkIG1ldGhvZCB0byB0aGUgc3RhY2tcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnN0YWNrW2xvY2FsSURdID0ge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBXcml0ZSB0byBjb25zb2xlIGNvdW50IG9mIHRoZSBzdWJzY3JpYmVkIG1ldGhvZHNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICAgICAgIHR5cGVvZiByb290LmNvbnNvbGUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZS5pbmZvID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgIHJvb3QuY29uc29sZS5pbmZvKFwiQW5pbWF0aW9uRnJhbWUgc3RhY2sgXCIgKyBPYmplY3Qua2V5cyh0aGlzLnN0YWNrKS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmV0dXJuIFVJRFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbElEO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZSBtZXRob2QgYnkgSURcbiAgICAgKiBAcGFyYW0gSURcbiAgICAgKi9cblxuXG4gICAgQW5pbWF0aW9uRnJhbWUucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUoSUQpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHJlcXVpcmVkIG1ldGhvZCBleGlzdCBpbiB0aGUgc3RhY2tcbiAgICAgICAgICovXG4gICAgICAgIGlmICh0aGlzLnN0YWNrW0lEXSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBOdWxsaWZ5IG1ldGhvZCBpbiB0aGUgc3RhY2sgYW5kIGRlc3Ryb3kgaXRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5zdGFja1tJRF0gPSBmYWxzZTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0YWNrW0lEXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogV2F0Y2ggYW5kIGNhbGwgbWV0aG9kc1xuICAgICAqL1xuXG5cbiAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUud2F0Y2ggPSBmdW5jdGlvbiB3YXRjaCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc3RhY2sgZXhpc3QsIGl0IGlzIGFuIG9iamVjdCBhbmQgaXQgaXMgY29udGFpbnMgbWV0aG9kc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodGhpcy5zdGFjayAmJiBfdHlwZW9mKHRoaXMuc3RhY2spID09PSBcIm9iamVjdFwiICYmIE9iamVjdC5rZXlzKHRoaXMuc3RhY2spLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBMb29wIGFsbCBtZXRob2RzIGluIHN0YWNrXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgSUQgaW4gdGhpcy5zdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogUHJvY2VzcyBvbmx5IG1ldGhvZHMgd2l0aG91dCBleHRlbmRlZCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFjay5oYXNPd25Qcm9wZXJ0eShJRCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogSWYgSUQgZXhpc3QgYW5kIGl0IGlzIGEgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElEICYmIHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogR2V0IHN1YnNjcmliZWQgbWV0aG9kIHBhcmFtcyBieSBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iakNhbGwgPSB0aGlzLnN0YWNrW0lEXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIElmIHBhcmFtcyBleGlzdCwgaXQgaXMgYW4gb2JqZWN0LCBhbmQgaXQgaXMgY29udGFpbnMgY2FsbCBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBjYWxsYmFjaywgYW5kIHBhcmFtZXRlcnMgd2hpY2ggaXMgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpDYWxsICYmICh0eXBlb2Ygb2JqQ2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iakNhbGwpKSA9PT0gXCJvYmplY3RcIiAmJiBvYmpDYWxsLmNvbnRleHQgJiYgb2JqQ2FsbC5jYWxsYmFjayAmJiBvYmpDYWxsLnBhcmFtcyAmJiBfdHlwZW9mKG9iakNhbGwuY29udGV4dCkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iakNhbGwuY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIiAmJiBBcnJheS5pc0FycmF5KG9iakNhbGwucGFyYW1zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDYWxsIHN1YnNjcmliZWQgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iakNhbGwuY2FsbGJhY2suYXBwbHkob2JqQ2FsbC5jb250ZXh0LCBvYmpDYWxsLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjYWxsIHdhdGNoZXJcbiAgICAgICAgICovXG4gICAgICAgIHJvb3QucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMud2F0Y2guYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBBbmltYXRpb25GcmFtZTtcbn0oKTtcbi8qKlxuICogQ3JlYXRlIHNpbmdsZSByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSBvYmplY3RcbiAqIEB0eXBlIHtBbmltYXRpb25GcmFtZX1cbiAqL1xuXG5cbnJvb3QuQW5pbWF0aW9uRnJhbWUgPSByb290LkFuaW1hdGlvbkZyYW1lIHx8IG5ldyBBbmltYXRpb25GcmFtZSgpO1xuLyoqXG4gKiBFeHBvcnQgc2luZ2xlIEFuaW1hdGlvbkZyYW1lIGluc3RhbmNlXG4gKi9cbnZhciBfQW5pbWF0aW9uRnJhbWUgPSByb290LkFuaW1hdGlvbkZyYW1lO1xuZXhwb3J0cy5kZWZhdWx0ID0gX0FuaW1hdGlvbkZyYW1lO1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9BbmltYXRpb25GcmFtZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vQW5pbWF0aW9uRnJhbWUvbGliL0FuaW1hdGlvbkZyYW1lLnRzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBJbXBvcnQgc3ViY2xhc3Nlc1xuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9VdGlsc0FuaW1hdGlvbiA9IHJlcXVpcmUoXCIuL1V0aWxzQW5pbWF0aW9uXCIpO1xuXG52YXIgX1V0aWxzQW5pbWF0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQW5pbWF0aW9uKTtcblxudmFyIF9VdGlsc0Jyb3dzZXIgPSByZXF1aXJlKFwiLi9VdGlsc0Jyb3dzZXJcIik7XG5cbnZhciBfVXRpbHNCcm93c2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQnJvd3Nlcik7XG5cbnZhciBfVXRpbHNDb29raWUgPSByZXF1aXJlKFwiLi9VdGlsc0Nvb2tpZVwiKTtcblxudmFyIF9VdGlsc0Nvb2tpZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0Nvb2tpZSk7XG5cbnZhciBfVXRpbHNEb2N1bWVudCA9IHJlcXVpcmUoXCIuL1V0aWxzRG9jdW1lbnRcIik7XG5cbnZhciBfVXRpbHNEb2N1bWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0RvY3VtZW50KTtcblxudmFyIF9VdGlsc0RPTSA9IHJlcXVpcmUoXCIuL1V0aWxzRE9NXCIpO1xuXG52YXIgX1V0aWxzRE9NMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzRE9NKTtcblxudmFyIF9VdGlsc01vdXNlID0gcmVxdWlyZShcIi4vVXRpbHNNb3VzZVwiKTtcblxudmFyIF9VdGlsc01vdXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzTW91c2UpO1xuXG52YXIgX1V0aWxzU2NyZWVuID0gcmVxdWlyZShcIi4vVXRpbHNTY3JlZW5cIik7XG5cbnZhciBfVXRpbHNTY3JlZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTY3JlZW4pO1xuXG52YXIgX1V0aWxzU3lzdGVtID0gcmVxdWlyZShcIi4vVXRpbHNTeXN0ZW1cIik7XG5cbnZhciBfVXRpbHNTeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTeXN0ZW0pO1xuXG52YXIgX1V0aWxzVXNlciA9IHJlcXVpcmUoXCIuL1V0aWxzVXNlclwiKTtcblxudmFyIF9VdGlsc1VzZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNVc2VyKTtcblxudmFyIF9VdGlsc1dpbmRvdyA9IHJlcXVpcmUoXCIuL1V0aWxzV2luZG93XCIpO1xuXG52YXIgX1V0aWxzV2luZG93MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzV2luZG93KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBHbG9iYWwgVXRpbHMgY2xhc3NcbiAqL1xudmFyIFV0aWxzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFV0aWxzKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXRpbHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIFV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlIFV0aWxzLkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kLlxuICAgICAqL1xuICAgIFV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlKSB7XG4gICAgICAgIHZhciBkb21Eb2N1bWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG4gICAgICAgIHZhciBzaG93Rm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgICAgIGlmICgodHlwZW9mIGNvbnNvbGUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihjb25zb2xlKSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJVdGlscy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZC5cIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVdGlscy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFV0aWxzLkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tTm9kZSwgZG9tRG9jdW1lbnQsIHNob3dGb3JjZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIFV0aWxzLmZpbmRFbGVtZW50UG9zaXRpb24gbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXG4gICAgICovXG4gICAgVXRpbHMuZmluZEVsZW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIGZpbmRFbGVtZW50UG9zaXRpb24oZG9tTm9kZSkge1xuICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBjb25zb2xlID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoY29uc29sZSkpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVXRpbHMuZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlXCIgKyBcIiBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXRpbHMuZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlXCIgKyBcIiBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbihkb21Ob2RlLCBzaG93Rm9yY2UpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJhbnNmZXIgc3RhdGljIG1ldGhvZHMgaW50byB0aGUgb2JqZWN0XG4gICAgICogQHBhcmFtIHJlYWxPYmplY3RcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICovXG5cblxuICAgIFV0aWxzLmltcGxlbWVudGF0aW9uU3RhdGljTWV0aG9kcyA9IGZ1bmN0aW9uIGltcGxlbWVudGF0aW9uU3RhdGljTWV0aG9kcyhyZWFsT2JqZWN0LCBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIHN0YXRpY0NsYXNzID0gcmVhbE9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0aWNDbGFzcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIG1ldGhvZHMgPSBPYmplY3Qua2V5cyhzdGF0aWNDbGFzcyk7XG4gICAgICAgICAgICBpZiAobWV0aG9kcyAmJiBtZXRob2RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhbE9iamVjdFttZXRob2RdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsT2JqZWN0W21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0aWNDbGFzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiAodHlwZW9mIGNvbnNvbGUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihjb25zb2xlKSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVGhhdCBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlIFwiICsgKGNsYXNzTmFtZSB8fCBzdGF0aWNDbGFzcyAmJiBzdGF0aWNDbGFzcy5uYW1lIHx8IFwiVW5rbm93blwiKSArIFwiLlwiICsgbWV0aG9kICsgXCIgbWV0aG9kLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGF0IG1ldGhvZCB3YXMgZGVwcmVjYXRlZCBhbmQgc29vbiB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgXCIgKyAoY2xhc3NOYW1lIHx8IHN0YXRpY0NsYXNzICYmIHN0YXRpY0NsYXNzLm5hbWUgfHwgXCJVbmtub3duXCIpICsgXCIuXCIgKyBtZXRob2QgKyBcIiBtZXRob2QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0aWNDbGFzc1ttZXRob2RdLmFwcGx5KHN0YXRpY0NsYXNzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBtZXRob2RzLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgX3JldCA9IF9sb29wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF9yZXQgPT09IFwiYnJlYWtcIikgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgY2FsbCBzdGFjayB0cmFjZVxuICAgICAqIEByZXR1cm4gQXJyYXk8T2JqZWN0PlxuICAgICAqL1xuXG5cbiAgICBVdGlscy5zdGFjayA9IGZ1bmN0aW9uIHN0YWNrKCkge1xuICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcigpO1xuICAgICAgICByZXR1cm4gZSAmJiBlLnN0YWNrICYmIGUuc3RhY2suc3BsaXQoXCJcXG5cIikuc2xpY2UoNSkubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICBpZiAoIXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAvXiguKilAKC4qKVxcLmpzOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoWzFdID0gLyhbXlxcLzxdKykvaWcuZXhlYyhtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMV0gPSBtYXRjaFsxXVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzRdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWF0Y2hbMV0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoaHR0cHxodHRwcyk6KFteOl0rKTooWzAtOV0rKTooWzAtOV0rKSQvaWcuZXhlYyhzKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbWF0Y2hbNV0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogbWF0Y2hbM10gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbWF0Y2hbNF0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtYXRjaFsxXSArIFwiOlwiICsgbWF0Y2hbMl0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoLiopOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFsyXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFszXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyhbXihdKylcXHNcXCgoLiopOihbMC05XSspOihbMC05XSspXFwpJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFsyXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFszXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyguKik6KFswLTldKyk6KFswLTldKykkL2lnLmV4ZWMocyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzFdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfSkgfHwgW107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgcmFuZG9tIElEXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBVdGlscy5nZXRVSUQgPSBmdW5jdGlvbiBnZXRVSUQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMik7XG4gICAgfTtcblxuICAgIHJldHVybiBVdGlscztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVXRpbHM7XG5cblV0aWxzLkFuaW1hdGlvbiA9IF9VdGlsc0FuaW1hdGlvbjIuZGVmYXVsdDtcblV0aWxzLkJyb3dzZXIgPSBfVXRpbHNCcm93c2VyMi5kZWZhdWx0O1xuVXRpbHMuQ29va2llID0gX1V0aWxzQ29va2llMi5kZWZhdWx0O1xuVXRpbHMuRE9NID0gX1V0aWxzRE9NMi5kZWZhdWx0O1xuVXRpbHMuRG9jdW1lbnQgPSBfVXRpbHNEb2N1bWVudDIuZGVmYXVsdDtcblV0aWxzLk1vdXNlID0gX1V0aWxzTW91c2UyLmRlZmF1bHQ7XG5VdGlscy5TY3JlZW4gPSBfVXRpbHNTY3JlZW4yLmRlZmF1bHQ7XG5VdGlscy5TeXN0ZW0gPSBfVXRpbHNTeXN0ZW0yLmRlZmF1bHQ7XG5VdGlscy5Vc2VyID0gX1V0aWxzVXNlcjIuZGVmYXVsdDtcblV0aWxzLldpbmRvdyA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gVXRpbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlscy50c1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogSW1wb3J0IHN1YmNsYXNzZXNcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX1V0aWxzQW5pbWF0aW9uRWFzaW5nID0gcmVxdWlyZShcIi4vVXRpbHNBbmltYXRpb25FYXNpbmdcIik7XG5cbnZhciBfVXRpbHNBbmltYXRpb25FYXNpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNBbmltYXRpb25FYXNpbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQW5pbWF0aW9uID0gZnVuY3Rpb24gQW5pbWF0aW9uKCkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQW5pbWF0aW9uKTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFuaW1hdGlvbjtcblxuQW5pbWF0aW9uLkVhc2luZyA9IF9VdGlsc0FuaW1hdGlvbkVhc2luZzIuZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzQW5pbWF0aW9uLnRzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBEaWZmZXJlbnQgdGltZSBhbmltYXRpb24gZnVuY3Rpb25zXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEVhc2luZyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFYXNpbmcoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFYXNpbmcpO1xuICAgIH1cblxuICAgIEVhc2luZy5zd2luZyA9IGZ1bmN0aW9uIHN3aW5nKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIEVhc2luZ1tFYXNpbmcuZGVmXSh0LCBiLCBjLCBkKTtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJblF1YWQgPSBmdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dFF1YWQgPSBmdW5jdGlvbiBlYXNlT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRRdWFkID0gZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC1jIC8gMiAqICgtLXQgKiAodCAtIDIpIC0gMSkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluQ3ViaWMgPSBmdW5jdGlvbiBlYXNlSW5DdWJpYyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0Q3ViaWMgPSBmdW5jdGlvbiBlYXNlT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEN1YmljID0gZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJblF1YXJ0ID0gZnVuY3Rpb24gZWFzZUluUXVhcnQodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRRdWFydCA9IGZ1bmN0aW9uIGVhc2VPdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiAtYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgLSAxKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRRdWFydCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgLSAyKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5RdWludCA9IGZ1bmN0aW9uIGVhc2VJblF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dFF1aW50ID0gZnVuY3Rpb24gZWFzZU91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dFF1aW50ID0gZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5TaW5lID0gZnVuY3Rpb24gZWFzZUluU2luZSh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiAtYyAqIE1hdGguY29zKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBjICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRTaW5lID0gZnVuY3Rpb24gZWFzZU91dFNpbmUodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAqIE1hdGguc2luKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0U2luZSA9IGZ1bmN0aW9uIGVhc2VJbk91dFNpbmUodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gLWMgLyAyICogKE1hdGguY29zKE1hdGguUEkgKiB0IC8gZCkgLSAxKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5FeHBvID0gZnVuY3Rpb24gZWFzZUluRXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiB0ID09PSAwID8gYiA6IGMgKiBNYXRoLnBvdygyLCAxMCAqICh0IC8gZCAtIDEpKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0RXhwbyA9IGZ1bmN0aW9uIGVhc2VPdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIHQgPT09IGQgPyBiICsgYyA6IGMgKiAoLU1hdGgucG93KDIsIC0xMCAqIHQgLyBkKSArIDEpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEV4cG8gPSBmdW5jdGlvbiBlYXNlSW5PdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ID09PSBkKSB7XG4gICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjIC8gMiAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbkNpcmMgPSBmdW5jdGlvbiBlYXNlSW5DaXJjKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIC1jICogKE1hdGguc3FydCgxIC0gKHQgLz0gZCkgKiB0KSAtIDEpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRDaXJjID0gZnVuY3Rpb24gZWFzZU91dENpcmModCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAqIE1hdGguc3FydCgxIC0gKHQgPSB0IC8gZCAtIDEpICogdCkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0Q2lyYyA9IGZ1bmN0aW9uIGVhc2VJbk91dENpcmModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluRWxhc3RpYyA9IGZ1bmN0aW9uIGVhc2VJbkVsYXN0aWModCwgYiwgYywgZCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgdmFyIGEgPSBjO1xuICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICBwID0gZCAqIC4zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLShhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEVsYXN0aWMgPSBmdW5jdGlvbiBlYXNlT3V0RWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICB2YXIgYSA9IGM7XG4gICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBiICsgYztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICAgIHAgPSBkICogLjM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIGMgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0RWxhc3RpYyA9IGZ1bmN0aW9uIGVhc2VJbk91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgdmFyIGEgPSBjO1xuICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgcCA9IGQgKiAoLjMgKiAxLjUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAtLjUgKiAoYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICogLjUgKyBjICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbkJhY2sgPSBmdW5jdGlvbiBlYXNlSW5CYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0QmFjayA9IGZ1bmN0aW9uIGVhc2VPdXRCYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0QmFjayA9IGZ1bmN0aW9uIGVhc2VJbk91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICAgICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSkgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMikgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluQm91bmNlID0gZnVuY3Rpb24gZWFzZUluQm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgLSBFYXNpbmcuZWFzZU91dEJvdW5jZShkIC0gdCwgMCwgYywgZCkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEJvdW5jZSA9IGZ1bmN0aW9uIGVhc2VPdXRCb3VuY2UodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCkgPCAxIC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogdCAqIHQpICsgYjtcbiAgICAgICAgfSBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIC43NSkgKyBiO1xuICAgICAgICB9IGVsc2UgaWYgKHQgPCAyLjUgLyAyLjc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjI1IC8gMi43NSkgKiB0ICsgLjkzNzUpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgLjk4NDM3NSkgKyBiO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRCb3VuY2UgPSBmdW5jdGlvbiBlYXNlSW5PdXRCb3VuY2UodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAodCA8IGQgLyAyKSB7XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5nLmVhc2VJbkJvdW5jZSh0ICogMiwgMCwgYywgZCkgKiAuNSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVhc2luZy5lYXNlT3V0Qm91bmNlKHQgKiAyIC0gZCwgMCwgYywgZCkgKiAuNSArIGMgKiAuNSArIGI7XG4gICAgfTtcblxuICAgIHJldHVybiBFYXNpbmc7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEVhc2luZztcblxuRWFzaW5nLmRlZiA9IFwiZWFzZU91dFF1YWRcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzQW5pbWF0aW9uRWFzaW5nLnRzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIGJyb3dzZXJcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQnJvd3NlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcm93c2VyKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnJvd3Nlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGJyb3dzZXIgaW5mb1xuICAgICAqIEByZXR1cm4ge3ticm93c2VyOiBzdHJpbmcsIG1vYmlsZTogYm9vbGVhbiwgdmVyc2lvbjogc3RyaW5nfX1cbiAgICAgKi9cbiAgICBCcm93c2VyLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJvd3NlcjogQnJvd3Nlci5nZXROYW1lKCksXG4gICAgICAgICAgICBtb2JpbGU6IEJyb3dzZXIuaXNNb2JpbGUoKSxcbiAgICAgICAgICAgIHZlcnNpb246IEJyb3dzZXIuZ2V0VmVyc2lvbigpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgYnJvd3NlciBuYW1lXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldE5hbWUgPSBmdW5jdGlvbiBnZXROYW1lKCkge1xuICAgICAgICB2YXIgYnJvd3NlciA9IHZvaWQgMDtcbiAgICAgICAgaWYgKEJyb3dzZXIuaXNPcGVyYSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJPcGVyYVwiO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNPcGVyYU5ldygpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJPcGVyYVwiO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNNU0lFKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNNU0lFTmV3KCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNDaHJvbWUoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiQ2hyb21lXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0ZpcmVmb3goKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiRmlyZWZveFwiO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNTYWZhcmkoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiU2FmYXJpXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc090aGVyKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBCcm93c2VyLmdldE90aGVyTmFtZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBicm93c2VyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRWZXJzaW9uID0gZnVuY3Rpb24gZ2V0VmVyc2lvbigpIHtcbiAgICAgICAgdmFyIHZlcnNpb24gPSB2b2lkIDA7XG4gICAgICAgIGlmIChCcm93c2VyLmlzT3BlcmEoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0T3BlcmFWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc09wZXJhTmV3KCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldE9wZXJhTmV3VmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNNU0lFKCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldE1TSUVWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUVOZXcoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0TVNJRU5ld1ZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzQ2hyb21lKCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldENocm9tZVZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzRmlyZWZveCgpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRGaXJlZm94VmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNTYWZhcmkoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0U2FmYXJpVmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNPdGhlcigpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRPdGhlclZlcnNpb24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRyaW0gYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHBhcmFtIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIudHJpbVZlcnNpb24gPSBmdW5jdGlvbiB0cmltVmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIHZhciBjaGFycyA9IFtcIjtcIiwgXCIgXCIsIFwiKVwiXTtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY2hhcnMsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2hhciA9IF9yZWY7XG5cbiAgICAgICAgICAgIHZhciBpeCA9IHZlcnNpb24uaW5kZXhPZihjaGFyKTtcbiAgICAgICAgICAgIGlmIChpeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgbW9iaWxlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc01vYmlsZSA9IGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xuICAgICAgICByZXR1cm4gKC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuYXZpZ2F0b3IuYXBwVmVyc2lvbilcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG9wZXJhIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzT3BlcmEgPSBmdW5jdGlvbiBpc09wZXJhKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG9wZXJhIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRPcGVyYVZlcnNpb24gPSBmdW5jdGlvbiBnZXRPcGVyYVZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcbiAgICAgICAgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiVmVyc2lvblwiKTtcbiAgICAgICAgaWYgKHZlck9mZnNldCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG9wZXJhIG5ldyBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc09wZXJhTmV3ID0gZnVuY3Rpb24gaXNPcGVyYU5ldygpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9QUlwiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgb3BlcmEgbmV3IGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRPcGVyYU5ld1ZlcnNpb24gPSBmdW5jdGlvbiBnZXRPcGVyYU5ld1ZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPUFJcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNCk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgbXNpZSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc01TSUUgPSBmdW5jdGlvbiBpc01TSUUoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBtc2llIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRNU0lFVmVyc2lvbiA9IGZ1bmN0aW9uIGdldE1TSUVWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBtc2llIG5ldyBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc01TSUVOZXcgPSBmdW5jdGlvbiBpc01TSUVOZXcoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJUcmlkZW50L1wiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgbXNpZSBuZXcgYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldE1TSUVOZXdWZXJzaW9uID0gZnVuY3Rpb24gZ2V0TVNJRU5ld1ZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwicnY6XCIpICsgMyk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgY2hyb21lIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzQ2hyb21lID0gZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGNocm9tZSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0Q2hyb21lVmVyc2lvbiA9IGZ1bmN0aW9uIGdldENocm9tZVZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgc2FmYXJpIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzU2FmYXJpID0gZnVuY3Rpb24gaXNTYWZhcmkoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNhZmFyaSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0U2FmYXJpVmVyc2lvbiA9IGZ1bmN0aW9uIGdldFNhZmFyaVZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XG4gICAgICAgIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlZlcnNpb25cIik7XG4gICAgICAgIGlmICh2ZXJPZmZzZXQgIT09IC0xKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBmaXJlZm94IGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzRmlyZWZveCA9IGZ1bmN0aW9uIGlzRmlyZWZveCgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGZpcmVmb3ggYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldEZpcmVmb3hWZXJzaW9uID0gZnVuY3Rpb24gZ2V0RmlyZWZveFZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG90aGVyIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzT3RoZXIgPSBmdW5jdGlvbiBpc090aGVyKCkge1xuICAgICAgICB2YXIgbmFtZU9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIgXCIpICsgMTtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICByZXR1cm4gbmFtZU9mZnNldCA8IHZlck9mZnNldDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBvdGhlciBicm93c2VyIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3RoZXJOYW1lID0gZnVuY3Rpb24gZ2V0T3RoZXJOYW1lKCkge1xuICAgICAgICB2YXIgbmFtZU9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIgXCIpICsgMTtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICB2YXIgYnJvd3NlciA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XG4gICAgICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT09IGJyb3dzZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBicm93c2VyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG90aGVyIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRPdGhlclZlcnNpb24gPSBmdW5jdGlvbiBnZXRPdGhlclZlcnNpb24oKSB7XG4gICAgICAgIHZhciBuYW1lT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIiBcIikgKyAxO1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIi9cIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgYnJvd3NlciBzdXBwb3J0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gIUJyb3dzZXIuaXNNU0lFKCkgfHwgcGFyc2VJbnQoQnJvd3Nlci5nZXRNU0lFVmVyc2lvbigpLCAxMCkgPiA4O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgV2ViS2l0IGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzV2ViS2l0ID0gZnVuY3Rpb24gaXNXZWJLaXQoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJBcHBsZVdlYktpdC9cIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgR2Vja28gYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNHZWNrbyA9IGZ1bmN0aW9uIGlzR2Vja28oKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJHZWNrb1wiKSA+IC0xICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIktIVE1MXCIpID09PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIEFuZHJvaWQgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNBbmRyb2lkID0gZnVuY3Rpb24gaXNBbmRyb2lkKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQW5kcm9pZFwiKSA+IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgTGludXggYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNMaW51eCA9IGZ1bmN0aW9uIGlzTGludXgoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJMaW51eFwiKSA+IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgaVBhZCBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1RhYmxldFBDID0gZnVuY3Rpb24gaXNUYWJsZXRQQygpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcImlQYWRcIikgPiAtMTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJyb3dzZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEJyb3dzZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0Jyb3dzZXIudHNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIGNvb2tpZVxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIENvb2tpZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29va2llKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb29raWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgZmxhZyB3aGV0aGVyIHN1cHBvcnRlZCB0aGlzIHN0b3JhZ2UgdHlwZSBvciBub3RcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBDb29raWUuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGRvY3VtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGRvY3VtZW50LmNvb2tpZSA9PT0gXCJzdHJpbmdcIjtcbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2Qgc2V0cyB0aGUgdmFsdWUgYW5kIHJldHVybnMgdHJ1ZSBpZiBpdCBoYXMgYmVlbiBzZXRcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cbiAgICogQHBhcmFtIGV4cGlyZXMge251bWJlcn1cbiAgICogQHBhcmFtIHBhdGgge3N0cmluZ31cbiAgICogQHBhcmFtIGRvbWFpbiB7c3RyaW5nfVxuICAgKiBAcGFyYW0gc2VjdXJlIHtib29sZWFufVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuXG4gIENvb2tpZS5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgZXhwaXJlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogMzA7XG4gICAgdmFyIHBhdGggPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IFwiL1wiO1xuICAgIHZhciBkb21haW4gPSBhcmd1bWVudHMubGVuZ3RoID4gNSAmJiBhcmd1bWVudHNbNV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s1XSA6IGxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIHZhciBzZWN1cmUgPSBhcmd1bWVudHMubGVuZ3RoID4gNiAmJiBhcmd1bWVudHNbNl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s2XSA6IGxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgQ29va2llLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNhdmUgY29va2llcyBmb3IgMzAgZGF5c1xuICAgICAgICAgKiBAdHlwZSB7RGF0ZX1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgZXhwaXJlcyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgICAgICB2YXIgZXhwID0gZGF0ZS50b1VUQ1N0cmluZygpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRW5jb2RlIHZhbHVlIGZvciBzdG9yZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAvKipcbiAgICAgICAgICogV3JpdGluZyB2YWx1ZSB0byB0aGUgZG9jdW1lbnQgY29va2llIHN0b3JhZ2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGtleSArIFwiPVwiICsgdmFsdWUgKyAoZXhwID8gXCI7IGV4cGlyZXM9XCIgKyBleHAgOiBcIlwiKSArIChwYXRoID8gXCI7IHBhdGg9XCIgKyBwYXRoIDogXCJcIikgKyAoZG9tYWluID8gXCI7IGRvbWFpbj1cIiArIGRvbWFpbiA6IFwiXCIpICsgKHNlY3VyZSA/IFwiOyBzZWN1cmVcIiA6IFwiXCIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gQ29va2llLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJlYWRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyBpdCBvciByZXR1cm5zIGZhbHNlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEByZXR1cm5zIHtzdHJpbmd8Ym9vbGVhbn1cbiAgICovXG5cblxuICBDb29raWUuZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBhcnJheSBmcm9tIGRvY3VtZW50IGNvb2tpZSBzcGxpdCBieSA7XG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBhcnJDb29raWUgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBjb29raWVzXG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhcnJDb29raWUsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaSA9IF9yZWY7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBpdCBpcyBjb3JyZWN0IGNvb2tpZSBrZXkgcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICAgICAqL1xuICAgICAgICAgIGlmICh2WzBdID09PSBrZXkpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgdGhlIHZhbHVlIHdhcyBmb3VuZCByZXR1cm4gdGhlIHZhbHVlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodlsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGUgdmFsdWUgd2FzIG5vdCBmb3VuZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJlbW92ZXMgdGhlIHZhbHVlIGFuZCByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBDb29raWUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IGVtcHR5IG92ZXJkdWUgdmFsdWUgYnkga2V5XG4gICAgICAgICAqL1xuICAgICAgICBDb29raWUuc2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSwgXCJcIiwgLTEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gQ29va2llLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGFycmF5IG9mIHN0cmluZyBvZiBhdmFpbGFibGUga2V5c1xuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAqL1xuXG5cbiAgQ29va2llLmdldEtleXMgPSBmdW5jdGlvbiBnZXRLZXlzKGNoZWNrU3VwcG9ydCkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYXJyYXkgb2YgYXZhaWxhYmxlIGtleXNcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGFycktleXMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgYXJyYXkgZnJvbSBkb2N1bWVudCBjb29raWUgc3BsaXQgYnkgO1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgYXJyQ29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0ZXJhdGUgdGhyb3VnaCB0aGUgY29va2llc1xuICAgICAgICAgKi9cbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGFyckNvb2tpZSwgX2lzQXJyYXkyID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IyKSwgX2kyID0gMCwgX2l0ZXJhdG9yMiA9IF9pc0FycmF5MiA/IF9pdGVyYXRvcjIgOiBfaXRlcmF0b3IyW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5Mikge1xuICAgICAgICAgICAgaWYgKF9pMiA+PSBfaXRlcmF0b3IyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMiA9IF9pdGVyYXRvcjJbX2kyKytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTIgPSBfaXRlcmF0b3IyLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaTIuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMiA9IF9pMi52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaSA9IF9yZWYyO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVHJpbSBhbmQgc3BsaXQgZWFjaCBjb29raWUgYnkgPSBmb3Iga2V5IHZhbHVlIHBhcmVcbiAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIHYgPSBpLnRyaW0oKS5zcGxpdChcIj1cIiwgMik7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQWRkIGtleSB0byB0aGUgbGlzdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGFycktleXMucHVzaCh2WzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyS2V5cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIGNsZWFucyB0aGUgc3RvcmFnZSBhbmQgcmV0dXJuIHRydWUgaWYgaXQgaXMgZW1wdHlcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoY2hlY2tTdXBwb3J0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgQ29va2llLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgdmFyIGFycktleXMgPSBDb29raWUuZ2V0S2V5cyhjaGVja1N1cHBvcnQpO1xuICAgICAgICBpZiAoYXJyS2V5cykge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBhcnJLZXlzLCBfaXNBcnJheTMgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvcjMpLCBfaTMgPSAwLCBfaXRlcmF0b3IzID0gX2lzQXJyYXkzID8gX2l0ZXJhdG9yMyA6IF9pdGVyYXRvcjNbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgIHZhciBfcmVmMztcblxuICAgICAgICAgICAgaWYgKF9pc0FycmF5Mykge1xuICAgICAgICAgICAgICBpZiAoX2kzID49IF9pdGVyYXRvcjMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZjMgPSBfaXRlcmF0b3IzW19pMysrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9pMyA9IF9pdGVyYXRvcjMubmV4dCgpO1xuICAgICAgICAgICAgICBpZiAoX2kzLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmMyA9IF9pMy52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGkgPSBfcmVmMztcblxuICAgICAgICAgICAgQ29va2llLnJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIENvb2tpZS5nZXRLZXlzKGNoZWNrU3VwcG9ydCkubGVuZ3RoID09PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDb29raWU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvb2tpZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzQ29va2llLnRzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBkb2N1bWVudFxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBEb2N1bWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb2N1bWVudCgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERvY3VtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgaGVpZ2h0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBEb2N1bWVudC5nZXRIZWlnaHQgPSBmdW5jdGlvbiBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICByZXR1cm4gTWF0aC5tYXgob2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgd2lkdGhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBEb2N1bWVudC5nZXRXaWR0aCA9IGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGRvY3VtZW50IHRvcCBzY3JvbGxcbiAgICAgKiBAcGFyYW0gb2JqV2luZG93XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBEb2N1bWVudC5nZXRTY3JvbGxUb3AgPSBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICByZXR1cm4gb2JqV2luZG93LnBhZ2VZT2Zmc2V0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkgJiYgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGRvY3VtZW50IGxlZnQgc2Nyb2xsXG4gICAgICogQHBhcmFtIG9ialdpbmRvd1xuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgRG9jdW1lbnQuZ2V0U2Nyb2xsTGVmdCA9IGZ1bmN0aW9uIGdldFNjcm9sbExlZnQoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICByZXR1cm4gb2JqV2luZG93LnBhZ2VYT2Zmc2V0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5ib2R5ICYmIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgc2Nyb2xsc1xuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHt7bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIERvY3VtZW50LmdldFNjcm9sbCA9IGZ1bmN0aW9uIGdldFNjcm9sbCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiBEb2N1bWVudC5nZXRTY3JvbGxMZWZ0KG9ialdpbmRvdyksXG4gICAgICAgICAgICB0b3A6IERvY3VtZW50LmdldFNjcm9sbFRvcChvYmpXaW5kb3cpXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBEb2N1bWVudDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRG9jdW1lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0RvY3VtZW50LnRzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBET01cbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRE9NID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERPTSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERPTSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGVsZW1lbnQgc2l6ZXMgYW5kIHBvc2l0aW9uXG4gICAgICogQHBhcmFtIGRvbU5vZGVcbiAgICAgKiBAcGFyYW0gZG9tRG9jdW1lbnRcbiAgICAgKiBAcGFyYW0gc2hvd0ZvcmNlXG4gICAgICogQHJldHVybiB7e2JvdHRvbTogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG4gICAgRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlKSB7XG4gICAgICAgIHZhciBkb21Eb2N1bWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG4gICAgICAgIHZhciBzaG93Rm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZG9tTm9kZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZG9tTm9kZSA9IGRvbURvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRvbU5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdHlsZXMgPSB2b2lkIDA7XG4gICAgICAgIGlmIChzaG93Rm9yY2UpIHtcbiAgICAgICAgICAgIHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZG9tTm9kZSk7XG4gICAgICAgICAgICBpZiAoc3R5bGVzICYmIHN0eWxlcy5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgICAgIGRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgb2JqUmV0ID0ge1xuICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRvbU5vZGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgZGVmYXVsdCBtZXRob2QgaXMgc3VwcG9ydGVkIHRoYW4gdXNlIGl0XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmIChkb21Ob2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICAgICAgICAgIG9ialJldCA9IGRvbU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSUUgaGFja1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIG9ialJldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiBvYmpSZXQuYm90dG9tLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG9ialJldC5oZWlnaHQgfHwgZG9tTm9kZS5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IG9ialJldC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICByaWdodDogb2JqUmV0LnJpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB0b3A6IG9ialJldC50b3AsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvYmpSZXQud2lkdGggfHwgZG9tTm9kZS5jbGllbnRXaWR0aFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFdyaXRlIHRoZSBlbGVtZW50IGluIGEgdGVtcG9yYXJ5IHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFyIGRvbUVsZW1lbnQgPSBkb21Ob2RlO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENhbGN1bGF0ZWQgYmFzaWMgcGFyYW1ldGVycyBvZiB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFyIG9iakNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGRvbUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogZG9tRWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQXJlIHBhc3NlZCBvbiB0byBhbGwgcGFyZW50cyBhbmQgdGFrZSBpbnRvIGFjY291bnQgdGhlaXIgb2Zmc2V0c1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHdoaWxlIChkb21FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG9iakNvb3JkaW5hdGVzLnggKz0gZG9tRWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgICAgICBvYmpDb29yZGluYXRlcy55ICs9IGRvbUVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgICAgICBkb21FbGVtZW50ID0gZG9tRWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBvYmpSZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogb2JqQ29vcmRpbmF0ZXMueSArIG9iakNvb3JkaW5hdGVzLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvYmpDb29yZGluYXRlcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IG9iakNvb3JkaW5hdGVzLngsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBvYmpDb29yZGluYXRlcy54ICsgb2JqQ29vcmRpbmF0ZXMud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogb2JqQ29vcmRpbmF0ZXMueSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG9iakNvb3JkaW5hdGVzLndpZHRoXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvd0ZvcmNlICYmIGRvbU5vZGUpIHtcbiAgICAgICAgICAgIGRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBzaXplIGFuZCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIG9ialJldDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmluZCBlbGVtZW50IHBvc2l0aW9uXG4gICAgICogQHBhcmFtIGRvbU5vZGVcbiAgICAgKiBAcGFyYW0gc2hvd0ZvcmNlXG4gICAgICogQHJldHVybiB7e3RvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fVxuICAgICAqL1xuICAgIERPTS5maW5kRWxlbWVudFBvc2l0aW9uID0gZnVuY3Rpb24gZmluZEVsZW1lbnRQb3NpdGlvbihkb21Ob2RlKSB7XG4gICAgICAgIHZhciBzaG93Rm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gICAgICAgIHZhciBsZWZ0ID0gMDtcbiAgICAgICAgdmFyIHRvcCA9IDA7XG4gICAgICAgIHdoaWxlIChkb21Ob2RlKSB7XG4gICAgICAgICAgICB2YXIgc3R5bGVzID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKHNob3dGb3JjZSkge1xuICAgICAgICAgICAgICAgIHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZG9tTm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlcyAmJiBzdHlsZXMuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tTm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxlZnQgKz0gZG9tTm9kZS5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgdG9wICs9IGRvbU5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgZG9tTm9kZSA9IGRvbU5vZGUub2Zmc2V0UGFyZW50O1xuICAgICAgICAgICAgaWYgKHNob3dGb3JjZSAmJiBkb21Ob2RlKSB7XG4gICAgICAgICAgICAgICAgZG9tTm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGQgZXZlbnQgbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gb2JqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqL1xuXG5cbiAgICBET00uYWRkRXZlbnQgPSBmdW5jdGlvbiBhZGRFdmVudChvYmosIG5hbWUsIGZ1bmMpIHtcbiAgICAgICAgaWYgKG9iai5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBvYmouYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICBvYmouYXR0YWNoRXZlbnQoXCJvblwiICsgbmFtZSwgZnVuYyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBldmVudCBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSBvYmpcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICovXG5cblxuICAgIERPTS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KG9iaiwgbmFtZSwgZnVuYykge1xuICAgICAgICBpZiAob2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9iai5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChvYmouZGV0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgIG9iai5kZXRhY2hFdmVudChcIm9uXCIgKyBuYW1lLCBmdW5jKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIERPTS5oYXNDbGFzc05hbWUgPSBmdW5jdGlvbiBoYXNDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIHJldHVybiAoXCIgXCIgKyBlbGVtZW50LmNsYXNzTmFtZSArIFwiIFwiKS5pbmRleE9mKFwiIFwiICsgY2xhc3NOYW1lICsgXCIgXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZCBjbGFzcyBuYW1lXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG5cblxuICAgIERPTS5hZGRDbGFzc05hbWUgPSBmdW5jdGlvbiBhZGRDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmICghRE9NLmhhc0NsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUpKSB7XG4gICAgICAgICAgICB2YXIgY2wgPSBlbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gY2wgPyBjbCArIFwiIFwiICsgY2xhc3NOYW1lIDogY2xhc3NOYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGNsYXNzIG5hbWVcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cblxuXG4gICAgRE9NLnJlbW92ZUNsYXNzTmFtZSA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgIGZvciAodmFyIGkgPSBjbGFzc2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAoY2xhc3Nlc1tpXSA9PT0gY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oXCIgXCIpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBjbGFzcyBuYW1lXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICogQHBhcmFtIHRvZ2dsZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuXG5cbiAgICBET00udG9nZ2xlQ2xhc3NOYW1lID0gZnVuY3Rpb24gdG9nZ2xlQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSwgdG9nZ2xlKSB7XG4gICAgICAgIGlmICh0b2dnbGUpIHtcbiAgICAgICAgICAgIERPTS5hZGRDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERPTS5yZW1vdmVDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIG9sZENsYXNzTmFtZVxuICAgICAqIEBwYXJhbSBuZXdDbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cblxuXG4gICAgRE9NLnJlcGxhY2VDbGFzcyA9IGZ1bmN0aW9uIHJlcGxhY2VDbGFzcyhlbGVtZW50LCBvbGRDbGFzc05hbWUsIG5ld0NsYXNzTmFtZSkge1xuICAgICAgICBET00ucmVtb3ZlQ2xhc3NOYW1lKGVsZW1lbnQsIG9sZENsYXNzTmFtZSk7XG4gICAgICAgIERPTS5hZGRDbGFzc05hbWUoZWxlbWVudCwgbmV3Q2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZWxlbWVudCBieSB0YWcgbmFtZSBhbmQgaW5kZXhcbiAgICAgKiBAcGFyYW0gdG5cbiAgICAgKiBAcGFyYW0gY29udGV4dFxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqIEByZXR1cm4ge05vZGV9XG4gICAgICovXG5cblxuICAgIERPTS5nZXRFbGVtZW50QnlUYWdOYW1lID0gZnVuY3Rpb24gZ2V0RWxlbWVudEJ5VGFnTmFtZSh0biwgY29udGV4dCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNvbnQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuICAgICAgICB2YXIgZWxzID0gY29udC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0bik7XG4gICAgICAgIGlmIChudWxsID09IGluZGV4IHx8IGlzTmFOKGluZGV4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbHNbaW5kZXhdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgbGluZSBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIERPTS5nZXRMaW5lSGVpZ2h0ID0gZnVuY3Rpb24gZ2V0TGluZUhlaWdodCgpIHtcbiAgICAgICAgdmFyIHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIHZhciBsaW5lSGVpZ2h0ID0gc3R5bGVzLmxpbmVIZWlnaHQ7XG4gICAgICAgIHZhciBsaW5lSGVpZ2h0RGlnID0gcGFyc2VJbnQobGluZUhlaWdodCwgMTApO1xuICAgICAgICB2YXIgZm9udFNpemUgPSBzdHlsZXMuZm9udFNpemU7XG4gICAgICAgIHZhciBmb250U2l6ZURpZyA9IHBhcnNlSW50KGZvbnRTaXplLCAxMCk7XG4gICAgICAgIGlmIChpc0Zpbml0ZShsaW5lSGVpZ2h0RGlnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpbmVIZWlnaHREaWc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm9udFNpemVEaWc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIERPTTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRE9NO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNET00udHNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBJbXBvcnQgYWRkaXRpb25hbCBjbGFzc2VzXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9VdGlsc0RPTSA9IHJlcXVpcmUoXCIuL1V0aWxzRE9NXCIpO1xuXG52YXIgX1V0aWxzRE9NMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzRE9NKTtcblxudmFyIF9VdGlsc1dpbmRvdyA9IHJlcXVpcmUoXCIuL1V0aWxzV2luZG93XCIpO1xuXG52YXIgX1V0aWxzV2luZG93MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzV2luZG93KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIE1vdXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vdXNlKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW91c2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGlzZSBtb3VzZSBkZWx0YVxuICAgICAqIEBwYXJhbSBlXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIE1vdXNlLmdldFdoZWVsRGVsdGEgPSBmdW5jdGlvbiBnZXRXaGVlbERlbHRhKGUpIHtcbiAgICAgICAgdmFyIGRlbHRhID0gdm9pZCAwO1xuICAgICAgICB2YXIgZGVsdGFYID0gdm9pZCAwO1xuICAgICAgICB2YXIgZGVsdGFZID0gdm9pZCAwO1xuICAgICAgICAvLyBPbGQgc2Nob29sIHNjcm9sbHdoZWVsIGRlbHRhXG4gICAgICAgIGlmIChcImRldGFpbFwiIGluIGUpIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IGUuZGV0YWlsICogLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwid2hlZWxEZWx0YVwiIGluIGUpIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJ3aGVlbERlbHRhWVwiIGluIGUpIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YVk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwid2hlZWxEZWx0YVhcIiBpbiBlKSB7XG4gICAgICAgICAgICBkZWx0YVggPSBlLndoZWVsRGVsdGFYICogLTE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmlyZWZveCA8IDE3IGhvcml6b250YWwgc2Nyb2xsaW5nIHJlbGF0ZWQgdG8gRE9NTW91c2VTY3JvbGwgZXZlbnRcbiAgICAgICAgaWYgKFwiYXhpc1wiIGluIGUgJiYgZS5heGlzID09PSBlLkhPUklaT05UQUxfQVhJUykge1xuICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFZICogLTE7XG4gICAgICAgICAgICBkZWx0YVkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5ldyBzY2hvb2wgd2hlZWwgZGVsdGEgKHdoZWVsIGV2ZW50KVxuICAgICAgICBpZiAoXCJkZWx0YVlcIiBpbiBlKSB7XG4gICAgICAgICAgICBkZWx0YVkgPSBlLmRlbHRhWSAqIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcImRlbHRhWFwiIGluIGUpIHtcbiAgICAgICAgICAgIGRlbHRhWCA9IGUuZGVsdGFYO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5lZWQgdG8gY29udmVydCBsaW5lcyBhbmQgcGFnZXMgdG8gcGl4ZWxzIGlmIHdlIGFyZW5cInQgYWxyZWFkeSBpbiBwaXhlbHNcbiAgICAgICAgLy8gVGhlcmUgYXJlIHRocmVlIGRlbHRhIG1vZGVzOlxuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDAgaXMgYnkgcGl4ZWxzLCBub3RoaW5nIHRvIGRvXG4gICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMSBpcyBieSBsaW5lc1xuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDIgaXMgYnkgcGFnZXNcbiAgICAgICAgaWYgKGUuZGVsdGFNb2RlID09PSAxKSB7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IF9VdGlsc0RPTTIuZGVmYXVsdC5nZXRMaW5lSGVpZ2h0KCk7XG4gICAgICAgICAgICBkZWx0YVkgPSBkZWx0YVkgKiBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFYICogbGluZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmIChlLmRlbHRhTW9kZSA9PT0gMikge1xuICAgICAgICAgICAgdmFyIHdpbmRvd2hlZ2lodCA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5nZXRIZWlnaHQoKTtcbiAgICAgICAgICAgIGRlbHRhWSA9IGRlbHRhWSAqIHdpbmRvd2hlZ2lodDtcbiAgICAgICAgICAgIGRlbHRhWCA9IGRlbHRhWCAqIHdpbmRvd2hlZ2lodDtcbiAgICAgICAgfVxuICAgICAgICBkZWx0YSA9IGRlbHRhWSA9PT0gMCA/IGRlbHRhWCA6IGRlbHRhWTtcbiAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgIH07XG5cbiAgICByZXR1cm4gTW91c2U7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1vdXNlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNNb3VzZS50c1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggd2luZG93XG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFdpbmRvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXaW5kb3coKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXaW5kb3cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB3aW5kb3cgaGVpZ2h0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBXaW5kb3cuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gZ2V0SGVpZ2h0KCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHdpbmRvdyB3aWR0aFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFdpbmRvdy5nZXRXaWR0aCA9IGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHdpbmRvdyBzaXplc1xuICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIFdpbmRvdy5nZXRTaXplcyA9IGZ1bmN0aW9uIGdldFNpemVzKCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlaWdodDogV2luZG93LmdldEhlaWdodChvYmpXaW5kb3cpLFxuICAgICAgICAgICAgd2lkdGg6IFdpbmRvdy5nZXRXaWR0aChvYmpXaW5kb3cpXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBXaW5kb3c7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFdpbmRvdztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzV2luZG93LnRzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBzY3JlZW5cbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjcmVlbigpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNjcmVlbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBpbmZvXG4gICAgICogQHJldHVybiB7e2F2YWlsYWJsZVNpemU6IHtoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn0sIGNvbG9yRGVwdGg6IG51bWJlciwgcGl4ZWxSYXRpbzogbnVtYmVyLCBzaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9fX1cbiAgICAgKi9cbiAgICBTY3JlZW4uZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhdmFpbGFibGVTaXplOiBTY3JlZW4uZ2V0QXZhaWxhYmxlU2l6ZXMoKSxcbiAgICAgICAgICAgIGNvbG9yRGVwdGg6IFNjcmVlbi5nZXRDb2xvckRlcHRoKCksXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBTY3JlZW4uZ2V0UGl4ZWxSYXRpbygpLFxuICAgICAgICAgICAgc2l6ZTogU2NyZWVuLmdldFNpemVzKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gaGVpZ2h0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldEhlaWdodCA9IGZ1bmN0aW9uIGdldEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5oZWlnaHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIHdpZHRoXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldFdpZHRoID0gZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW4ud2lkdGg7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIHNpemVzXG4gICAgICogQHJldHVybiB7e2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldFNpemVzID0gZnVuY3Rpb24gZ2V0U2l6ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWlnaHQ6IFNjcmVlbi5nZXRIZWlnaHQoKSxcbiAgICAgICAgICAgIHdpZHRoOiBTY3JlZW4uZ2V0V2lkdGgoKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBoZWlnaHRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBTY3JlZW4uZ2V0QXZhaWxhYmxlSGVpZ2h0ID0gZnVuY3Rpb24gZ2V0QXZhaWxhYmxlSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gc2NyZWVuLmF2YWlsSGVpZ2h0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiB3aWR0aFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRBdmFpbGFibGVXaWR0aCA9IGZ1bmN0aW9uIGdldEF2YWlsYWJsZVdpZHRoKCkge1xuICAgICAgICByZXR1cm4gc2NyZWVuLmF2YWlsV2lkdGg7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIHNpemVzXG4gICAgICogQHJldHVybiB7e2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldEF2YWlsYWJsZVNpemVzID0gZnVuY3Rpb24gZ2V0QXZhaWxhYmxlU2l6ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWlnaHQ6IFNjcmVlbi5nZXRBdmFpbGFibGVIZWlnaHQoKSxcbiAgICAgICAgICAgIHdpZHRoOiBTY3JlZW4uZ2V0QXZhaWxhYmxlV2lkdGgoKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBwaXhlbCByYXRpb1xuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldFBpeGVsUmF0aW8gPSBmdW5jdGlvbiBnZXRQaXhlbFJhdGlvKCkge1xuICAgICAgICB2YXIgcmF0aW8gPSAxO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5zY3JlZW4uc3lzdGVtWERQSSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93LnNjcmVlbi5sb2dpY2FsWERQSSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuc2NyZWVuLnN5c3RlbVhEUEkgPiB3aW5kb3cuc2NyZWVuLmxvZ2ljYWxYRFBJKSB7XG4gICAgICAgICAgICByYXRpbyA9IHdpbmRvdy5zY3JlZW4uc3lzdGVtWERQSSAvIHdpbmRvdy5zY3JlZW4ubG9naWNhbFhEUEk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXRpbztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gY29sb3IgZGVwdGhcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRDb2xvckRlcHRoID0gZnVuY3Rpb24gZ2V0Q29sb3JEZXB0aCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5jb2xvckRlcHRoO1xuICAgIH07XG5cbiAgICByZXR1cm4gU2NyZWVuO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTY3JlZW47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc1NjcmVlbi50c1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggc3lzdGVtXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFN5c3RlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTeXN0ZW0oKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTeXN0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzeXN0ZW0gaW5mb1xuICAgICAqIEByZXR1cm4ge3tuYW1lOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZ319XG4gICAgICovXG4gICAgU3lzdGVtLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogU3lzdGVtLmdldE5hbWUoKSxcbiAgICAgICAgICAgIHZlcnNpb246IFN5c3RlbS5nZXRWZXJzaW9uKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBPUyBuYW1lXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBTeXN0ZW0uZ2V0TmFtZSA9IGZ1bmN0aW9uIGdldE5hbWUoKSB7XG4gICAgICAgIHZhciBvcyA9IFwiXCI7XG4gICAgICAgIHZhciBjbGllbnRTdHJpbmdzID0gW3tcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDEwXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDguMVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgOFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyA3fFdpbmRvd3MgTlQgNi4xKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgN1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9XaW5kb3dzIE5UIDYuMC8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgVmlzdGFcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvV2luZG93cyBOVCA1LjIvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIFNlcnZlciAyMDAzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgWFBcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDIwMDBcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbiA5eCA0LjkwfFdpbmRvd3MgTUUpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBNRVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyA5OHxXaW45OCkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDk4XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyA5NVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyBOVCA0LjB8V2luTlQ0LjB8V2luTlR8V2luZG93cyBOVCkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIE5UIDQuMFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9XaW5kb3dzIENFLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBDRVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9XaW4xNi8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgMy4xMVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9BbmRyb2lkLyxcbiAgICAgICAgICAgIHM6IFwiQW5kcm9pZFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9PcGVuQlNELyxcbiAgICAgICAgICAgIHM6IFwiT3BlbiBCU0RcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvU3VuT1MvLFxuICAgICAgICAgICAgczogXCJTdW4gT1NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKExpbnV4fFgxMSkvLFxuICAgICAgICAgICAgczogXCJMaW51eFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oaVBob25lfGlQYWR8aVBvZCkvLFxuICAgICAgICAgICAgczogXCJpT1NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvTWFjIE9TIFgvLFxuICAgICAgICAgICAgczogXCJNYWMgT1MgWFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvLFxuICAgICAgICAgICAgczogXCJNYWMgT1NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvUU5YLyxcbiAgICAgICAgICAgIHM6IFwiUU5YXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1VOSVgvLFxuICAgICAgICAgICAgczogXCJVTklYXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL0JlT1MvLFxuICAgICAgICAgICAgczogXCJCZU9TXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL09TXFwvMi8sXG4gICAgICAgICAgICBzOiBcIk9TLzJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvLFxuICAgICAgICAgICAgczogXCJTZWFyY2ggQm90XCJcbiAgICAgICAgfV07XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGNsaWVudFN0cmluZ3MsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY3MgPSBfcmVmO1xuXG4gICAgICAgICAgICBpZiAoY3Muci50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICAgICAgb3MgPSBjcy5zO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBPUyB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBTeXN0ZW0uZ2V0VmVyc2lvbiA9IGZ1bmN0aW9uIGdldFZlcnNpb24oKSB7XG4gICAgICAgIHZhciBvcyA9IFN5c3RlbS5nZXROYW1lKCk7XG4gICAgICAgIHZhciBvc1ZlcnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXTtcbiAgICAgICAgICAgIG9zID0gXCJXaW5kb3dzXCI7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChvcykge1xuICAgICAgICAgICAgY2FzZSBcIk1hYyBPUyBYXCI6XG4gICAgICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFsuX1xcZF0rKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KVsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJBbmRyb2lkXCI6XG4gICAgICAgICAgICAgICAgb3NWZXJzaW9uID0gL0FuZHJvaWQgKFsuX1xcZF0rKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KVsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpT1NcIjpcbiAgICAgICAgICAgICAgICB2YXIgcmVnID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xuICAgICAgICAgICAgICAgIG9zVmVyc2lvbiA9IHJlZ1sxXSArIFwiLlwiICsgcmVnWzJdICsgXCIuXCIgKyAocmVnWzNdIHx8IDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3NWZXJzaW9uO1xuICAgIH07XG5cbiAgICByZXR1cm4gU3lzdGVtO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTeXN0ZW07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc1N5c3RlbS50c1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggdXNlclxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfVXRpbHNCcm93c2VyID0gcmVxdWlyZShcIi4vVXRpbHNCcm93c2VyXCIpO1xuXG52YXIgX1V0aWxzQnJvd3NlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0Jyb3dzZXIpO1xuXG52YXIgX1V0aWxzU2NyZWVuID0gcmVxdWlyZShcIi4vVXRpbHNTY3JlZW5cIik7XG5cbnZhciBfVXRpbHNTY3JlZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTY3JlZW4pO1xuXG52YXIgX1V0aWxzU3lzdGVtID0gcmVxdWlyZShcIi4vVXRpbHNTeXN0ZW1cIik7XG5cbnZhciBfVXRpbHNTeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTeXN0ZW0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVc2VyKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXNlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHVzZXIgaW5mb1xuICAgICAqIEByZXR1cm4ge3ticm93c2VyOiB7YnJvd3Nlcjogc3RyaW5nLCBtb2JpbGU6IGJvb2xlYW4sIHZlcnNpb246IHN0cmluZ30sIHNjcmVlbjoge2F2YWlsYWJsZVNpemU6IHtoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn0sIGNvbG9yRGVwdGg6IG51bWJlciwgcGl4ZWxSYXRpbzogbnVtYmVyLCBzaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9fSwgc3lzdGVtOiB7bmFtZTogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmd9fX1cbiAgICAgKi9cbiAgICBVc2VyLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJvd3NlcjogX1V0aWxzQnJvd3NlcjIuZGVmYXVsdC5nZXRJbmZvKCksXG4gICAgICAgICAgICBzY3JlZW46IF9VdGlsc1NjcmVlbjIuZGVmYXVsdC5nZXRJbmZvKCksXG4gICAgICAgICAgICBzeXN0ZW06IF9VdGlsc1N5c3RlbTIuZGVmYXVsdC5nZXRJbmZvKClcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFVzZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFVzZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc1VzZXIudHNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gQ29uc3RhbnRzIHRhYmxlXG5cdCAgICB2YXIgVCA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcblx0ICAgICAgICAgICAgVFtpXSA9IChNYXRoLmFicyhNYXRoLnNpbihpICsgMSkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIE1ENSBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIE1ENSA9IENfYWxnby5NRDUgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KFtcblx0ICAgICAgICAgICAgICAgIDB4Njc0NTIzMDEsIDB4ZWZjZGFiODksXG5cdCAgICAgICAgICAgICAgICAweDk4YmFkY2ZlLCAweDEwMzI1NDc2XG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBvZmZzZXRfaSA9IG9mZnNldCArIGk7XG5cdCAgICAgICAgICAgICAgICB2YXIgTV9vZmZzZXRfaSA9IE1bb2Zmc2V0X2ldO1xuXG5cdCAgICAgICAgICAgICAgICBNW29mZnNldF9pXSA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDgpICB8IChNX29mZnNldF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgMjQpIHwgKE1fb2Zmc2V0X2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzAgID0gTVtvZmZzZXQgKyAwXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEgID0gTVtvZmZzZXQgKyAxXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzIgID0gTVtvZmZzZXQgKyAyXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzMgID0gTVtvZmZzZXQgKyAzXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzQgID0gTVtvZmZzZXQgKyA0XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzUgID0gTVtvZmZzZXQgKyA1XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzYgID0gTVtvZmZzZXQgKyA2XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzcgID0gTVtvZmZzZXQgKyA3XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzggID0gTVtvZmZzZXQgKyA4XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzkgID0gTVtvZmZzZXQgKyA5XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEwID0gTVtvZmZzZXQgKyAxMF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMSA9IE1bb2Zmc2V0ICsgMTFdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTIgPSBNW29mZnNldCArIDEyXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEzID0gTVtvZmZzZXQgKyAxM107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xNCA9IE1bb2Zmc2V0ICsgMTRdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTUgPSBNW29mZnNldCArIDE1XTtcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhbGJlc1xuXHQgICAgICAgICAgICB2YXIgYSA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBiID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIGMgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgZCA9IEhbM107XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzAsICA3LCAgVFswXSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF8xLCAgMTIsIFRbMV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMiwgIDE3LCBUWzJdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzMsICAyMiwgVFszXSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF80LCAgNywgIFRbNF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfNSwgIDEyLCBUWzVdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzYsICAxNywgVFs2XSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF83LCAgMjIsIFRbN10pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfOCwgIDcsICBUWzhdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzksICAxMiwgVFs5XSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8xMCwgMTcsIFRbMTBdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzExLCAyMiwgVFsxMV0pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTIsIDcsICBUWzEyXSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF8xMywgMTIsIFRbMTNdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE0LCAxNywgVFsxNF0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTUsIDIyLCBUWzE1XSk7XG5cblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEsICA1LCAgVFsxNl0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfNiwgIDksICBUWzE3XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8xMSwgMTQsIFRbMThdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzAsICAyMCwgVFsxOV0pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfNSwgIDUsICBUWzIwXSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8xMCwgOSwgIFRbMjFdKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE1LCAxNCwgVFsyMl0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfNCwgIDIwLCBUWzIzXSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF85LCAgNSwgIFRbMjRdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzE0LCA5LCAgVFsyNV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMywgIDE0LCBUWzI2XSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF84LCAgMjAsIFRbMjddKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEzLCA1LCAgVFsyOF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMiwgIDksICBUWzI5XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF83LCAgMTQsIFRbMzBdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEyLCAyMCwgVFszMV0pO1xuXG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF81LCAgNCwgIFRbMzJdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzgsICAxMSwgVFszM10pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTEsIDE2LCBUWzM0XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8xNCwgMjMsIFRbMzVdKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEsICA0LCAgVFszNl0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfNCwgIDExLCBUWzM3XSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF83LCAgMTYsIFRbMzhdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEwLCAyMywgVFszOV0pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTMsIDQsICBUWzQwXSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF8wLCAgMTEsIFRbNDFdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzMsICAxNiwgVFs0Ml0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfNiwgIDIzLCBUWzQzXSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF85LCAgNCwgIFRbNDRdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEyLCAxMSwgVFs0NV0pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTUsIDE2LCBUWzQ2XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8yLCAgMjMsIFRbNDddKTtcblxuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfMCwgIDYsICBUWzQ4XSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF83LCAgMTAsIFRbNDldKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE0LCAxNSwgVFs1MF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfNSwgIDIxLCBUWzUxXSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF8xMiwgNiwgIFRbNTJdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzMsICAxMCwgVFs1M10pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTAsIDE1LCBUWzU0XSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF8xLCAgMjEsIFRbNTVdKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzgsICA2LCAgVFs1Nl0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTUsIDEwLCBUWzU3XSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF82LCAgMTUsIFRbNThdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEzLCAyMSwgVFs1OV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfNCwgIDYsICBUWzYwXSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8xMSwgMTAsIFRbNjFdKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzIsICAxNSwgVFs2Ml0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfOSwgIDIxLCBUWzYzXSk7XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWxIID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbEwgPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxIIDw8IDgpICB8IChuQml0c1RvdGFsSCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxIIDw8IDI0KSB8IChuQml0c1RvdGFsSCA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gKFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEwgPDwgOCkgIHwgKG5CaXRzVG90YWxMID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEwgPDwgMjQpIHwgKG5CaXRzVG90YWxMID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgKTtcblxuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gKGRhdGFXb3Jkcy5sZW5ndGggKyAxKSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2hhc2g7XG5cdCAgICAgICAgICAgIHZhciBIID0gaGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBIX2kgPSBIW2ldO1xuXG5cdCAgICAgICAgICAgICAgICBIW2ldID0gKCgoSF9pIDw8IDgpICB8IChIX2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgKCgoSF9pIDw8IDI0KSB8IChIX2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBGRihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKChiICYgYykgfCAofmIgJiBkKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBHRyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKChiICYgZCkgfCAoYyAmIH5kKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBISChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKGIgXiBjIF4gZCkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBJSShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKGMgXiAoYiB8IH5kKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuTUQ1KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5NRDUod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5NRDUgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihNRDUpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY01ENShtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNNRDUgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoTUQ1KTtcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuTUQ1O1xuXG59KSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NyeXB0by1qcy9tZDUuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKipcblx0ICogQ3J5cHRvSlMgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0dmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgKGZ1bmN0aW9uIChNYXRoLCB1bmRlZmluZWQpIHtcblx0ICAgIC8qXG5cdCAgICAgKiBMb2NhbCBwb2x5ZmlsIG9mIE9iamVjdC5jcmVhdGVcblx0ICAgICAqL1xuXHQgICAgdmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBGKCkge307XG5cblx0ICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICAgICAgICB2YXIgc3VidHlwZTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG9iajtcblxuXHQgICAgICAgICAgICBzdWJ0eXBlID0gbmV3IEYoKTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG51bGw7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSlcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDcnlwdG9KUyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGlicmFyeSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2xpYiA9IEMubGliID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZSBvYmplY3QgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZSA9IChmdW5jdGlvbiAoKSB7XG5cblxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdmVycmlkZXMgUHJvcGVydGllcyB0byBjb3B5IGludG8gdGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnLFxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIG1ldGhvZDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTcGF3blxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YnR5cGUgPSBjcmVhdGUodGhpcyk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEF1Z21lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLm1peEluKG92ZXJyaWRlcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGluaXRpYWxpemVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIXN1YnR5cGUuaGFzT3duUHJvcGVydHkoJ2luaXQnKSB8fCB0aGlzLmluaXQgPT09IHN1YnR5cGUuaW5pdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemVyJ3MgcHJvdG90eXBlIGlzIHRoZSBzdWJ0eXBlIG9iamVjdFxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0LnByb3RvdHlwZSA9IHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlZmVyZW5jZSBzdXBlcnR5cGVcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyID0gdGhpcztcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEV4dGVuZHMgdGhpcyBvYmplY3QgYW5kIHJ1bnMgdGhlIGluaXQgbWV0aG9kLlxuXHQgICAgICAgICAgICAgKiBBcmd1bWVudHMgdG8gY3JlYXRlKCkgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgaW5zdGFuY2UgPSBNeVR5cGUuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZXh0ZW5kKCk7XG5cdCAgICAgICAgICAgICAgICBpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBvYmplY3QuXG5cdCAgICAgICAgICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGFkZCBzb21lIGxvZ2ljIHdoZW4geW91ciBvYmplY3RzIGFyZSBjcmVhdGVkLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgICAgICAvLyAuLi5cblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ29waWVzIHByb3BlcnRpZXMgaW50byB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdG8gbWl4IGluLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgTXlUeXBlLm1peEluKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJ1xuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBtaXhJbjogZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJRSB3b24ndCBjb3B5IHRvU3RyaW5nIHVzaW5nIHRoZSBsb29wIGFib3ZlXG5cdCAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBwcm9wZXJ0aWVzLnRvU3RyaW5nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBpbnN0YW5jZS5jbG9uZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSwgNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogNDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlbmNvZGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uY2F0ZW5hdGVzIGEgd29yZCBhcnJheSB0byB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5IHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkxLmNvbmNhdCh3b3JkQXJyYXkyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB0aGlzV29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhpc1NpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRTaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB0aGlzLmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29uY2F0XG5cdCAgICAgICAgICAgIGlmICh0aGlzU2lnQnl0ZXMgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0Qnl0ZSA9ICh0aGF0V29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpc1NpZ0J5dGVzICsgaSkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSA9IHRoYXRXb3Jkc1tpID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAobV93KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbV93ID0gbV93O1xuXHQgICAgICAgICAgICAgICAgdmFyIG1feiA9IDB4M2FkZTY4YjE7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFzayA9IDB4ZmZmZmZmZmY7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbV96ID0gKDB4OTA2OSAqIChtX3ogJiAweEZGRkYpICsgKG1feiA+PiAweDEwKSkgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIG1fdyA9ICgweDQ2NTAgKiAobV93ICYgMHhGRkZGKSArIChtX3cgPj4gMHgxMCkpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gKChtX3ogPDwgMHgxMCkgKyBtX3cpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgLz0gMHgxMDAwMDAwMDA7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDAuNTtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICogKE1hdGgucmFuZG9tKCkgPiAuNSA/IDEgOiAtMSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCByY2FjaGU7IGkgPCBuQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIF9yID0gcigocmNhY2hlIHx8IE1hdGgucmFuZG9tKCkpICogMHgxMDAwMDAwMDApO1xuXG5cdCAgICAgICAgICAgICAgICByY2FjaGUgPSBfcigpICogMHgzYWRlNjdiNztcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goKF9yKCkgKiAweDEwMDAwMDAwMCkgfCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3J5cHRvLWpzL2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJzb3VyY2VSb290IjoiIn0=