import React, { Component } from 'react';
import { getRole, editRole } from './api';
import { getURL } from 'config/url';
import RoleForm from './RoleForm';
import qs from 'querystring';
import routes from 'admin/meta_routes';
import { toast } from 'react-toastify';

const formId = 'edit-role-form';
class EditRole extends Component {
  state = {
    id: null,
    role: {},
    roleMenus: [],
  };

  componentDidMount() {
    const query = qs.parse(this.props.location.search, { ignorePrefix: true });
    const hash = query['?i'];
    const id = getURL(hash);
    if (!id) {
      toast.warn('Wrong URL');
      this.props.history.push(routes.roles);
    }
    getRole(id).then(response => {
      if (!response.success) {
        toast.error(response.message);
        this.props.history.push(routes.roles);
      }
      this.setState({ role: response.data });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const role = this.state.role;
    editRole(role).then(response => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      this.props.history.push(routes.roles);
      toast.success(response.message);
    });
  };

  handleChange = e => {
    const [type, roleMenuActionId] = e.target.name.split('-');
    const value = e.target.value;
    const checked = e.target.checked;
    const role = this.state.role;
    if (type === 'action') {
      if (checked) {
        role.role_actions.push({
          roleId: role.id,
          roleMenuActionId: Number(roleMenuActionId),
        });
      } else {
        role.role_actions = role.role_actions.filter(a => (a.roleMenuActionId === Number(roleMenuActionId) ? 0 : 1));
      }
    } else {
      switch (e.target.type) {
        case 'radio':
          break;
        case 'checkbox':
          role[e.target.name] = e.target.checked;
          break;
        default:
          role[e.target.name] = value;
          break;
      }
    }
    this.setState({
      role: role,
    });
  };

  render() {
    return (
      <RoleForm
        title="Edit Role"
        formId={formId}
        role={this.state.role}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        roles={this.state.roles}
        isEdit={true}
        {...this.props}
      />
    );
  }
}

export default EditRole;
