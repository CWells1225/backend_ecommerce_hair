import User from '../models/user.js';
import { createSecretToken } from '../util/SecretToken.js';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

export const signUp = async (req, res, next) => {
	try {
		const { fName, lName, email, password, createdAt } = req.body;
		const userAlreadyExists = await User.findOne({ email: req.body.email });

		if (userAlreadyExists) {
			return res.json({ message: 'User already exists.' });
		}
		const user = await User.create({
			fName,
			lName,
			email,
			password,
			createdAt,
		});

		const token = createSecretToken(user._id);
		res.cookie('token', token, {
			withCredentials: true,
			httpOnly: false,
		});
		res
			.status(StatusCodes.OK)
			.json({ message: 'User signed in successfully.', success: true, user });
		next();
	} catch (error) {
		console.error(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password){
			return res.json({ message: 'All fields are required.' });
		}
		const user = await User.findOne({ email }); 
		
		if(!user){
			return res.json({ message: 'Invalid login' });
		}
		const auth = await bcrypt.compare(password,user.password);
		
		if (!auth) {
			return res.json({ message: 'Incorrect password or email.' });
		}
		const token = createSecretToken(user._id); 
		res.cookie('token', token, {
			withCredentials: true, 
			httpOnly: false, 
		}); 
		res.status(StatusCodes.OK).json({ message: 'User logged in successfully.', success: true }); 
		next();
	} catch (error) {
		console.error(error);
	}
}; 