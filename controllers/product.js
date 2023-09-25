import Product from '../models/product.js';

export const createProduct = async (req, res) => {
    const { name, color, length, price, images } = req.body;

    if (!name || !color || !length || !price || !images) {
        return res.status(403).json({error: 'Please provide all required fields.'})
    }

    const productAlreadyExists = await Product.findOne({ name }); 

    if (productAlreadyExists) {
        return res.status(403).json({error: 'This product already exists.'})
    }

    const product = await Product.create({ ...req.body });
    
    return res.status(201).json({message: 'Successful', data: { product }});
}

export const getProducts = async (req, res) => {
    const products = await Product.find({ }) 

    return res.status(201).json(products)
}

export const getProduct = async (req, res) => {
    const { id } = req.params

    const product = await Product.findById(id)

    if (!product) {
        return res.status(403).json({error: 'Product not found.'})
    }
    res.status(200).json(product)
}
