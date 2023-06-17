import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@tenexi/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be between 8 and 20 characters')
], validateRequest, async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser != null) {
        throw new BadRequestError('User id in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Create jwt
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    // Store it in a session
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);

});

export { router as signupRouter };