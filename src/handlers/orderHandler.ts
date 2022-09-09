import express from 'express';
import { Order, OrderStore } from '../models/order';

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

const create = async (req: express.Request, res: express.Response) => {
	try {
		console.log(req.body);
		const row = await store.create({
			userId: req.body.userId,
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
router.post('/', create);
router.post('/:id/products/', addProduct);
router.delete('/:id', remove);

export default router;