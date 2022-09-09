import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
console.log(process.env.ENV);

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, ENV } =
	process.env;

let database = new Pool();

if (ENV === 'dev') {
	database = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

if (ENV === 'test') {
	database = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_TEST_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

export default database;
