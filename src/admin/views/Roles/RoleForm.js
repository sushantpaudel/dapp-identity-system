import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Col, Row, Input, Form, FormGroup, Label } from 'reactstrap';
import useValidationForm from 'validation';
import roleSchema from 'validation/role-schema';
import { getAllMeta } from '../../redux/actions/miscAction';

const RoleForm = props => {
  const isEdit = !!props.isEdit;
  const role = props.role ? props.role : {};
  const roleActions = role.role_actions ? role.role_actions : [];
  const [roleMenus, setRoleMenus] = useState([]);
  const { register, showError } = useValidationForm(roleSchema);
  useEffect(() => {
    getAllMeta('roles').then(response => {
      if (!response.success) return;
      setRoleMenus(response.data.roleMenus);
    });
  }, []);

  const findChecked = menuActionId => {
    let isChecked = false;
    for (let action of roleActions) {
      if (action.roleMenuActionId === menuActionId) {
        isChecked = true;
        break;
      }
    }
    return isChecked;
  };

  return (
    <Row>
      <Col md={6}>
        <Card className="custom-form-group shadow">
          <Form id={props.formId} onSubmit={props.handleSubmit}>
            <CardHeader className="card-header">
              <strong>
                <i className="icon-briefcase pr-2" />
                <window.t>{props.title}</window.t>
              </strong>
            </CardHeader>
            <CardBody className="admin-card-body">
              <FormGroup>
                <Label htmlFor="name">
                  <window.t>Name</window.t>
                </Label>
                {isEdit ? (
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    {...register('name')}
                    placeholder="Enter role name"
                    value={role.name ? role.name : ''}
                    onChange={props.handleChange}
                  />
                ) : (
                  <Input type="text" name="name" id="name" placeholder="Enter role name" {...register('name')} />
                )}
                {showError('name')}
              </FormGroup>
              {isEdit && roleMenus
                ? roleMenus.map((roleMenu, i) => {
                    const roleMenuActions = roleMenu.role_menu_actions || [];
                    // let roleAction = roleMenuActions.filter((rC) =>
                    //   Number(rC.roleTypeId) === rT.id ? 1 : 0,
                    // )[0];
                    // roleControl = roleControl ? roleControl : {};
                    return (
                      <FormGroup key={i} tag="fieldset">
                        <legend>{roleMenu.name}</legend>
                        {roleMenuActions.map(menuAction => {
                          return (
                            <FormGroup key={menuAction.id} check inline>
                              <Label check>
                                <Input
                                  checked={findChecked(menuAction.id)}
                                  onChange={props.handleChange}
                                  type="checkbox"
                                  name={'action-' + menuAction.id}
                                />{' '}
                                {menuAction.name}
                              </Label>
                            </FormGroup>
                          );
                        })}
                      </FormGroup>
                    );
                  })
                : null}
            </CardBody>
            <CardFooter className="card-header">
              <Button color="success" type="submit" size="sm">
                <window.t>Submit</window.t>
              </Button>
              <Button color="secondary" type="reset" className="mx-2" size="sm" onClick={() => window.history.back()}>
                <window.t>Cancel</window.t>
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RoleForm;
