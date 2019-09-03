const User = require('./User');
const userService = require('./userService');
const { CustomErrorHandler } = require('../../util');

const create = async (req, res) => {
    const user = new User(req.body);

    if (!await user.isValid()) {
        return res.status(400).json({
            errors: user.errors
        })
    }

    try {
        await userService.create(user.values);
        res.status(201).json();
    } catch (err) {
        console.log('Couldn\'t create a new user.', err);
        CustomErrorHandler.handle(err, res);
    }
}

module.exports = {
    create,
}