import express from 'express';
import { Order, OrderStore } from '../models/order';
import verifyToken from './verifyToken';

const router = express.Router();
const store = new OrderStore();

const index = async (req: express.Request, res: express.Response) => {
	try {
		const rows = await store.index();
		res.json(rows);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

const show = async (req: express.Request, res: express.Response) => {
	try {
		const row = await store.show(req.params.id);
		res.json(row);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

const showByUser = async (req: express.Request, res: express.Response) => {
	try {
		const row = await store.showByUser(req.params.id);
		res.json(row);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

const create = async (req: express.Request, res: express.Response) => {
	try {
		const row = await store.create({
			user_id: req.body.userId,
			status: req.body.status,
		});
		res.json(row);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

const remove = async (req: express.Request, res: express.Response) => {
	try {
		const row = await store.delete(req.params.id);
		res.json(row);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

const addProduct = async (req: express.Request, res: express.Response) => {
	try {
		const orderId = req.params.id;
		const { productId, quantity } = req.body;
		const row = await store.addProduct(orderId, productId, parseInt(quantity));
		res.json(row);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

router.get('/', index);
router.get('/:id', show);
router.get('/user/:id', verifyToken, showByUser);
router.post('/', verifyToken, create);
router.post('/:id/products/', verifyToken, addProduct);
router.delete('/:id', verifyToken, remove);

export default router;
