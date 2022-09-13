import express from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
): void => {
	try {
		const authorizationHeader = req.headers.authorization as string;
		const token = authorizationHeader.split(' ')[1];
		jwt.verify(token, process.env.TOKEN_SECRET as string);
		next();
	} catch (err) {
		res.status(401).send(`Error: ${err}`);
	}
};

export default verifyToken;
