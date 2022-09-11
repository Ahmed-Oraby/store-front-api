import express from 'express';
import bodyParser from 'body-parser';
import productRouter from './handlers/productHandler';
import userRouter from './handlers/userHandler';
import orderRouter from './handlers/orderHandler';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 3000;

const corsOptions = {
	origin: `localhost:${port}`,
	successStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: express.Request, res: express.Response): void => {
	res.send('<h1>Welcome to our Storefront!</h1>');
});

app.listen(port, (): void => {
	console.log(`listening on port: ${port}`);
});

export default app;
