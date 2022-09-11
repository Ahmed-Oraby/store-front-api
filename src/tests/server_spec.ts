import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('Test endpoint response', () => {
	it('gets the products api endpoint', async () => {
		const response = await request.get('/api/products');
		expect(response.status).toBe(200);
	});
	it('gets the orders api endpoint', async () => {
		const response = await request.get('/api/orders');
		expect(response.status).toBe(200);
	});
});
