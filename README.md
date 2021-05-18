# DB Fiddle

`db-fiddle` is an unofficial API wrapper for [db-fiddle.com](https://www.db-fiddle.com/) REPL website.

## Installation

`npm i db-fiddle`

## Simple Usage

```js
import { run } from "db-fiddle";
// or 
const { run } = require("db-fiddle");

const type = {
	database: "mysql",
	version: "8.0",
};

const schema = `
	CREATE TABLE items (
		id INT,
		price INT
	);


	INSERT INTO items (id, price) VALUES (1, 5000);
	INSERT INTO items (id, price) VALUES (2, 10000);
	INSERT INTO items (id, price) VALUES (3, 20000);	  
`;

const query = `
	SELECT id, price FROM items;
	SELECT SUM(price) as total FROM items;
`;

const result = await run(type, schema, query);
```

## Tabulate Result

```js
import { run, tabulate } from "db-fiddle";
// or 
const { run, tabulate } = require("db-fiddle");

const result = await run(type, schema, query);
const tableData = tabulate(result);
```

`tableData` will now contains array of 2D array that represents tabulated result, and you can use library like [`table`](https://www.npmjs.com/package/table) to display the data in table

```js
import { table } from "table";

for (const [i, data] of tableData.entries()) {
	console.log("Results for: ", result.query.statements[i].query);
	console.log(table(data));
}
```

Output:
```
Results for:  SELECT id, price FROM items;
╔════╤═══════╗
║ id │ price ║
╟────┼───────╢
║ 1  │ 5000  ║
╟────┼───────╢
║ 2  │ 10000 ║
╟────┼───────╢
║ 3  │ 20000 ║
╚════╧═══════╝

Results for:  SELECT SUM(price) as total FROM items;
╔═══════╗
║ total ║
╟───────╢
║ 35000 ║
╚═══════╝
```

## Valid Database Version

| Database | Version |
| --- | --- |
| `mysql` | `8.0`, `5.7`, `5.6`, `5.5` |
| `pgsql` | `13`, `12`, `11`, `10.0`, `9.6`, `9.5`, `9.4` |
| `sqlite` | `3.30`, `3.26` |

You can check [db-fiddle.com](https://www.db-fiddle.com/) for updated valid database version