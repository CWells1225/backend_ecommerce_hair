import User from '../models/user.js'; 
import { StatusCodes } from 'http-status-codes';

export const register = async (req, res) => {
    const schema = registerSchema(req.body)

    if (schema.error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: schema.error.details[0].message,
        });
    }

    const { fName, lName, email, password } = req.body; 

    const userAlreadyExists = await User.findOne({ email: req.body.email });

    if (userAlreadyExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: '"Email" already in use', 
            field: 'email',
        });
    }

    const user = await User.create ({
        fName, 
        lName, 
        email, 
        password,
    });

    const token = user.createJWT(); 

    return res.status(StatusCodes.CREATED).json({
        message: 'User created successfully',
        data: {
                token,
        },
    });
};

export const login = async (req, res) => {
    const schema = loginSchema(req.body);

    if (schema.error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: schema.error.details[0].message,
        });
    }

    const { fName, lName, email, password } = req.body; 

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.json({ error: 'Invalid Credentials'}); 
    }

    const isPasswordCoreect = await user.comparePassword(password);

    if (!isPasswordCoreect) {
        return res.json({ error: 'Invalid Credentials'});
    }

    const token = user.createJWT(); 

    user.password=undefined;

    res.status(StatusCodes.OK).json({
        message: 'Login successfully',
        token,
    });

}; 

export const updateUser = async (req, res) => {
    const { id } = req.params; 

    if (!id) {
            return res.json({ error: 'Please provide user id'});
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(StatusCodes.OK).json({
        message: 'Updated Successful',
        data: {...user._doc},
    });
};

