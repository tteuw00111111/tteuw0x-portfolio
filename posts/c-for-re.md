---
title: "C Programming Concepts for Reverse Engineers"
date: "2025-08-27"
excerpt: "Exploring how core C language constructs like data types, loops, and arrays are represented at a lower level in memory and assembly."
mainCategory: "papers"
tags: ["Reverse Engineering", "C Language", "Low-level Programming"]
lang: "en"
---

# Programming Logic

# Learn How to Think As a Programmer

## Algorithm

Is a sequence of instructions to achieve a objective.

A program consists on breaking a problem in a sequential and logical way, so to solve a problem we can analyze, develop the solutions in a logical way, and describe the solution(algorithm)

# Change the lamp algorithm

find a place to buy a lamp.
go to the place and buy the lamp(considering you have money).
go back to home.
grab a ladder.
go to the desired place to change the lamp.
put the ladder under the lamp to change.
rotate the lamp to the counterclockwise until it comes out.
throw away old lamp.
rotate the new lamp to the clockwise in the same spot as the old lamp, until its steady.
go down the ladder.
test the new lamp.

# Lobo, Ovelha, Couve

Lobo come Ovelha se ficarem sozinhos
Ovelha come o Couve se ficarem sozinhos
Lobo com o Couve nao tem problema
Porem se levar o Couve, pro outro lado do rio, Ovelha e Lobo ficam sozinhos
Se levar Ovelha pro outro lado do rio, Lobo e Couve ficam sozinhos
Se levar Ovelha, depois Lobo pro outro lado do rio, Lobo come ovelha
Se Levar Ovelha, depois Couve, Ovelha come o Couve.
Se levar Lobo, deixando Ovelha e couve sozinhos, ovelha come couve.
Levar couve, deixando lobo e ovelha sozinhos
preciso achar uma situacao em que no final o cara do barco fique com eles para que ninguem coma niguem, mas como?
Se levar ovelha, lobo e couve ficam sozinhos OK, se levar couve depois, ovelha come, se levar lobo, lobo come ovelha

Exatamente isso o ponto chave e que ninguem come ninguem se o cara do barco estiver perto.
Entao leva ovelha, depois lobo, pega ovelha, e tras, pega couve, leva, depois pega ovelha e leva.
Leva ovelha
Leva lobo, pega ovelha
Deixa Ovelha, pega couve.
Leva couve para lobo.
Volta e pega ovelha.

# Missionarios e Canibais

Missionarios nao podem ficar em menos numero, em qualquer uma das margens ou os canibias os devorarao.

Barco leva duas pessoas.
barco so se mexe com alguem dentro.
numero igual ninguem se mata.

M = MISSIONARIO
C = CANIBAIS

levar 1M e 1C para esquerda(2C e 2M na direita)
deixar 1C na esquerda, e 1M na direita (3M e 2C na direita)
Levar 2C para esquerda, deixando 3M na direita, 3C na esquerda
1C para direita (3M e 1C direita)
Levar 2M para esquerda(2C e 2M esquerda, 1M e 1C direita)
barco na esquerda(precisa de 1 para levar ate a direita)
1M e 1C no barco para direita
Deixa 1C na direita, e leva 2M para esquerda
1C no barco para direita
2C no barco para esquerda
1C no barco para direita
2C no barco para esquerda

# Torre de Hanói

3 torres
disco pequeno, grande, médio
pequeno para torre 3
médio para torre 2
grande permanece na torre 1
pequeno da torre 3 para torre 2
grande da torre 1 para torre 3
pequeno da torre 2 para torre 1
médio da torre 2 para torre 3
pequeno da torre 1 para torre 3

# Data Types

Data Types act as blueprints for the compiler it tells how much space to reserve for a variable and how to interpret the binary data stored there.

# Integer Types (`int`)

Integers are for whole numbers (-5, -10, 1988, 32, 0).

```C
#include <stdio.h>

int main(void) {
    // Declaration & Initialization
    // We declare a variable named 'playerScore' of type int
    // and initialize it with the value 1500.
    int playerScore = 1500;

    // You can also declare first, then assign a value later.
    int enemiesRemaining;
    enemiesRemaining = 25;

    // Printing the integer value using the '%d' format specifier.
    printf("Player score is: %d\n", playerScore);
    printf("There are %d enemies left.\n", enemiesRemaining);

    return 0;
}

```

If you store a number larger than an int can hold, it "wraps around" becoming a negative number, this is called **Integer Overflow**, this happens when the value exceed roughly 2 billion.

# Floating-Point Types (`float`, `double`)

Types for numbers with a fractional component (3.1323, -0.24525)
The difference is the precision:

- **`float`**: Single precision, use less memory (4 bytes) but less precise.
- **`double`**: Double Precision, uses more memory (8 bytes) represent much larger range of number with higher precision. It's the default for floating-point literals.

```C
#include <stdio.h>

int main(void) {
    // 'float' for less precision; note the 'f' suffix.
    // Without 'f', the literal 3.14 is treated as a double.
    float pi_approx = 3.14f;

    // 'double' for higher precision. No suffix needed.
    double gravity = 9.80665;

    // Use '%f' for float/double. Use '%.Xf' to set precision.
    printf("Approximate Pi: %f\n", pi_approx);
    printf("Gravity constant: %.5f m/s^2\n", gravity); // Print with 5 decimal places

    return 0;
}
```

