const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
        item: {
            type: String, 
            required: true
        }, 
        description: String,
        price: Number, 
        img: String, 
        reviews: String
})

module.exports = mongoose.model('product', productSchema)