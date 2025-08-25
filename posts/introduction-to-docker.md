---
title: "Introduction to Docker and Containers"
date: "2025-08-25"
excerpt: "A look at the fundamentals of Docker, containerization, and how it simplifies application deployment and creates consistent development environments."
mainCategory: "papers"
tags: ["DevOps", "Containers", "Deployment"]
lang: "en"
---

## Docker

Is like a portable "dev box", any developer can run the project without that painful "it works on my machine". `docker-compose.yml` file act as the master blueprint.

#### `docker-compose.yml`

This is the panel control for the multi-service application, tells Docker what containers to build and how they interact with each other.

Example:

```yml
# docker-compose.yml

version: "3.8" # Specifies the version of the Compose file format

services:
  db: # Defines the PostgreSQL service
    image: postgres:15-alpine # Use the official PostgreSQL 15 image (lightweight Alpine version)
    restart: always # Always restart the container if it stops
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    ports:
      - "5432:5432" # Map port 5432 on your host machine to port 5432 in the container
    volumes:
      - postgres_data:/var/lib/postgresql/data # Persist database data on the host machine

  app: # Defines the Express.js service
    build: . # Build the image from the Dockerfile in the current directory
    ports:
      - "3000:3000" # Expose the Express server port
    depends_on:
      - db # Wait for the 'db' service to be healthy before starting this one

volumes:
  postgres_data: # Define the named volume for data persistence
```

#### **Persistent Data with Volumes**

If the db container is removed, all data vanished, to prevent this is possible to use a Docker Volume

```yaml
# ... inside the 'db' service definition
volumes:
  # Mounts the named volume 'postgres_data' to the directory inside the container
  # where PostgreSQL stores its data.
  - postgres_data:/var/lib/postgresql/data

# ... at the bottom of the file
volumes:
  postgres_data: # This officially creates the named volume 'postgres_data'
```

#### **Connecting Express to the Container**

Your Express app doesn't connect to `localhost`. Inside Docker's private network, containers can find each other using their service names as hostnames.

**Plain-English:** The `db` service gets its own network address inside Docker, like a private phone number. Your `app` service can call it directly using the name "db".

Example (`index.js` for Express):

```js
// index.js (Express Backend)

const express = require("express");
const { Pool } = require("pg"); // Use the 'pg' library for PostgreSQL

const app = express();
const port = 3000;

// Create a new Pool instance to manage connections
const pool = new Pool({
  user: "myuser",
  host: "db", // IMPORTANT: The hostname is the service name from docker-compose.yml
  database: "mydb",
  password: "mypassword",
  port: 5432,
});

app.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()"); // A simple query to test connection
    res.send(`Database time: ${result.rows[0].now}`);
    client.release();
  } catch (err) {
    console.error("Connection error", err.stack);
    res.status(500).send("Database connection failed");
  }
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
```
