export interface Result {
	id: string;
	database: Database;
	stats: Stats;
	schema: Query;
	query: Query;
}

export interface Database {
	type: string;
	version: string;
}

export interface Query {
	query: string;
	statements: Statement[];
}

export interface Statement {
	query: string;
	stacked: boolean;
	results: Results | null;
	time: number;
	error?: string;
}

export interface Results {
	fields: string[];
	values: Array<string[]>;
}

export interface Stats {
	init: Init;
	start: Init;
	shutdown: Init;
}

export interface Init {
	time: number;
}
