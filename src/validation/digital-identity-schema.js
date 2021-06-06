import * as yup from 'yup';

const digitalIdentitySchema = {
  name: yup.string().required(window.t('First Name is required')),

  citizenshipNumber: yup.string().required(window.t('Last Name is required')),
};

export default digitalIdentitySchema;
