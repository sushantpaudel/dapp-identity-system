import React, { Component } from 'react';
import { getFormData } from 'config/form';
import { addRole } from './api';
import RoleForm from './RoleForm';
import routes from 'admin/meta_routes';
import { toast } from 'react-toastify';

class AddDepartment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = getFormData(e);
    addRole(form).then(response => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      this.props.history.push(routes.roles);
      toast.success(response.message);
    });
  };

  render() {
    return <RoleForm title="Add Role" handleSubmit={this.handleSubmit} {...this.props} />;
  }
}

export default AddDepartment;
