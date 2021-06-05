import * as yup from 'yup';
import { emailPattern } from './pattern';

const userSchema = {
  // FOR NESTED OBJECT
  //   person: yup.object().shape({
  //     firstName: yup.string().required(),
  //     age: yup.number().required().positive().integer(),
  //     website: yup.string().url()
  //   })
  //USER FORM
  username: yup
    .string()
    .required(window.t('Please Enter Username'))
    .max(20, window.t('Username should be less than 20 characters'))
    .min(8, window.t('Username should be longer than 8 characters')),

  phoneNumber: yup.string().required(window.t('Please Enter your phone number')),

  email: yup
    .string()
    .required(window.t('Please Enter your email'))
    .matches(emailPattern, {
      message: window.t('Invalid Email format'),
      excludeEmptyString: true,
    }),

  password: yup
    .string()
    .required(window.t('Please enter your password'))
    .min(8, window.t('Passwords should be longer than 8 characters')),

  confirmPassword: yup
    .string()
    .required(window.t('Password Confirmation is required'))
    .oneOf([yup.ref('password')], window.t("Passwords don't match")),

  firstName: yup.string().required(window.t('First Name is required')),

  lastName: yup.string().required(window.t('Last Name is required')),
};

export default userSchema;
