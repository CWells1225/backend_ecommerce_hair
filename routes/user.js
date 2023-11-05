import express from 'express';
import { signUp, login, userVerification } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/', userVerification);

export default router; 
