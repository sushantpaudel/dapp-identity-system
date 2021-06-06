import React, { useState, useEffect } from 'react';
import routes from 'admin/meta_routes';
import { getURLFromSearch } from 'config/url';
import { editDigitalIdentity, getDigitalIdentity } from './api';
import { toast } from 'react-toastify';
import DigitalIdentityForm from './DigitalIdentityForm';

const EditUser = props => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const digitalIdentityId = getURLFromSearch(props.location.search);
    if (digitalIdentityId) {
      getDigitalIdentity(digitalIdentityId).then(response => {
        if (!response.success) {
          toast.error(response.message);
          props.history.push(routes.digitalIdentities);
        } else {
          setUser(response.data);
        }
      });
    } else {
      props.history.push(routes.digitalIdentities);
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
    editDigitalIdentity(user).then(response => {
      if (response.success) {
        toast.success(response.message);
        props.history.push(routes.digitalIdentities);
      } else {
        toast.warning(response.message);
      }
    });
  };
  return (
    <DigitalIdentityForm
      isEdit
      title="Edit Digital Identity"
      digitalIdentity={user}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default EditUser;
