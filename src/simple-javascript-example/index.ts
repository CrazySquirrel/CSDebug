"use strict";
declare let require: any;
require("./index.html");

let CSDebugClass = require("../../lib/CSDebug.ts");
let CSDebug = new CSDebugClass(true);
CSDebug.log("123");
