import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    // console.log(err);

    if (err instanceof CustomError) {

        return res.status(err.statusCode).json({
            errors: err.serializeErrors()
        });

    }

    if (err instanceof SyntaxError) {
        return res.status(400).json({
            errors: [
                { message: 'Bad Request: syntax error' }
            ]
        });
    }

    res.status(400).json({
        errors: [
            { message: 'Something went wrong' }
        ]
    });

};