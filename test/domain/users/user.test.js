const { userConstants } = require('../../../src/constants')
const { User } = require('../../../src/domain/users');

describe('User class', () => {
    describe('#Validation', () => {
        test("#should be valid when only the password is missing and the flag 'validatePassword' isn't active", async (done) => {
            const user = new User({
                name: 'Without Validation',
                email: 'without@validation.co.uk'
            }, false);

            const isValid = await user.isValid();

            expect(isValid).toBeTruthy();
            expect(user.errors.length).toBe(0);
            done();
        })

        test("#should be valid when everything is rightly filled and the flag 'validatePassword' is active", async (done) => {
            const user = new User({
                name: 'Without Validation',
                email: 'without@validation.co.uk',
                password: 'My$3cur3P4$$w0rd'
            }, true);

            const isValid = await user.isValid();

            expect(isValid).toBeTruthy();
            expect(user.errors.length).toBe(0);
            done();
        })

        test("#should be invalid when name is missing", async (done) => {
            const user = new User({
                email: 'nameless@nameless.com',
            }, false);

            const isValid = await user.isValid();

            expect(isValid).toBeFalsy();
            expect(user.errors.includes(userConstants.USER_NAME_REQUIRED_MESSAGE)).toBeTruthy();
            done();
        })

        test("#should be invalid when email is missing", async (done) => {
            const user = new User({
                name: 'E-mail hater'
            }, false);

            const isValid = await user.isValid();

            expect(isValid).toBeFalsy();
            expect(user.errors.includes(userConstants.USER_EMAIL_REQUIRED_MESSAGE)).toBeTruthy();
            done();
        })

        test("#should be invalid when password is missing and the flag 'validatePassword' is active", async (done) => {
            const user = new User({
                name: 'With Validation',
                email: 'with@validation.com'
            });

            const isValid = await user.isValid();

            expect(isValid).toBeFalsy();
            expect(user.errors.includes(userConstants.USER_PASSWORD_REQUIRED_MESSAGE)).toBeTruthy();
            done();
        })

        test("#should be invalid if the user's name length is less than the configured min length", async (done) => {
            let nameBelowMinLength = '';

            for (i = 1; i < userConstants.USER_NAME_MIN_LENGTH; i++) {
                nameBelowMinLength += 's';
            }

            const user = new User({
                name: nameBelowMinLength,
                email: 'invalid@nameminlength.com'
            }, false);

            const isValid = await user.isValid();

            expect(isValid).toBeFalsy();
            expect(user.errors.includes(userConstants.USER_NAME_MIN_LENGTH_MESSAGE)).toBeTruthy();
            done();
        })

        test("#should be invalid if the user's name length is greater than the configured max length", async (done) => {
            let nameAboveMaxLength = '';

            for (i = 0; i <= userConstants.USER_NAME_MAX_LENGTH; i++) {
                nameAboveMaxLength += 's';
            }

            const user = new User({
                name: nameAboveMaxLength,
                email: 'invalid@namemaxlength.com'
            }, false);

            const isValid = await user.isValid();

            expect(isValid).toBeFalsy();
            expect(user.errors.includes(userConstants.USER_NAME_MAX_LENGTH_MESSAGE)).toBeTruthy();
            done();
        })

        test("#should be invalid if the user's email isn't in a valid format.", async (done) => {
            const user = new User({
                name: 'Invalid E-mail',
                email: 'invalid@email'
            }, false);

            const user2 = new User({
                name: 'Invalid E-mail',
                email: 'invalid without at'
            }, false);

            const userIsValid = await user.isValid();
            const user2IsValid = await user2.isValid();

            expect(userIsValid).toBeFalsy();
            expect(user2IsValid).toBeFalsy();
            expect(user.errors.includes(userConstants.USER_EMAIL_FORMAT_MESSAGE)).toBeTruthy();
            expect(user2.errors.includes(userConstants.USER_EMAIL_FORMAT_MESSAGE)).toBeTruthy();
            done();
        })
    })
})