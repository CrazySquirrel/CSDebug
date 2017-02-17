"use strict";
declare let require: any;
require("./index.html");

import CSDebugClass from "../../lib/CSDebug.ts";
let CSDebug = new CSDebugClass(true);
CSDebug.log("123");