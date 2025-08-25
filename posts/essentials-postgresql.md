---
title: "Getting Started with PostgreSQL"
date: "2025-08-25"
excerpt: "A brief overview of PostgreSQL, a powerful, open-source object-relational database system known for its reliability and feature robustness."
mainCategory: "papers"
tags: ["Database", "SQL", "Backend"]
lang: "en"
---

## What is it?

Open source object relational database system.
What is a object relational database?

- **Relational**: It organizes data into table, like a spreadsheet, these data can be related to each other, for example table customers and another for their orders can be related by `customer ID`
- **Database Management System**(**DBMS**): System that allows to create, read, update or remove data using SQL
  There is the `pgAdmin`(**GUI** for managing the database) and **CLI** `psql`.

## Setup

To connect, you'll typically open your command prompt or terminal and type:

```
sudo psql -U postgres
```

- `psql` is the program you're running.
- `-U postgres` tells it you want to connect as the user named `postgres`.

## Overview of the `psql` Command-Line Tool

The `psql` interface is where you'll type your SQL commands. Think of it as your direct line to the database. Here are a few essential `psql` "meta-commands" to get you started. These commands are shortcuts that `psql` provides, and they start with a backslash (`\`):

- `\l` or `\list`: **Lists** all the available databases on your server.
- `\c dbname`: **Connects** to a specific database named `dbname`.
- `\dt`: **Describes tables**. It shows all the tables in the database you're currently connected to.
- `\d tablename`: **Describes** the columns of a specific table.
- `\?`: Shows you all the available `\` commands.
- `\q`: **Quits** the `psql` program and returns you to your regular terminal.

## Databases, Schemas, Tables and Columns

The PostgreSQL server is like a large filling room.

- **Database**: Is a single filling cabinet in that room, it holds collection of related data, you might have a database for HR, one for Sales, one for personal projects, all in the same server. When you connect with `psql` you connect with a specific database(`\c my_sales_db`)
- **Schema**: Is like a set of drawers within filling cabinet, a way to group objects(like tables) inside a single database.
- **Table**: Single folder within a drawer, where you actually store the data, a table is a collection of data organized into rows and columns.

- **Columns**: Like a labeled section on a form inside that folder, defines a specific piece of information for every record on a table, employees table, you would have columns like `employee_id`, `first_name`, `last_name`, `hire_data`.

### Data Types

When creating a table, you must define the type of data that column will hold.

Common Data Types:

- `TEXT`: Store strings of text of any length.
- `VARCHAR(n)`: Text with a maximum length. `VARCHAR(50)` store up to 50 characters.
- `INTEGER`: For whole numbers.
- `NUMERIC(p, s)` or `DECIMAL(p, s)`: For numbers with decimals, `p` is the total number of digits, and `s` is the number of digits after the decimal point.
- `BOOLEAN`: For storing `true` or `false` values.
- `DATE`: For storing data.
- `TIMESTAMP`: For storing a date and time together (, '2025-07-11 12:30:00').
- `SERIAL`: This isn't just a data type, but a special auto-incrementing integer. It's perfect for creating unique ID numbers for each row.

### Primary Keys and Foreign Keys

- **Primary Key(PK):** Primary key is column, that uniquely identifies every row in a table, like a student ID number, no two people can have the same one, the **PK** cannot be empty(`NULL`) and its value must be unique, `SERIAL` is usually used to create **PK**.
- **Foreign Key(FK)**: Foreign key is a column in one table, that refers to the **Primary Key** of another table, this creates a **relation**
