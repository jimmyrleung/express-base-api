const { todoConstants } = require('../../../src/constants');
const { Todo } = require('../../../src/domain/todos');

describe('Todo class', () => {
  describe('#Validation', () => {
    test('#should be valid when everything is rightly filled', async (done) => {
      const todo = new Todo({
        name: 'My First To do',
        description: 'That\'s my first to do :D!',
      });

      const isValid = await todo.isValid();

      expect(isValid).toBeTruthy();
      expect(todo.errors.length).toBe(0);
      done();
    });

    test('#should be invalid when name is missing', async (done) => {
      const todo = new Todo({
        description: 'I don\'t have a name :shrug:',
      });

      const isValid = await todo.isValid();
      const includesErrorMessage = todo.errors
        .includes(todoConstants.TODO_NAME_REQUIRED_MESSAGE);

      expect(isValid).toBeFalsy();
      expect(includesErrorMessage).toBeTruthy();
      done();
    });

    test('#should be invalid when description is missing', async (done) => {
      const todo = new Todo({
        name: 'Not finished yet',
      });

      const isValid = await todo.isValid();
      const includesErrorMessage = todo.errors
        .includes(todoConstants.TODO_DESCRIPTION_REQUIRED_MESSAGE);

      expect(isValid).toBeFalsy();
      expect(includesErrorMessage).toBeTruthy();
      done();
    });

    test('#should be invalid if the todo\'s name length is less than the configured min length', async (done) => {
      let nameBelowMinLength = '';

      for (let i = 1; i < todoConstants.TODO_NAME_MIN_LENGTH; i++) {
        nameBelowMinLength += 's';
      }

      const todo = new Todo({
        name: nameBelowMinLength,
        description: 'ToDoZin',
      }, false);

      const isValid = await todo.isValid();
      const includesErrorMessage = todo.errors
        .includes(todoConstants.TODO_NAME_MIN_LENGTH_MESSAGE);

      expect(isValid).toBeFalsy();
      expect(includesErrorMessage).toBeTruthy();
      done();
    });

    test('#should be invalid if the todo\'s name length is greater than the configured max length', async (done) => {
      let nameAboveMaxLength = '';

      for (let i = 0; i <= todoConstants.TODO_NAME_MAX_LENGTH; i++) {
        nameAboveMaxLength += 's';
      }

      const todo = new Todo({
        name: nameAboveMaxLength,
        description: 'ToDoZiN',
      }, false);

      const isValid = await todo.isValid();
      const includesErrorMessage = todo.errors
        .includes(todoConstants.TODO_NAME_MAX_LENGTH_MESSAGE);

      expect(isValid).toBeFalsy();
      expect(includesErrorMessage).toBeTruthy();
      done();
    });

    test('#should be invalid if the todo\'s description length is less than the configured min length', async (done) => {
      let descriptionBelowMinLength = '';

      for (let i = 1; i < todoConstants.TODO_DESCRIPTION_MIN_LENGTH; i++) {
        descriptionBelowMinLength += 's';
      }

      const todo = new Todo({
        name: 'ToDoZiN',
        description: descriptionBelowMinLength,
      }, false);

      const isValid = await todo.isValid();
      const includesErrorMessage = todo.errors
        .includes(todoConstants.TODO_DESCRIPTION_MIN_LENGTH_MESSAGE);

      expect(isValid).toBeFalsy();
      expect(includesErrorMessage).toBeTruthy();
      done();
    });

    test('#should be invalid if the todo\'s description length is greater than the configured max length', async (done) => {
      let descriptionAboveMaxLength = '';

      for (let i = 0; i <= todoConstants.TODO_DESCRIPTION_MAX_LENGTH; i++) {
        descriptionAboveMaxLength += 's';
      }

      const todo = new Todo({
        name: 'ToDoZiN',
        description: descriptionAboveMaxLength,
      }, false);

      const isValid = await todo.isValid();
      const includesErrorMessage = todo.errors
        .includes(todoConstants.TODO_DESCRIPTION_MAX_LENGTH_MESSAGE);

      expect(isValid).toBeFalsy();
      expect(includesErrorMessage).toBeTruthy();
      done();
    });
  });
});
