import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const msg = error.message || 'Something went wrong'
    res.status(statusCode).json({ msg})
}
export default errorHandlerMiddleware