"use strict";
/**
 * Import interface
 */
import ICSDebug from "../Interfaces/ICSDebug";
import IError from "../Interfaces/IError";
import IWindow from "../Interfaces/IWindow";

declare let window: IWindow;
declare let global: any;
/**
 * Declare error interface
 */
declare let Error: IError;

let root;

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
function log(e?: any) {
  return e || null;
}
/**
 * Console polyfill
 */
((_global) => {
  if (
      typeof _global !== "undefined"
  ) {
    if (!_global.console) {
      _global.console = {};
    }
    const con = _global.console;
    let prop;
    let method;
    const dummy = () => {
      return null;
    };
    const properties = ["memory"];
    const methods = ("assert,clear,count,debug,dir,dirxml,error,exception,group," +
    "groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd," +
    "show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn").split(",");
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
})(typeof root === "undefined" ? this : root);
/**
 * Push this into console methods
 */
let that: ICSDebug;
declare var module: any;
declare var require: any;

import CSLoggerClass from "CSLogger/lib/CSLogger";

let CSLogger;

import UtilsMain from "Utils/lib/UtilsMain";
/**
 * Debug class
 */
class CSDebug implements ICSDebug {

  /**
   * Clone object safely
   * @param obj
   * @param deep
   * @return {{}}
   */
  public static cloneObjectSafely(obj: any, deep: number): any {
    const newObj = {};
    if (deep < 2) {
      for (let j = 0; j < obj.length; j++) {
        const i = obj[j];
        if (obj.hasOwnProperty(i)) {
          if (typeof obj[i] === "object") {
            newObj[i] = CSDebug.cloneObjectSafely(obj[i], deep + 1);
          } else {
            newObj[i] = obj[i];
          }
        }
      }
    }
    return newObj;
  }

  /**
   * Declare debug properties
   */
  public use: boolean;
  public arrLog: any[];
  public console: any;
  public debugConsole: HTMLElement;

  /**
   * Debug constructor
   * @param localUse
   * @param settings
   */
  constructor(localUse: boolean, settings: any = {}) {
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
        warn: root.console.warn || root.console.log || log(),
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

    CSLogger = CSLoggerClass(settings.CSLogger || {});

    UtilsMain.implementationStaticMethods(this, "CSDebug");
  }

  /**
   * Init debug console dom element
   */
  public initDebugConsole() {
    /**
     * If body exist
     */
    if (
        typeof window !== "undefined" &&
        typeof window.document !== "undefined" &&
        typeof window.document.body !== "object"
    ) {
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
  }

  /**
   * Debug error method
   * @param strMessage
   * @param AdditionalMessage
   */
  public error(strMessage: any, ...AdditionalMessage: any[]) {
    /**
     * Write debug message in error mode
     */
    that.write("error", strMessage);
    /**
     * Processing additional parameters
     */
    if (AdditionalMessage.length > 0) {
      for (let i = 0; i < AdditionalMessage.length; i++) {
        that.error(AdditionalMessage[i]);
      }
    }
  }

  /**
   * Debug warn method
   * @param strMessage
   * @param AdditionalMessage
   */
  public warn(strMessage: any, ...AdditionalMessage: any[]) {
    /**
     * Write debug message in warn mode
     */
    that.write("warn", strMessage);
    /**
     * Processing additional parameters
     */
    if (AdditionalMessage.length > 0) {
      for (let i = 0; i < AdditionalMessage.length; i++) {
        that.warn(AdditionalMessage[i]);
      }
    }
  }

  /**
   * Debug info method
   * @param strMessage
   * @param AdditionalMessage
   */
  public info(strMessage: any, ...AdditionalMessage: any[]) {
    /**
     * Write debug message in info mode
     */
    that.write("info", strMessage);
    /**
     * Processing additional parameters
     */
    if (AdditionalMessage.length > 0) {
      for (let i = 0; i < AdditionalMessage.length; i++) {
        that.info(AdditionalMessage[i]);
      }
    }
  }

  /**
   * Debug log method
   * @param strMessage
   * @param AdditionalMessage
   */
  public log(strMessage: any, ...AdditionalMessage: any[]) {
    /**
     * Write debug message in log mode
     */
    that.write("log", strMessage);
    /**
     * Processing additional parameters
     */
    if (AdditionalMessage.length > 0) {
      for (let i = 0; i < AdditionalMessage.length; i++) {
        that.log(AdditionalMessage[i]);
      }
    }
  }

  /**
   * Debug debug method
   * @param strMessage
   * @param AdditionalMessage
   */
  public debug(strMessage: any, ...AdditionalMessage: any[]) {
    /**
     * Write debug message in debug mode
     */
    that.write("debug", strMessage);
    /**
     * Processing additional parameters
     */
    if (AdditionalMessage.length > 0) {
      for (let i = 0; i < AdditionalMessage.length; i++) {
        that.debug(AdditionalMessage[i]);
      }
    }
  }

  /**
   * Get records from log by filters
   * @param strMode
   * @param strMessage
   * @param strStackMethod
   * @param strStackFile
   * @return {Array}
   */
  public getLogRects(strMode?: any, strMessage?: any, strStackMethod?: string, strStackFile?: string): any {
    /**
     * Result log stack
     */
    const arrResultLog = [];
    if (
        (
            strMode === undefined ||
            typeof strMode === "string"
        ) &&
        (
            strMessage === undefined ||
            typeof strMessage === "string"
        ) &&
        (
            strStackMethod === undefined ||
            typeof strStackMethod === "string"
        ) &&
        (
            strStackFile === undefined ||
            typeof strStackFile === "string"
        )
    ) {
      /**
       * Loop all log records
       */
      for (let j = 0; j < that.arrLog.length; j++) {
        const log = that.arrLog[j];
        /**
         * If mode or message filter set and it is not matched, than skip that row
         */
        if (
            (
                (typeof strMode === "string" && strMode) &&
                log.mode !== strMode
            ) ||
            (
                (typeof strMessage === "string" && strMessage) &&
                typeof log.message === "string" &&
                log.message.indexOf(strMessage) === -1
            )
        ) {
          continue;
        }
        /**
         * If method or file filter added
         */
        if (
            (typeof strStackMethod === "string" && strStackMethod) ||
            (typeof strStackFile === "string" && strStackFile)
        ) {
          /**
           * If rom has not stack, than skip it
           */
          if (!log.stack) {
            continue;
          } else {
            /**
             * If method and file doesn't math to the filter, than skip it
             */
            let isContinue: boolean = false;

            for (let x = 0; x < log.stack.length; x++) {
              const stack = log.stack[x];
              if (
                  (
                      (typeof strStackMethod === "string" && strStackMethod) &&
                      typeof stack.method === "string" &&
                      stack.method.indexOf(strStackMethod) === -1
                  ) ||
                  (
                      (typeof strStackFile === "string" && strStackFile) &&
                      typeof stack.file === "string" &&
                      stack.file.indexOf(strStackFile) === -1
                  )
              ) {
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
        arrResultLog.push(log);
      }
    }
    /**
     * Return result log stack
     */
    return arrResultLog;
  }

  /**
   * Get log record by ID
   * @param ID
   */
  public getLogRectByID(ID) {
    return that.arrLog[ID];
  }

  /**
   * Clean debug log
   */
  public clearLog() {
    that.arrLog = [];
  }

  /**
   * Write message into the log stack and console
   * @param mode
   * @param strMessage
   */
  public write(mode: string, strMessage: any): void {
    if (
        mode &&
        strMessage
    ) {
      if (typeof strMessage === "object") {
        strMessage = CSDebug.cloneObjectSafely(strMessage, 0);
      }
      /**
       * Create log object with mode, message and call stack parameters
       */
      const obj: any = {};
      obj.mode = mode;
      obj.message = strMessage;
      obj.stack = UtilsMain.stack();

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
          if (
              typeof root !== "undefined" &&
              typeof root.console !== "undefined" &&
              typeof that !== "undefined" &&
              typeof that.console !== "undefined"
          ) {
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
  }

  /**
   * Implementation of the console window error method
   * @param strMessage
   * @param AdditionalMessage
   * @public
   */
  public _error(strMessage: any, ...AdditionalMessage: any[]) {
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
          for (let i = 0; i < AdditionalMessage.length; i++) {
            that._error(AdditionalMessage[i]);
          }
        }
      } else {
        try {
          /**
           * Call console error method, if it is not supported call log method
           */
          if (
              typeof root !== "undefined" &&
              typeof root.console !== "undefined" &&
              typeof that !== "undefined" &&
              typeof that.console !== "undefined"
          ) {
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
  }

  /**
   * Implementation of the console window warn method
   * @param strMessage
   * @param AdditionalMessage
   * @public
   */
  public _warn(strMessage: any, ...AdditionalMessage: any[]) {
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
          for (let i = 0; i < AdditionalMessage.length; i++) {
            that._warn(AdditionalMessage[i]);
          }
        }
      } else {
        try {
          /**
           * Call console warn method, if it is not supported call log method
           */
          if (
              typeof root !== "undefined" &&
              typeof root.console !== "undefined" &&
              typeof that !== "undefined" &&
              typeof that.console !== "undefined"
          ) {
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
  }

  /**
   * Implementation of the console window info method
   * @param strMessage
   * @param AdditionalMessage
   * @public
   */
  public _info(strMessage: any, ...AdditionalMessage: any[]) {
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
          for (let i = 0; i < AdditionalMessage.length; i++) {
            that._info(AdditionalMessage[i]);
          }
        }
      } else {
        try {
          /**
           * Call console info method, if it is not supported call log method
           */
          if (
              typeof root !== "undefined" &&
              typeof root.console !== "undefined" &&
              typeof that !== "undefined" &&
              typeof that.console !== "undefined"
          ) {
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
  }

  /**
   * Implementation of the console window log method
   * @param strMessage
   * @param AdditionalMessage
   * @public
   */
  public _log(strMessage: any, ...AdditionalMessage: any[]) {
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
          for (let i = 0; i < AdditionalMessage.length; i++) {
            that._log(AdditionalMessage[i]);
          }
        }
      } else {
        try {
          /**
           * Call console log method
           */
          if (
              typeof root !== "undefined" &&
              typeof root.console !== "undefined" &&
              typeof that !== "undefined" &&
              typeof that.console !== "undefined"
          ) {
            if (typeof that.console.log === "function") {
              that.console.log.apply(root.console, arguments);
            }
          }
        } catch (e) {
          log(e);
        }
      }
    }
  }

  /**
   * Implementation of the console window debug method
   * @param strMessage
   * @param AdditionalMessage
   * @public
   */
  public _debug(strMessage: any, ...AdditionalMessage: any[]) {
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
          for (let i = 0; i < AdditionalMessage.length; i++) {
            that._debug(AdditionalMessage[i]);
          }
        }
      } else {
        try {
          /**
           * Call console debug method, if it is not supported call log method
           */
          if (
              typeof root !== "undefined" &&
              typeof root.console !== "undefined" &&
              typeof that !== "undefined" &&
              typeof that.console !== "undefined"
          ) {
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
  }
}

export default CSDebug;
module.exports = CSDebug;
