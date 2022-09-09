import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});
	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});
	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});
	it('should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});
	it('index method should return an array', async () => {
		const result = await store.index();
		expect(result).toEqual([]);
	});
});
