const {Types} = require('mongoose')

class Converter{

    toObjectIdMongo = (strID) => {

        return new Types.ObjectId(strID)

    }

}

module.exports = new Converter()