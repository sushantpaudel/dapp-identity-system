import homeRe from './homeRe';
import accountRe from './accountRe';

const rootReducer = {
  ...homeRe,
  ...accountRe,
};

export default rootReducer;
