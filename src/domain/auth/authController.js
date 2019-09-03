const Auth = require('./Auth');
const authService = require('./authService');

const login = async (req, res) => {
    const credentials = new Auth(req.body);

    if (!await credentials.isValid()) {
        return res.status(400).json({
            errors: credentials.errors
        })
    }

    const token = await authService.login(credentials.values);

    if (!token) {
        return res.status(400).json({
            errors: [`Email or password invalid.`]
        })
    }

    res.json({ token });
}

module.exports = {
    login
}