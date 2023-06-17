import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@tenexi/common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
], validateRequest, async (req: Request, res: Response) => {

    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new BadRequestError('Invalid Credentials');
    }

    // Validate Password
    const passwordMatches = await Password.compare(existingUser.password, password);

    if (!passwordMatches) {
        throw new BadRequestError('Invalid Credentials');
    }

    // Create jwt
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    // Store it in a session
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);

});

export { router as signinRouter };