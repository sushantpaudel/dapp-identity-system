import React, { useEffect, useState } from 'react';
import routes from 'admin/meta_routes';
import { addUser } from './api';
import { toast } from 'react-toastify';
import { getAllMeta } from '../../redux/actions/miscAction';
import UserForm from './UserForm';

const AddUser = props => {
  const [user, setUser] = useState({ type: 'admin' });
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    getAllMeta('users').then(response => {
      if (!response.success) return;
      setRoles(response.data.roles);
    });
  }, []);
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
    addUser(user).then(response => {
      if (response.success) {
        toast.success(response.message);
        props.history.push(routes.users);
      } else {
        toast.warning(response.message);
      }
    });
  };
  return <UserForm title="Add User" user={user} onChange={onChange} onSubmit={onSubmit} roles={roles} />;
};

export default AddUser;
