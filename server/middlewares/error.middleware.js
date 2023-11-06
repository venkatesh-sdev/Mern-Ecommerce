import ErrorHandler from '../utils/ErrorHandler.js'

// The Error Middleware that manages Errors
export default async (error, req, res, next) => {
    // Check the Status Code present or not
    error.statusCode = error.statusCode || 500;
    // Error Handling for Development
    if (process.env.NODE_ENV == 'development') {
        // Sending The Response with the Specific Status Code
        res.status(error.statusCode).json({
            // Error Message that Set by the user or given by the interpreter
            message: error.message,
            // Success Message as False
            success: false,
            // Error Stack which Gained by the CaptureStackTrace method in Error Class
            statck: error.stack,
            // Sending Errors Object to gain More info about the Error
            error: error.errors
        })
    }
    // Error Handling for the production
    if (process.env.NODE_ENV == 'production') {
        // Extacting the Error Message
        let errorMessage = error.message;
        // Send the Error Message to the Error Class and get the Error Object
        let err = new Error(errorMessage)
        // Check the Type of Error 

        // The Error Which Handle Mongoose Validation Errors
        if (error.name === "ValidationError") {
            // Extracting All the Values of the Error Object and only Send the message of the Error
            errorMessage = Object.values(error.errors).map(value => value.message);
            err = new ErrorHandler(errorMessage, 400)
        }
        // Managing the Cast Error that Comes for the Url Mistakes and more
        if (error.name === "CastError") {
            errorMessage = "Resource Not Found : " + error.path;
            err = new Error(errorMessage, 400)
        }
        // Sending the Error Responce to the user
        res.status(error.statusCode).json({
            message: err.message || "Internal Server Error",
            success: false,
        })
    }
}

