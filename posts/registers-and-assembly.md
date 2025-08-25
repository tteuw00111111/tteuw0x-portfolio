---
title: "The Language of the CPU: Registers and Assembly"
date: "2025-08-26"
excerpt: "A look at CPU registers and the fundamentals of x86-64 Assembly language. Learn how high-level instructions are translated into machine-readable code."
mainCategory: "papers"
tags: ["Reverse Engineering", "Assembly", "x86-64"]
lang: "en"
---

### Registers (x86)

Specific about 32 bits architecture, but 64 bits is almost the same.

- Registers of general use
- EAX(Extended Accumulator), ECX(Extended Counter), EDX(Extended Data), EBX(Extended Base), ESP(Extended Stack Pointer), EBP(Extended Base Pointer), ESI(Extended Source Index), EDI(Extended Destination Index)
- 4 registers of data (EAX, EBX, ECX and EDX), 3 register of pointer (EIP, ESP and EBP) and 2 registers of index (ESI and EDI)
- Each has 32 bits
- 16 bits registers has the same name but without "E"
- To access the 8 highest bits of a data register, replace the X per "H" (high)
- To access the 8 lowest bits of a data register, replace the X per "L" (low)

![General purpose registers in x86](/images/articles/registers2.png)

The pointer register don't have these options(highest, lowest), but it can be divided.
![Pointer registers in x86](/images/articles/registers3.png)

Also with index registers
![Index registers in x86](/images/articles/index_registers.png)

![Moving -1 into EAX register](/images/articles/registers4.png)
Moved -1 (FFFFFFFF) to the register EAX, so all the 32 bits are set to 1.
Bu why?
-1 in a 32-bit register means:
`11111111 11111111 11111111 11111111`

![Moving -1 into AX register](/images/articles/registers5.png)
Moved -1 to AX(all bits to 1), and AX has 16 bits.

![Moving -1 into AH register](/images/articles/registers6.png)
Moved -1 to AH(all bits to 1), AH has 8 bits(Highest bits from AX)

![Moving -1 into AL register](/images/articles/registers7.png)
Moved -1 to AL(all bits to 1) AL has 8 bits (Lowest bits from AX)

#### EIP

It's commonly know as program counter, always indicate the next instruction to be executed
![EIP Register](/images/articles/eip.png)
`0040137D`, was the next task to be executed.

#### Control Registers

- Called flag
- bits that are marked as 1 or 0 depending on the results of mathematics or comparations during the process of a instruction
- Common flags: Overflow Flag, Sign Flag, Zero Flag, Auxiliary Carry Flag, Parity Flag, Carry Flag
- **Overflow Flag**
  Is set to one(1) when a overflow happens in the most significant bit after a arithmetic operation with signal (two numbers without active bit signal, are sum and active the bit signal)
  In a processor of 8 bits, would be 01111111+1, this sum would activate the signal flag and would activate the flag of overflow

- **Signal Flag**
  A bit that indicates the signal of an arithmetic operation result
  If the most significant bit is 1, this means that the result is negative and the Sign Flag is then activated.
  In a processor of 8 bits, 7F + 1 activate the sign flag
  0111 1111 + 1 = 1000 0000(bit signal activate, sign flag activate too)
  80 - 1 disables the Sign Flag

- Zero Flag
  Indicates if an arithmetic operation or comparation, if is 0(zero) this flag is activated (1).
  If different than zero, this flag is disabled (0)

- Auxiliary Carry Flag
  Set when there is a carry out from bit 3 to bit 4
- Parity Flag
  Indicates how many bits are activated after an arithmetic operation
  If the total bits of 1, is even, its activate (1)
  If the total bits of 1, is odd, its deactivated (0)

- Carry Flag
  Indicates the carry out of the most significant bit

### Assembly

A assembly instruction has 4 parts:

- Label(optional)
- Mnemonic or instruction
- Operands
- Comment(optional)

In Intel syntax we usually have:

- `INSTRUCTION DESTINATION, SOURCE`

