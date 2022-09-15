import { Order, OrderStore } from '../order';
import { User, UserStore } from '../user';

const userStore = new UserStore();
const store = new OrderStore();

describe('Order Model', () => {
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

const user: User = {
	firstname: 'John',
	lastname: 'Doe',
	username: 'johndoe',
	password: '12345',
};

describe('Testing order model methods', () => {
	it('Create method should create an order and return it', async () => {
		//create a test user first
		const testUser = await userStore.create(user);

		const order: Order = {
			user_id: testUser.id as string,
			status: 'active',
		};

		const result = await store.create(order);
		expect(result.user_id).toEqual(order.user_id.toString());
		expect(result.status).toEqual(order.status);
	});

	it('Show method should return an order with specified id', async () => {
		//create a test user first
		const testUser = await userStore.create(user);

		const order: Order = {
			user_id: testUser.id as string,
			status: 'active',
		};

		//create a test order and then show it by id
		const testOrder = await store.create(order);

		const result = await store.show(testOrder.id as string);
		expect(result.user_id).toEqual(testOrder.user_id);
		expect(result.status).toEqual(testOrder.status);
	});

	it('Index method should return an array of orders', async () => {
		//create a test user first
		const testUser = await userStore.create(user);

		const order: Order = {
			user_id: testUser.id as string,
			status: 'active',
		};

		//create a test order and then show it by id
		const testOrder = await store.create(order);

		const result = await store.index();
		expect(result.length).toBeGreaterThan(0);
	});

	it('Delete method should return the deleted order', async () => {
		//create a test user first
		const testUser = await userStore.create(user);

		const order: Order = {
			user_id: testUser.id as string,
			status: 'active',
		};

		//create a test order and then show it by id
		const testOrder = await store.create(order);

		const result = await store.delete(testOrder.id as string);
		expect(result.user_id).toEqual(testOrder.user_id);
	});
});
