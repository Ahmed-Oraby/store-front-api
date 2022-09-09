import database from '../database';

export type Order = {
	userId: string;
	status: string;
};

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const sql = 'SELECT * FROM orders';
			const conn = await database.connect();
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get orders, Error: ${err}`);
		}
	}
	async show(id: string): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const conn = await database.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot get order with id: ${id}, Error: ${err}`);
		}
	}
	async create(order: Order): Promise<Order> {
		try {
			const sql =
				'INSERT INTO orders (user_id, status) VALUES ((SELECT id from users WHERE id=$1), $2) RETURNING *';
			const conn = await database.connect();
			const result = await conn.query(sql, [order.userId, order.status]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot create order, Error: ${err}`);
		}
	}
	async delete(id: string): Promise<Order> {
		try {
			const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
			const conn = await database.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Cannot delete order with id: ${id}, Error: ${err}`);
		}
	}

	async addProduct(orderId: string, productId: string, quantity: number): Promise<Order> {
		try {
			const sql =
				'INSERT INTO order_products (order_id, product_id, quantity) VALUES ((SELECT id FROM orders WHERE id=$1), (SELECT id FROM products WHERE id=$2), $3) RETURNING *';
			const conn = await database.connect();
			const result = await conn.query(sql, [orderId, productId, quantity]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Cannot add new product: ${productId} to order ${orderId}, Error: ${err}`
			);
		}
	}
}
