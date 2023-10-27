import express from 'express';
import morgan from 'morgan';
import cors from 'cors';


// db 
import { mongoConnect } from './db/connections.js';

// routers
import productRouter from './routes/product.js'; 

const app = express();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`running on port ${PORT}`)); 

if (process.env.NODE_ENV !== 'production'){
	app.use(morgan('dev'));
}

app.use(cors({
	origin: ['http://localhost:5001'],
	methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
	credentials: true
}));

app.use(express.json());

mongoConnect(process.env.MONGO_URI);

app.get('/api/v1', (req, res) => {
	res.json({ msg: 'hello world' });
});

app.use('/api/v1/products', productRouter);

console.log(process.env.MONGO_URI);

