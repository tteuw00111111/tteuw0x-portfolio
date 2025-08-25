---
title: "The Fundamentals of React"
date: "2025-08-25"
excerpt: "An introduction to React and its component-based architecture, virtual DOM, and declarative approach to building user interfaces."
mainCategory: "papers"
tags: ["React", "Frontend", "JavaScript"]
lang: "en"
---

Is JavaScript library for building user interfaces, elements that the user sees and interacts with on-screen.
By library, I mean, React provides a hand helpful of functions (APIs) to build UI, but leaves to the developer where to use those functions in their applications.

![React logo](/images/articles/react.png)

When a user visits a web page, the server returns an HTML file to the browser:

![Browser constructing the DOM tree](/images/articles/browser-dom-tree.png)
The browser then reads the HTML and constructs the DOM.

**What is DOM?**
**Document Object Model**, is an object representation of the HTML elements, acts like the bridge between the code and the user interface, having a tree like structure.

React core components

- Components
- Props
- State

**Why DOM?**
Web browser's primary objective is to interpret HTML and CSS files and render visual representation of them.

In its nature it's just a markup language, defines structures and content of a page, has no built-in mechanism for change after it's been loaded.

Where JavaScript comes in, make a website interactive, respond without full page reload. The DOM is the way of the programming language to talk to the rendered page.

The browser, after reading HTML, builds a tree-like structure of objects in memory, each HTML element is represented as a "node" in this tree, this JavaScript can access and manipulate these objects and any changes made to the DOM are instantly reflected in the UI.

**Components**
User interfaces can be broken down into smaller pieces, called components.
Components allow building self-contained blocks of code, that can be reusable, think of it like Lego bricks, can take these individual bricks and combine them together to form larger structures.

React components are just JavaScript.

![React components example](/images/articles/react2.png)

Creating components
Components are functions, inside the script tag. Can create a new function called header:
JSX (JavaScript XML) allows writing HTML in React.

```html
<script type="text/jsx">
  const app = document.getElementById('app');

  function header() {}

  const root = ReactDOM.createRoot(app);
  root.render(<h1>Develop. Preview. Ship.</h1>);
</script>
```

Component is a function that returns UI elements:

```html
<script type="text/jsx">
  const app = document.getElementById('app');

  function header() {
    return <h1>Develop. Preview. Ship.</h1>;
  }

  const root = ReactDOM.createRoot(app);
  root.render(<h1>Develop. Preview. Ship.</h1>);
</script>
```

**Props**
Read-only properties shared between components. If you want different components that do different things or have different labels, doesn't need to create a new component for every single variation, props (short for properties) are passed to components as attributes in JSX.

**Listening to Events**
In React, JSX elements can listening, waiting for a user action, called events, we can tell an element to listen for a click for example using `onClick`, other commons listeners include `onChange` (for inputs), `onMouseEnter`, `onMouseLeave`.

Button listen for a click:

```js
function AlertButton() {
  // We'll define what happens on the click in a moment.
  // For now, we're just listening.
  return <button onClick={/* some function will go here */}>Don't Click Me!</button>;
}
```

The button is listening for a user to click, right now if the user click it does nothing, but that's where event handling comes in.

**Handling Events**
Function defined to execute a specific task when the event occurs, create a function then pass its name as the value for the `onClick` prop.

```js
function ClickLoggerButton() {
  // This is our event handler function.
  function handleButtonClick() {
    console.log("The button was clicked!");
    alert("You clicked the button!");
  }

  // We pass the function itself, not the result of calling it.
  return <button onClick={handleButtonClick}>Click Me</button>;
}
```

Notice we are passing `handleButtonClick`, **not** `handleButtonClick()`. If we included the parentheses `()`, the function would run the moment the component renders, not when the button is clicked. We are giving the button a reference to the function to call later.

**State**
Like the component private memory, used to remember things that can change as the user interacts, like values in text field, current count in counter.

Different from props that are read-only information, state is managed inside the component itself, when the state is updated it automatically re-renders.

Hooks
To give memory to this component, hook is used. Special functions, always starting with use, let tap into React features.
`useState` when it's called it gives two things in an array:

1. Current position of the component, called state variable
2. Function that update the state

```javascript
import React, { useState } from "react";

function Counter() {
  // 1. Call useState to get the state variable and its setter function.
  // We set the initial state to 0.
  const [count, setCount] = useState(0);

  // This is an event handler that uses the setter function.
  function handleIncrement() {
    // We tell React to update the state to the new value.
    setCount(count + 1);
  }

  return (
    <div>
      <p>Current Count: {count}</p>
      {/* When this button is clicked, it calls our handler. */}
      <button onClick={handleIncrement}>Add 1</button>
    </div>
  );
}
```
