const jwt = require("jsonwebtoken")
const User = require("../models/User")
module.exports = function(req,res,next){
    let {Token} = req.signedCookies
    if(!Token)
    {
        return res.redirect("/auth")
    }
    jwt.verify(Token, process.env.TOKENSECRET, (err, result) => {
        if(err)
        {
            return res.redirect("/auth")
        }
        User.findOne({UID: result.UID})
        .then(userAccount => {

            if(!userAccount || userAccount.password != result.password )
            {
                res.cookie("Token", "", {maxAge: 0, signed: true})
                return res.redirect("/auth")
            }
            else
            {
                req.user = result
                if(userAccount.isVerify)
                {
                    
                    next();
                }
                else
                {
                    req.session.needToVerify = true
                    req.session.userUID = result.UID
                    return res.redirect("/firstVerify")
                }
            }
        })       
})
}
