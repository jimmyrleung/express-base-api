const yup = require('yup');
const { todoConstants } = require('../../constants');

module.exports = class Todo {
    constructor({ name, description }) {
        this._name = name || '';
        this._description = description || '';
        this.errors = [];

        this.schema = yup.object().shape({
            name: yup.string()
                .required(todoConstants.TODO_NAME_REQUIRED_MESSAGE)
                .min(todoConstants.TODO_NAME_MIN_LENGTH, todoConstants.TODO_NAME_MIN_LENGTH_MESSAGE)
                .max(todoConstants.TODO_NAME_MAX_LENGTH, todoConstants.TODO_NAME_MAX_LENGTH_MESSAGE),
            description: yup.string()
                .required(todoConstants.TODO_DESCRIPTION_REQUIRED_MESSAGE)
                .min(todoConstants.TODO_DESCRIPTION_MIN_LENGTH, todoConstants.TODO_DESCRIPTION_MIN_LENGTH_MESSAGE)
                .max(todoConstants.TODO_DESCRIPTION_MAX_LENGTH, todoConstants.TODO_DESCRIPTION_MAX_LENGTH_MESSAGE),
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