So if we have: `MOV EAX, EBX`, the processor will get the content from the register `EBX` and copy to `EAX`.

In general an assembly instruction will follow in those categories:

- Move data
- Logic/Arithmetic
- Flow control

#### MOV

- `MOV <reg>, <reg>`
- `MOV <reg>, <mem>`
- `MOV <mem>, <reg>`
- `MOV <reg>, <const>`
- `MOV <mem>, <const>`

`MOV EAX, EBX`(copy the content from register EBX to EAX)
`MOV BYTE PTR DS:[00402000], A` (copy A, equivalent to 10 in decimal, to the memory address 00402000)

#### PUSH

- `PUSH <reg>`
- `PUSH <mem>`
- `PUSH <content>`

PUSH EAX( It pushes the value of the register EAX, to the stack)

#### POP

- `POP <reg>`
- `POP <mem>`

`POP EAX ` (remove the value from the stack and stores into the EAX)
`POP DWORD PTR DS:[00402000]` (takes the value from stack and stores into the address of memory 00402000)

#### ADD

- `ADD <reg>, <reg>`
- `ADD <reg>, <mem>`
- `ADD <mem>, <reg>`
- `ADD <reg>, <const>`
- `ADD <mem>, <const>`

`ADD EAX, 5` (sum 5 to the value of EAX and stores the result in EAX)

#### SUB

- `SUB <reg>, <reg>`
- `SUB <reg>, <mem>`
- `SUB <mem>, <reg>`
- `SUB <reg>, <const>`
- `SUB <mem>, <const>`

`SUB EAX, 5` (subtract 5 to the value of EAX and stores the result in EAX)

#### INC & DEC

- `INC <reg>`
- `INC <mem>`
- `DEC <reg>`
- `DEC <mem>`

`INC EAX `(add 1 to the value of EAX)
`DEC EAX`(decrease 1 of the value of EAX)

#### IMUL

(Multiply integer)

- `IMUL <reg>, <reg>`
- `IMUL <reg>, <mem>`
- `IMUL <reg>, <reg>, <con>`
- `IMUL <reg>, <mem>, <con>`

`IMUL EAX, EBX` (multiply the value of EAX x EBX and stores the result in EAX)
`IMUL EAX, EBX, 9` (multiply EBX x 9 and stores the result in EAX)

#### IDIV

- `IDIV <reg> `
- `IDIV <mem> `

Gets a integer of 64 bits (EDX:EAX)(gets two registers) and divides by the register or value of the memory address defined, quotient is stored at EAX and the remainder at EDX.

`XOR EDX, EDX //zero out
`MOV EAX, 5 //move 5 to EAX`
`MOV EBX, 2 //move 2 to EBX`
`IDIV EBX //divide 5 by 2`
`EAX //quotient is 2 and EAX remainder is 1``

#### JMP

- `JMP <label>`
- `JMP <mem>`

`JMP 00402000` (jump to instruction 00402000)

#### J, JE, JNE, JZ, JG, JGE

- `J(condition) - If determined condition is true`
- `JE <mem> - If equal, jump to address`
- `JNE <mem> - If not equal, jump to address`
- `JZ <mem> - If equals zero, jump to address`
- `JG <mem> - If x > y, jump to address`
- `JGE <mem> If x >= y, jump to address`
- `etc`

#### CMP

- `CMP <reg>, <reg>`
- `CMP <reg>, <mem>`
- `CMP <mem>, <reg>`
- `CMP <reg>, <con>`

Compare a register or address value with another register or another address value, or any value.

`CMP EAX, EBX`
`JE 00402000`

#### Interrupt

Signal to the processor that something needs immediate attention, it can pause the current execution, run some code, and then resume.
Types of interruption:

- **Hardware interrupt**: Triggered by hardware(keyboard, mouse, etc)
- **Software interrupt**: Triggered by software (`int 0x80` in Linux to make system calls)
- **Exceptions**: A type of interrupt caused by errors(divided by zero, page fault)
