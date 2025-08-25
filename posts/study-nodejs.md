---
title: "Core Concepts of Node.js"
date: "2025-08-25"
excerpt: "An introduction to the Node.js runtime environment, its event-driven, non-blocking I/O model, and its role in modern backend development."
mainCategory: "papers"
tags: ["Backend", "Node.js", "JavaScript"]
lang: "en"
---

## Node.js

## What is Node.js?

It's a Javascript runtime, and a runtime is a program or environment that runs other programs, so it can build Javascript applications and run in the computer, it was built in C++ and uses V8 Javascript engine that Chrome uses.
Mostly used for developing server-side & networking apps/apis, it allows to use Javascript to write server side code.

## How does it work?

Built on top of the **V8 JS Engine**(is what it takes the JavaScript code and converts to machine code) and **`Node.js`** has taken this engine and extended to work on the server side.

It's non-blocking, meaning that it doesn't wait around for I/O operations, networking, etc.
It uses events and callbacks, allowing to handle thousands of connections at the same time.

**`Node.js`** has a single main thread that executes the JavaScript code, so there is only one set of instructions that are executed at a time, **`Node.js`** uses something called **`Event Loop`** which is a mechanism that allows it to perform non-blocking operations.

## CommonJS Modules

Node.js way of keeping code organized, reusable, and preventing different parts of the program from stepping on each other toes.

Each file is treated as its own module, variables and functions defined in one module are private to that module by default, unless you explicitly choose to share them.

Choose specific functions, objects, or values from the module that you want to make available for other modules to use, done using **`module.exports`** or **`exports`**

Can bring in the exported functionality from other modules into your current module using the `require()` function.

1. **`mathUtils.js`** (module that exports something)

```javascript
// This function is private to this module by default
const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

// We want to make the 'add' and 'subtract' functions available to other files
module.exports = {
  addFunction: add, // We can even rename it when exporting
  subtractFunction: subtract,
};

// Alternatively, a common shorthand:
// module.exports.add = add;
// module.exports.subtract = subtract;
//
// Or even:
// exports.add = add;
// exports.subtract = subtract;
// (Note: `exports` is a shorthand for `module.exports`. There are some subtleties, but for basics, think of them as similar.)
```

2. **`app.js`** (This file will use the mathUtils.js module)

```javascript
// We use 'require' to import the functionality from 'mathUtils.js'
// Node.js knows to look for a file named mathUtils.js (or .node, or .json) in the same directory
const myMathHelpers = require("./mathUtils"); // The './' means "in the current directory"

let sum = myMathHelpers.addFunction(5, 3); // Use the exported 'addFunction'
let difference = myMathHelpers.subtractFunction(10, 4); // Use the exported 'subtractFunction'

console.log("The sum is:", sum); // Output: The sum is: 8
console.log("The difference is:", difference); // Output: The difference is: 6

// The 'add' and 'subtract' variables from inside mathUtils.js are NOT directly accessible here.
// console.log(myMathHelpers.add); // This would be undefined
```

**`require()`:** The function used to import modules. It reads the module file, executes it, and returns the `module.exports` object.

**`module.exports` (or `exports`):** A special object in each module that you assign values (functions, objects, variables) to if you want them to be usable by other modules.

**File-based modules:** Typically, one file equals one module.

**Synchronous:** When you `require()` a module, Node.js usually loads and processes it right then and there before moving on. This is generally fine for server-side code where files are loaded from disk quickly.

**Historically the default in Node.js:** For a long time, CommonJS was the primary way to handle modules in Node.js.

## ES Module

To use this need to add in **`package.json`** `"type": "module"`
**ES Modules**, which is the **official, standardized way to handle modules in JavaScript itself.**
It's part of the official JavaScript language standard (ECMAScript, hence "ES"), it's designed to work everywhere JavaScript runs – in your web browser and in modern versions of Node.js.

