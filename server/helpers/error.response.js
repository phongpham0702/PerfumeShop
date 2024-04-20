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




module.exports = {
    ForbiddenError,
    BadRequestError,
    ServerError,
    SignUpInValid
}