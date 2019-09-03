const { jwt, crypto, CustomError } = require('../../util');
const { UserModel } = require('../users');

const login = async (credentials) => {
    const user =
        await UserModel.findOne({ email: credentials.email });

    // TODO: Return user not found error

    if (!user) throw new CustomError('User not found.', 404);

    const { hash } = crypto.generateHash(credentials.password, user.salt);

    // TODO: Return incorrect password error
    if (user.password !== hash) throw new CustomError('Incorrect username or password', 403);

    const token =
        jwt.generate({ _id: user._id, name: user.name, email: user.email });

    return token;

}

module.exports = {
    login,
}