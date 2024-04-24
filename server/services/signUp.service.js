const userModel = require('../models/users');
const { ServerError } = require('../helpers/error.response');
const bcrypt = require('bcrypt');
class SignUpService {
  static signUp = async ({ Email, Fullname, DoB, Phonenumber, Password }) => {
    let salt = parseInt(process.env.SALT_ROUNDS);
    let hashedPassword = bcrypt.hashSync(Password, salt);

    DoB = DoB.split('/').reverse().join('/');

    let new_user = await userModel.create({
      Email: Email,
      Password: hashedPassword,
      FullName: Fullname,
      DoB: new Date(DoB),
      PhoneNumber: Phonenumber,
    });

    if (new_user) {
      return { message: 'Sign Up Success 🤗' };
    } else {
      throw new ServerError(
        'Something wrong during sign up your account 😢',
        503
      );
    }
  };
}

module.exports = SignUpService;
