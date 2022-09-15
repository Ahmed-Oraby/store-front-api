import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test server entry point', () => {
	it('GET /', async () => {
		const response = await request.get('/');
		expect(response.status).toBe(200);
	});
});
