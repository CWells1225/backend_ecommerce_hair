import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: [true, 'Please type in a name']
	}, 
	color: {
		type: String,
		required: [true, 'Please type in a color']
	}, 
	length: { 
		type: Number,
		required: [true, 'Please type in a length']
	},    
	price: {
		type: Number, 
		required: [true, 'Please type in a price']
	},   
	images: [{ 
		type: String, 
		required: [true, 'Please insert an image']
	}],
	rating: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Product', productSchema);
