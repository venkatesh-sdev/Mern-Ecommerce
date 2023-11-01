import ErrorHandler from '../utils/ErrorHandler.js'

export default async (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    if (process.env.NODE_ENV == 'development') {
        res.status(error.statusCode).json({
            message: error.message,
            success: false,
            statck: error.stack,
            error: error.errors
        })
    }
    if (process.env.NODE_ENV == 'production') {
        let errorMessage = error.message;
        let err = { ...error }
        if (error.name === "ValidationError") {
            errorMessage = Object.values(error.errors).map(value => value.message);
            err = new ErrorHandler(errorMessage, 400)
        }
        res.status(error.statusCode).json({
            message: err.message || "Internal Server Error",
            success: false,
        })
    }
}