Floating point math is not always exact, never use **`==`** to compare two floats or doubles directly, instead of using a == b, check if the absolute difference between them is smaller than a tiny tolerance: **`fabs (a - b) < 0.00001`**

# Character Type(**`char`**)

Char Type stores a single character ('A', '$', '7'), stores a small integer (1 byte), stores the numeric code(like ASCII) for the character.

```C
#include <stdio.h>

int main(void) {
    // A char literal is enclosed in single quotes.
    char firstInitial = 'J';
    char punctuation = '!';

    // Printing with the '%c' format specifier.
    printf("The initial is %c%c\n", firstInitial, punctuation);

    // Demonstrating char's integer nature.
    // 'A' is 65 in ASCII. 'A' + 1 = 'B'.
    char nextLetter = firstInitial + 11; // 'J' + 11 = 'U'
    printf("A letter after the initial is: %c\n", nextLetter);

    return 0;
}
```

Use `char` for individual characters or small integers (-128 to 127). For text, you'll use an array of `char`, called a "string."

# Boolean Type (`_Bool`)

C native type for truth values, can only hold 0 (false) or 1 (true).
Needs to include `<stdbool.h>`

```C
#include <stdio.h>
#include <stdbool.h> // Include this for bool, true, false

int main(void) {
    // Use the 'bool' alias for clarity.
    bool isGameOver = false;
    bool hasPowerUp = true;

    // _Bool stores 0 or 1. Any non-zero assignment becomes 1.
    _Bool needsToSave = 100; // This is valid, but becomes 1.

    printf("Game over? %d\n", isGameOver);  // Prints 0
    printf("Has power-up? %d\n", hasPowerUp); // Prints 1
    printf("Needs to save? %d\n", needsToSave); // Prints 1

    return 0;
}
```

# Type Modifiers(**`short`**, **`long`**, **`unsigned`**)

Keywords that modify integer types(int, char) to change their size or range.

- **`short`** and **`long`**: Tells the compiler that you want to user smaller or larger integer size.
  **`long long`** gives an even larger integer, **`short`** is at least 16 bits, **`long`** at least 32, and **`long long`** at least 64
- **`unsigned`**: Removes the sign(positive/negative), doubling the maximum positive value the variable can hold, **`unsigned int`** cannot be negative.

Subtracting 1 from an **`unsigned int`** that is 0 results in the largest possible unsigned int.
Use **`unsigned`** when you are certain a value can never be negative(counts, sizes, indicies)

```C
#include <stdio.h>
#include <limits.h> // For checking max values

int main(void) {
    // A 'short int' can often save memory on smaller systems.
    short int temperature = -5; // -32,768 to 32,767 is a typical range

    // An 'unsigned int' is for when you only need positive numbers.
    unsigned int population = 4000000000; // Max is ~4.29 billion

    // A 'long long int' for very large numbers.
    long long int worldDebt = 97000000000000LL; // Note the LL suffix

    printf("Temperature: %hd\n", temperature);      // %hd for short
    printf("Population: %u\n", population);        // %u for unsigned
    printf("World Debt: %lld\n", worldDebt);        // %lld for long long

    // UINT_MAX from <limits.h> shows the maximum value.
    printf("Max unsigned int: %u\n", UINT_MAX);

    return 0;
}
```

# Void Type

Type keyword means "no type" or "nothing", can't declare a variable of type void, it's used for function return type, specifying that a function does not return any value, or stats that a functions takes no arguments.

```C
#include <stdio.h>

// This function RETURNS void (nothing)
// and ACCEPTS void (nothing).
void display_system_status(void) {
    // This function performs an action (printing) but does not
    // calculate a value to send back.
    printf("System status: OK.\n");
    // No 'return some_value;' here.
}

int main(void) {
    // We simply call the function to make it perform its action.
    display_system_status();
    return 0;
}
```

# Exercises

#### **Exercise 1: Declaration**

Declare a variable to store the number of apples in a basket. It should be a whole number. Then, declare another variable to store the price of a single apple, which might have cents.

```C
#include <stdio.h>

int apples;
float apple_price;
```

#### **Exercise 2: Initialization & Mismatch**

Declare an integer variable `year` and initialize it to the current year. Then, declare a character variable `initial` and initialize it with your first initial. Finally, try to store the value `7.5` in an integer variable `test_score`. What do you think will happen?

```C
#include <stdio.h>

int year = 2025;
char initial = M;

int test_score = 7.5;
```

I think trying to store a decimal number in a integer type of data, is going to result in "7'".

#### **Exercise 3: Modifiers and Output**

Write a complete C program that declares an `unsigned int` to store the population of a small town (e.g., `50000`). Then, print it to the console. Next, declare a `long` variable to store the population of a large country and print it.

```C
#include <stdio.h>

unsigned int town_population = 50000;
printf("Town Population: %u\n", town_population);

long int country_population = 345000000;
printf("Country Population: %ld\n", country_population);
```

### C Data Types & Format Specifiers

