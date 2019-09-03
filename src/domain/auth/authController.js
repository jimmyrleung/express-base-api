const { jwt } = require('../../util');

const login = (req, res) => {
    const token = jwt.generate(req.body);
    res.json({ token });
}

module.exports = {
    login
}