const yup = require('yup');
const { userConstants } = require('../../constants')

module.exports = class User {
    constructor({ name, email, password }, validatePassword = true) {
        this._name = name || '';
        this._email = email || '';
        this._password = password || '';
        this.errors = [];

        let userShape = {
            name: yup.string()
                .required(userConstants.USER_NAME_REQUIRED_MESSAGE)
                .min(userConstants.USER_NAME_MIN_LENGTH, userConstants.USER_NAME_MIN_LENGTH_MESSAGE)
                .max(userConstants.USER_NAME_MAX_LENGTH, userConstants.USER_NAME_MAX_LENGTH_MESSAGE),
            email: yup.string()
                .required(userConstants.USER_EMAIL_REQUIRED_MESSAGE)
                .matches(
                    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                    userConstants.USER_EMAIL_FORMAT_MESSAGE
                )
        }

        if (validatePassword) {
            // TODO: define password regex
            userShape.password = yup.string().required(userConstants.USER_PASSWORD_REQUIRED_MESSAGE)
        }

        this.schema = yup.object().shape(userShape);
    }

    async isValid() {
        try {
            // abortEarly 'true' will return only the first error (with false
            // we return all errors)
            await this.schema.validate(this.values, { abortEarly: false });
            return true;
        } catch (err) {
            this.errors = [...err.errors];
            return false;
        }
    }

    get values() {
        return {
            name: this._name,
            email: this._email,
            password: this._password
        };
    }
}
