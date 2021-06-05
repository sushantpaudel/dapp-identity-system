import { server } from 'admin/server';
const url = '/roles';

const getRoles = async params => {
  return server
    .get(`${url}`, { params: params })
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const getRole = async id => {
  return server
    .get(`${url}/${id}`)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const editRole = role => {
  return server
    .put(`${url}`, role)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const addRole = role => {
  return server
    .post(`${url}`, role)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const deleteRole = id => {
  return server
    .delete(`${url}/${id}`)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

export { getRoles, getRole, editRole, addRole, deleteRole };
