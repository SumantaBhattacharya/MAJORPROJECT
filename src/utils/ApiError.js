class ApiError extends Error{
    constructor(statusCode,message= "Something went wrong", errors=[], stack=""){
        super(message);
        this.statusCode = statusCode
        this.data = null;
        this.message = message;
        this.success = false  //not passing the success code cause we are handling api error handling but not api response
        this.errors = errors

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

module.exports = ApiError
// Example usage:
// throw new ApiError(404, "Resource not found");
// You use { ApiError } when the module exports multiple things as an object. 
// const { ApiError } = require('./path/to/api-errors');