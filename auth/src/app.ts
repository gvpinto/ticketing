import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler, NotFoundError } from '@tenexi/common';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true); // Trust the ingrex proxy

app.use(json());
app.use(cookieSession({
    signed: false, // Do not encrypt the cookie
    secure: (process.env.NODE_ENV !== 'test') // send cookie only over https connection
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }; // Named Exports