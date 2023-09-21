import Product from '../models/product.js';

export const createProduct = async (req, res) => {
    const { name, color, length, price, images } = req.body;

    if (!name || !color || !length || !price || !images) {
        return res.status(403).json({ error: 'Please provide all required fields.'})
    }

    const productAlreadyExists = await Product.findOne({ name }); 

    if (productAlreadyExists) {
        return res.status(403).json({error: 'This product already exists.'})
    }

    const product = await Product.create({ ...req.body });
    
    return res.status(201).json({message: 'Successful', data: { product }});
}
