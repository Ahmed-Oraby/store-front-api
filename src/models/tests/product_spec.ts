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
});

const product: Product = {
	name: 'laptop',
	price: 1000,
};

describe('Testing product model methods', () => {
	it('Create method should create a product and return it', async () => {
		const result = await store.create(product);
		expect(result.name).toEqual(product.name);
		expect(result.price).toEqual(product.price);
	});

	it('Show method should return a product with specified id', async () => {
		//create a test product and then show it by id
		const testProduct = await store.create(product);

		const result = await store.show(testProduct.id as string);
		expect(result.name).toEqual(product.name);
		expect(result.price).toEqual(product.price);
	});

	it('Index method should return an array of products', async () => {
		const testProduct = await store.create(product);

		const result = await store.index();
		expect(result.length).toBeGreaterThan(0);
	});

	it('Delete method should return the deleted product', async () => {
		//create a test product and then delete it by id
		const testProduct = await store.create(product);

		const result = await store.delete(testProduct.id as string);
		expect(result.name).toEqual(product.name);
	});
});
