import ThemeOptions from './ThemeOptions';
import miscReducer from './miscReducer';
import authReducer from './authReducer';
import companyReducer from './companyReducer';

const reducers = {
  ...ThemeOptions,
  ...miscReducer,
  ...authReducer,
  ...companyReducer,
};

export default reducers;
