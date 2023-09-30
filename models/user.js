import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fName: {
        type: String, 
        required: [true, 'Please type in first name'],
        trim: true
    }, 
    lName: {
        type: String, 
        required: [true, 'Please type in last name'],
        trim: true
    }, 
    email: {
        type: String, 
        required: [true, 'Email is required.'],
        unique: true
    }, 
    password: {
        type: String, 
        required: [true, 'Password is required.']
    }
}); 

module.exports = mongoose.model('User', userSchema);
