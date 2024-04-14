const jwt = require("jsonwebtoken")
const userModel = require("../models/users")
module.exports = async (req,res,next) => {

    try 
    {
        let {__ut} = req.signedCookies
        
        if(!__ut)
        {
            return res.status(401).send('Access denied. No token provided.')
        }

        let token_data = jwt.verify(__ut,process.env.TOKEN_SECRET)

        userModel.findOne({"_id": token_data.UID})
        .then(user => {
            if((!user) || (user.Password != token_data.Password))
            {
                return res.status(401).send('Invalid token.') 
            }
            else
            {
               req.user = token_data; 
               next();
            }
            
        })

    } catch (error) 
    {
        console.log(error);
        return res.status(500).send('Access denied.')
    }
    
}
