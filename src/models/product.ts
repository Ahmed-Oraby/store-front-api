import database from '../database';

export type Product = {
	name: string;
	price: number;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const sql = 'SELECT * FROM products';
			const conn = await database.connect();
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get products, Error: ${err}`);
		}
	}
	async show(id: string): Promise<Product> {
		try {
			const sql = 'SELECT * FROM products WHERE id=($1)';
			const conn = await database.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot get product with id: ${id}, Error: ${err}`);
		}
	}
	async create(product: Product): Promise<Product> {
		try {
			const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
			const conn = await database.connect();
			const result = await conn.query(sql, [product.name, product.price]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot create product: ${product.name}, Error: ${err}`);
		}
	}
	async delete(id: string): Promise<Product> {
		try {
			const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
			const conn = await database.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot delete product with id: ${id}, Error: ${err}`);
		}
	}
}
