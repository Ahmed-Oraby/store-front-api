import express from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyToken from './verifyToken';

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
		const newUser = await store.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			password: req.body.password,
		});
		const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
		res.json({ newUser, token });
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

const authenticate = async (req: express.Request, res: express.Response) => {
	try {
		const user = await store.authenticate(req.body.username, req.body.password);
		const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
		res.json(user);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
};

router.get('/', verifyToken, index);
router.get('/:id', verifyToken, show);
router.post('/', create);
router.delete('/:id', verifyToken, remove);

export default router;
