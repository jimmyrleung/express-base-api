const { Auth } = require('../../../src/domain/auth');
const { authConstants } = require('../../../src/constants');

describe('Auth class', () => {
  describe('#Validation', () => {
    it('#should be valid when everything is rightly filled', async (done) => {
      const credentials = new Auth({
        email: 'without@validation.co.uk',
        password: 'My$3cur3P4$$w0rd',
      });

      const isValid = await credentials.isValid();

      expect(isValid).toBeTruthy();
      expect(credentials.errors.length).toBe(0);
      done();
    });

    it('#should be invalid when email is missing', async (done) => {
      const credentials = new Auth({
        password: 'My$3cur3P4$$w0rd',
      });

      const isValid = await credentials.isValid();
      const includesErrorMessage = credentials.errors
        .includes(authConstants.AUTH_EMAIL_REQUIRED_MESSAGE);

      expect(isValid).toBeFalsy();
      expect(includesErrorMessage).toBeTruthy();
      done();
    });

    it('#should be invalid when password is missing', async (done) => {
      const credentials = new Auth({
        email: 'without@password.com.br',
      });

      const isValid = await credentials.isValid();
      const includesErrorMessage = credentials.errors
        .includes(authConstants.AUTH_PASSWORD_REQUIRED_MESSAGE);

      expect(isValid).toBeFalsy();
      expect(includesErrorMessage).toBeTruthy();
      done();
    });

    it('#should be invalid when the email isn\'t in a valid format', async (done) => {
      const credentials = new Auth({
        email: 'iNvAlId eMaIL',
        password: 'My$3cur3P4$$w0rd',
      });

      const isValid = await credentials.isValid();
      const includesErrorMessage = credentials.errors
        .includes(authConstants.AUTH_EMAIL_FORMAT_MESSAGE);

      expect(isValid).toBeFalsy();
      expect(includesErrorMessage).toBeTruthy();
      done();
    });
  });
});
