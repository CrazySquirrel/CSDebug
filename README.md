
# CSDebug

[![npm version](https://badge.fury.io/js/CSDebug.svg)](https://github.com/CrazySquirrel/CSDebug)
[![Code Climate](https://codeclimate.com/github/CrazySquirrel/CSDebug/badges/gpa.svg)](https://codeclimate.com/github/CrazySquirrel/CSDebug)
[![Test Coverage](https://codeclimate.com/github/CrazySquirrel/CSDebug/badges/coverage.svg)](https://codeclimate.com/github/CrazySquirrel/CSDebug/coverage)
[![Issue Count](https://codeclimate.com/github/CrazySquirrel/CSDebug/badges/issue_count.svg)](https://codeclimate.com/github/CrazySquirrel/CSDebug)
[![Donate](https://img.shields.io/badge/donate-%E2%99%A5-red.svg)](http://crazysquirrel.ru/support/)

Class to extend the standard console.

## Build

The repository contains pre-compiled files, but if you want to add your
files and compile, then run the following commands in the repository folder.

* npm install
* npm run production

or

* npm run development

The build required NodeJs version 6 or higher.

```TypeScript
import CSDebug from "CSDebug.ts";

new CSDebug(true);
```

or

```JavaScript
let CSDebug = Debug("CSDebug.js");

new CSDebug(true);
```