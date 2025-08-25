---
title: "Foundations: A Primer on Computer Architecture"
date: "2025-08-25"
excerpt: "Understanding the core components of a computer, including the CPU, memory, and the instruction cycle. The essential first step for any reverse engineer."
mainCategory: "papers"
tags: ["Reverse Engineering", "Computer Architecture"]
lang: "en"
---

## Computer Architecture

##### Whats is a computer purpose?

1. Data entry
2. Data process
3. Output

##### Components

1. CPU(Central Process Unit)
2. Memory
3. I/O
4. Interconnect

#### CPU Components

1. Control Unit
   CPU operation control, it tells the CPU what to do at a specific moment
2. ULA/ALU
   Performs mathematics/arithmetic operations, logical operations
3. Registers
   CPU memory, fastest way
4. Internal CPU Bus
   Connects all the elements

### Processor Architectures

- **CISC - Complex Instruction Set Computer**
  Fewer lines of code more complex instructions
  One instruction can do a lot
  Large instructions set, there are many types of instructions
  Ex: Intel x86
- **RISC - Reduced Instruction Set Computer**
  More lines of code but each line is simpler and faster
  Each instruction does one smaller set
  Smaller instructions set
  Ex: ARM(phones, tablets)

### Measuring Unit

- Bit - 0 or 1
- Byte - 8 bits - 00000000 to 11111111

#### Conversion - Decimal to Binary

Just divide by two(2) until you can't more.
47 divided by 2 = 23, remainder = 1
23 divided by 2 = 11, remainder =1
11 divided by 2 = 5, remainder = 1
5 divided by 2 = 1, remainder = 0
1 divided by 2 = 0, remainder 1
Reading from bottom to top: 47 = 1 0 1 1 1

If you don't understand where this remainder comes from, just to multiplication:
47 divided by 2, 2 goes into 47 23 times, (quotient)
but 2 x 23 = 46
Left 1, remainder is 1

Another example:
15 divided by 2 = 7, remainder = 1
7 divided by 2 = 3, remainder = 1
3 divided by 2 = 1, remainder 1
1 divided by 2 = 0, remainder 1

#### Binary to Decimal

Binary is base 2, so each digit represents a power of 2 from right to left. To convert `1011` to decimal:

| Binary Digit   | `1` | `0` | `1` | `1` |
| :------------- | :-: | :-: | :-: | :-: |
| **Power of 2** | 2³  | 2²  | 2¹  | 2⁰  |
| **Value**      |  8  |  4  |  2  |  1  |

Now, multiply each binary digit by its value and sum the results:
(1 × 8) + (0 × 4) + (1 × 2) + (1 × 1) = 8 + 0 + 2 + 1 = 11.
So, `1011` in binary is **11** in decimal.

#### Decimal to Octal

Just divide by eight(8) until you can't more
120 divided by 8 = 15, remainder = 0
15 divided by 8 = 1, remainder 7
1 divided by 8 = 0, remainder 1

170 in octal

Another example:
156 divided by 8 = 19, remainder 4
19 divided by 8 = 2, remainder 3
2 divided by 8 = 0, remainder 2

234

#### Decimal to Hexadecimal

Just divide by sixteen(16) until you can't more
A = 10
B = 11
C = 12
D = 13
E = 14
F = 15

255 divided by 16 = 15, remainder = 15
15 divided by 16 = 0, remainder = 15

So 15 15 = FF

Another Example:
410 divided by 16 = 25, remainder = 10
25 divided by 16 = 1, remainder = 9
1 divided by 16 = 0, remainder = 1

1 9 10
19A - Hex

#### Binary to Octal

Group the bits in three(3), if a group doesn't have a 3, complete with 0 to the left
Convert each group to decimal:

1011
divided in groups of three

001 011 (zero in the left for the first group)

0 0 1 to decimal

| Binary | Power |       |
| ------ | ----- | ----- |
| 0      | 0     | 1     |
| 2 ^ 2  | 2 ^ 1 | 2 ^ 0 |
| 4      | 2     | 1     |

0 x 4 = 0
0 x 2 = 0
1 x 1 = 1
1 in decimal

Now next group
0 1 1

| Binary | Power |       |
| ------ | ----- | ----- |
| 0      | 1     | 1     |
| 2 ^ 2  | 2 ^ 1 | 2 ^ 0 |
| 4      | 2     | 1     |

