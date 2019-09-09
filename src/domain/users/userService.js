const UserModel = require('./UserModel');
const { crypto } = require('../../util');

const create = async (user) => {
  const encrypted = crypto.generateHash(user.password);

  const newUser = new UserModel({
    ...user,
    password: encrypted.hash,
    salt: encrypted.salt,
  });

  await newUser.save();
};

module.exports = {
  create,
};
