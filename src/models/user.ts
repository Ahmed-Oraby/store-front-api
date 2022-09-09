import database from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export type User = {
	firstname: string;
	lastname: string;
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
				'INSERT INTO users (firstname, lastname, password_digest) VALUES ($1, $2, $3) RETURNING id, firstname, lastname';
			const conn = await database.connect();
			const result = await conn.query(sql, [user.firstname, user.lastname, hash]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Cannot create user: ${user.firstname + ' ' + user.lastname}, Error: ${err}`
			);
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
}