| Data Type           | What it Stores           | Format Specifier | Example      |
| ------------------- | ------------------------ | ---------------- | ------------ |
| `int`               | Standard integers        | `%d` or `%i`     | `101`, `-5`  |
| `char`              | A single character       | `%c`             | `'a'`, `'$'` |
| `float`             | Single-precision decimal | `%f`             | `3.14`       |
| `double`            | Double-precision decimal | `%lf`            | `3.14159265` |
| `unsigned int`      | Non-negative integers    | `%u`             | `123`        |
| `short`             | Short integers           | `%hd`            | `10`         |
| `long`              | Long integers            | `%ld`            | `345000000`  |
| `long long`         | Very long integers       | `%lld`           | `9876543210` |
| `char[]` or `char*` | A string of characters   | `%s`             | `"hello"`    |
| `void*`             | Memory address (pointer) | `%p`             | `0x7ffc...`  |

# Reading Input

While **`printf`** sends data out to the console, **`scanf`** pulls data in, looks for data that matches specific patterns(like integers, characters, floats), in modern C, **`scanf`** is often avoided in production code because it's unsafe and can easily crash the program.

#### Basic Input with Format Specifiers and `&`

To read a value, **`scanf`** needs two things, a format specifier (like `%d` for an integer, `%f `for float) to know what kinda of data to look for, and the memory address of the variable where it should store the data, the `&` operator (the "address-of" operator) is how you get a variable memory address.

```C
#include <stdio.h>

int main(void) {
    int user_age; // We declare the variable, but don't initialize it.

    printf("Please enter your age: "); // A prompt tells the user what to do.

    // 1. "%d": Look for an integer.
    // 2. &user_age: Here is the memory address to store that integer.
    scanf("%d", &user_age);

    // Print the value to confirm it was read correctly.
    printf("You entered the age: %d\n", user_age);

    return 0;
}
```

#### Checking the Return Value of `scanf`

**`scanf`** returns a value, it returns the number of items it successfully read and assigned, if you ask for one integer (**`scanf("%d", ...), `**) it will return **`1`** on success, if the user types "**`hello`**" instead of a number it will return **`0`**, if an input error occurs before any matching, it returns **`EOF`**(end of file) checking this return is the only way to know if the operation worked.

```C
#include <stdio.h>

int main(void) {
    int width, height;
    printf("Enter a width and a height (e.g., 20 30): ");

    // We expect to read 2 items. So the return value should be 2.
    int items_read = scanf("%d %d", &width, &height);

    // Always check the return value!
    if (items_read == 2) {
        int area = width * height;
        printf("Success! The area is: %d\n", area);
    } else {
        // This block runs if the user enters non-numeric input.
        printf("Error: Invalid input. Please enter two numbers.\n");
    }

    return 0;
}
```

Always wrap your `scanf` call in an `if` statement like `if (scanf(...) == expected_number)` to validate the input immediately.

When you input and press `Enter`, your characters goes into temporary holding area called the input buffer, **`scanf`** read from this buffer, when you use **`scanf("%d", &num`**), it read the digits, but it stops at the first non-digit character, which is the newline character (`\n`) from where you pressed `Enter`, this newline is left behind in the buffer waiting, if your next **`scanf`** call is trying to read a character (**`%c`**) it will read that leftover newline instead of waiting for you to type something new.

```C
#include <stdio.h>

int main(void) {
    int magic_number;
    char user_initial;

    printf("Enter your magic number: ");
    scanf("%d", &magic_number);

    // The \n from the Enter key is still in the input buffer!
    printf("Enter your first initial: ");

    // To consume the leftover newline, we add a space before %c.
    // The space tells scanf to skip any and all whitespace (spaces, tabs, newlines).
    scanf(" %c", &user_initial); // The space is the crucial fix!

    printf("Magic Number: %d, Initial: %c\n", magic_number, user_initial);

    return 0;
}
```

#### Reading Strings and Buffer Overflow

You can read a word (a sequence of non-whitespace characters) using the `%s` format specifier. When you use `%s`, you pass an array of characters (a string). Importantly, character arrays **do not** use the `&` operator in `scanf` because the name of an array decays into a pointer to its first element. The massive danger here is **buffer overflow**. If you provide a 20-character array but the user types 50 characters, `scanf` will happily write all 50, overwriting adjacent memory. This is a major security vulnerability.

```C
#include <stdio.h>

int main(void) {
    // We make space for 9 characters + 1 null terminator ('\0').
    char first_name[10];

    printf("Enter your first name: ");

    // DANGEROUS: scanf("%s", first_name) has no size limit.
    // SAFER: Specify a width limit. It will read a maximum of 9 chars
    // to leave room for the required null terminator.
    scanf("%9s", first_name); // The limit is ONE LESS than the array size.

    printf("Hello, %s!\n", first_name);

    return 0;
}
```

**Mnemonic:** A **single** variable needs a guide (`&`) to find its home. An **array** already knows its own home address.

##### Collections of Items (Arrays/Strings)

A string is stored in an **array**, which is a **row of boxes**.

```
char name[10];
```

The variable `name` is different. By C's rules, the name of an array **does not refer to the contents** of the boxes. Instead, the name `name` automatically represents the **memory address of the very first box in the row**.

So:

- For a single `int` named `age`, the name `age` means the **value**. You need `&age` to get the **address**.
- For an array named `name`, the name `name` _already means_ the **address** of the first element.
  Because `name` already gives `scanf` the starting address it needs, adding an `&` (`&name`) is redundant and incorrect in this context.

#### **Exercise 1: Simple Input**

Write a program that asks the user for their favorite number (an integer), reads it, and prints it back to them.

