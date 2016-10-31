# CSDebug
[![npm version](https://badge.fury.io/js/CSDebug.svg)](https://github.com/CrazySquirrel/CSDebug)
[![license](https://img.shields.io/github/license/CrazySquirrel/CSDebug.svg)](https://github.com/CrazySquirrel/CSDebug)
[![Github All Releases](https://img.shields.io/github/downloads/CrazySquirrel/CSDebug/total.svg)](https://github.com/CrazySquirrel/CSDebug)
[![npm version](https://img.shields.io/badge/donate-%E2%99%A5-red.svg)](http://crazysquirrel.ru/support/)

Class to extend the standard console.

## Build
The repository contains pre-compiled files, but if you want to add your files and compile, then run the following commands in the repository folder.
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