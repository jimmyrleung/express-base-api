const User = require('./User');
const userService = require('./userService');

const create = async (req, res) => {
    const user = new User(req.body);

    if (!await user.isValid()) {
        return res.status(400).json({
            errors: user.errors
        })
    }

    await userService.create(user.values);
    res.status(201).json();
}

module.exports = {
    create,
}