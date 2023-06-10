import { CustomError } from "./custom-error";

export class NotAuthorizedAuth extends CustomError {

    statusCode = 401;
    constructor() {
        super('Not Authorized');
        Object.setPrototypeOf(this, NotAuthorizedAuth.prototype);
    }
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'Not Authorized' }];

    }

}