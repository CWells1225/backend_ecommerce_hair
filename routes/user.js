import express from 'express';
import { 
        register,
	    login,
	    updateUser,
	    getUsers,
	    getUser,
	    deleteUser, 
    } from '../controllers/user.js';

    const router = express.Router();

    router.route('/register').post(register);
    router.route('/login').post(login);
    router.route('/users').get(checkAuth, getUsers);
    router.route('/users/:id');
    router.get(checkAuth, getUser);
    router.delete(checkAuth, deleteUser);
    router.patch(checkAuth, updateUser);

    export default router; 
