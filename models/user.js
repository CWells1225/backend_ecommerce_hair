import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
	fName: {
		type: String, 
		required: [true, 'Please type in first name'],
		trim: true,
	}, 
	lName: {
		type: String, 
		required: [true, 'Please type in last name'],
		trim: true,
	}, 
	email: {
		type: String, 
		required: [true, 'Email is required.'],
		unique: true, 
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
			trim: true,
		},
	}, 
	password: {
		type: String, 
		required: [true, 'Password is required.'],
	}, 
	createdAt: {
		type: Date, 
		default: new Date(),
	},
}); 

userSchema.pre('save', async function () {
	this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model('User', userSchema);
