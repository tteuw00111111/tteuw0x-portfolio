---
title: "An Introduction to Express.js"
date: "2025-08-25"
excerpt: "A quick dive into the core concepts of Express.js, the popular Node.js web framework, including its powerful routing and middleware architecture."
mainCategory: "papers"
tags: ["Backend", "Node.js", "Web Development"]
lang: "en"
---

## What it is?

Minimal, fast, and flexible web application framework for Node.js, makes the foundations of building web servers and APIs much easier.
It provides:

- **Routing system** - handles different URL paths
- **Middleware support** - function that runs between request and response
- **Template engine integration **- rendering HTML pages
- **HTTP utilities** - simplified request/response handling

## Express Setup

```
npm init -y
npm install express
```

## Core Concepts

**Routes** - Define how the app respond to different endpoints:

```js
app.get("/users", (req, res) => {
  /* GET /users */
});
app.post("/users", (req, res) => {
  /* POST /users */
});
app.put("/users/:id", (req, res) => {
  /* PUT /users/123 */
});
app.delete("/users/:id", (req, res) => {
  /* DELETE /users/123 */
});
```

**Middleware** - Function that execute during the request-response cycle

```js
// Built-in middleware for parsing JSON
app.use(express.json());

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Important: calls next middleware
});
```

## res.sendFile() Method

Express way to send file directly from the server's file system to other client browser.

```js
res.sendFile(path, [options], [callback]);
```

- Takes an **absolute path** to a file on your server
- Reads that file from disk
- Sets appropriate HTTP headers (Content-Type based on file extension)
- Streams the file content to the client
- Handles errors automatically
  **Key requirement:** The path MUST be absolute, not relative.

```js
const express = require("express");
const path = require("path");
const app = express();

// ❌ This will throw an error - relative path
app.get("/wrong", (req, res) => {
  res.sendFile("index.html"); // Error!
});

// ✅ Correct ways:
app.get("/home", (req, res) => {
  // Using path.join() with __dirname (current directory)
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
  // Direct absolute path
  res.sendFile("/full/path/to/your/file.html");
});
```

## Express Static Middleware

Static middleware server files direclty without writing individual routes for each file. It's like turning a folder into a web-accessible directory

```js
app.use(express.static("public"));
```

```
project/
├── app.js
└── public/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── images/
    │   └── logo.png
    └── index.html
```

```js
app.use(express.static("public"));

// Now these URLs automatically work:
// http://localhost:3000/index.html
// http://localhost:3000/css/style.css
// http://localhost:3000/js/script.js
// http://localhost:3000/images/logo.png
```

**Advanced config**:

```js
// Serve with virtual path prefix
app.use("/assets", express.static("public"));
// Now: localhost:3000/assets/css/style.css

// Multiple static directories
app.use(express.static("public"));
app.use(express.static("uploads"));

// With options
app.use(
  express.static("public", {
    maxAge: "1d", // Browser caching
    index: "home.html", // Default file instead of index.html
  })
);
```

**When to use which?**
**Use `res.sendFile()`:**

- Serving specific files based on route logic
- Dynamic file serving (user uploads, generated files)
- When you need control over the serving process

**Use static middleware:**

- CSS, JS, images, fonts
- Any files that don't need processing
- Public assets that should be directly accessible

**Combining both:**

```js
const express = require("express");
const path = require("path");
const app = express();

// Static middleware for assets
app.use("/static", express.static("public"));

// Dynamic file serving with sendFile
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/dashboard", (req, res) => {
  // Could add authentication logic here
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});
```

## Route Files

Way to organize the application endpoints(URLs) into separate, manageable modules instead of cramming everything in one giant file.

Route files are like separated departments in a company, different departments for different types or requests.

**Without files(messy)**

```js
// app.js - everything in one file
const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  /* user logic */
});
app.post("/users", (req, res) => {
  /* user logic */
});
app.get("/products", (req, res) => {
  /* product logic */
});
app.post("/products", (req, res) => {
  /* product logic */
});
// ... 50 more routes = chaos
```

**With file routes**
Create separate route files

```js
// routes/users.js
const express = require("express");
const router = express.Router(); // This is the key piece

router.get("/", (req, res) => {
  res.json({ message: "Get all users" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create new user" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

module.exports = router; // Export the router
```

```js
// routes/products.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all products" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create new product" });
});

module.exports = router;
```

**Connect in the main**

```js
// app.js
const express = require("express");
const app = express();

// Import your route files
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

// Mount the routes with a base path
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(3000);
```

## Making requests from front-end

The back-end(Express.js server) and the front-end communicate through HTTP requests.

- **GET**: Retrieve data (like getting a list of users)
- **POST**: Send new data (like creating a new user)
- **PUT**: Update existing data (like editing a user profile)
- **DELETE**: Remove data (like deleting a user)

**Front-End: Making Requests**

```js
// GET request - fetching data
async function getUsers() {
  try {
    const response = await fetch("http://localhost:3000/api/users");
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error("Error:", error);
  }
}

// POST request - sending data
async function createUser(userData) {
  try {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const newUser = await response.json();
    console.log("User created:", newUser);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

**Express.js: Handling Requests**
In the Express server, set up routes that listen for these requests:

```js
const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// GET route - responds to front-end GET requests
app.get("/api/users", (req, res) => {
  // This runs when front-end makes GET request to /api/users
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];
  res.json(users); // Send data back to front-end
});

// POST route - responds to front-end POST requests
app.post("/api/users", (req, res) => {
  // req.body contains the data sent from front-end
  const newUser = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
  };

  // Here you'd typically save to database
  // For now, just send back the created user
  res.json(newUser);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**CORS**
If the front-end and Express server run on different ports (like front-end on 3001, Express on 3000), you'll need to handle CORS:

```js
// In your Express app
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
```
