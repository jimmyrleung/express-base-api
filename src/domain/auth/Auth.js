const yup = require('yup');

module.exports = class Auth {
    constructor({ email, password }) {
        this._email = email || '';
        this._password = password || '';
        this.errors = [];

        this.schema = yup.object().shape({
            email: yup.string()
                .required('The field \'email\' is required.')
                .matches(
                    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                    'The field \'email\' isn\'t in a valid format.'
                ),
            password: yup.string().required('The field \'password\' is required.')
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
