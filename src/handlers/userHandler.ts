import express from 'express';
import { User, UserStore } from '../models/user';

const router = express.Router();
const store = new UserStore();

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
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			password: req.body.password,
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

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.delete('/:id', remove);

export default router;