1. **`mathUtils.mjs` (This is our module that exports something):** _(Notice the `.mjs` extension, often used to explicitly tell Node.js this is an ES Module. Alternatively, you can configure your project to treat `.js` files as ES Modules.)_

```javascript
// This function is private to this module by default
const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

// --- Ways to export ---

// 1. Named Exports (exporting multiple things by name)
export const addFunction = add;
export const subtractFunction = subtract;

// You can also export them directly when defining them:
// export const addFunction = (a, b) => a + b;
// export const PI = 3.14159;

// 2. Default Export (exporting one primary thing from the module)
// A module can have multiple named exports, but only one default export.
// export default function multiply(a, b) {
//   return a * b;
// }
// Or:
// const multiply = (a,b) => a * b;
// export default multiply;
```

2. `app.mjs` (This file will use the `mathUtils.mjs` module):

```javascript
// --- Ways to import ---

// 1. Importing Named Exports
// You use curly braces {} to import specific named exports.
// The names inside the braces must match the exported names.
import { addFunction, subtractFunction } from "./mathUtils.mjs";

let sum = addFunction(5, 3);
let difference = subtractFunction(10, 4);

console.log("The sum is:", sum); // Output: The sum is: 8
console.log("The difference is:", difference); // Output: The difference is: 6

// You can also rename them during import:
// import { addFunction as sumUp, subtractFunction as takeAway } from './mathUtils.mjs';
// let total = sumUp(10, 5);

// 2. Importing a Default Export
// If mathUtils.mjs had a default export (e.g., `export default multiply;`):
// import anyNameYouWantForIt from './mathUtils.mjs'; // No curly braces for default import
// let product = anyNameYouWantForIt(3, 4);
// console.log(product);

// 3. Importing everything as a namespace (useful for many named exports)
// import * as MathHelpers from './mathUtils.mjs';
// let result1 = MathHelpers.addFunction(2,2);
// let result2 = MathHelpers.subtractFunction(5,1);
```

## HTTP Module & Create Server

Built in toolbox from **Node.js**, called **`http`** module, that gives JavaScript program the ability to understand and speak HTTP.

**Node.js** program can:

1. **`Act like a web server:`** Listen to incoming HTTP requests from browsers(or other programs) and send back HTTP responses.
2. **`Act like a web client:`** Make HTTP requests(fetch data)

Creating a Server with **`http.CreateServer()`**
**Listens** for incoming connection and requests
**Process** those requests
Send back **responses**

Node.js provides a function in the `http` module called `createServer()`. When you call this function, you're essentially saying, "Okay, Node.js, I want to build a new web server."

The crucial part is that you give `createServer()` a **function**. This function is your "order handler." It will be automatically called **every single time** your server receives a new request from a web browser or client.

```javascript
const http = require("http"); // First, get the 'http' module (like getting your toolkit)

// This is your "order handler" function
const requestHandler = (request, response) => {
  // 'request' object: Contains all info about the customer's order
  // (e.g., what URL they asked for, what data they sent)
  console.log("Someone made a request! They asked for:", request.url);

  // 'response' object: This is what you use to send your reply back
  // Let's send a simple "Hello from my server!" message

  // 1. Set the status code and headers (like saying "Everything is OK, and I'm sending you plain text")
  response.writeHead(200, { "Content-Type": "text/plain" });

  // 2. Write the actual content of the response
  response.write("Hello from my Node.js Server!");

  // 3. End the response (this actually sends it to the browser)
  response.end();
};

// Create the server and tell it to use our 'requestHandler' for every incoming request
const server = http.createServer(requestHandler);
```

**`server.listen()` - Opening for Business:** Just creating the server isn't enough. You need to tell it which "address" and "door number" to listen on. This is what `server.listen()` does.

