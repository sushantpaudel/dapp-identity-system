import React, { useState } from 'react';
import routes from 'admin/meta_routes';
import { addDigitalIdentity } from './api';
import { toast } from 'react-toastify';
import DigitalIdentityForm from './DigitalIdentityForm';

const AddUser = props => {
  const [user, setUser] = useState({ type: 'admin' });
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
    addDigitalIdentity(user).then(response => {
      if (response.success) {
        toast.success(response.message);
        props.history.push(routes.digitalIdentities);
      } else {
        toast.warning(response.message);
      }
    });
  };
  return (
    <DigitalIdentityForm title="Add Digital Identity" digitalIdentity={user} onChange={onChange} onSubmit={onSubmit} />
  );
};

export default AddUser;
