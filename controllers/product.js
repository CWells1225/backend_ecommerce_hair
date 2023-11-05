import Product from '../models/product.js';
import { StatusCodes } from 'http-status-codes';

export const createProduct = async (req, res) => {
	const { name, color, length, price, images } = req.body;

	if (!name || !color || !length || !price || !images) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all required fields.' });
	}

	const productAlreadyExists = await Product.findOne({ name }); 

	if (productAlreadyExists) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: 'This product already exists.' });
	}

	const product = await Product.create({ ...req.body });
    
	return res.status(StatusCodes.OK).json({ message: 'Successful', data: { product } });
};

export const getProducts = async (req, res) => {
	const products = await Product.find({}); 

	return res.status(StatusCodes.OK).json(products);
};

export const getProduct = async (req, res) => {
	const { id } = req.params;

	const product = await Product.findById(id);

	if (!product) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: `Product ${id} not found.` });
	}
	res.status(StatusCodes.OK).json(product);
};

export const updateProduct = async (req, res) => {
	const { id } = req.params; 

	const product = await Product.findOneAndUpdate({ _id: id }, {
		...req.body,
	}, { new: true });
    
	if (!product) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Product does not exist.' });
	}

	res.status(StatusCodes.OK).json(product);
}; 

export const deleteProduct = async ( req, res) => {
	const { id } = req.params;

	const product = await Product.findOneAndDelete({ _id: id });

	if(!product) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: `Product with id: ${id} was deleted.` });
	}
	res.status(StatusCodes.OK).json(product);
};
