const HTTP_STATUS_CODE = require("./httpStatusCode/httpStatusCode")

class SuccessResponse{

    constructor({
        message, 
        statusCode = HTTP_STATUS_CODE.StatusCodes.OK,
        reasonStatusCode = HTTP_STATUS_CODE.ReasonMessage.OK,
        metadata = {}
    }) 
    {
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res){

        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse{

    constructor({
        message,
        statusCode = HTTP_STATUS_CODE.StatusCodes.OK,
        reasonStatusCode = HTTP_STATUS_CODE.ReasonMessage.OK,
        metadata = {}
    }) {
        super({message,statusCode,reasonStatusCode,metadata}) 
    }

}


class CREATED extends SuccessResponse{

    constructor({
        message,
        statusCode = HTTP_STATUS_CODE.StatusCodes.CREATED,
        reasonStatusCode = HTTP_STATUS_CODE.ReasonMessage.CREATED,
        metadata = {}
    }) 
    {
       super({message,statusCode,reasonStatusCode,metadata}) 
    }

}


module.exports = {
    CREATED,
    OK
}