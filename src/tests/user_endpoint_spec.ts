import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const request = supertest(app);

const user: User = {
	firstname: 'John',
	lastname: 'Doe',
	username: 'johndoe',
	password: '12345',
};
const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);

describe('Test user endpoints response', () => {
	it('POST a user', async () => {
		const response = await request.post('/api/users').send(user);
		expect(response.status).toBe(200);
	});

	it('GET a user', async () => {
		const response = await request.get('/api/users/1').set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('GET all user', async () => {
		const response = await request.get('/api/users').set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('Delete a user', async () => {
		const response = await request
			.delete('/api/users/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
});