```C
#include <stdio.h>

int main (void) {
	int favorite_number;
	printf("Enter your favorite number: \n");

	scanf("%d", &favorite_number);

	printf("Your favorite number is %d.\n", favorite_number);
}
```

**Example Interaction:**

```
Enter your favorite number: 42
Your favorite number is 42.
```

#### **Exercise 2: Multiple Inputs**

Write a program that asks the user for their age (an integer) and their shoe size (a float). Read both values in a single `scanf` call and print them.

```C
#include <stdio.h>

int main (void) {
	int age;
	float shoes_size;
	printf("Enter your age and shoe size:   ");

	scanf("%d %f", &age, &shoes_size);
	printf("You are %d years old and your shoe size is %.1f.", age, shoes_size);
}
```

**Example Interaction:**

```
Enter your age and shoe size: 30 9.5
You are 30 years old and your shoe size is 9.5.
```

#### **Exercise 3: The Newline Problem**

Write a program that first asks for the user's age (an integer). Then, ask for their favorite letter (a single character). Print both. If you do this naively, the program will skip the second input. Your goal is to make it work correctly.

```C
#include <stdio.h>

int main (void) {
	int age;
	printf("Enter your age: ");
	scanf("%d", &age);

	char letter;
	printf("Enter your favorite letter: ");

	scanf(" %c", &letter);
	printf("Age: %d, Letter: %c", age, letter);
}
```

**Example Interaction (when working correctly):**

```
Enter your age: 25
Enter your favorite letter: G
Age: 25, Letter: G
```

# Comparing Values

Small sets of operators that evaluates to either true(non-zero) or false (zero), fuel for structures like if statements and while loops.

#### Equality Operators (`==`, `!=`)

- `==` (**Is Equal To**): Checks if two values are identical. It returns `1` (true) if they are, and `0` (false) if they aren't.
- `!=` (**Is Not Equal To**): The opposite of `==`. It returns `1` (true) if the values are different, and `0` (false) if they are the same

```C
#include <stdio.h>
#include <stdbool.h> // For using 'bool' and 'true'/'false'

int main(void) {
    int apples = 5;
    int oranges = 6;

    // The result of a comparison is an int (0 or 1),
    // but we can store it in a 'bool' for clarity.
    bool are_they_same = (apples == oranges); // Evaluates to 0 (false)
    bool are_they_different = (apples != oranges); // Evaluates to 1 (true)

    // Using if() to demonstrate the result of a comparison
    if (are_they_same) {
        printf("The fruit counts are the same.\n");
    }

    if (are_they_different) {
        printf("The fruit counts are different.\n"); // This line will print.
    }

    return 0;
}
```

#### Relational Operators (`<`, `>`, `<=`, `>=`)

**Clear Explanation:** These operators check the relationship between two values.

- `<` (Less Than)
- `>` (Greater Than)
- `<=` (Less Than or Equal To)
- `>=` (Greater Than or Equal To) Like the equality operators, they produce a result of `1` (true) or `0` (false).

```C
#include <stdio.h>

int main(void) {
    int user_age = 20;
    int minimum_voting_age = 18;

    // Check if the user is old enough to vote.
    // The expression (user_age >= minimum_voting_age) will be 1 (true).
    if (user_age >= minimum_voting_age) {
        printf("You are old enough to vote.\n");
    } else {
        printf("You are not old enough to vote.\n");
    }

    int score = 89;
    // Check if score is NOT an 'A' grade (i.e., less than 90)
    if (score < 90) {
        printf("Your score of %d is not an A grade.\n", score);
    }

    return 0;
}
```

#### Logical Operators (`&&`, `||`, `!`)

**Clear Explanation:** These are used to combine or invert multiple comparisons.

- `&&` (**Logical AND**): Returns true only if the expressions on _both_ sides are true.
- `||` (**Logical OR**): Returns true if _at least one_ of the expressions is true.
- `!` (**Logical NOT**): Inverts a boolean value. Turns true to false, and false to true.

```C
#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int age = 25;
    bool has_license = true;

    // To drive, you must be >= 18 AND have a license.
    // (true && true) results in true.
    if (age >= 18 && has_license == true) {
        printf("1. Eligible to drive.\n");
    }

    int cash = 15;
    int credit = 40;

    // To buy a $30 item, you need enough cash OR enough credit.
    // (false || true) results in true.
    if (cash >= 30 || credit >= 30) {
        printf("2. You have enough funds to purchase the item.\n");
    }

    bool is_asleep = false;
    // The ! operator flips the value. !false becomes true.
    if (!is_asleep) {
        printf("3. The user is awake!\n");
    }

    return 0;
}
```

#### **Exercise 1: Simple Check**

Write a program with an integer `age = 20`. Use an `if` statement to check if the `age` is greater than or equal to 18 and print "Adult."

```C
#include <stdio.h>

int main (void) {
	int age = 20;
	if (age >= 18) {
		printf("Adult\n");
	}
}
```

**Expected Output:**

```
Adult
```

#### **Exercise 2: If-Else Logic**

Write a program with a character variable `grade = 'C'`. Use an `if-else if-else` structure to print "Excellent" if the grade is 'A', "Good" if it's 'B', and "Passing" for any other character.

