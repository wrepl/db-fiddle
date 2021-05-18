import https from "https";
import { Result } from "./interfaces";

interface DatabaseType {
	database: string;
	version: string;
}

const run = (
	{ database, version }: DatabaseType,
	schema: string,
	query: string
): Promise<Result> => {
	return new Promise((resolve, reject) => {
		const req = https.request(
			{
				method: "POST",
				hostname: "prod-api.db-fiddle.com",
				port: 443,
				path: `/server/${database}/${version.replace(/\./g, "-")}`,
			},
			(res) => {
				res.setEncoding("utf8");
				let responseBody = "";

				res.on("data", (chunk) => {
					responseBody += chunk;
				});

				res.on("end", () => {
					const response = JSON.parse(responseBody);
					resolve(response);
				});
			}
		);

		req.on("error", reject);
		req.write(JSON.stringify({ schema, query }));
		req.end();
	});
};

const tabulate = (queryResults: Result) => {
	const results = queryResults.query.statements.map((r) => r.results);
	return results.map((r) => [r?.fields || [], ...(r?.values || [])]);
};

export { run, tabulate };
