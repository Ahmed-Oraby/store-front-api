import { User, UserStore } from '../user';
import bcrypt from 'bcrypt';

const store = new UserStore();

describe('User Model', () => {
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

const pepper = process.env.BCRYPT_PASSWORD;
const user: User = {
	firstname: 'John',
	lastname: 'Doe',
	username: 'johndoe',
	password: '12345',
};

describe('Testing user model methods', () => {
	it('Create method should create a user and return it', async () => {
		const result = await store.create(user);
		expect(result.username).toEqual(user.username);
	});

	it('Show method should return a user with specified id', async () => {
		//create a test user and then show it by id
		const testUser = await store.create(user);

		const result = await store.show(testUser.id as string);
		expect(result.firstname).toEqual(user.firstname);
		expect(result.lastname).toEqual(user.lastname);
		expect(result.username).toEqual(user.username);
		const password = bcrypt.compareSync(user.password + pepper, result.password);
		expect(password).toBe(true);
	});

	it('Index method should return an array of users', async () => {
		const testUser = await store.create(user);

		const result = await store.index();
		expect(result.length).toBeGreaterThan(0);
	});

	it('Delete method should return the deleted user', async () => {
		//create a test user and then delete it by id
		const testUser = await store.create(user);

		const result = await store.delete(testUser.id as string);
		expect(result.username).toEqual(user.username);
	});
});
