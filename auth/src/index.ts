import mongoose from "mongoose";
import { app } from './app';

const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY key is not found');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI key is not found');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Mongo database successfully');
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });

};

start();
