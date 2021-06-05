import React, { useState, useEffect } from 'react';
import routes from 'admin/meta_routes';
import { getURLFromSearch } from 'config/url';
import { editUser, getUser } from './api';
import { toast } from 'react-toastify';
import { getAllMeta } from '../../redux/actions/miscAction';
import UserForm from './UserForm';

const EditUser = props => {
  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const userId = getURLFromSearch(props.location.search);
    if (userId) {
      getUser(userId).then(response => {
        if (!response.success) {
          toast.error(response.message);
          props.history.push(routes.users);
        } else {
          setUser({
            ...response.data,
            roleId: response.data.user_roles.length === 0 ? '' : response.data.user_roles[0].roleId,
          });
        }
      });
      getAllMeta('users').then(response => {
        if (!response.success) return;
        setRoles(response.data.roles);
      });
    } else {
      props.history.push(routes.users);
    }
  }, []); //eslint-disable-line

  const onChange = ({ target: { name, value, files } }) => {
    switch (name) {
      case 'file':
        setUser({ ...user, [name]: files[0] });
        break;
      default:
        setUser({ ...user, [name]: value });
        break;
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    editUser(user).then(response => {
      if (response.success) {
        toast.success(response.message);
        props.history.push(routes.users);
      } else {
        toast.warning(response.message);
      }
    });
  };
  return <UserForm title="Edit User" user={user} onChange={onChange} onSubmit={onSubmit} roles={roles} />;
};

export default EditUser;
