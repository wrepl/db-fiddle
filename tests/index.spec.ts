import { run, tabulate } from "../src";
import { Result } from "../src/interfaces";

let queryResult: Result;

test("Run SQL Query", async () => {
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
	`;

	queryResult = await run(type, schema, query);

	expect(queryResult.schema.statements.find((s) => s.error)).toBeFalsy();
	expect(queryResult.query.statements.find((s) => s.error)).toBeFalsy();
});

test("Run Tabulate Function", async () => {
	const [table] = tabulate(queryResult);

	expect(table[0]).toEqual(["id", "price"]);
	expect(table[1]).toEqual([1, 5000]);
});