```javascript
// ... (code from above) ...

const port = 3000; // We'll use port 3000 for our lemonade stand
const hostname = "127.0.0.1"; // Listen on our own computer

server.listen(port, hostname, () => {
  console.log(`Server is open for business at http://${hostname}:${port}/`);
  console.log(`Go to http://localhost:${port} in your browser!`);
});
```

## Environment Variables & .env Files

Key value pairs that live outside the code and tells the application how to behave in different environments (development, production, etc).

**`Why?`**

- Keep sensitive data(API keys, database passwords) out of the source code
- Different settings for dev vs production without code changes
- Never hardcoded secrets

**`The .env File`**
A **.env** file stores the environment variables in a simple format:

```
DATABASE_URL=mongodb://localhost:27017/myapp
API_KEY=sk-1234567890abcdef
PORT=3000
NODE_ENV=development
```

**Using .env in Node.js**

1. **Install dotenv package:**

```
npm install dotenv
```

2. **Load it at the top of the main file:**

```javascript
require("dotenv").config();

// Now you can access variables
const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;
```

3. Example usage:

```javascript
const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

- Never commit `.env` files to git
- `.env` .example with dummy values to show what variables are needed
- Access them with `process.env.VARIABLE_NAME`

## Postman

Is an API testing tool, lets send HTTP requests (**GET, POST, PUT, DELETE, etc**)

**Test APIs before coding** - See what data an API returns
**Debug API issues** - Test API directly in Postman
**Learn HTTP methods** - Understand GET vs POST vs PUT
**See response formats** - JSON structure by examining real API responses

## Middleware

Is basically a **code that runs between a request and a response**, like a filter or checkpoint that every request passes through

It sits in the middle of the request-response cycle and can:

- Examine the incoming request
- Modify the request or response
- Execute some code
- Pass control to the next middleware or end the cycle

**How it works**

```javascript
app.use((req, res, next) => {
  // This runs for every request
  console.log("Request received at:", new Date());
  next(); // Pass control to next middleware
});
```

- **`req`** = incoming request data
- **`res`** = response you will send back
- **`next()`** = function that passes control to the next middleware

Middleware runs in order, each one either calls **`next()`** to continue the chain, or send a response to end it.

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

## File System Modules

fs module to work with files and directories.

**Basic Setup**

```javascript
import fs from "fs";
import fs from "fs/promises";
```

**Synchronous(Blocking)** - Code waits for file operation to complete

```javascript
const data = fs.readFileSync("file.txt", "utf8");
console.log(data);
```

**Asynchronous(Non-Blocking)** - Code continues while operation happens

```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
	if (err) thro err;
	console.log(data);
});
```

**Essential Methods**

Reading Files

```javascript
// Read entire file
fs.readFile("data.txt", "utf8", (err, data) => {
  console.log(data);
});

// Check if file exists
fs.access("file.txt", fs.constants.F_OK, (err) => {
  console.log(err ? "File does not exist" : "File exists");
});
```

Writing Files

```javascript
// Write (overwrites existing)
fs.writeFile("output.txt", "Hello World", (err) => {
  if (err) throw err;
  console.log("File saved!");
});

// Append to file
fs.appendFile("log.txt", "New line\n", (err) => {
  if (err) throw err;
});
```

Working with directories

```javascript
// Read directory contents
fs.readdir("./folder", (err, files) => {
  console.log(files); // Array of filenames
});

// Create directory
fs.mkdir("new-folder", (err) => {
  if (err) throw err;
});
```

Promises with **`fs/promises`**

```javascript
async function readFileExample() {
  try {
    const data = await fs.readFile("mytext.txt", "utf8");
    console.log("File content (with promises):\n" + data);
  } catch (err) {
    console.error("Error reading file (with promises):", err);
  }
}

readFileExample();

async function writeFileExample() {
  try {
    await fs.writeFile("newfile_promises.txt", "Hello via Promises! 🚀");
    console.log("File written successfully (with promises)!");
  } catch (err) {
    console.error("Error writing file (with promises):", err);
  }
}

writeFileExample();
```

