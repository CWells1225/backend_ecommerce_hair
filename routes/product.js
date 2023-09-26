import express from 'express';
import { createProduct } from '../controllers/product.js';
import { getProducts } from '../controllers/product.js';
import { getProduct } from '../controllers/product.js';
import { updateProduct } from '../controllers/product.js';
import { deleteProduct } from '../controllers/product.js';

const router = express.Router();

router.route('/').post(createProduct).get(getProducts);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router; 
