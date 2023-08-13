import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.message=message
        this.name = 'NotFoundError';
        this.statusCode = StatusCodes.NOT_FOUND
    } 
}
export class BadRequest extends Error {
    constructor(message) {
        super(message)
        this.message=message
        this.name = 'BadRequestError';
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export class UnAuthenticated extends Error {
    constructor(message) {
        super(message)
        this.message=message
        this.name = 'UnAuthenticatedError';
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
export class UnAutherized extends Error {
    constructor(message) {
        super(message)
        this.message=message
        this.name = 'UnAutherizedError';
        this.statusCode = StatusCodes.FORBIDDEN
    }
}