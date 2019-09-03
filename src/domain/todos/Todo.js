const yup = require('yup');

module.exports = class Todo {
    constructor({ name, description }) {
        this._name = name || '';
        this._description = description || '';
        this.errors = [];

        this.schema = yup.object().shape({
            name: yup.string()
                .required('The field \'name\' is required.')
                .min('3', 'The field \'name\' must have at least 3 characters .')
                .max('50', 'The field \'name\' must have at most 50 characters.'),
            description: yup.string()
                .required('The field \'description\' is required.')
                .min('3', 'The field \'description\' must have at least 3 characters .')
                .max('200', 'The field \'description\' must have at most 200 characters.'),
        })
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
        return { name: this._name, description: this._description };
    }
}