- Always handle errors with callbacks
- Use `'utf8'` encoding for text files
- Async methods are preferred for better performance
- Sync methods block your entire application
- File paths are relative to where you run the script

## Path Module

Work with filed and directories path in cross-platform way.

**Basic Setup**

```javascript
import path from "path";
```

**Essential Methods**
**`path.join()`** - Combine path segments

```javascript
path.join("/users", "john", "documents", "file.txt");
//Result: 'users/john/documents/file.txt'
```

**`path.resolve()`** - Creates absolute path

```javascript
path.resolve("file.txt");
//result: '/current/working/directory/file.txt'
```

**`path.extname()`** - Gets file extension

```javascript
path.extname("photo.jpg"); // '.jpg'
path.extname("README"); // ''
```

**`path.basename()`** - Gets filename

```javascript
path.basename("/users/john/photo.jpg"); // 'photo.jpg'
path.basename("/users/john/photo.jpg", ".jpg"); // 'photo'
```

**`path.dirname()`** - Gets directory name

```javascript
path.dirname("/users/john/photo.jpg"); // '/users/john'
```

`__dirname `= absolute path of the working directory
`__filename` = full path including file name

```javascript
const path = require("path");

// Bad way (fragile)
const configPath = "./config/database.json";

// Good way (reliable)
const configPath = path.join(__dirname, "config", "database.json");
```

## OS Module

gives you access to operating system information and utilities

**Basic Setup**

```javascript
import os from "os";
```

**Essential Methods**
**Get system info:**

```javascript
os.platform(); // 'win32', 'darwin', 'linux'
os.arch(); // 'x64', 'arm64', etc.
os.type(); // 'Windows_NT', 'Darwin', 'Linux'
os.release(); // OS version
```

**Memory and CPU:**

```javascript
os.totalmem(); // Total RAM in bytes
os.freemem(); // Available RAM in bytes
os.cpus(); // Array of CPU info (cores, model, speed)
```

**User and directories:**

```js
os.homedir(); // User's home directory
os.tmpdir(); // Temp directory path
os.userInfo(); // Current user details
```

**Network:**

```js
os.networkInterfaces(); // Network interface info
os.hostname(); // Computer name
```

