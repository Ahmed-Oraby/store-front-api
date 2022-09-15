import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import { Order } from '../models/order';

const request = supertest(app);

const userStore = new UserStore();

const user: User = {
	firstname: 'John',
	lastname: 'Doe',
	username: 'johndoe',
	password: '12345',
};
const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);

describe('Test order endpoints response', () => {
	it('POST an order', async () => {
		//create a test user first
		const testUser = await userStore.create(user);

		const order: Order = {
			user_id: testUser.id as string,
			status: 'active',
		};

		const response = await request
			.post('/api/orders')
			.set('Authorization', `Bearer ${token}`)
			.send(order);
		expect(response.status).toBe(200);
	});

	it('GET an order', async () => {
		const response = await request.get('/api/orders/1').set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('GET all orders', async () => {
		const response = await request.get('/api/orders').set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('Delete an order', async () => {
		const response = await request
			.delete('/api/orders/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
});
