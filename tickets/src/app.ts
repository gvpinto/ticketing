import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUser, errorHandler, NotFoundError } from '@tenexi/common';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';


const app = express();
app.set('trust proxy', true); // Trust the ingrex proxy

app.use(json());
app.use(cookieSession({
    signed: false, // Do not encrypt the cookie
    secure: (process.env.NODE_ENV !== 'test') // send cookie only over https connection
}));

app.use(currentUser);

app.use(createTicketRouter);


app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }; // Named Exports