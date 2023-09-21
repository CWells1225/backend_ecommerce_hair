import express from 'express';
import { createProduct } from '../controllers/product.js'
const router = express.Router();

router.route('/').post(createProduct)

export default router; 
