import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {

    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super();
        // Do this when extending language classes
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => {
            if (error.type == 'field') {
                return { message: error.msg, field: error.path };
            }
            return { message: error.msg };
        });
    }
}