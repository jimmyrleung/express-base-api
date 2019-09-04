const yup = require('yup');
const { authConstants } = require('../../constants');

module.exports = class Auth {
    constructor({ email, password }) {
        this._email = email || '';
        this._password = password || '';
        this.errors = [];

        this.schema = yup.object().shape({
            email: yup.string()
                .required(authConstants.AUTH_EMAIL_REQUIRED_MESSAGE)
                .matches(
                    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                    authConstants.AUTH_EMAIL_FORMAT_MESSAGE
                ),
            password: yup.string().required(authConstants.AUTH_PASSWORD_REQUIRED_MESSAGE)
        });
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
            email: this._email,
            password: this._password
        };
    }
}
