import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test GET endpoints response', () => {
	it('get all products', async () => {
		const response = await request.get('/api/products');
		expect(response.status).toBe(200);
	});
	it('get a product', async () => {
		const response = await request.get('/api/products/1');
		expect(response.status).toBe(200);
	});
	it('get all orders', async () => {
		const response = await request.get('/api/orders');
		expect(response.status).toBe(200);
	});
	it('get an order', async () => {
		const response = await request.get('/api/orders/1');
		expect(response.status).toBe(200);
	});
	it('get all users only when authorized', async () => {
		const response = await request.get('/api/users');
		expect(response.unauthorized).toBe(true);
	});
	it('get a user only when authorized', async () => {
		const response = await request.get('/api/users/1');
		expect(response.unauthorized).toBe(true);
	});
});

describe('Test POST endpoints', () => {
	it('post a product only when authorized', async () => {
		const response = await request.post('/api/products');
		expect(response.unauthorized).toBe(true);
	});
	it('post an order only when authorized', async () => {
		const response = await request.post('/api/orders');
		expect(response.unauthorized).toBe(true);
	});
	it('post a user without authorization', async () => {
		const response = await request.post('/api/users/1');
		expect(response.unauthorized).toBe(false);
	});
});

describe('Test DELETE endpoints', () => {
	it('delete a product only when authorized', async () => {
		const response = await request.delete('/api/products/1');
		expect(response.unauthorized).toBe(true);
	});
	it('delete an order only when authorized', async () => {
		const response = await request.delete('/api/orders/1');
		expect(response.unauthorized).toBe(true);
	});
	it('delete a user only when authorized', async () => {
		const response = await request.delete('/api/users/1');
		expect(response.unauthorized).toBe(true);
	});
});
