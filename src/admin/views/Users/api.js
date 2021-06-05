import { server } from 'admin/server';
const url = '/users';

const getUsers = params => {
  return server
    .get(`${url}`, { params })
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const getUser = id => {
  return server
    .get(`${url}/${id}`)
    .then(json => json.data)
    .catch(err => {
      return err.response.data;
    });
};

const editUser = user => {
  return server
    .put(`${url}`, user)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const addUser = user => {
  return server
    .post(`${url}`, user)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const deleteUser = id => {
  return server
    .delete(`${url}/${id}`)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

export { getUsers, getUser, editUser, addUser, deleteUser };
