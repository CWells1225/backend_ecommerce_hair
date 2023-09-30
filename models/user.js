import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fName: {
        type: String, 
        required: [true, 'Please type in first name'],
    }, 
    lName: {
        type: String, 
        required: [true, 'Please type in last name'],
    }, 
    email: {
        type: String, 
        required: [true, 'Email is required.'],
    }, 
    password: {
        type: String, 
        required: [true, 'Password is required.'],
    }
}); 

module.exports = mongoose.model('User', userSchema);
