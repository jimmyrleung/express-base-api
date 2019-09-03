const { jwt, crypto } = require('../../util');
const { UserModel } = require('../users');

const login = async (credentials) => {
    const user =
        await UserModel.findOne({ email: credentials.email });

    // TODO: Return user not found error
    if (!user) return null;

    const { hash } = crypto.generateHash(credentials.password, user.salt);

    // TODO: Return incorrect password error
    if (user.password !== hash) return null;

    const token =
        jwt.generate({ _id: user._id, name: user.name, email: user.email });

    return token;

}

module.exports = {
    login,
}