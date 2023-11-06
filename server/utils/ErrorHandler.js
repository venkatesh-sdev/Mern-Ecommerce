// Creating a Error Handler Fuction to Maintain the Errors
class ErrorHandler extends Error {
    // Creating the Construtor that Recives a message and Stauscode
    constructor(message, statusCode) {
        // Message sent to the Error Class and Access with (.) dot operator
        super(message);
        // Status code stored in the instance of the Error Handler Class
        this.statusCode = statusCode;
        // Pass the instance and the Constructor as a callback for the CaptureStackTrace for Getting Stack Error message
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;