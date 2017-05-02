"use strict";

declare let describe: any;
declare let it: any;
declare let expect: any;
declare let require: any;

import CSDebugClass from "../lib/CSDebug";

let CSDebug = new CSDebugClass(true);

describe("CSDebug", () => {

  it("CSDebug", () => {
    expect(typeof(CSDebugClass)).toEqual("function");
    expect(typeof(CSDebug)).toEqual("object");
  });

  it([
    "CSDebug._error",
    "CSDebug._warn",
    "CSDebug._info",
    "CSDebug._log",
    "CSDebug._debug",

    "CSDebug.console.error",
    "CSDebug.console.warn",
    "CSDebug.console.info",
    "CSDebug.console.log",
    "CSDebug.console.debug",

    "CSDebug.error",
    "CSDebug.warn",
    "CSDebug.info",
    "CSDebug.log",
    "CSDebug.debug",
  ].join("\n"), () => {
    let paramsValues: any = [undefined, false, true, 0, 100, "", "test", {}, () => {
    }, window];

    CSDebug.initDebugConsole();

    for (let set of paramsValues) {
      CSDebug._error(set);
      CSDebug._warn(set);
      CSDebug._info(set);
      CSDebug._log(set);
      CSDebug._debug(set);

      CSDebug.console.error(set);
      CSDebug.console.warn(set);
      CSDebug.console.info(set);
      CSDebug.console.log(set);
      CSDebug.console.debug(set);

      CSDebug.error(set);
      CSDebug.warn(set);
      CSDebug.info(set);
      CSDebug.log(set);
      CSDebug.debug(set);

      expect(CSDebug.getLogRects(set)).toBeArray();

      expect(CSDebug.getLogRects(set, set)).toBeArray();

      if (
          typeof set === "string"
      ) {
        expect(CSDebug.getLogRects("error")).toBeArray();
        expect(CSDebug.getLogRects("warn")).toBeArray();
        expect(CSDebug.getLogRects("info")).toBeArray();
        expect(CSDebug.getLogRects("log")).toBeArray();
        expect(CSDebug.getLogRects("debug")).toBeArray();

        expect(CSDebug.getLogRects("error").length).not.toEqual(0);
        expect(CSDebug.getLogRects("warn").length).not.toEqual(0);
        expect(CSDebug.getLogRects("info").length).not.toEqual(0);
        expect(CSDebug.getLogRects("log").length).not.toEqual(0);
        expect(CSDebug.getLogRects("debug").length).not.toEqual(0);

        expect(CSDebug.getLogRects("error", set)).toBeArray();
        expect(CSDebug.getLogRects("warn", set)).toBeArray();
        expect(CSDebug.getLogRects("info", set)).toBeArray();
        expect(CSDebug.getLogRects("log", set)).toBeArray();
        expect(CSDebug.getLogRects("debug", set)).toBeArray();

        expect(CSDebug.getLogRects("error", set).length).not.toEqual(0);
        expect(CSDebug.getLogRects("warn", set).length).not.toEqual(0);
        expect(CSDebug.getLogRects("info", set).length).not.toEqual(0);
        expect(CSDebug.getLogRects("log", set).length).not.toEqual(0);
        expect(CSDebug.getLogRects("debug", set).length).not.toEqual(0);
      }

      expect(CSDebug.getLogRectByID(CSDebug.arrLog.length - 1)).toEqual(CSDebug.arrLog[CSDebug.arrLog.length - 1]);
    }

    expect(CSDebug.arrLog).toBeArray();
  });
});
