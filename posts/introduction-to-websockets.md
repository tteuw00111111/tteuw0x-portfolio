## WebSockets

Is a protocol designed for bidirectional web server communication in real time.
Capable of sending and receiving data simultaneously over `TCP` connection.
In a regular HTTP web request the client open the connection and requests data from the server, server process the request and then build the response and sends back to the client.

Typically works in three stages, the client establishes an appropriate web socket connection using an `WebSocket` handshake, if the server accepts the protocol, it responds via header to complete the handshake, and then `WebSocket` replaces the connection with `TCP` connection.

At this point both parties are going to start sending data, `WebSocket` handler will be connected by the user(`WebSocket` handler is a lightweight machine which keeps and open connection with all the active users)

#### `HandShake`

The client opens a regular HTTP connection to the server specifying the desired `WebSocket` endpoint in the URL, usually prefixed with `ws` or `wss`. HTTP `GET` request with a specific header to indicate the intention to upgrade to `WebSocket`

```
GET / HTTP/1.1
Host: localhost:8080
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

`Sec-WebSocket-Key` contains a random generated `b64` encoding string unique to this handshake, it will be used by the server to verify the handshake later.

Then, when the server gets this HTTP `GET` request from the client, it checks the request headers to ensure they are valid for a `WebSocket` handshake, and sends an HTTP response with a status code of 101(switching protocols)

The handshake from the server looks like this:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

The server verifies the presence of `Upgrade: websocket` and `Connection: Upgrade`, now the primary goal is processing and generating the `Sec-WebSocket-Accept` header to prove to the client that the server recognized it as a valid handshake initiation, willing to proceed.
And the server can confirm it comes from a genuine `WebSocket` connection, not a malicious actor attempting to impersonate a `WebSocket` connection.

Server receives the `b64` encoded string, generates a new string by concatenating the received key with a predefined `GUID` like this (`258EAFA5-E914-47DA-95CA-C5AB0DC85B11`) and then applies a cryptographic hash function like `SHA-1`, then encodes in `B64`.

**`ws`** x **`socket.io`**
`ws` is a `Node.js` library to use `WebSockets`, `socket.io` is a library, not just a wrapper around `WebSocket` API, it has its own metadata, session IDs, and a fallback mechanism (Engine.IO) that can use HTTP long-polling if a `WebSocket` connection can't be established has its own handshake protocol layered on top of the standard `WebSocket` one.

A standard `ws` client and a `socket.io ` server cannot talk to each other out of the box, must use `socket.io-client` on the `frontend` to talk to a `socket.io` server.

#### After `HandShake`

Broadcast patterns are fundamental routing techniques for managing message flow.

**`Simple Broadcast`**
One message comes in, and the server sends it to **every single connected client**.
**ws** you must manually iterate over the set of connected clients.

```js
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

// The 'clients' property is a Set of all active WebSocket connections.
wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("Received: %s", data);

    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      // Check if the client's connection is still open before sending
      if (client.readyState === ws.OPEN) {
        client.send(data.toString()); // Ensure data is in a sendable format
      }
    });
  });
});
```

**`socket.io` Example:** The library provides a simple, built-in method.

```js
import { Server } from "socket.io";
const io = new Server(3000);

io.on("connection", (socket) => {
  socket.on("public message", (msg) => {
    // This sends the message to every connected client, including the sender.
    io.emit("public update", msg);
  });
});
```

**`Broadcast to All But Sender`**

Everyone else should see the message except the sender.

**`ws` Example:** During your loop, you just add a check to skip the original sender.

```js
// Inside the wss.on('connection', ...) block
ws.on("message", function message(data) {
  // Broadcast to all clients EXCEPT the sender
  wss.clients.forEach(function each(client) {
    // The check `client !== ws` is the key
    if (client !== ws && client.readyState === ws.OPEN) {
      client.send(data.toString());
    }
  });
});
```

**`socket.io` Example:** Again, `socket.io` provides a beautifully clean shortcut.

```js
// Inside the io.on('connection', ...) block
socket.on("chat message", (msg) => {
  // 'socket.broadcast' is the magic here.
  socket.broadcast.emit("new message", msg);
});
```

**`Targeted Broadcasts (Rooms/Channels)`**

Most powerful pattern and a primary reason developers choose `socket.io`. You group clients into logical "rooms" (e.g., 'game-lobby-123', 'support-ticket-456') and send messages only to clients in that room.

**`socket.io` Example:** This is a first-class feature in `socket.io`.

```js
import { Server } from "socket.io";
const io = new Server(3000);

io.on("connection", (socket) => {
  // Let a client join a specific room
  socket.on("join room", (roomName) => {
    socket.join(roomName);

    // Send a welcome message just to that client
    socket.emit("feedback", `Welcome to room: ${roomName}`);

    // Announce to everyone else in the room that a new user has joined
    socket.to(roomName).emit("notification", `User ${socket.id} has joined.`);
  });

  // Handle messages intended for a specific room
  socket.on("room message", ({ room, message }) => {
    // Send the message only to clients in that room (including the sender)
    io.to(room).emit("new message", message);
  });
});
```

#### **Memory Hooks**

1. **The Radio Station Analogy:**
   - **Simple Broadcast (`io.emit`)**: An AM/FM radio station. It transmits on one frequency, and any radio tuned in can hear it.
   - **Rooms (`io.to('room')`):** A set of walkie-talkies all set to Channel 5. Only the people on Channel 5 can talk to each other, while another group uses Channel 8. `socket.join('room')` is like turning your dial to the correct channel.
2. **The Postal Service Analogy:**

   - **Broadcast But Sender (`socket.broadcast.emit`)**: A "reply all" email. You send a message to a group, and everyone _but you_ gets the notification.
   - **Rooms (`io.to('room')`):** A targeted mail merge. You have a list of specific addresses (`room`), and you send a personalized letter (`message`) only to that list, ignoring everyone else.