```C
#include <stdio.h>

int main (void) {
	char grade = 'C';
	if (grade == 'A') {
		printf("Excellent\n");
	}
	else if (grade == 'B') {
		printf("Good"\n);
	}
	else {
		printf("Passing"\n);
	}
}

```

**Expected Output:**

```
Passing
```

#### **Exercise 3: Combined Comparison**

Write a program with an integer `temperature = 25`. Use a single `if` statement with the `&&` (AND) operator to check if the temperature is greater than 20 AND less than 30. If it is, print "Weather is pleasant."

```C
#include <stdio.h>

int main (void) {
	int temperature = 25;
	if (temperature > 20 && temperature < 30) {
		printf("Weather is pleasant."\n);
	}
}
```

**Expected Output:**

```
Weather is pleasant.
```

# Bitwise Operators

Allows directly manipulation of individual bits (the 1s and 0s) within a variable

#### The Logical Trio: AND (`&`), OR (`|`), XOR (`^`)

These operators compare the bits of two numbers, one bit at a time, from right to left.

- **`&`** (Bitwise AND): The result bit is 1 only if **both** input bits are 1.
- **`|`** (Bitwise OR): The result bit is 1 **if at least one** of the input bits is 1.
- `^` (Bitwise XOR - eXclusive OR): The result bit is 1 if both of the bits are **different**

```C
#include <stdio.h>

int main(void) {
    // Let's use two 8-bit numbers (unsigned char)
    unsigned char a = 90;  // In binary: 01011010
    unsigned char b = 105; // In binary: 01101001
                           //           ---------
    // AND: Look for columns where both are 1
    unsigned char result_and = a & b; // 01001000 (binary) = 72 (decimal)

    // OR: Look for columns where at least one is 1
    unsigned char result_or = a | b;  // 01111011 (binary) = 123 (decimal)

    // XOR: Look for columns where the bits are different
    unsigned char result_xor = a ^ b; // 00110011 (binary) = 51 (decimal)

    printf("a & b  = %d\n", result_and);
    printf("a | b  = %d\n", result_or);
    printf("a ^ b  = %d\n", result_xor);

    return 0;
}
```

#### The Inverter: NOT (`~`)

The `~` (Bitwise NOT) operator is a unary operator, meaning it works on a single number. It simply flips every single bit: all `1`s become `0`s, and all `0`s become `1`s. This is also called taking the "one's complement."

```C
#include <stdio.h>

int main(void) {
    unsigned char flags = 15; // In binary: 00001111

    // The ~ operator flips every bit.
    // 00001111 becomes 11110000
    unsigned char inverted_flags = ~flags; // 11110000 (binary) = 240 (decimal)

    printf("Original flags: %u\n", flags);
    printf("Inverted flags: %u\n", inverted_flags);

    return 0;
}
```

#### The Movers: Bit Shifting (`<<`, `>>`)

These operators shift all the bits in a number to the left or right.

`<<` (Left Shift): Shifts all bits to the left by a specified number of places. Zeros are filled in on the right. Shifting left by `N` is a very fast way to multiply by 2N.

`>>` (Right Shift): Shifts all bits to the right. For unsigned numbers, zeros are filled in on the left. Shifting right by `N` is a very fast way to divide by 2N.

```C
#include <stdio.h>

int main(void) {
    unsigned int num = 5; // In binary: ...00000101

    // Left shift by 2 places: ...00010100 (binary) = 20 (decimal)
    // This is equivalent to 5 * 2^2 = 5 * 4 = 20.
    unsigned int result_left = num << 2;
    printf("5 << 2 = %u\n", result_left);

    unsigned int another_num = 80; // In binary: ...01010000

    // Right shift by 3 places: ...00001010 (binary) = 10 (decimal)
    // This is equivalent to 80 / 2^3 = 80 / 8 = 10.
    unsigned int result_right = another_num >> 3;
    printf("80 >> 3 = %u\n", result_right);

    return 0;
}
```

#### Practical Use: Bit Masking

- **Clear Explanation:** A "bitmask" is a variable with a specific bit pattern used to read or change specific bits in another variable.
- **Checking a bit:** Use `&` with a mask that has a `1` only at the bit you want to check. If the result is non-zero, the bit was set.
- **Setting a bit:** Use `|` with a mask. This turns the target bit on without affecting any other bits.

```C
#include <stdio.h>

int main(void) {
    // Let's use bits to represent permissions:
    // bit 0: can_read, bit 1: can_write, bit 2: can_execute
    unsigned char permissions = 5; // binary 00000101 (read and execute)

    // MASK 1: Check for write permission (bit 1)
    unsigned char MASK_WRITE = 2; // binary 00000010
    if ((permissions & MASK_WRITE) != 0) {
        printf("Write permission is ON.\n");
    } else {
        printf("Write permission is OFF.\n"); // This will print
    }

    // MASK 2: Set write permission (bit 1) ON
    printf("Turning write permission ON.\n");
    permissions = permissions | MASK_WRITE; // 00000101 | 00000010 = 00000111 (7)
    printf("New permissions value: %d\n", permissions);

    // MASK 3: Clear read permission (bit 0) OFF
    unsigned char MASK_READ = 1; // binary 00000001
    printf("Turning read permission OFF.\n");
    permissions = permissions & (~MASK_READ); // ~MASK_READ is 11111110
                                              // 00000111 & 11111110 = 00000110 (6)
    printf("New permissions value: %d\n", permissions);


    return 0;
}
```

