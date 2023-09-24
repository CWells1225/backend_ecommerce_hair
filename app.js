import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

// db 
import { mongoConnect } from './db/connections.js';

const app = express();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`running on port ${PORT}`)); 

if (process.env.NODE_ENV !== 'production'){
	app.use(morgan('dev'));
}

app.use(express.json());

mongoConnect(process.env.MONGO_URI);

app.get('/api/v1', (req, res) => {
	res.json({ msg:'hello world' });
});

