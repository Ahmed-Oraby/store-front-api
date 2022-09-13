import database from '../database';
import bcrypt from 'bcrypt';

export type User = {
	id?: string;
	firstname: string;
	lastname: string;
	username: string;
	password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

export class UserStore {
	async index(): Promise<User[]> {
		try {
			const sql = 'SELECT * FROM users';
			const conn = await database.connect();
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get users, Error: ${err}`);
		}
	}
	async show(id: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const conn = await database.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot get user with id: ${id}, Error: ${err}`);
		}
	}
	async create(user: User): Promise<User> {
		try {
			const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));

			const sql =
				'INSERT INTO users (firstname, lastname, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING id, username';
			const conn = await database.connect();
			const result = await conn.query(sql, [
				user.firstname,
				user.lastname,
				user.username,
				hash,
			]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot create user: ${user.username}, Error: ${err}`);
		}
	}
	async delete(id: string): Promise<User> {
		try {
			const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
			const conn = await database.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot delete user with id: ${id}, Error: ${err}`);
		}
	}

	async authenticate(username: string, password: string): Promise<User | null> {
		try {
			const sql = 'SELECT * FROM users WHERE username=($1)';
			const conn = await database.connect();
			const result = await conn.query(sql, [username]);
			conn.release();
			if (result.rows.length) {
				const user = result.rows[0];
				if (bcrypt.compareSync(password + pepper, user.password_digest) === true) {
					return user;
				}
			}
			return null;
		} catch (err) {
			throw new Error(`Cannot authenticate user: ${username}, Error: ${err}`);
		}
	}
}