### Memorization Tactic

For bitwise operators, the most effective technique is **dual coding**. This involves combining verbal and visual learning. Don't just read what `&` does; draw it.

1. **Take an operation:** For example, `9 & 5`.
2. **Write the rule (verbal):** "Bitwise AND results in 1 only if both bits are 1."
3. **Draw the problem (visual):** Write the binary numbers stacked vertically and solve it on paper, bit by bit.

```
  1001  (This is 9)
& 0101  (This is 5)
------
  0001  (This is 1)
```

This process forces your brain to connect the abstract rule to a concrete visual action, creating a much stronger memory.

#### **Exercise 1: The Basics**

Given `int x = 10;` (binary `1010`) and `int y = 12;` (binary `1100`), what is the decimal result of `x | y` and `x & y`?

```
x | y = 14
x & y = 8
```

#### **Exercise 2: Shifting and Flipping**

Given `unsigned int a = 20;` (binary `10100`), what is the decimal result of `a >> 2`? Separately, what is the result of `a ^ 10` (binary `01010`)?

```
decimal result is 5
a ^ 10 = 11110
11110 = 30

```

#### **Exercise 3: Bit Masking**

Write a complete C program that checks if the 4th bit (where the rightmost bit is bit 0) of the number `25` is set to `1`. The program should print "Bit 4 is set." or "Bit 4 is not set." (Hint: `25` in binary is `11001`).

```C
#include <stdio.h>

int main(void) {
	unsigned char number = 25; //00011001

	unsigned char mask_write = 16; //00010000

	if ((number & mask_write) != 0) {
		printf("Bit 4 is set.\n");
	} else {
		printf("Bit 4 is not set.\n");
	}
}
```

**Expected Output:**

```
Bit 4 is set.
```

Question:
how was i suppose to get to this 16 number or 1 shifted left 4 times alone? would i have to go binary per binary until i found one that the 4th was set to 1?

You don't have to search for it. You can calculate the mask number directly from the bit position you want to test.
Powers of 2
Each bit position corresponds to a **power of 2**. The value of a bit position `n` is always 2n.

- **Bit 0:** 20=1
- **Bit 1:** 21=2
- **Bit 2:** 22=4
- **Bit 3:** 23=8
- **Bit 4:** 24=16
- **Bit 5:** 25=32
  So, to check **bit 4**, you need the number 24, which is **16**.

This is why the left-shift operator `<<` is so useful. The expression `1 << n` is a fast and clear way for a programmer to write "2n".

- To get a mask for bit 4, you write `1 << 4`.
- To get a mask for bit 7, you'd write `1 << 7` (which is 27, or 128).
  You never have to guess or search; you just use the power of 2 that matches the bit number you're interested in.

# Arrays

Collection of elements of the same data type in contiguous memory location

```
Type Name[Size]; -> "Tiny New Socks"
```

1. Declare the array to tell the computer you want a block of memory
2. Initialize and access elements, put elements in and get them out

To refer to a specific element we use index, arrays are zero-indexed, meaning the first element is at index 0, the second element is at index 1, and so on.

An array's name is more than just a label, its a pointer to the first element of that array, it holds the memory address of where the arrays begins in the block of memory.

When you declare `int my_numbers[5];`, the system finds an open block and `my_numbers` points to the start of it.

The compiler knows `my_numbers` starts at address `0x1000`. When you ask for `my_numbers[2]`, it does some quick math behind the scenes:

`start_address + (index * size_of_element)` `0x1000 + (2 * 4 bytes) = 0x1008`

It goes directly to memory address `0x1008` to get the value. This is called **pointer arithmetic**.

`my_numbers` is a pointer to the start of the array, and `&my_numbers[0]` is... well, the address of the first element. They point to the same spot in memory.

`*`: This is the **dereference operator**. It means "go to the address inside the parentheses and get the value that's stored there."

```C
#include <stdio.h>

int main (void) {
	int test_scores[3];
	test_scores[2] = 88;

	printf("Value at index 2: %d\n", *(test_scores + 2));

}
```

# Loops

## for

syntax

```
for(start; stop; step)
```

- initialization, `int i = 0;` only run once at the very beginning.
- stop, condition is checked before each loop, if true loop runs, if false loops stop. `i < 5`
- step, action after each loop, usually to move to the next item, `i++` shortcut for `i = i + 1`

```C
int my_data[10];

for (int i = 0; i < 10; i++) {
	my_data[i] = i;
}
for (int i = 0; i < 10; i++) {
	printf("Element %d is %d\n", i, my_data[i]);
}
```

# Math Operators

### Big-Picture Map

Math operators are the verbs of your program's numerical story. They are the essential tools C provides to perform calculations, turning static data into dynamic results. Every time you calculate a total, process a sensor reading, update a game score, or plot a trajectory, you are using these operators. While C has powerful math libraries for advanced functions, the basic operators (`+`, `-`, `*`, `/`, `%`) are the workhorses used in virtually every C program ever written. Mastering their behavior, especially the nuances of how they handle different data types, is non-negotiable. It’s the foundation upon which all complex algorithms are built.

#### 1. The Core Four: Addition, Subtraction, Multiplication, Division