0 x 4 = 0
1 x 2 = 2
1 x 1 = 1
0 1 1 to decimal is 3

So octal 1011 = 13

#### Binary to Hexadecimal

Just like octal but with groups of 4

1011 1100

1011 to decimal

| Binary | Power |     |     |
| ------ | ----- | --- | --- |
| 1      | 0     | 1   | 1   |
| 2^3    | 2^2   | 2^1 | 2^0 |
| 8      | 4     | 2   | 0   |

1 x 8 = 8
0 x 4 = 0
1 x 2 = 2
1 x 1 = 1
Sum = 11 (B in hexa)

1100

| Binary | Power |     |     |
| ------ | ----- | --- | --- |
| 1      | 1     | 0   | 0   |
| 2^3    | 2^2   | 2^1 | 2^0 |
| 8      | 4     | 2   | 0   |

1 x 8 = 8
1 x 4 = 4
0 x 2 = 0
0 x 1 = 0
Sum = 12 (C in hexa)

001 011 = BC

#### Octal To Binary

Each octal digit (0-7) maps to 3 binary digits (bits)
3 bits = 1 octal digit (2 ^ 3)

Octal 53 to binary

5 -> binary
3 -> binary

5 -> 101
3 -> 011

#### Octal to decimal

Same as binary, but multiply by eight instead of two

Octal 53 to decimal

5 x 8^1 = 40
3 x 8^0 = 3

40 + 3 = 43
53 octal = 43 decimal

#### Octal to Hexadecimal

Convert each octal digit to 3-bit binary

Octal 745
7 -> 111
4 -> 100
5 -> 101

745 = 1111100101

Group binary in 4 digits from right to left
101 001 111

0001 1110 0101

Now each 4-bit group to hex

0001 = 1
1110 = E
0101 = 5

1E5

#### Hexadecimal to binary

Every hex digit becomes 4 binary digits

3F
3 - > 0011
F -> 1111
So 3F = 00111111

#### Hexadecimal to Octal

Hex -> Binary -> Octal
2F

Hex->Binary
2 = 0010
F = 1111
2F = 00101111

Binary->Octal
group of 3 bits from right to left

000 101 111
0 5 7

057

#### Hexadecimal to Decimal

just multiply each digit by powers of 16
Hex = 2F

2 x 16 = 32
F = 15 -> 15 x 16 ^ 0 = 15
32 + 15 + 47

#### Binary Arithmetic

A register has a max limit of bits that can handle, when hit it's limit, the "overflow" is ignored.

##### Addition

| Binary    | Result | Carry |
| --------- | ------ | ----- |
| 0 + 0     | 0      | 0     |
| 0 + 1     | 1      | 0     |
| 1 + 0     | 1      | 0     |
| 1 + 1     | 0      | 1     |
| 1 + 1 + 1 | 1      | 1     |

##### Subtraction

| Subtraction | Result | Borrow                |
| ----------- | ------ | --------------------- |
| 0 - 0       | 0      | No                    |
| 1 - 0       | 1      | No                    |
| 1 - 1       | 0      | No                    |
| 0 - 1       | 1      | Yes, from next column |

##### Multiplication

- 0 x anything = 0
- 1 x anything = that number

##### Division

Just like with decimals

## Memory

![](/images/articles/memory.png)
![](/images/articles/memory2.png)

##### Registers

Fastest memory, its inside the CPU and it's exclusive for the CPU, really small capacity

![](/images/articles/registers.png)

##### Cache

Also internal to CPU, save data and instructions during a program execution, so the CPU can access in a faster way, also short time memory, faster than RAM, it's between the CPU and RAM.
So the CPU doesn't need to get the data from the RAM all the time, it can quickly grab from cache.
Today are used 3 types of cache: L1, L2 and L3, more closer to the core means more faster but means it can storage less data.

![](/images/articles/cache.png)

#### Memory Segments

**Data Segments:** Segment "`.data`" and segment "`.bss`", the segment "`.data`" hold the variable definitions. The segment "`.bss`" holds the data that will be add at a second moment.

- Data: int x = 3;
  char string[] = "This goes to data";
- BSS: Global variables and static variables.

**Code segment:** "`.text`" the instructions to be executed, each module has your own "`.text`" section.

**Stack:** The stack is where the variables go when it needs to be read by functions, controlled by the pointers **EBP** and **ESP**.
