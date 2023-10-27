import User from '../models/user.js';
import { createSecretToken } from '../util/SecretToken.js';
import { StatusCodes } from 'http-status-codes';

export const signUp = async (req, res, next) => {
	try {
		const { fname, lname, email, password, createdAt } = req.body;
		const userAlreadyExists = await User.findOne({ email: req.body.email });

		if (userAlreadyExists) {
			return res.json({ message: 'User already exists.' });
		}
		const user = await User.create({
			fname,
			lname,
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
