const userModel = require("../models/users")
const bcrypt = require('bcrypt');
class SignUpService{

    static signUp = async({Email, Fullname, DoB,Phonenumber, Password}) => {

        let salt = parseInt(process.env.SALT_ROUNDS)
        let hashedPassword = bcrypt.hashSync(Password, salt)
        
        let new_user = await userModel.create({
                    Email: Email,
                    Password: hashedPassword,
                    FullName: Fullname,
                    DoB: new Date(DoB),
                    PhoneNumber: Phonenumber
        })
        
        if(new_user)
        {
            return {"message": 'Sign Up Success 🤗'} 
        }
        else
        {
            return {"message": 'Something wrong during sign up your account 😢'}
        }

    }
    

    

}

module.exports = SignUpService