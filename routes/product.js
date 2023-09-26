import express from 'express';
import { createProduct } from '../controllers/product.js';
import { getProducts } from '../controllers/product.js';
import { getProduct } from '../controllers/product.js';
const router = express.Router();

router.route('/').post(createProduct).get(getProducts);
router.route('/:id').get(getProduct);

export default router; 
