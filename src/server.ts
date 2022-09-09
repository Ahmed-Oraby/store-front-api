import express from 'express';
import bodyParser from 'body-parser';
import productRouter from './handlers/productHandler';
import userRouter from './handlers/userHandler';
import orderRouter from './handlers/orderHandler';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: express.Request, res: express.Response): void => {
	res.send('Welcome to our Storefront!');
});

app.listen(port, (): void => {
	console.log(`listening on port: ${port}`);
});
