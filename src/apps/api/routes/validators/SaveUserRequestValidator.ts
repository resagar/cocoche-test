import { IsExistsEmail } from './../../../../Contexts/Users/application/IsExistsEmail';
import { checkSchema } from 'express-validator';
import { Container } from 'typedi';

const saveUserRequestValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: 'I could not be empty',
      bail: true
    },
    isString: {
      errorMessage: 'must be a string',
      bail: true
    },
    isAlpha: {
      errorMessage: 'must contain only letters of the alphabet'
    },
    isLength: {
      errorMessage: 'must have 3 characters or more',
      options: { min: 3 },
      bail: true
    }
  },
  email: {
    notEmpty: {
      errorMessage: 'I could not be empty',
      bail: true
    },
    isString: {
      errorMessage: 'must be a string',
      bail: true
    },
    isEmail: {
      errorMessage: 'must be a valid email',
      bail: true
    },
    normalizeEmail: true,
    custom: {
      options: async (value: string) => {
        const isExistsEmail = Container.get<IsExistsEmail>(IsExistsEmail);
        const isExist = await isExistsEmail.run(value).catch(err => {
          throw err;
        });
        if (isExist) {
          throw new Error('E-mail already in use');
        }
        return value;
      },
      bail: true
    }
  },
  phone: {
    notEmpty: {
      errorMessage: 'I could not be empty',
      bail: true
    },
    isString: {
      errorMessage: 'must be a string',
      bail: true
    },
    isMobilePhone: {
      errorMessage: 'must be a valid phone',
      bail: true
    }
  }
});

export default saveUserRequestValidator;
