# Debug
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