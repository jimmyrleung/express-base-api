const yup = require('yup');

module.exports = class User {
    constructor({ name, email, password }, validatePassword = true) {
        this._name = name || '';
        this._email = email || '';
        this._password = password || '';
        this.errors = [];

        let userShape = {
            name: yup.string()
                .required('The field \'name\' is required.')
                .min('3', 'The field \'name\' must have at least 3 characters.')
                .max('50', 'The field \'name\' must have at most 50 characters.'),
            email: yup.string()
                .required('The field \'email\' is required.')
                .matches(
                    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                    'The field \'email\' isn\'t in a valid format.'
                )
        }

        if (validatePassword) {
            // TODO: define password regex
            userShape.password = yup.string().required()
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