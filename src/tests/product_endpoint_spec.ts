import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Product } from '../models/product';

const request = supertest(app);

const user: User = {
	firstname: 'John',
	lastname: 'Doe',
	username: 'johndoe',
	password: '12345',
};
const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);

describe('Test product endpoints response', () => {
	it('GET all products', async () => {
		const response = await request.get('/api/products');
		expect(response.status).toBe(200);
	});

	it('GET a product', async () => {
		const response = await request.get('/api/products/1');
		expect(response.status).toBe(200);
	});

	it('POST a product using token', async () => {
		const product: Product = {
			name: 'laptop',
			price: 2000,
		};

		const response = await request
			.post('/api/products')
			.set('Authorization', `Bearer ${token}`)
			.send(product);
		expect(response.status).toBe(200);
	});

	it('Delete a product', async () => {
		const response = await request
			.delete('/api/products/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
});