- **Clear Explanation:** These are the straightforward arithmetic operators you know from school. They take two numbers (operands) and produce a result.
  - `+` (Addition)
  - `-` (Subtraction)
  - `*` (Multiplication)
  - `/` (Division) Their behavior depends heavily on the data types you use, which we'll see is especially important for division.
- **Annotated Sample Code:**

  ```c
  #include <stdio.h>

  int main(void) {
      int score = 100;
      int bonus = 25;
      int penalty = 10;

      // Addition
      int final_score = score + bonus;
      printf("With bonus, score is: %d\n", final_score); // Prints 125

      // Subtraction
      final_score = final_score - penalty;
      printf("After penalty, score is: %d\n", final_score); // Prints 115

      // Multiplication
      int doubled_score = final_score * 2;
      printf("Doubled score is: %d\n", doubled_score); // Prints 230

      // Division
      int halved_score = final_score / 2;
      printf("Halved score is: %d\n", halved_score); // Prints 57 (more on this soon!)

      return 0;
  }
  ```

- **Common Pitfalls & Best Practices:**
  - **Pitfall:** **Overflow/Underflow.** Performing an operation that results in a number too large or too small for the data type to hold. `int a = 2000000000; int b = a * 2;` will not result in 4 billion.
  - **Best Practice:** Be mindful of the potential range of your variables. Use larger types like `long long` if you expect very large numbers.

#### 2. The Remainder Operator: Modulo (`%`)

- **Clear Explanation:** The modulo operator (`%`) gives you the **remainder** of a division. It's incredibly useful for checking for divisibility, cycling through a set of numbers, or separating the digits of a number. It only works with integers. For example, `10 % 3` is `1` because 10 divided by 3 is 3 with a remainder of 1.
- **Annotated Sample Code:**

  ```c
  #include <stdio.h>

  int main(void) {
      int items = 25;
      int items_per_box = 6;

      // Use division to find how many full boxes we can make.
      int full_boxes = items / items_per_box; // 25 / 6 = 4

      // Use modulo to find how many items are left over.
      int leftover_items = items % items_per_box; // 25 % 6 = 1

      printf("%d items fit into %d full boxes with %d left over.\n", items, full_boxes, leftover_items);

      // A classic use: check if a number is even or odd.
      int number_to_check = 17;
      if ((number_to_check % 2) == 0) {
          printf("%d is even.\n", number_to_check);
      } else {
          printf("%d is odd.\n", number_to_check); // This will print
      }

      return 0;
  }
  ```

- **Common Pitfalls & Best Practices:**
  - **Pitfall:** Trying to use `%` with floating-point numbers (`float` or `double`). It is strictly for integers.
  - **Best Practice:** Use modulo to "wrap around" a range. `index % max_size` will always produce a result between `0` and `max_size - 1`, perfect for cycling through array indices.

#### 3. Integer Division vs. Floating-Point Division

- **Clear Explanation:** This is a crucial concept in C.
  - **Integer Division:** If you divide one integer by another integer, C performs _integer division_, meaning it **throws away the decimal part**. `5 / 2` results in `2`, not `2.5`.
  - **Floating-Point Division:** To get a precise answer with a decimal, **at least one** of the numbers in the division must be a floating-point type (`float` or `double`).
- **Annotated Sample Code:**

  ```C
  #include <stdio.h>

  int main(void) {
      // --- Integer Division ---
      int a = 9;
      int b = 4;
      printf("Integer division 9 / 4 = %d\n", a / b); // Prints 2

      // --- Floating-Point Division ---
      double x = 9.0;
      double y = 4.0;
      printf("Float division 9.0 / 4.0 = %f\n", x / y); // Prints 2.250000

      // --- The Common Pitfall ---
      // Storing the result in a double is NOT enough if the operation
      // itself is between two integers. The truncation happens first!
      double wrong_result = a / b; // a/b is calculated as 2, THEN 2.0 is stored.
      printf("Wrong way: double result = 9 / 4; -> %f\n", wrong_result); // Prints 2.000000

      // --- The Correct Way to Mix Types ---
      // To fix this, we "promote" one of the integers to a float/double
      // before the division happens. This is called casting.
      double correct_result = (double)a / b;
      printf("Correct way: (double)9 / 4 = %f\n", correct_result); // Prints 2.250000

      return 0;
  }
  ```

- **Common Pitfalls & Best Practices:**
  - **Pitfall:** Performing division with two `int` variables and expecting a `double` result, just because you stored it in a `double`.
  - **Best Practice:** When you need a precise decimal result from division, explicitly cast at least one of the integer operands to `(double)`. For example: `double average = (double)total_sum / count;`.

#### 4. Operator Precedence and Parentheses

- **Clear Explanation:** C follows a strict order of operations, just like PEMDAS/BODMAS in math.

  - **Highest Precedence:** `*`, `/`, `%` (Multiplication, Division, Modulo)

  - **Lower Precedence:** `+`, `-` (Addition, Subtraction) Operators with the same precedence are evaluated based on their _associativity_, which for arithmetic operators is left-to-right. You can (and should) use parentheses `()` to force a different order of evaluation.

