const HTTP_STATUS_CODE = require("./httpStatusCode/httpStatusCode")

class ErrorResponse extends Error{

    constructor( message, status) 
    {
        super(message,status)
        this.status = status
    }

}

class ForbiddenError extends ErrorResponse{

    constructor(message = HTTP_STATUS_CODE.ReasonMessage.FORBIDDEN,
        status = HTTP_STATUS_CODE.StatusCodes.FORBIDDEN ) 
    {
        super(message,status)    
    }

}

class BadRequestError extends ErrorResponse{
    constructor(message = HTTP_STATUS_CODE.ReasonMessage.BAD_REQUEST,
        status = HTTP_STATUS_CODE.StatusCodes.BAD_REQUEST) 
    {
        super(message,status)
        
    }
}

class ServerError extends ErrorResponse{
    constructor(message = HTTP_STATUS_CODE.ReasonMessage.INTERNAL_SERVER_ERROR,
                status = HTTP_STATUS_CODE.StatusCodes.INTERNAL_SERVER_ERROR) {
                    
        super(message,status)
        //this.message = message            
    }
}


class SignUpInValid extends ErrorResponse{

    constructor(message,status = HTTP_STATUS_CODE.StatusCodes.BAD_REQUEST) 
    {
        super(message,status)   
        this.message = message 
    }

}

class AuthFailureError extends ErrorResponse{

    constructor(message = HTTP_STATUS_CODE.ReasonMessage.UNAUTHORIZED,
        status = HTTP_STATUS_CODE.StatusCodes.UNAUTHORIZED) 
    {
        super(message,status)   
        this.message = message 
    }

}

class NotFoundError extends ErrorResponse{

    constructor(message = HTTP_STATUS_CODE.ReasonMessage.NOT_FOUND,
        status = HTTP_STATUS_CODE.StatusCodes.NOT_FOUND) 
    {
        super(message,status)   
        this.message = message 
    }

}

class LockedError extends ErrorResponse{
    constructor(message = HTTP_STATUS_CODE.ReasonMessage.LOCKED,
        status = HTTP_STATUS_CODE.StatusCodes.LOCKED) 
    {
        super(message,status)
        
    }
}

class NotAcceptError extends ErrorResponse{
    constructor(message = HTTP_STATUS_CODE.ReasonMessage.NOT_ACCEPTABLE,
        status = HTTP_STATUS_CODE.StatusCodes.NOT_ACCEPTABLE) 
    {
        super(message,status)
        
    }
}



module.exports = {
    ForbiddenError,
    BadRequestError,
    ServerError,
    SignUpInValid,
    AuthFailureError,
    NotFoundError,
    LockedError
}