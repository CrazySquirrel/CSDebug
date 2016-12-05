"use strict";
declare var require: any;
require("./index.html");

let CSDebugClass = require("../../lib/CSDebug.js");
let CSDebug = new CSDebugClass(true);
CSDebug.log("123");
