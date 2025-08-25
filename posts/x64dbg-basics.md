---
title: "A Practical Guide to x64dbg Basics"
date: "2025-08-28"
excerpt: "A hands-on introduction to the x64dbg debugger for Windows, covering the main interface, setting breakpoints, and stepping through code."
mainCategory: "papers"
tags: ["Reverse Engineering", "Debugging", "Tools"]
lang: "en"
---

Notation of basic stuff that i didn't knew.

**Detect It Easy**
You can see the program **EntryPoint** and **ImageBase** here.(besides the compiler and other info)
**EntryPoint + ImageBase.**
With this should be easier to understand where are you, if you are in the program or in the OS.

**x64dbg Preferences**
Disable TLS Callbacks.

**Exceptions**(range of codes that the debugger will ignore at first)
This helps because it can bypass exception-based anti-debug tricks, and reduces the noise.
Add range, start from **00000000**
and end at **FFFFFFFF**

### GUI

![Main x64dbg interface with four panels](/images/articles/image-20250505142854.png)

![CPU disassembly view in x64dbg](/images/articles/image-20250505142915.png)

![Registers panel in x64dbg](/images/articles/image-2_20250505143000.png)

![Stack view panel in x64dbg](/images/articles/image-20250505143027.png)

![Memory dump view in x64dbg](/images/articles/image-20250505143312.png)

![Symbol view in x64dbg](/images/articles/image-20250505143321.png)

![Source code view in x64dbg](/images/articles/image-20250505173523.png)

### Stepping Into Calls

F9: Run
F8: Step Over
F7: Step Into a Call
Ctrl F9: Execute till Return(jump straight to next ret)
Alt F9: Run to User code

Call works like a jmp but it does not show, behind the scenes it does a jmp does the necessary instructions and return back, but you don't see it. Using F7, you can see the instructions it does, when you hit ret in a call it means to return to the place you stepped into the call.

Always keep the eye on the address, so you can see if you are in the program or in the OS.

### BreakPoints

Double click to sett/remove one.
F9 to run to BP
Useful to use in loops, to get out of them.

### Reversing Jumps

The decision in whether the jmp will be taken or not in based on the ZF flag, so you can just change it between 0 or 1.

### Patching

Assembling NOP(no operation) instructions
Patching
