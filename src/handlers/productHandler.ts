import express from 'express';
import { Product, ProductStore } from '../models/product';
import verifyToken from './verifyToken';

const router = express.Router();
const store = new ProductStore();

const index = async (req: express.Request, res: express.Response): Promise<void> => {
	try {
		const rows = await store.index();
		res.json(rows);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

const show = async (req: express.Request, res: express.Response): Promise<void> => {
	try {
		const row = await store.show(req.params.id);
		res.json(row);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
	try {
		const row = await store.create({
			name: req.body.name,
			price: req.body.price,
		});
		res.json(row);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

const remove = async (req: express.Request, res: express.Response): Promise<void> => {
	try {
		const row = await store.delete(req.params.id);
		res.json(row);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

router.get('/', index);
router.get('/:id', show);
router.post('/', verifyToken, create);
router.delete('/:id', remove);

export default router;
