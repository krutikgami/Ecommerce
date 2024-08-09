
class ApiError extends Error{
    constructor(status, message, error = [],stack="") {
        super(message);
       
        this.status = status;
        this.message = message;
        this.success = false;
        this.error = error;
        this.stack = stack;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }

}

export {ApiError};