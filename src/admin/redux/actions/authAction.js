import { server } from 'admin/server';
import A from '.';
import { TOKEN } from 'config/values';
import { toast } from 'react-toastify';

export const login = data => {
  return dispatch => {
    return server
      .post('/login', data)
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          localStorage.setItem(TOKEN, data.user.token);
          window.location.reload();
        } else {
          console.log(data);
          toast.warn(data.message || 'Something went wrong!');
        }
      })
      .catch(() => {
        dispatch(setLogin({ isAuthenticated: false, isLoading: false }));
      });
  };
};
export const authorize = () => {
  return dispatch => {
    return server
      .get('/authorize')
      .then(res => {
        dispatch(setLogin(res.data.user));
        dispatch(setPermissions(res.data.permissions));
      })
      .catch(() => {
        dispatch(setLogin({ isAuthenticated: false, isLoading: false }));
      });
  };
};
export const logout = () => {
  return dispatch => {
    Promise.resolve()
      .then(() => {
        localStorage.clear();
        dispatch(setLogin({}));
        dispatch(setPermissions({}));
      })
      .catch(err => {
        throw err;
      });
  };
};
const setLogin = payload => ({ type: A.SET_LOGIN, payload: payload });
const setPermissions = payload => ({
  type: A.SET_PERMISSIONS,
  payload: payload,
});
