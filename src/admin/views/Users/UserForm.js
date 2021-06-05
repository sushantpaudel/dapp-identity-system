import { CustomCalendar } from 'admin/components/CustomCalendar';
import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import useValidationForm from 'validation';
import userSchema from 'validation/user-schema';

const UserForm = ({ user, onSubmit, onChange, title, roles }) => {
  const { register, showError } = useValidationForm(userSchema);
  return (
    <Card className="custom-form-group shadow">
      <Form onSubmit={onSubmit} onChange={onChange}>
        <CardHeader className="card-header">
          <window.t>{title}</window.t>
        </CardHeader>
        <CardBody className="admin-card-body">
          <FormGroup>
            <Label>
              <window.t>Username</window.t>
            </Label>
            <Input name="username" {...register('username')} value={user.username || ''} />
            {showError('username')}
          </FormGroup>

          <FormGroup>
            <Label>
              <window.t>Email</window.t>
            </Label>
            <Input name="email" value={user.email || ''} type="email" {...register('email')} />
            {showError('email')}
          </FormGroup>
          <FormGroup>
            <Label>
              <window.t>Password</window.t>
            </Label>
            <Input name="password" type="password" value={user.password || ''} {...register('password')} />
            {showError('password')}
          </FormGroup>
          <FormGroup>
            <Label>
              <window.t>Confirm Password</window.t>
            </Label>
            <Input
              name="confirmPassword"
              type="password"
              value={user.confirmPassword || ''}
              {...register('confirmPassword')}
            />
            {showError('confirmPassword')}
          </FormGroup>
          <FormGroup>
            <Label>
              <window.t>Role</window.t>
            </Label>
            <Input name="roleId" type="select" value={user.roleId}>
              <option value="">{window.t('Please select an option')}</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>
              <window.t>First Name</window.t>
            </Label>
            <Input name="firstName" type="text" {...register('firstName')} value={user.firstName || ''} />
            {showError('firstName')}
          </FormGroup>
          <FormGroup>
            <Label>
              <window.t>Last Name</window.t>
            </Label>
            <Input name="lastName" type="text" {...register('lastName')} value={user.lastName || ''} />
            {showError('lastName')}
          </FormGroup>
          <FormGroup>
            <Label>
              <window.t>Gender</window.t>
            </Label>
            <Input name="gender" type="select">
              <option value="">{window.t('Please select an option')}</option>
              <option value="male">{window.t('Male')}</option>
              <option value="female">{window.t('Female')}</option>
              <option value="others">{window.t('Others')}</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>
              <window.t>Date of Birth</window.t>
            </Label>
            <CustomCalendar
              inputClassName="form-control"
              name="dateOfBirth"
              handleChange={onChange}
              dateValue={user.dateOfBirth || ''}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <window.t>Phone Number</window.t>
            </Label>
            <Input name="phoneNumber" type="integer" {...register('phoneNumber', { required: true })} />
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Button color="success" size="sm">
            <window.t>Submit</window.t>
          </Button>
          <Button color="secondary" type="reset" className="mx-2" size="sm" onClick={() => window.history.back()}>
            <window.t>Cancel</window.t>
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
};

export default UserForm;
