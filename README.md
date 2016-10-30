# Debug
[![npm version](https://badge.fury.io/js/Debug.svg)](https://github.com/CrazySquirrel/Debug)
[![license](https://img.shields.io/github/license/CrazySquirrel/Debug.svg)](https://github.com/CrazySquirrel/Debug)
[![Github All Releases](https://img.shields.io/github/downloads/CrazySquirrel/Debug/total.svg)](https://github.com/CrazySquirrel/Debug)
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
import Debug from "Debug.ts";

new Debug(true);
```

or

```JavaScript
let Debug = Debug("Debug.js");

new Debug(true);
```