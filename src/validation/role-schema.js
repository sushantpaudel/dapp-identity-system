import * as yup from 'yup';

const roleSchema = {
  name: yup.string().required(window.t('Please enter Role Name')),
};

export default roleSchema;