- **Annotated Sample Code:**
  ```c
  #include <stdio.h>

  int main(void) {
      // Without parentheses, multiplication happens first.
      // 2 + (3 * 4) = 2 + 12 = 14
      int result1 = 2 + 3 * 4;
      printf("2 + 3 * 4 = %d\n", result1);

      // With parentheses, we force the addition to happen first.
      // (2 + 3) * 4 = 5 * 4 = 20
      int result2 = (2 + 3) * 4;
      printf("(2 + 3) * 4 = %d\n", result2);

      // Left-to-right evaluation for operators of same precedence.
      // (100 / 10) * 2 = 10 * 2 = 20
      int result3 = 100 / 10 * 2;
      printf("100 / 10 * 2 = %d\n", result3);

      return 0;
  }
  ```
- **Common Pitfalls & Best Practices:**
  - **Pitfall:** Assuming operations are just calculated from left to right, ignoring precedence rules. `a + b / 2` is not `(a + b) / 2`.
  - **Best Practice:** **When in doubt, use parentheses.** They cost nothing and make your code's intent perfectly clear to anyone reading it (including your future self). `(a + b) / 2` is unambiguous.

---

### Memory Hooks

1. **The Integer Division Guillotine:** Think of integer division in C as a guillotine. When you divide two integers (`int / int`), the guillotine blade comes down right at the decimal point and chops off everything to the right. The number `2.75` becomes just `2`. To save the decimal part, you have to protect one of the numbers by making it a `double` _before_ the operation, which stops the guillotine from falling.
2. **The Precedence Pyramid:** Visualize the order of operations as a pyramid. The most important, powerful operators (`* / %`) are at the top, and they get resolved first. The less urgent operators (`+ -`) are at the base and are handled last. Parentheses `()` are like a teleporter—they can grab any part of the expression, no matter how low on the pyramid, and move it to the very top to be evaluated first.

##### **compound assignment operators**.

They are convenient shorthands that combine a math operation and an assignment into a single step.

The rule is simple: `variable op= value;` is just a shorter way of writing `variable = variable op value;`

They exist to make code more concise and readable once you're used to them. You'll see them everywhere in professional C code.

```c
#include <stdio.h>

int main(void) {
    int points = 100; // Start with 100 points.
    printf("Initial points: %d\n", points);

    // Add 25 to points
    points += 25; // Same as: points = points + 25;
    printf("After += 25:   %d\n", points);

    // Subtract 50 from points
    points -= 50; // Same as: points = points - 50;
    printf("After -= 50:   %d\n", points);

    // Multiply points by 3
    points *= 3;  // Same as: points = points * 3;
    printf("After *= 3:    %d\n", points);

    // Divide points by 5
    points /= 5;  // Same as: points = points / 5;
    printf("After /= 5:    %d\n", points);

    return 0;
}
```

#### **Prefix** and **postfix**

Two ways you can use the increment (`++`) and decrement (`--`) operators on a variable.

Prefix (`++x` or `--x`)

The prefix operator modifies the variable's value **before** its value is used in the surrounding expression. It's the "change, then use" method.

```C
int x = 5;
int y = ++x; // x becomes 6, THEN y is assigned the new value of x.

// At the end: x is 6, y is 6.
```

**Prefix** and **postfix** refer to the two ways you can use the increment (`++`) and decrement (`--`) operators on a variable. The key difference is when the variable's value is changed relative to its use in an expression.

```C
int x = 5;
int y = x++; // y is assigned the original value of x (5), THEN x becomes 6.

// At the end: x is 6, y is 5.
```

## Prefix (`++x` or `--x`)

The prefix operator modifies the variable's value **before** its value is used in the surrounding expression. It's the "change, then use" method.

C

```
int x = 5;
int y = ++x; // x becomes 6, THEN y is assigned the new value of x.

// At the end: x is 6, y is 6.
```

---

## Postfix (`x++` or `x--`)

The postfix operator uses the variable's **original** value in the surrounding expression, and then modifies the variable's value **afterward**. It's the "use, then change" method.

#### **Exercise 1: Remainder Fun**

Write a program that calculates how many full weeks and how many remaining days are in a total of 25 days. Use the `/` and `%` operators.

```C
#include <stdio.h>

int main (void) {

	int days_week = 7;
	int current_days = 25;

	int week = current_days / days_week;
	int remainding_days = current_days % days_week;

	printf("%d is %d weeks and %d days.\n", current_days, week, remainding_days);

	return 0;
}
```

**Expected Output:**

```
25 days is 3 weeks and 4 days.
```

#### **Exercise 2: Temperature Conversion**

The formula to convert Celsius to Fahrenheit is `F = C * 9 / 5 + 32`. Write a program with an integer variable `celsius = 20`. Calculate the Fahrenheit value. Then, do it again but make the calculation use floating-point numbers for a more precise result.

```C
#inlcude <stdio.h>

int main (void) {
	int celsius = 20;
	int formula = (celsius * 9) / 5 + 32;
	double precise_formula = (celsius * 9) / 5 + 32;
	printf("Integer calculation: %d", formula);

	printf("Floating-point: %f", precise_formula);

	return 0:
}
```

**Expected Output:**

```
Integer calculation: 68
Floating-point calculation: 68.00
```

#### **Exercise 3: Prefix vs. Postfix**

Analyze the following code block and predict the final values of `a`, `b`, and `c`.

```C
int a = 5;
int b = 10;
int c = 0;

c = a++ + b;
// What are a, b, and c here?
c = 16 a(6) + b(10)

c = ++a + b;
// What are the FINAL values of a, b, and c?
c = 16 a(6) + b(10)

```
