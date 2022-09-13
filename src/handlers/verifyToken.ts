import express from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
): void => {
	try {
		const authorizationHeader = req.headers.authorization as string;
		if (!authorizationHeader) throw new Error();
		const token = authorizationHeader.split(' ')[1];
		jwt.verify(token, process.env.TOKEN_SECRET as string);
		next();
	} catch (err) {
		res.status(401).send(`Error: cannot authorize request, ${err}`);
	}
};

export default verifyToken;