```js
console.log(`Platform: ${os.platform()}`);
console.log(`RAM: ${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`);
console.log(`Free RAM: ${(os.freemem() / 1024 ** 3).toFixed(2)} GB`);
console.log(`CPU Cores: ${os.cpus().length}`);
console.log(`Home: ${os.homedir()}`);
```

## URL Module

Help working with URLs, parsing, building, extracting.

**Basic Setup**

```javascript
import url from "url";
```

The **`URL`** constructor:

```js
const myUrl = new URL(
  "https://www.example.com:8080/products/shoes?color=red&size=10#reviews"
);

console.log(myUrl.protocol); // 'https:'
console.log(myUrl.hostname); // 'www.example.com'
console.log(myUrl.port); // '8080'
console.log(myUrl.pathname); // '/products/shoes'
console.log(myUrl.search); // '?color=red&size=10'
console.log(myUrl.hash); // '#reviews'

// Bonus: Easy access to search parameters
console.log(myUrl.searchParams.get("color")); // 'red'
console.log(myUrl.searchParams.get("size")); // '10'
```

**Building URLs:**

```js
const myUrl = new URL("https://api.example.com/users");
myUrl.searchParams.append("page", "2");
myUrl.searchParams.append("limit", "50");
console.log(myUrl.toString()); // 'https://api.example.com/users?page=2&limit=50'
```

**Parsing URLs from requests:**

```js
const requestUrl = new URL(req.url, "http://localhost:3000");
const userId = requestUrl.searchParams.get("userId");
```

## Crypto Module

Module for cryptographic operations

Basic Setup\*\*

```javascript
import crypto from "crpto";
```

**Essential Methods**
**Hashing**

```js
// Create a hash
const hash = crypto.createHash("sha256");
hash.update("my secret data");
const digest = hash.digest("hex");
console.log(digest); // Output: long hex string

// One-liner version
const quickHash = crypto.createHash("sha256").update("data").digest("hex");
```

**Encryption (AES)**

```js
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16); // initialization vector

// Encrypt
const cipher = crypto.createCipher(algorithm, key);
let encrypted = cipher.update("secret message", "utf8", "hex");
encrypted += cipher.final("hex");

// Decrypt
const decipher = crypto.createDecipher(algorithm, key);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");
```

**Random Generation**

```js
// Generate random bytes
const randomBytes = crypto.randomBytes(16); // 16 random bytes
const randomHex = crypto.randomBytes(16).toString("hex"); // as hex string

// Generate random integers
const randomInt = crypto.randomInt(0, 100); // 0-99
```

**Password Hashing** - Use bcrypt library instead, but crypto can create salted hashes **API Tokens** - Generate secure random strings **Data Encryption** - Protect sensitive information in databases **Digital Signatures** - Verify data integrity and authenticity **UUID Generation** - Though uuid library is more common

- Always use `randomBytes()` for generating keys/IVs, never hardcode them
- For passwords, use bcrypt or similar instead of plain hashing
- AES-256-GCM is generally preferred over CBC for new applications
- Store keys securely, separate from encrypted data

## Events Module

Events are actions or occurrences that happen in the application, like a user clicking a button, file finishing its download, data arriving from db.
**`events`** modules lets you create and handle custom events.

**EventEmitter Class**
Core class that handles events, like a notification system
**Setup**

```js
import { EventEmmitter } from "events";
```

```js
// Create an event emitter instance
const myEmitter = new EventEmitter();
```

**Basic pattern: listen -> emit**
**Set up listener(when event occurs)**

```js
myEmitter.on("eventName", () => {
  console.log("Event happened!");
});
```

**Emit the event(trigger it)**

```js
myEmitter.emit("eventName");
// Output: Event happened!
```

```js
// Listen for 'userLogin' event
myEmitter.on("userLogin", (username) => {
  console.log(`${username} just logged in`);
});

// Listen for same event with different handler
myEmitter.on("userLogin", (username) => {
  console.log(`Welcome back, ${username}!`);
});

// Trigger the event
myEmitter.emit("userLogin", "john_doe");
// Output:
// john_doe just logged in
// Welcome back, john_doe!
```

- `on(event, listener)` - Add a listener
- `emit(event, ...args)` - Trigger an event
- `once(event, listener)` - Listen only once
- `off(event, listener)` - Remove a listener

**Process Object**
Global object that gives information about the current Node.js process running in the code.
processes are available everywhere in the Node.js app, like a control panel for the running program

**Most Important Properties:**

```js
// Get command line arguments
console.log(process.argv);
// Example output: ['/usr/bin/node', '/path/to/your/script.js', 'arg1', 'arg2']

// Environment variables (like API keys, database URLs)
console.log(process.env.NODE_ENV); // 'development', 'production', etc.
console.log(process.env.PORT); // Port number from environment

// Current working directory
console.log(process.cwd()); // '/Users/yourname/your-project'

// Process ID
console.log(process.pid); // 1234 (unique number for this running process)
```

**Most Important Methods:**

```js
// Exit the program
process.exit(0); // 0 = success, 1 = error

// Listen for when the program is about to exit
process.on("exit", () => {
  console.log("Program is shutting down...");
});

// Handle unhandled errors
process.on("uncaughtException", (error) => {
  console.log("Something went wrong:", error);
  process.exit(1);
});
```

```js
// Check if we're in development or production
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
} else {
  console.log("Running in development mode");
}

// Get command line arguments (like: node app.js --port 3000)
const args = process.argv.slice(2); // Remove first 2 elements
console.log("Arguments passed:", args);
```
