const A = require('../actions').default;

const authUser = (
  state = {
    isLoading: true,
  },
  { type, payload },
) => {
  switch (type) {
    case A.SET_LOGIN:
      return {
        ...payload,
        isLoading: false,
      };
    case A.GET_LOGIN:
      return {
        ...payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const permissions = (
  state = {
    isLoading: true,
  },
  { type, payload },
) => {
  switch (type) {
    case A.SET_PERMISSIONS:
      return {
        ...payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default {
  authUser,
  permissions,
};
