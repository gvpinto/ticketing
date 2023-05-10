import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be between 8 and 20 characters')
], (req: Request, res: Response) => {
    res.send('Hi there signup');
});

export { router as signupRouter };