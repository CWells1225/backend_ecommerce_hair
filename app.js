import express from 'express';
import morgan from 'morgan';

const app = express()

const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`running on port ${PORT}`)); 

if (process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
};

app.use(express.json());

app.get('/api/v1', (req, res) => {
    res.json({ msg:'hello world' })
})