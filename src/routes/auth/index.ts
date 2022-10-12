import express from 'express';

import { AuthController } from '../../controllers/auth';

const router = express.Router();

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/refresh', AuthController.refreshToken);

export default router;
